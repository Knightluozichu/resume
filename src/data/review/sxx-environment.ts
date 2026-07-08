import type { ReviewQuestion } from "./types";

export const sxxEnvironmentQuestions: ReviewQuestion[] = [
  {
    id: "sxx-environment-1",
    chapter: "sxx-environment",
    level: 1,
    question: "天空盒渲染的基本原理是什么？",
    answer: "天空盒用立方体贴图（Cube Map）包围场景，6张纹理组成一个无限远的大盒子。渲染时用世界空间视线方向采样立方体贴图：skyColor = texCUBE(skybox, viewDir)。天空盒的Z值设为最大（深度1.0），关闭深度写入，使其永远在场景最远处。采样方向必须用世界空间视线方向，不能用局部坐标。",
    tags: ["天空盒", "Cube Map"],
  },
  {
    id: "sxx-environment-2",
    chapter: "sxx-environment",
    level: 2,
    question: "为什么天空是蓝色的？大气散射的物理原理是什么？",
    answer: "天空蓝色来自 Rayleigh（瑞利）散射：大气分子比光波长小，散射强度与波长四次方成反比（I ∝ 1/λ^4）。蓝光波长短（约450nm），散射强度约为红光（约650nm）的4.3倍，因此白光中蓝光被向四面八方散射，天空呈蓝色。日落时光线穿过更厚大气层，蓝光几乎全被散射掉只剩红光。Mie（米氏）散射由较大颗粒引起，各波长散射均匀，产生白色雾/光晕。",
    tags: ["Rayleigh散射", "大气散射", "天空颜色"],
  },
  {
    id: "sxx-environment-3",
    chapter: "sxx-environment",
    level: 3,
    question: "水面渲染中菲涅尔效应的作用是什么？如何实现？",
    answer: "菲涅尔效应使水面反射率随视角变化：正视角反射率低（约2-5%）主要看到水底（折射），掠射角反射率趋近100%主要看到倒影（反射）。实现：fresnel = pow(1 - dot(N,V), 5)，finalColor = lerp(refractColor, reflectColor, fresnel)。应设最低反射率 fresnel = lerp(0.02, 1.0, fresnel)，因为正视角真实水面仍有约2%反射。法线扰动（噪声/法线贴图模拟波浪）让效果更动态。",
    tags: ["菲涅尔效应", "水面渲染", "反射折射"],
  },
  {
    id: "sxx-environment-4",
    chapter: "sxx-environment",
    level: 4,
    question: "对比三种雾效模型（线性、指数、指数平方）的数学公式和适用场景。",
    answer: "线性雾：f = (end-d)/(end-start)，雾从start距离开始到end距离完全雾化，过渡线性，适合可控范围的均匀雾。指数雾：f = exp(-d*density)，雾随距离指数衰减，过渡自然但远处可能仍有可见度，适合开放式场景。指数平方雾：f = exp(-(d*density)^2)，衰减更快，近距离清晰远距离快速完全雾化，过渡最自然，是工业首选。最终颜色 = lerp(fogColor, surfaceColor, f)。选择依据：线性雾适合关卡设计的固定范围雾墙，指数雾适合开放世界远景过渡，指数平方雾适合需要近距离清晰远距离完全遮挡的场景。density 参数控制雾的浓度。",
    tags: ["雾效", "线性雾", "指数平方雾"],
  },
];
