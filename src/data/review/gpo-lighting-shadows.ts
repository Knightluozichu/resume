import type { ReviewQuestion } from "./types";

export const gpoLightingShadowsQuestions: ReviewQuestion[] = [
  {
    id: "gpo-lighting-shadows-1",
    chapter: "gpo-lighting-shadows",
    level: 1,
    question: "实时 GI 的主流方案有哪些？各有什么特点？",
    answer: "LPV（Light Propagation Volume）：体素化场景迭代传播间接光，支持多次反射但精度低。VCT（Voxel Cone Tracing）：沿锥体追踪体素场景，支持镜面间接光但开销大。DDGI（Dynamic Diffuse Global Illumination）：动态探测网格插值，漫反射 GI 质量好开销中等。",
    tags: ["实时GI", "LPV", "VCT", "DDGI"],
  },
  {
    id: "gpo-lighting-shadows-2",
    chapter: "gpo-lighting-shadows",
    level: 2,
    question: "PCSS 如何产生物理正确的软阴影？三步流程是什么？",
    answer: "1) Blocker Search：搜索 Shadow Map 上当前像素周围的遮挡体，计算平均遮挡距离。2) 计算柔化核大小：penumbra = lightSize * (receiverDist - blockerDist) / blockerDist，遮挡体越近核越大越柔和。3) PCF 采样：用计算出的核大小做 PCF。物理正确性来自面光源阴影中遮挡体越靠近接收面越锐利、越远越柔和的几何关系。",
    tags: ["PCSS", "软阴影", "物理正确"],
  },
  {
    id: "gpo-lighting-shadows-3",
    chapter: "gpo-lighting-shadows",
    level: 3,
    question: "VSM 的原理和漏光问题分别是什么？如何缓解？",
    answer: "VSM 存储深度均值和深度平方均值，用切比雪夫不等式估算遮挡概率上限：P(unoccluded) <= variance / (variance + d^2)。支持预滤波柔化（对 VSM 做高斯模糊等价于柔化）。漏光：同一采样区域内多个不同深度遮挡体导致方差变大，切比雪夫上界偏高，本该全阴影区域漏光。缓解：MSM（四阶矩）提高精度，或分层 VSM。",
    tags: ["VSM", "漏光", "切比雪夫"],
  },
  {
    id: "gpo-lighting-shadows-4",
    chapter: "gpo-lighting-shadows",
    level: 4,
    question: "PBR BRDF 的能量守恒原则是什么？多层材质如何保证能量守恒？",
    answer: "能量守恒：Diffuse + Specular 反射能量不超过入射光能量。金属度控制比例——金属（metallic=1）无漫反射全镜面反射，非金属（metallic=0）有漫反射低镜面反射。多层材质（如车漆）通过 Fresnel 权重混合：清漆层反射率随视角增加（Fresnel），底漆层光照需乘以清漆透射率（1-Fresnel），确保两层反射总量不超过入射光。简单叠加两层会导致能量超出入射光。",
    tags: ["PBR", "能量守恒", "多层材质"],
  },
];
