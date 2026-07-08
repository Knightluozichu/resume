import type { ReviewQuestion } from "./types";

export const GpgFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gpg-final-review-1",
    chapter: "gpg-final-review",
    level: 1,
    question: "用一帧渲染顺序串联 GPU Gems 全书九大主题。",
    answer: "几何准备（LOD/曲面细分+粒子更新）→ 光照材质（阴影映射+BRDF+自然效果+前向/延迟渲染）→ 后处理输出（Bloom+色调映射）。GPGPU 贯穿全程加速各阶段。",
    tags: ["复习", "渲染顺序"],
  },
  {
    id: "gpg-final-review-2",
    chapter: "gpg-final-review",
    level: 2,
    question: "GPU Gems 的核心方法论是什么？有什么优劣？",
    answer: "效果驱动——从视觉目标倒推技术方案。优势是直觉性强、贴近开发流程；劣势是知识点分散、需读者自行归纳理论体系。",
    tags: ["效果驱动", "方法论"],
  },
  {
    id: "gpg-final-review-3",
    chapter: "gpg-final-review",
    level: 3,
    question: "全书从「自然效果」到「GPGPU」的演进逻辑中，每一级的驱动力是什么？",
    answer: "自然效果需要噪声光照（着色器）→ 光照需要物理模型（BRDF）→ 大量像素处理需要后处理 → 几何复杂度需要 LOD 细分 → 海量粒子需要 GPU 并行 → 突破图形管线走向 GPGPU。每一级是上一级无法满足时引入的新能力。",
    tags: ["演进逻辑", "驱动力"],
  },
  {
    id: "gpg-final-review-4",
    chapter: "gpg-final-review",
    level: 4,
    question: "如果让你用 GPU Gems 的知识设计一个「水面+粒子+后处理」的完整方案，各环节如何配合？",
    answer: "几何阶段：曲面细分给水面近处加细节，Compute Shader 更新水花粒子。光照阶段：水面用 Gerstner 波扰动法线+菲涅尔反射+Cook-Torrance BRDF，阴影映射给水面投阴影。渲染路径：不透明水面用延迟渲染存 G-Buffer，透明水花用前向渲染叠加。后处理：Bloom 给高光溢出，ACES 色调映射。GPGPU 贯穿：粒子更新、阴影模糊、Bloom 降采样都用 Compute Shader。",
    tags: ["综合", "方案设计"],
  },
];
