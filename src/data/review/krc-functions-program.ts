/** 复习题库 · 函数与程序结构（krc-functions-program）。K&R 第 4 章改编。 */

import type { ReviewQuestion } from "./types";

export const krcFunctionsProgramQuestions: ReviewQuestion[] = [
  // ── L1 认记 ──
  {
    id: "krc-fp-1",
    chapter: "krc-functions-program",
    level: 1,
    question: `C 语言函数的参数传递方式是什么？函数内部修改参数值会影响外部吗？`,
    answer:
      `C 语言所有参数都是**值传递（pass by value）**：调用时把实参的值复制一份给形参，函数内部修改的是副本，不影响外部的原始变量。即使是传指针，传的也是指针值的副本——但副本指向同一块内存，所以通过指针间接修改是可以影响外部的。本质上 C 只有值传递，没有引用传递。`,
    tags: ["值传递", "函数参数", "pass by value"],
  },
  // ── L2 理解 ──
  {
    id: "krc-fp-2",
    chapter: "krc-functions-program",
    level: 2,
    question: `\`extern\` 关键字的作用是什么？什么时候需要显式使用它？`,
    answer:
      `\`extern\` 声明一个变量或函数在别处（通常是另一个文件）定义，此处只是引用。对于函数，因为函数默认是 extern 链接的，声明函数原型时不需要写 extern。\n对于变量，需要显式使用：如果一个全局变量在文件 A 中定义（\`int count = 0;\`），文件 B 想使用它，必须在 B 中写 \`extern int count;\` 声明。不写 extern 会在 B 中创建一个新的独立定义，导致链接冲突或各自独立。头文件中通常放 extern 声明，定义放在 .c 文件中。`,
    tags: ["extern", "外部变量", "链接", "作用域"],
  },
  // ── L3 应用 ──
  {
    id: "krc-fp-3",
    chapter: "krc-functions-program",
    level: 3,
    question: `以下代码有什么问题？\n\`\`\`c\nint x = 1;\nint main() {\n    int x = x + 1;\n    printf(\"%d\\n\", x);\n    return 0;\n}\n\`\`\``,
    answer:
      `\`int x = x + 1;\` 中，内层的局部变量 \`x\` 在声明那一刻就遮蔽了外层的全局变量 \`x\`。等号右侧的 \`x\` 引用的是尚未初始化的局部变量 \`x\`（值不确定，是内存残留值），不是全局的 1。所以结果是不确定的随机值，不是 2。\n这是变量遮蔽（shadowing）陷阱：局部变量从声明处就开始生效，包括初始化表达式本身。C 不会回退到外层变量。修法：改个名字，如 \`int y = x + 1;\`。`,
    tags: ["变量遮蔽", "作用域", "未初始化", "排错"],
  },
  // ── L4 综合 ──
  {
    id: "krc-fp-4",
    chapter: "krc-functions-program",
    level: 4,
    question: `C 预处理器的 \`#define\` 宏和 \`static inline\` 函数各有什么优缺点？现代 C 编程中更推荐哪种？为什么？`,
    answer:
      `\`#define\` 宏：优点是无类型、可用于任何类型参数（泛型）；缺点是无类型检查、可能多次求值副作用（\`MAX(i++, j++)\` 会自增两次）、无作用域、调试时看不到。\n\`static inline\` 函数：优点是有类型检查、参数只求值一次、有作用域、调试器可见、编译器能优化掉函数调用开销；缺点是每个类型需单独写一个（不泛型）。\n现代 C 推荐用 \`static inline\` 替代函数式宏，除非需要真正的泛型（C11 可用 \`_Generic\`）。宏用于条件编译（\`#ifdef\`）和简单常量定义仍合适，但函数式宏应尽量避免。C99 引入 inline 后，性能不再是宏的优势。`,
    tags: ["#define", "static inline", "预处理器", "宏 vs 函数", "综合"],
  },
];

export default krcFunctionsProgramQuestions;
