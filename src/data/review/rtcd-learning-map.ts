import type { ReviewQuestion } from "./types";

export const rtcdLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-learning-map-1",
    chapter: "rtcd-learning-map",
    level: 1,
    question: `实时碰撞检测管线的两阶段是什么？`,
    answer: `Broad Phase（粗粒度）和 Narrow Phase（细粒度）。Broad Phase 用包围体快速排除不可能碰撞的对，输出候选对列表；Narrow Phase 对候选对做精确几何检测确认是否相交。`,
    tags: ["学习地图", "管线"],
  },
  {
    id: "rtcd-learning-map-2",
    chapter: "rtcd-learning-map",
    level: 2,
    question: `为什么碰撞检测要分 Broad Phase 和 Narrow Phase 两阶段？`,
    answer: `直接两两精确检测是 $O(n^2)$，物体一多帧率就崩。Broad Phase 用廉价的包围体把不可能碰的对排除，只把少量候选对交给 Narrow Phase。两阶段把复杂度从 $O(n^2)$ 降到接近 $O(n \\log n)$，是实时性的关键。`,
    tags: ["Broad Phase", "Narrow Phase"],
  },
  {
    id: "rtcd-learning-map-3",
    chapter: "rtcd-learning-map",
    level: 3,
    question: `全书的五阶段学习结构是什么？各阶段解决什么问题？`,
    answer: `基础（碰撞类型认知）→ 粗粒度（Sap/空间分割减量）→ 细粒度（GJK/SAT 精确检测）→ 优化（CCD 防穿透 + SIMD/缓存/并行提速）→ 总复习（管线串联）。基础建立认知，粗粒度产出候选对，细粒度确认碰撞，优化保障正确性与性能。`,
    tags: ["五阶段", "学习路径"],
  },
  {
    id: "rtcd-learning-map-4",
    chapter: "rtcd-learning-map",
    level: 4,
    question: `如果跳过 Broad Phase 直接对所有物体做 Narrow Phase，会出什么问题？请综合分析。`,
    answer: `1000 个物体两两精确检测要约 50 万次 GJK/SAT，每次涉及顶点遍历和迭代，帧时间必然超标。Broad Phase 的价值在于用极廉价的包围体比较（AABB 3 次区间比较）排除 99% 的不可能对，让昂贵的精确检测只跑在少量候选对上。跳过它，无论 Narrow Phase 算法多快，总量都扛不住——这是「量级」问题而非「常数」问题。`,
    tags: ["综合", "性能"],
  },
];
