import type { ReviewQuestion } from "./types";

export const shpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "shp-learning-map-1",
    chapter: "shp-learning-map",
    level: 1,
    question: `《Shader 开发实战》全书分哪几个板块？`,
    answer: `基础（学习地图、渲染管线）、核心（HLSL 基础、顶点着色器、像素着色器、光照着色器）、高级（后处理、性能优化、高级特效）、复习（总复习）。`,
    tags: ["全书结构"],
  },
  {
    id: "shp-learning-map-2",
    chapter: "shp-learning-map",
    level: 2,
    question: `本书的学习主线是什么？`,
    answer: `从渲染管线整体认知出发→掌握 HLSL 语法→逐阶段实现顶点和像素着色器→叠加光照→进入后处理→性能优化→高级特效。每个阶段配实战代码，由浅入深。`,
    tags: ["学习主线"],
  },
  {
    id: "shp-learning-map-3",
    chapter: "shp-learning-map",
    level: 3,
    question: `顶点着色器和像素着色器在整个学习路径中分别处于什么位置？`,
    answer: `顶点着色器和像素着色器位于核心板块，是 HLSL 基础语法之后的第一个实战环节。顶点着色器负责几何变换，像素着色器负责逐像素颜色计算，两者是光照着色器和后处理的前置依赖。`,
    tags: ["章节关系"],
  },
  {
    id: "shp-learning-map-4",
    chapter: "shp-learning-map",
    level: 4,
    question: `如何高效使用本书做项目驱动学习？`,
    answer: `1)先通读学习地图建立全局认知 2)用 HLSL 基础写第一个着色器 3)逐章实现顶点/像素/光照着色器并整合 4)后处理章节做屏幕特效 demo 5)性能优化章节做 before/after 对比 6)高级特效作为最终项目整合。`,
    tags: ["学习方法"],
  },
];
