import type { ReviewQuestion } from "./types";

/** 动态规划 复习题 */
export const dsaDynamicProgrammingQuestions: ReviewQuestion[] = [
  {
    id: "dsa-dynamic-programming-1",
    chapter: "dsa-dynamic-programming",
    level: 1,
    question: `动态规划可行的两个前提条件是什么？`,
    answer: `最优子结构 + 重叠子问题。最优子结构保证子问题的最优解能组合成全局最优解；重叠子问题保证缓存有意义（否则用分治即可）。两者缺一不可——无最优子结构则 DP 不正确，无重叠子问题则 DP 无收益。`,
    tags: ["动态规划", "最优子结构"],
  },
  {
    id: "dsa-dynamic-programming-2",
    chapter: "dsa-dynamic-programming",
    level: 2,
    question: `0-1 背包的一维空间优化为什么必须逆序遍历容量？`,
    answer: `保证 dp[j-w[i]] 仍是上一轮的值，避免物品被重复选取。逆序遍历确保计算 dp[j] 时 dp[j-w[i]] 还是上一轮（不含当前物品 i）的值。若正序遍历，dp[j-w[i]] 可能已被当前轮更新（含物品 i），导致物品 i 被选两次——退化成完全背包。`,
    tags: ["0-1背包", "空间优化"],
  },
  {
    id: "dsa-dynamic-programming-3",
    chapter: "dsa-dynamic-programming",
    level: 3,
    question: `记忆化搜索（自顶向下）相比递推（自底向上）的主要优势是什么？`,
    answer: `只计算需要的状态，思路更自然。记忆化按递归定义自然写出，且只计算实际需要的状态（状态空间稀疏时有利）。但递归有栈开销，且栈深度受限。递推无递归开销、常数更小，但可能计算不需要的状态。`,
    tags: ["记忆化搜索", "递推"],
  },
  {
    id: "dsa-dynamic-programming-4",
    chapter: "dsa-dynamic-programming",
    level: 4,
    question: `LCS（最长公共子序列）的时间复杂度是多少？`,
    answer: `O(mn)，m 和 n 分别是两字符串长度。LCS 填 m×n 的二维表，每个格子 O(1) 转移，总计 O(mn)。空间可从 O(mn) 优化到 O(min(m,n))（只用两行滚动）。这是序列 DP 的经典复杂度。`,
    tags: ["LCS", "时间复杂度"],
  },
];
