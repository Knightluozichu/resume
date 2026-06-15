/** 复习题库 · C 预处理器（cpr-preprocessor）。C Primer Plus §16 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprPreprocessorQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "prep-1",
    chapter: "cpr-preprocessor",
    level: 1,
    question: "预处理器在编译流水线的哪个阶段运行？",
    answer: "在**编译之前**的第一步（预处理）；处理完才交给编译器做语法分析。",
    tags: ["流水线"],
  },
  {
    id: "prep-2",
    chapter: "cpr-preprocessor",
    level: 1,
    question: "#define PI 3.14159 属于哪类宏？",
    answer: "**对象式宏**（无参数）；把源码中的 `PI` 替换成 `3.14159` 文本。",
    tags: ["#define"],
  },
  {
    id: "prep-3",
    chapter: "cpr-preprocessor",
    level: 1,
    question: "#include <stdio.h> 与 #include \"local.h\" 搜索路径有何区别？",
    answer: "**尖括号**按系统/标准目录；**双引号**先当前源文件目录，再系统路径。",
    tags: ["#include"],
  },
  {
    id: "prep-4",
    chapter: "cpr-preprocessor",
    level: 1,
    question: "#ifdef 与 #ifndef 分别何时保留代码？",
    answer: "**#ifdef**：宏**已定义**时保留；**#ifndef**：宏**未定义**时保留。",
    tags: ["条件编译"],
  },
  {
    id: "prep-5",
    chapter: "cpr-preprocessor",
    level: 1,
    question: "取消已定义宏用什么指令？",
    answer: "**#undef 宏名**；之后该名字视为未定义（直到再次 #define）。",
    tags: ["#undef"],
  },

  // ── L2 理解 ──
  {
    id: "prep-6",
    chapter: "cpr-preprocessor",
    level: 2,
    question: "宏展开与函数调用有何本质区别？",
    answer:
      "宏是**纯文本替换**，无类型检查、可能**多次求值**实参、不占栈帧；函数有原型检查与单次求参。",
    tags: ["宏展开"],
  },
  {
    id: "prep-7",
    chapter: "cpr-preprocessor",
    level: 2,
    question: "头文件包含守卫（include guard）解决什么问题？",
    answer:
      "防止同一 `.h` 被多次 `#include` 时**重复粘贴**声明/定义，导致重复定义或冲突。",
    tags: ["include guard"],
  },
  {
    id: "prep-8",
    chapter: "cpr-preprocessor",
    level: 2,
    question: "gcc -DDEBUG 的作用是什么？",
    answer: "在预处理前等价于添加 **`#define DEBUG`**，使 `#ifdef DEBUG` 分支被保留。",
    tags: ["条件编译"],
  },
  {
    id: "prep-9",
    chapter: "cpr-preprocessor",
    level: 2,
    question: "为什么带参宏 SQUARE(x) 要写成 ((x) * (x))？",
    answer:
      "形参与整体加**括号**，避免 `SQUARE(a+b)` 展开成 `a+b*a+b` 因**运算符优先级**算错。",
    tags: ["陷阱"],
  },
  {
    id: "prep-10",
    chapter: "cpr-preprocessor",
    level: 2,
    question: "__FILE__ 和 __LINE__ 何时展开？",
    answer: "在**预处理/编译**阶段展开为当前文件名与行号的**字面量**，常用于调试输出。",
    tags: ["预定义宏"],
  },

  // ── L3 应用 ──
  {
    id: "prep-11",
    chapter: "cpr-preprocessor",
    level: 3,
    question: "#define SQUARE(x) x*x 下 SQUARE(2+3) 展开结果与数值？",
    answer: "展开 **`2+3*2+3`** → 因 `*` 先于 `+` 得 **11**，不是 `(2+3)²=25`。",
    tags: ["排错"],
  },
  {
    id: "prep-12",
    chapter: "cpr-preprocessor",
    level: 3,
    question: "写安全的 MAX(a,b) 宏一行定义。",
    answer: "```c\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n```\n实参与整体都加括号。",
    tags: ["带参宏"],
  },
  {
    id: "prep-13",
    chapter: "cpr-preprocessor",
    level: 3,
    question: "如何用 #ifndef 写 MYHDR_H 包含守卫三行骨架？",
    answer:
      "```c\n#ifndef MYHDR_H\n#define MYHDR_H\n/* 内容 */\n#endif\n```",
    tags: ["include guard"],
  },
  {
    id: "prep-14",
    chapter: "cpr-preprocessor",
    level: 3,
    question: "发布版去掉 LOG 输出且不产生运行时开销的常见写法？",
    answer:
      "```c\n#ifdef DEBUG\n#define LOG(m) printf(\"%s\\n\", m)\n#else\n#define LOG(m) ((void)0)\n#endif\n```",
    tags: ["应用"],
  },
  {
    id: "prep-15",
    chapter: "cpr-preprocessor",
    level: 3,
    question: "带参宏名与左括号之间为何不能有空格？",
    answer:
      "`SQUARE (x)` 会被当作**对象宏** `SQUARE` 加 `(x)`，不会按函数式宏展开。",
    tags: ["语法"],
  },

  // ── L4 综合 ──
  {
    id: "prep-16",
    chapter: "cpr-preprocessor",
    level: 4,
    question: "对比 #define N 100 与 const int N=100 在 #if N>10 中的可用性。",
    answer:
      "**#define** 可用于 `#if`（预处理整数）；**const 变量**不能用于 `#if`，只能用于 C 表达式。",
    tags: ["综合理解"],
  },
  {
    id: "prep-17",
    chapter: "cpr-preprocessor",
    level: 4,
    question: "说明 MAX(a++, b++) 作为宏为何危险，应如何替代。",
    answer:
      "宏展开可能**两次求值** `a++`/`b++`，副作用翻倍。改用 **`static inline` 函数**或普通函数，实参只算一次。",
    tags: ["最佳实践"],
  },
  {
    id: "prep-18",
    chapter: "cpr-preprocessor",
    level: 4,
    question: "设计 config.h：DEBUG 时 TRACE 用 printf，否则为空操作，并防重复包含。",
    answer:
      "用 `#ifndef CONFIG_H` / `#define CONFIG_H` 守卫；`#ifdef DEBUG` 定义 `TRACE(fmt) printf(...)`，`#else` 定义 `((void)0)`；编译加 `-DDEBUG` 启用。",
    tags: ["综合实现"],
  },
];

export default cprPreprocessorQuestions;
