"use client";

/**
 * 首页 Hero 跑车场景（HEL-13 + HEL-14）。
 *
 * 这里是「含 three import 的场景组件」——CLAUDE.md 硬规则 2/6 要求它
 * 只能经 next/dynamic + ssr:false 加载（见 hero-canvas.tsx），
 * 绝不能进入公共 layout 或任何首屏静态 import 链路。
 *
 * HEL-13：固定机位、PBR 车漆、HDRI 环境、接触阴影。
 * HEL-14：Bloom 后处理辉光 + 环绕粒子（Sparkles）+ 鼠标视差/呼吸摆动镜头
 *         + 一次性进场 reveal。弱设备降级留给 HEL-15。
 *
 * ⚠️ 施工沙箱 WebGL context lost，看不到 GPU 渲染——视觉参数集中放在文件顶部
 *    的「视觉调校面板」常量区，由总监在真 GPU 预览中微调（注释标注调节方向）。
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  ContactShadows,
  Lightformer,
  PerformanceMonitor,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  Color,
  HalfFloatType,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  Group,
  Vector3,
  type Object3D,
  type PerspectiveCamera,
} from "three";

const MODEL_URL = "/models/ferrari.glb";
// 本地 Draco decoder（public/draco），离线可用，不依赖 CDN。
// drei useGLTF 第二参传字符串即用作 DRACOLoader.setDecoderPath。
const DRACO_DECODER_PATH = "/draco/";

/** 品牌紫车漆（DESIGN --accent 同源，仅用于 3D 材质创作，不是 UI 颜色）。 */
const BODY_PAINT = "#5b3fd6";

/* ──────────────────────────────────────────────────────────────────────────
 * 视觉调校面板（HEL-14）—— 总监在真 GPU 预览中微调，全部带「调节方向」注释。
 * 颜色只走 DESIGN accent 紫体系（#7C5CFF），禁止引入面板外颜色。
 * ────────────────────────────────────────────────────────────────────────── */

/** Bloom 辉光参数。目标：紫漆高光 / 车灯 / 镀铬有微辉光，不过曝、不糊成一片。 */
const BLOOM = {
  /** 亮度阈值：只让 >此值的亮部发光。↑ 更克制（仅最亮处发光），↓ 更多区域发光。0.6~0.8 起步 */
  // 总监调校：0.72→0.82，让辉光更挑（仅车灯/镀铬/最亮棱线），找回漆面 clearcoat 清脆
  luminanceThreshold: 0.82,
  /** 阈值过渡软硬：↑ 辉光边缘更柔和，↓ 更硬朗。0.02~0.1 */
  luminanceSmoothing: 0.05,
  /** 强度：↑ 辉光更亮更扩散，↓ 更收敛。0.6~1.0 起步，过曝就往下调 */
  // 总监调校：0.85→0.62，收敛车身大面积 streaky 辉光，保留热点光晕
  intensity: 0.62,
  /** mipmap 模糊（现代柔和大范围辉光，取代废弃的 kernelSize/resolution）。建议保持 true */
  mipmapBlur: true,
} as const;

/** 环绕车体的粒子（drei Sparkles：自带 useFrame 漂移，性能友好）。 */
const SPARKLES = {
  /** 粒子数量。HEL-15 会按设备降级，这里给出桌面满配基线。↑ 更密，↓ 更省 */
  count: 90,
  /** 分布包围盒（[x,y,z]）：略大于车身，营造环绕能量场而不糊住车体。 */
  scale: [11, 5, 9] as [number, number, number],
  /** 粒子整体抬高，使其环绕车身中部偏上、不全堆在地面。 */
  positionY: 1.1,
  /** 单粒子尺寸（世界单位级）。↑ 更显眼，↓ 更细微光尘 */
  size: 2.6,
  /** 漂移速度：微妙为上。↑ 更活跃，↓ 更静谧。0.2~0.5 */
  speed: 0.3,
  /** 漂移噪声幅度：↑ 路径更随机飘动，↓ 更规整。 */
  noise: 1.0,
  /** 透明度（整体可见度）：↓ 更隐约衬托，↑ 更抢眼。 */
  opacity: 0.6,
  /** 粒子颜色：品牌 accent 紫，发光后与 Bloom 呼应。 */
  color: "#7c5cff",
} as const;

/** 镜头交互参数。基准机位 = HEL-13 的 [4.8, 2.7, 6.2]，构图：车在下半部、顶部留白给文字。 */
const CAMERA = {
  /** HEL-13 基准机位，不可破坏的构图原点。 */
  base: [4.8, 2.7, 6.2] as [number, number, number],
  /** HEL-13 基准 fov（度）。响应式取景在此基础上做增量（见 RESPONSIVE.portraitFovBoost）。 */
  fov: 36,
  /** 鼠标视差最大偏移量（世界单位）。幅度刻意小，避免晕动与破坏构图。↑ 视差更强 */
  parallax: { x: 0.55, y: 0.32 },
  /** 自动呼吸摆动：绕 base 做有界小角度往复（非 360 旋转，防止车转到文字下方）。 */
  breathe: {
    /** 摆动角幅度（弧度），≈ ±3.4°。↑ 摆动更大，务必保持小角度有界 */
    amplitude: 0.06,
    /** 摆动角速度（rad/s 量级）：极缓慢呼吸感。↑ 更快 */
    speed: 0.22,
  },
  /** 阻尼系数（每帧 lerp 比例的时间常数，越小越「黏」越平滑）。呼应 DESIGN ease-standard 的物理阻尼精神。 */
  damping: 2.6,
} as const;

/** 进场 reveal：一次性淡入 + 轻微缩放，参考 DESIGN page 档（320ms）量级，略放宽。 */
const REVEAL = {
  /** 进场时长（秒）。0.32s 为 DESIGN page 档，这里略长更从容。 */
  duration: 0.55,
  /** 起始缩放（略小 → 1）。↑ 接近 1 则入场更微弱 */
  fromScale: 0.94,
} as const;

/* ──────────────────────────────────────────────────────────────────────────
 * 性能降级矩阵（HEL-15）—— drei PerformanceMonitor 监测帧率，掉帧时分级降配。
 *
 * 三档 tier，由 onDecline / onIncline 在相邻档间切换：
 *   high（满配，默认）→ mid（降 DPR + 减粒子）→ low（再降 DPR + 关 Bloom）
 * onFallback（持续达不到目标帧率，设备明显吃力）直接钉到 low。
 * 高帧率设备恒定停在 high，体验不受影响（HEL-13/14 满配原样）。
 * ────────────────────────────────────────────────────────────────────────── */
type PerfTier = "high" | "mid" | "low";

const PERF_TIERS: Record<
  PerfTier,
  {
    /** Canvas dpr 区间 [min,max]。↑ 上限更清晰更吃 GPU，↓ 更省。 */
    dpr: [number, number];
    /** Sparkles 粒子数。满配 = SPARKLES.count（90）。 */
    sparkleCount: number;
    /** 是否挂载 Bloom EffectComposer。low 档关后处理，省一整条 pass。 */
    bloom: boolean;
  }
> = {
  // 满配：与 HEL-13/14 现状一致，正常设备维持现状
  high: { dpr: [1, 2], sparkleCount: SPARKLES.count, bloom: true },
  // 中档：降 DPR 上限 + 粒子减到 ~40，保留 Bloom（辉光是 Hero 灵魂）
  mid: { dpr: [1, 1.2], sparkleCount: 40, bloom: true },
  // 低档：DPR 钉死 1 + 粒子再砍 + 关 Bloom，保实时帧率不卡顿
  low: { dpr: [1, 1], sparkleCount: 20, bloom: false },
};

/** tier 升降序，供 onIncline/onDecline 相邻迁移用。 */
const TIER_ORDER: PerfTier[] = ["low", "mid", "high"];

/**
 * PerformanceMonitor 触发参数。bounds 给出可接受帧率区间（按屏幕刷新率换算）：
 * 实测 fps 低于 lower 触发 onDecline，高于 upper 触发 onIncline。
 * 这里取刷新率的 50%~75% 作为软门槛——明显掉帧才降级，避免对正常波动过敏。
 */
const PERF_MONITOR = {
  /** 采样窗口（ms）。drei 默认 250。 */
  ms: 250,
  /** 连续多少次 incline/decline 才真正触发（防抖）。drei 默认 6。 */
  iterations: 6,
  /** 可接受 fps 区间（refreshrate 为屏幕刷新率，如 60/120）。 */
  bounds: (refreshrate: number): [number, number] => [
    refreshrate * 0.5,
    refreshrate * 0.75,
  ],
} as const;

/* ──────────────────────────────────────────────────────────────────────────
 * 移动端 / 窄屏响应式取景（HEL-15）。
 *
 * 基准机位 CAMERA.base = [4.8,2.7,6.2] fov36 是为「横屏宽视口」调的；竖屏窄视口下
 * 车显得偏大、CTA 易压车头。策略：按视口「宽高比」线性插值机位与 fov——
 *   aspect ≥ landscape → 满桌面取景（dolly 0，fov base）
 *   aspect ≤ portrait  → 最大幅度「拉远 + 抬 fov」，车更小更靠下，顶部留白最大
 * 之间线性过渡。dolly 沿基准机位方向向外推（保持构图角度不变，只改远近）。
 *
 * ⚠️ 总监最该微调的常量：本块的 portraitDollyBack / portraitFovBoost / portraitLookDown
 *    —— 在真 GPU 用 323px（极窄）与桌面宽度两端核对「车体绝不盖标题/副标题」。
 *    这里给出合理初值与机制；具体数值由总监按真机微调。
 * ────────────────────────────────────────────────────────────────────────── */
const RESPONSIVE = {
  /** 宽高比插值端点：≥ landscape 视为宽屏（满取景），≤ portrait 视为竖屏（最大降取景）。 */
  aspectLandscape: 1.4,
  aspectPortrait: 0.6,
  /**
   * 竖屏时沿基准机位方向额外「拉远」的世界单位（dolly back）。
   * ↑ 车更小、留白更多；过大则车太远失去气势。初值 3.2，按 323px 真机微调。
   */
  portraitDollyBack: 3.2,
  /**
   * 竖屏时 fov 增量（度）。base fov=36；拉远后适度增 fov 找回画面饱满度、
   * 让车「小但不空」。↑ 透视更广更夸张。初值 +8，与 dollyBack 配合微调。
   */
  portraitFovBoost: 8,
  /**
   * 竖屏时 lookAt 目标额外下移的世界单位——视线下压 → 车在画面更靠下，
   * 顶部腾出更多干净空间给标题/副标题/CTA。↑ 车更靠下。初值 0.5。
   */
  portraitLookDown: 0.5,
} as const;

/**
 * 按模型内材质名重写为合理的 PBR 材质。
 * Ferrari 458 模型无纹理，全部靠命名材质区分部件，便于精确接管。
 */
function buildMaterial(name: string): MeshPhysicalMaterial | null {
  switch (name) {
    // 车身漆面：金属底漆 + clearcoat 透明清漆，做出漆面光泽
    case "Body_Color":
      return new MeshPhysicalMaterial({
        color: new Color(BODY_PAINT),
        metalness: 1,
        roughness: 0.35,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        envMapIntensity: 1.4,
      });
    // 风挡 / 侧窗：通透深色玻璃
    case "Glass_Gray":
      return new MeshPhysicalMaterial({
        color: new Color("#0b0b10"),
        metalness: 0,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.2,
        ior: 1.45,
        transparent: true,
        opacity: 0.55,
        envMapIntensity: 1.6,
      });
    // 车灯灯罩玻璃
    case "Taillight_Glass":
    case "Projector_Glass":
      return new MeshPhysicalMaterial({
        color: new Color("#15151c"),
        metalness: 0,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.6,
      });
    // 镀铬 / 金属件：高反射
    case "metal_chrome":
      return new MeshPhysicalMaterial({
        color: new Color("#d7d7e0"),
        metalness: 1,
        roughness: 0.08,
        envMapIntensity: 1.6,
      });
    case "metal_gray":
      return new MeshPhysicalMaterial({
        color: new Color("#8a8a96"),
        metalness: 1,
        roughness: 0.3,
        envMapIntensity: 1.2,
      });
    // 轮毂 / 刹车
    case "Tires":
      return new MeshPhysicalMaterial({
        color: new Color("#0c0c10"),
        metalness: 0,
        roughness: 0.85,
      });
    // 碳纤维 / 内饰塑料
    case "Carbon_Fiber":
      return new MeshPhysicalMaterial({
        color: new Color("#141418"),
        metalness: 0.4,
        roughness: 0.4,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
      });
    case "plastic_gray":
    case "Interior_dark":
    case "Carpet":
      return new MeshPhysicalMaterial({
        color: new Color("#1a1a20"),
        metalness: 0,
        roughness: 0.7,
      });
    // 皮革内饰
    case "Leather":
    case "Leather_red":
      return new MeshPhysicalMaterial({
        color: new Color("#22222a"),
        metalness: 0,
        roughness: 0.6,
      });
    default:
      return null;
  }
}

/**
 * 监听 prefers-reduced-motion。SSR 安全（初始 false），挂载后读真值并随系统切换更新。
 * 检测到 reduce 时：关闭鼠标视差 + 自动摆动（镜头静止）、粒子降为极弱静态、跳过进场动画。
 * Bloom 属静态辉光、不算「动效」，保留（DESIGN §动效原则）。
 */
function usePrefersReducedMotion(): boolean {
  // useSyncExternalStore：以 matchMedia 为外部 store 订阅，SSR 安全（getServerSnapshot=false），
  // 无需在 effect 内同步 setState（规避 react-hooks/set-state-in-effect）。
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const getSnapshot = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/**
 * 镜头交互（HEL-14）：在 HEL-13 基准机位上叠加
 *   1. 鼠标视差——相机随指针轻微偏移（小幅、阻尼平滑）
 *   2. 自动呼吸摆动——绕基准做有界小角度往复（非 360，构图不破）
 * 两者都用 lerp 阻尼平滑；reducedMotion 时整体静止在基准机位。
 *
 * 始终 lookAt 车体中心稍上方的固定点：相机小幅平移时，车在画面下半部、
 * 顶部留白给文字的 HEL-13 构图保持不变。
 */
const LOOK_AT = new Vector3(0, 0.35, 0);

/** 0→1 钳制线性归一化：把 v 在 [a,b] 区间映射到 [0,1]（含端点钳制）。 */
function clamp01(v: number, a: number, b: number): number {
  if (a === b) return v >= b ? 1 : 0;
  return MathUtils.clamp((v - a) / (b - a), 0, 1);
}

/**
 * 平滑设置透视相机 fov 并刷新投影矩阵。
 * 抽成模块级函数：fov 是直接属性赋值，在 useFrame 内联会触发
 * react-hooks/immutability（不许直接改 hook 返回值的属性）；移出 hook 作用域后，
 * 这里的相机被当作普通外部对象处理，与 camera.position.lerp() 等方法式 mutate 一致。
 */
function lerpCameraFov(
  camera: PerspectiveCamera,
  targetFov: number,
  alpha: number,
): void {
  if (Math.abs(camera.fov - targetFov) <= 0.01) return;
  camera.fov = MathUtils.lerp(camera.fov, targetFov, alpha);
  camera.updateProjectionMatrix();
}

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const { camera, pointer, clock, size } = useThree();
  // 复用临时向量，避免每帧分配
  const target = useRef(new Vector3(...CAMERA.base)).current;
  const lookTarget = useRef(new Vector3()).current;
  const baseDir = useRef(new Vector3()).current;

  useFrame((_, delta) => {
    // ── 响应式取景（HEL-15）：按视口宽高比插值「拉远 + 抬 fov + 视线下压」 ──
    // portrait→0、landscape→1：0 表示最大降取景（竖窄屏），1 表示满桌面取景。
    const aspect = size.height > 0 ? size.width / size.height : 1;
    const wide = clamp01(
      aspect,
      RESPONSIVE.aspectPortrait,
      RESPONSIVE.aspectLandscape,
    );
    const portrait = 1 - wide; // 1 = 竖屏极窄，0 = 宽屏
    const [bx, by, bz] = CAMERA.base;

    // 沿基准机位方向向外 dolly：保持构图角度，只改远近
    baseDir.set(bx, by, bz).normalize();
    const dolly = portrait * RESPONSIVE.portraitDollyBack;
    const dx = bx + baseDir.x * dolly;
    const dy = by + baseDir.y * dolly;
    const dz = bz + baseDir.z * dolly;

    if (reducedMotion) {
      // 静止：直接钉在（已 dolly 的）基准机位（不读 pointer、不摆动）
      target.set(dx, dy, dz);
    } else {
      // 自动呼吸：绕基准在 XZ 平面做有界小角度往复（sin → 有界，永不整圈）
      const t = clock.elapsedTime;
      const ang = Math.sin(t * CAMERA.breathe.speed) * CAMERA.breathe.amplitude;
      const cos = Math.cos(ang);
      const sin = Math.sin(ang);
      // 绕 Y 轴旋转（已 dolly 的）机位的水平分量
      const rx = dx * cos - dz * sin;
      const rz = dx * sin + dz * cos;
      // 鼠标视差：pointer ∈ [-1,1]，乘以小幅度。Y 取负 → 鼠标上移镜头轻抬
      target.set(
        rx + pointer.x * CAMERA.parallax.x,
        dy - pointer.y * CAMERA.parallax.y,
        rz,
      );
    }
    // 帧率无关的指数阻尼平滑（damp3 风格）
    const a = 1 - Math.exp(-CAMERA.damping * delta);
    camera.position.lerp(target, a);

    // 竖屏视线下压：lookAt 目标下移 → 车在画面更靠下，顶部留白更多
    lookTarget.set(
      LOOK_AT.x,
      LOOK_AT.y - portrait * RESPONSIVE.portraitLookDown,
      LOOK_AT.z,
    );
    camera.lookAt(lookTarget);

    // 竖屏抬 fov（仅 PerspectiveCamera；R3F 默认透视相机）。
    if ((camera as PerspectiveCamera).isPerspectiveCamera) {
      const targetFov = CAMERA.fov + portrait * RESPONSIVE.portraitFovBoost;
      lerpCameraFov(camera as PerspectiveCamera, targetFov, a);
    }
  });

  return null;
}

/**
 * 一次性进场 reveal：挂载后从 fromScale → 1 缓动放大（opacity 由材质天然显现）。
 * reducedMotion 时直接显示（scale=1，不动）。用 lerp 阻尼一次到位，无需计时器。
 */
function RevealGroup({
  children,
  reducedMotion,
}: {
  children: React.ReactNode;
  reducedMotion: boolean;
}) {
  const ref = useRef<Group>(null);
  const done = useRef(reducedMotion);

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g || done.current) return;
    const a = 1 - Math.exp(-(1 / REVEAL.duration) * 4 * delta);
    const s = MathUtils.lerp(g.scale.x, 1, a);
    g.scale.setScalar(s);
    if (1 - s < 0.001) {
      g.scale.setScalar(1);
      done.current = true;
    }
  });

  // reducedMotion → 直接 1；否则从 fromScale 起步
  const initial = reducedMotion ? 1 : REVEAL.fromScale;
  return (
    <group ref={ref} scale={initial}>
      {children}
    </group>
  );
}

function FerrariModel() {
  // useGLTF 第二参传 decoder 路径字符串 → drei 内部 DRACOLoader.setDecoderPath
  const { scene } = useGLTF(MODEL_URL, DRACO_DECODER_PATH);

  // 接管材质：按材质名重写为 PBR，未命中的保留原材质
  useMemo(() => {
    scene.traverse((child: Object3D) => {
      if (!(child instanceof Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      const matName = Array.isArray(child.material)
        ? child.material[0]?.name
        : child.material?.name;
      if (!matName) return;
      const next = buildMaterial(matName);
      if (next) child.material = next;
    });
  }, [scene]);

  // 车身略微抬高，让接触阴影正好贴地
  return <primitive object={scene} position={[0, -0.18, 0]} />;
}

function FerrariRig({
  reducedMotion,
  tier,
}: {
  reducedMotion: boolean;
  tier: PerfTier;
}) {
  const perf = PERF_TIERS[tier];
  return (
    <>
      {/* 镜头交互：鼠标视差 + 呼吸摆动（reducedMotion 时静止）+ 响应式取景 */}
      <CameraRig reducedMotion={reducedMotion} />

      {/* 环境光：studio HDRI 撑起金属漆面反射，背景不显示天空盒 */}
      <Environment
        preset="studio"
        background={false}
        environmentIntensity={0.6}
      >
        {/* 顶部柔光条 + 侧向辉光条，凸显车身高光线条 */}
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 4, 1]}
          scale={[8, 2, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          position={[-4, 1, 2]}
          scale={[3, 4, 1]}
          color="#9d86ff"
        />
      </Environment>

      {/* 柔和主方向光（投影来源） */}
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.15} />

      {/* 进场 reveal：车体 + 粒子一起淡入/缩放入场（reducedMotion 时直接显示） */}
      <RevealGroup reducedMotion={reducedMotion}>
        <FerrariModel />

        {/*
         * 环绕粒子：accent 紫光尘悬浮场，衬托车体「能量场」氛围。
         * reducedMotion 时 speed=0（静止）且透明度减半，仅留极弱静态光点。
         */}
        <Sparkles
          position={[0, SPARKLES.positionY, 0]}
          count={perf.sparkleCount}
          scale={SPARKLES.scale}
          size={SPARKLES.size}
          speed={reducedMotion ? 0 : SPARKLES.speed}
          noise={SPARKLES.noise}
          opacity={reducedMotion ? SPARKLES.opacity * 0.5 : SPARKLES.opacity}
          color={SPARKLES.color}
        />
      </RevealGroup>

      {/* 接触阴影：让车「落地」，颜色贴近 --bg */}
      <ContactShadows
        position={[0, -0.18, 0]}
        opacity={0.55}
        scale={12}
        blur={2.4}
        far={4}
        color="#000000"
      />

      {/*
       * Bloom 后处理辉光（DESIGN：辉光只准出现在 WebGL 画布）。
       * - frameBufferType=HalfFloat：HDR 缓冲，辉光平滑无 banding
       * - 默认 ADD/SCREEN 混合只「加亮」高光，暗部/透明区不被点亮 →
       *   与 Canvas gl.alpha:true 透明背景兼容，不破坏与页面 --bg 的融合
       * 静态辉光不属「动效」，reducedMotion 下保留。
       * HEL-15：low 档（perf.bloom=false）整条后处理 pass 不挂载，省 GPU。
       */}
      {perf.bloom && (
        <EffectComposer frameBufferType={HalfFloatType}>
          <Bloom
            luminanceThreshold={BLOOM.luminanceThreshold}
            luminanceSmoothing={BLOOM.luminanceSmoothing}
            intensity={BLOOM.intensity}
            mipmapBlur={BLOOM.mipmapBlur}
          />
        </EffectComposer>
      )}
    </>
  );
}

/** tier 相邻迁移：向 high 升一档 / 向 low 降一档（端点钳制）。 */
function stepTier(current: PerfTier, dir: 1 | -1): PerfTier {
  const i = TIER_ORDER.indexOf(current);
  const next = MathUtils.clamp(i + dir, 0, TIER_ORDER.length - 1);
  return TIER_ORDER[next];
}

export default function FerrariScene() {
  const reducedMotion = usePrefersReducedMotion();
  // 性能档位（HEL-15）：默认满配 high，PerformanceMonitor 掉帧时下调。
  const [tier, setTier] = useState<PerfTier>("high");

  // 离开页面时释放 GLTF 缓存，避免热更新/导航后的句柄堆积
  useEffect(() => {
    return () => {
      useGLTF.clear(MODEL_URL);
    };
  }, []);

  return (
    <Canvas
      // 透明背景，与页面 --bg 融合；不抢首页文字
      gl={{ alpha: true, antialias: true }}
      shadows
      // DPR 由性能档位驱动（HEL-15）：掉帧降上限，正常设备维持满配 [1,2]
      dpr={PERF_TIERS[tier].dpr}
      // 3/4 侧前方、略俯视的初始机位；CameraRig 在此基准上做小幅视差/摆动 +
      // 按视口宽高比响应式取景（拉远 / 抬 fov / 视线下压，见 RESPONSIVE）。
      camera={{ position: CAMERA.base, fov: CAMERA.fov }}
    >
      {/*
       * 帧率监测（HEL-15）：掉帧 onDecline 降一档，回升 onIncline 升一档，
       * onFallback（持续吃力）直接钉到 low。tier 状态驱动 DPR / 粒子数 / Bloom。
       */}
      <PerformanceMonitor
        ms={PERF_MONITOR.ms}
        iterations={PERF_MONITOR.iterations}
        bounds={PERF_MONITOR.bounds}
        onDecline={() => setTier((t) => stepTier(t, -1))}
        onIncline={() => setTier((t) => stepTier(t, 1))}
        onFallback={() => setTier("low")}
      >
        <FerrariRig reducedMotion={reducedMotion} tier={tier} />
      </PerformanceMonitor>
    </Canvas>
  );
}

// 预声明资源 + 本地 decoder 路径，便于动态 chunk 加载后立即取模型
useGLTF.preload(MODEL_URL, DRACO_DECODER_PATH);
