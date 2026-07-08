import type { ReviewQuestion } from "./types";

export const rtcdSpatialPartitioningQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-spatial-partitioning-1",
    chapter: "rtcd-spatial-partitioning",
    level: 1,
    question: "均匀网格查询碰撞时需要检查哪些格子？",
    answer: "自身格子加上相邻的 26 个格子（3x3x3 的邻域）。因为物体的 AABB 可能跨越格子边界，相邻格子中的物体可能与自身相交。只检查 27 个格子而非全部，是网格高效的关键。",
    tags: ["均匀网格", "邻域查询"],
  },
  {
    id: "rtcd-spatial-partitioning-2",
    chapter: "rtcd-spatial-partitioning",
    level: 2,
    question: "均匀网格在什么情况下会退化？为什么？",
    answer: "物体分布极度不均时退化——大量物体挤在少数格子里，那几个格子内部仍是 $O(n^2)$ 的两两检测。网格用固定粒度切空间，无法自适应密度。分布不均时应该用八叉树，密集区域自动递归细分，把每个叶子内物体数控制在阈值以下。",
    tags: ["均匀网格", "退化"],
  },
  {
    id: "rtcd-spatial-partitioning-3",
    chapter: "rtcd-spatial-partitioning",
    level: 3,
    question: "松散四叉树的「松散」指什么？解决了什么问题？",
    answer: "「松散」指把每个节点的边界区域放大 $k$ 倍（通常 $k=2$）。标准四叉树中跨界物体必须存入多个子节点导致重复存储和重复检测。松散四叉树放大边界后，只要物体中心在放大区域内就只存一个节点——跨界物体被包容进唯一节点。代价是节点有效区域有重叠，但物体只存一份，大幅减少移动物体的更新开销。",
    tags: ["松散四叉树", "跨界"],
  },
  {
    id: "rtcd-spatial-partitioning-4",
    chapter: "rtcd-spatial-partitioning",
    level: 4,
    question: "给定一个有大量动态物体的开放世界场景，应选哪种空间分割？为什么？",
    answer: "选松散四叉树/八叉树。理由：①开放世界物体分布不均（城镇密集、野外稀疏），八叉树自适应密度比均匀网格好；②物体大量移动，松散变体减少跨界物体的节点迁移次数，更新成本低；③物体只存一个节点，避免重复检测。均匀网格在分布不均时热点格子退化；标准四叉树跨界物体重复存储。松散八叉树综合了自适应密度和低更新成本，最适合动态开放世界。",
    tags: ["综合", "场景选择"],
  },
];
