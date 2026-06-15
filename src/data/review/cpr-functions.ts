/** 复习题库 · C 函数（cpr-functions）。C Primer Plus §9 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprFunctionsQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "cfn-1",
    chapter: "cpr-functions",
    level: 1,
    question: "C 函数定义由哪四部分组成？",
    answer:
      "**返回类型**、**函数名**、**形参列表**、**函数体**（花括号内语句）。例如 `int sum(int a, int b) { return a + b; }`。",
    tags: ["函数定义", "结构"],
  },
  {
    id: "cfn-2",
    chapter: "cpr-functions",
    level: 1,
    question: "函数原型（声明）与函数定义有什么区别？",
    answer:
      "**原型**只有函数头加分号，无函数体，告诉编译器接口信息。**定义**包含函数体，提供实际实现。原型用于调用出现在定义之前的场景；链接器需要定义才能生成可执行文件。",
    tags: ["原型", "定义"],
  },
  {
    id: "cfn-3",
    chapter: "cpr-functions",
    level: 1,
    question: "形参和实参分别是什么？",
    answer:
      "**形参**是定义/原型括号里的参数（如 `int a`）。**实参**是调用时传入的值或表达式（如 `sum(3, 5)` 里的 3 和 5）。调用时实参的值按传递规则赋给形参。",
    tags: ["形参", "实参"],
  },
  {
    id: "cfn-4",
    chapter: "cpr-functions",
    level: 1,
    question: "C 对 int、double 等基本类型默认采用哪种参数传递方式？",
    answer:
      "**值传递（pass by value）**：把实参的值**拷贝**一份给形参。形参与实参是两块独立内存，函数内修改形参**不会**改变调用方的原变量。",
    tags: ["值传递"],
  },
  {
    id: "cfn-5",
    chapter: "cpr-functions",
    level: 1,
    question: "函数返回类型为 void 表示什么？",
    answer:
      "函数**不产生有用返回值**。函数体可用 `return;` 提前结束，或不写 return 执行到末尾。调用方不能把 void 函数放在需要值的表达式里。",
    tags: ["void", "返回值"],
  },

  // ── L2 理解 ──
  {
    id: "cfn-6",
    chapter: "cpr-functions",
    level: 2,
    question: "为什么 main 在前、函数定义在后时必须先写函数原型？",
    answer:
      "编译器**从上到下**编译。遇到 `foo()` 调用时若尚未看到 `foo` 的原型或定义，无法检查类型，旧编译器可能假定返回 int。原型提前告知名字、返回类型、形参类型，使调用点编译合法。",
    tags: ["原型", "编译"],
  },
  {
    id: "cfn-7",
    chapter: "cpr-functions",
    level: 2,
    question: "一次函数调用在栈上会发生什么？栈帧里通常有什么？",
    answer:
      "为本次调用分配**栈帧**：压入实参、保存**返回地址**（返回后跳回调用方）、存放形参与**局部变量**。被调函数 return 后该帧**销毁**，局部变量随之失效。",
    tags: ["栈帧", "调用栈"],
  },
  {
    id: "cfn-8",
    chapter: "cpr-functions",
    level: 2,
    question: "void try_change(int n) { n = 99; } 调用后实参为何不变？",
    answer:
      "值传递：`n` 是实参值的**副本**。`n = 99` 只改副本所在内存，调用方变量从未被写入。要让调用方改变，需传**指针**或 **return** 新值由调用方接收。",
    tags: ["值传递", "形参"],
  },
  {
    id: "cfn-9",
    chapter: "cpr-functions",
    level: 2,
    question: "局部变量的作用域和生命周期是什么？",
    answer:
      "**作用域**：限于声明所在的函数（或块）。**生命周期**：从进入函数到 return/结束，存储在栈帧，函数返回后销毁。不同函数的同名局部变量互不影响。",
    tags: ["局部变量", "作用域"],
  },
  {
    id: "cfn-10",
    chapter: "cpr-functions",
    level: 2,
    question: "递归函数为什么必须包含基准情形（base case）？",
    answer:
      "每次递归调用都压入新栈帧。无基准终止会无限调用自身，栈空间耗尽导致**栈溢出**崩溃。基准情形直接 return，不再递归，然后逐层返回把结果传回。",
    tags: ["递归", "基准情形"],
  },

  // ── L3 应用 ──
  {
    id: "cfn-11",
    chapter: "cpr-functions",
    level: 3,
    question:
      "读代码，写出输出。\n```c\nint f(int x) { return x + 1; }\nint main(void) {\n    int a = 10;\n    printf(\"%d\\n\", f(a));\n    printf(\"%d\\n\", a);\n    return 0;\n}\n```",
    answer:
      "输出两行：`11` 然后 `10`。`f(a)` 值传递副本，return 11；`a` 未被修改仍为 10。",
    tags: ["读代码", "值传递"],
  },
  {
    id: "cfn-12",
    chapter: "cpr-functions",
    level: 3,
    question:
      "fact(4) 调用链中，栈上最多同时存在几层未完成的 fact 栈帧？",
    answer:
      "**4 层**：fact(4)、fact(3)、fact(2)、fact(1) 依次压栈。fact(1) 命中基准 return 1 后开始逐层弹出。若算 fact(1) 本身只有 1 层。",
    tags: ["递归", "栈"],
  },
  {
    id: "cfn-13",
    chapter: "cpr-functions",
    level: 3,
    question:
      "下面缺什么导致链接错误？如何补？\n```c\nint main(void) {\n    printf(\"%d\\n\", twice(5));\n    return 0;\n}\n```",
    answer:
      "缺少 `twice` 的**原型**（若定义在后）和**定义**。补：\n```c\nint twice(int n);\nint twice(int n) { return n * 2; }\n```\n并 `#include <stdio.h>`。",
    tags: ["链接", "原型"],
  },
  {
    id: "cfn-14",
    chapter: "cpr-functions",
    level: 3,
    question: "`void foo()` 与 `void foo(void)` 在 C 里有何区别？",
    answer:
      "`void foo(void)` 明确表示**无参数**，调用 `foo(42)` 应报错。`void foo()` 在旧语义下表示参数未指定，与严格无参不同。现代 C 编程应使用 **`void foo(void)`**。",
    tags: ["void", "空参"],
  },
  {
    id: "cfn-15",
    chapter: "cpr-functions",
    level: 3,
    question:
      "读程序，写出 `m` 的值。\n```c\nint max2(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\nint main(void) {\n    int m = max2(7, 7);\n    return 0;\n}\n```",
    answer:
      "`m = 7`。`a > b` 为假，执行第二个 return b，返回 7。",
    tags: ["读代码", "return"],
  },

  // ── L4 综合 ──
  {
    id: "cfn-16",
    chapter: "cpr-functions",
    level: 4,
    question:
      "写完整程序：函数 `int gcd(int a, int b)` 用欧几里得算法求最大公约数，main 读入两个正整数并打印 gcd。",
    answer:
      "```c\n#include <stdio.h>\nint gcd(int a, int b);\nint main(void) {\n    int a, b;\n    scanf(\"%d %d\", &a, &b);\n    printf(\"%d\\n\", gcd(a, b));\n    return 0;\n}\nint gcd(int a, int b) {\n    while (b != 0) {\n        int t = a % b;\n        a = b;\n        b = t;\n    }\n    return a;\n}\n```",
    tags: ["综合实现", "gcd"],
  },
  {
    id: "cfn-17",
    chapter: "cpr-functions",
    level: 4,
    question:
      "找出下面程序的问题（至少 2 处）并修正。\n```c\nint bump(int n) { n++; return n; }\nint main(void) {\n    int x = 5;\n    bump(x);\n    printf(\"%d\\n\", x);\n    return 0;\n}\n```",
    answer:
      "问题：① 值传递下 `bump` 改的是副本，**x 仍是 5**——若期望 x 变 6，设计错误。② 无 `#include <stdio.h>`。\n\n若目标让 x 变 6：\n```c\nint bump(int n) { return n + 1; }\n/* main: x = bump(x); */\n```\n或下章用指针。若仅演示值传递，程序「正确」输出 5，但注释应说明意图。",
    tags: ["综合排错", "值传递"],
  },
  {
    id: "cfn-18",
    chapter: "cpr-functions",
    level: 4,
    question:
      "用递归写 `int fib(int n)` 返回第 n 个斐波那契数（f(0)=0, f(1)=1）。说明 fact(5) 递归时栈深度。",
    answer:
      "```c\nint fib(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fib(n - 1) + fib(n - 2);\n}\n```\n`fib(5)` 递归树最深约 **5 层**（沿 fib(5)→fib(4)→…→fib(0) 路径），但同一时刻栈上帧数取决于调用顺序，可能少于递归调用总次数。",
    tags: ["递归", "fib", "综合"],
  },
];

export default cprFunctionsQuestions;
