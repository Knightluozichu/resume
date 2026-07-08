import type { ReviewQuestion } from "./types";

export const CgpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cgp-learning-map-1",
    chapter: "cgp-learning-map",
    level: 1,
    question: "计算机图形学：原理及实践全书的核心结构是什么？",
    answer: "从图形学导论与历史出发，经光栅图形学基础、2D 图形与变换、3D 图形与投影，到渲染算法、光照模型、建模方法，最后高级主题与动画。呈「基础→2D→3D→渲染→建模→高级」的递进结构。",
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "cgp-learning-map-2",
    chapter: "cgp-learning-map",
    level: 2,
    question: "计算机图形学的三个核心子领域是什么？它们之间是什么关系？",
    answer: "建模（描述物体的形状）、渲染（把模型变成图像）、动画（让模型随时间变化）。建模是输入，渲染是输出，动画是时间维度的扩展。三者循环：建模→渲染→动画→修改模型→重新渲染。",
    tags: ["建模", "渲染", "动画"],
  },
  {
    id: "cgp-learning-map-3",
    chapter: "cgp-learning-map",
    level: 3,
    question: "推荐的学习路径是什么？如果跳过光栅基础直接学 3D 渲染会有什么问题？",
    answer: "推荐路径：导论 → 光栅基础 → 2D 变换 → 3D 投影 → 渲染算法 → 光照 → 建模 → 高级。跳过光栅基础直接学 3D 会不理解像素怎么来的、走样为什么发生、深度缓冲如何工作——这些是 3D 渲染的底层基础。",
    tags: ["学习路径", "光栅化"],
  },
  {
    id: "cgp-learning-map-4",
    chapter: "cgp-learning-map",
    level: 4,
    question: "全书为什么从 2D 图形讲到 3D 再到渲染算法？这条路径的设计逻辑是什么？",
    answer: "设计逻辑是「从简单到复杂的认知阶梯」。2D 图形建立变换和光栅的基本概念（矩阵、扫描线）；3D 投影引入深度和透视；渲染算法解决可见性（Z-buffer、光线追踪）。每级在上一级基础上加一个维度（2D→3D 加深度，3D→渲染加可见性），降低认知负担。这是教学上的脚手架策略。",
    tags: ["设计逻辑", "认知阶梯", "综合"],
  },
];
