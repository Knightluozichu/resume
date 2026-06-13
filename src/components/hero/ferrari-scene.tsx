"use client";

/**
 * 首页 Hero 跑车场景（HEL-13 + HEL-14 + HEL-15 + HEL-17 重做）。
 *
 * 这里是「含 three import 的场景组件」——CLAUDE.md 硬规则 2/6 要求它
 * 只能经 next/dynamic + ssr:false 加载（见 hero-canvas.tsx），
 * 绝不能进入公共 layout 或任何首屏静态 import 链路。
 *
 * HEL-13：固定机位、PBR 车漆、HDRI 环境、接触阴影。
 * HEL-14：Bloom 后处理辉光 + 环绕粒子 + 鼠标视差/呼吸摆动镜头 + 进场 reveal。
 * HEL-15：WebGL 兜底 + PerformanceMonitor 降级 + 竖屏响应式取景 + reduced-motion。
 * HEL-17（本次重做，宽屏 6 类问题）：
 *   1. 取景：整体拉远（车占下半部 ~50~55%，顶部留白给文字）；宽屏不再过大；
 *      CameraRig 首帧 snap 到目标机位，消除进场跳变。
 *   2. 边缘高光闪烁：EffectComposer 内加 SMAA（postprocessing 绕过默认 MSAA，需补抗锯齿）。
 *   3. Bloom 调弱（保守初值，只让最热的车灯/镀铬尖点发光）。
 *   4. 交互范式改为「转车」：鼠标控制车体 group 绕 Y 偏航 / 绕 X 俯仰（阻尼、有界）；
 *      镜头本身固定，主交互是「转动这台车看它」。
 *   5. 风粒子：自写 THREE.Points + sin/cos 流场平流（方向感 + 局部卷曲 + 环绕复用），
 *      additive blending + 软圆粒子，取代 drei Sparkles。
 *   6. 背景舞台：微反射地面（MeshReflectorMaterial）+ 车后柔和径向紫光晕 + 远处光尘。
 *
 * ⚠️ 施工沙箱 WebGL context lost，看不到 GPU 渲染——视觉参数集中放在文件顶部
 *    的「视觉调校面板」常量区，由总监在真 GPU 预览中微调（注释标注调节方向）。
 *    机制正确、参数集中可调即可；美观度由总监真机回路定夺。
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
  MeshReflectorMaterial,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom, SMAA } from "@react-three/postprocessing";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  HalfFloatType,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  Group,
  ShaderMaterial,
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
/** 品牌 accent 紫（DESIGN --accent #7C5CFF），3D 场景内所有紫光统一引用。 */
const ACCENT = "#7c5cff";

/* ──────────────────────────────────────────────────────────────────────────
 * 视觉调校面板（HEL-17）—— 总监在真 GPU 预览中微调，全部带「调节方向」注释。
 * 颜色只走 DESIGN accent 紫体系（#7C5CFF），禁止引入面板外彩色。
 * ────────────────────────────────────────────────────────────────────────── */

/**
 * 镜头取景。HEL-17 重做核心之一：整体拉远，车占画面下半部 ~50~55%，顶部留白给文字。
 *
 * baseRaw = HEL-13 的角度原点 [4.8,2.7,6.2]（3/4 侧前方略俯视）——只用它定「方向」，
 * 实际机位由 baseRaw 沿视线方向 × dollyScale 拉远得到（见 CAMERA.base）。
 * 镜头本身固定（不再做镜头视差，主交互改为转车，见 CAR_ROTATE）。
 */
const CAMERA = {
  /** HEL-13 角度原点：定义观察方向，不直接当机位用。 */
  baseRaw: [4.8, 2.7, 6.2] as [number, number, number],
  /**
   * 整体拉远系数：机位 = baseRaw × dollyScale（沿视线方向远离原点）。
   * 任务要求「沿视线方向 ×1.4 左右」让宽屏车不过大。↑ 车更小更远，↓ 更近更大。
   * 真机两端（宽屏 / 窄屏）核对：车占画面下半部约 50~55%。
   */
  dollyScale: 1.4,
  /** 基准 fov（度）。拉远后保持 fov 不变，靠 dolly 控大小。 */
  fov: 36,
  /** lookAt 目标：车体中心稍上方固定点，使车落在画面下半部、顶部留白给文字。 */
  lookAt: [0, 0.35, 0] as [number, number, number],
} as const;

/** 实际基准机位 = baseRaw 沿视线方向拉远（dollyScale）。CameraRig 首帧 snap 到此值的响应式结果。 */
const CAMERA_BASE: [number, number, number] = [
  CAMERA.baseRaw[0] * CAMERA.dollyScale,
  CAMERA.baseRaw[1] * CAMERA.dollyScale,
  CAMERA.baseRaw[2] * CAMERA.dollyScale,
];

/**
 * 响应式取景（HEL-17 重做）：原 HEL-15 只在竖屏拉远；现在两端都要车适中。
 * 按视口宽高比插值额外 dolly + fov 微调：
 *   - 宽屏（aspect 大）：在 wide 端额外拉远一点，避免车「贴脸」过大；
 *   - 窄屏（aspect 小）：在 portrait 端拉远更多 + 抬 fov + 视线下压，顶部留足文字空间。
 *
 * ⚠️ 总监最该微调的常量：本块四个 *Back / *Boost / *LookDown
 *    —— 真机用 323px（极窄）与桌面宽屏两端核对「车体绝不盖标题/副标题」。
 */
const RESPONSIVE = {
  /** 宽高比插值端点：≥ landscape 视为宽屏，≤ portrait 视为竖窄屏，之间线性过渡。 */
  aspectLandscape: 1.7,
  aspectPortrait: 0.6,
  /**
   * 宽屏端额外拉远的世界单位（在 CAMERA_BASE 基础上再 dolly back）。
   * 宽屏 FOV 视野更横，车水平方向更占满 → 略拉远收住。↑ 宽屏车更小。初值 1.2。
   */
  wideDollyBack: 1.2,
  /**
   * 竖屏端额外拉远的世界单位。↑ 车更小、顶部留白更多；过大则车太远失气势。初值 3.0。
   */
  portraitDollyBack: 3.0,
  /**
   * 竖屏 fov 增量（度）。拉远后适度增 fov 找回画面饱满度，让车「小但不空」。初值 +6。
   */
  portraitFovBoost: 6,
  /**
   * 竖屏 lookAt 目标额外下移的世界单位——视线下压 → 车更靠下，顶部腾更多空间。初值 0.5。
   */
  portraitLookDown: 0.5,
} as const;

/**
 * 转车交互（HEL-17 重做核心：交互范式从「转镜头」改为「转车」）。
 * 鼠标 pointer.x → 车体 group 绕 Y 偏航；pointer.y → 绕 X 轻微俯仰。阻尼平滑、有界。
 * reducedMotion 时车回正静止、不随鼠标（见 CarRotateGroup）。
 */
const CAR_ROTATE = {
  /** 偏航上限（弧度），≈ ±25°。pointer.x=±1 时车转到此角度。↑ 转动幅度更大。 */
  yawMax: MathUtils.degToRad(25),
  /** 俯仰上限（弧度），≈ ±8°。pointer.y=±1 时车俯仰到此角度。↑ 俯仰更明显。 */
  pitchMax: MathUtils.degToRad(8),
  /**
   * 阻尼时间常数（越小越「黏」越平滑跟手）。帧率无关指数阻尼，呼应 DESIGN 物理阻尼精神。
   * ↑ 跟手更快更生硬，↓ 更柔更滞后。3~5 区间。
   */
  damping: 4,
  /** pointer.y → pitch 方向：true = 鼠标上移车头略抬。按手感取舍。 */
  invertPitch: false,
} as const;

/** Bloom 辉光（HEL-17 调弱）。目标：只让最热的车灯 / 镀铬尖点发光，车身大面积不糊成一片。 */
const BLOOM = {
  /** 亮度阈值：只让 >此值的亮部发光。HEL-17 提到 0.9，只点亮最热尖点。↑ 更挑，↓ 更多区域发光。 */
  luminanceThreshold: 0.9,
  /** 阈值过渡软硬：↑ 辉光边缘更柔和，↓ 更硬朗。0.02~0.1 */
  luminanceSmoothing: 0.05,
  /** 强度：HEL-17 调保守 ≈ 0.4。↑ 更亮更扩散，↓ 更收敛。过曝就往下调。 */
  intensity: 0.4,
  /** mipmap 模糊（现代柔和大范围辉光）。建议保持 true。 */
  mipmapBlur: true,
} as const;

/** 车漆 clearcoat 粗糙度（HEL-17：略增以减锐高光闪烁，与 SMAA 协同压边缘走样）。0.06→0.1。 */
const PAINT_CLEARCOAT_ROUGHNESS = 0.1;

/* ── 风粒子「春风魔法」（HEL-17 替换 drei Sparkles）─────────────────────────
 * 自写 THREE.Points：每帧用 sin/cos 流场平流粒子，整体向一个方向缓缓飘 + 局部卷曲，
 * 出界后从另一侧重生（环绕复用）。additive blending + 软圆 sprite → 发光魔法感、与 Bloom 呼应。
 * 数量纳入 PerformanceMonitor 降级矩阵（见 PERF_TIERS.windCount）。
 */
const WIND = {
  /** 光屑数量（每个 = 头亮尾隐的发光光丝）。降级时被 PERF_TIERS.windCount 覆盖。↑ 更密更吃 GPU。 */
  // 总监调校：1100→600，避免「光雨/速度线」过密，回到轻盈春风感
  count: 600,
  /** 分布包围盒半区间 [x,y,z]：光屑在 [-half,half] 内循环。略大于车身营造环绕风场。 */
  half: [11, 5.5, 9] as [number, number, number],
  /** 整体抬高，使风场环绕车身中部偏上。 */
  centerY: 1.1,
  /** 主风向（归一化前）：整体「春风」斜向吹过，明确流向（决定光屑流动方向）。 */
  windDir: [1, 0.12, -0.3] as [number, number, number],
  /** 主风速（世界单位/秒）：整体平流速度，决定光屑流动快慢与拖尾长度。↑ 飘更快尾更长。 */
  // 总监调校：1.1→0.8，放缓成「春风」而非强风/光雨
  windSpeed: 0.8,
  /** 卷曲流场强度（世界单位/秒）：sin/cos 涡流叠加，让光屑随风卷曲飘逸不呆板。↑ 更卷。 */
  // 总监调校：0.55→0.9，加大卷曲打破均匀「下雨」感，更像花瓣随风乱舞
  curlStrength: 0.9,
  /** 流场空间频率：↑ 涡流更细碎，↓ 更舒展。 */
  curlFreq: 0.32,
  /** 流场时间频率：↑ 涡流变化更快。 */
  curlTimeFreq: 0.16,
  /** 拖尾时长（秒）：尾顶点 = 头 - 速度×此值。↑ 拖尾更长更「飞驰」，↓ 更短像光点。 */
  streakTime: 0.5,
  /** 整体不透明度（additive 叠加亮度）：↓ 更隐约衬托，↑ 更抢眼。 */
  opacity: 0.6,
  /** 高光白光屑占比（0~1）：少量取白色点缀，其余 accent 紫。 */
  whiteRatio: 0.22,
} as const;

/* ── 背景舞台三要素（HEL-17 新增）──────────────────────────────────────────── */

/** 微反射地面（drei MeshReflectorMaterial）：车「立」在台面上，高级感。 */
const FLOOR = {
  /** 地面 Y（与车/接触阴影同一落地面 -0.18）。 */
  y: -0.18,
  /** 地面尺寸（正方形边长，世界单位）。够大不露边即可。 */
  size: 40,
  /** 反射模糊 [x,y]：↑ 更朦胧高级（磨砂台面），↓ 更镜面锐利。 */
  blur: [400, 120] as [number, number],
  /** 反射 mix 强度：0=无反射纯色，1=强镜面。深空感取中低值。↑ 反射更明显。 */
  mixStrength: 0.35,
  /** 反射分辨率：↑ 更清晰更吃显存，↓ 更省。512 平衡。 */
  resolution: 512,
  /** 粗糙度：↑ 反射更散更哑光。 */
  roughness: 0.9,
  /** 台面底色（近 --bg 的近黑微紫，避免大面积纯紫违反 DESIGN「accent 仅小面积」）。 */
  color: "#0a0a0f",
  /** 金属度：略带金属让反射更收敛。 */
  metalness: 0.5,
} as const;

/** 车后柔和径向紫光晕（一块大 plane + 径向渐变贴图，把车从黑底托出）。 */
const GLOW_PLANE = {
  /** 光晕在车后的位置 [x,y,z]：z 为负 = 车后方，y 压低到车身中部，作含蓄光池。 */
  position: [0, 0.9, -5] as [number, number, number],
  /** 光晕 plane 尺寸 [w,h]。总监调校：收小成车后含蓄光池，不再大块铺背景。 */
  scale: [15, 9] as [number, number],
  /** 整体不透明度：克制——只是把车托出黑底，不喧宾夺主。↓ 更隐约。 */
  opacity: 0.34,
  /** 渐变中心色（accent 紫）→ 边缘透明。径向贴图分辨率。 */
  color: ACCENT,
  textureSize: 256,
} as const;

/* ──────────────────────────────────────────────────────────────────────────
 * 性能降级矩阵（HEL-15，HEL-17 把风粒子数纳入）。drei PerformanceMonitor 监测帧率分级降配。
 *   high（满配）→ mid（降 DPR + 减风粒子）→ low（再降 DPR + 减粒子 + 关 Bloom）
 * onFallback（持续吃力）直接钉到 low。高帧率设备恒停在 high。
 * ────────────────────────────────────────────────────────────────────────── */
type PerfTier = "high" | "mid" | "low";

const PERF_TIERS: Record<
  PerfTier,
  {
    /** Canvas dpr 区间 [min,max]。↑ 更清晰更吃 GPU。 */
    dpr: [number, number];
    /** 风粒子数（HEL-17）。满配 = WIND.count。 */
    windCount: number;
    /** 是否挂载 Bloom。low 档关后处理省一整条 pass。 */
    bloom: boolean;
    /** 是否挂载微反射地面（反射是额外一次渲染，low 档退化为不反射）。 */
    reflector: boolean;
  }
> = {
  // 满配（总监调校：关反射地面——大反射板在低机位把车反射拉伸到地平线，画面乱；改用干净接触阴影）
  high: { dpr: [1, 2], windCount: WIND.count, bloom: true, reflector: false },
  // 中档：降 DPR + 光屑减量 + 保留 Bloom（辉光是 Hero 灵魂）
  mid: { dpr: [1, 1.2], windCount: 380, bloom: true, reflector: false },
  // 低档：DPR 钉死 1 + 光屑大砍 + 关 Bloom + 关反射，保实时帧率
  low: { dpr: [1, 1], windCount: 180, bloom: false, reflector: false },
};

/** tier 升降序，供 onIncline/onDecline 相邻迁移用。 */
const TIER_ORDER: PerfTier[] = ["low", "mid", "high"];

/**
 * PerformanceMonitor 触发参数。bounds 给可接受帧率区间（按刷新率换算）：
 * 取刷新率的 50%~75% 作软门槛——明显掉帧才降级，避免对正常波动过敏。
 */
const PERF_MONITOR = {
  ms: 250,
  iterations: 6,
  bounds: (refreshrate: number): [number, number] => [
    refreshrate * 0.5,
    refreshrate * 0.75,
  ],
} as const;

/** 进场 reveal：一次性淡入 + 轻微缩放，参考 DESIGN page 档（320ms）量级略放宽。 */
const REVEAL = {
  /** 进场时长（秒）。 */
  duration: 0.55,
  /** 起始缩放（略小 → 1）。↑ 接近 1 则入场更微弱。 */
  fromScale: 0.94,
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
        // HEL-17：略增 clearcoatRoughness 减锐高光闪烁（与 SMAA 协同）
        clearcoatRoughness: PAINT_CLEARCOAT_ROUGHNESS,
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
 * 检测到 reduce 时：车回正静止（不随鼠标转）、风粒子风速归零、跳过进场动画。
 * Bloom / 反射属静态渲染、不算「动效」，保留（DESIGN §动效原则）。
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

/** 0→1 钳制线性归一化：把 v 在 [a,b] 区间映射到 [0,1]（含端点钳制）。 */
function clamp01(v: number, a: number, b: number): number {
  if (a === b) return v >= b ? 1 : 0;
  return MathUtils.clamp((v - a) / (b - a), 0, 1);
}

const LOOK_AT_BASE = new Vector3(...CAMERA.lookAt);
const BASE_DIR = new Vector3(...CAMERA_BASE).normalize();

/**
 * 计算给定宽高比下的目标机位（响应式取景）。
 * 宽屏端额外 wideDollyBack、竖屏端额外 portraitDollyBack，都沿基准视线方向外推
 * （保持构图角度不变，只改远近）。out 复用避免每帧分配。
 */
function resolveCameraTarget(aspect: number, out: Vector3): number {
  // wide：1=宽屏满取景，0=竖窄屏；portrait=1-wide
  const wide = clamp01(
    aspect,
    RESPONSIVE.aspectPortrait,
    RESPONSIVE.aspectLandscape,
  );
  const portrait = 1 - wide;
  // 沿视线方向额外 dolly：宽端 + 竖端各自的 back（宽端用 wide 权重，竖端用 portrait 权重）
  const dolly =
    wide * RESPONSIVE.wideDollyBack + portrait * RESPONSIVE.portraitDollyBack;
  const [bx, by, bz] = CAMERA_BASE;
  out.set(
    bx + BASE_DIR.x * dolly,
    by + BASE_DIR.y * dolly,
    bz + BASE_DIR.z * dolly,
  );
  return portrait;
}

/**
 * 平滑设置透视相机 fov 并刷新投影矩阵（抽成模块级函数：fov 是直接属性赋值，
 * 在 useFrame 内联会触发 react-hooks/immutability；移出 hook 作用域当普通外部对象处理）。
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

/**
 * 镜头取景（HEL-17）：镜头本身固定（不再做镜头视差，主交互改为转车），只做：
 *   1. 响应式取景——按视口宽高比插值「拉远 + 抬 fov + 视线下压」。
 *   2. 首帧 snap——挂载首帧把 camera.position 直接置为当前 aspect 的目标，消除进场跳变；
 *      之后随窗口尺寸变化平滑过渡（用阻尼 lerp，避免 resize 抖动）。
 */
function CameraRig() {
  const { camera, size } = useThree();
  const target = useRef(new Vector3()).current;
  const lookTarget = useRef(new Vector3()).current;
  // 首帧 snap 标志：第一帧直接置位，不从错误初值 lerp 进来
  const snapped = useRef(false);

  useFrame((_, delta) => {
    const aspect = size.height > 0 ? size.width / size.height : 1;
    const portrait = resolveCameraTarget(aspect, target);

    if (!snapped.current) {
      // 首帧直接 snap 到目标（消除进场跳变）
      camera.position.copy(target);
      snapped.current = true;
    } else {
      // 之后（如 resize / 旋屏）平滑过渡，避免硬跳
      const a = 1 - Math.exp(-3 * delta);
      camera.position.lerp(target, a);
    }

    // 竖屏视线下压：lookAt 目标下移 → 车更靠下，顶部留白更多
    lookTarget.set(
      LOOK_AT_BASE.x,
      LOOK_AT_BASE.y - portrait * RESPONSIVE.portraitLookDown,
      LOOK_AT_BASE.z,
    );
    camera.lookAt(lookTarget);

    if ((camera as PerspectiveCamera).isPerspectiveCamera) {
      const targetFov = CAMERA.fov + portrait * RESPONSIVE.portraitFovBoost;
      const a = snapped.current ? 1 - Math.exp(-3 * delta) : 1;
      lerpCameraFov(camera as PerspectiveCamera, targetFov, a);
    }
  });

  return null;
}

/**
 * 转车交互（HEL-17 重做核心）：鼠标控制车体 group 绕 Y 偏航 / 绕 X 俯仰，阻尼平滑、有界。
 * 让用户感觉「在转动这台车看它」。reducedMotion 时车回正静止、不读 pointer。
 */
function CarRotateGroup({
  children,
  reducedMotion,
}: {
  children: React.ReactNode;
  reducedMotion: boolean;
}) {
  const ref = useRef<Group>(null);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    // 目标角度：reducedMotion → 回正(0)；否则随 pointer 映射到有界区间
    const targetYaw = reducedMotion ? 0 : state.pointer.x * CAR_ROTATE.yawMax;
    const pitchSign = CAR_ROTATE.invertPitch ? 1 : -1;
    const targetPitch = reducedMotion
      ? 0
      : state.pointer.y * CAR_ROTATE.pitchMax * pitchSign;
    // 帧率无关指数阻尼平滑
    const a = 1 - Math.exp(-CAR_ROTATE.damping * delta);
    g.rotation.y = MathUtils.lerp(g.rotation.y, targetYaw, a);
    g.rotation.x = MathUtils.lerp(g.rotation.x, targetPitch, a);
  });

  return <group ref={ref}>{children}</group>;
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

/* ── 风粒子实现（HEL-17）─────────────────────────────────────────────────── */

/**
 * 构建风粒子几何体（模块级，非 hook 作用域）：随机初始位置 + 每粒子颜色。
 * 抽出 useMemo 之外——Math.random() 属副作用，在 hook 内会触发 react-hooks/purity；
 * 这里作为普通工厂函数被 useMemo 调用，结果稳定，符合规则。
 */
function buildWindGeometry(count: number): BufferGeometry {
  // 每个光屑 = 一段线（2 顶点：头 + 尾）。aHead=1 在头、0 在尾 → 头亮尾隐渐变。
  const positions = new Float32Array(count * 2 * 3);
  const colors = new Float32Array(count * 2 * 3);
  const aHead = new Float32Array(count * 2);
  const [hx, hy, hz] = WIND.half;
  const accent = new Color(ACCENT);
  const white = new Color("#ffffff");
  for (let i = 0; i < count; i++) {
    const x = (Math.random() * 2 - 1) * hx;
    const y = WIND.centerY + (Math.random() * 2 - 1) * hy;
    const z = (Math.random() * 2 - 1) * hz;
    const c = Math.random() < WIND.whiteRatio ? white : accent;
    // 头顶点 (2i) 与尾顶点 (2i+1)：初始重合，首帧 advance 后拉出拖尾
    for (let v = 0; v < 2; v++) {
      const base = (i * 2 + v) * 3;
      positions[base] = x;
      positions[base + 1] = y;
      positions[base + 2] = z;
      colors[base] = c.r;
      colors[base + 1] = c.g;
      colors[base + 2] = c.b;
      aHead[i * 2 + v] = v === 0 ? 1 : 0;
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(positions, 3));
  geo.setAttribute("color", new BufferAttribute(colors, 3));
  geo.setAttribute("aHead", new BufferAttribute(aHead, 1));
  return geo;
}

/**
 * 构建风粒子光丝材质（模块级工厂）：逐顶点色 + aHead 头亮尾隐渐变 + additive 发光。
 * 用于 LineSegments：每段线头顶点 alpha=uOpacity、尾顶点 alpha=0 → 流光拖尾感。
 */
function buildWindMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    uniforms: {
      uOpacity: { value: WIND.opacity },
    },
    vertexShader: /* glsl */ `
      attribute vec3 color;
      attribute float aHead;
      uniform float uOpacity;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vColor = color;
        vAlpha = aHead * uOpacity; // 头亮(=uOpacity) → 尾透明(0)
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(vColor, vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
}

/**
 * 每帧推进风粒子光丝（模块级）：头顶点用 sin/cos 流场平流 + 出界环绕复用，
 * 尾顶点 = 头 - 速度×streakTime（拖尾长度随速度，营造「随风飞驰的光屑」）。
 * 抽出 useFrame 之外，避免对 hook 返回的 geometry 做属性式 mutate 触发 immutability。
 */
function advanceWind(geometry: BufferGeometry, t: number, delta: number): void {
  const attr = geometry.getAttribute("position") as BufferAttribute;
  const arr = attr.array as Float32Array;
  const [hx, hy, hz] = WIND.half;
  const f = WIND.curlFreq;
  const tf = WIND.curlTimeFreq;
  const cs = WIND.curlStrength;
  const st = WIND.streakTime;
  const windVec = new Vector3(...WIND.windDir);
  if (windVec.lengthSq() > 0) windVec.normalize();
  const wx = windVec.x * WIND.windSpeed;
  const wy = windVec.y * WIND.windSpeed;
  const wz = windVec.z * WIND.windSpeed;
  const yLo = WIND.centerY - hy;
  const yHi = WIND.centerY + hy;

  // 每个光屑占 6 个 float（头顶点 3 + 尾顶点 3）。头是模拟状态，尾由头与速度派生。
  const particles = arr.length / 6;
  for (let p = 0; p < particles; p++) {
    const hi = p * 6; // 头顶点起始
    const ti = hi + 3; // 尾顶点起始
    const px = arr[hi];
    const py = arr[hi + 1];
    const pz = arr[hi + 2];

    // sin/cos 流场（curl-noise 近似）：相互错位的 sin/cos 构造旋转感速度场，
    // 让光屑局部卷曲、整体仍沿主风向飘。
    const cx = Math.sin(py * f + t * tf) + Math.cos(pz * f - t * tf);
    const cy = Math.sin(pz * f + t * tf) + Math.cos(px * f - t * tf);
    const cz = Math.sin(px * f + t * tf) + Math.cos(py * f - t * tf);

    const vx = wx + cx * cs;
    const vy = wy + cy * cs;
    const vz = wz + cz * cs;

    let nx = px + vx * delta;
    let ny = py + vy * delta;
    let nz = pz + vz * delta;

    // 出界环绕复用（从对侧重生），保持密度恒定
    if (nx > hx) nx -= 2 * hx;
    else if (nx < -hx) nx += 2 * hx;
    if (ny > yHi) ny -= 2 * hy;
    else if (ny < yLo) ny += 2 * hy;
    if (nz > hz) nz -= 2 * hz;
    else if (nz < -hz) nz += 2 * hz;

    // 头顶点 = 新位置
    arr[hi] = nx;
    arr[hi + 1] = ny;
    arr[hi + 2] = nz;
    // 尾顶点 = 头 - 速度×streakTime（指向来向，长度随速度 → 自然拖尾）
    arr[ti] = nx - vx * st;
    arr[ti + 1] = ny - vy * st;
    arr[ti + 2] = nz - vz * st;
  }
  attr.needsUpdate = true;
}

/**
 * 风粒子光丝（HEL-17 改）：自写 THREE.LineSegments + BufferGeometry，每个光屑是一段线——
 * 头顶点亮、尾顶点透明（aHead 渐变），头随 sin/cos 流场平流（整体顺主风向飘 + 局部卷曲），
 * 尾跟在速度反方向拉出拖尾 → 「春风吹动的发光光屑/流光」。additive + Bloom 发光呼应。
 *
 * count 由 PerformanceMonitor 降级驱动（windCount）；count 变化时几何体重建（key 由父级控制）。
 * reducedMotion 时不平流（光丝静止收为短点）。
 */
function WindParticles({
  count,
  reducedMotion,
}: {
  count: number;
  reducedMotion: boolean;
}) {
  // 初始位置（[-half,half] 均匀分布）+ 每光屑颜色（accent 紫为主，少量白点缀）+ aHead 头尾标记
  const geometry = useMemo(() => buildWindGeometry(count), [count]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  // 光丝材质：逐顶点色 + aHead 头亮尾隐 + additive 发光
  const material = useMemo(() => buildWindMaterial(), []);
  useEffect(() => () => material.dispose(), [material]);

  // 每帧平流：经模块级函数 mutate（geometry 由 useMemo 创建，
  // 在 useFrame 内直接改属性会触发 react-hooks/immutability，移到模块函数里处理）。
  useFrame((state, delta) => {
    if (reducedMotion) return; // 静止：不平流
    advanceWind(geometry, state.clock.elapsedTime, delta);
  });

  return <lineSegments geometry={geometry} material={material} />;
}

/* ── 背景柔光晕（径向渐变 plane）─────────────────────────────────────────── */

/** 生成中心 accent 紫 → 边缘透明的径向渐变贴图，用于车后柔光晕 plane。 */
function makeRadialGlowTexture(px: number, hex: string): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = px;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const c = new Color(hex);
    const r255 = Math.round(c.r * 255);
    const g255 = Math.round(c.g * 255);
    const b255 = Math.round(c.b * 255);
    const r = px / 2;
    const grad = ctx.createRadialGradient(r, r, 0, r, r, r);
    grad.addColorStop(0, `rgba(${r255},${g255},${b255},1)`);
    grad.addColorStop(0.5, `rgba(${r255},${g255},${b255},0.35)`);
    grad.addColorStop(1, `rgba(${r255},${g255},${b255},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, px, px);
  }
  const tex = new CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** 车后柔和径向紫光晕：一块大 plane，朝相机，additive 叠加把车从黑底托出。 */
function BackdropGlow() {
  const tex = useMemo(
    () => makeRadialGlowTexture(GLOW_PLANE.textureSize, GLOW_PLANE.color),
    [],
  );
  useEffect(() => () => tex.dispose(), [tex]);
  return (
    <mesh position={GLOW_PLANE.position}>
      <planeGeometry args={GLOW_PLANE.scale} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={GLOW_PLANE.opacity}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

/** 微反射地面：车「立」在磨砂台面上。low 档退化为不挂载（见 PERF_TIERS.reflector）。 */
function ReflectiveFloor() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, FLOOR.y, 0]}
      receiveShadow
    >
      <planeGeometry args={[FLOOR.size, FLOOR.size]} />
      <MeshReflectorMaterial
        blur={FLOOR.blur}
        resolution={FLOOR.resolution}
        mixBlur={1}
        mixStrength={FLOOR.mixStrength}
        roughness={FLOOR.roughness}
        depthScale={0}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        color={FLOOR.color}
        metalness={FLOOR.metalness}
      />
    </mesh>
  );
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
      {/* 镜头取景：固定机位 + 首帧 snap（消除进场跳变）+ 响应式拉远/抬 fov/视线下压 */}
      <CameraRig />

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

      {/* 背景三要素之 b：车后柔和径向紫光晕，把车从黑底托出（静态，reducedMotion 保留） */}
      <BackdropGlow />

      {/* 背景三要素之 a：微反射地面（low 档退化不挂载） */}
      {perf.reflector ? (
        <ReflectiveFloor />
      ) : (
        // low 档无反射地面时仍保留接触阴影把车落地
        <ContactShadows
          position={[0, FLOOR.y, 0]}
          opacity={0.55}
          scale={12}
          blur={2.4}
          far={4}
          color="#000000"
        />
      )}

      {/* 进场 reveal：车体淡入/缩放入场（reducedMotion 时直接显示） */}
      <RevealGroup reducedMotion={reducedMotion}>
        {/* 转车交互：鼠标控制车体 group 偏航/俯仰（reducedMotion 时回正静止） */}
        <CarRotateGroup reducedMotion={reducedMotion}>
          <FerrariModel />
        </CarRotateGroup>
      </RevealGroup>

      {/*
       * 反射地面挂载时仍补一层很淡的接触阴影压暗车底接缝，让落地更实
       * （反射 plane 在车正下方，接触阴影叠加不冲突）。
       */}
      {perf.reflector && (
        <ContactShadows
          position={[0, FLOOR.y, 0]}
          opacity={0.4}
          scale={12}
          blur={2.4}
          far={4}
          color="#000000"
        />
      )}

      {/*
       * 背景三要素之 c + 风粒子（HEL-17）：自写流场点云，整体向主风向飘 + 局部卷曲，
       * 作「春风魔法」氛围兼远处空间层次。reducedMotion 时静止。count 由降级矩阵驱动；
       * 用 key 让 count 变化时整段重建（重新分配 buffer）。
       */}
      <WindParticles
        key={perf.windCount}
        count={perf.windCount}
        reducedMotion={reducedMotion}
      />

      {/*
       * Bloom + SMAA 后处理（DESIGN：辉光只准出现在 WebGL 画布）。
       * - HEL-17：加 SMAA 抗锯齿——postprocessing 绕过默认 MSAA，导致高光边缘走样闪烁，
       *   SMAA 补边缘抗锯齿。放在 Bloom 之后（先压锯齿源、辉光基于干净边缘扩散）。
       * - Bloom 调弱（BLOOM 常量）：只点亮最热的车灯 / 镀铬尖点。
       * - frameBufferType=HalfFloat：HDR 缓冲，辉光平滑无 banding。
       * - 静态辉光不属「动效」，reducedMotion 下保留。
       * - HEL-15：low 档（perf.bloom=false）整条后处理 pass 不挂载，省 GPU。
       */}
      {perf.bloom && (
        <EffectComposer frameBufferType={HalfFloatType}>
          <Bloom
            luminanceThreshold={BLOOM.luminanceThreshold}
            luminanceSmoothing={BLOOM.luminanceSmoothing}
            intensity={BLOOM.intensity}
            mipmapBlur={BLOOM.mipmapBlur}
          />
          <SMAA />
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

/**
 * 模型就绪探针：复用 useGLTF 缓存（未就绪则随之 suspend），挂载即代表模型已加载，
 * useEffect 触发一次 onReady → 外层据此精确收起加载海报（消除「加载→实时」黑闪）。
 */
function ModelReady({ onReady }: { onReady?: () => void }) {
  useGLTF(MODEL_URL, DRACO_DECODER_PATH);
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}

export default function FerrariScene({ onReady }: { onReady?: () => void }) {
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
      // 拉远后的基准机位（CAMERA_BASE = baseRaw × dollyScale）；CameraRig 首帧 snap
      // 到当前 aspect 的响应式目标（消除进场跳变），之后做响应式过渡。
      camera={{ position: CAMERA_BASE, fov: CAMERA.fov }}
    >
      {/* 模型就绪后通知外层收起加载海报（与 FerrariRig 共享 useGLTF 缓存） */}
      <ModelReady onReady={onReady} />
      {/*
       * 帧率监测（HEL-15）：掉帧 onDecline 降一档，回升 onIncline 升一档，
       * onFallback（持续吃力）直接钉到 low。tier 驱动 DPR / 风粒子数 / Bloom / 反射。
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
