/** 复习题库 · C 结构和其他数据形式（cpr-structures）。C Primer Plus §14 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprStructuresQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "str-1",
    chapter: "cpr-structures",
    level: 1,
    question: "访问结构体变量成员用什么运算符？",
    answer: "用 **点号 `.`**，如 `s.price`。左操作数必须是 struct 变量，不是指针。",
    tags: ["struct", "成员访问"],
  },
  {
    id: "str-2",
    chapter: "cpr-structures",
    level: 1,
    question: "访问结构体指针指向的成员用什么运算符？",
    answer: "用 **箭头 `->`**，如 `pb->price`；等价于 `(*pb).price`。",
    tags: ["指针", "->"],
  },
  {
    id: "str-3",
    chapter: "cpr-structures",
    level: 1,
    question: "typedef 的作用是什么？",
    answer: "为已有类型创建**别名**，如 `typedef struct book Book;` 之后可用 `Book` 代替 `struct book`；不创建新类型。",
    tags: ["typedef"],
  },
  {
    id: "str-4",
    chapter: "cpr-structures",
    level: 1,
    question: "union 的 sizeof 如何确定？",
    answer: "等于**最大成员**的字节数；所有成员从**同一地址**开始，内存重叠。",
    tags: ["union"],
  },
  {
    id: "str-5",
    chapter: "cpr-structures",
    level: 1,
    question: "enum 中未赋值的常量默认值从几开始？",
    answer: "从 **0** 开始；下一个未赋值常量比前一个 **+1**，如 `RED, GREEN` → RED=0, GREEN=1。",
    tags: ["enum"],
  },

  // ── L2 理解 ──
  {
    id: "str-6",
    chapter: "cpr-structures",
    level: 2,
    question: "为什么 struct 的 sizeof 可能大于各成员 sizeof 之和？",
    answer:
      "编译器插入 **padding** 以满足成员 **对齐** 要求；末尾也可能填充到最大对齐倍数。",
    tags: ["对齐", "padding"],
  },
  {
    id: "str-7",
    chapter: "cpr-structures",
    level: 2,
    question: "结构体数组 shelf[3] 中 shelf[1] 的地址如何相对 shelf[0] 计算？",
    answer:
      "偏移 **sizeof(struct 类型)** 字节；元素在内存中**等宽连续**排布，与基本类型数组规则相同。",
    tags: ["结构体数组"],
  },
  {
    id: "str-8",
    chapter: "cpr-structures",
    level: 2,
    question: "向 union 写入 u.i 后再读 u.f 得到什么？",
    answer:
      "得到把 **int 的位模式按 float 解释**的结果，**不是** int 到 float 的数值转换；通常无意义。",
    tags: ["union", "陷阱"],
  },
  {
    id: "str-9",
    chapter: "cpr-structures",
    level: 2,
    question: "函数参数用 struct T * 而非 struct T 的好处？",
    answer: "避免**整结构体拷贝**（大 struct 传值开销高）；可用 const 指针承诺不修改。",
    tags: ["指针", "传参"],
  },
  {
    id: "str-10",
    chapter: "cpr-structures",
    level: 2,
    question: "enum 与 #define 常量相比有何优势？",
    answer:
      "enum 常量有**作用域**、调试器可见符号名、类型为 enum；**#define** 是纯文本替换，无类型检查。",
    tags: ["enum"],
  },

  // ── L3 应用 ──
  {
    id: "str-11",
    chapter: "cpr-structures",
    level: 3,
    question: "struct Point *p 未初始化就写 p->x = 1 有何问题？",
    answer:
      "**p 必须指向有效 Point**（栈变量地址或 malloc）；空悬/未初始化指针写入是**未定义行为**。",
    tags: ["排错", "指针"],
  },
  {
    id: "str-12",
    chapter: "cpr-structures",
    level: 3,
    question: "如何用 typedef 一次定义 struct 并起别名 Item？",
    answer:
      "```c\ntypedef struct {\n    int id;\n    float price;\n} Item;\n```\n之后直接 `Item x;`。",
    tags: ["typedef"],
  },
  {
    id: "str-13",
    chapter: "cpr-structures",
    level: 3,
    question: "enum { JAN = 1, FEB, MAR } 中 FEB 和 MAR 的值？",
    answer: "**FEB = 2**，**MAR = 3**；未赋值枚举常在前一个基础上递增。",
    tags: ["enum"],
  },
  {
    id: "str-14",
    chapter: "cpr-structures",
    level: 3,
    question: "fwrite 整 struct 到文件再在另一平台 fread 可能失败的原因？",
    answer:
      "**padding 布局**与**字节序**因平台/编译器而异；二进制 struct 快照**不可移植**。",
    tags: ["序列化", "对齐"],
  },
  {
    id: "str-15",
    chapter: "cpr-structures",
    level: 3,
    question: "union 适合哪种「多选一」存储场景？",
    answer:
      "多种表示**互斥**、只需最大成员那么大内存时，如协议 payload 类型、寄存器多种视图、省内存的 int/float 复用。",
    tags: ["union", "应用"],
  },

  // ── L4 综合 ──
  {
    id: "str-16",
    chapter: "cpr-structures",
    level: 4,
    question: "写函数 void bump(Student *s) 将 s->score 加 10，并说明调用方如何传参。",
    answer:
      "定义 `typedef struct { ... int score; } Student;`；`void bump(Student *s) { if (s) s->score += 10; }`；调用 `Student st; bump(&st);`。",
    tags: ["综合实现"],
  },
  {
    id: "str-17",
    chapter: "cpr-structures",
    level: 4,
    question: "对比 struct 与 union：内存布局与使用约束有何本质区别？",
    answer:
      "**struct** 成员**顺排**，sizeof 为各成员（含 padding）之和；**union** 成员**重叠**，sizeof 为最大成员；struct 成员同时有效，union **同一时刻只应读最后写入的类型**。",
    tags: ["综合理解"],
  },
  {
    id: "str-18",
    chapter: "cpr-structures",
    level: 4,
    question: "设计 tagged union：enum Kind { K_INT, K_FLOAT } + union { int i; float f; } 为何要配 enum？",
    answer:
      "编译器**不记录** union 当前有效成员；**enum 标签**由程序员维护，读 `data.i` 或 `data.f` 前先查 `kind`，避免错误解释共享内存。",
    tags: ["最佳实践", "union"],
  },
];

export default cprStructuresQuestions;
