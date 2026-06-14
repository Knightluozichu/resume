"use client";

/**
 * <InstancingCanvas>：「实例化」章（HEL-76）主 viz 的实现层（一次 draw call 画成千上万个小行星）。
 *
 * !!! 含 three / R3F / drei 代码，只允许经 instancing-demo.tsx 的 next/dynamic(ssr:false)
 *     懒加载（CLAUDE.md 硬规则 2/6）。绝不进公共 layout、绝不进首屏静态 import 链路。
 *
 * 教学核心：让读者亲眼看到「同一个网格，用一个 <instancedMesh> + 每实例一份矩阵，一次 draw call
 * 画出成千上万个」——拖动实例数滑块从 100 到 10000，画面始终流畅（猜一猜：会卡吗？答：不卡）。
 *
 * 程序化、无外部资源（硬规则 3）：
 *  - 实例几何就是一个程序化小立方体（boxGeometry），不下载任何模型/贴图。
 *  - 每个实例的位置/缩放/朝向由一个固定种子的伪随机摆成「行星带 asteroid field」环形阵列；
 *    颜色按实例 id 程序化生成（HSL 沿环带渐变），用 setColorAt 写每实例色。
 *
 * 实例化怎么做（对应正文 §6）：
 *  - 一个 <instancedMesh args={[geometry, material, MAX_COUNT]}>：预留 MAX_COUNT 个槽位（一份几何 + 一份材质）。
 *  - useMemo 预生成 MAX_COUNT 份 Matrix4（每实例的 translate·rotate·scale 组合）+ 每实例色，
 *    useLayoutEffect 里 setMatrixAt(i, m) / setColorAt(i, c)，再置 instanceMatrix.needsUpdate / instanceColor.needsUpdate。
 *  - 滑块只改 mesh.count（实时渲染的实例数），不重建几何/矩阵——这正是实例化「改 count 几乎零成本」的体现。
 *  - draw call 计数：实例化恒为 1（无论 count 多大）；旁边标「不实例化要 count 次」作对比。
 *
 * 渲染策略（硬约束，照 CubemapCanvas 范式）：
 *  - frameloop 可见性门控 always/never：可见时连续渲染（缓慢自转 + 立即出图 + 自然处理 resize），
 *    离屏 never（不空转 GPU）。放弃纯 demand —— demand 下画布尺寸测量竞态会首屏黑屏。
 *  - reduced-motion：关闭自转（静止阵列，靠 OrbitControls 拖动看），仍可见时 always 重渲同一帧。
 *  - 卸载 dispose geometry / material（instancedMesh 由 R3F 卸载时回收，geometry/material 显式 dispose）。
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
import { OrbitControls } from "@react-three/drei";
import {
  Color,
  Matrix4,
  Euler,
  Quaternion,
  Vector3,
  type InstancedMesh,
} from "three";

export type InstancingCanvasProps = {
  height?: number;
  caption?: string;
};

/** 预留的最大实例数（滑块上限）。一次 draw call 画到这个量级仍流畅。 */
const MAX_COUNT = 10000;
/** 滑块默认实例数（开箱即展示「一大片小行星」）。 */
const DEFAULT_COUNT = 2000;
/** 滑块最小实例数。 */
const MIN_COUNT = 100;

/* ──────────────────────────────────────────────────────────────────────────
 * 程序化「行星带」阵列：固定种子伪随机，保证每次摆位一致（无外部资源）。
 * ────────────────────────────────────────────────────────────────────────── */

/** 极简确定性伪随机（mulberry32），同一 seed 永远同一串，避免 SSR/CSR 漂移与每帧抖动。 */
function makeRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 预生成 MAX_COUNT 份「每实例变换矩阵」+「每实例颜色」。
 * 对应原书行星带：绕中心一圈（radius ± 抖动）+ 随机缩放 + 随机朝向；颜色沿环带 HSL 渐变。
 * 只算一次（依赖空），滑块改 count 时不重算——体现实例化「每实例一份属性、改 count 零成本」。
 */
function buildInstanceData(): { matrices: Matrix4[]; colors: Color[] } {
  const rng = makeRng(20240614);
  const matrices: Matrix4[] = [];
  const colors: Color[] = [];

  const pos = new Vector3();
  const quat = new Quaternion();
  const scl = new Vector3();
  const euler = new Euler();

  const radius = 9; // 环带主半径
  for (let i = 0; i < MAX_COUNT; i++) {
    const t = i / MAX_COUNT;
    const angle = t * Math.PI * 2 * 6 + rng() * 0.3; // 绕多圈铺满整条带
    const rJitter = radius + (rng() - 0.5) * 5; // 半径抖动 → 带有厚度
    const yJitter = (rng() - 0.5) * 2.4; // 上下抖动 → 带有高度
    pos.set(Math.cos(angle) * rJitter, yJitter, Math.sin(angle) * rJitter);

    euler.set(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI);
    quat.setFromEuler(euler);

    const s = 0.12 + rng() * 0.22; // 小行星大小
    scl.set(s, s, s);

    matrices.push(
      new Matrix4().compose(pos.clone(), quat.clone(), scl.clone()),
    );

    // 颜色沿环带渐变（品牌紫 → 青 → 粉），按角度取色，程序化、无贴图。
    const hue = (t * 360 + 250) % 360;
    colors.push(new Color().setHSL(hue / 360, 0.55, 0.62));
  }
  return { matrices, colors };
}

/* ──────────────────────────────────────────────────────────────────────────
 * reduced-motion 探测（关自转）。
 * ────────────────────────────────────────────────────────────────────────── */
const reduceMotionStore = {
  subscribe(cb: () => void) {
    if (typeof window === "undefined") return () => {};
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  },
  get() {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },
};
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    reduceMotionStore.subscribe,
    reduceMotionStore.get,
    () => false,
  );
}

/**
 * 行星带实例化网格：一个 <instancedMesh>，count = 当前滑块值，缓慢自转。
 * setMatrixAt / setColorAt 在数据就绪时一次性写入；count 变化只改 mesh.count（不重写矩阵）。
 */
function AsteroidField({ count, spin }: { count: number; spin: boolean }) {
  const ref = useRef<InstancedMesh>(null);
  const { matrices, colors } = useMemo(() => buildInstanceData(), []);

  // 写入每实例矩阵 + 颜色（只在 matrices/colors 就绪时做一次）。
  // 关键：写之前先把 mesh.count 顶到 MAX_COUNT，确保 setColorAt 按 MAX_COUNT 分配
  // instanceColor 缓冲（three 的 setColorAt 用 this.count 定缓冲大小），否则后续拖大 count
  // 会越界读到未写入/越界的颜色。写完再在下面的 effect 里把 count 调回当前渲染数。
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    mesh.count = MAX_COUNT;
    for (let i = 0; i < MAX_COUNT; i++) {
      mesh.setMatrixAt(i, matrices[i]);
      mesh.setColorAt(i, colors[i]);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [matrices, colors]);

  // count 改变：只调 mesh.count（实时渲染的实例数）——实例化下几乎零成本。
  // 矩阵/颜色缓冲已按 MAX_COUNT 全量写好，这里只缩放「画前几个」的渲染范围。
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    mesh.count = count;
  }, [count]);

  // 缓慢整体自转（reduced-motion 由父级传 spin=false 关掉）。
  useFrame((_, delta) => {
    if (!spin) return;
    const mesh = ref.current;
    if (mesh) mesh.rotation.y += delta * 0.12;
  });

  // 不把 count 当 JSX prop 传：让构造期实例容量恒为 MAX_COUNT（instanceMatrix 缓冲按 MAX_COUNT
  // 分配），渲染数由上面的 effect 用 mesh.count 控制。
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, MAX_COUNT]}>
      {/* 一份几何 + 一份材质，被 MAX_COUNT 个实例共用——这正是实例化「只存一份」。 */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial metalness={0.1} roughness={0.65} />
    </instancedMesh>
  );
}

function Scene({
  count,
  spin,
  onReady,
}: {
  count: number;
  spin: boolean;
  onReady: (invalidate: () => void) => void;
}) {
  const { invalidate } = useThree();
  useEffect(() => {
    onReady(invalidate);
  }, [invalidate, onReady]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 8, 5]} intensity={1.1} />
      <directionalLight position={[-5, -3, -4]} intensity={0.4} />
      {/* 中心一颗「行星」作参照（普通单体 mesh，不参与实例化）。 */}
      <mesh>
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshStandardMaterial color="#2a2350" metalness={0.2} roughness={0.5} />
      </mesh>
      <AsteroidField count={count} spin={spin} />
      <OrbitControls
        enablePan={false}
        enableZoom
        enableDamping={false}
        minDistance={9}
        maxDistance={34}
        onChange={() => invalidate()}
      />
    </>
  );
}

export default function InstancingCanvas({
  height = 380,
  caption = "一整条「行星带」上成百上千颗小行星，全是同一个程序化小立方体——它们由一个 <instancedMesh> 一次 draw call 画出。拖动滑块把实例数从 100 一路拉到 10000，画面始终流畅；右上角的 draw call 计数始终是 1（实例化），对照「不实例化」需要的次数。拖动画布转视角、滚轮缩放。",
}: InstancingCanvasProps) {
  const [count, setCount] = useState(DEFAULT_COUNT);
  const reduceMotion = usePrefersReducedMotion();
  // 自转开关：用户可手动开关（默认开）；reduced-motion 系统偏好下派生为不转
  // ——直接 derive，不在 effect 里改 state（避免 react-hooks/set-state-in-effect，照 ModelCanvas）。
  const [spin, setSpin] = useState(true);
  const activeSpin = spin && !reduceMotion;

  // 可见性门控 frameloop（CubemapCanvas 同款范式）：可见 always、离屏 never，避免 demand 首屏黑屏。
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 切 count / 自转时踢一帧（静止时也能立即反映新 count）。
  const invalidateRef = useRef<(() => void) | null>(null);
  const onReady = useCallback((invalidate: () => void) => {
    invalidateRef.current = invalidate;
  }, []);
  useEffect(() => {
    invalidateRef.current?.();
  }, [count, activeSpin]);

  const groupId = useId();
  const reset = () => {
    setCount(DEFAULT_COUNT);
    setSpin(true);
  };

  return (
    <div
      ref={wrapRef}
      className="mdx-instancing-demo my-6 rounded-card border border-border bg-elevated p-6"
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

      {/* draw call 对比条：实例化恒 1，不实例化 = count。 */}
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-control border border-success/40 bg-success/10 px-2 py-1 font-mono text-success">
          实例化 draw call：1
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-control border border-danger/40 bg-danger/10 px-2 py-1 font-mono text-danger">
          不实例化需：{count.toLocaleString()} 次
        </span>
      </div>

      <div
        className="overflow-hidden rounded-control border border-border bg-bg"
        style={{ boxShadow: "inset 0 0 0 1px var(--accent-glow)" }}
      >
        <Canvas
          frameloop={visible ? "always" : "never"}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          camera={{ position: [0, 7, 20], fov: 45 }}
          style={{ height, width: "100%", display: "block" }}
          onCreated={(state) => {
            state.gl.setClearColor(new Color("#0a0a0f"), 1);
          }}
        >
          <Scene count={count} spin={activeSpin} onReady={onReady} />
        </Canvas>
      </div>

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        {/* 实例数滑块（100 ~ 10000） */}
        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor={`${groupId}-count`}
            className="w-24 shrink-0 text-xs text-secondary"
          >
            实例数
          </label>
          <input
            id={`${groupId}-count`}
            type="range"
            min={MIN_COUNT}
            max={MAX_COUNT}
            step={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-accent"
          />
          <span className="w-16 shrink-0 text-right font-mono text-xs text-primary">
            {count.toLocaleString()}
          </span>
        </div>

        {/* 自转开关（reduced-motion 系统偏好下禁用、显示已停用） */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="w-24 shrink-0 text-xs text-secondary">自转</span>
          <button
            type="button"
            onClick={() => setSpin((s) => !s)}
            aria-pressed={activeSpin}
            disabled={reduceMotion}
            title={
              reduceMotion ? "系统已开启「减少动效」，自转已停用" : undefined
            }
            className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard disabled:cursor-not-allowed disabled:opacity-50 ${
              activeSpin
                ? "border-accent bg-accent/15 text-primary"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {reduceMotion ? "已停用" : activeSpin ? "开" : "关"}
          </button>
        </div>

        <p className="text-xs text-secondary">
          猜一猜：把实例数从 100 拖到 10000，画面会卡吗？这一整片小行星都是
          <strong>同一个程序化小立方体</strong>，由一个{" "}
          <code>&lt;instancedMesh&gt;</code> 一次 draw call
          画出——拖满也流畅。无任何外部资源。
        </p>
      </div>

      {caption && <p className="mt-3 text-sm text-secondary">{caption}</p>}
    </div>
  );
}
