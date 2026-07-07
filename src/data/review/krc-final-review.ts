/** 复习题库 · C 程序设计语言总复习（krc-final-review）。K&R 全书总结改编。 */

import type { ReviewQuestion } from "./types";

export const krcFinalReviewQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "krc-fr-1",
    chapter: "krc-final-review",
    level: 1,
    question: "C 语言的五大核心知识板块是什么？按学习顺序列出，每块用一句话概括。",
    answer:
      "① 类型与运算符：定义数据的表示方式和运算规则（int/char/float/指针、算术/关系/逻辑运算符）② 控制流：决定代码执行路径（if/switch/while/for/函数调用）③ 指针与数组：直接操作内存地址和数据序列（指针算术、数组退化、字符串）④ 结构体：把多个变量聚合为一个自定义类型（struct/union/typedef/位域）⑤ I/O 与系统接口：与外部世界交互（printf/scanf/fopen、open/read/write、文件描述符）。",
    tags: ["全书结构", "核心板块", "总复习"],
  },
  // ── L2 理解 ──
  {
    id: "krc-fr-2",
    chapter: "krc-final-review",
    level: 2,
    question: "为什么说「指针是 C 语言的灵魂」？如果没有指针，C 会丧失哪些能力？",
    answer:
      "指针让程序能直接操作内存地址，是以下能力的根基：① 动态内存管理（malloc 返回指针，没有指针就无法堆分配）② 函数间接修改外部变量（值传递下，只有通过指针才能让函数影响调用者的数据）③ 数组和字符串操作（数组名就是指针，a[i]=*(a+i)）④ 数据结构（链表、树、图都靠指针链接节点）⑤ 回调函数和函数指针（qsort 的比较函数、事件处理）⑥ 零拷贝（传指针避免复制大结构体）。\n没有指针，C 会退化成不能动态管理内存、不能高效传大对象、不能实现复杂数据结构的语言——基本失去作为「系统编程语言」存在的意义。",
    tags: ["指针", "C语言灵魂", "核心概念", "综合理解"],
  },
  // ── L3 应用 ──
  {
    id: "krc-fr-3",
    chapter: "krc-final-review",
    level: 3,
    question: "用 C 语言实现一个「动态增长的整数数组」（类似 C++ vector 的简化版），需要用到哪些 C 特性？写出核心代码结构。",
    answer:
      "用到：结构体（封装数据+容量）、指针（指向堆内存）、malloc/realloc/free（动态内存）、指针算术（访问元素）。\n```c\ntypedef struct {\n    int *data;\n    size_t size;\n    size_t cap;\n} Vec;\n\nvoid vec_init(Vec *v) { v->data = NULL; v->size = v->cap = 0; }\n\nvoid vec_push(Vec *v, int val) {\n    if (v->size >= v->cap) {\n        v->cap = v->cap ? v->cap * 2 : 4;\n        v->data = realloc(v->data, v->cap * sizeof(int));\n    }\n    v->data[v->size++] = val;\n}\n\nvoid vec_free(Vec *v) { free(v->data); vec_init(v); }\n```\n关键点：realloc 自动处理扩容和拷贝；容量翻倍策略保证均摊 O(1)；free 防止内存泄漏。这个例子串联了结构体、指针、动态内存三大特性。",
    tags: ["动态数组", "realloc", "结构体", "指针", "综合应用"],
  },
  // ── L4 综合 ──
  {
    id: "krc-fr-4",
    chapter: "krc-final-review",
    level: 4,
    question: "K&R 全书从 `hello world` 到 UNIX 系统接口，体现了 C 语言怎样的设计哲学？结合 C 的历史地位和现代编程语言趋势，分析 C 语言「不会消亡」的原因。",
    answer:
      "设计哲学：① 信任程序员——不做运行时安全检查，换取零开销性能 ② 贴近硬件——指针直接操作内存，能表达任何底层操作 ③ 小而精——语言本身极简（K&R 全书不到 300 页），复杂功能靠库实现 ④ 可移植——标准定义抽象语义，同一份代码可编译到不同 CPU。\n不会消亡的原因：① 操作系统内核（Linux/Windows）几乎全用 C 写，不可能重写 ② 嵌入式系统资源受限，只有 C 能在 KB 级内存上运行 ③ 所有其他语言的运行时（Python/Java/Go 的解释器/虚拟机/编译器）底层都是 C ④ 数据库、网络协议栈、图形驱动等基础设施层依赖 C 的性能和硬件控制力 ⑤ C 的 ABI 是跨语言调用的事实标准（FFI）。\n现代语言（Rust/Go）在安全性和表达力上超越 C，但无法替代 C 在基础设施层的地位——C 的简洁、零运行时、无处不在的 ABI 兼容性构成了不可替代的生态护城河。",
    tags: ["C语言哲学", "设计哲学", "历史地位", "综合分析", "总复习"],
  },
];

export default krcFinalReviewQuestions;
