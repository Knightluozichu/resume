import type { ReviewQuestion } from "./types";

export const bl3LightingQuestions: ReviewQuestion[] = [
  {
    id: "bl3-lighting-1",
    chapter: "bl3-lighting",
    level: 1,
    question: `Blender 的四种灯光类型是什么？`,
    answer: `点光（灯泡，全方向衰减）、聚光（手电筒，锥形范围）、面光（柔光箱，柔和阴影）、太阳光（平行光，无距离衰减）。`,
    tags: ["灯光类型", "基础"],
  },
  {
    id: "bl3-lighting-2",
    chapter: "bl3-lighting",
    level: 2,
    question: `三点布光法中主光、辅光、轮廓光各自的作用是什么？`,
    answer: `主光是最强光源，决定亮面和阴影方向；辅光较弱，填充阴影面降低反差让暗部可见；轮廓光从背后打来勾勒边缘，分离物体与背景。`,
    tags: ["三点布光", "布光"],
  },
  {
    id: "bl3-lighting-3",
    chapter: "bl3-lighting",
    level: 3,
    question: `HDRI 环境贴图在 Blender 中起什么作用？如何设置？`,
    answer: `HDRI 提供全场景环境光照和反射，让物体表面反射真实环境。在 World 属性的 Surface 中加 Environment Texture 节点加载 HDRI，调节 Strength 控制强度。`,
    tags: ["HDRI", "世界环境"],
  },
  {
    id: "bl3-lighting-4",
    chapter: "bl3-lighting",
    level: 4,
    question: `为什么说布光的本质是制造明暗对比而非照亮一切？`,
    answer: `人眼通过明暗变化感知形状和深度——没有暗就没有立体感。如果所有灯光强度相近，画面均匀但平淡。实际工作中：先设一盏主光确定明暗方向，然后有选择地补光，留出阴影区域。多灯不是更好而是更乱。`,
    tags: ["布光原则", "明暗对比", "综合"],
  },
];
