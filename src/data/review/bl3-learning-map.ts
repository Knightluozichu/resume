import type { ReviewQuestion } from "./types";

export const bl3LearningMapQuestions: ReviewQuestion[] = [
  {
    id: "bl3-learning-map-1",
    chapter: "bl3-learning-map",
    level: 1,
    question: "Blender 全书的核心结构是什么？",
    answer: "全书分四阶段：基础（界面与导航）→ 核心（建模、材质、灯光、动画）→ 进阶（雕刻、渲染、游戏导出）→ 复习。呈「认识工具→做出模型→赋予质感→交给引擎」的递进结构。",
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "bl3-learning-map-2",
    chapter: "bl3-learning-map",
    level: 2,
    question: "Blender 的两种渲染引擎 Cycles 和 Eevee 的核心区别是什么？",
    answer: "Cycles 是光线追踪渲染器，逐像素模拟光线弹射，画质高但速度慢；Eevee 是实时渲染器，用光栅化近似，速度快但全局光照和反射不如 Cycles 精确。",
    tags: ["Cycles", "Eevee", "渲染引擎"],
  },
  {
    id: "bl3-learning-map-3",
    chapter: "bl3-learning-map",
    level: 3,
    question: "推荐的学习路径是什么？如果跳过建模直接学动画会有什么问题？",
    answer: "推荐路径：界面→建模→材质→灯光→动画→雕刻→渲染→导出。跳过建模直接学动画会缺少可绑骨的模型——动画需要角色或物体作为载体，没有模型就无法做绑骨和关键帧。",
    tags: ["学习路径", "建模"],
  },
  {
    id: "bl3-learning-map-4",
    chapter: "bl3-learning-map",
    level: 4,
    question: "为什么 Blender 能同时覆盖建模、材质、动画和导出？这种全功能设计带来了什么优势和代价？",
    answer: "Blender 把传统分软件的工作流整合到一个程序里，优势是数据无需在软件间传递（避免格式丢失），独立开发者成本低。代价是每个模块的深度不如专业软件（如 ZBrush 的雕刻、Substance 的材质），且学习曲线陡峭。",
    tags: ["全功能", "优势代价", "综合"],
  },
];
