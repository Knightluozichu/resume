/** 复习题库 · C 存储类、链接和内存管理（cpr-storage-linkage-memory）。C Primer Plus §12 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cprStorageLinkageMemoryQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "slm-1",
    chapter: "cpr-storage-linkage-memory",
    level: 1,
    question: "函数内未写存储类的局部变量默认是什么存储类？",
    answer: "**auto**。在块内声明，通常在栈上分配，离开块自动销毁。",
    tags: ["auto", "存储类"],
  },
  {
    id: "slm-2",
    chapter: "cpr-storage-linkage-memory",
    level: 1,
    question: "块内 static 变量在程序运行期间初始化几次？",
    answer: "**仅一次**。之后每次进入块保留上次值，存储在静态区而非栈。",
    tags: ["static"],
  },
  {
    id: "slm-3",
    chapter: "cpr-storage-linkage-memory",
    level: 1,
    question: "malloc 和 free 分别做什么？",
    answer: "**malloc** 从堆分配内存并返回指针（失败 NULL）。**free** 把该指针指向的堆块归还，之后不得再解引用。",
    tags: ["malloc", "free"],
  },
  {
    id: "slm-4",
    chapter: "cpr-storage-linkage-memory",
    level: 1,
    question: "extern 用于什么场景？",
    answer: "**声明**某全局变量或函数在别的 .c 文件中有**定义**，使本文件能链接到那一份实体。",
    tags: ["extern", "链接"],
  },
  {
    id: "slm-5",
    chapter: "cpr-storage-linkage-memory",
    level: 1,
    question: "auto 局部变量通常分配在哪个内存区域？",
    answer: "**栈（stack）**。函数调用时创建，返回时自动回收。",
    tags: ["栈", "auto"],
  },

  // ── L2 理解 ──
  {
    id: "slm-6",
    chapter: "cpr-storage-linkage-memory",
    level: 2,
    question: "文件作用域的 static int counter 与其他 .c 里的 static int counter 冲突吗？",
    answer:
      "**不冲突**。文件 static 具有**内部链接**，符号仅本翻译单元可见，各 .c 可各有一份同名 static。",
    tags: ["static", "内部链接"],
  },
  {
    id: "slm-7",
    chapter: "cpr-storage-linkage-memory",
    level: 2,
    question: "为什么函数不能返回指向局部 auto 数组的指针？",
    answer:
      "局部数组在**栈**上，函数返回后栈帧销毁，指针**悬空**。应 malloc 后返回（调用方 free）或由调用方提供缓冲区。",
    tags: ["栈", "悬空指针"],
  },
  {
    id: "slm-8",
    chapter: "cpr-storage-linkage-memory",
    level: 2,
    question: "内存泄漏是什么？典型原因？",
    answer:
      "堆块再也无法访问却**未 free**，可用堆持续减少。典型原因：malloc 后丢失唯一指针、循环分配不释放。",
    tags: ["内存泄漏"],
  },
  {
    id: "slm-9",
    chapter: "cpr-storage-linkage-memory",
    level: 2,
    question: "BSS 段放什么？与 .data 段有何区别？",
    answer:
      "**BSS**：未显式初始化的全局/static，启动时**零填充**。**data**：有显式初值的全局/static。二者都在程序整个生命期存在。",
    tags: ["BSS", "内存布局"],
  },
  {
    id: "slm-10",
    chapter: "cpr-storage-linkage-memory",
    level: 2,
    question: "free(p) 之后继续 *p 会怎样？",
    answer:
      "**use-after-free**，未定义行为。块可能已被回收或重用，解引用可能崩溃或读到垃圾值。应 free 后置 p=NULL。",
    tags: ["free", "未定义行为"],
  },

  // ── L3 应用 ──
  {
    id: "slm-11",
    chapter: "cpr-storage-linkage-memory",
    level: 3,
    question:
      "读代码，第三次调用输出什么？\n```c\nvoid f(void) {\n    static int n = 0;\n    n++;\n    printf(\"%d\\n\", n);\n}\n/* 连续调用 f() 三次 */\n```",
    answer: "依次输出 **1**、**2**、**3**。static n 只初始化一次，每次调用递增。",
    tags: ["static", "读代码"],
  },
  {
    id: "slm-12",
    chapter: "cpr-storage-linkage-memory",
    level: 3,
    question: "malloc(10 * sizeof(int)) 失败时应如何处理？",
    answer:
      "检查返回值 **`if (p == NULL)`**，打印错误并退出或走降级路径，**不要**对 NULL 解引用。",
    tags: ["malloc"],
  },
  {
    id: "slm-13",
    chapter: "cpr-storage-linkage-memory",
    level: 3,
    question: "两个 .c 都写 int g = 1; 链接会怎样？",
    answer: "报 **multiple definition**：全局定义默认外部链接，全程序只能**一份**定义。其余文件应写 extern int g;。",
    tags: ["外部链接", "排错"],
  },
  {
    id: "slm-14",
    chapter: "cpr-storage-linkage-memory",
    level: 3,
    question: "sizeof *p 比 sizeof(int) 写在 malloc 里好在哪里？",
    answer:
      "若把 `int *p` 改成 `double *p`，**sizeof *p 自动变为 8**，不必改 malloc 表达式，减少类型不同步错误。",
    tags: ["malloc", "最佳实践"],
  },
  {
    id: "slm-15",
    chapter: "cpr-storage-linkage-memory",
    level: 3,
    question: "堆和栈的增长方向通常怎样？",
    answer:
      "典型布局：**栈向低地址**扩展（函数嵌套调用），**堆向高地址**扩展（malloc）。中间是空闲区，二者相向增长。",
    tags: ["堆", "栈"],
  },

  // ── L4 综合 ──
  {
    id: "slm-16",
    chapter: "cpr-storage-linkage-memory",
    level: 4,
    question: "写函数 int *make_range(int n)，malloc n 个 int 填入 0..n-1 并返回；main 中打印后 free。",
    answer:
      "```c\n#include <stdlib.h>\n\nint *make_range(int n) {\n    int i, *p = malloc(n * sizeof *p);\n    if (p == NULL) return NULL;\n    for (i = 0; i < n; i++) p[i] = i;\n    return p;\n}\n\n/* main: p = make_range(10); ... free(p); */\n```\n调用方负责 free 返回的指针。",
    tags: ["综合实现", "malloc"],
  },
  {
    id: "slm-17",
    chapter: "cpr-storage-linkage-memory",
    level: 4,
    question: "说明如何用 static 函数 + 外部链接全局变量组织多文件：头文件、一个 .c 定义、另一个 .c 使用。",
    answer:
      "**.h**：`extern int total;` 声明 + 对外 API 原型。**a.c**：`int total;` 定义 + `static void helper()` 内部实现。**b.c**：`#include \"h\"`，调用 API 读写 total。helper 因 static 不导出。",
    tags: ["链接", "多文件"],
  },
  {
    id: "slm-18",
    chapter: "cpr-storage-linkage-memory",
    level: 4,
    question: "对比 auto 局部变量、static 局部变量、malloc 内存在存储位置、生命周期、谁释放。",
    answer:
      "| | auto | static 局部 | malloc |\n|---|---|---|---|\n| 位置 | 栈 | 静态区 | 堆 |\n| 生命周期 | 块 | 整个程序 | 直到 free |\n| 释放 | 自动 | 程序退出 | 程序员 free |",
    tags: ["综合理解", "存储类"],
  },
];

export default cprStorageLinkageMemoryQuestions;
