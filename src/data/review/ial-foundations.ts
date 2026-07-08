import type { ReviewQuestion } from "./types";

/** 算法基础：渐近分析与递归 复习题 */
export const ialFoundationsQuestions: ReviewQuestion[] = [
  {
    id: "ial-foundations-1",
    chapter: "ial-foundations",
    level: 1,
    question: "O、Ω、Θ 分别表示什么？",
    answer: "O 是上界（不超过），Ω 是下界（不低于），Θ 是紧确界（同阶）。f=Θ(g) 当且仅当 f=O(g) 且 f=Ω(g)。",
    tags: ["渐近记号"],
  },
  {
    id: "ial-foundations-2",
    chapter: "ial-foundations",
    level: 2,
    question: "主定理的三种情况是什么？",
    answer: "情况1：f(n) 多项式小于 n^(log_b a)，T(n)=Θ(n^(log_b a))。情况2：f(n)=Θ(n^(log_b a))，T(n)=Θ(n^(log_b a)·log n)。情况3：f(n) 多项式大于且满足正则条件，T(n)=Θ(f(n))。",
    tags: ["主定理"],
  },
  {
    id: "ial-foundations-3",
    chapter: "ial-foundations",
    level: 3,
    question: "用主定理分析 T(n)=4T(n/2)+n。",
    answer: "a=4, b=2, n^(log_2 4)=n^2。f(n)=n=O(n^(2-1))，多项式小于 n^2，属于情况1。T(n)=Θ(n^2)。",
    tags: ["主定理", "应用"],
  },
  {
    id: "ial-foundations-4",
    chapter: "ial-foundations",
    level: 4,
    question: "O 和 Θ 有什么区别？为什么实践中用 Θ？",
    answer: "O 是上界，可能不紧确（如 n=O(n^2) 对但没意义）。Θ 是紧确界，精确描述增长阶。说\"算法是 O(n^2)\"可能其实跑 O(n)，用 Θ 更准确。",
    tags: ["O vs Θ", "精确性"],
  },
];
