import type { ReviewQuestion } from "./types";

/** BRDF 与 BxDF 模型 复习题 */
export const pbtBxdfQuestions: ReviewQuestion[] = [
  {
    id: "pbt-bxdf-1",
    chapter: "pbt-bxdf",
    level: 1,
    question: `BRDF 的定义是什么？它满足哪两条物理约束？`,
    answer: `BRDF 定义为 f_r(ωi,ωo) = dLo/(Li·cosθi)，描述入射光到出射方向的反射比例。两条约束：互易性 f(ωi,ωo)=f(ωo,ωi) 和能量守恒（反射积分不超过1）。`,
    tags: ["BRDF", "物理约束"],
  },
  {
    id: "pbt-bxdf-2",
    chapter: "pbt-bxdf",
    level: 2,
    question: `Cook-Torrance 模型的 D、G、F 三项分别建模什么？`,
    answer: `D（法线分布函数）建模微表面法线与半角向量的对齐概率，决定高光形状和大小。G（几何遮蔽）建模微面间的相互遮挡和阴影。F（菲涅尔项）建模反射率随入射角的变化。`,
    tags: ["Cook-Torrance", "微表面"],
  },
  {
    id: "pbt-bxdf-3",
    chapter: "pbt-bxdf",
    level: 3,
    question: `用 Schlick 近似解释菲涅尔效应，说明为什么掠射角反射更强。`,
    answer: `Schlick 近似 F = F0 + (1-F0)(1-cosθ)^5。θ是入射角，F0是正入射(θ=0)时的反射率。当θ→90°（掠射），cosθ→0，F→1，几乎所有光都被反射。物理原因是电磁波在介质界面的边界条件——平行于表面的电场分量在掠射时几乎完全反射。这就是为什么水面在远处（掠射角）像镜子，在脚下（正入射）是透明的。`,
    tags: ["菲涅尔", "Schlick近似"],
  },
  {
    id: "pbt-bxdf-4",
    chapter: "pbt-bxdf",
    level: 4,
    question: `对比 Lambert BRDF 与 Cook-Torrance BRDF 在渲染金属和塑料时的表现，分析能量守恒的重要性。`,
    answer: `Lambert 只能表现均匀漫反射，无法表现高光，金属和塑料看起来一样。Cook-Torrance 通过 DGF 三项区分金属（高F0、锐利高光、几乎无漫反射）和塑料（低F0、柔和高光、有漫反射）。能量守恒确保反射+漫反射+吸收≤入射能量——没有它，金属高光可能比入射光还亮，破坏真实感。Cook-Torrance 的 G 项在掠射角时增加遮蔽、补偿 Fresnel 的增强，帮助维持能量守恒。`,
    tags: ["BRDF对比", "能量守恒", "综合"],
  },
];