/** 复习题库 · 算法图解（第二版）。 */

import type { ReviewQuestion } from "./types";

export const grokkingAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "ga2-1-1",
    chapter: "ga2-introduction-to-algorithms",
    level: 1,
    question: "算法简介 解决的核心问题形状是什么？",
    answer: "算法不是背公式，而是每一步都让搜索空间变小。",
    tags: ["算法图解", "算法"],
  },
  {
    id: "ga2-1-2",
    chapter: "ga2-introduction-to-algorithms",
    level: 2,
    question: "观察 算法简介 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-1-3",
    chapter: "ga2-introduction-to-algorithms",
    level: 3,
    question: "什么时候不应该直接套用 算法简介？",
    answer:
      "把算法当成代码模板背。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "二分查找"],
  },
  {
    id: "ga2-2-1",
    chapter: "ga2-selection-sort",
    level: 1,
    question: "选择排序 解决的核心问题形状是什么？",
    answer: "每轮挑一个最小值，代价藏在反复扫描里。",
    tags: ["算法图解", "选择排序"],
  },
  {
    id: "ga2-2-2",
    chapter: "ga2-selection-sort",
    level: 2,
    question: "观察 选择排序 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-2-3",
    chapter: "ga2-selection-sort",
    level: 3,
    question: "什么时候不应该直接套用 选择排序？",
    answer:
      "只记交换步骤，忘了每轮扫描剩余区。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "数组"],
  },
  {
    id: "ga2-3-1",
    chapter: "ga2-recursion",
    level: 1,
    question: "递归 解决的核心问题形状是什么？",
    answer: "递归的安全感来自基线条件，递归的力量来自规模缩小。",
    tags: ["算法图解", "递归"],
  },
  {
    id: "ga2-3-2",
    chapter: "ga2-recursion",
    level: 2,
    question: "观察 递归 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-3-3",
    chapter: "ga2-recursion",
    level: 3,
    question: "什么时候不应该直接套用 递归？",
    answer:
      "写递归条件却忘了基线条件。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "基线条件"],
  },
  {
    id: "ga2-4-1",
    chapter: "ga2-quicksort",
    level: 1,
    question: "快速排序 解决的核心问题形状是什么？",
    answer: "好枢轴把问题切平，坏枢轴会把快排拖成链。",
    tags: ["算法图解", "快速排序"],
  },
  {
    id: "ga2-4-2",
    chapter: "ga2-quicksort",
    level: 2,
    question: "观察 快速排序 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-4-3",
    chapter: "ga2-quicksort",
    level: 3,
    question: "什么时候不应该直接套用 快速排序？",
    answer:
      "以为快排永远是 O(n log n)。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "分而治之"],
  },
  {
    id: "ga2-5-1",
    chapter: "ga2-hash-tables",
    level: 1,
    question: "散列表 解决的核心问题形状是什么？",
    answer: "散列表快，不是因为魔法，而是因为哈希函数和负载因子配合得好。",
    tags: ["算法图解", "散列表"],
  },
  {
    id: "ga2-5-2",
    chapter: "ga2-hash-tables",
    level: 2,
    question: "观察 散列表 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-5-3",
    chapter: "ga2-hash-tables",
    level: 3,
    question: "什么时候不应该直接套用 散列表？",
    answer:
      "把平均 O(1) 当成最坏 O(1)。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "哈希函数"],
  },
  {
    id: "ga2-6-1",
    chapter: "ga2-breadth-first-search",
    level: 1,
    question: "广度优先搜索 解决的核心问题形状是什么？",
    answer: "BFS 的关键不是“找到了”，而是先到的一定边数最少。",
    tags: ["算法图解", "图"],
  },
  {
    id: "ga2-6-2",
    chapter: "ga2-breadth-first-search",
    level: 2,
    question: "观察 广度优先搜索 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-6-3",
    chapter: "ga2-breadth-first-search",
    level: 3,
    question: "什么时候不应该直接套用 广度优先搜索？",
    answer:
      "忘记记录已访问节点，搜索会绕圈。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "队列"],
  },
  {
    id: "ga2-7-1",
    chapter: "ga2-trees",
    level: 1,
    question: "树 解决的核心问题形状是什么？",
    answer: "树把线性列表折叠成层级，但前提是形状没有退化。",
    tags: ["算法图解", "树"],
  },
  {
    id: "ga2-7-2",
    chapter: "ga2-trees",
    level: 2,
    question: "观察 树 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-7-3",
    chapter: "ga2-trees",
    level: 3,
    question: "什么时候不应该直接套用 树？",
    answer:
      "只记左小右大，不看树高。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "二叉搜索树"],
  },
  {
    id: "ga2-8-1",
    chapter: "ga2-balanced-trees",
    level: 1,
    question: "平衡树 解决的核心问题形状是什么？",
    answer: "平衡树用少量维护成本，换来稳定的查询和插入上界。",
    tags: ["算法图解", "平衡树"],
  },
  {
    id: "ga2-8-2",
    chapter: "ga2-balanced-trees",
    level: 2,
    question: "观察 平衡树 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-8-3",
    chapter: "ga2-balanced-trees",
    level: 3,
    question: "什么时候不应该直接套用 平衡树？",
    answer:
      "把旋转当成背图形，忘了它在维护高度。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "旋转"],
  },
  {
    id: "ga2-9-1",
    chapter: "ga2-dijkstras-algorithm",
    level: 1,
    question: "狄克斯特拉算法 解决的核心问题形状是什么？",
    answer: "每次锁定当前最低成本节点，再把它的好消息传给邻居。",
    tags: ["算法图解", "狄克斯特拉算法"],
  },
  {
    id: "ga2-9-2",
    chapter: "ga2-dijkstras-algorithm",
    level: 2,
    question:
      "观察 狄克斯特拉算法 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-9-3",
    chapter: "ga2-dijkstras-algorithm",
    level: 3,
    question: "什么时候不应该直接套用 狄克斯特拉算法？",
    answer:
      "把负权边也塞给 Dijkstra。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "加权图"],
  },
  {
    id: "ga2-10-1",
    chapter: "ga2-greedy-algorithms",
    level: 1,
    question: "贪心算法 解决的核心问题形状是什么？",
    answer: "贪心不是偷懒，它要么有证明，要么承认自己是近似。",
    tags: ["算法图解", "贪心算法"],
  },
  {
    id: "ga2-10-2",
    chapter: "ga2-greedy-algorithms",
    level: 2,
    question: "观察 贪心算法 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-10-3",
    chapter: "ga2-greedy-algorithms",
    level: 3,
    question: "什么时候不应该直接套用 贪心算法？",
    answer:
      "看见最大收益就直接选，没验证是否破坏全局。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "集合覆盖"],
  },
  {
    id: "ga2-11-1",
    chapter: "ga2-dynamic-programming",
    level: 1,
    question: "动态规划 解决的核心问题形状是什么？",
    answer: "动态规划不是玄学填表，而是把重复计算变成查表。",
    tags: ["算法图解", "动态规划"],
  },
  {
    id: "ga2-11-2",
    chapter: "ga2-dynamic-programming",
    level: 2,
    question: "观察 动态规划 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-11-3",
    chapter: "ga2-dynamic-programming",
    level: 3,
    question: "什么时候不应该直接套用 动态规划？",
    answer:
      "没定义状态就急着写转移式。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "子问题"],
  },
  {
    id: "ga2-12-1",
    chapter: "ga2-k-nearest-neighbors",
    level: 1,
    question: "K 近邻算法 解决的核心问题形状是什么？",
    answer: "KNN 训练很轻，预测时要为距离计算付账。",
    tags: ["算法图解", "K 近邻"],
  },
  {
    id: "ga2-12-2",
    chapter: "ga2-k-nearest-neighbors",
    level: 2,
    question: "观察 K 近邻算法 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-12-3",
    chapter: "ga2-k-nearest-neighbors",
    level: 3,
    question: "什么时候不应该直接套用 K 近邻算法？",
    answer:
      "不同量纲直接算距离，结果会被大尺度特征支配。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "距离"],
  },
  {
    id: "ga2-13-1",
    chapter: "ga2-where-to-go-next",
    level: 1,
    question: "下一步学什么 解决的核心问题形状是什么？",
    answer: "学算法的下一步，是看到问题形状就能想到候选策略。",
    tags: ["算法图解", "算法地图"],
  },
  {
    id: "ga2-13-2",
    chapter: "ga2-where-to-go-next",
    level: 2,
    question: "观察 下一步学什么 的 AlgorithmPlayground 时，应该盯住哪个变量？",
    answer:
      "盯住候选集、未排序区、调用栈、队列、表格、树高或邻居集合如何变小。不要只看结果，要能说出每一步为什么减少成本。",
    tags: ["可视化", "复杂度"],
  },
  {
    id: "ga2-13-3",
    chapter: "ga2-where-to-go-next",
    level: 3,
    question: "什么时候不应该直接套用 下一步学什么？",
    answer:
      "学完章节却没有问题分类地图。 先验证输入结构、复杂度前提和边界条件，再决定是否使用这个算法。",
    tags: ["误区", "复杂度"],
  },
];
