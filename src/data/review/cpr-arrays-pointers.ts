/** 复习题库 · C 数组和指针（cpr-arrays-pointers）。C Primer Plus §10 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprArraysPointersQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "cap-1",
    chapter: "cpr-arrays-pointers",
    level: 1,
    question: "C 语言一维数组的下标从几开始？",
    answer: "从 **0** 开始。长度为 n 的数组合法下标是 `0` 到 `n-1`。访问 `ar[n]` 越界，行为未定义。",
    tags: ["数组", "下标"],
  },
  {
    id: "cap-2",
    chapter: "cpr-arrays-pointers",
    level: 1,
    question: "指针变量里存的是什么？`*p` 和 `&x` 分别做什么？",
    answer:
      "指针存**地址**（某对象在内存中的位置）。`*p` **解引用**，取该地址上的值；`&x` **取地址**，得到变量 x 的地址。",
    tags: ["指针", "解引用", "取地址"],
  },
  {
    id: "cap-3",
    chapter: "cpr-arrays-pointers",
    level: 1,
    question: "`arr[i]` 与 `*(arr + i)` 是什么关系？",
    answer:
      "在 C 里二者**等价**（同一元素）。下标写法是编译器把 `arr+i` 再解引用的语法糖。",
    tags: ["数组", "指针", "等价"],
  },
  {
    id: "cap-4",
    chapter: "cpr-arrays-pointers",
    level: 1,
    question: "二维数组在内存中按什么顺序存储？",
    answer:
      "**行优先（row-major）**：先存第 0 行所有列，再存第 1 行……逻辑上的 `m[r][c]` 在物理上是一条连续一维带上的某个 int。",
    tags: ["二维数组", "行优先"],
  },
  {
    id: "cap-5",
    chapter: "cpr-arrays-pointers",
    level: 1,
    question: "声明 `int ar[5];` 时，`sizeof ar` 通常等于多少（假设 int 4 字节）？",
    answer: "**20 字节** = 5 × sizeof(int)。`sizeof ar` 是整个数组的字节数，不是指针大小。",
    tags: ["sizeof", "数组"],
  },

  // ── L2 理解 ──
  {
    id: "cap-6",
    chapter: "cpr-arrays-pointers",
    level: 2,
    question: "为什么数组元素必须占用连续内存？",
    answer:
      "连续存储才能用 **起始地址 + 下标 × 元素大小**  O(1) 定位任意元素。若元素分散，就无法用 `arr[i]` 或 `*(arr+i)` 快速访问。",
    tags: ["内存布局", "连续"],
  },
  {
    id: "cap-7",
    chapter: "cpr-arrays-pointers",
    level: 2,
    question: "对 `int *p`，`p + 1` 地址增加多少？为什么不是 +1 字节？",
    answer:
      "增加 **sizeof(int)** 字节（通常 4）。指针算术以**指向的类型**为步长，使 `p+1` 指向「下一个 int」，而非下一个字节。",
    tags: ["指针算术"],
  },
  {
    id: "cap-8",
    chapter: "cpr-arrays-pointers",
    level: 2,
    question: "表达式里 `int ar[10];` 的 `ar` 代表什么？与 `&ar[0]` 有何关系？",
    answer:
      "在大多数表达式中，数组名 **退化为指向首元素的指针**，类型 `int *`，值等于 **&ar[0]**。例外：`sizeof ar`、`&ar` 等，数组名仍代表整个数组。",
    tags: ["数组名", "退化"],
  },
  {
    id: "cap-9",
    chapter: "cpr-arrays-pointers",
    level: 2,
    question: "`m[2][3]` 在 `int m[4][5]` 中的线性下标如何计算？",
    answer:
      "行优先：**线性下标 = 行号 × 列数 + 列号** = 2×5 + 3 = **13**。即第 14 个元素（从 0 计为第 13 个）。",
    tags: ["二维数组", "线性下标"],
  },
  {
    id: "cap-10",
    chapter: "cpr-arrays-pointers",
    level: 2,
    question: "用指针如何遍历 `int ar[n]` 并打印每个元素？",
    answer:
      "```c\nint *p;\nfor (p = ar; p < ar + n; p++)\n    printf(\"%d \", *p);\n```\n或 `for (int i = 0; i < n; i++) printf(\"%d \", ar[i]);`。二者等价。",
    tags: ["遍历", "指针"],
  },

  // ── L3 应用 ──
  {
    id: "cap-11",
    chapter: "cpr-arrays-pointers",
    level: 3,
    question:
      "读代码，写出输出。\n```c\nint ar[] = {10, 20, 30};\nint *p = ar + 1;\nprintf(\"%d %d\\n\", *p, *(p + 1));\n```",
    answer: "输出：`20 30`。`p` 指向 ar[1]；`*p` 为 20，`*(p+1)` 为 ar[2] 即 30。",
    tags: ["读代码", "指针"],
  },
  {
    id: "cap-12",
    chapter: "cpr-arrays-pointers",
    level: 3,
    question:
      "读代码，写出 `sum` 的值。\n```c\nint data[4] = {1, 2, 3, 4};\nint i, sum = 0;\nfor (i = 0; i < 4; i++)\n    sum += data[i];\n```",
    answer: "`sum = 10`（1+2+3+4）。",
    tags: ["读代码", "累加"],
  },
  {
    id: "cap-13",
    chapter: "cpr-arrays-pointers",
    level: 3,
    question:
      "下面初始化后，`grid[1][2]` 等于多少？\n```c\nint grid[2][3] = {{1,2,3}, {4,5,6}};\n```",
    answer: "**6**。第 1 行（下标 1）第 2 列（下标 2）的元素。",
    tags: ["二维数组", "初始化"],
  },
  {
    id: "cap-14",
    chapter: "cpr-arrays-pointers",
    level: 3,
    question: "`int *p; int ar[5]; p = ar;` 之后，`p[3]` 与 `*(ar + 3)` 是否相同？",
    answer:
      "**相同**。`p` 指向 ar 首元素时，对指针 `p` 也可下标：`p[i]` 等价于 `*(p+i)`，与 `ar[i]` 一致。",
    tags: ["指针", "下标"],
  },
  {
    id: "cap-15",
    chapter: "cpr-arrays-pointers",
    level: 3,
    question:
      "找出问题并说明后果。\n```c\nint ar[3] = {1, 2, 3};\nfor (int i = 0; i <= 3; i++)\n    printf(\"%d \", ar[i]);\n```",
    answer:
      "循环条件 **`i <= 3`** 错误，当 i=3 时访问 `ar[3]` **越界**（合法 0–2）。应改为 `i < 3`。越界读写未定义，可能崩溃或输出垃圾值。",
    tags: ["越界", "排错"],
  },

  // ── L4 综合 ──
  {
    id: "cap-16",
    chapter: "cpr-arrays-pointers",
    level: 4,
    question:
      "写程序：读入 10 个整数存入数组，用指针（不用下标）求平均值并打印（保留一位小数）。",
    answer:
      "```c\n#include <stdio.h>\n#define N 10\nint main(void) {\n    int ar[N], i;\n    double sum = 0;\n    int *p;\n    for (i = 0; i < N; i++)\n        scanf(\"%d\", ar + i);\n    for (p = ar; p < ar + N; p++)\n        sum += *p;\n    printf(\"%.1f\\n\", sum / N);\n    return 0;\n}\n```",
    tags: ["综合实现", "指针遍历"],
  },
  {
    id: "cap-17",
    chapter: "cpr-arrays-pointers",
    level: 4,
    question:
      "写函数 `void reverse(int *ar, int n)`：用两个指针从两端向中间交换，原地反转 n 个 int。并写 main 测试 `{1,2,3,4,5}`。",
    answer:
      "```c\nvoid reverse(int *ar, int n) {\n    int *left = ar, *right = ar + n - 1, tmp;\n    while (left < right) {\n        tmp = *left;\n        *left = *right;\n        *right = tmp;\n        left++;\n        right--;\n    }\n}\n```\n调用后数组变为 5 4 3 2 1。",
    tags: ["综合实现", "双指针"],
  },
  {
    id: "cap-18",
    chapter: "cpr-arrays-pointers",
    level: 4,
    question:
      "说明 `int m[3][4]` 中 `m[1]` 的类型是什么？`m[1] + 2` 指向什么？与 `&m[1][2]` 的关系？",
    answer:
      "`m[1]` 是 **4 个 int 组成的数组**（一行），在表达式中退化为指向该行首元素 `m[1][0]` 的指针。`m[1] + 2` 指向 **`m[1][2]`**，与 **`&m[1][2]`** 地址相同。理解行优先 + 指针算术是读二维数组的关键。",
    tags: ["二维数组", "综合理解"],
  },
];

export default cprArraysPointersQuestions;
