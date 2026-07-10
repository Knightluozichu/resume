import type { ReviewQuestion } from "./types";

export const Cgp2dGraphicsQuestions: ReviewQuestion[] = [
  {
    id: "cgp-2d-graphics-1",
    chapter: "cgp-2d-graphics",
    level: 1,
    question: `2D 仿射变换包括哪些？为什么用齐次坐标？`,
    answer: `包括平移、旋转、缩放、剪切。齐次坐标把平移也变成矩阵乘法（2D 用 3x3 矩阵），让所有变换统一为矩阵连乘，方便组合和管线串联。`,
    tags: ["仿射变换", "齐次坐标"],
  },
  {
    id: "cgp-2d-graphics-2",
    chapter: "cgp-2d-graphics",
    level: 2,
    question: `2D 变换矩阵的组合顺序为什么重要？旋转再平移和平移再旋转结果不同吗？`,
    answer: `矩阵乘法不满足交换律，AB≠BA。先旋转再平移：物体原地旋转后移到新位置；先平移再旋转：物体先移到新位置再绕原点旋转（位置会变）。组合顺序必须与意图一致，通常按 SRT（缩放→旋转→平移）顺序。`,
    tags: ["变换顺序", "矩阵乘法"],
  },
  {
    id: "cgp-2d-graphics-3",
    chapter: "cgp-2d-graphics",
    level: 3,
    question: `2D 图形的窗口到视口变换是什么？为什么需要它？`,
    answer: `窗口到视口变换把逻辑坐标系的窗口区域映射到屏幕坐标系的视口区域。需要它是因为图形定义在任意逻辑坐标系（如数学坐标），但显示在固定屏幕坐标系。变换包括缩放（窗口到视口大小比）和平移（窗口原点到视口原点）。`,
    tags: ["窗口", "视口", "变换"],
  },
  {
    id: "cgp-2d-graphics-4",
    chapter: "cgp-2d-graphics",
    level: 4,
    question: `CSS transform 的 matrix(a,b,c,d,e,f) 对应什么 2D 变换矩阵？如何分解？`,
    answer: `对应 3x3 齐次矩阵 [[a,c,e],[b,d,f],[0,0,1]]，其中 [a,b;c,d] 是线性变换（旋转缩放剪切），[e,f] 是平移。分解：平移 = (e,f)；从 [a,b;c,d] 提取缩放 sx=sqrt(a^2+b^2), sy=sqrt(c^2+d^2)；旋转 theta=atan2(b,a)；剪切从残差提取。这就是 CSS transform 的数学基础。`,
    tags: ["CSS", "矩阵分解", "2D变换"],
  },
];
