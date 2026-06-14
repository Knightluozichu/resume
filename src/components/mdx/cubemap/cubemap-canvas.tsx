"use client";

/**
 * <CubemapCanvas>：「立方体贴图」章（HEL-72）主 viz 的实现层（天空盒 + 反射/折射/漫反射物体）。
 *
 * !!! 含 three / R3F / drei 代码，只允许经 cubemap-demo.tsx 的 next/dynamic(ssr:false)
 *     懒加载（CLAUDE.md 硬规则 2/6）。绝不进公共 layout、绝不进首屏静态 import 链路。
 *
 * 教学核心：让读者亲眼对照「同一个球，用环境立方体贴图当镜子（反射）/ 当玻璃（折射）/ 不反射（漫反射）」。
 *
 * 程序化环境（硬规则 3，禁外部资源）：
 *  - 天空盒立方体贴图 6 面全部用 <canvas> 代码绘制（buildProceduralCubeTexture）：
 *    上面亮蓝天、下面暗地、四周渐变地平线，并在每面写方位字（RIGHT/LEFT/...）+ 网格，
 *    既好看又能让读者一眼看出「环境是被拍成 6 张贴在盒内壁的」。
 *  - 不下载任何 HDRI / 外部贴图。
 *
 * 天空盒「去平移」：把这张 CubeTexture 直接设为 scene.background（R3F 的 <color attach> 同理）。
 *  three 渲染 scene.background 的立方体贴图时，内部用的就是「去掉位移的观察矩阵」——
 *  天空盒只随相机旋转、不随位移，永远在最远处当背景。这正是正文讲的 mat4(mat3(view)) 效果，
 *  R3F 下交给 three 的 background 机制自动完成（避免手搓两遍管线整类 bug）。
 *
 * 三种材质（分段选择器切换，默认反射）：
 *  ① 反射 reflection：MeshStandardMaterial metalness=1 / roughness=0 + envMap=cubeTexture → 全镜面反射环境。
 *  ② 折射 refraction：drei <MeshTransmissionMaterial>（透明、按折射率比弯折背后环境）。
 *  ③ 漫反射 diffuse：MeshStandardMaterial metalness=0 中性色 + 无 envMap → 普通哑光，作对照。
 *
 * 控件（≤5）：材质分段选择器（反射/折射/漫反射）+ 鼠标拖拽转视角（drei OrbitControls）+ 重置。
 *
 * 渲染策略（硬约束）：
 *  - frameloop="demand"：默认不挂常驻 rAF；只在「拖动 / 切材质 / 离屏恢复」时请求重绘。
 *  - OrbitControls 拖动时自身 invalidate；MeshTransmissionMaterial 用 demand 友好参数（samples 低、无背景采样动画）。
 *  - IntersectionObserver：组件离屏时不重绘（不空转 rAF），回到视口再 invalidate 一帧。
 *  - reduced-motion：本 Demo 无自转动画（视角靠用户拖动），天然 reduced-motion 友好。
 */

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import { BackSide, Color, CubeTexture, SRGBColorSpace, type Mesh } from "three";

export type CubemapCanvasProps = {
  height?: number;
  caption?: string;
};

/** 材质模式：反射（镜面）/ 折射（玻璃）/ 漫反射（哑光对照）。 */
type MaterialMode = "reflect" | "refract" | "diffuse";

const MODE_LABEL: Record<MaterialMode, string> = {
  reflect: "反射",
  refract: "折射",
  diffuse: "漫反射",
};

/* ──────────────────────────────────────────────────────────────────────────
 * 视觉常量（3D 材质创作用，非 UI token）。UI 容器/控件一律用 Tailwind token class。
 * 颜色取 DESIGN 调性：近黑微紫背景、品牌紫点缀。
 * ────────────────────────────────────────────────────────────────────────── */

/** 程序化天空盒每面的像素边长（越大越清晰，256 足够且省内存）。 */
const FACE_SIZE = 256;

/**
 * 6 面顺序严格对应 GL_TEXTURE_CUBE_MAP_POSITIVE_X ... NEGATIVE_Z（也即 three CubeTexture
 * images 数组顺序：+X 右 / −X 左 / +Y 上 / −Y 下 / +Z 后 / −Z 前）。每面给一个主色调 + 方位字 + 网格，
 * 让读者一眼看出「环境 = 6 张贴在盒内壁的图，每张朝一个方位」。
 */
const FACES: {
  label: string;
  /** 该面主色（地平线带的中段色），渐变上接天空、下接地面。 */
  tint: string;
  /** 上半天空色。 */
  sky: string;
  /** 下半地面色。 */
  ground: string;
}[] = [
  { label: "RIGHT +X", tint: "#7c5cff", sky: "#2a2350", ground: "#161122" },
  { label: "LEFT −X", tint: "#5c8cff", sky: "#23305a", ground: "#11162a" },
  { label: "TOP +Y", tint: "#9b7cff", sky: "#3a2f6e", ground: "#3a2f6e" },
  { label: "BOTTOM −Y", tint: "#3a3550", sky: "#161122", ground: "#0a0a0f" },
  { label: "BACK +Z", tint: "#5cffd0", sky: "#1f4a44", ground: "#0f1f1d" },
  { label: "FRONT −Z", tint: "#ff7cae", sky: "#4a2336", ground: "#22111a" },
];

/**
 * 程序化生成一张立方体贴图：6 面各用 canvas 画「上天空→地平线→下地面」竖向渐变 + 网格 + 方位字。
 * 返回一张 three CubeTexture（已设 colorSpace、needsUpdate）。
 *
 * 这一步对应原书的 loadCubemap：6 张面图 → 一个 GL_TEXTURE_CUBE_MAP；只是我们不读文件、改用代码画。
 * 顶/底面画成纯色块（天=紫顶、地=近黑），四周面画地平线渐变，拼起来像一个程序化的「黄昏天空盒」。
 */
function buildProceduralCubeTexture(): CubeTexture {
  const images = FACES.map((face, faceIndex) => {
    const canvas = document.createElement("canvas");
    canvas.width = FACE_SIZE;
    canvas.height = FACE_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas;

    const isTop = faceIndex === 2; // +Y
    const isBottom = faceIndex === 3; // −Y

    if (isTop || isBottom) {
      // 顶/底面：纯主色块（天顶 / 地底），中间淡淡一个十字让朝向可辨。
      ctx.fillStyle = face.tint;
      ctx.fillRect(0, 0, FACE_SIZE, FACE_SIZE);
    } else {
      // 四周面：竖向三段渐变 天空(上) → 地平线主色(中) → 地面(下)。
      const grad = ctx.createLinearGradient(0, 0, 0, FACE_SIZE);
      grad.addColorStop(0, face.sky);
      grad.addColorStop(0.48, face.sky);
      grad.addColorStop(0.5, face.tint);
      grad.addColorStop(0.52, face.ground);
      grad.addColorStop(1, face.ground);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, FACE_SIZE, FACE_SIZE);
    }

    // 网格线（淡）：强化「这是一张被贴上去的图」的观感，也方便看反射/折射的弯折。
    ctx.strokeStyle = "rgba(237,237,242,0.12)";
    ctx.lineWidth = 1;
    const step = FACE_SIZE / 8;
    for (let i = 1; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(i * step, 0);
      ctx.lineTo(i * step, FACE_SIZE);
      ctx.moveTo(0, i * step);
      ctx.lineTo(FACE_SIZE, i * step);
      ctx.stroke();
    }

    // 方位字：让读者看出 6 面各朝一个方向。
    ctx.fillStyle = "rgba(237,237,242,0.78)";
    ctx.font = "bold 26px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(face.label, FACE_SIZE / 2, FACE_SIZE / 2);

    return canvas;
  });

  const tex = new CubeTexture(images);
  tex.colorSpace = SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/**
 * 中央物体：一个球，按 mode 切材质。
 *  - reflect：metalness=1 / roughness=0 + envMap → 全镜面反射环境（像铬球）。
 *  - refract：MeshTransmissionMaterial → 透明玻璃，按折射率比弯折背后环境。
 *  - diffuse：metalness=0 中性紫灰、不挂 envMap → 普通哑光（对照：不反射环境）。
 *
 * 切 mode 由父级 invalidate 踢一帧（demand）。
 */
function CenterObject({
  mode,
  envMap,
}: {
  mode: MaterialMode;
  envMap: CubeTexture;
}) {
  if (mode === "refract") {
    return (
      <mesh>
        <sphereGeometry args={[1.1, 64, 64]} />
        {/*
         * MeshTransmissionMaterial：玻璃材质。ior 1.5 ≈ 玻璃折射率，背后环境被弯折。
         * samples 调低 + 关 backside 让 demand 模式下一帧出图、不挂常驻采样循环。
         * background 用场景的 scene.background（程序化立方体贴图），故透出来的就是天空盒。
         */}
        <MeshTransmissionMaterial
          transmission={1}
          thickness={1.2}
          ior={1.5}
          roughness={0}
          chromaticAberration={0.04}
          anisotropy={0}
          distortion={0}
          temporalDistortion={0}
          samples={6}
          resolution={256}
          backside={false}
        />
      </mesh>
    );
  }

  return (
    <mesh>
      <sphereGeometry args={[1.1, 64, 64]} />
      {mode === "reflect" ? (
        // 反射：全镜面金属球，envMap 全反射程序化环境。
        <meshStandardMaterial
          metalness={1}
          roughness={0}
          envMap={envMap}
          color="#ffffff"
        />
      ) : (
        // 漫反射对照：哑光中性球，不挂 envMap，故不反射环境。
        <meshStandardMaterial metalness={0} roughness={0.85} color="#7c7c8a" />
      )}
    </mesh>
  );
}

/**
 * 内圈程序化天空盒兜底：极少数环境下 scene.background 的立方体贴图若不显示，
 * 仍有一个反面（BackSide）大球贴 envMap 包住相机，保证读者总能看到环境（不全黑）。
 * 实测 scene.background 已足够；此球作冗余背景，半径大到把物体和相机都罩住。
 */
function SkyboxShell({ envMap }: { envMap: CubeTexture }) {
  const ref = useRef<Mesh>(null);
  return (
    <mesh ref={ref} scale={[1, 1, 1]}>
      <sphereGeometry args={[40, 32, 32]} />
      <meshBasicMaterial envMap={envMap} side={BackSide} toneMapped={false} />
    </mesh>
  );
}

function Scene({
  mode,
  envMap,
  onControls,
}: {
  mode: MaterialMode;
  envMap: CubeTexture;
  onControls: (invalidate: () => void) => void;
}) {
  const { invalidate } = useThree();
  useEffect(() => {
    onControls(invalidate);
  }, [invalidate, onControls]);

  // 挂载即踢一帧（demand 模式首帧保证）：rAF 包一层，确保在 R3F 完成尺寸测量之后再 invalidate；
  // mode / envMap 变化时同样 rAF 后重绘一帧。
  useEffect(() => {
    const id = requestAnimationFrame(() => invalidate());
    return () => cancelAnimationFrame(id);
  }, [invalidate, mode, envMap]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.0} />
      {/*
       * 天空盒 = 把程序化立方体贴图声明式地 attach 到 scene.background（R3F 的 primitive
       * attach 范式，不手改 useThree 返回的 scene，避免 react-hooks/immutability）。three 渲染
       * background 的立方体贴图时内部就用「去平移的观察矩阵」，故天空盒只随相机旋转、不随位移
       * ——正是正文的 mat4(mat3(view)) 效果，永远在最远处当背景。
       */}
      <primitive object={envMap} attach="background" />
      <SkyboxShell envMap={envMap} />
      <CenterObject mode={mode} envMap={envMap} />
      {/*
       * OrbitControls：鼠标拖拽转视角（damping 关，避免 demand 模式下持续 invalidate 空转）。
       * onChange 时主动 invalidate 重绘一帧。禁 pan、限制 zoom 范围，交互聚焦「转着看反射/折射」。
       */}
      <OrbitControls
        enablePan={false}
        enableZoom
        enableDamping={false}
        minDistance={2.5}
        maxDistance={8}
        onChange={() => invalidate()}
      />
    </>
  );
}

export default function CubemapCanvas({
  height = 360,
  caption = "中央是同一个球：『反射』时它像一面镜子，把四周程序化天空盒原样映在表面；切到『折射』它变成玻璃，背后的环境被弯折着透过来；『漫反射』则是普通哑光球，完全不反射环境，作对照。拖动可转视角。",
}: CubemapCanvasProps) {
  const [mode, setMode] = useState<MaterialMode>("reflect");
  // 可见性门控 frameloop（ShaderCanvas 同款范式）：可见时连续渲染（立即出图、自然处理
  // 尺寸 resize），离屏时不渲染（不空转 GPU）。放弃 demand —— demand 下画布尺寸卡在默认
  // 300×150 的测量竞态会致首屏黑屏。球是静态的，可见时 always 重渲同一帧开销可接受。
  const [visible, setVisible] = useState(false);

  // 程序化立方体贴图：组件内只建一次（依赖空），卸载时 dispose 释放显存。
  const envMap = useMemo(() => buildProceduralCubeTexture(), []);
  useEffect(() => {
    return () => envMap.dispose();
  }, [envMap]);

  // demand 重绘句柄：切材质 / 离屏恢复时踢一帧。
  const invalidateRef = useRef<(() => void) | null>(null);
  const onControls = useCallback((invalidate: () => void) => {
    invalidateRef.current = invalidate;
  }, []);
  useEffect(() => {
    invalidateRef.current?.();
  }, [mode]);

  // 离屏暂停：IntersectionObserver 监测容器是否在视口，驱动 visible 切 frameloop。
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const groupId = useId();
  const reset = () => setMode("reflect");

  return (
    <div
      ref={wrapRef}
      className="mdx-cubemap-demo my-6 rounded-card border border-border bg-elevated p-6"
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
          frameloop={visible ? "always" : "never"}
          dpr={[1, 2]}
          gl={{ antialias: true }}
          camera={{ position: [0, 0.6, 4.5], fov: 45 }}
          style={{ height, width: "100%", display: "block" }}
          onCreated={(state) => {
            state.gl.setClearColor(new Color("#0a0a0f"), 1);
          }}
        >
          <Scene mode={mode} envMap={envMap} onControls={onControls} />
        </Canvas>
      </div>

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        {/* 材质分段选择器：反射 / 折射 / 漫反射（默认反射） */}
        <div
          className="flex flex-wrap items-center gap-3"
          role="group"
          aria-label="材质模式"
        >
          <span className="w-16 shrink-0 text-xs text-secondary">材质</span>
          <div className="inline-flex overflow-hidden rounded-control border border-border">
            {(Object.keys(MODE_LABEL) as MaterialMode[]).map((m) => (
              <button
                key={m}
                type="button"
                id={`${groupId}-${m}`}
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  mode === m
                    ? "bg-accent/15 text-primary"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {MODE_LABEL[m]}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-secondary">
          拖动画布转视角；滚轮缩放。环境是程序化生成的「黄昏天空盒」（6
          面各写了方位字 RIGHT / LEFT / TOP …），无任何外部贴图。
        </p>
      </div>

      {caption && <p className="mt-3 text-sm text-secondary">{caption}</p>}
    </div>
  );
}
