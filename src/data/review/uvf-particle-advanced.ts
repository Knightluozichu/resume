import type { ReviewQuestion } from "./types";

export const uvfParticleAdvancedQuestions: ReviewQuestion[] = [
  {
    id: "uvf-particle-advanced-1",
    chapter: "uvf-particle-advanced",
    level: 1,
    question: `ParticleSystem 的 Color over Lifetime 和 Size over Lifetime 模块各自的作用是什么？`,
    answer: `Color over Lifetime 控制粒子颜色和透明度随生命周期变化，常用于渐隐效果（从可见到透明淡出）。Size over Lifetime 控制粒子尺寸随生命周期变化，常用于先膨胀后收缩的效果（如爆炸火花扩散后消失）。两者配合 Curve 编辑器可以精确控制每个时间点的参数值。`,
    tags: ["Color over Lifetime", "Size over Lifetime", "曲线"],
  },
  {
    id: "uvf-particle-advanced-2",
    chapter: "uvf-particle-advanced",
    level: 2,
    question: `Sub Emitters 模块的作用是什么？举例说明它如何实现连锁特效。`,
    answer: `Sub Emitters 允许在粒子的特定生命周期事件（Birth、Collision、Death）触发另一个粒子系统。连锁特效例子：爆炸主粒子在 Birth 时触发闪光子粒子，在 Death 时触发烟雾子粒子和余烬子粒子。这样一次爆炸就分层展现：闪光→火球→烟雾→余烬，每个阶段由不同粒子系统负责，效果更丰富。`,
    tags: ["Sub Emitters", "连锁特效", "生命周期事件"],
  },
  {
    id: "uvf-particle-advanced-3",
    chapter: "uvf-particle-advanced",
    level: 3,
    question: `如何用 Collision 模块实现雨滴落在地面溅射的效果？关键参数有哪些？`,
    answer: `启用 Collision 模块，Type 设为 World（与场景碰撞体交互）。关键参数：Dampen（碰撞后速度衰减，雨滴设为0即停止）、Bounce（反弹系数，溅射用0.3让水花小弹跳）、Lifetime Loss（碰撞后生命损失，设为1让雨滴消失并触发Sub Emitter溅射粒子）。配合 Sub Emitters 的 Collision 事件，在碰撞点生成溅射粒子，实现雨滴落地水花效果。`,
    tags: ["Collision", "雨滴溅射", "参数配置"],
  },
  {
    id: "uvf-particle-advanced-4",
    chapter: "uvf-particle-advanced",
    level: 4,
    question: `对比 CPU 粒子和 GPU 粒子（VFX Graph）的区别。什么场景应该用哪个？`,
    answer: `CPU 粒子（ParticleSystem）：在 CPU 上模拟，受限于单线程，最大约几万粒子。适合简单特效、需要与物理碰撞交互、移动端兼容性好。GPU 粒子（VFX Graph）：在 GPU 上模拟，可处理百万级粒子，支持复杂行为（噪声场、事件链），但不支持世界碰撞（需自定义），需要计算着色器支持。选择标准：移动端或简单特效用 CPU 粒子；PC/主机端的大规模环境特效（暴风雪、万人战场）用 VFX Graph。移动端慎用 VFX Graph，兼容性和性能不一定有优势。`,
    tags: ["CPU粒子", "GPU粒子", "VFX Graph", "对比"],
  },
];
