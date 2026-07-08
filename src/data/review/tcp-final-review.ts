import type { ReviewQuestion } from "./types";

/** TAOCP 总复习 复习题 */
export const tcpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "tcp-final-review-1",
    chapter: "tcp-final-review",
    level: 1,
    question: "TAOCP 全书四大板块是什么？核心递进关系是什么？",
    answer: "基础概念、信息结构、随机性、高级主题。递进关系：数学奠基 → 结构支撑 → 随机性与算术 → 高级综合。后段依赖前段的理解。",
    tags: ["全书结构", "复习"],
  },
  {
    id: "tcp-final-review-2",
    chapter: "tcp-final-review",
    level: 2,
    question: "TAOCP 的核心方法论（Knuth 三步法）是什么？",
    answer: "(1) 数学建模：用递归/求和描述代价，归纳法证正确性；(2) 结构优化：选合适数据结构降低复杂度；(3) 实验验证：高质量随机数测试 + 统计检验验证。",
    tags: ["方法论", "核心"],
  },
  {
    id: "tcp-final-review-3",
    chapter: "tcp-final-review",
    level: 3,
    question: "为什么说随机数质量是概率算法正确性的前提？",
    answer: "差的随机数（如 RANDU）有高维结构偏差，会让蒙特卡洛模拟等概率算法产生系统性错误结论。只有通过卡方+谱检验的随机数才能保证统计模拟的可靠性。",
    tags: ["随机数", "概率算法"],
  },
  {
    id: "tcp-final-review-4",
    chapter: "tcp-final-review",
    level: 4,
    question: "举例说明信息结构选择如何影响算法效率。",
    answer: "有序数组上二分查找 O(log n)，无序数组上线性查找 O(n)。哈希表精确查找 O(1) 但不支持范围查询。B 树磁盘查找 3-4 次 I/O vs 二叉树 30 次 I/O。选对结构 = 选对算法基础。",
    tags: ["信息结构", "效率"],
  },
];
