import type { ReviewQuestion } from "./types";

export const uctRenderingPipelineQuestions: ReviewQuestion[] = [
  {
    id: "uct-rendering-pipeline-1",
    chapter: "uct-rendering-pipeline",
    level: 1,
    question: "Unity 的三种渲染管线是什么？各自适用什么平台？",
    answer: "Built-in（通用兼容，不再更新）、URP（轻量高效，移动端/WebGL 首选）、HDRP（高端真实感，PC/主机）。选型原则：先定平台再定画质。大多数项目选 URP。",
    tags: ["渲染管线", "URP", "HDRP"],
  },
  {
    id: "uct-rendering-pipeline-2",
    chapter: "uct-rendering-pipeline",
    level: 2,
    question: "DrawCall 是什么？为什么是渲染性能的核心指标？",
    answer: "DrawCall 是 CPU 提交一次绘制命令给 GPU 的调用。每次 DrawCall CPU 要准备数据、切换 GPU 状态、提交命令，开销远大于 GPU 绘制本身。DrawCall 越多 CPU 越忙，成为瓶颈。移动端建议 DrawCall < 100。降 DrawCall 靠批处理（SRP Batcher/GPU Instancing/静态批处理）。",
    tags: ["DrawCall", "性能优化"],
  },
  {
    id: "uct-rendering-pipeline-3",
    chapter: "uct-rendering-pipeline",
    level: 3,
    question: "SRP Batcher 和 GPU Instancing 的区别是什么？怎么选？",
    answer: "SRP Batcher：相同 Shader 的材质不切 GPU 状态，减少 CPU 状态切换开销，适合大量不同 Mesh 但相同 Shader 的物体。GPU Instancing：相同 Mesh+材质一次画完，适合大量相同物体（草/树）。两者可同时开启。选：相同物体用 Instancing，不同物体但相同 Shader 用 SRP Batcher。用 MaterialPropertyBlock 改属性不打断两者。",
    tags: ["SRP Batcher", "GPU Instancing", "批处理"],
  },
  {
    id: "uct-rendering-pipeline-4",
    chapter: "uct-rendering-pipeline",
    level: 4,
    question: "移动端 DrawCall 从 500 降到 100 以下，完整的优化方案？",
    answer: "1）用 Frame Debugger 逐个分析每个 DrawCall 为何没批处理；2）开启 SRP Batcher（URP Asset 设置）；3）相同物体开 GPU Instancing（材质勾选）；4）静态物体标记 Static Batching；5）合并图集减少材质数；6）用 MaterialPropertyBlock 替代 renderer.material 修改属性（避免创建副本）；7）合并相同 Shader 的材质；8）用 SimpleLOD 减少远距离渲染面数。逐项检查 Frame Debugger 确认每个 DrawCall 都有合并理由。",
    tags: ["DrawCall优化", "批处理", "综合"],
  },
];
