import type { ReviewQuestion } from "./types";

export const RtrTransformsQuestions: ReviewQuestion[] = [
  {
    id: "rtr-transforms-1",
    chapter: "rtr-transforms",
    level: 1,
    question: "3D 图形中常见的坐标空间有哪些？它们的变换顺序是什么？",
    answer: "局部空间 → 世界空间（模型变换）→ 观察空间（视图变换）→ 裁剪空间（投影变换）→ 屏幕空间（视口变换）。",
    tags: ["坐标空间", "变换"],
  },
  {
    id: "rtr-transforms-2",
    chapter: "rtr-transforms",
    level: 2,
    question: "齐次坐标是什么？为什么 3D 图形用 4x4 矩阵而非 3x3？",
    answer: "齐次坐标用 (x,y,z,w) 表示 3D 点（w=1）或向量（w=0）。4x4 矩阵可以把平移也表示为矩阵乘法（3x3 只能旋转缩放），让所有变换统一为矩阵连乘，方便管线串联。",
    tags: ["齐次坐标", "4x4矩阵"],
  },
  {
    id: "rtr-transforms-3",
    chapter: "rtr-transforms",
    level: 3,
    question: "透视投影矩阵是如何工作的？为什么需要透视除法？",
    answer: "透视投影矩阵把观察空间映射到裁剪空间，z 坐标影响 w 分量（近大远小）。透视除法（除以 w）把裁剪空间转为标准化设备坐标（NDC），实现近处物体大、远处物体小的透视效果。",
    tags: ["透视投影", "透视除法"],
  },
  {
    id: "rtr-transforms-4",
    chapter: "rtr-transforms",
    level: 4,
    question: "四元数相比欧拉角和旋转矩阵有什么优势？在实时渲染中什么时候用它？",
    answer: "四元数避免万向节锁（欧拉角的致命问题）、插值平滑（SLERP）、占用小（4个数 vs 矩阵16个）、拼接简单。在骨骼动画、相机平滑旋转、动画混合中用四元数。最终渲染时转回矩阵喂给着色器。欧拉角用于 UI 编辑（直观），矩阵用于着色器（GPU 友好）。",
    tags: ["四元数", "欧拉角", "万向节锁"],
  },
];
