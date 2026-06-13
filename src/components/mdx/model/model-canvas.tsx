"use client";

/**
 * <ModelCanvas>：交互式模型查看器画布（「模型 Model 章」ModelDemo 实现层，HEL-58）。
 *
 * !!! 含 three / R3F / drei 代码，只允许经 model-demo.tsx 的 next/dynamic(ssr:false)
 *     懒加载（CLAUDE.md 硬规则 2/6）。绝不进公共 layout、绝不进首屏静态 import 链路。
 *
 * 教学核心：让读者亲眼看到「模型 = 一堆有名字的 mesh」。
 *  - 复用首页 Hero 的 public/models/ferrari.glb（不新增资源、不跑 gltf-transform，硬规则 3）。
 *  - 加载方式照搬 hero-canvas / ferrari-scene：drei useGLTF + 本地 Draco decoder 路径。
 *
 * 控件（≤5）：
 *  1. 自转开关（reduced-motion 时默认关）
 *  2. 线框开关（全部 mesh 切 wireframe）
 *  3. mesh 选择（「全部」+ 运行时 scene.traverse 收集到的每个 mesh，下拉）
 *  4. 重置（回到「全部 mesh + 非线框 + 自转跟随 reduced-motion」）
 *
 * 渲染策略（硬约束）：
 *  - frameloop="demand"：默认不挂常驻 rAF；只在「需要时」请求重绘。
 *  - 自转开启时由 SpinDriver 每帧 invalidate() 驱动；关闭/隐藏时回到静止按需。
 *  - IntersectionObserver：组件离屏时强制停转（连自转也不空转 rAF），回到视口再恢复。
 *  - reduced-motion：自转默认关；prefers-reduced-motion 切换实时生效。
 */

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Bounds } from "@react-three/drei";
import {
  Box3,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  type Material,
  type Object3D,
} from "three";

export type ModelCanvasProps = {
  height?: number;
  caption?: string;
};

const MODEL_URL = "/models/ferrari.glb";
// 本地 Draco decoder（public/draco）——与 ferrari-scene.tsx 同源，离线可用、不依赖 CDN。
// drei useGLTF 第二参传字符串即用作 DRACOLoader.setDecoderPath。
const DRACO_DECODER_PATH = "/draco/";

/** 「全部 mesh」选项的哨兵值（与任意真实 mesh 名区隔，故用空串）。 */
const ALL_MESHES = "";

/* ──────────────────────────────────────────────────────────────────────────
 * 视觉常量。颜色走 DESIGN token（#0A0A0F 背景 / #7C5CFF accent 紫），仅 3D 材质创作用，
 * 不是 UI 颜色 token；UI 容器/控件一律用 Tailwind token class（与 LightingCanvas 一致）。
 * ────────────────────────────────────────────────────────────────────────── */

/** Canvas 背景（DESIGN --bg 近黑微紫，深色背景看 mesh 结构）。 */
const BG_COLOR = "#0a0a0f";
/** 非选中态 / 全部显示时的统一中性体色（哑光，弱化材质差异、突出 mesh 形状）。 */
const NEUTRAL_COLOR = "#6b6b78";
/** 隔离/高亮时选中 mesh 的高亮色（DESIGN --accent 品牌紫）。 */
const HIGHLIGHT_COLOR = "#7c5cff";
/** 隔离时「其余 mesh」压暗体色（比中性更暗，作背景衬托被选中件）。 */
const DIMMED_COLOR = "#23232b";
/** 自转角速度（弧度/秒）。教学动效，慢速可看清结构。 */
const SPIN_SPEED = 0.5;

/**
 * 监听 prefers-reduced-motion。SSR 安全（getServerSnapshot=false），挂载后读真值、随系统切换更新。
 * 照搬 ferrari-scene.tsx：useSyncExternalStore 以 matchMedia 为外部 store，
 * 不在 effect 内同步 setState（规避 react-hooks/set-state-in-effect）。
 */
function usePrefersReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const getSnapshot = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

type MeshEntry = { name: string; uuid: string };

/**
 * 加载好的模型 + 收集 mesh 列表。
 *
 * - drei useGLTF（+ 本地 Draco decoder）与 ferrari-scene.tsx 同款；未就绪则 suspend，
 *   交由外层 <Suspense> 兜加载态。
 * - scene.traverse 收集所有 isMesh 节点：列表项的 name 用 mesh 名（同名件如 4 个 wheel
 *   各自独立，靠 uuid 区分；name 重复时显示序号后缀，避免读者误以为是同一件）。
 * - 教学策略：克隆每个 mesh 的材质为统一中性 MeshStandardMaterial（Ferrari 模型本身
 *   靠材质名区分部件、无纹理），让读者注意力集中在「形状 + 名字」而非原车漆配色；
 *   线框/隔离/高亮都改这套克隆材质的属性，绝不改原始缓存材质（避免污染 useGLTF 缓存）。
 */
function useModel() {
  const { scene } = useGLTF(MODEL_URL, DRACO_DECODER_PATH);

  // 克隆整棵场景：本 Demo 要改材质/线框，克隆后改副本，不污染 useGLTF 模块级缓存
  // （否则同页若再用同模型会串台）。
  const model = useMemo(() => scene.clone(true), [scene]);

  // 收集 mesh + 为每个 mesh 装一份统一中性材质（教学：弱化配色、突出结构）。
  const meshes = useMemo<MeshEntry[]>(() => {
    const list: MeshEntry[] = [];
    model.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;
      child.material = new MeshStandardMaterial({
        color: new Color(NEUTRAL_COLOR),
        roughness: 0.7,
        metalness: 0.1,
      });
      list.push({ name: child.name || "(未命名 mesh)", uuid: child.uuid });
    });
    return list;
  }, [model]);

  // 卸载时只释放「我们 new 出来的材质」，避免显存句柄堆积（硬约束：卸载释放）。
  // 注意：scene.clone(true) 共享 geometry 引用（不深拷几何体），这份 geometry 属于
  // useGLTF 的模块级缓存、与首页 Hero 的 Ferrari 同一份——绝不能 dispose，否则离开
  // 模型章后再回首页 Hero 的车几何体已被释放 → 白屏/报错。geometry 不归我们所有。
  useEffect(() => {
    return () => {
      model.traverse((child: Object3D) => {
        if (!(child instanceof Mesh)) return;
        const mat = child.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else (mat as Material | undefined)?.dispose();
      });
    };
  }, [model]);

  return { model, meshes };
}

/**
 * 每帧把「线框 / 隔离-高亮」状态应用到模型材质（在 useFrame 里改材质属性是合法的命令式
 * three 操作，不触发 React 重渲）。
 *  - wireframe：全部 mesh 的 material.wireframe = 开关值。
 *  - selectedUuid === ALL：全部正常中性色显示。
 *  - selectedUuid === 某 mesh：该 mesh 高亮紫、可见；其余压暗（仍可见作结构衬托）。
 *
 * R3F 每次渲染都会重新注册 useFrame 回调，故直接读最新 wireframe / selected props 即可拿到
 * 最新值；每次状态变化由父级 invalidate 踢一帧应用。
 */
function MaterialDriver({
  model,
  wireframe,
  selected,
}: {
  model: Object3D;
  wireframe: boolean;
  selected: string;
}) {
  const highlight = useMemo(() => new Color(HIGHLIGHT_COLOR), []);
  const neutral = useMemo(() => new Color(NEUTRAL_COLOR), []);
  const dimmed = useMemo(() => new Color(DIMMED_COLOR), []);

  useFrame(() => {
    model.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;
      const mat = child.material as MeshStandardMaterial;
      mat.wireframe = wireframe;
      if (selected === ALL_MESHES) {
        mat.color.copy(neutral);
        mat.opacity = 1;
        mat.transparent = false;
      } else if (child.uuid === selected) {
        mat.color.copy(highlight);
        mat.opacity = 1;
        mat.transparent = false;
      } else {
        mat.color.copy(dimmed);
        mat.opacity = 1;
        mat.transparent = false;
      }
    });
  });

  return null;
}

/**
 * 自转驱动：用 <group ref> 包住模型，仅在 spinning 时按帧推进自身绕 Y 旋转，
 * 并 invalidate() 维持 demand 循环。spinning=false 时不 invalidate → frameloop="demand"
 * 下 rAF 自然停摆（不空转）。旋转 group 自身（ref.current），不碰 props（避免改组件 props，
 * react-hooks/immutability）；模型已居中到原点，绕 group Y 转即绕车体中心转。
 * 离屏 / reduced-motion 由父级把 spinning 派生为 false 控制。
 */
function SpinDriver({
  spinning,
  children,
}: {
  spinning: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<Group>(null);
  const { invalidate } = useThree();

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g || !spinning) return;
    g.rotation.y += SPIN_SPEED * delta;
    invalidate(); // demand 模式下自我维持下一帧
  });

  return <group ref={ref}>{children}</group>;
}

function Scene({
  spinning,
  wireframe,
  selected,
  onMeshes,
}: {
  spinning: boolean;
  wireframe: boolean;
  selected: string;
  onMeshes: (meshes: MeshEntry[]) => void;
}) {
  // 全组件只此一份克隆：渲染（model）与下拉 mesh 列表（meshes）同源，
  // 故下拉的 uuid 与 MaterialDriver 遍历的 uuid 必然一致 → 选中能精确匹配高亮。
  const { model, meshes } = useModel();

  // 收集到的 mesh 列表上报给 Suspense 外的控件 UI（下拉用真实 mesh 名/uuid）。
  useEffect(() => {
    onMeshes(meshes);
  }, [meshes, onMeshes]);

  // 居中模型几何中心到原点，让自转绕车体中心而非任意原点（视觉稳定）。
  useMemo(() => {
    const box = new Box3().setFromObject(model);
    const center = new Vector3();
    box.getCenter(center);
    model.position.sub(center);
  }, [model]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />
      {/*
       * 自动取景：drei <Bounds fit clip observe margin> 挂载即把整车框入视野并居中，
       * observe 让容器尺寸变化时重新取景。Bounds 自身在过渡期间内部 invalidate，
       * 故 demand 模式下 fit 动画照常播放。不挂 OrbitControls（控件 ≤5，交互聚焦 mesh 隔离/线框）。
       */}
      <Bounds fit clip observe margin={1.2}>
        <SpinDriver spinning={spinning}>
          <primitive object={model} />
        </SpinDriver>
      </Bounds>
      <MaterialDriver model={model} wireframe={wireframe} selected={selected} />
    </>
  );
}

/** 同名 mesh 加序号后缀，避免下拉里多个「wheel」看不出区别（教学清晰度）。 */
function labelFor(meshes: MeshEntry[], index: number): string {
  const { name } = meshes[index];
  const sameName = meshes.filter((m) => m.name === name);
  if (sameName.length <= 1) return name;
  const ordinal = sameName.findIndex((m) => m.uuid === meshes[index].uuid) + 1;
  return `${name} #${ordinal}`;
}

export default function ModelCanvas({
  height = 360,
  caption = "切到线框看模型由多少三角面拼成；从下拉里选一个 mesh，被选中件高亮、其余压暗——这就是「模型 = 一堆有名字的 mesh」。",
}: ModelCanvasProps) {
  const reducedMotion = usePrefersReducedMotion();

  // 自转：用户可手动开关；reduced-motion 系统偏好下不实际旋转（见 activeSpin）。
  const [spinning, setSpinning] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [selected, setSelected] = useState<string>(ALL_MESHES);
  const [meshes, setMeshes] = useState<MeshEntry[]>([]);

  // 离屏暂停：IntersectionObserver 监测容器是否在视口，不可见时 active=false。
  const wrapRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 实际驱动自转 = 用户开启 且 在屏内 且 系统未要求减少动效。
  // 离屏 / reduced-motion 直接派生为不转——无需 effect 改 state（避免 set-state-in-effect），
  // 且 frameloop="demand" 下不转即不空转 rAF。
  const activeSpin = spinning && onScreen && !reducedMotion;

  // 控件/状态变化时请求一帧重绘（demand 模式：不挂常驻 rAF）。
  // 材质应用发生在 useFrame（MaterialDriver），状态变了需主动 invalidate 踢一帧。
  const invalidateRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    invalidateRef.current?.();
  }, [wireframe, selected, activeSpin]);

  const onMeshes = useCallback((next: MeshEntry[]) => setMeshes(next), []);

  const selectId = useId();

  const reset = () => {
    setSelected(ALL_MESHES);
    setWireframe(false);
    setSpinning(false);
  };

  return (
    <div
      ref={wrapRef}
      className="mdx-model-demo my-6 rounded-card border border-border bg-elevated p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
        <button
          type="button"
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      <div
        className="overflow-hidden rounded-control border border-border bg-bg"
        style={{ boxShadow: "inset 0 0 0 1px var(--accent-glow)" }}
      >
        <Canvas
          // demand：默认不挂常驻 rAF，按需重绘（自转/取景/状态变化时 invalidate）。
          frameloop="demand"
          dpr={[1, 2]}
          gl={{ antialias: true }}
          camera={{ position: [4, 2.5, 6], fov: 40 }}
          style={{ height, width: "100%", display: "block" }}
          onCreated={({ scene, gl, invalidate }) => {
            scene.background = new Color(BG_COLOR);
            gl.setClearColor(new Color(BG_COLOR), 1);
            invalidateRef.current = invalidate;
          }}
        >
          {/* 模型加载态：useGLTF suspend 时 R3F 自动兜底，加载好前画布只显深色背景 */}
          <Scene
            spinning={activeSpin}
            wireframe={wireframe}
            selected={selected}
            onMeshes={onMeshes}
          />
        </Canvas>
      </div>

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        {/* mesh 选择：运行时 scene.traverse 收集，「全部」+ 每个 mesh */}
        <div className="flex items-center gap-3">
          <label
            htmlFor={selectId}
            className="w-20 shrink-0 text-xs text-secondary"
          >
            隔离 mesh
          </label>
          <select
            id={selectId}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="min-w-0 flex-1 cursor-pointer rounded-control border border-border bg-bg px-2 py-1 text-xs text-primary"
          >
            <option value={ALL_MESHES}>全部（{meshes.length} 个 mesh）</option>
            {meshes.map((m, i) => (
              <option key={m.uuid} value={m.uuid}>
                {labelFor(meshes, i)}
              </option>
            ))}
          </select>
        </div>

        {/* 线框开关 + 自转开关：ghost 按钮（选中态 accent 边框/字色） */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-20 shrink-0 text-xs text-secondary">显示</span>
          <button
            type="button"
            onClick={() => setWireframe((v) => !v)}
            aria-pressed={wireframe}
            className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              wireframe
                ? "border-accent text-primary"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            线框 {wireframe ? "开" : "关"}
          </button>
          <button
            type="button"
            onClick={() => setSpinning((v) => !v)}
            aria-pressed={spinning}
            disabled={reducedMotion}
            title={
              reducedMotion ? "系统已开启「减少动效」，自转已停用" : undefined
            }
            className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard disabled:cursor-not-allowed disabled:opacity-50 ${
              spinning
                ? "border-accent text-primary"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            {reducedMotion
              ? "自转（已减少动效）"
              : `自转 ${spinning ? "开" : "关"}`}
          </button>
        </div>
      </div>

      {caption && <p className="mt-3 text-sm text-secondary">{caption}</p>}
    </div>
  );
}

// 预声明资源 + 本地 decoder 路径，便于动态 chunk 加载后立即取模型（与 ferrari-scene 同款）。
useGLTF.preload(MODEL_URL, DRACO_DECODER_PATH);
