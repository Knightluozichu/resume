import type { ReviewQuestion } from "./types";

export const glsFragmentShadingQuestions: ReviewQuestion[] = [
  {
    id: "gls-fragment-shading-1",
    chapter: "gls-fragment-shading",
    level: 1,
    question: "片段和像素的区别？",
    answer: "片段是潜在像素，包含颜色/深度/模板等信息。通过深度测试、模板测试、混合等逐片段操作后写入帧缓冲才成为像素。一个像素可能对应多个片段。",
    tags: ["片段", "像素"],
  },
  {
    id: "gls-fragment-shading-2",
    chapter: "gls-fragment-shading",
    level: 2,
    question: "逐片段操作的顺序？",
    answer: "片段着色器→深度测试(可Early-Z)→模板测试→混合→抖动→逻辑操作→写入帧缓冲。Early-Z在着色器前做深度测试，但着色器修改深度或discard会禁用。",
    tags: ["逐片段操作"],
  },
  {
    id: "gls-fragment-shading-3",
    chapter: "gls-fragment-shading",
    level: 3,
    question: "什么是discard？有什么影响？",
    answer: "discard在片段着色器中直接丢弃当前片段(不写入帧缓冲)。用于alpha测试(透明裁剪)。影响：禁用Early-Z(硬件无法提前知道哪些片段被discard)，性能下降。",
    tags: ["discard"],
  },
  {
    id: "gls-fragment-shading-4",
    chapter: "gls-fragment-shading",
    level: 4,
    question: "如何优化片段着色器性能？",
    answer: "1)减少纹理采样(合并纹理) 2)用LOD/Mipmap减少远处带宽 3)避免discard(用alpha blend替代) 4)简化光照(用LUT/Half Lambert) 5)Z-Prepass减少着色器执行 6)延迟着色多光源。",
    tags: ["片段优化", "性能"],
  },
];
