/** 复习题库 · 字符I/O与输入验证（cpr-char-io-validation）。C Primer Plus §8 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprCharIoValidationQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "cciv-1",
    chapter: "cpr-char-io-validation",
    level: 1,
    question: "getchar() 和 putchar() 各做什么？返回值类型是什么？",
    answer:
      "**getchar()** 从 stdin 读入一个字符，返回该字符的 int 值（可存 EOF）；**putchar(ch)** 向 stdout 输出一个字符，成功返回 ch，失败返回 EOF。两者都在 `<stdio.h>` 中声明，工作在**字符层**而非格式化层。",
    tags: ["getchar", "putchar", "字符I/O"],
  },
  {
    id: "cciv-2",
    chapter: "cpr-char-io-validation",
    level: 1,
    question: "标准 I/O 的三种缓冲模式分别是什么？stdout 连终端时通常属于哪种？",
    answer:
      "**行缓冲**（遇 \\n 或满时刷新）、**全缓冲**（缓冲区满或 fflush/fclose 时刷新）、**无缓冲**（立即写出）。stdout 连到**终端**时通常是**行缓冲**；重定向到文件时变为全缓冲。stderr 通常无缓冲。",
    tags: ["缓冲", "stdout", "行缓冲"],
  },
  {
    id: "cciv-3",
    chapter: "cpr-char-io-validation",
    level: 1,
    question: "EOF 是什么？getchar() 读到文件结束或 Ctrl+D（Unix）时返回什么？",
    answer:
      "EOF（End Of File）是 `<stdio.h>` 定义的**宏**，通常值为 -1，表示输入结束或错误，**不是**字符本身。getchar() 读到 EOF 时返回 int 类型的 EOF（即 -1），应存到 int 变量而非 char，否则 0xFF 等值可能与 EOF 混淆。",
    tags: ["EOF", "getchar"],
  },
  {
    id: "cciv-4",
    chapter: "cpr-char-io-validation",
    level: 1,
    question: "fflush(stdout) 的作用是什么？什么时候需要调用？",
    answer:
      "强制把 **stdout 输出缓冲区**中尚未刷到设备的内容立刻写出。需要时：① printf 提示后马上 scanf，希望提示先显示；② 调试时想立刻看到输出；③ 行缓冲下没写 \\n 就想让用户看到文字。",
    tags: ["fflush", "stdout", "缓冲"],
  },
  {
    id: "cciv-5",
    chapter: "cpr-char-io-validation",
    level: 1,
    question: "清理 stdin 残留字符的常用写法是什么？",
    answer:
      "```c\nint ch;\nwhile ((ch = getchar()) != '\\n' && ch != EOF)\n    ;\n```\n\n循环吃掉缓冲区中直到换行符（含换行）或 EOF 为止的所有字符。输入验证失败、scanf 与 getchar 混用时都需要。",
    tags: ["stdin", "缓冲区清理", "getchar"],
  },

  // ── L2 理解 ──
  {
    id: "cciv-6",
    chapter: "cpr-char-io-validation",
    level: 2,
    question: "为什么 scanf(\"%d\", &n) 之后立刻 getchar() 常读到换行符而不是用户新输入的字符？",
    answer:
      "用户输入 `42↵` 时整行进 stdin 缓冲区。scanf 只消费匹配的 `42`，**换行符 \\n 留在缓冲区**。下一次 getchar() 优先读缓冲区残留，所以得到 `\\n`。修法：scanf 后清缓冲区，或 scanf 格式串加空格/`%*c` 吃掉换行。",
    tags: ["scanf", "getchar", "残留"],
  },
  {
    id: "cciv-7",
    chapter: "cpr-char-io-validation",
    level: 2,
    question: "输入验证循环的基本结构是什么？为什么「验证失败」分支不能只 printf 错误就重试？",
    answer:
      "结构：**提示 → 读入 → 验证 → 合法则使用 / 非法则清缓冲区 + 回到提示**。只打印错误不重读时，非法数据仍留在 stdin，下一次 scanf/getchar 继续读到垃圾，可能死循环或静默失败。必须**吃掉残留**再重新提示。",
    tags: ["输入验证", "重试", "缓冲区"],
  },
  {
    id: "cciv-8",
    chapter: "cpr-char-io-validation",
    level: 2,
    question: "getchar() 返回值为什么要存到 int 而不是 char？",
    answer:
      "getchar 返回 **int** 是为容纳 **EOF（-1）** 和所有 0~255 的字节值。若存到 unsigned char 或 char，EOF 可能被截断或与有效字符 0xFF 混淆。标准写法：`int ch; while ((ch = getchar()) != EOF)`。",
    tags: ["getchar", "int", "EOF"],
  },
  {
    id: "cciv-9",
    chapter: "cpr-char-io-validation",
    level: 2,
    question: "菜单驱动程序的典型骨架由哪几部分组成？",
    answer:
      "① **do-while** 循环保证至少显示一次菜单；② **printf** 列出选项；③ **读入并验证** choice（整数或字符）；④ **switch** 分发各选项，每 case 带 break；⑤ **default** 处理非法输入；⑥ choice==0 时退出循环。字符层可用 getchar 读单字符菜单。",
    tags: ["菜单", "switch", "do-while"],
  },
  {
    id: "cciv-10",
    chapter: "cpr-char-io-validation",
    level: 2,
    question: "scanf 返回值为 1 表示什么？返回 0 或 EOF 时通常说明什么？",
    answer:
      "返回值 = **成功匹配并赋值的输入项个数**。`scanf(\"%d\", &n)` 返回 1 表示读到一个整数；返回 **0** 表示格式不匹配（如期望数字却读到字母），输入留在缓冲区；返回 **EOF** 表示输入结束。应用返回值做验证比假设读成功更健壮。",
    tags: ["scanf", "返回值", "验证"],
  },

  // ── L3 应用 ──
  {
    id: "cciv-11",
    chapter: "cpr-char-io-validation",
    level: 3,
    question:
      "读程序：用户输入 `5↵` 后输出什么？\n```c\nint n;\nscanf(\"%d\", &n);\nprintf(\"n=%d, next=%d\\n\", n, getchar());\n```",
    answer:
      "输出 `n=5, next=10`（10 是换行符 `\\n` 的 ASCII）。scanf 吃掉 5，换行留在缓冲区，getchar 读到 `\\n`。",
    tags: ["scanf", "getchar", "读代码"],
  },
  {
    id: "cciv-12",
    chapter: "cpr-char-io-validation",
    level: 3,
    question:
      "下面循环何时结束？\n```c\nint ch;\nwhile ((ch = getchar()) != EOF)\n    putchar(ch);\n```",
    answer:
      "从 stdin 逐个读字符并原样输出，直到读到 **EOF**（文件结束或 Ctrl+D/Ctrl+Z）为止。相当于简易 `cat`：把输入流复制到输出流。",
    tags: ["getchar", "putchar", "EOF"],
  },
  {
    id: "cciv-13",
    chapter: "cpr-char-io-validation",
    level: 3,
    question:
      "用户输入 `abc↵` 时期望读整数，下面代码打印几次「无效」？\n```c\nint n;\nwhile (scanf(\"%d\", &n) != 1) {\n    printf(\"无效\\n\");\n    while (getchar() != '\\n');\n}\n```",
    answer:
      "打印 **1 次**「无效」。第一次 scanf 失败（读到 a），进入循环体打印并清缓冲区到换行；第二次 scanf 等待用户重新输入。若**不**清缓冲区，会连续读到 a、b、c 多次失败。",
    tags: ["输入验证", "scanf", "清缓冲区"],
  },
  {
    id: "cciv-14",
    chapter: "cpr-char-io-validation",
    level: 3,
    question:
      "写出用 getchar 读取一行文字（遇 \\n 停止，不含换行）存入字符数组 line[] 的循环框架（假设 line 足够大）。",
    answer:
      "```c\nint i = 0, ch;\nwhile ((ch = getchar()) != '\\n' && ch != EOF && i < SIZE - 1)\n    line[i++] = (char)ch;\nline[i] = '\\0';\n```\n\n注意留一位给 `\\0`；ch 用 int 接收；遇换行或 EOF 结束。",
    tags: ["getchar", "读一行", "实现"],
  },
  {
    id: "cciv-15",
    chapter: "cpr-char-io-validation",
    level: 3,
    question:
      "printf(\"请输入 1-5: \"); scanf(\"%d\", &x); 用户看不到提示就要求输入，可能原因和修法？",
    answer:
      "原因：stdout **行缓冲**，提示串没有 `\\n` 时尚未刷新到屏幕。修法：① 提示末尾加 `\\n`；② `fflush(stdout);` 在 scanf 前强制刷新；③ `fprintf(stderr, ...)` 写提示（stderr 无缓冲）。",
    tags: ["fflush", "行缓冲", "排错"],
  },

  // ── L4 综合 ──
  {
    id: "cciv-16",
    chapter: "cpr-char-io-validation",
    level: 4,
    question:
      "写完整菜单程序：循环显示 1=加 2=减 0=退出；用 scanf 读 choice 并验证为整数；非法输入提示并清缓冲区；合法时用 switch 处理，0 退出。",
    answer:
      "```c\n#include <stdio.h>\nint main(void) {\n    int choice, ok;\n    do {\n        printf(\"1.加 2.减 0.退出\\n选择: \");\n        fflush(stdout);\n        ok = scanf(\"%d\", &choice);\n        if (ok != 1) {\n            printf(\"请输入整数\\n\");\n            while (getchar() != '\\n')\n                ;\n            continue;\n        }\n        switch (choice) {\n            case 1: printf(\"加法\\n\"); break;\n            case 2: printf(\"减法\\n\"); break;\n            case 0: printf(\"再见\\n\"); break;\n            default: printf(\"无效选项\\n\");\n        }\n    } while (choice != 0);\n    return 0;\n}\n```",
    tags: ["菜单", "验证", "综合实现"],
  },
  {
    id: "cciv-17",
    chapter: "cpr-char-io-validation",
    level: 4,
    question:
      "比较「全用 scanf」与「getchar 逐字符读菜单」的取舍：各举一个适合场景。",
    answer:
      "**scanf**：读整数、浮点、字符串等格式化数据，配合返回值验证和清缓冲区。适合数值输入、多字段表单。**getchar**：逐字符处理、读单字母菜单（y/n）、实现自己的行编辑器、过滤空白。适合字符级控制和简易文本过滤。混合使用时必须处理缓冲区残留。",
    tags: ["scanf", "getchar", "选型"],
  },
  {
    id: "cciv-18",
    chapter: "cpr-char-io-validation",
    level: 4,
    question:
      "找出下面程序的问题并修正（至少 2 处）。\n```c\nchar ch;\nscanf(\"%d\", &n);\nch = getchar();\nif (ch == 'y')\n    printf(\"yes\\n\");\nprintf(\"Enter age: \");\nscanf(\"%d\", &age);\n```",
    answer:
      "问题：\n① ch 用 char 接 getchar，应改 **int ch** 以正确处理 EOF。\n② scanf(\"%d\") 后 getchar 读到残留 **\\n**，不是用户确认的 y。\n③ 第二个 scanf 前提示可能因行缓冲未显示，应 **fflush(stdout)** 或加 \\n。\n\n修正：scanf 后 `while (getchar() != '\\n');` 清残留；`int ch`；`fflush(stdout);` 再读 age。",
    tags: ["综合排错", "缓冲区", "getchar"],
  },
];

export default cprCharIoValidationQuestions;
