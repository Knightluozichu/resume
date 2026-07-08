import type { ReviewQuestion } from "./types";

export const RtrAdvancedShadingQuestions: ReviewQuestion[] = [
  {
    id: "rtr-advanced-shading-1",
    chapter: "rtr-advanced-shading",
    level: 1,
    question: "BRDF 的定义是什么？它必须满足哪些物理约束？",
    answer: "BRDF 是双向反射分布函数，描述给定入射方向后向各方向反射的比例。约束：非负性、能量守恒（反射不超过入射）、互易性（交换入射出射方向结果相同）、亥姆霍兹 reciprocity。",
    tags: ["BRDF", "物理约束"],
  },
  {
    id: "rtr-advanced-shading-2",
    chapter: "rtr-advanced-shading",
    level: 2,
    question: "微表面理论的核心思想是什么？D、G、F 分别是什么？",
    answer: "微表面理论把粗糙表面看作无数微小镜面的集合。D（法线分布函数）描述微表面朝向分布；G（几何遮蔽）描述微表面互相遮挡；F（菲涅尔）描述单个微表面的反射率。三者相乘除以归一化项得镜面反射。",
    tags: ["微表面", "DGF"],
  },
  {
    id: "rtr-advanced-shading-3",
    chapter: "rtr-advanced-shading",
    level: 3,
    question: "GGX 分布函数为什么比 Beckmann 更常用？它的「长尾」特性有什么视觉效果？",
    answer: "GGX 的高光有更长的尾部——高光中心亮但边缘衰减更慢，产生更自然的「光晕」过渡。Beckmann 衰减太快显得高光生硬。GGX 的长尾让金属和塑料的高光更接近真实观测，是现代 PBR 的事实标准。",
    tags: ["GGX", "Beckmann", "长尾"],
  },
  {
    id: "rtr-advanced-shading-4",
    chapter: "rtr-advanced-shading",
    level: 4,
    question: "PBR 的金属度工作流和镜面反射工作流有什么区别？各有什么优劣？",
    answer: "金属度工作流用 albedo+metalness+roughness 三个贴图，metalness 二值化（0 或 1）简化创作但中间态不自然。镜面反射工作流用 albedo+specular+roughness，specular 可任意值更灵活但参数难调易出错。游戏多用金属度（简单一致），电影多用镜面反射（精确控制）。",
    tags: ["PBR", "金属度", "镜面反射"],
  },
];
