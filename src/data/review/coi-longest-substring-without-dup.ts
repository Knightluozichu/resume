import type { ReviewQuestion } from "./types";

export const longestSubstringWithoutDupQuestions: ReviewQuestion[] = [
  {
    id: "coi-longest-substring-without-dup-1",
    chapter: "coi-longest-substring-without-dup",
    level: 1,
    question: `这道题的目标约束是什么？先说出你能提炼的 1~2 条关键约束。`,
    answer: `核心约束是：正确性覆盖所有输入范围，且在给定复杂度上限内完成。通常包括空输入、单元素、重复元素和上/下界值。滑动窗口 + 最近位置数组。`,
    tags: ["边界条件", "复杂度"],
  },
  {
    id: "coi-longest-substring-without-dup-2",
    chapter: "coi-longest-substring-without-dup",
    level: 2,
    question: `你会优先选择哪种思路：递归/贪心/双指针/动态规划/哈希？为什么？`,
    answer: `选择依据是输入结构。若天然有顺序关系可用双指针或滑窗；若有重复计数和可消除约束可用摩尔投票；若有区间最值可用单调结构；若有子问题叠加则用 DP。`,
    tags: ["策略选择", "算法思维"],
  },
  {
    id: "coi-longest-substring-without-dup-3",
    chapter: "coi-longest-substring-without-dup",
    level: 2,
    question: `给出该题的时间复杂度和空间复杂度。`,
    answer: `时间复杂度依赖具体实现：通常目标是线性或对数级。空间复杂度除输入本身外，优先做到 O(1) 或 O(log N) 级，不把中间冗余结构扩展到平方级。`,
    tags: ["复杂度", "性能"],
  },
  {
    id: "coi-longest-substring-without-dup-4",
    chapter: "coi-longest-substring-without-dup",
    level: 3,
    question: `请给出一版 TypeScript 代码的主流程。`,
    answer: `\`\`\`typescript\nfunction longestSubstringWithoutDup(s: string): number {\n    const last = new Array(256).fill(-1);\n    let left = 0;\n    let best = 0;\n\n    for (let right = 0; right < s.length; right++) {\n        const code = s.charCodeAt(right) & 0xff;\n        if (last[code] >= left) {\n            left = last[code] + 1;\n        }\n        last[code] = right;\n        best = Math.max(best, right - left + 1);\n    }\n    return best;\n}\n\`\`\``,
    tags: ["代码实现", "TypeScript"],
  },
  {
    id: "coi-longest-substring-without-dup-5",
    chapter: "coi-longest-substring-without-dup",
    level: 4,
    question: `如果输入带有边界冲击值（最大长度、最小长度、重复值），你如何防止逻辑分支遗漏？`,
    answer: `把边界条件编码前先写死 3~5 个测试：空值、单元素、重复值、递增/递减极值、随机长列。每加一条用例就对照流程是否保持状态不变量。`,
    tags: ["测试设计", "边界"],
  },
];
