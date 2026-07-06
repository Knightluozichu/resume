import type { ReviewQuestion } from "./types";

export const stringToIntQuestions: ReviewQuestion[] = [
  {
    id: "coi-string-to-int-1",
    chapter: "coi-string-to-int",
    level: 1,
    question: "这道题的目标约束是什么？",
    answer: "把十进制字符串解析为 int，处理前导空白和可选符号，并在超过 32 位有符号整数范围时返回边界值，非数字开头返回 0。",
    tags: ["边界条件", "复杂度"],
  },
  {
    id: "coi-string-to-int-2",
    chapter: "coi-string-to-int",
    level: 2,
    question: "为什么这个题不是“高级算法”题？",
    answer: "核心是顺序解析与边界控制，时间主要是线性扫描；不存在子结构重叠或复杂状态转移，因此不需要 DP/回溯。",
    tags: ["策略选择", "算法思维"],
  },
  {
    id: "coi-string-to-int-3",
    chapter: "coi-string-to-int",
    level: 2,
    question: "给出时间复杂度和空间复杂度。",
    answer: "时间 O(n)，n 为字符串长度，每字符最多访问一次。空间 O(1)，除常数变量外不需要额外与 n 成正比的结构。",
    tags: ["复杂度", "性能"],
  },
  {
    id: "coi-string-to-int-4",
    chapter: "coi-string-to-int",
    level: 3,
    question: "请给出一版 TypeScript 代码的主流程。",
    answer:
      "```typescript\nfunction stringToInt(str: string): number {\n  const INT_MAX = 2_147_483_647;\n  const INT_MIN = -2_147_483_648;\n  let i = 0;\n  while (i < str.length && str[i] === ' ') i++;\n  if (i === str.length) return 0;\n\n  let sign = 1;\n  if (str[i] === '+' || str[i] === '-') {\n    sign = str[i] === '-' ? -1 : 1;\n    i++;\n  }\n\n  let value = 0;\n  while (i < str.length) {\n    const c = str.charCodeAt(i);\n    if (c < 48 || c > 57) break;\n    const next = value * 10 + (c - 48);\n    if (sign === 1 && next > INT_MAX) return INT_MAX;\n    if (sign === -1 && -next < INT_MIN) return INT_MIN;\n    value = next;\n    i++;\n  }\n\n  return sign === 1 ? value : -value;\n}\n```",
    tags: ["代码实现", "TypeScript"],
  },
  {
    id: "coi-string-to-int-5",
    chapter: "coi-string-to-int",
    level: 4,
    question: "你要如何覆盖越界与非法输入？",
    answer: '至少覆盖这 5 类：`""`、`"  -42"`、`"4193 with words"`、`"2147483648"`、`"-2147483649"`。每条都要求期望值明确。',
    tags: ["测试设计", "边界"],
  },
];
