import type { ReviewQuestion } from "./types";

export const CgpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cgp-final-review-1",
    chapter: "cgp-final-review",
    level: 1,
    question: `计算机图形学的三大子领域是什么？它们如何协作形成一个完整系统？`,
    answer: `建模（描述形状）、渲染（生成图像）、动画（随时间变化）。协作：建模创建物体→渲染生成帧→动画驱动模型变化→重新渲染。三者循环构成图形学管线。`,
    tags: ["复习", "三大子领域"],
  },
  {
    id: "cgp-final-review-2",
    chapter: "cgp-final-review",
    level: 2,
    question: `从 2D 光栅到 3D 渲染到全局光照，每一级的核心问题是什么？`,
    answer: `2D 光栅：如何把矢量变像素（扫描转换、走样）。3D 渲染：如何处理深度和可见性（Z-buffer、投影）。光照：如何模拟光与表面交互（BRDF）。全局光照：如何模拟光弹射（光线追踪、辐射度）。每级解决上一级的「不够真实」问题。`,
    tags: ["演进", "核心问题"],
  },
  {
    id: "cgp-final-review-3",
    chapter: "cgp-final-review",
    level: 3,
    question: `全书从基础光栅讲到高级主题，这条路径如何体现图形学的认知逻辑？`,
    answer: `体现「从简单到复杂、从离散到连续、从局部到全局」的认知逻辑。2D 光栅建立离散像素概念；3D 投影引入连续空间和深度；渲染算法解决全局可见性；光照从局部（直接光）到全局（间接光）；动画加入时间维度。每级在前级基础上加一个维度或提升真实感层次，符合从直觉到抽象的认知阶梯。`,
    tags: ["认知逻辑", "路径设计"],
  },
  {
    id: "cgp-final-review-4",
    chapter: "cgp-final-review",
    level: 4,
    question: `如果让你用全书知识解释「一个 3D 角色从建模到屏幕显示的完整过程」，你会如何串联？`,
    answer: `建模：用多边形网格或细分曲面创建角色几何，绑骨骼蒙皮。动画：关键帧或动作捕捉驱动骨骼，蒙皮变形网格。变换：模型矩阵放角色到世界，视图矩阵移相机，投影矩阵加透视。渲染：顶点着色器变换顶点，光栅化生成片元，片元着色器用 BRDF+纹理+光照算颜色，Z-buffer 消除隐藏面。后处理：色调映射+抗锯齿输出。每一步都对应全书一个章节的知识。`,
    tags: ["综合", "完整过程", "串联"],
  },
];
