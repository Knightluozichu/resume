import type { ReviewQuestion } from "./types";

/** Effective C++ 模板元编程复习题 */
export const efcTemplateMetaprogrammingQuestions: ReviewQuestion[] = [
  {
    id: "efc-template-metaprogramming-1",
    chapter: "efc-template-metaprogramming",
    level: 1,
    question: "什么是模板元编程（TMP）？它和普通编程有什么本质区别？",
    answer:
      "模板元编程（Template Metaprogramming）是利用 C++ 模板机制在编译期执行计算的编程技术。\n\n本质区别：\n- 普通编程：在运行期执行计算，变量存值，循环用 `for/while`，分支用 `if/switch`\n- TMP：在编译期执行计算，模板参数存值，递归实例化做循环，模板特化做分支\n\nTMP 的三要素：\n1. 类型当值：模板参数既可以是类型（`typename T`），也可以是值（`int N`）\n2. 实例化当循环：递归模板实例化实现编译期迭代，终止条件用特化\n3. 特化当分支：主模板和偏特化/全特化构成编译期条件分支\n\n经典示例（编译期阶乘）：\n```cpp\ntemplate<int N>\nstruct factorial { static const int value = N * factorial<N-1>::value; };\ntemplate<>\nstruct factorial<0> { static const int value = 1; };  // 终止条件\n// factorial<5>::value == 120，编译期已计算完毕\n```\n\n代价：编译时间长、错误信息极难读；收益：零运行时开销、编译期类型安全检查。",
    tags: ["TMP", "模板元编程", "编译期计算", "基本概念"],
  },
  {
    id: "efc-template-metaprogramming-2",
    chapter: "efc-template-metaprogramming",
    level: 2,
    question:
      "什么是 SFINAE（替换失败非错误）？它解决了什么问题？",
    answer:
      "SFINAE（Substitution Failure Is Not An Error，替换失败非错误）是 C++ 模板重载解析的一条规则：在模板参数替换过程中，如果某个候选模板的替换导致无效类型或表达式，编译器不报错，而是静默排除该候选模板，继续尝试其他重载。\n\n解决的问题：编译期条件选择——根据类型特征选择不同的函数重载或模板特化。\n\n工作原理：\n```cpp\ntemplate<typename T>\nauto f(T t) -> decltype(t.size(), int()) {  // 如果 T 有 size() 方法\n  return t.size();\n}\ntemplate<typename T>\nauto f(T t) -> decltype(t.length(), int()) {  // 如果 T 有 length() 方法\n  return t.length();\n}\n```\n- 调用 `f(string)` 时，第一个模板替换成功（`string` 有 `size()`），选择它\n- 调用 `f(const char*)` 时，第一个模板替换失败（`const char*` 没有 `size()`），但 SFINAE 不报错，继续尝试第二个\n\n常见 SFINAE 工具：\n1. `enable_if<Condition, T>::type`——条件为真时提供类型 `T`，否则替换失败\n2. `void_t<...>`——C++14 起，简化 SFINAE 检测\n3. `decltype` + 逗号表达式——检测表达式是否合法\n\n现代 C++ 中 SFINAE 被 `if constexpr`（C++17）和 Concepts（C++20）部分替代，但理解 SFINAE 对阅读旧代码和深入理解模板机制仍然必要。",
    tags: ["SFINAE", "替换失败", "重载解析", "enable_if"],
  },
  {
    id: "efc-template-metaprogramming-3",
    chapter: "efc-template-metaprogramming",
    level: 3,
    question:
      "条款 47 介绍 traits classes。什么是 type traits？它如何用于编译期类型分派？",
    answer:
      "type traits（类型特征）是一组在编译期查询和变换类型属性的模板工具，定义在 `<type_traits>` 中。\n\n两类 type traits：\n\n1. 类型查询（返回 `bool` 或类型信息）\n- `is_integral<T>::value`——T 是否整数类型\n- `is_pointer<T>::value`——T 是否指针类型\n- `is_class<T>::value`——T 是否类类型\n- `rank<T>::value`——数组维数\n\n2. 类型变换（返回新类型）\n- `remove_const<T>::type`——去掉 const\n- `add_pointer<T>::type`——加指针\n- `decay<T>::type`——退化（数组→指针、引用→值）\n\n编译期类型分派的典型模式：\n```cpp\ntemplate<typename T>\nvoid f(T x) {\n  doF(x, typename is_integral<T>::type());  // 传一个标签类型\n}\n\ntemplate<typename T>\nvoid doF(T x, true_type) { /* 整数特化 */ }\n\ntemplate<typename T>\nvoid doF(T x, false_type) { /* 非整数特化 */ }\n```\n- `is_integral<T>::type` 是 `true_type` 或 `false_type`\n- 编译器根据标签类型选择正确的重载\n- 这是编译期分派，零运行时开销\n\nSTL 中的应用：\n- `iterator_traits`——查询迭代器类别（输入/输出/前向/双向/随机访问），算法根据类别选择最优实现（如 `advance` 对随机访问迭代器用 `+=`，对前向迭代器用 `++`）\n- `numeric_limits`——查询数值类型的范围、精度\n\n设计 traits class 的原则（条款 47）：\n1. 确定需要查询的类型信息\n2. 为该信息选择一个名字（如 `iterator_category`）\n3. 为每种支持的类型提供该信息的特化\n\ntraits classes 让算法可以在编译期根据类型属性选择不同实现，是泛型编程和 TMP 的核心工具。",
    tags: ["条款47", "type traits", "类型分派", "编译期查询", "traits"],
  },
  {
    id: "efc-template-metaprogramming-4",
    chapter: "efc-template-metaprogramming",
    level: 4,
    question:
      "条款 48 说「认识 template 元编程」。请综合论述 TMP 的实际应用场景、优势与代价，以及它在现代 C++ 中的演进方向。",
    answer:
      "TMP 的实际应用场景：\n\n1. 编译期常量计算\n- 阶乘、斐波那契、素数判断等——结果编译期算好，运行期零开销\n- 示例：`factorial<10>::value` 在编译期就是 3628800\n\n2. 类型安全的多维单位系统\n- 用 TMP 编码物理单位（米、秒、千克），编译期检查单位匹配\n- `Quantity<Meters> + Quantity<Seconds>` 编译报错，防止单位混淆\n\n3. 矩阵表达式模板（Eigen 库的做法）\n- 用表达式模板延迟计算，编译期生成最优计算顺序\n- `C = A * B + D` 不产生临时矩阵，编译期展开为一个循环\n\n4. 编译期策略选择\n- 根据类型特征选择算法实现（如 `sort` 对随机访问迭代器用快排，对前向迭代器用归并）\n- 根据平台/编译器特性选择最优代码路径\n\n5. 反射与代码生成\n- 编译期遍历类成员、生成序列化代码\n- C++20 的 `consteval`、`constinit` 进一步扩展了编译期计算能力\n\nTMP 的优势：\n1. 零运行时开销：所有计算在编译期完成，运行期直接用结果\n2. 编译期类型安全：类型不匹配在编译期就报错，不会到运行期崩溃\n3. 极致性能：编译器可以为每种类型生成最优代码，无需运行期分发\n4. 表达力强：图灵完备，理论上可以做任何计算\n\nTMP 的代价：\n1. 编译时间长：复杂的 TMP 会导致编译时间急剧增加（可能从秒级到分钟级）\n2. 错误信息灾难：TMP 错误信息动辄数百行模板展开，极难阅读\n3. 代码可读性差：TMP 代码用模板做循环和分支，对不熟悉的人像天书\n4. 调试困难：编译期计算无法用运行期调试器断点\n5. 可移植性：不同编译器对模板的支持有差异，深层 TMP 可能在某些编译器上失败\n\n现代 C++ 的演进方向（降低 TMP 门槛）：\n\n1. `constexpr` / `consteval`（C++11/14/20）\n- 允许在编译期执行普通函数语法，而非递归模板\n- `constexpr int factorial(int n)` 用普通 `if` 和递归，比模板版本可读得多\n- 逐步替代 TMP 中的「编译期计算」场景\n\n2. `if constexpr`（C++17）\n- 编译期条件分支，替代 SFINAE 做类型分派\n```cpp\ntemplate<typename T>\nvoid f(T x) {\n  if constexpr (is_integral_v<T>) { /* 整数路径 */ }\n  else { /* 非整数路径 */ }\n}\n```\n\n3. Concepts（C++20）\n- 用概念约束模板参数，替代 SFINAE 做接口约束\n```cpp\ntemplate<typename T> requires Integral<T>\nT gcd(T a, T b) { ... }\n```\n- 错误信息更清晰，直接指出哪个 concept 不满足\n\n4. `<type_traits>` 标准化\n- 把常用 TMP 操作标准化，不用手写\n- `_v` 和 `_t` 后缀简化（`is_integral_v<T>` 替代 `is_integral<T>::value`）\n\n综合结论：TMP 是 C++ 最强大也最复杂的特性之一。在需要极致性能和编译期类型安全的场景（库设计、嵌入式、游戏引擎）中不可或缺。但应优先用现代 C++ 的 `constexpr`、`if constexpr`、Concepts 等更易读的替代方案，只有在这些不够用时才回退到底层 TMP 技术。Scott Meyers 在条款 48 中的核心建议是「认识 TMP」——不一定每个项目都要写 TMP，但要能读懂和理解 TMP 代码，因为标准库和 Boost 大量使用了它。",
    tags: ["综合", "条款48", "TMP", "应用场景", "现代C++", "constexpr", "Concepts"],
  },
];
