import type { ReviewQuestion } from "./types";

export const coiPrintTreesInLinesQuestions: ReviewQuestion[] = [
  {
    id: "coi-print-trees-in-lines-1",
    chapter: "coi-print-trees-in-lines",
    level: 1,
    question: `该题目目标是什么？先把输入边界和输出要求用一句话定义。`,
    answer: `先明确输入范围、边界约束与输出格式。从上到下打印二叉树 II通常可转化为结构化问题，先确认边界条件再写主流程。`,
    tags: ["问题抽象", "边界条件"],
  },
  {
    id: "coi-print-trees-in-lines-2",
    chapter: "coi-print-trees-in-lines",
    level: 2,
    question: `你如何证明你的解法覆盖全部用例？`,
    answer: `先用空输入、最小输入、重复值、退化形态做对照，再用复杂度上界校验实现是否在约束内。`,
    tags: ["正确性", "测试"],
  },
  {
    id: "coi-print-trees-in-lines-3",
    chapter: "coi-print-trees-in-lines",
    level: 3,
    question: `给出一版 TypeScript 实现主框架。`,
    answer: `function solution(input: any): any {\n  // 1) 输入校验\n  // 2) 建模状态\n  // 3) 迭代或递归执行\n  // 4) 返回结果\n  return input;\n}`,
    tags: ["TypeScript", "实现"],
  },
  {
    id: "coi-print-trees-in-lines-4",
    chapter: "coi-print-trees-in-lines",
    level: 4,
    question: `如果在输入极值上出现性能瓶颈，你会做哪一步优化？`,
    answer: `先确认热点是否在查找/遍历/递归层，通常通过剪枝、降重、减少中间副本或更换数据结构优化。`,
    tags: ["优化", "复杂度"],
  },
];
