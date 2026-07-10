import type { ReviewQuestion } from "./types";

/** 代码调优 复习题 */
export const ppCodeTuningQuestions: ReviewQuestion[] = [
  {
    id: "pp-code-tuning-1",
    chapter: "pp-code-tuning",
    level: 1,
    question: `代码调优和算法优化有什么区别？`,
    answer: `算法优化改变复杂度，效果大成本高。代码调优不改变算法只优化常数因子，效果有限成本低。先算法优化再代码调优。`,
    tags: ["代码调优"],
  },
  {
    id: "pp-code-tuning-2",
    chapter: "pp-code-tuning",
    level: 2,
    question: `常见的代码调优技巧有哪些？`,
    answer: `缓存（缓存频繁计算值）、循环展开（减少分支开销）、强度削减（加法替代乘法）、减少函数调用、不变操作移出循环。`,
    tags: ["调优技巧"],
  },
  {
    id: "pp-code-tuning-3",
    chapter: "pp-code-tuning",
    level: 3,
    question: `为什么调优前必须先profile？`,
    answer: `90%运行时间花在10%代码上。不profile可能优化非热点浪费时间，甚至干扰编译器优化让代码更慢。`,
    tags: ["profile", "调优原则"],
  },
  {
    id: "pp-code-tuning-4",
    chapter: "pp-code-tuning",
    level: 4,
    question: `请阐述代码调优的完整流程及每步的注意事项。`,
    answer: `1）profile定位热点（用真实数据，多次运行取平均）。2）分析热点瓶颈（CPU计算？内存访问？分支预测？缓存未命中？）。3）针对性调优（计算密集→循环展开/强度削减；内存密集→缓存/数据布局优化；分支密集→减少条件判断）。4）benchmark验证（对比调优前后性能，确认提升）。5）评估代价（可读性下降？维护成本？可移植性？）。6）决定是否保留（收益>代价则保留，否则回退）。核心原则：measure, don't guess。`,
    tags: ["综合", "代码调优", "流程"],
  },
];
