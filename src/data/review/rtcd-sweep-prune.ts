import type { ReviewQuestion } from "./types";

export const rtcdSweepPruneQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-sweep-prune-1",
    chapter: "rtcd-sweep-prune",
    level: 1,
    question: `Sweep and Prune 的活动集是什么？`,
    answer: `扫掠时维护的当前区间重叠物体集合。遇到物体的 min 端点时加入活动集，遇到 max 端点时移出。活动集内的物体在该轴上区间重叠，配对为候选对。远离的物体永远不会同时在活动集中，从而被高效排除。`,
    tags: ["活动集", "Sap"],
  },
  {
    id: "rtcd-sweep-prune-2",
    chapter: "rtcd-sweep-prune",
    level: 2,
    question: `Sweep and Prune 为什么用插入排序而不是快速排序？`,
    answer: `游戏世界物体每帧位移很小，端点顺序几乎不变——近乎有序。插入排序对近乎有序数据接近 $O(n)$（每元素只移动 0-1 位），而快速排序对近乎有序数据可能退化到 $O(n^2)$。利用时间连贯性用插入排序，让 Sap 的均摊复杂度接近线性。`,
    tags: ["插入排序", "时间连贯性"],
  },
  {
    id: "rtcd-sweep-prune-3",
    chapter: "rtcd-sweep-prune",
    level: 3,
    question: `单轴 Sweep and Prune 的候选对为什么还要三轴过滤？`,
    answer: `单轴区间重叠只是 AABB 相交的必要条件。两物体可能在 X 轴区间重叠但 Y 轴完全分离（一个左上一个右下）。AABB 相交要求三轴区间同时重叠。所以先在一条轴生成候选对（粗筛），再用另两条轴过滤（细筛），只有三轴都重叠的对才送入 Narrow Phase。`,
    tags: ["三轴过滤", "AABB"],
  },
  {
    id: "rtcd-sweep-prune-4",
    chapter: "rtcd-sweep-prune",
    level: 4,
    question: `Sweep and Prune 在什么场景下效率会下降？如何改进？`,
    answer: `当物体在轴方向上高度重叠（如大量物体堆叠在同一 X 范围但 Y/Z 分散）时，单轴活动集很大，候选对爆炸。改进：①选物体分布最分散的轴作为主扫掠轴，减少活动集大小；②用三轴同时维护端点，取三轴候选对的交集；③对高度堆叠场景改用空间分割（网格/八叉树），按空间分桶而非轴排序。Sap 适合「物体分散、帧间连贯」的场景，不适合高度堆叠。`,
    tags: ["综合", "性能瓶颈"],
  },
];
