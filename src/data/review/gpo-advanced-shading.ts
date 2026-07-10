import type { ReviewQuestion } from "./types";

export const gpoAdvancedShadingQuestions: ReviewQuestion[] = [
  {
    id: "gpo-advanced-shading-1",
    chapter: "gpo-advanced-shading",
    level: 1,
    question: `SSS 模拟什么效果？实时渲染中用什么近似方法？`,
    answer: `SSS 模拟光进入半透明材质内部多次散射后透出的效果（如皮肤、蜡、玉石）。实时近似方法：1) Separable SSS——将 3D 散射核分解为两次 1D 卷积；2) 预积分 SSS——在法线曲率方向预计算颜色 LUT；3) Screen-space SSS——屏幕空间模糊。这些近似在视觉上接近完整 BSSRDF 但开销降低 10-100 倍。`,
    tags: ["SSS", "次表面散射", "近似"],
  },
  {
    id: "gpo-advanced-shading-2",
    chapter: "gpo-advanced-shading",
    level: 2,
    question: `各向异性 BRDF 和各向同性 BRDF 的区别是什么？如何实现？`,
    answer: `各向同性 BRDF 的 NDF 在切线空间所有方向对称，roughness 是标量，高光呈圆形。各向异性 BRDF 的 NDF 沿切线方向拉伸，roughness 分解为 roughnessT（切线）和 roughnessB（副切线），高光呈椭圆形/细条。实现：在 GGX NDF 中用 T 和 B 方向的 roughness 分别调制。roughnessT = roughnessB 时退化为各向同性。适合金属拉丝和头发。`,
    tags: ["各向异性", "BRDF", "GGX"],
  },
  {
    id: "gpo-advanced-shading-3",
    chapter: "gpo-advanced-shading",
    level: 3,
    question: `多层材质（车漆）如何保证能量守恒？`,
    answer: `车漆 = 底漆层（金属 BRDF）+ 清漆层（透明涂层 BRDF），用 Fresnel 权重混合。能量守恒：清漆层反射率随视角增加（Fresnel 效应），底漆层光照需乘以清漆透射率（1-Fresnel），因为底漆被清漆部分遮挡不应获得全部光照。简单叠加两层 BRDF 会导致反射能量超出入射光——破坏物理正确性。正确做法：finalColor = clearCoat * Fresnel + baseLayer * (1 - Fresnel)。`,
    tags: ["多层材质", "能量守恒", "车漆"],
  },
  {
    id: "gpo-advanced-shading-4",
    chapter: "gpo-advanced-shading",
    level: 4,
    question: `Separable SSS 的原理是什么？为什么能大幅降低计算量？`,
    answer: `Separable SSS 基于可分离滤波器理论：如果 3D 散射核可分解为多个 1D 核的乘积，则 2D 卷积可分解为两次 1D 卷积（先横向后纵向）。原始 2D 卷积需 KERNEL_SIZE^2 次采样，分离后只需 2*KERNEL_SIZE 次。如 21x21 卷积核从 441 次降到 42 次。实际 SSS 散射核（高斯混合）近似可分离，用预计算的 1D 扩散剖面核做两次方向卷积，视觉接近完整 2D 散射但计算量降低约 10 倍。`,
    tags: ["Separable SSS", "可分离滤波", "卷积"],
  },
];
