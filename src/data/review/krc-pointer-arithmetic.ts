/** 复习题库 · 指针运算与字符串（krc-pointer-arithmetic）。K&R 第 5 章后半改编。 */

import type { ReviewQuestion } from "./types";

export const krcPointerArithmeticQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "krc-par-1",
    chapter: "krc-pointer-arithmetic",
    level: 1,
    question: "`char *s = \"hello\";` 和 `char s[] = \"hello\";` 有什么本质区别？",
    answer:
      "`char *s = \"hello\";`：s 是指针，指向字符串常量（通常在只读内存段）。不能通过 s 修改字符（`s[0] = 'H'` 行为未定义，可能段错误）。可以重新指向其他地址。\n`char s[] = \"hello\";`：s 是字符数组，在栈上分配 6 字节，把 \"hello\" 复制进去。可以修改元素（`s[0] = 'H'` 合法）。s 是数组名，不能重新赋值指向别处。\n本质区别：一个是指向只读常量的指针，一个是数组副本。",
    tags: ["字符指针", "字符数组", "字符串常量", "只读"],
  },
  // ── L2 理解 ──
  {
    id: "krc-par-2",
    chapter: "krc-pointer-arithmetic",
    level: 2,
    question: "指针算术中 `p + n` 的实际偏移字节数是多少？为什么不是简单的 `p + n` 个字节？",
    answer:
      "`p + n` 的实际偏移 = `n * sizeof(*p)` 字节。因为 C 指针携带类型信息：`int *p` 加 1 跳过 1 个 int（4 字节），`char *p` 加 1 跳过 1 个 char（1 字节），`double *p` 加 1 跳过 8 字节。\n这样设计是为了让 `p[i]` 等价于 `*(p+i)`：加 i 就是跳过 i 个元素，直接指向第 i 个元素。如果按字节算，访问数组元素就要手动乘以 sizeof，既繁琐又容易出错。这是 C 指针的核心抽象：指针算术以元素为单位，不是以字节为单位。",
    tags: ["指针算术", "类型大小", "步长", "sizeof"],
  },
  // ── L3 应用 ──
  {
    id: "krc-par-3",
    chapter: "krc-pointer-arithmetic",
    level: 3,
    question: "C 程序的 `main(int argc, char *argv[])` 中，`argv` 是什么类型？`argv[0]` 通常是什么？写出遍历并打印所有命令行参数的代码。",
    answer:
      "`argv` 是 `char **` 类型（或等价的 `char *[]`），是一个指向字符串的指针数组。`argv[0]` 通常是程序名本身。`argv[argc]` 是 NULL（哨兵）。\n```c\nint main(int argc, char *argv[]) {\n    for (int i = 0; i < argc; i++)\n        printf(\"argv[%d] = %s\\n\", i, argv[i]);\n    return 0;\n}\n```\n也可用指针遍历（利用 argv[argc]==NULL）：\n```c\nfor (char **p = argv; *p != NULL; p++)\n    printf(\"%s\\n\", *p);\n```",
    tags: ["命令行参数", "argv", "指针数组", "main函数"],
  },
  // ── L4 综合 ──
  {
    id: "krc-par-4",
    chapter: "krc-pointer-arithmetic",
    level: 4,
    question: "K&R 用指针数组实现了一个高效排序器（读取若干文本行并排序）。分析「用指针数组排序」相比「直接交换字符串内容」的优势，并说明 `qsort` 的比较函数如何配合指针数组工作。",
    answer:
      "优势：① 字符串长度不一，直接交换内容需要 memcpy 整串、可能涉及大量内存搬移；而指针数组只需交换一个指针（8 字节），O(1) 操作 ② 字符串可以存在只读区，不能修改内容但可以交换指针指向 ③ 排序后原始存储顺序不变，只是指针数组中的顺序变了。\n比较函数配合：指针数组 `char *lines[n]` 中每个元素是 `char *`。传给 `qsort` 的比较函数收到的是「指向数组元素的指针」，即 `const void *` 实际指向 `char *`，所以比较函数内要先解引用取出 `char *`：\n```c\nint cmp(const void *a, const void *b) {\n    return strcmp(*(char *const *)a, *(char *const *)b);\n}\n```\n这个双重指针是初学者最容易卡住的地方：qsort 交换的是数组元素（指针），比较的是指针指向的字符串内容。",
    tags: ["指针数组", "qsort", "字符串排序", "K&R经典", "综合"],
  },
];

export default krcPointerArithmeticQuestions;
