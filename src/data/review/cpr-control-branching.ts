/** 复习题库 · C 控制语句：分支与跳转（cpr-control-branching）。C Primer Plus §7 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprControlBranchingQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "ccb-1",
    chapter: "cpr-control-branching",
    level: 1,
    question: "if / else if / else 分支链的执行规则是什么？",
    answer:
      "从上到下依次检查条件，**第一个为真的分支**执行其代码块，然后**跳过链中其余所有分支**，跳到链尾继续执行后续代码。同一时刻最多执行其中一个块；若全部条件为假且有 else，则执行 else 块。",
    tags: ["if", "else if", "分支链"],
  },
  {
    id: "ccb-2",
    chapter: "cpr-control-branching",
    level: 1,
    question: "switch 语句中 break 的作用是什么？忘记写会怎样？",
    answer:
      "break 立即跳出整个 switch，继续执行 switch 之后的语句。忘记写 break 会导致 **fall-through（穿透）**——执行完当前 case 后继续执行紧接着的下一个 case 的代码，直到遇到 break 或 switch 结束。",
    tags: ["switch", "break", "fall-through"],
  },
  {
    id: "ccb-3",
    chapter: "cpr-control-branching",
    level: 1,
    question: "break 和 continue 在循环中的区别是什么？",
    answer:
      "**break** 终止所在的最内层循环（或 switch），跳到循环/switch 之后的代码。**continue** 只跳过当前迭代中 continue 之后的语句，进入下一轮迭代（for 会先执行 update）。break 是退出整个循环，continue 是跳过本轮剩余。",
    tags: ["break", "continue", "循环"],
  },
  {
    id: "ccb-4",
    chapter: "cpr-control-branching",
    level: 1,
    question: "什么是短路求值？&& 和 || 各自如何短路？",
    answer:
      "求值时若左侧已能决定整个表达式的最终结果，则不再计算右侧。**&&**：左侧为假时整个为假，右侧不求值。**||**：左侧为真时整个为真，右侧不求值。可用于 `x != 0 && y/x > 2` 这类保护除零的写法。",
    tags: ["短路求值", "&&", "||"],
  },
  {
    id: "ccb-5",
    chapter: "cpr-control-branching",
    level: 1,
    question: "switch 的 case 标签允许哪些类型的常量？",
    answer:
      "case 后必须是**整型常量**（含 char，因 char 可当 small int）、**枚举常量**。不允许 float/double 做 case 标签，也不允许变量或范围（如 case 1..3 在标准 C 中不支持，需逐个写或用 if 链）。",
    tags: ["switch", "case", "类型"],
  },

  // ── L2 理解 ──
  {
    id: "ccb-6",
    chapter: "cpr-control-branching",
    level: 2,
    question: "什么场景适合用 if / else if 链，什么场景适合用 switch？",
    answer:
      "**if 链**：连续区间判断（score >= 90）、浮点比较、复杂逻辑组合。**switch**：根据**单个离散值**在多个固定选项间跳转（菜单 1/2/0、字符四则运算符、状态码）。选项是整数/字符/枚举且彼此独立时 switch 更清晰；区间或范围判断用 if。",
    tags: ["选型", "if", "switch"],
  },
  {
    id: "ccb-7",
    chapter: "cpr-control-branching",
    level: 2,
    question: "故意利用 fall-through 的典型用法是什么？使用时要注意什么？",
    answer:
      "多个 case 标签共享同一段处理代码时，可让 case 1、case 2 连续不写 break，最后统一 break。例如 `case 'a': case 'A': do_something(); break;`。必须**写注释标明故意 fall-through**，且确保共享代码末尾有 break，否则会继续滑入无关 case。",
    tags: ["fall-through", "switch", "技巧"],
  },
  {
    id: "ccb-8",
    chapter: "cpr-control-branching",
    level: 2,
    question: "嵌套循环中的 break 会影响外层循环吗？如何跳出两层循环？",
    answer:
      "不会。break 只终止**最内层** enclosing 的循环或 switch。要跳出外层：① 用标志变量 `done`，内层 break 后外层检查 done 再 break；② 把逻辑封装成函数，内层用 return；③ 错误清理路径可用 goto 到统一 exit 标签（少用）。",
    tags: ["break", "嵌套循环"],
  },
  {
    id: "ccb-9",
    chapter: "cpr-control-branching",
    level: 2,
    question: "为什么 `if (y != 0 && x / y > 2)` 安全，而 `if (x / y > 2 && y != 0)` 可能崩溃？",
    answer:
      "&& 从左到右短路。前者 y!=0 为假时不再算 x/y，避免除零。后者先算 x/y，y 为 0 时除法**未定义行为**。规则：**把 cheap 且能保护后续的检查放 && 左侧**。",
    tags: ["短路求值", "除零", "顺序"],
  },
  {
    id: "ccb-10",
    chapter: "cpr-control-branching",
    level: 2,
    question: "switch 里 default 分支是否必须？菜单程序为什么建议写上？",
    answer:
      "语法上 default **可选**。但菜单/用户输入场景应写 default 处理非法选项——否则 choice 不匹配任何 case 时 switch 体什么都不做，用户得不到反馈。default 相当于 if 链最后的 else 兜底。",
    tags: ["switch", "default", "菜单"],
  },

  // ── L3 应用 ──
  {
    id: "ccb-11",
    chapter: "cpr-control-branching",
    level: 3,
    question:
      "读程序，写出 grade 的值。\n```c\nint score = 78;\nchar grade;\nif (score >= 90) grade = 'A';\nelse if (score >= 80) grade = 'B';\nelse if (score >= 60) grade = 'P';\nelse grade = 'F';\n```",
    answer:
      "grade = 'P'。78 >= 90 假，>= 80 假，>= 60 真——执行第三个分支赋值 'P'，后面的 else 不再检查。",
    tags: ["if链", "读代码"],
  },
  {
    id: "ccb-12",
    chapter: "cpr-control-branching",
    level: 3,
    question:
      "读 switch，n=2 时输出几行？\n```c\nswitch (n) {\n    case 1: printf(\"A\");\n    case 2: printf(\"B\"); break;\n    case 3: printf(\"C\"); break;\n}\n```",
    answer:
      "输出一行 `B`。n=2 命中 case 2，执行 printf(\"B\") 后 break 跳出。case 1 无 break 但与 n=2 无关。若 n=1 则输出 `AB`（fall-through）。",
    tags: ["switch", "fall-through", "读代码"],
  },
  {
    id: "ccb-13",
    chapter: "cpr-control-branching",
    level: 3,
    question:
      "读程序，写出输出。\n```c\nint i;\nfor (i = 0; i < 6; i++) {\n    if (i % 2 == 0) continue;\n    if (i > 4) break;\n    printf(\"%d \", i);\n}\n```",
    answer:
      "输出：`1 3 `（1 和 3 后各跟空格）。i 为偶数时 continue 跳过 printf；i=1,3 正常打印；i=5 时 i>4 为真触发 break，printf 不执行。i=4 时 continue 跳过。",
    tags: ["continue", "break", "读代码"],
  },
  {
    id: "ccb-14",
    chapter: "cpr-control-branching",
    level: 3,
    question:
      "`if (ptr != NULL && *ptr > 0)` 当 ptr 为 NULL 时，`*ptr` 会被求值吗？为什么？",
    answer:
      "不会。&& 短路：ptr != NULL 为假时整个表达式为假，**不再求值** `*ptr > 0`，避免对空指针解引用。这是短路求值的典型安全用法。",
    tags: ["短路求值", "空指针"],
  },
  {
    id: "ccb-15",
    chapter: "cpr-control-branching",
    level: 3,
    question:
      "下面 if 有什么问题？\n```c\nif (score >= 60);\n    printf(\"及格\\n\");\n```",
    answer:
      "if 后多了**分号**——空语句成为 if 的分支体，printf 不属于 if，无论 score 多少都会执行。修法：去掉分号 `if (score >= 60) { printf(\"及格\\n\"); }` 或写在一行无分号隔开。",
    tags: ["if", "分号陷阱", "排错"],
  },

  // ── L4 综合 ──
  {
    id: "ccb-16",
    chapter: "cpr-control-branching",
    level: 4,
    question:
      "写完整菜单程序：循环显示 1=加 2=减 0=退出，读入 choice 用 switch 处理，0 时 break 出循环，非法选项走 default。",
    answer:
      "```c\n#include <stdio.h>\nint main(void) {\n    int choice;\n    do {\n        printf(\"1.加 2.减 0.退出\\n请选择：\");\n        scanf(\"%d\", &choice);\n        switch (choice) {\n            case 1: printf(\"执行加法\\n\"); break;\n            case 2: printf(\"执行减法\\n\"); break;\n            case 0: printf(\"再见\\n\"); break;\n            default: printf(\"无效选项\\n\");\n        }\n    } while (choice != 0);\n    return 0;\n}\n```\n\ndo-while 保证至少显示一次菜单；switch 各 case 带 break；0 时 break 只跳出 switch，do-while 条件使循环结束。",
    tags: ["菜单", "switch", "综合实现"],
  },
  {
    id: "ccb-17",
    chapter: "cpr-control-branching",
    level: 4,
    question:
      "找出下面程序的问题并写出修正版（至少 2 处）。\n```c\nint x = 5, y = 0;\nif (x / y > 1 && y != 0)\n    printf(\"OK\\n\");\nswitch (x) {\n    case 5: printf(\"5\");\n    case 6: printf(\"6\"); break;\n}\n```",
    answer:
      "问题：\n① `x/y` 在 y!=0 检查之前，y=0 时未定义行为。\n② case 5 缺 break，会 fall-through 打印 `56`。\n\n修正：\n```c\nif (y != 0 && x / y > 1)\n    printf(\"OK\\n\");\nswitch (x) {\n    case 5: printf(\"5\"); break;\n    case 6: printf(\"6\"); break;\n}\n```",
    tags: ["综合排错", "短路", "fall-through"],
  },
  {
    id: "ccb-18",
    chapter: "cpr-control-branching",
    level: 4,
    question:
      "比较用 if-else if 链与 switch 实现四则计算器（+ - * /）的取舍：各写一句适用条件。",
    answer:
      "**switch(ch)**：运算符是离散字符 '+','-','*','/'，case 标签一一对应，结构清晰，编译器可优化跳转表。**if-else if**：若运算符是字符串或需范围判断（如多个字符命令），switch 不适用。四则单字符运算符优先 switch；需额外条件（如除零）在 case 体内嵌 if。",
    tags: ["选型", "switch", "if链", "计算器"],
  },
];

export default cprControlBranchingQuestions;
