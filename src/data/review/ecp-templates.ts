import type { ReviewQuestion } from "./types";

/** Easy C++（第5版）· 模板入门复习题 */
export const ecpTemplatesQuestions: ReviewQuestion[] = [
  {
    id: "ecp-templates-1",
    chapter: "ecp-templates",
    level: 1,
    question: "什么是函数模板？写一个 `maxOf` 函数模板，能比较两个 `int` 或两个 `double` 的较大值。",
    answer:
      "函数模板是「函数的蓝图」——用占位类型（类型参数）写一份代码，编译器根据实际传入的类型自动生成对应版本，实现「一份代码，多种类型」。\n\n`maxOf` 函数模板：\n```cpp\ntemplate <typename T>\nT maxOf(T a, T b) {\n    return (a > b) ? a : b;\n}\n```\n\n使用：\n```cpp\ncout << maxOf(3, 5);        // T=int，返回 5\ncout << maxOf(2.5, 1.5);    // T=double，返回 2.5\ncout << maxOf('a', 'z');    // T=char，返回 'z'\n```\n\n`template <typename T>` 声明类型参数 `T`，编译器看到 `maxOf(3, 5)` 时推断 `T=int`，自动生成 `int maxOf(int, int)` 版本。这样不用为每种类型重写一个函数。",
    tags: ["函数模板", "template", "类型参数"],
  },
  {
    id: "ecp-templates-2",
    chapter: "ecp-templates",
    level: 2,
    question: "函数模板和函数重载有什么区别？既然有重载为什么还需要模板？",
    answer:
      "函数重载：为每种类型手写一个同名函数，参数列表不同。编译器根据实参选择。\n```cpp\nint maxOf(int a, int b) { return a > b ? a : b; }\ndouble maxOf(double a, double b) { return a > b ? a : b; }\n```\n\n函数模板：写一份蓝图，编译器自动生成各类型版本。\n```cpp\ntemplate <typename T>\nT maxOf(T a, T b) { return a > b ? a : b; }\n```\n\n区别：\n1. 代码量：重载需要每种类型写一遍，逻辑相同也要重复；模板写一次，编译器自动生成。\n2. 维护：重载改逻辑要改多处，易遗漏；模板改一处即可。\n3. 灵活性：重载只支持你预先写的类型；模板支持任何支持 `>` 运算的类型（包括自定义类型），无需预知。\n4. 控制力：重载可以给不同类型写不同逻辑；模板对所有类型用同一逻辑（可用特化定制）。\n\n需要模板的原因：当多个类型的逻辑完全相同时，重载产生大量重复代码，模板消除重复，是泛型编程的基础。",
    tags: ["模板", "重载", "对比", "泛型"],
  },
  {
    id: "ecp-templates-3",
    chapter: "ecp-templates",
    level: 3,
    question: "写一个类模板 `Box`，能存放任意类型的值，提供 `set`、`get` 方法。用 `int` 和 `string` 分别实例化测试。",
    answer:
      "```cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\ntemplate <typename T>\nclass Box {\nprivate:\n    T value;\npublic:\n    void set(T v) { value = v; }\n    T get() { return value; }\n};\n\nint main() {\n    Box<int> intBox;\n    intBox.set(42);\n    cout << intBox.get() << endl;  // 42\n\n    Box<string> strBox;\n    strBox.set(\"hello\");\n    cout << strBox.get() << endl;  // hello\n    return 0;\n}\n```\n\n要点：\n1. `template <typename T>` 放在 `class` 前，`T` 是类型参数。\n2. 用 `Box<int>`、`Box<string>` 实例化出具体类，`T` 被替换为 `int` 或 `string`。\n3. 成员变量 `value`、成员函数参数和返回值都用 `T`，实例化后变成具体类型。\n4. 编译器为 `Box<int>` 和 `Box<string>` 各生成一份独立的类代码，互不影响。\n5. 类模板让「存放任意类型数据的容器」一次写好，STL 的 `vector`、`stack` 都是类模板。",
    tags: ["类模板", "实例化", "Box", "应用"],
  },
  {
    id: "ecp-templates-4",
    chapter: "ecp-templates",
    level: 4,
    question: "综合分析：模板代码在什么时候生成？模板的「零开销」体现在哪里？使用模板有哪些注意事项？",
    answer:
      "模板代码生成时机：\n- 模板本身不是代码，是「蓝图」。编译器在实例化时（遇到 `maxOf(3, 5)` 或 `Box<int>`）才根据类型参数生成具体代码。\n- 这叫「隐式实例化」，发生在编译期。\n- 因此模板定义通常放在头文件中（源文件看不到模板定义就无法实例化）。\n\n零开销体现：\n1. 编译期完成：模板在编译时生成代码，运行时没有类型擦除、虚函数分派等开销，和手写的具体类型代码性能完全一样。\n2. 类型安全：每个实例化是强类型的，编译器能做完整类型检查，不像 C 的 `void*` 丢失类型信息。\n3. 内联友好：模板函数编译器可见完整定义，容易内联优化。\n\n注意事项：\n1. 代码膨胀：每种类型生成一份代码，用很多不同类型实例化同一模板会增大二进制体积。\n2. 编译耗时：模板实例化增加编译时间，错误信息冗长难读（编译器报的是展开后的代码）。\n3. 要求运算支持：模板假设类型参数支持所需操作（如 `>`、`<`），传入不支持的类型会编译错误，错误信息可能很深。\n4. 声明定义分离问题：模板不能像普通函数那样在 .h 声明、.cpp 定义，必须把定义放头文件（或用显式实例化）。\n5. 隐式要求应文档化：模板对类型参数的隐含要求（如「T 必须支持 `<` 运算」）最好用 C++20 concepts 显式约束，否则用户难以知晓。\n\n综合：模板是 C++ 泛型编程的基石，实现编译期多态与零开销抽象，但以编译时间和代码体积为代价，需要良好的设计来控制复杂度。",
    tags: ["模板", "实例化", "零开销", "综合"],
  },
];
