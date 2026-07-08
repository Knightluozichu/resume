import type { ReviewQuestion } from "./types";

/** 问题拆解 复习题 */
export const ppCrackingProblemsQuestions: ReviewQuestion[] = [
  {
    id: "pp-cracking-problems-1",
    chapter: "pp-cracking-problems",
    level: 1,
    question: "问题定义需要明确哪四个要素？",
    answer: "输入（数据类型/格式/规模）、输出（结果类型/格式）、约束（时间/空间/正确性）、正确性判定（如何验证）。",
    tags: ["问题定义"],
  },
  {
    id: "pp-cracking-problems-2",
    chapter: "pp-cracking-problems",
    level: 2,
    question: "Bentley电话号码案例中为什么位向量比排序更优？",
    answer: "问题只需去重不需排序，号码稠密范围已知。位向量10^7 bit=1.25MB，O(n)完成。排序不必要且内存不足。",
    tags: ["位向量", "案例分析"],
  },
  {
    id: "pp-cracking-problems-3",
    chapter: "pp-cracking-problems",
    level: 3,
    question: "给定找数组第K大元素的问题，定义问题并给出两种解法。",
    answer: "输入n个元素数组+K；输出第K大元素。解法1：排序后取O(n log n)。解法2：QuickSelect平均O(n)——partition后只递归包含第K大那半。洞察：只需一个元素不需全排序。",
    tags: ["问题定义", "QuickSelect"],
  },
  {
    id: "pp-cracking-problems-4",
    chapter: "pp-cracking-problems",
    level: 4,
    question: "阐述问题定义→拆解→算法选择→正确性验证的完整思维链路。",
    answer: "1）定义问题（输入/输出/约束）；2）分析结构（查找/排序/优化？特殊性质？）；3）选择算法（有序→二分，稠密→位向量，分治/DP）；4）验证正确性（数学证明+实验测试+边界测试）。每步输出是下步输入。",
    tags: ["综合", "思维链路"],
  },
];
