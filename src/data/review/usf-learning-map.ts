import type { ReviewQuestion } from "./types";

export const usfLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "usf-learning-map-1",
    chapter: "usf-learning-map",
    level: 1,
    question: "《Unity 着色器和屏幕特效》全书分哪几个板块？",
    answer: "基础（学习地图、屏幕特效基础）、核心（深度纹理特效、后处理栈、图像效果、光照特效）、高级（色彩校正调色、辉光泛光、高级屏幕特效）、复习（总复习）。",
    tags: ["全书结构"],
  },
  {
    id: "usf-learning-map-2",
    chapter: "usf-learning-map",
    level: 2,
    question: "本书的学习主线是什么？",
    answer: "从屏幕特效基础原理出发→利用深度纹理实现特效→掌握后处理栈架构→实现图像效果和光照特效→色彩校正与调色→辉光泛光效果→高级屏幕特效综合实战。",
    tags: ["学习主线"],
  },
  {
    id: "usf-learning-map-3",
    chapter: "usf-learning-map",
    level: 3,
    question: "屏幕特效和普通 Shader 的核心区别是什么？",
    answer: "普通 Shader 处理 3D 几何体的顶点和像素，屏幕特效处理全屏 2D 图像。屏幕特效将场景渲染到纹理后，用全屏着色器对每个像素做后处理（模糊、调色、辉光等），不需要几何体数据。",
    tags: ["屏幕特效", "对比"],
  },
  {
    id: "usf-learning-map-4",
    chapter: "usf-learning-map",
    level: 4,
    question: "如何系统学习 Unity 屏幕特效开发？",
    answer: "1)理解 OnRenderImage 和 RenderTexture 基础 2)学习深度纹理获取和使用 3)掌握后处理栈架构 4)逐个实现图像效果（模糊/边缘检测）5)光照特效（体积光/镜头光晕）6)色彩校正（LUT/ACESToneMapping）7)辉光泛光管线 8)综合实战。",
    tags: ["学习方法"],
  },
];
