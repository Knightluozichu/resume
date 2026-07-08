import type { ReviewQuestion } from "./types";

export const RtrFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "rtr-final-review-1",
    chapter: "rtr-final-review",
    level: 1,
    question: "实时渲染第4版全书的核心线索是什么？",
    answer: "从图形管线基础出发，经变换着色纹理，到高级着色阴影全局光照，最后优化。核心线索是在「实时」时间约束下追求最大真实感的工程权衡。",
    tags: ["复习", "核心线索"],
  },
  {
    id: "rtr-final-review-2",
    chapter: "rtr-final-review",
    level: 2,
    question: "实时渲染中「速度 vs 质量」的权衡体现在哪些技术选择上？",
    answer: "阴影用 Shadow Map 而非光追（快但不精确）；GI 用探针/SSAO 而非路径追踪（近似但有穿帮）；材质用 PBR 近似而非完整 BSDF（足够真实但非物理精确）；抗锯齿用 TAA 而非超采样（快但有鬼影）。每个选择都是在 16ms 内可完成的前提下追求最大质量。",
    tags: ["速度", "质量", "权衡"],
  },
  {
    id: "rtr-final-review-3",
    chapter: "rtr-final-review",
    level: 3,
    question: "从着色基础到全局光照，每一级引入了什么新概念、解决了什么问题？",
    answer: "着色基础：直接光照（一个光源照一个表面），解决基本可见性。纹理：表面细节（法线/粗糙度贴图），解决材质丰富度。高级着色：微表面 BRDF，解决物理正确性。阴影：Shadow Map，解决遮挡关系。GI：间接光照，解决光弹射。每级解决上一级「不够真实」的问题，代价是计算量递增。",
    tags: ["演进", "着色", "GI"],
  },
  {
    id: "rtr-final-review-4",
    chapter: "rtr-final-review",
    level: 4,
    question: "如果让你为开放世界游戏设计渲染管线，如何综合运用全书知识？",
    answer: "几何：GPU Driven Pipeline 做 Hi-Z 遮挡剔除+自动 LOD（Nanite 思路）。着色：PBR 金属度工作流+法线/粗糙度贴图。阴影：CSM 近处高清+远处低清，PCF 软化。GI：静态光照贴图+动态光照探针 SH，SSAO 加接触阴影。后处理：HDR+Bloom+ACES 色调映射+TAA。优化：实例化画植被，视锥剔除+遮挡剔除。核心是在 16ms 内用分层策略让近处精远处粗。",
    tags: ["综合", "渲染管线", "开放世界"],
  },
];
