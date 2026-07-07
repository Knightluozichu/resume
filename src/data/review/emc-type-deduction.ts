import type { ReviewQuestion } from "./types";

/** 条款 1 模板类型推导复习题 */
export const emcTypeDeductionQuestions: ReviewQuestion[] = [
  {
    id: "emc-type-deduction-1",
    chapter: "emc-type-deduction",
    level: 1,
    question: "模板类型推导的三种 ParamType 情形分别是什么？",
    answer:
      "条款 1 将模板类型推导按 `template<typename T> void f(ParamType param)` 中 ParamType 的形式分为三种情形：\n\n1. ParamType 是引用或指针（非通用引用）：忽略实参的引用性，再按模式匹配 cv 限定。\n2. ParamType 是通用引用（T&&）：左值实参 → T 推为 T&，右值实参 → T 推为 T。\n3. ParamType 是按值传递：忽略实参的引用性，并去掉顶层 const。\n\n这三种情形是理解 auto 推导的基础，因为 auto 推导几乎与模板推导同源。",
    tags: ["条款 1", "模板类型推导", "ParamType"],
  },
  {
    id: "emc-type-deduction-2",
    chapter: "emc-type-deduction",
    level: 2,
    question:
      "对 `template<typename T> void f(T& param)`，当实参为 `const int x` 时，T 和 param 的类型分别推导为什么？为什么？",
    answer:
      "T 推导为 `const int`，param 的类型为 `const int&`。\n\n推导过程（情形 1，ParamType 是引用）：\n1. 实参 x 的类型是 `const int`。\n2. ParamType 是 `T&`，先把实参的引用性忽略（这里没有引用，不影响）。\n3. 让 `T&` 能匹配 `const int` 实参，则 T 必须是 `const int`，于是 param 是 `const int&`。\n\n关键点：实参的 const 性会被「保留」进 T，因为要保证不能通过 param 修改一个 const 对象。这正是「按模式匹配 cv」的体现——顶层 const 在引用情形下不丢失。",
    tags: ["条款 1", "引用 ParamType", "const 保留"],
  },
  {
    id: "emc-type-deduction-3",
    chapter: "emc-type-deduction",
    level: 3,
    question:
      "数组与函数实参在模板类型推导中会「退化」吗？请对比按值传递与按引用传递的差别。",
    answer:
      "会，但分两种情况：\n\n按值传递（情形 3，`void f(T param)`）：数组和函数实参会退化为指针。\n- `const char name[] = \"abc\";` → T 推导为 `const char*`。\n- 函数 `void g(int);` → T 推导为 `void(*)(int)`。\n\n按引用传递（情形 1，`void f(T& param)`）：不退化，数组类型被保留。\n- `const char name[] = \"abc\";` → T 推导为 `const char[4]`，param 是 `const char(&)[4]`。\n- 函数 → T 推导为函数类型，param 是函数引用。\n\n这个差别有实际用途：利用按引用传递数组的模板可以推导出数组大小，从而实现编译期数组大小推断工具：`template<typename T, size_t N> constexpr size_t arrSize(T (&)[N]) { return N; }`。",
    tags: ["条款 1", "数组退化", "函数退化", "按值", "按引用"],
  },
  {
    id: "emc-type-deduction-4",
    chapter: "emc-type-deduction",
    level: 4,
    question:
      "为什么说理解模板类型推导是理解 auto 推导的钥匙？二者唯一的差别在哪里？这个差别会带来什么陷阱？",
    answer:
      "因为 auto 类型推导的规则与模板类型推导几乎完全相同：auto 扮演模板推导中的 T，变量的类型扮演 ParamType，初始化表达式扮演实参。三种情形、cv 处理、退化规则一一对应。所以理解了模板推导就理解了 auto 推导。\n\n二者唯一的差别：对花括号初始化（braced initializer）的处理。\n- auto 推导：`auto x = {1, 2, 3};` 会把 x 推导为 `std::initializer_list<int>`。\n- 模板推导：`f({1, 2, 3})` 中对应模板参数 T 无法被推导（直接报错），除非声明为 `template<typename T> void f(std::initializer_list<T> param)`。\n\n这个差别带来的陷阱：\n- 程序员以为 `auto x{1};` 推导出 int，实际在 C++11/14 中推导为 `initializer_list<int>`（C++17 才修正 `auto x{1}` 为 int，但 `auto x = {1}` 仍是 initializer_list）。\n- 把花括号初始化当作「统一初始化」到处用，配合 auto 会得到意料外的 initializer_list 类型。\n\n结论：auto 与模板同源是理解捷径，但花括号初始化是二者分道扬镳的唯一岔路，必须单独记住。",
    tags: ["条款 1", "条款 2", "auto", "花括号初始化", "initializer_list"],
  },
];
