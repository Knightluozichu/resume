import type { ReviewQuestion } from "./types";

export const uslLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "usl-learning-map-1",
    chapter: "usl-learning-map",
    level: 1,
    question: "《Unity ShaderLab 开发实战详解》全书分哪几个板块？",
    answer: "基础（学习地图、ShaderLab 结构）、核心（Properties、SubShader 与 Pass、表面着色器、光照模型）、高级（GrabPass、命令缓冲区、高级技巧）、复习（总复习）。",
    tags: ["全书结构"],
  },
  {
    id: "usl-learning-map-2",
    chapter: "usl-learning-map",
    level: 2,
    question: "本书的学习主线是什么？",
    answer: "从 ShaderLab 文件结构出发→理解 Properties 声明→掌握 SubShader 和 Pass 的渲染流程→学习表面着色器简化开发→自定义光照模型→GrabPass 和命令缓冲区高级技术→综合实战。",
    tags: ["学习主线"],
  },
  {
    id: "usl-learning-map-3",
    chapter: "usl-learning-map",
    level: 3,
    question: "表面着色器和顶点/片段着色器在 Unity 中有什么关系？",
    answer: "表面着色器是 Unity 对顶点/片段着色器的封装，自动处理光照和阴影。它编译后会生成多个 Pass 的顶点/片段着色器。适合快速实现光照效果；需要更精细控制时应直接写顶点/片段着色器。",
    tags: ["表面着色器", "对比"],
  },
  {
    id: "usl-learning-map-4",
    chapter: "usl-learning-map",
    level: 4,
    question: "如何系统学习 Unity ShaderLab 开发？",
    answer: "1)理解 ShaderLab 文件结构框架 2)掌握 Properties 声明与材质面板交互 3)学习 SubShader/Pass 的 LOD 和 Tags 4)用表面着色器快速实现光照 5)自定义光照模型深入理解 6)GrabPass 和 Command Buffer 做屏幕特效 7)综合实战整合所有知识。",
    tags: ["学习方法"],
  },
];
