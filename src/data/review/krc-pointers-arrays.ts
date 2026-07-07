/** 复习题库 · 指针与数组（krc-pointers-arrays）。K&R 第 5 章改编。 */

import type { ReviewQuestion } from "./types";

export const krcPointersArraysQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "krc-pa-1",
    chapter: "krc-pointers-arrays",
    level: 1,
    question: "`int a[10]; int *p = a;` 中，`a`、`&a[0]`、`p` 三者的关系是什么？`a` 本身的类型是什么？",
    answer:
      "三者都指向数组第一个元素的地址，值相同。`a` 是数组名，在表达式中会「退化」为指向首元素的指针（类型为 `int *`），所以 `p = a` 合法。`&a[0]` 显式取首元素地址，类型也是 `int *`。`p` 是一个指针变量，存储的就是这个地址。\n严格来说 `a` 的类型是 `int[10]`（数组类型），但在大多数表达式中退化为 `int *`。例外：`sizeof(a)` 得到整个数组大小（40 字节），`&a` 的类型是 `int (*)[10]`（指向数组的指针）。",
    tags: ["数组名退化", "指针", "首元素地址"],
  },
  // ── L2 理解 ──
  {
    id: "krc-pa-2",
    chapter: "krc-pointers-arrays",
    level: 2,
    question: "为什么说「数组作为函数参数时，传的不是整个数组而是指针」？这对 `sizeof` 有什么影响？",
    answer:
      "函数形参写成 `int arr[]` 或 `int *arr` 完全等价——编译器都把它当 `int *` 处理。调用 `func(a)` 时只传了首元素地址的副本，整个数组不会被复制。\n对 sizeof 的影响：在函数内部 `sizeof(arr)` 得到的是指针大小（8 字节 on 64 位），不是数组大小。所以无法在函数内用 sizeof 计算数组长度，必须额外传一个长度参数。这是 C 数组最常见的陷阱：`sizeof` 只在定义数组的作用域内才能反映真实大小，传进函数后就只剩指针了。",
    tags: ["数组参数", "sizeof", "指针退化", "函数参数"],
  },
  // ── L3 应用 ──
  {
    id: "krc-pa-3",
    chapter: "krc-pointers-arrays",
    level: 3,
    question: "`int a[3][4];` 中，`a`、`a[0]`、`a[0][0]` 的类型分别是什么？`a+1` 跳过多少字节？",
    answer:
      "`a` 类型是 `int[3][4]`，退化为 `int (*)[4]`（指向含 4 个 int 的数组的指针）。`a+1` 跳过一整行 = 4 × sizeof(int) = 16 字节。\n`a[0]` 类型是 `int[4]`，退化为 `int *`（指向第一个 int）。`a[0]+1` 跳过 1 个 int = 4 字节。\n`a[0][0]` 类型是 `int`。\n关键：`a[i][j]` 等价于 `*(*(a+i)+j)`。`a+i` 跳 i 行，`*(a+i)` 得到第 i 行的首元素指针，再 `+j` 跳 j 列，最后解引用得到元素值。二维数组的指针算术是按行跳转的。",
    tags: ["二维数组", "指针类型", "指针算术", "行主序"],
  },
  // ── L4 综合 ──
  {
    id: "krc-pa-4",
    chapter: "krc-pointers-arrays",
    level: 4,
    question: "K&R 第 5 章实现了一个简化的 `strlen`：`int strlen(char *s) { char *p = s; while (*p) p++; return p - s; }`。分析这个实现用到了哪些指针特性，以及为什么 `p - s` 能正确返回字符串长度。",
    answer:
      "用到的指针特性：① 指针可以作为函数参数（`char *s` 接收数组名或字符串常量）② 指针可以做比较和自增（`while (*p) p++` 逐字符前进直到 `\\0`）③ 同一数组内两个指针可以相减（`p - s`）。\n`p - s` 返回长度而非字节数，因为 C 标准规定：指向同一数组内两个元素的指针相减，结果是它们之间的元素个数（ptrdiff_t），自动除以 sizeof(元素类型)。这里元素是 char（1 字节），所以元素个数 = 字节数。\n这个实现完美体现了 C 指针的设计哲学：指针不仅存地址，还携带了类型信息，使得指针算术自动按类型大小缩放。",
    tags: ["strlen", "指针相减", "指针算术", "K&R经典", "综合"],
  },
];

export default krcPointersArraysQuestions;
