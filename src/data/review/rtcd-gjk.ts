import type { ReviewQuestion } from "./types";

export const rtcdGjkQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-gjk-1",
    chapter: "rtcd-gjk",
    level: 1,
    question: `GJK 判定碰撞的理论基础是什么？`,
    answer: `Minkowski 差：两凸体 A 和 B 相交当且仅当原点属于它们的 Minkowski 差 $C = A \\ominus B = \\{a - b \\mid a \\in A, b \\in B\\}$。GJK 通过在 $C$ 上迭代构建单纯形判断原点是否在内部，而无需显式构造 $C$。`,
    tags: ["Minkowski差", "GJK"],
  },
  {
    id: "rtcd-gjk-2",
    chapter: "rtcd-gjk",
    level: 2,
    question: `GJK 如何避免显式构造 Minkowski 差？`,
    answer: `利用支撑函数性质：$C$ 上沿方向 $d$ 的支撑点 $S_C(d) = S_A(d) - S_B(-d)$。只需在 A 上求沿 $d$ 的最远点、在 B 上求沿 $-d$ 的最远点，相减即得 $C$ 上的支撑点。每次迭代 $O(|V_A| + |V_B|)$，而非显式构造差集的 $O(|V_A| \\times |V_B|)$。`,
    tags: ["支撑函数", "GJK"],
  },
  {
    id: "rtcd-gjk-3",
    chapter: "rtcd-gjk",
    level: 3,
    question: `GJK 的单纯形如何演进？迭代何时终止？`,
    answer: `从一个支撑点开始，逐步添加支撑点构建更高维单纯形（2D：点→线段→三角形；3D 最高四面体）。每步判断原点是否在单纯形内：在则碰撞；不在则去掉离原点最远的顶点，沿新方向取下一个支撑点。终止条件：①原点在单纯形内（碰撞）；②新支撑点在当前方向上未越过原点（$p \\cdot d < 0$，未碰撞）；③达到最大迭代次数。`,
    tags: ["单纯形", "迭代"],
  },
  {
    id: "rtcd-gjk-4",
    chapter: "rtcd-gjk",
    level: 4,
    question: `GJK 只返回布尔值，如何求碰撞的接触信息（穿透深度、法向）？`,
    answer: `用 EPA（Expanding Polytope Algorithm）扩展。GJK 返回碰撞后，终止单纯形（含原点的多面体）作为 EPA 的初始多面体。EPA 不断找到多面体上离原点最近的面，用支撑函数沿该面法向取新点向外扩展多面体，直到无法扩展。最终最近面到原点的距离即为穿透深度，该面法向即为分离法向。GJK 判定碰撞，EPA 求接触信息，是标准组合。`,
    tags: ["EPA", "接触信息", "综合"],
  },
];
