import type { ReviewQuestion } from "./types";

/** 全书学习地图 复习题 */
export const cg4LearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cg4-learning-map-1",
    chapter: "cg4-learning-map",
    level: 1,
    question: "计算机图形学第4版全书分为哪几个板块？",
    answer: "基础（学习地图、图形渲染管线）、核心（光栅化、几何变换、可见性）、高级（光照模型、纹理映射、曲线曲面、高级渲染）、复习（总复习）。",
    tags: ["全书结构", "学习路径"],
  },
  {
    id: "cg4-learning-map-2",
    chapter: "cg4-learning-map",
    level: 2,
    question: "为什么图形渲染管线是全书的核心主线？",
    answer: "因为渲染管线串起了从 3D 顶点到 2D 像素的完整流程：顶点变换（几何变换章）、图元装配与光栅化（光栅化章）、深度测试（可见性章）、片段着色（光照与纹理章）。每个高级主题都是管线某个阶段的深入扩展。",
    tags: ["渲染管线", "核心主线"],
  },
  {
    id: "cg4-learning-map-3",
    chapter: "cg4-learning-map",
    level: 3,
    question: "给定一个需要实时渲染的游戏场景，你会如何应用全书知识来设计渲染方案？",
    answer: "1) 用几何变换将模型放置到世界空间（Model/View/Proj 矩阵）；2) 光栅化将三角形转为片段；3) Z-Buffer 做可见性剔除；4) Phong 光照模型计算片段颜色；5) 纹理映射增加表面细节；6) 如需曲面，用 Bezier/NURBS 细分；7) 高级渲染中加入阴影、延迟着色等技术。核心是沿管线逐阶段优化。",
    tags: ["应用", "渲染方案"],
  },
  {
    id: "cg4-learning-map-4",
    chapter: "cg4-learning-map",
    level: 4,
    question: "对比光栅化与光线追踪两种渲染范式，说明各自的优势场景及全书知识在其中的角色差异。",
    answer: "光栅化是前向投影（图元→像素），速度快、GPU 并行度高，适合实时渲染（游戏），但全局光照需近似。光线追踪是反向追踪（像素→光线→场景），物理精确、天然支持反射/折射/阴影，但计算量大，适合离线渲染（电影）。全书知识在光栅化中是逐阶段管线设计，在光线追踪中则是加速结构（BVH）、着色模型（BRDF）和采样理论的应用。",
    tags: ["渲染范式", "综合对比"],
  },
];
