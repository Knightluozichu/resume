import type { ReviewQuestion } from "./types";

export const stringPermutationQuestions: ReviewQuestion[] = [
  {
    id: "coi-string-permutation-1",
    chapter: "coi-string-permutation",
    level: 1,
    question: "这道题要解决的核心约束是什么？",
    answer: "给定字符串 `str`，需要输出所有不同的排列序列，长度等于输入长度；当字符重复时必须去重，重复字符造成的多重分支必须被剪掉。",
    tags: ["边界条件", "复杂度"],
  },
  {
    id: "coi-string-permutation-2",
    chapter: "coi-string-permutation",
    level: 2,
    question: "为什么优先选回溯而不是 DP/双指针？",
    answer: "这是典型排列问题，解空间是“树形枚举”。回溯天然适配“每一步选一个未使用字符、直到长度达标”的分层结构；双指针/贪心不适合枚举全量解。",
    tags: ["策略选择", "算法思维"],
  },
  {
    id: "coi-string-permutation-3",
    chapter: "coi-string-permutation",
    level: 2,
    question: "给出该题的时间复杂度和空间复杂度。",
    answer: "设不同字符数为 n，去重后的方案数为 m，回溯遍历每种方案并构造长度 n 的字符串，时间上界 O(m * n)。空间主要是递归栈深度和路径数组，O(n)。",
    tags: ["复杂度", "性能"],
  },
  {
    id: "coi-string-permutation-4",
    chapter: "coi-string-permutation",
    level: 3,
    question: "请给出一版 TypeScript 代码的主流程。",
    answer:
      "```typescript\nfunction stringPermutation(str: string): string[] {\n  if (!str.length) return [];\n  const chars = [...str].sort();\n  const used = new Array(chars.length).fill(false);\n  const path: string[] = [];\n  const res: string[] = [];\n\n  const dfs = () => {\n    if (path.length === chars.length) {\n      res.push(path.join(''));\n      return;\n    }\n\n    for (let i = 0; i < chars.length; i++) {\n      if (used[i]) continue;\n      if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue;\n\n      used[i] = true;\n      path.push(chars[i]);\n      dfs();\n      path.pop();\n      used[i] = false;\n    }\n  };\n\n  dfs();\n  return res;\n}\n```",
    tags: ["代码实现", "TypeScript"],
  },
  {
    id: "coi-string-permutation-5",
    chapter: "coi-string-permutation",
    level: 4,
    question: "最容易遗漏的边界是什么？你如何验证？",
    answer: '`""`（空串）应返回空结果；单字符与完全相同字符（如 `"aaa"`）应返回 1 个结果。建议加 3 类样例：重复字符串、含空输入、长度 8 左右的随机串验证剪枝是否显著降低重复分支。',
    tags: ["测试设计", "边界"],
  },
];
