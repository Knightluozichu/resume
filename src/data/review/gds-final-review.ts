import type { ReviewQuestion } from "./types";

/** 综合复习：全书知识链与应用 复习题 */
export const gdsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gds-final-review-1",
    chapter: "gds-final-review",
    level: 1,
    question: "全书的核心主线是什么？",
    answer: "用空间数据结构把暴力 O(n) 降为 O(log n) 或 O(1)+k。图元是原子操作，空间分割是加速手段，算法和应用是消费者。",
    tags: ["主线"],
  },
  {
    id: "gds-final-review-2",
    chapter: "gds-final-review",
    level: 2,
    question: "如何选择空间数据结构？",
    answer: "三步决策：1.查询类型（射线→BVH，范围→R-Tree，精确→网格/哈希，最近邻→KD-Tree）；2.数据分布（均匀→网格，稀疏→哈希，非均匀→树）；3.动态性（静态→BVH/KD，动态→哈希/网格/动态BVH）。",
    tags: ["选择"],
  },
  {
    id: "gds-final-review-3",
    chapter: "gds-final-review",
    level: 3,
    question: "描述游戏引擎碰撞检测的完整流程。",
    answer: "宽相：空间哈希定位近邻→AABB重叠测试→候选对。窄相：SAT（凸体边法向量投影分离）或GJK（Minkowski差含原点）。响应：EPA求穿透深度→约束求解。时间一致性使增量更新接近O(n)。",
    tags: ["碰撞检测"],
  },
  {
    id: "gds-final-review-4",
    chapter: "gds-final-review",
    level: 4,
    question: "描述光线追踪如何用 BVH 加速射线-场景相交。",
    answer: "预处理：SAH构建BVH（表面积加权最优分裂）。渲染：射线从根遍历，slab method测AABB O(1)，不相交剪枝。前向排序先访问近子树得t_best，远子树AABB距离≥t_best跳过。叶节点Moller-Trumbore O(1)测三角形。总O(log n)/射线，10万三角形约20次AABB+几个三角形测试。",
    tags: ["光线追踪", "综合"],
  },
];
