import type { ReviewQuestion } from "./types";

export const shpOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "shp-optimization-1",
    chapter: "shp-optimization",
    level: 1,
    question: `Shader 性能优化的基本原则是什么？`,
    answer: `减少计算量、减少纹理采样、减少寄存器占用。优先优化像素着色器（执行频率最高），使用低精度类型（half/mediump），避免分支发散，利用内置函数替代自定义实现。`,
    tags: ["优化原则"],
  },
  {
    id: "shp-optimization-2",
    chapter: "shp-optimization",
    level: 2,
    question: `什么是 Shader 中的分支发散（branch divergence）？为什么它影响性能？`,
    answer: `GPU 以 warp/wavefront 为单位执行，同一组线程走不同分支时需要串行执行所有分支路径。if/else 中不同线程走不同路径会导致一部分线程空等，降低并行效率。应尽量用数学运算替代分支。`,
    tags: ["分支发散", "GPU并行"],
  },
  {
    id: "shp-optimization-3",
    chapter: "shp-optimization",
    level: 3,
    question: `寄存器溢出（register spilling）是什么？如何避免？`,
    answer: `Shader 使用的临时变量超过 GPU 寄存器数量时，编译器会将数据存到慢速显存（spill），大幅降低性能。避免方法：减少同时活跃的变量数、简化复杂表达式、避免过大的数组和循环展开过度。`,
    tags: ["寄存器", "spilling"],
  },
  {
    id: "shp-optimization-4",
    chapter: "shp-optimization",
    level: 4,
    question: `如何利用 LOD 和 Mipmap 优化纹理采样性能？`,
    answer: `1)为所有纹理生成 Mipmap 链，GPU 自动选择合适层级减少缓存压力 2)远处物体用低分辨率纹理（Texture LOD）3)用 textureGrad 手动控制 mip 选择 4)避免在像素着色器中做依赖纹理读取（dependent texture read），会导致缓存失效。`,
    tags: ["Mipmap", "纹理优化", "LOD"],
  },
];
