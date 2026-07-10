import type { ReviewQuestion } from "./types";

export const gep2AnimationBlendQuestions: ReviewQuestion[] = [
  {
    id: "gep2-animation-blend-1",
    chapter: "gep2-animation-blend",
    level: 1,
    question: `动画状态机和混合树各自负责什么？`,
    answer:
      `状态机负责「播什么、何时切换」：用状态节点（Idle/Walk/Run）和带条件的转移（如速度>0）决定当前播放的动画，转移带过渡时间做 cross-fade。混合树负责「多个动画如何加权融合」：按一个参数（如 speed）在多个采样动画间插值，输出加权混合的姿态。二者组合才能既切换合理又过渡平滑。`,
    tags: ["状态机", "混合树", "分工"],
  },
  {
    id: "gep2-animation-blend-2",
    chapter: "gep2-animation-blend",
    level: 2,
    question: `动画过渡的 cross-fade 是什么？为什么需要它？`,
    answer:
      `cross-fade 是状态切换时两动画按权重交叉淡入淡出：过渡期内同时播放旧动画（权重从 1 降到 0）和新动画（权重从 0 升到 1），姿态按权重混合。若直接切换，骨骼姿势会瞬间跳变，视觉上很突兀（俗称「跳帧」）。cross-fade 让切换在几十毫秒内平滑过渡，掩盖跳变。`,
    tags: ["cross-fade", "过渡", "平滑"],
  },
  {
    id: "gep2-animation-blend-3",
    chapter: "gep2-animation-blend",
    level: 3,
    question: `什么是「滑步」问题？混合树如何缓解它？`,
    answer:
      `滑步指角色动画里脚在动，但脚的实际位移和角色逻辑位移不匹配，看起来脚在地上滑。混合树通过按移动速度参数在 Idle/Walk/Run 间插值，让动画的「脚部周期位移」尽量接近角色真实速度——速度慢走 Idle/Walk，速度快混入 Run，避免高速时还播 Walk 导致脚划空。完全消除还需「根运动」或位移驱动动画，但混合树是第一道防线。`,
    tags: ["滑步", "混合树", "根运动"],
  },
  {
    id: "gep2-animation-blend-4",
    chapter: "gep2-animation-blend",
    level: 4,
    question:
      `1D 混合树和 2D 混合树各适合什么场景？惯性化（Inertializing）解决什么？`,
    answer:
      `1D 混合树按单个参数（如 speed）在一条直线上插值，适合「速度递进」的线性场景（走→跑）。2D 混合树按两个参数（如方向角+速度）在平面上插值，适合 8 方向移动：不同朝向配不同动画，按方向和速度二维定位最近采样点插值。惯性化解决「切换混合树或状态时仍会跳变」的问题：它不硬切权重，而是给姿态变化加一个弹簧式的衰减过渡，让任何突变都平滑收敛，即使混合树本身不连续也能无跳变。它是比 cross-fade 更现代、更省动画的平滑手段。`,
    tags: ["1D/2D混合", "惯性化", "综合"],
  },
];
