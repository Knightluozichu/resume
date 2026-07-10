import type { ReviewQuestion } from "./types";

/** 重要性采样 复习题 */
export const gilImportanceSamplingQuestions: ReviewQuestion[] = [
  {
    id: "gil-importance-sampling-1",
    chapter: "gil-importance-sampling",
    level: 1,
    question: `重要性采样的核心原理是什么？`,
    answer: `让采样分布p(x)匹配被积函数|f(x)|的形状，在高贡献区域多采样。最优分布p∝|f|时方差最小。通过f(x)/p(x)的加权保持无偏。`,
    tags: ["重要性采样", "原理"],
  },
  {
    id: "gil-importance-sampling-2",
    chapter: "gil-importance-sampling",
    level: 2,
    question: `MIS的balance heuristic权重公式是什么？`,
    answer: `w_i = n_i*p_i / (n_1*p_1 + n_2*p_2 + ...)，其中n_i是策略i的采样数，p_i是策略i在该方向的概率密度。在策略擅长的方向(p_i大)权重接近1，不擅长的方向(p_i小)权重接近0。`,
    tags: ["MIS", "权重"],
  },
  {
    id: "gil-importance-sampling-3",
    chapter: "gil-importance-sampling",
    level: 3,
    question: `为什么最优采样分布是p∝|f|？`,
    answer: `方差Var=(1/N)∫f²/p dx - I²。由Cauchy-Schwarz不等式(∫|f|dx)² ≤ (∫f²/p dx)(∫p dx)=∫f²/p dx，当且仅当p∝|f|时取等号，此时∫f²/p dx最小=(∫|f|dx)²，方差最小。`,
    tags: ["最优分布", "推导"],
  },
  {
    id: "gil-importance-sampling-4",
    chapter: "gil-importance-sampling",
    level: 4,
    question: `设计一个对Cook-Torrance金属表面的重要性采样方案，分析各分量的采样策略。`,
    answer: `Cook-Torrance的BRDF被积函数 ∝ D(wh)*G*F*cos。D(GGX法线分布)是贡献最大的分量，用D重要性采样（按GGX分布采样半角向量wh）：wh的φ均匀分布，cosθ_h = sqrt((1-u)/((alpha²-1)*u+1))，从wh和wo恢复wi。F(Fresnel)在掠射角接近1变化不大，不需单独采样。G(几何遮蔽)随角度变化，但G的影响相对D小。采样后用p(wh)计算pdf，f/p的方差主要来自G和F的变化，远小于均匀采样。如果场景有小光源，还需配合光源采样+MIS。对金属(F0高)F变化小，对非金属(F0低)掠射角F变化大可考虑F重要性采样。`,
    tags: ["Cook-Torrance", "采样设计", "综合"],
  },
];