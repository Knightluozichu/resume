import type { ReviewQuestion } from "./types";

export const translateNumbersToStringsQuestions: ReviewQuestion[] = [
  {
    id: "coi-translate-numbers-to-strings-1",
    chapter: "coi-translate-numbers-to-strings",
    level: 1,
    question: "你先提炼 2 条关键约束。",
    answer: "第一，输入是一个数字字符串，求可翻译序列数；第二，只有数值在 10 到 25 之间的两位子串才允许作为一组翻译，`0` 本身不能独立翻译。",
    tags: ["边界条件", "复杂度"],
  },
  {
    id: "coi-translate-numbers-to-strings-2",
    chapter: "coi-translate-numbers-to-strings",
    level: 2,
    question: "为什么选 DP 而不是回溯？",
    answer: "这类长度问题有大量重叠子问题（从同一位置出发的后缀状态反复出现），DP 只需线性状态转移即可完成计数；回溯则会有指数级重复计算。",
    tags: ["策略选择", "算法思维"],
  },
  {
    id: "coi-translate-numbers-to-strings-3",
    chapter: "coi-translate-numbers-to-strings",
    level: 2,
    question: "给出该题的时间复杂度和空间复杂度。",
    answer: "DP 写法时间复杂度 O(n)，每个位置执行常量次转移；空间复杂度 O(n)，可优化到 O(1) 只保留最近两个状态。",
    tags: ["复杂度", "性能"],
  },
  {
    id: "coi-translate-numbers-to-strings-4",
    chapter: "coi-translate-numbers-to-strings",
    level: 3,
    question: "请给出一版 TypeScript 代码的主流程。",
    answer:
      "```typescript\nfunction translateNumbersToStrings(nums: string): number {\n  const n = nums.length;\n  if (n === 0) return 0;\n  const dp = new Array(n + 1).fill(0);\n  dp[n] = 1;\n\n  for (let i = n - 1; i >= 0; i--) {\n    if (nums[i] === '0') {\n      dp[i] = dp[i + 1];\n      continue;\n    }\n\n    let ways = dp[i + 1];\n    if (i + 1 < n) {\n      const two = Number(nums.slice(i, i + 2));\n      if (two >= 10 && two <= 25) ways += dp[i + 2];\n    }\n    dp[i] = ways;\n  }\n  return dp[0];\n}\n```",
    tags: ["代码实现", "TypeScript"],
  },
  {
    id: "coi-translate-numbers-to-strings-5",
    chapter: "coi-translate-numbers-to-strings",
    level: 4,
    question: "边界如何验证？",
    answer: '重点测：`""`、`"0"`、`"10"`、`"12258"`、含连续 0 的 `"10101"`。这些能覆盖一位翻译、双位翻译、单一合法边界和零值屏蔽。',
    tags: ["测试设计", "边界"],
  },
];
