import type { ReviewQuestion } from "./types";

/** 渲染优化策略 复习题 */
export const dogRenderingOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "dog-rendering-optimization-1",
    chapter: "dog-rendering-optimization",
    level: 1,
    question: `draw call 的开销主要在哪？批处理和实例化分别适合什么场景？`,
    answer: `draw call 开销主要在 CPU 准备状态与驱动校验的固定成本，而非 GPU 绘制本身。批处理适合把多个不同几何但同材质物体合并进一个 VBO 一次画；实例化适合用一次 draw call 画多份相同几何的副本（如一堆树/粒子），每实例只传变换等每实例属性。`,
    tags: ["draw call", "批处理"],
  },
  {
    id: "dog-rendering-optimization-2",
    chapter: "dog-rendering-optimization",
    level: 2,
    question: `为什么状态排序能提速？`,
    answer: `切换程序、绑纹理、开关测试都有固定开销。状态排序把同 shader/纹理/状态的物体排在一起绘制，减少 useProgram、bindTexture 等切换次数，让 CPU 和驱动少做无用功，把时间花在实际绘制上。`,
    tags: ["状态排序"],
  },
  {
    id: "dog-rendering-optimization-3",
    chapter: "dog-rendering-optimization",
    level: 3,
    question: `阅读实例化代码：vertexAttribDivisor(loc,1) 的作用是什么？漏掉会怎样？`,
    answer: `vertexAttribDivisor(loc,1) 让该属性每实例才推进一次（而非每顶点推进），使每个实例读到自己的变换矩阵。漏掉则矩阵属性仍每顶点推进，所有实例都拿到第 0 个矩阵，结果 N 个物体长一样、位置没分开。`,
    tags: ["读代码", "实例化"],
  },
  {
    id: "dog-rendering-optimization-4",
    chapter: "dog-rendering-optimization",
    level: 4,
    question: `1000 个相同小球，drawArrays 画 1000 次和 drawArraysInstanced 画 1 次哪个快？为什么？批处理和实例化如何取舍？`,
    answer: `实例化画 1 次更快：省掉 999 次 draw call 的 CPU/驱动固定开销，GPU 只需复制几何。批处理适合几何不同但同材质的物体合并；实例化适合几何完全相同、仅变换不同的副本。取舍：几何相同用实例化（省顶点存储、GPU 复制），几何不同但同材质用批处理合并 VBO；若材质不同则用纹理图集让批处理可行。两者都需配合状态排序减少切换。`,
    tags: ["综合", "实例化", "取舍"],
  },
];
