/** 复习题库 · C 控制语句：循环（cpr-control-loops）。C Primer Plus §6 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprControlLoopsQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "ccl-1",
    chapter: "cpr-control-loops",
    level: 1,
    question: "C 语言 for 循环括号里的三个部分分别叫什么？各执行几次？",
    answer:
      "三部分：初始化（init）、条件（cond）、更新（update）。初始化只在循环开始前执行**一次**；之后每轮重复「判断条件→执行循环体→执行更新→回到条件」。条件为假时退出，更新不再执行。",
    tags: ["for循环", "三要素", "init", "cond", "update"],
  },
  {
    id: "ccl-2",
    chapter: "cpr-control-loops",
    level: 1,
    question: "do-while 循环的语法形式是什么？末尾有什么容易漏写的符号？",
    answer:
      "形式：`do { 循环体 } while (条件);`——**while 后面的分号必须有**，它是 do-while 语法的一部分，不是空语句。漏写分号会编译报错。",
    tags: ["do-while", "语法", "分号"],
  },
  {
    id: "ccl-3",
    chapter: "cpr-control-loops",
    level: 1,
    question: "什么是哨兵值（sentinel value）？举一个常见例子。",
    answer:
      "哨兵值是用来标记「数据结束」的特殊值，正常数据里不会出现。循环每次读入数据后判断是否为哨兵——不是就处理并继续读入，是就退出。常见例子：输入整数时约定 `-1` 或 `0` 表示结束。",
    tags: ["哨兵值", "sentinel", "输入循环"],
  },
  {
    id: "ccl-4",
    chapter: "cpr-control-loops",
    level: 1,
    question: "嵌套循环中，若外循环执行 M 次、内循环每次执行 N 次，内循环体总共执行多少次？",
    answer:
      "约 M × N 次（假设内循环次数不随外循环变化）。外循环每走一步，内循环完整跑一圈。例如外循环 3 次、内循环每次 3 次，内循环体共执行 9 次——对应 3×3 矩阵遍历。",
    tags: ["嵌套循环", "次数", "矩阵"],
  },
  {
    id: "ccl-5",
    chapter: "cpr-control-loops",
    level: 1,
    question: "while 和 do-while 在执行顺序上的根本区别是什么？",
    answer:
      "while 是**入口条件**循环：先判断条件，条件为真才执行循环体——可能一次都不执行。do-while 是**出口条件**循环：先执行循环体，再判断条件——**至少执行一次**循环体。",
    tags: ["while", "do-while", "入口条件", "出口条件"],
  },

  // ── L2 理解 ──
  {
    id: "ccl-6",
    chapter: "cpr-control-loops",
    level: 2,
    question: "什么场景适合用 for，什么场景适合用 while，什么场景适合用 do-while？",
    answer:
      "for：循环次数或起止步长**事先明确**（计数循环、遍历固定范围）。while：重复次数**不确定**，可能零次（哨兵值输入、读到文件尾）。do-while：至少要执行一轮（菜单显示、输入校验——先展示再判断要不要继续）。",
    tags: ["选型", "for", "while", "do-while"],
  },
  {
    id: "ccl-7",
    chapter: "cpr-control-loops",
    level: 2,
    question: "for (int i = 0; i < 5; i++) 循环正常结束后，i 的值是多少？为什么不是 4？",
    answer:
      "i = 5。最后一轮循环体执行时 i 还是 4（满足 `4 < 5`），循环体结束后执行 `i++` 变成 5，再判断 `5 < 5` 为假才退出。退出后 i 的值是「让条件第一次不成立的那个值」——用 `<` 时比最后一轮循环体内的 i 大 1。",
    tags: ["边界", "循环控制变量", "for"],
  },
  {
    id: "ccl-8",
    chapter: "cpr-control-loops",
    level: 2,
    question: "哨兵值循环为什么通常要在循环外先读入第一个值？",
    answer:
      "因为 while 是「先判后做」——进入循环前就要用第一个读入的值做条件判断。若在循环内才第一次读入，条件里用的可能是未初始化的变量（垃圾值）。标准模式：循环外 `scanf` 第一个 → `while (item != 哨兵)` → 处理 → 循环内再 `scanf` 下一个。",
    tags: ["哨兵值", "先读入", "while"],
  },
  {
    id: "ccl-9",
    chapter: "cpr-control-loops",
    level: 2,
    question: "嵌套循环打印三角形图案时，为什么内循环上界常写成 `j <= i` 而不是固定常数？",
    answer:
      "外循环变量 i 表示「当前行号」，第 i 行需要 i 个字符/元素。内循环 `j` 从 1 到 i（`j <= i`）恰好打印 i 个——行数增加，每行内容递增，形成三角形。若内循环上界固定为最大值，每行字符数相同，得到的是矩形而非三角。",
    tags: ["嵌套循环", "图案", "边界"],
  },
  {
    id: "ccl-10",
    chapter: "cpr-control-loops",
    level: 2,
    question: "for 循环的更新部分可以留空吗？什么情况下会这么做？",
    answer:
      "可以留空：`for (i = 0; i < n; )`——更新逻辑改在循环体内（如根据条件决定 `i++` 或 `i += 2`）。但更常见、更安全的做法是把 `i++` 写在 for 的更新段。留空时务必保证循环体内某条路径一定会更新控制变量，否则死循环。",
    tags: ["for", "更新", "死循环"],
  },

  // ── L3 应用 ──
  {
    id: "ccl-11",
    chapter: "cpr-control-loops",
    level: 3,
    question:
      "读程序，写出输出。\n```c\nint i;\nfor (i = 1; i <= 3; i++)\n    printf(\"%d \", i * i);\nprintf(\"| i=%d\", i);\n```",
    answer:
      "输出：`1 4 9 | i=4`。for 打印 1²、2²、3² 后 i 变成 4，条件 `4 <= 3` 不成立退出。注意 for 没有花括号时只有紧跟的一行属于循环体——最后的 printf 在循环外。",
    tags: ["for", "读代码", "边界"],
  },
  {
    id: "ccl-12",
    chapter: "cpr-control-loops",
    level: 3,
    question:
      "下面哨兵循环有什么问题？如何修正？\n```c\nint x, sum = 0;\nwhile (x != -1) {\n    scanf(\"%d\", &x);\n    sum += x;\n}\n```",
    answer:
      "第一次判断 `x != -1` 时 x **未初始化**，行为未定义。且若第一个输入就是 -1，会把 -1 加进 sum。修正：循环外先读第一个值，循环内先处理再加下一个——\n```c\nscanf(\"%d\", &x);\nwhile (x != -1) {\n    sum += x;\n    scanf(\"%d\", &x);\n}\n```",
    tags: ["哨兵值", "排错", "未初始化"],
  },
  {
    id: "ccl-13",
    chapter: "cpr-control-loops",
    level: 3,
    question:
      "读程序，写出 3×3 矩阵遍历后 total 的值。\n```c\nint m[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\nint r, c, total = 0;\nfor (r = 0; r < 3; r++)\n    for (c = 0; c < 3; c++)\n        total += m[r][c];\n```",
    answer:
      "total = 45。外循环 r 从 0 到 2，内循环 c 从 0 到 2，每个元素加一次：1+2+3+4+5+6+7+8+9 = 45。共 3×3 = 9 次加法。",
    tags: ["嵌套循环", "二维数组", "读代码"],
  },
  {
    id: "ccl-14",
    chapter: "cpr-control-loops",
    level: 3,
    question:
      "`for (i = 0; i < 10; i++); { printf(\"%d\", i); }` 会打印什么？为什么？",
    answer:
      "只打印一次 `10`（若 i 在循环前为 0）。for 后的分号使空语句成为循环体——i 从 0 自增到 10 后退出。花括号里的 printf **不属于 for**，只在 for 结束后执行一次，此时 i 已是 10。这是 for 版「分号陷阱」。",
    tags: ["分号陷阱", "for", "排错"],
  },
  {
    id: "ccl-15",
    chapter: "cpr-control-loops",
    level: 3,
    question:
      "把下面 while 改写成等价的 for 循环：\n```c\nint i = 0;\nwhile (i < 10) {\n    printf(\"%d\\n\", i);\n    i++;\n}\n```",
    answer:
      "```c\nfor (int i = 0; i < 10; i++) {\n    printf(\"%d\\n\", i);\n}\n```\n\nwhile 的初始化→`for` 的 init，条件→cond，循环体末尾的 `i++`→update。任何 while 都可以改写成 for，反之亦然——选读起来更清晰的写法。",
    tags: ["while", "for", "改写"],
  },

  // ── L4 综合 ──
  {
    id: "ccl-16",
    chapter: "cpr-control-loops",
    level: 4,
    question:
      "写完整程序：用哨兵值循环读入正整数（0 结束），输出最大值和平均值（保留两位小数）。若只输入 0，输出「无数据」。",
    answer:
      "```c\n#include <stdio.h>\nint main(void) {\n    int x, count = 0, max = 0;\n    double sum = 0;\n\n    printf(\"输入正整数（0 结束）：\\n\");\n    scanf(\"%d\", &x);\n    if (x == 0) {\n        printf(\"无数据\\n\");\n        return 0;\n    }\n    while (x != 0) {\n        if (x > max) max = x;\n        sum += x;\n        count++;\n        scanf(\"%d\", &x);\n    }\n    printf(\"最大=%d 平均=%.2f\\n\", max, sum / count);\n    return 0;\n}\n```\n\n先读第一个并特判「仅 0」；循环内累加 sum 和 count，更新 max；每次末尾再读下一个。",
    tags: ["哨兵值", "综合实现", "最大值", "平均值"],
  },
  {
    id: "ccl-17",
    chapter: "cpr-control-loops",
    level: 4,
    question:
      "找出下面程序的全部问题（至少 3 处）并写出修正版。\n```c\nint i, j;\nfor (i = 1; i <= 3; i++);\n    for (j = 1; j <= 3; j++)\n        printf(\"%d-%d\\n\", i, j);\n```",
    answer:
      "问题：\n① 外层 for 后多了分号——空循环体，i 快速变成 4，只执行一次内层。\n② 内层 for 缺少花括号，只有 printf 属于内层——但外层分号导致结构错乱。\n③ 最终只打印 `4-1` `4-2` `4-3` 三行，而非期望的 9 行。\n\n修正：\n```c\nfor (i = 1; i <= 3; i++) {\n    for (j = 1; j <= 3; j++)\n        printf(\"%d-%d\\n\", i, j);\n}\n```\n\n嵌套循环外层永远写花括号，去掉多余分号。",
    tags: ["嵌套循环", "分号陷阱", "综合排错"],
  },
  {
    id: "ccl-18",
    chapter: "cpr-control-loops",
    level: 4,
    question:
      "比较两种输入校验写法，说明何时 do-while 更简洁：\n(A) `printf+scanf` 在 while 前，然后 `while (非法) { printf+scanf }`\n(B) `do { printf+scanf } while (非法);`",
    answer:
      "两者功能等价——都「至少提示并读入一次，非法则重复」。但 (B) 把提示和读入收进一个循环体，结构更紧凑，不会重复写两遍 printf/scanf。(A) 需要在循环外写一次、循环内再写一次，维护时容易改了一处忘了另一处。菜单、年龄校验、密码确认等「必须先展示再问」的场景，优先 do-while。",
    tags: ["do-while", "输入校验", "对比"],
  },
];

export default cprControlLoopsQuestions;
