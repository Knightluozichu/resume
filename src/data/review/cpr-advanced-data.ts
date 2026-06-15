/** 复习题库 · 高级数据表示（cpr-advanced-data）。C Primer Plus §17 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprAdvancedDataQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "adv-1",
    chapter: "cpr-advanced-data",
    level: 1,
    question: "函数指针 `int (*pf)(double, double)` 中 pf 是什么？",
    answer: "**pf 是指针**，指向「返回 int、接受两个 double 的函数」；`*` 与括号不可省。",
    tags: ["函数指针"],
  },
  {
    id: "adv-2",
    chapter: "cpr-advanced-data",
    level: 1,
    question: "栈 Stack 的进出规则缩写 LIFO 表示什么？",
    answer: "**Last In, First Out** — 后进先出；push 与 pop 在同一端（栈顶）。",
    tags: ["栈", "LIFO"],
  },
  {
    id: "adv-3",
    chapter: "cpr-advanced-data",
    level: 1,
    question: "队列 Queue 的进出规则缩写 FIFO 表示什么？",
    answer: "**First In, First Out** — 先进先出；rear 入队、front 出队。",
    tags: ["队列", "FIFO"],
  },
  {
    id: "adv-4",
    chapter: "cpr-advanced-data",
    level: 1,
    question: "单向链表节点通常含哪两个核心部分？",
    answer: "**数据域（data）** 与 **指向下一个节点的指针 next**；末节点 next 为 **NULL**。",
    tags: ["链表"],
  },
  {
    id: "adv-5",
    chapter: "cpr-advanced-data",
    level: 1,
    question: "qsort 与 bsearch 在 stdlib.h 中各做什么？",
    answer: "**qsort** 对数组排序；**bsearch** 在**已排序**数组中二分查找 key。",
    tags: ["qsort", "bsearch"],
  },

  // ── L2 理解 ──
  {
    id: "adv-6",
    chapter: "cpr-advanced-data",
    level: 2,
    question: "ADT「接口与实现分离」在 C 项目中如何体现？",
    answer:
      "**.h 暴露操作原型**（push/pop 等），**.c 隐藏**用数组或链表实现的细节；换实现不改调用方。",
    tags: ["ADT"],
  },
  {
    id: "adv-7",
    chapter: "cpr-advanced-data",
    level: 2,
    question: "pf = sum 与 pf = &sum 有何关系？",
    answer: "函数名在赋给指针时 **decay 为地址**；二者通常等价，都令 pf 指向 sum 的入口。",
    tags: ["函数指针"],
  },
  {
    id: "adv-8",
    chapter: "cpr-advanced-data",
    level: 2,
    question: "链表相对数组的主要优缺点各是什么？",
    answer:
      "优点：已知位置时 **插入/删除 O(1)**、不需预先最大容量。缺点：**无 O(1) 下标**、额外 next 指针、缓存局部性较差。",
    tags: ["链表", "数组"],
  },
  {
    id: "adv-9",
    chapter: "cpr-advanced-data",
    level: 2,
    question: "qsort 的比较函数 compar 为何使用 const void *？",
    answer:
      "qsort 对**任意元素类型**排序，只传元素地址；compar 内须 **cast 成真实类型**再比较，返回负/零/正。",
    tags: ["qsort", "回调"],
  },
  {
    id: "adv-10",
    chapter: "cpr-advanced-data",
    level: 2,
    question: "bsearch 为什么必须先排序？",
    answer: "二分查找依赖 **有序性** 每次排除一半；未排序数组用 bsearch **结果不可靠**（未定义行为）。",
    tags: ["bsearch"],
  },

  // ── L3 应用 ──
  {
    id: "adv-11",
    chapter: "cpr-advanced-data",
    level: 3,
    question: "写出通过函数指针 pf 调用、等价于 sum(3.0, 4.0) 的一种写法。",
    answer: "**(*pf)(3.0, 4.0)** 或 **pf(3.0, 4.0)**（pf 已指向 sum）。",
    tags: ["函数指针"],
  },
  {
    id: "adv-12",
    chapter: "cpr-advanced-data",
    level: 3,
    question: "遍历单向链表的标准 for 循环骨架？",
    answer:
      "```c\nfor (struct Node *p = head; p != NULL; p = p->next)\n    /* 访问 p->data */\n```",
    tags: ["链表"],
  },
  {
    id: "adv-13",
    chapter: "cpr-advanced-data",
    level: 3,
    question: "对 int 数组升序 qsort 需哪四个关键参数？",
    answer:
      "**base**（数组首地址）、**nmemb**（元素个数）、**size**（`sizeof(int)`）、**compar**（比较函数指针）。",
    tags: ["qsort"],
  },
  {
    id: "adv-14",
    chapter: "cpr-advanced-data",
    level: 3,
    question: "int 比较函数安全返回三值（小于/等于/大于）的一种写法？",
    answer: "**return (ia > ib) - (ia < ib);** 或显式 if 返回 -1、0、1；避免减法溢出。",
    tags: ["比较函数"],
  },
  {
    id: "adv-15",
    chapter: "cpr-advanced-data",
    level: 3,
    question: "空链表 head 应等于什么？",
    answer: "**NULL**；插入首节点后 head 指向该节点。",
    tags: ["链表"],
  },

  // ── L4 综合 ──
  {
    id: "adv-16",
    chapter: "cpr-advanced-data",
    level: 4,
    question: "对比 C 与 C++ 在「容器/ADT」抽象上的主要差距。",
    answer:
      "C 需 **struct + 函数 + 手动内存** 手写 ADT，无模板/类/RAII；C++ 有 **STL 容器、构造析构、异常** 等内置抽象。C 靠接口约定与 discipline。",
    tags: ["综合理解"],
  },
  {
    id: "adv-17",
    chapter: "cpr-advanced-data",
    level: 4,
    question: "设计菜单：用函数指针数组 table[] 按用户输入编号调用不同 cmd_*，说明思路。",
    answer:
      "`typedef void (*Action_fn)(void);` 各命令实现 `cmd_*`；`Action_fn table[] = { cmd_new, cmd_open, ... };` 验证下标后 **`table[choice]()`** 间接调用。",
    tags: ["函数指针表"],
  },
  {
    id: "adv-18",
    chapter: "cpr-advanced-data",
    level: 4,
    question: "先 qsort 再 bsearch 查找 int key=19 的完整流程要点？",
    answer:
      "同一 **int_compare** 先 **qsort(arr, n, sizeof(int), int_compare)** 升序；再 **`bsearch(&key, arr, n, sizeof(int), int_compare)`**；compar 规则必须一致。",
    tags: ["综合应用"],
  },
];

export default cprAdvancedDataQuestions;
