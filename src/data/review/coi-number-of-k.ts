import type { ReviewQuestion } from "./types";

export const numberOfKQuestions: ReviewQuestion[] = [
  {
    id: "coi-number-of-k-1",
    chapter: "coi-number-of-k",
    level: 1,
    question: `这道题的目标约束是什么？先说出你能提炼的 1~2 条关键约束。`,
    answer: `核心约束是：正确性覆盖所有输入范围，且在给定复杂度上限内完成。通常包括空输入、单元素、重复元素和上/下界值。摩尔投票扩展版，保留候选桶。`,
    tags: ["边界条件", "复杂度"],
  },
  {
    id: "coi-number-of-k-2",
    chapter: "coi-number-of-k",
    level: 2,
    question: `你会优先选择哪种思路：递归/贪心/双指针/动态规划/哈希？为什么？`,
    answer: `选择依据是输入结构。若天然有顺序关系可用双指针或滑窗；若有重复计数和可消除约束可用摩尔投票；若有区间最值可用单调结构；若有子问题叠加则用 DP。`,
    tags: ["策略选择", "算法思维"],
  },
  {
    id: "coi-number-of-k-3",
    chapter: "coi-number-of-k",
    level: 2,
    question: `给出该题的时间复杂度和空间复杂度。`,
    answer: `时间复杂度依赖具体实现：通常目标是线性或对数级。空间复杂度除输入本身外，优先做到 O(1) 或 O(log N) 级，不把中间冗余结构扩展到平方级。`,
    tags: ["复杂度", "性能"],
  },
  {
    id: "coi-number-of-k-4",
    chapter: "coi-number-of-k",
    level: 3,
    question: `请给出一版 TypeScript 代码的主流程。`,
    answer: `\`\`\`typescript\nfunction moreThanKTimes(nums: number[], k: number): number[] {\n  if (k <= 1 || nums.length === 0) return [];\n  const cnt = new Map<number, number>();\n\n  for (const x of nums) {\n    if (cnt.has(x)) {\n      cnt.set(x, (cnt.get(x) || 0) + 1);\n    } else if (cnt.size < k - 1) {\n      cnt.set(x, 1);\n    } else {\n      for (const [key, value] of cnt) {\n        if (value <= 1) cnt.delete(key);\n        else cnt.set(key, value - 1);\n      }\n    }\n  }\n\n  const ans: number[] = [];\n  for (const [key] of cnt) {\n    let freq = 0;\n    for (const x of nums) if (x === key) freq++;\n    if (freq * k > nums.length) ans.push(key);\n  }\n  return ans;\n}\n\`\`\``,
    tags: ["代码实现", "TypeScript"],
  },
  {
    id: "coi-number-of-k-5",
    chapter: "coi-number-of-k",
    level: 4,
    question: `如果输入带有边界冲击值（最大长度、最小长度、重复值），你如何防止逻辑分支遗漏？`,
    answer: `把边界条件编码前先写死 3~5 个测试：空值、单元素、重复值、递增/递减极值、随机长列。每加一条用例就对照流程是否保持状态不变量。`,
    tags: ["测试设计", "边界"],
  },
];
