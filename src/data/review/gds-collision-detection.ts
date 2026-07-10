import type { ReviewQuestion } from "./types";

/** 碰撞检测：宽相与窄相 复习题 */
export const gdsCollisionDetectionQuestions: ReviewQuestion[] = [
  {
    id: "gds-collision-detection-1",
    chapter: "gds-collision-detection",
    level: 1,
    question: `碰撞检测两阶段是什么？`,
    answer: `宽相：AABB 重叠测试快速剔除不可能碰撞的对，输出候选对。窄相：SAT/GJK 对候选对做精确检测。利用大部分对不碰撞的先验。`,
    tags: ["两阶段"],
  },
  {
    id: "gds-collision-detection-2",
    chapter: "gds-collision-detection",
    level: 2,
    question: `AABB 重叠测试的条件是什么？`,
    answer: `两个 AABB 在所有轴上都有重叠：a_min≤b_max 且 b_min≤a_max，∀轴。O(1) 常数时间（3D 只需 6 次比较）。`,
    tags: ["AABB"],
  },
  {
    id: "gds-collision-detection-3",
    chapter: "gds-collision-detection",
    level: 3,
    question: `SAT 的原理和复杂度？`,
    answer: `两凸体不碰撞⟺存在分离轴。分离轴平行于某边法向量（凸性保证）。对每条边法向量测投影分离即可。2D O(m+n)，3D 需额外测边叉积。`,
    tags: ["SAT"],
  },
  {
    id: "gds-collision-detection-4",
    chapter: "gds-collision-detection",
    level: 4,
    question: `GJK 算法的原理是什么？`,
    answer: `A,B 碰撞⟺原点∈A⊖B（Minkowski 差）。用 support 函数迭代构建单纯形（点/线/三角形/四面体），判断原点是否在单纯形内。不在则沿原点方向扩展。EPA 从 GJK 结果求穿透深度。`,
    tags: ["GJK"],
  },
];
