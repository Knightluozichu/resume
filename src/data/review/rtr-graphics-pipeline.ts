import type { ReviewQuestion } from "./types";

export const RtrGraphicsPipelineQuestions: ReviewQuestion[] = [
  {
    id: "rtr-graphics-pipeline-1",
    chapter: "rtr-graphics-pipeline",
    level: 1,
    question: `图形渲染管线的主要阶段有哪些？`,
    answer: `应用阶段（CPU）→ 几何阶段（顶点着色、曲面细分、几何着色、投影、裁剪）→ 光栅化阶段（三角形设置、片元着色、颜色混合）。`,
    tags: ["渲染管线", "阶段"],
  },
  {
    id: "rtr-graphics-pipeline-2",
    chapter: "rtr-graphics-pipeline",
    level: 2,
    question: `顶点着色器和片元着色器各自的输入输出是什么？`,
    answer: `顶点着色器输入顶点属性（位置、法线、UV等）和 uniform（变换矩阵），输出变换后的顶点位置和属性。片元着色器输入插值后的顶点属性和 uniform（纹理、光照参数），输出每个片元的颜色。`,
    tags: ["顶点着色器", "片元着色器"],
  },
  {
    id: "rtr-graphics-pipeline-3",
    chapter: "rtr-graphics-pipeline",
    level: 3,
    question: `光栅化阶段做了什么？为什么它是连接几何和像素的桥梁？`,
    answer: `光栅化把变换后的三角形转换为屏幕像素（片元），并对顶点属性做插值。它是桥梁因为几何阶段输出的是顶点（矢量），片元着色器需要的是像素（栅格），光栅化完成了从矢量到栅格的转换和属性插值。`,
    tags: ["光栅化", "插值"],
  },
  {
    id: "rtr-graphics-pipeline-4",
    chapter: "rtr-graphics-pipeline",
    level: 4,
    question: `渲染管线的哪些阶段是可编程的，哪些是固定的？这种设计有什么权衡？`,
    answer: `可编程：顶点、曲面细分、几何、片元、计算着色器。固定：光栅化、裁剪、深度测试、混合。固定阶段高度优化但不可定制；可编程阶段灵活但有开销。设计权衡是给艺术家开发者足够自由度的同时保留关键阶段的硬件加速。现代 API（Vulkan/DX12）进一步开放了管线配置。`,
    tags: ["可编程", "固定功能", "权衡"],
  },
];
