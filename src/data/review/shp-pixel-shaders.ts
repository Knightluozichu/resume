import type { ReviewQuestion } from "./types";

export const shpPixelShadersQuestions: ReviewQuestion[] = [
  {
    id: "shp-pixel-shaders-1",
    chapter: "shp-pixel-shaders",
    level: 1,
    question: "像素着色器（片元着色器）的输入输出是什么？",
    answer: "输入是光栅化插值后的顶点属性（UV、法线、颜色等）和系统值（SV_Position），输出是最终颜色值 SV_TARGET。每个像素执行一次，决定屏幕上该点的颜色。",
    tags: ["像素着色器", "输入输出"],
  },
  {
    id: "shp-pixel-shaders-2",
    chapter: "shp-pixel-shaders",
    level: 2,
    question: "在像素着色器中采样纹理的基本步骤是什么？",
    answer: "1)声明 Texture2D 和 SamplerState 2)在像素着色器中用 .Sample(sampler, uv) 方法采样 3)采样结果为 float4 颜色值 4)可与其他颜色做混合或光照计算后输出。",
    tags: ["纹理采样", "Texture2D"],
  },
  {
    id: "shp-pixel-shaders-3",
    chapter: "shp-pixel-shaders",
    level: 3,
    question: "clip/discard 指令在像素着色器中的作用和注意事项？",
    answer: "clip(x) 在 x<0 时丢弃当前像素，常用于 alpha test 透明裁剪。注意事项：1)使用 clip 后该像素不写深度缓冲 2)过度使用 clip 会导致 GPU 过早剔除失效反而降低性能 3)仅在需要硬边缘透明时使用，半透明应使用混合。",
    tags: ["clip", "alpha test"],
  },
  {
    id: "shp-pixel-shaders-4",
    chapter: "shp-pixel-shaders",
    level: 4,
    question: "如何在像素着色器中实现简单的渐变色效果？",
    answer: "1)使用 UV 坐标或屏幕坐标作为渐变基准 2)定义两个或多个颜色关键点 3)用 lerp(colorA, colorB, t) 线性插值 4)t 可来自 UV.y、距离函数或噪声 5)多色渐变可用多个 lerp 嵌套或 smoothstep 控制过渡区间。",
    tags: ["渐变", "lerp", "实践"],
  },
];
