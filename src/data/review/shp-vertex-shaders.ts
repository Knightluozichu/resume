import type { ReviewQuestion } from "./types";

export const shpVertexShadersQuestions: ReviewQuestion[] = [
  {
    id: "shp-vertex-shaders-1",
    chapter: "shp-vertex-shaders",
    level: 1,
    question: `顶点着色器的核心职责是什么？`,
    answer: `将顶点从模型空间变换到裁剪空间（通过 MVP 矩阵），同时传递和准备插值属性（法线、UV、颜色等）供像素着色器使用。每个顶点执行一次。`,
    tags: ["顶点着色器", "MVP"],
  },
  {
    id: "shp-vertex-shaders-2",
    chapter: "shp-vertex-shaders",
    level: 2,
    question: `SV_POSITION 语义和普通 POSITION 语义有什么区别？`,
    answer: `POSITION 是顶点着色器输入语义，从顶点缓冲读取模型空间坐标；SV_POSITION 是顶点着色器输出语义，表示裁剪空间坐标，系统会自动进行透视除法和视口变换，像素着色器中读取的 SV_Position 已是屏幕空间坐标。`,
    tags: ["语义", "SV_POSITION"],
  },
  {
    id: "shp-vertex-shaders-3",
    chapter: "shp-vertex-shaders",
    level: 3,
    question: `顶点属性在光栅化阶段是如何插值的？`,
    answer: `光栅化器根据片段在图元内的重心坐标对顶点属性做线性插值。透视校正插值会考虑 w 分量，确保纹理在透视投影下不变形。可在语义前加 centroid/flat 等修饰符改变插值方式。`,
    tags: ["插值", "光栅化"],
  },
  {
    id: "shp-vertex-shaders-4",
    chapter: "shp-vertex-shaders",
    level: 4,
    question: `如何在顶点着色器中实现简单的顶点动画（如风吹草效果）？`,
    answer: `1)读取顶点位置和时间参数 2)根据顶点高度计算弯曲权重（越高弯曲越大）3)用 sin/cos 函数加时间生成偏移 4)偏移量乘以权重加到顶点 x/z 分量 5)输出变换后位置。注意保持法线同步更新以避免光照错误。`,
    tags: ["顶点动画", "实践"],
  },
];
