import type { ReviewQuestion } from "./types";

export const usfAdvancedEffectsQuestions: ReviewQuestion[] = [
  {
    id: "usf-advanced-effects-1",
    chapter: "usf-advanced-effects",
    level: 1,
    question: `高级屏幕特效有哪些典型应用？`,
    answer: `屏幕空间反射（SSR）、屏幕空间折射、运动模糊、色差（Chromatic Aberration）、胶片颗粒（Film Grain）、扫描线、夜视/热成像风格化效果等。这些效果在基础图像处理上叠加更复杂的算法。`,
    tags: ["高级特效", "类型"],
  },
  {
    id: "usf-advanced-effects-2",
    chapter: "usf-advanced-effects",
    level: 2,
    question: `运动模糊（Motion Blur）在屏幕特效中如何实现？`,
    answer: `1)使用速度纹理（Motion Vectors）记录每个像素的屏幕空间移动量 2)在屏幕特效 Shader 中沿速度方向多次采样源纹理 3)累加采样结果实现模糊 4)速度越大模糊越强 5)可用 Object Motion 或 Camera Motion 分别处理 6)降分辨率计算速度场提升性能。`,
    tags: ["运动模糊", "Motion Blur"],
  },
  {
    id: "usf-advanced-effects-3",
    chapter: "usf-advanced-effects",
    level: 3,
    question: `色差（Chromatic Aberration）效果的实现原理是什么？`,
    answer: `模拟镜头边缘 RGB 通道偏移的现象。1)计算像素到屏幕中心的距离 2)距离越远偏移越大 3)分别用不同偏移量采样 R/G/B 通道 4)R 通道向外偏移，B 通道向内偏移（或反之）5)合并通道输出 6)通常只在画面边缘产生，中心区域无色差 7)可控制强度和边缘范围。`,
    tags: ["色差", "Chromatic Aberration"],
  },
  {
    id: "usf-advanced-effects-4",
    chapter: "usf-advanced-effects",
    level: 4,
    question: `如何实现屏幕空间折射效果？`,
    answer: `1)获取场景不透明纹理（Opaque Texture/GrabPass）2)采样法线贴图获取扰动方向 3)将法线扰动乘以折射强度 4)用扰动后的 UV 采样不透明纹理 5)叠加折射物体的颜色和透明度 6.可用深度纹理控制折射强度（近处折射强远处弱）7.结合 Fresnel 混合反射和折射 8.注意折射需要在透明物体渲染前抓取屏幕。`,
    tags: ["屏幕折射", "综合", "实践"],
  },
];
