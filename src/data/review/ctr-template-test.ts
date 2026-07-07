import type { ReviewQuestion } from "./types";

/** C++ 编程测试秘籍 · 模板测试复习题 */
export const ctrTemplateTestQuestions: ReviewQuestion[] = [
  {
    id: "ctr-template-test-1",
    chapter: "ctr-template-test",
    level: 1,
    question: "函数模板与类模板的基本区别是什么？什么是模板的实例化？",
    answer:
      "函数模板与类模板：\n- 函数模板：用一个模板参数生成一族函数，如 `template<typename T> T add(T a, T b)`。调用时可显式指定 `add<int>(1,2)` 或由实参推导 `add(1,2)`。函数模板支持重载。\n- 类模板：用模板参数生成一族类，如 `template<typename T> class Stack { ... }`。使用必须显式指定参数 `Stack<int>`（C++17 起类模板参数可由构造函数推导）。类模板成员函数也是模板，单独实例化。\n\n模板的实例化：编译器根据实际使用的模板参数，把模板「具现」出一份具体代码的过程。\n- 隐式实例化：用到某组参数时编译器自动生成对应代码。函数模板按调用推导实例化；类模板按使用实例化（成员函数按需，只实例化被调用的）。\n- 显式实例化：用 `template class Stack<int>;` 或 `template int add(int,int);` 强制生成，常用于把模板实现放 .cpp、把实例化集中在一处以控制编译时间/代码体积。\n\n模板是编译期机制，所有实例化在编译期完成，零运行时开销，但以编译时间与代码体积（模板膨胀）为代价。",
    tags: ["函数模板", "类模板", "模板实例化", "编译期"],
  },
  {
    id: "ctr-template-test-2",
    chapter: "ctr-template-test",
    level: 2,
    question: "模板类型推导（C++14 前）有哪三种情形？`template<typename T> void f(T& x)` 与 `template<typename T> void f(T&& x)` 在传入 `int&` 时 T 分别推导为什么？",
    answer:
      "模板类型推导（C++14 前，针对 `template<typename T> void f(ParamType x)`）分三种情形，取决于 ParamType 的形式：\n1. ParamType 是引用（非万能引用）：若实参是引用，先剥离引用性，再按 ParamType 是左值/const 情形推导。const 性由 ParamType 决定，实参的顶层 const 被保留逻辑由 ParamType 体现。\n2. ParamType 是万能引用（T&&）：左值实参推导 T 为左值引用，右值实参推导 T 为非引用。这是引用折叠的结果，使万能引用能转发左右值。\n3. ParamType 既非引用也非万能引用（按值传递）：实参的引用性和顶层 const、volatile 都被忽略（按值拷贝），底层 const 保留。\n\n两个具体推导：\n- `template<typename T> void f(T& x)` 传入 `int&`：ParamType 是普通左值引用（非万能引用，因 T 单独出现）。实参 `int&`，剥离引用性得 int，T 推导为 `int`，x 类型为 `int&`。（若实参是 `const int`，T 推导为 `const int`。）\n- `template<typename T> void f(T&& x)` 传入 `int&`：ParamType 是万能引用（T&& 中 T 是模板参数）。左值实参触发引用折叠，T 推导为 `int&`，x 类型经折叠 `int& && → int&` 成为左值引用。\n\n区别关键：普通引用形参不保留实参的左右值性，万能引用形参保留——这是 perfect forwarding 的基础。",
    tags: ["类型推导", "万能引用", "引用折叠", "perfect forwarding"],
  },
  {
    id: "ctr-template-test-3",
    chapter: "ctr-template-test",
    level: 3,
    question: "什么是 SFINAE？用 `enable_if` 实现「仅当 T 是整数类型时启用某个函数模板」的写法，并说明 C++20 concepts 如何简化它。",
    answer:
      "SFINAE（Substitution Failure Is Not An Error，替换失败不是错误）：在模板参数推导时，若对某个候选模板的替换导致无效类型或表达式，编译器不报错，而是把这个候选从重载集中剔除，继续尝试其他候选。这让我们能「按条件启用/禁用模板」。\n\n用 enable_if 实现「仅整数类型启用」：\n```cpp\n#include <type_traits>\ntemplate<typename T,\n         typename = std::enable_if_t<std::is_integral_v<T>>>\nvoid only_int(T x) { /* 整数版 */ }\n```\n当 T 是整数类型时 `is_integral_v<T>` 为 true，`enable_if_t` 提供有效默认参数，模板有效；T 非整数时替换失败，该模板被剔除，调用者会得到「无匹配函数」错误（若没有其他候选）。也可把 enable_if 放在返回类型或函数参数里。\n\nSFINAE 的痛点：错误信息晦涩（一堆模板展开）、写法绕（要塞默认参数或返回类型）、组合条件繁琐（要嵌套 enable_if 或 conjunction）。\n\nC++20 concepts 简化：\n```cpp\n#include <concepts>\ntemplate<typename T>\n  requires std::integral<T>\nvoid only_int(T x) { /* 整数版 */ }\n// 或更简洁：void only_int(std::integral auto x)\n```\nconcept 直接表达约束，错误信息友好（直接说「T 不满足 integral」），组合用 `&&`/`||`，可读性远胜 SFINAE。concept 是 SFINAE 的现代替代，新代码应优先 concept。",
    tags: ["SFINAE", "enable_if", "concepts", "C++20", "类型约束"],
  },
  {
    id: "ctr-template-test-4",
    chapter: "ctr-template-test",
    level: 4,
    question: "什么是模板元编程（TMP）？请用模板特化实现一个编译期阶乘 `Factorial<N>::value`，并说明 TMP 的核心思想与它的现代替代方案。",
    answer:
      "模板元编程（Template Metaprogramming）：利用模板的实例化机制在编译期执行计算，把「运行时算的值」变成「编译期算出的常量」。核心思想是把模板当成「编译期函数」——模板参数是输入，特化/递归是计算过程，内嵌 typedef/enum/static 是输出。TMP 让计算发生在编译期，零运行时开销，但代价是编译时间与代码可读性。\n\n编译期阶乘实现：\n```cpp\ntemplate<unsigned N>\nstruct Factorial {\n  static constexpr unsigned value = N * Factorial<N - 1>::value;  // 递归\n};\ntemplate<>\nstruct Factorial<0> {\n  static constexpr unsigned value = 1;  // 终止特化\n};\n// 使用：Factorial<5>::value == 120，编译期算出\n```\n原理：主模板递归引用 `Factorial<N-1>::value`，编译器不断实例化更小的 N，直到匹配 `Factorial<0>` 的特化终止。整个递归在编译期展开，结果是一个编译期常量。\n\nTMP 的核心思想：\n1. 用模板特化模拟模式匹配/递归终止。\n2. 用内嵌类型模拟函数返回值（typedef/using 返回类型，static const 返回值）。\n3. 把类型当数据、把特化当分支，在类型层面做计算。\n\n现代替代方案：\n- `constexpr`/`consteval` 函数：C++11 起的 constexpr 函数、C++20 的 consteval 强制编译期求值，用普通递归/循环写编译期计算，可读性远胜 TMP。阶乘的现代写法：`consteval unsigned fact(unsigned n){ return n<=1?1:n*fact(n-1); }`。\n- `if constexpr`（C++17）：编译期分支，替代 SFINAE 与部分 TMP 分支。\n- concepts（C++20）：替代基于 SFINAE 的类型计算。\n- `consteval`/`constinit`：明确编译期求值或编译期初始化。\n\n结论：TMP 是 C++11 之前「编译期计算」的唯一手段，技巧性高但难写难读。现代 C++ 用 constexpr 函数 + concepts 几乎能覆盖所有 TMP 场景，新代码应优先现代方案，TMP 仅作为理解标准库实现与旧代码的背景知识。",
    tags: ["模板元编程", "TMP", "特化", "constexpr", "consteval", "现代替代"],
  },
];
