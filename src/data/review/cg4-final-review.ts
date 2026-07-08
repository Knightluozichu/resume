import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const cg4FinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cg4-final-review-1",
    chapter: "cg4-final-review",
    level: 1,
    question: "用一句话概括计算机图形学渲染的核心流程。",
    answer: "渲染核心流程：3D 顶点数据经过几何变换（Model-View-Projection）→ 图元装配 → 光栅化（扫描转换为片段）→ 深度测试（可见性）→ 片段着色（光照+纹理）→ 帧缓冲输出为 2D 像素。",
    tags: ["核心流程", "总结"],
  },
  {
    id: "cg4-final-review-2",
    chapter: "cg4-final-review",
    level: 2,
    question: "总结几何变换中三个矩阵（Model、View、Projection）各自的作用和组合顺序。",
    answer: "Model 矩阵将顶点从模型局部空间变换到世界空间（含缩放、旋转、平移）；View 矩阵将世界空间变换到摄像机空间（相当于摄像机变换的逆）；Projection 矩阵将 3D 摄像机空间投影到 2D 裁剪空间（透视或正交）。组合顺序是 P * V * M * v（从右向左作用），注意矩阵乘法不可交换。透视投影后还需透视除法（除以 w）得到 NDC（归一化设备坐标）。",
    tags: ["MVP矩阵", "变换组合", "总结"],
  },
  {
    id: "cg4-final-review-3",
    chapter: "cg4-final-review",
    level: 3,
    question: "设计一个实时渲染管线时，你会在哪些阶段做优化？分别用什么技术？",
    answer: "1) 几何阶段：视锥裁剪（剔除视锥外物体）、层次包围盒加速、LOD（远处用低模）、GPU Instancing（相同网格批量渲染）；2) 光栅化前：背面剔除、深度预处理（Z-Prepass 减少片段着色执行）；3) 片段阶段：Mipmap 减少纹理带宽、延迟着色（多光源场景）、Early-Z（硬件深度测试提前剔除）；4) 带宽优化：压缩顶点格式、纹理压缩（BC/ASTC）、合批减少 Draw Call。核心思路：减少送入管线的几何量、减少片段着色器执行次数、减少内存带宽。",
    tags: ["性能优化", "管线优化", "综合应用"],
  },
  {
    id: "cg4-final-review-4",
    chapter: "cg4-final-review",
    level: 4,
    question: "从理论到实践，论述计算机图形学从基础到高级的知识体系如何支撑现代游戏引擎的渲染架构。",
    answer: "游戏引擎渲染架构直接映射图形学知识体系：1) 基础层——渲染管线是引擎渲染框架的骨架，每个阶段对应引擎中的一个子系统（顶点处理→MeshRenderer、光栅化→GPU 驱动、片段着色→材质系统）；2) 核心层——几何变换支撑场景图和相机系统，光栅化+可见性（Z-Buffer）是 GPU 硬件管线，光照模型支撑材质/着色器系统；3) 高级层——纹理映射（含法线贴图/Mipmap）支撑细节表现，曲线曲面（曲面细分）支撑 LOD 和地形，高级渲染（阴影映射/延迟着色/GI）支撑真实感。引擎的设计决策（前向 vs 延迟、LOD 策略、阴影质量）本质上是在图形学理论和性能预算之间做权衡。",
    tags: ["游戏引擎", "渲染架构", "知识体系", "综合论述"],
  },
];
