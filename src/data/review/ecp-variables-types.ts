import type { ReviewQuestion } from "./types";

/** Easy C++（第5版）· 变量与类型复习题 */
export const ecpVariablesTypesQuestions: ReviewQuestion[] = [
  {
    id: "ecp-variables-types-1",
    chapter: "ecp-variables-types",
    level: 1,
    question: "C++ 中有哪些基本数据类型？`int`、`double`、`char`、`bool` 分别用来存什么？",
    answer:
      "C++ 基本数据类型分四大族：\n\n1. 整型：`short`、`int`、`long`、`long long`，存整数。`int` 最常用，如计数、索引。\n2. 浮点型：`float`、`double`、`long double`，存小数。`double` 精度更高（约 15 位），`float` 约 7 位。\n3. 字符型：`char`，存单个字符（如 `'A'`），本质是 1 字节小整数。\n4. 布尔型：`bool`，存真值，只有 `true`（1）和 `false`（0）。\n\n各类型用途：\n- `int`：存整数，如年龄 `int age = 20;`\n- `double`：存小数，如温度 `double temp = 36.5;`\n- `char`：存单个字符，如等级 `char grade = 'A';`\n- `bool`：存真假，如是否通过 `bool passed = true;`",
    tags: ["基本类型", "int", "double", "char", "bool"],
  },
  {
    id: "ecp-variables-types-2",
    chapter: "ecp-variables-types",
    level: 2,
    question: "什么是变量？声明变量时发生了什么？`int x = 10;` 这行代码做了几件事？",
    answer:
      "变量是「贴了名字的内存盒子」——在内存中开辟一块空间，给它一个名字，用来存数据。\n\n声明变量时发生了两件事（定义式声明）：\n1. 编译器根据类型分配相应大小的内存空间（`int` 通常 4 字节）。\n2. 把变量名与这块内存关联起来，之后用名字就能访问这块内存。\n\n`int x = 10;` 做了两件事：\n1. 声明：分配 4 字节内存，命名为 `x`，类型为 `int`。\n2. 初始化：把值 10 写入这块内存。\n\n这叫「定义时初始化」。C++ 建议变量声明时就初始化，未初始化的局部变量含垃圾值，直接读取是未定义行为。",
    tags: ["变量", "声明", "初始化", "内存"],
  },
  {
    id: "ecp-variables-types-3",
    chapter: "ecp-variables-types",
    level: 3,
    question: "写一段代码：声明一个 `int` 变量和一个 `double` 变量，把 `int` 赋值给 `double`，再把 `double` 赋值回 `int`。观察结果并解释发生了什么。",
    answer:
      "```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 7;\n    double b = a;       // int → double，安全提升\n    cout << \"b = \" << b << endl;  // b = 7\n\n    double c = 3.99;\n    int d = c;          // double → int，截断小数\n    cout << \"d = \" << d << endl;  // d = 3\n    return 0;\n}\n```\n\n结果：`b = 7`，`d = 3`。\n\n解释：\n1. `int → double` 是「提升」，小整数变成小数，信息无损，编译器自动转换。\n2. `double → int` 是「窄化」，小数部分被截断（不是四舍五入），3.99 变成 3，丢失信息。编译器可能警告。\n\n结论：从高精度转低精度要小心数据丢失，必要时用 `static_cast<int>(c)` 显式转换表明意图。",
    tags: ["类型转换", "窄化", "截断", "应用"],
  },
  {
    id: "ecp-variables-types-4",
    chapter: "ecp-variables-types",
    level: 4,
    question: "综合分析：为什么 C++ 要设计这么多基本类型而不是只用一种？`const` 和类型修饰符（如 `unsigned`）如何帮助写出更安全的代码？",
    answer:
      "C++ 设计多种基本类型的原因：\n\n1. 节省内存：不同类型占不同字节数。用 `char`（1 字节）存年龄比 `long long`（8 字节）省 7 倍空间，大规模数据时差异显著。\n2. 表达范围与精度：`int` 范围有限（约 ±21 亿），大数需 `long long`；`float` 精度不足时用 `double`。类型让编译器知道你期望的范围。\n3. 语义清晰：用 `bool` 表示真假、`char` 表示字符，比全用 `int` 更易读，编译器也能据此做类型检查。\n4. 硬件对齐：不同类型对应不同的机器指令，`int` 运算和 `double` 运算用不同的 CPU 单元，类型帮助生成高效指令。\n\n`const` 的作用：声明不可变值，如 `const double PI = 3.14159;`，编译器阻止意外修改，既防 bug 又给优化器更多信息。\n\n`unsigned` 的作用：声明非负整数，如 `unsigned int count = 0;`，把负数空间换成更大的正数上限（`int` 约 21 亿 → `unsigned int` 约 42 亿），且语义上明确「不会为负」。\n\n综合：丰富的类型 + `const` + `unsigned` 让编译器帮你查错（如把负数赋给 `unsigned` 会警告）、省内存、生成高效代码，是 C++ 「零成本抽象」哲学的体现。",
    tags: ["类型系统", "const", "unsigned", "综合"],
  },
];
