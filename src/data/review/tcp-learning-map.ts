import type { ReviewQuestion } from "./types";

/** TAOCP 全书学习地图 复习题 */
export const tcpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "tcp-learning-map-1",
    chapter: "tcp-learning-map",
    level: 1,
    question: `TAOCP 全书分为哪四大板块？`,
    answer: `基础概念、信息结构、随机性（随机数与算术）、高级主题。全书按「数学基础 → 信息结构 → 随机性与算术 → 高级主题」递进。`,
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "tcp-learning-map-2",
    chapter: "tcp-learning-map",
    level: 2,
    question: `算法分析在 TAOCP 全书中的地位是什么？`,
    answer: `算法分析是全书的统一语言和基石。后续每一章的复杂度推导、概率分析、正确性证明都依赖于第一卷建立的数学预备知识。`,
    tags: ["算法分析", "核心地位"],
  },
  {
    id: "tcp-learning-map-3",
    chapter: "tcp-learning-map",
    level: 3,
    question: `为什么信息结构的选择直接影响算法效率？`,
    answer: `数据怎么组织决定了算法怎么操作。同一问题在不同数据结构上效率天差地别——例如有序数组上的二分查找是 O(log n)，无序数组上的线性查找是 O(n)。`,
    tags: ["信息结构", "效率"],
  },
  {
    id: "tcp-learning-map-4",
    chapter: "tcp-learning-map",
    level: 4,
    question: `TAOCP 用什么指令集架构来分析算法的机器级成本？`,
    answer: `MMIX。Knuth 设计的 RISC 指令集架构，用于以指令级精度度量算法的真实运行成本，取代了早期的 MIX 架构。`,
    tags: ["MMIX", "指令集"],
  },
];
