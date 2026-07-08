import type { ReviewQuestion } from "./types";

/** 高级动态规划 复习题 */
export const ialDpAdvancedQuestions: ReviewQuestion[] = [
  {
    id: "ial-dp-advanced-1",
    chapter: "ial-dp-advanced",
    level: 1,
    question: "CLRS 的 DP 四步法是什么？",
    answer: "1.刻画最优解结构；2.递归定义最优解值（状态转移方程）；3.自底向上计算（填表）；4.构造最优解（回溯）。",
    tags: ["DP方法论"],
  },
  {
    id: "ial-dp-advanced-2",
    chapter: "ial-dp-advanced",
    level: 2,
    question: "矩阵链乘法的状态转移方程？",
    answer: "m[i,j]=min(m[i,k]+m[k+1,j]+p_{i-1}·p_k·p_j)，k∈[i,j-1]。边界 m[i,i]=0。按链长递增填表。",
    tags: ["矩阵链乘法"],
  },
  {
    id: "ial-dp-advanced-3",
    chapter: "ial-dp-advanced",
    level: 3,
    question: "LCS 的状态转移方程？",
    answer: "c[i,j]=c[i-1,j-1]+1 if x_i=y_j，否则 max(c[i-1,j],c[i,j-1])。O(mn) 时间和空间，可滚动数组优化空间到 O(min(m,n))。",
    tags: ["LCS"],
  },
  {
    id: "ial-dp-advanced-4",
    chapter: "ial-dp-advanced",
    level: 4,
    question: "什么问题适合用 DP？需要什么性质？",
    answer: "需要两个性质：最优子结构（最优解包含子问题最优解）和重叠子问题（子问题被重复计算）。有贪心选择性质可优先贪心。",
    tags: ["DP适用条件"],
  },
];
