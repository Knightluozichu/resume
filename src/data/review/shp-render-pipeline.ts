import type { ReviewQuestion } from "./types";

export const shpRenderPipelineQuestions: ReviewQuestion[] = [
  {
    id: "shp-render-pipeline-1",
    chapter: "shp-render-pipeline",
    level: 1,
    question: `渲染管线的三个主要阶段是什么？`,
    answer: `应用程序阶段（CPU 侧准备数据）、几何阶段（顶点变换、裁剪、投影）、光栅化阶段（图元转换为片段并着色）。Shader 主要在几何阶段和光栅化阶段执行。`,
    tags: ["管线阶段"],
  },
  {
    id: "shp-render-pipeline-2",
    chapter: "shp-render-pipeline",
    level: 2,
    question: `顶点着色器和像素着色器在管线中分别做什么？`,
    answer: `顶点着色器在几何阶段逐顶点执行，负责 MVP 变换和属性传递；像素着色器在光栅化阶段逐片段执行，负责计算最终颜色（纹理采样、光照、混合等）。`,
    tags: ["着色器角色"],
  },
  {
    id: "shp-render-pipeline-3",
    chapter: "shp-render-pipeline",
    level: 3,
    question: `为什么说像素着色器的优化优先级通常高于顶点着色器？`,
    answer: `因为光栅化后片段数量远多于顶点数量（一个三角形可能覆盖数千个像素），像素着色器的执行次数通常远大于顶点着色器，所以其计算开销对帧率影响更大。`,
    tags: ["性能", "执行频率"],
  },
  {
    id: "shp-render-pipeline-4",
    chapter: "shp-render-pipeline",
    level: 4,
    question: `给定一个场景，如何判断瓶颈在 CPU 还是在 GPU 管线的哪个阶段？`,
    answer: `1)降低分辨率：若帧率显著提升则瓶颈在像素着色器 2)简化着色器逻辑：若提升明显则瓶颈在对应着色器 3)减少 Draw Call：若提升则瓶颈在 CPU 4)减少顶点数：若提升则瓶颈在顶点阶段。逐步排除定位瓶颈。`,
    tags: ["瓶颈分析", "优化"],
  },
];
