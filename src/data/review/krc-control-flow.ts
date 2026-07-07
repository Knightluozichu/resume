/** 复习题库 · 控制流（krc-control-flow）。K&R 第 3 章改编。 */

import type { ReviewQuestion } from "./types";

export const krcControlFlowQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "krc-cf-1",
    chapter: "krc-control-flow",
    level: 1,
    question: "C 语言的 `while` 和 `do-while` 循环有什么核心区别？",
    answer:
      "`while` 是先判断后执行：先检查条件，为真才进入循环体，循环体可能一次都不执行。\n`do-while` 是先执行后判断：先执行循环体，再检查条件，循环体至少执行一次。\n语法区别：`while (cond) { ... }` vs `do { ... } while (cond);`——do-while 末尾有分号。",
    tags: ["while", "do-while", "循环结构"],
  },
  // ── L2 理解 ──
  {
    id: "krc-cf-2",
    chapter: "krc-control-flow",
    level: 2,
    question: "`switch` 语句中忘记写 `break` 会发生什么？这叫什么现象？",
    answer:
      "会发生「case 穿透（fall-through）」：匹配某个 case 后，执行该 case 的语句，然后不加判断地继续执行后续所有 case 的语句，直到遇到 `break` 或 switch 结束。这不是 bug 而是 C 的设计——当多个 case 需要执行相同逻辑时可以故意省略 break 利用穿透。但无意遗漏 break 是最常见的 switch 陷阱之一。",
    tags: ["switch", "break", "fall-through", "穿透"],
  },
  // ── L3 应用 ──
  {
    id: "krc-cf-3",
    chapter: "krc-control-flow",
    level: 3,
    question: "以下 for 循环执行多少次？\n`for (int i = 0, j = 10; i < j; i += 2, j -= 1) { ... }`",
    answer:
      "执行 4 次。逐步追踪：\n第 1 次：i=0, j=10 → 0<10 ✓ → 执行 → i=2, j=9\n第 2 次：i=2, j=9 → 2<9 ✓ → 执行 → i=4, j=8\n第 3 次：i=4, j=8 → 4<8 ✓ → 执行 → i=6, j=7\n第 4 次：i=6, j=7 → 6<7 ✓ → 执行 → i=8, j=6\n第 5 次：i=8, j=6 → 8<6 ✗ → 退出\n关键点：for 循环的逗号表达式 `i += 2, j -= 1` 在每次循环结束后同时执行，i 在增大、j 在缩小，两者从两端靠近。",
    tags: ["for循环", "逗号表达式", "多重变量"],
  },
  // ── L4 综合 ──
  {
    id: "krc-cf-4",
    chapter: "krc-control-flow",
    level: 4,
    question: "`break` 和 `continue` 在循环中的行为分别是什么？在嵌套循环中，`break` 能跳出几层循环？如果需要跳出多层，有什么方案？",
    answer:
      "`break`：立即终止当前所在的循环（或 switch），跳到循环之后继续执行。\n`continue`：跳过当前循环体剩余部分，直接进入下一次循环条件判断。\n在嵌套循环中，`break` 只能跳出最内层循环，不能直接跳出外层。\n跳出多层的方案：① 用标志变量配合外层条件判断 ② 用 `goto` 直接跳到外层循环之后的标签（K&R 中讨论过这是 goto 的合理用途之一）③ 把嵌套循环封装成函数，用 `return` 退出。方案③最干净，方案②在深层嵌套时最直接但需谨慎。",
    tags: ["break", "continue", "嵌套循环", "goto", "综合"],
  },
];

export default krcControlFlowQuestions;
