import type { ReviewQuestion } from "./types";

export const shpAdvancedEffectsQuestions: ReviewQuestion[] = [
  {
    id: "shp-advanced-effects-1",
    chapter: "shp-advanced-effects",
    level: 1,
    question: "屏幕空间反射（SSR）的基本原理是什么？",
    answer: "在屏幕空间中，从每个像素出发沿反射方向做射线步进，采样深度缓冲判断是否相交。相交点的颜色即为反射颜色。优点是不需要额外渲染 Pass，缺点是无法反射屏幕外的物体。",
    tags: ["SSR", "屏幕空间"],
  },
  {
    id: "shp-advanced-effects-2",
    chapter: "shp-advanced-effects",
    level: 2,
    question: "体积雾（Volumetric Fog）在 Shader 中如何实现？",
    answer: "1)从相机到片段方向做射线步进 2)每步采样噪声纹理或密度函数 3)累加沿线的雾密度 4)用 Beer-Lambert 定律计算透射率 5)与场景颜色混合。可通过降分辨率和双边滤波优化性能。",
    tags: ["体积雾", "射线步进"],
  },
  {
    id: "shp-advanced-effects-3",
    chapter: "shp-advanced-effects",
    level: 3,
    question: "实现水面扰动效果需要哪些 Shader 技术组合？",
    answer: "1)用法线贴图或 Gerstner 波生成水面起伏 2)用时间偏移 UV 模拟流动 3)用 Fresnel 效应控制反射/折射混合比例 4)采样屏幕颜色做折射偏移 5)用 SSR 或环境贴图做反射 6)泡沫噪声贴图叠加浪花。",
    tags: ["水面", "Fresnel", "综合"],
  },
  {
    id: "shp-advanced-effects-4",
    chapter: "shp-advanced-effects",
    level: 4,
    question: "如何在 Shader 中实现基于噪声的程序化纹理（如大理石、木纹）？",
    answer: "1)选择合适的噪声函数（Perlin/Simplex/Worley）2)多层叠加不同频率和振幅（FBM）3)用梯度噪声生成大理石纹理：noise 值映射到颜色梯度 4)木纹：用环形噪声加方向扭曲 5)用导数噪声生成法线增加凹凸感 6)预烘焙到纹理可提升性能。",
    tags: ["噪声", "程序化纹理", "FBM"],
  },
];
