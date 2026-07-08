import type { ReviewQuestion } from "./types";

export const usfDepthEffectsQuestions: ReviewQuestion[] = [
  {
    id: "usf-depth-effects-1",
    chapter: "usf-depth-effects",
    level: 1,
    question: "Unity 中如何获取深度纹理？",
    answer: "在相机上设置 Camera.depthTextureMode = DepthTextureMode.Depth 生成深度纹理。在 Shader 中通过 _CameraDepthTexture 全局变量采样。也可用 DepthNormals 模式同时获取深度和法线。",
    tags: ["深度纹理", "Camera"],
  },
  {
    id: "usf-depth-effects-2",
    chapter: "usf-depth-effects",
    level: 2,
    question: "深度纹理中存储的值和屏幕空间坐标的关系是什么？",
    answer: "深度纹理存储的是裁剪空间的 z 值（非线性），经过透视投影后远处的深度值变化很小。采样时需要用 Linear01Depth 转换为线性深度（0=近 1=远）才能正确比较。也可用 LinearEyeDepth 转换为观察空间距离。",
    tags: ["深度值", "Linear01Depth"],
  },
  {
    id: "usf-depth-effects-3",
    chapter: "usf-depth-effects",
    level: 3,
    question: "如何用深度纹理实现景深（DOF）效果？",
    answer: "1)采样深度纹理获取每个像素的深度 2)用焦点距离和范围计算模糊权重 3)对焦外区域做模糊（高斯模糊或散景模糊）4)将模糊结果与原图按权重混合 5)近焦和远焦可分别处理 6)用降分辨率模糊提升性能。",
    tags: ["景深", "DOF", "实践"],
  },
  {
    id: "usf-depth-effects-4",
    chapter: "usf-depth-effects",
    level: 4,
    question: "如何实现基于深度的屏幕空间雾效？",
    answer: "1)在屏幕特效 Shader 中采样深度纹理 2)用 LinearEyeDepth 转换为观察空间距离 3)用指数衰减函数计算雾密度：fog = exp(-distance * density) 4)将雾颜色与场景颜色按雾密度混合 5)可叠加噪声纹理模拟体积雾感 6)比顶点雾更精确，不受几何体密度影响。",
    tags: ["屏幕空间雾", "深度", "实践"],
  },
];
