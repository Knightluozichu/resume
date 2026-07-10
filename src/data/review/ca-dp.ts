import type { ReviewQuestion } from "./types";

/** 动态规划：状态转移 复习题 */
export const caDpQuestions: ReviewQuestion[] = [
  {
    id: "ca-dp-1",
    chapter: "ca-dp",
    level: 1,
    question: `动态规划的两个核心要素是什么？`,
    answer: `最优子结构（问题最优解包含子问题最优解）和无后效性（未来只依赖当前状态不依赖到达路径）。两者缺一不可。`,
    tags: ["核心要素"],
  },
  {
    id: "ca-dp-2",
    chapter: "ca-dp",
    level: 2,
    question: `0-1 背包为什么容量要逆序遍历？`,
    answer: `逆序保证计算 dp[j] 时用的 dp[j-w[i]] 是上一轮（不含当前物品）的值，确保每个物品只选一次。正序会变成完全背包（物品可重复选）。`,
    tags: ["0-1背包", "遍历顺序"],
  },
  {
    id: "ca-dp-3",
    chapter: "ca-dp",
    level: 3,
    question: `如何将 O(n^2) 空间的 DP 优化到 O(n)？`,
    answer: `如果 dp[i] 只依赖 dp[i-1]，用滚动数组：两个一维数组交替使用。如果只依赖前一个状态，用一个数组加临时变量即可。`,
    tags: ["空间优化", "滚动数组"],
  },
  {
    id: "ca-dp-4",
    chapter: "ca-dp",
    level: 4,
    question: `什么情况下 DP 状态不满足无后效性？如何修复？`,
    answer: `当后续状态依赖\"怎么到达当前状态\"的路径时。如 dp[i] 表示走到 i 的最优值但后续需要知道方向。修复：增加状态维度，如 dp[i][j][方向] 消除路径依赖。`,
    tags: ["无后效性", "状态设计"],
  },
];
