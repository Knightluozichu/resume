import type { ReviewQuestion } from "./types";

export const usfImageEffectsQuestions: ReviewQuestion[] = [
  {
    id: "usf-image-effects-1",
    chapter: "usf-image-effects",
    level: 1,
    question: `屏幕特效中常用的图像处理效果有哪些？`,
    answer: `模糊（高斯/方框/径向）、锐化（Unsharp Mask）、边缘检测（Sobel/Roberts/Prewitt）、色彩反转、灰度化、像素化、扭曲（波纹/鱼眼/桶形畸变）等。每个效果都是一个全屏着色器 Pass。`,
    tags: ["图像效果", "类型"],
  },
  {
    id: "usf-image-effects-2",
    chapter: "usf-image-effects",
    level: 2,
    question: `Sobel 边缘检测在屏幕特效中如何实现？`,
    answer: `1)采样当前像素和周围 8 个像素的亮度值 2)用 Sobel 算子（水平 [-1,0,1;-2,0,2;-1,0,1] 和垂直转置）做卷积 3)计算梯度的模长 4)模长大于阈值为边缘 5)可叠加深度和法线纹理做更精确的边缘检测 6)边缘用指定颜色绘制。`,
    tags: ["边缘检测", "Sobel"],
  },
  {
    id: "usf-image-effects-3",
    chapter: "usf-image-effects",
    level: 3,
    question: `径向模糊和方向模糊的实现区别是什么？`,
    answer: `径向模糊以中心点为原点，沿径向方向多次采样并叠加，产生放射状运动模糊效果。方向模糊沿固定方向（如水平）多次采样叠加。径向模糊采样 UV 偏移随距离增大，方向模糊偏移恒定。径向模糊常用于速度感，方向模糊常用于运动模糊。`,
    tags: ["径向模糊", "方向模糊"],
  },
  {
    id: "usf-image-effects-4",
    chapter: "usf-image-effects",
    level: 4,
    question: `如何实现屏幕扭曲效果（如传送门、热气扭曲）？`,
    answer: `1)用噪声纹理（Perlin/流动噪声）生成扭曲偏移量 2)偏移量乘以强度系数 3)用偏移量修改屏幕 UV 4)用修改后的 UV 采样源纹理 5)噪声 UV 随时间流动产生动态扭曲 6)可用 GrabPass（内置管线）或 Opaque Texture（URP）获取屏幕内容 7)支持遮罩纹理控制扭曲区域。`,
    tags: ["扭曲", "噪声", "实践"],
  },
];
