import type { ReviewQuestion } from "./types";

export const GpgMaterialsShadersQuestions: ReviewQuestion[] = [
  {
    id: "gpg-materials-shaders-1",
    chapter: "gpg-materials-shaders",
    level: 1,
    question: "BRDF 的三个分量分别是什么？",
    answer: "漫反射（光线均匀散射，Lambert/Oren-Nayar）、镜面反射（光线镜面反弹，Blinn-Phong/Cook-Torrance）、环境光（间接光照近似，Cubemap/球谐函数）。",
    tags: ["BRDF", "三分量"],
  },
  {
    id: "gpg-materials-shaders-2",
    chapter: "gpg-materials-shaders",
    level: 2,
    question: "PBR 为什么比经验模型更可预测？",
    answer: "PBR 用物理参数（粗糙度、金属度、反照率）描述材质，参数有明确物理含义且在不同光照下保持一致。经验模型用魔数，换光照环境要重新调参。PBR 一次设定在任意场景都正确。",
    tags: ["PBR", "可预测性"],
  },
  {
    id: "gpg-materials-shaders-3",
    chapter: "gpg-materials-shaders",
    level: 3,
    question: "为什么金属的高光是「染色」的而非白色？PBR 如何用参数切换这种行为？",
    answer: "金属直接反射光线不发生次表面散射，镜面反射保留金属颜色。非金属反射率低（约4%），高光只反射光源颜色呈白色。PBR 用金属度参数：metalness=1 时高光用 albedo 染色，metalness=0 时高光为白色。",
    tags: ["金属度", "高光染色", "PBR"],
  },
  {
    id: "gpg-materials-shaders-4",
    chapter: "gpg-materials-shaders",
    level: 4,
    question: "Cook-Torrance BRDF 的 D、G、F 三项分别对应什么物理意义？能量守恒如何保证？",
    answer: "D 是法线分布函数描述微表面朝向分布；G 是几何遮蔽函数描述微表面互相遮挡；F 是菲涅尔项描述反射率随角度变化。能量守恒通过 kD = (1-F)(1-metalness) 保证漫反射与镜面反射之和不超过入射光。",
    tags: ["Cook-Torrance", "微表面", "能量守恒"],
  },
];
