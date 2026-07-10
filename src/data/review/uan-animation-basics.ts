import type { ReviewQuestion } from "./types";

/** Unity 动画基础 复习题 */
export const uanAnimationBasicsQuestions: ReviewQuestion[] = [
  {
    id: "uan-animation-basics-1",
    chapter: "uan-animation-basics",
    level: 1,
    question: `什么是关键帧？它在动画中的作用是什么？`,
    answer: `关键帧是记录物体在特定时间点的状态（位置/旋转/缩放）的帧。动画系统在关键帧之间用插值算法生成中间帧，实现平滑过渡。关键帧越密集，动画越精确但数据量越大；越稀疏，动画越平滑但细节少。美术在关键帧间设计动作姿态，系统自动计算过渡。`,
    tags: ["关键帧", "基础"],
  },
  {
    id: "uan-animation-basics-2",
    chapter: "uan-animation-basics",
    level: 2,
    question: `AnimationClip 的采样率（Sample Rate）是什么？高低有什么影响？`,
    answer: `采样率是每秒记录的关键帧数量（如 30fps = 每秒 30 帧）。高采样率：动画更流畅精确，但数据量大（内存/文件大）。低采样率：数据量小，但快速动作可能丢失细节（如手指弯曲）。选择：角色面部/手指用高采样率（60fps），身体大幅动作用低采样率（15-30fps）。Unity 默认 30fps，大部分场景足够。`,
    tags: ["采样率", "AnimationClip"],
  },
  {
    id: "uan-animation-basics-3",
    chapter: "uan-animation-basics",
    level: 3,
    question: `线性插值和缓动插值有什么区别？对动画手感有什么影响？`,
    answer: `线性插值：值匀速变化，机械感强（适合齿轮/传送带等匀速运动）。缓动插值：值变化速率有加速/减速，更自然（适合角色动作/物体弹跳）。常见缓动：EaseIn（先慢后快，像加速起跑）、EaseOut（先快后慢，像减速停下）、EaseInOut（两端慢中间快，像抛物线）。动画手感的关键是选对缓动曲线——角色动作用 EaseOut 系列（自然减速），机械运动用 Linear。`,
    tags: ["插值", "缓动", "手感"],
  },
  {
    id: "uan-animation-basics-4",
    chapter: "uan-animation-basics",
    level: 4,
    question: `如何优化 AnimationClip 的内存占用？保留动画质量的同时减少数据量？`,
    answer: `1)降低采样率：身体大幅动作 15-30fps 足够，只有精细动作（面部/手指）需要 60fps；2)减少关键帧：用曲线编辑器删除冗余帧——直线段只需首尾两帧，曲线段在转折点保留帧；3)压缩格式：AnimationClip 的 Compression 选 Keyframe Reduction（自动删冗余帧）或 Optimal（压缩+精度损失），权衡大小和质量；4)骨骼层级优化：只动画必要的骨骼，不动的骨骼不录关键帧；5)动画复用：通过 Avatar Mask 和 Blend Tree 复用上半身/下半身动画，减少总 Clip 数量。`,
    tags: ["优化", "内存", "综合"],
  },
];
