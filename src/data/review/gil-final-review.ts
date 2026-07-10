import type { ReviewQuestion } from "./types";

/** 全局光照总复习 复习题 */
export const gilFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gil-final-review-1",
    chapter: "gil-final-review",
    level: 1,
    question: `全书四大板块分别解决什么核心问题？`,
    answer: `直接与间接光解决「什么是GI」，离线GI方法解决「如何计算光弹射」，采样理论解决「如何高效计算」，实时GI解决「如何快速近似」。呈概念→方法→理论→工程的递进。`,
    tags: ["全书回顾"],
  },
  {
    id: "gil-final-review-2",
    chapter: "gil-final-review",
    level: 2,
    question: `对比辐射度、路径追踪、光子映射三种GI方法的核心差异。`,
    answer: `辐射度：漫反射矩阵求解，视角无关，无噪声但有偏（面片离散化）。路径追踪：随机游走，通用无偏，但有噪声需大量采样。光子映射：正向追踪，擅长焦散，有偏但一致。辐射度适合漫反射室内，路径追踪适合通用场景，光子映射适合焦散。`,
    tags: ["GI方法对比"],
  },
  {
    id: "gil-final-review-3",
    chapter: "gil-final-review",
    level: 3,
    question: `有偏无偏的权衡如何影响GI方法选择？`,
    answer: `无偏(路径追踪)高采样质量最优但低采样噪声大。有偏一致(光子映射)低采样更平滑但高采样有偏差上限。有偏不一致(辐照度缓存)最快但精度有上限。低预算选有偏(平滑>噪声)，高预算选无偏(无上限)，焦散选光子映射(有偏但高效)。`,
    tags: ["有偏无偏", "选择"],
  },
  {
    id: "gil-final-review-4",
    chapter: "gil-final-review",
    level: 4,
    question: `设计一个同时处理焦散、色渗透、光泽反射和实时约束的完整GI方案。`,
    answer: `离线方案：1)直接光NEE+MIS保证质量。2)焦散用光子映射(正向追踪经镜面/玻璃)。3)漫反射间接(色渗透)用路径追踪+辐照度缓存加速。4)光泽反射用路径追踪BRDF采样。5)自适应采样+降噪。实时方案：1)1spp路径追踪(需RTX)。2)焦散用预计算或VPL近似。3)色渗透用LPV/RSM。4)光泽反射用SSR(屏幕空间反射)。5)SVGF降噪。整体：离线用混合架构(PM+PT+IC)取精度，实时用近似(RSM/LPV/SSR)+降噪取速度。`,
    tags: ["综合方案", "GI设计"],
  },
];