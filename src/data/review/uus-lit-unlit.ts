import type { ReviewQuestion } from "./types";

export const uusLitUnlitQuestions: ReviewQuestion[] = [
  {
    id: "uus-lit-unlit-1",
    chapter: "uus-lit-unlit",
    level: 1,
    question: "Lit 和 Unlit 的核心区别是什么？",
    answer: "Lit 参与光照计算（PBR BRDF + GI + Shadow），受光源和阴影影响，用于需要真实感的 3D 物体。Unlit 不参与光照计算，颜色直通输出（纹理采样或固定色），开销极低，用于 UI、粒子、调试。",
    tags: ["Lit", "Unlit", "光照"],
  },
  {
    id: "uus-lit-unlit-2",
    chapter: "uus-lit-unlit",
    level: 2,
    question: "Lit Shader 的 PBR 材质参数有哪些？各控制什么效果？",
    answer: "BaseColor（基础色，纹理乘以颜色）、Metallic（金属度，0=非金属有漫反射，1=金属无漫反射高反射率）、Smoothness（平滑度，0=粗糙 1=光滑，控制高光锐度）、Normal（法线贴图，控制表面凹凸细节）、Emission（自发光，不受光照影响的发光颜色）、Occlusion（环境光遮蔽贴图，控制间接光遮挡）。",
    tags: ["PBR", "材质参数"],
  },
  {
    id: "uus-lit-unlit-3",
    chapter: "uus-lit-unlit",
    level: 3,
    question: "为什么 UI 和粒子通常用 Unlit 而不是 Lit？",
    answer: "1) UI 和粒子不需要受场景光照影响，外观是设计固定的；2) Unlit 无光照计算开销，性能远优于 Lit；3) 颜色精确可控，不受光源颜色和强度干扰；4) 渲染在 Transparent 队列，与半透明需求匹配；5) 避免不必要的 Shadow Caster/Receiver 计算。用 Lit 会导致白白增加 BRDF + GI + Shadow 计算开销。",
    tags: ["Unlit", "UI", "粒子"],
  },
  {
    id: "uus-lit-unlit-4",
    chapter: "uus-lit-unlit",
    level: 4,
    question: "Metallic 参数的物理含义是什么？为什么中间值缺乏物理意义？",
    answer: "Metallic 是 0 或 1 的二值参数：0=非金属（电介质，有漫反射，低反射率 2-5%），1=金属（导体，无漫反射，高反射率 60-90%）。中间值缺乏物理意义因为现实材质要么是金属要么是非金属，没有「半金属」。常见错误：用中间 Metallic 值做「半金属」效果，这不符合 PBR 原理。正确做法：用 Smoothness 控制材质质感，Metallic 保持 0 或 1。",
    tags: ["Metallic", "PBR", "物理含义"],
  },
];
