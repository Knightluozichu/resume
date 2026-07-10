import type { ReviewQuestion } from "./types";

export const RtrOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "rtr-optimization-1",
    chapter: "rtr-optimization",
    level: 1,
    question: `渲染优化的核心目标是什么？如何判断瓶颈在 CPU 还是 GPU？`,
    answer: `核心目标是让每帧渲染时间低于帧预算（60fps=16.6ms）。判断瓶颈：降低分辨率如果帧时间不变则瓶颈在 CPU（GPU 没满载）；降低 Draw Call 如果帧时间不变则瓶颈在 GPU。用 Profiler 精确定位。`,
    tags: ["优化", "瓶颈"],
  },
  {
    id: "rtr-optimization-2",
    chapter: "rtr-optimization",
    level: 2,
    question: `视锥体剔除和遮挡剔除的区别是什么？`,
    answer: `视锥体剔除去掉相机看不到的物体（在视锥体外），简单高效必备。遮挡剔除去掉视锥体内但被其他物体挡住的物体，需要预计算或运行时层级 Z 缓冲，复杂但能省大量被建筑挡住的内部物体的渲染。`,
    tags: ["视锥体剔除", "遮挡剔除"],
  },
  {
    id: "rtr-optimization-3",
    chapter: "rtr-optimization",
    level: 3,
    question: `实例化（Instancing）解决了什么问题？它适合什么场景？`,
    answer: `实例化用一次 Draw Call 渲染大量相同网格不同变换的物体（如森林的树）。它把每个实例的变换矩阵作为实例属性传入，顶点着色器按实例 ID 读取，避免逐物体提交的 CPU 开销。适合重复几何体多的场景。`,
    tags: ["实例化", "Draw Call"],
  },
  {
    id: "rtr-optimization-4",
    chapter: "rtr-optimization",
    level: 4,
    question: `GPU Driven Pipeline 的核心思想是什么？相比传统 CPU 驱动有什么优势？`,
    answer: `把剔除（视锥/遮挡）、LOD 选择、排序等原本 CPU 做的工作搬到 GPU 用 Compute Shader 做，CPU 只提交一次大的 Indirect Draw Call。优势是 GPU 可访问所有几何数据做精确剔除（如基于 Hi-Z 的遮挡剔除），大幅减少 Draw Call 和 CPU-GPU 通信。代价是实现复杂、调试困难。现代引擎如 UE5 的 Nanite 就是此思路的极致。`,
    tags: ["GPU Driven", "Indirect Draw", "Nanite"],
  },
];
