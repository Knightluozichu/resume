/** 复习题库 · 结构体与联合（krc-structures）。K&R 第 6 章改编。 */

import type { ReviewQuestion } from "./types";

export const krcStructuresQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "krc-st-1",
    chapter: "krc-structures",
    level: 1,
    question: "`struct`、`union`、`typedef` 三者分别是什么？各举一个简短例子。",
    answer:
      "`struct`：把多个不同类型的变量打包在一起，各自独立存储。如 `struct Point { int x; int y; };`。\n`union`：多个成员共享同一块内存，同一时刻只能存一个成员的值。如 `union Value { int i; float f; };`（i 和 f 共用 4 字节）。\n`typedef`：给类型起别名，简化书写。如 `typedef struct Point Point;` 之后可直接写 `Point p;` 而不用写 `struct Point p;`。",
    tags: ["struct", "union", "typedef", "基本概念"],
  },
  // ── L2 理解 ──
  {
    id: "krc-st-2",
    chapter: "krc-structures",
    level: 2,
    question: "`struct { char c; int i; }` 在 64 位平台上 sizeof 通常是多少？为什么不是 5（1+4）？",
    answer:
      "通常是 8 字节，不是 5。因为内存对齐：`int i` 必须放在 4 字节对齐的地址上，`char c` 占 1 字节后，编译器在 c 和 i 之间插入 3 字节 padding，使 i 的偏移量为 4。整个结构体大小也要是最大成员对齐值（4）的整数倍，所以 8 而非 5。\npadding 是编译器自动插入的「废字节」，不存有效数据，只为了让 CPU 高效访问（未对齐访问在某些架构上会崩溃或变慢）。调整成员顺序（大类型在前）可以减少 padding。",
    tags: ["内存对齐", "padding", "sizeof", "结构体布局"],
  },
  // ── L3 应用 ──
  {
    id: "krc-st-3",
    chapter: "krc-structures",
    level: 3,
    question: "定义一个位域 `struct Flags { unsigned int a : 1; unsigned int b : 3; unsigned int c : 4; };`，解释每个成员的含义，这个结构体占多少字节？",
    answer:
      "`: 1` 表示 a 占 1 个 bit（可存 0 或 1）；`: 3` 表示 b 占 3 个 bit（可存 0~7）；`: 4` 表示 c 占 4 个 bit（可存 0~15）。三个成员共 1+3+4=8 bit，放在同一个 unsigned int（4 字节 = 32 bit）中。\nsizeof 通常是 4 字节（一个 unsigned int）。位域让多个小范围变量紧凑存放在一个存储单元中，节省空间，常用于硬件寄存器映射、协议头解析等场景。但位域的内存排列顺序（从高位还是低位开始）是实现定义的，跨平台不可移植。",
    tags: ["位域", "bit field", "sizeof", "紧凑存储"],
  },
  // ── L4 综合 ──
  {
    id: "krc-st-4",
    chapter: "krc-structures",
    level: 4,
    question: "K&R 第 6 章用一个结构体数组实现了一个「统计关键字出现次数」的程序。如果要统计一个文件中每个 C 关键字出现的次数，你会如何设计数据结构和算法？涉及哪些 C 特性？",
    answer:
      "数据结构：`struct Key { char *word; int count; }` 数组，预填所有 C 关键字（如 \"int\"、\"while\" 等），count 初始为 0。\n算法：① 逐词读取文件（用 getc 或 fscanf）② 对每个词，在关键字数组中二分查找（`strcmp` 比较，数组按字母序排好）③ 找到则 count++ ④ 最后遍历数组打印 count>0 的项。\n涉及的 C 特性：结构体数组初始化、指针（char* word）、二分查找函数、字符串比较 strcmp、文件 I/O（fopen/fgetc/fclose）、typedef 简化结构体名。\nK&R 原版的精妙之处：用 30 行代码把结构体、指针、二分查找、文件 I/O 串在一起，每个特性都服务于真实需求，没有一行废话。",
    tags: ["结构体数组", "二分查找", "K&R经典", "文件处理", "综合"],
  },
];

export default krcStructuresQuestions;
