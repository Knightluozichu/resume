import type { ReviewQuestion } from "./types";

/** 动画混合树 复习题 */
export const uanBlendTreesQuestions: ReviewQuestion[] = [
  {
    id: "uan-blend-trees-1",
    chapter: "uan-blend-trees",
    level: 1,
    question: "Blend Tree 解决什么问题？它和 Transition 有什么区别？",
    answer: "Blend Tree 按参数平滑混合多个 AnimationClip——如 Speed=0 播 Idle、Speed=0.5 播 Walk、Speed=1 播 Run，中间值自动混合。Transition 是状态间的切换（Idle→Run），有明确的转换时刻。Blend Tree 是状态内的混合——一个状态内根据参数连续混合多个动画，无切换时刻。选择：离散动作用 Transition（Idle→Jump），连续混合用 Blend Tree（Idle→Walk→Run）。",
    tags: ["BlendTree", "Transition"],
  },
  {
    id: "uan-blend-trees-2",
    chapter: "uan-blend-trees",
    level: 2,
    question: "1D 混合树和 2D 混合树分别适合什么场景？",
    answer: "1D 混合树：单参数混合，适合一个维度的动画变化——Speed（0~1 混合 Idle/Walk/Run）、AimAngle（仰角混合瞄准动画）。2D 混合树：双参数混合，适合两个维度的动画变化——Speed+Direction（8 方向移动，前/后/左/右/对角线）、X+Y（自定义双轴）。选择：单维度变化用 1D，双维度变化用 2D。2D 有四种类型：Simple Cartesian/Cartesian/Directional/Freeform。",
    tags: ["1D", "2D", "混合树"],
  },
  {
    id: "uan-blend-trees-3",
    chapter: "uan-blend-trees",
    level: 3,
    question: "Blend Tree 的阈值（Threshold）是什么？如何控制混合比例？",
    answer: "Threshold 是每个动画在参数轴上的位置。如 Idle 的 Threshold=0、Walk=0.5、Run=1。参数 Speed=0.3 时，Idle 和 Walk 按 (0.5-0.3)/(0.5-0)=0.4 和 0.6 的权重混合——越靠近某个动画的 Threshold，该动画权重越高。Automate Thresholds 自动均匀分布，取消后可手动设置。关键：Threshold 间距影响混合速度——间距大混合慢（过渡柔和），间距小混合快（响应灵敏）。",
    tags: ["Threshold", "混合比例"],
  },
  {
    id: "uan-blend-trees-4",
    chapter: "uan-blend-trees",
    level: 4,
    question: "设计一个 8 方向移动的动画系统，角色可以前/后/左/右/对角线移动，如何用 Blend Tree 实现？",
    answer: "1)创建 2D Blend Tree，类型选 2D Cartesian；2)参数：InputX(-1~1) 和 InputY(-1~1)，由输入系统的方向键/摇杆驱动；3)添加 8 个动画片段 + 1 个 Idle（中心）：Idle(X=0,Y=0)、WalkForward(0,1)、WalkBack(0,-1)、WalkLeft(-1,0)、WalkRight(1,0)、WalkFL(-1,1)、WalkFR(1,1)、WalkBL(-1,-1)、WalkBR(1,-1)；4)每个动画设置对应的 Position(X,Y)；5)代码：animator.SetFloat("InputX", Input.GetAxis("Horizontal")); animator.SetFloat("InputY", Input.GetAxis("Vertical"));；6)设置 Dead 值（如 0.1）避免微小输入导致角色抖动。效果：摇杆方向连续混合 8 方向动画，平滑无跳变。",
    tags: ["8方向", "2D混合", "综合"],
  },
];
