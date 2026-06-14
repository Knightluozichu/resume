/** 复习题库 · C++ 模板与泛型编程（cpp-templates）。C++ Primer §16 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppTemplatesQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ct-1",
    chapter: "cpp-templates",
    level: 1,
    question: "什么是函数模板？它和普通函数的本质区别是什么？",
    answer:
      "函数模板是用 `template<typename T>` 定义的、参数类型尚未确定的函数蓝图。它本身不是可以调用的函数——只是向编译器注册了一套代码模具。和普通函数的本质区别：普通函数的参数类型在定义时确定——`int max(int, int)` 只能处理 int。函数模板的类型参数 `T` 是占位符——编译器在调用时根据实参类型推导 `T`、自动生成对应类型的具体函数（实例化）。一次编写、多类型通用。",
    tags: ["函数模板", "template", "类型参数"],
  },
  {
    id: "ct-2",
    chapter: "cpp-templates",
    level: 1,
    question: "什么是模板实例化？隐式实例化和显式实例化的区别？",
    answer:
      "模板实例化是编译器根据模板和实际使用的类型参数，自动生成一份对应类型代码的过程。隐式实例化——编译器从函数调用的实参类型自动推导模板参数并生成代码：`max(3,7)` → 推导 `T=int` → 生成 `int max(int,int)`。显式实例化——程序员在调用点或声明中手动指定类型：`max<double>(3.2, 5)` 或 `template int max<int>(int,int)`。每个不同的类型参数组合都生成一份独立的代码。",
    tags: ["实例化", "implicit", "explicit", "模板"],
  },
  {
    id: "ct-3",
    chapter: "cpp-templates",
    level: 1,
    question: "类模板的成员函数在类外定义时需要注意什么？为什么 `Stack::push` 会编译报错？",
    answer:
      "类外定义时必须**重写 `template<typename T>` 前缀**并用 `ClassName<T>::` 限定作用域——不是 `ClassName::`。`Stack::push` 报错因为 `Stack` 只是模板名而非类名——真正的类名是 `Stack<T>`（带上类型参数）。正确的写法：`template<typename T> void Stack<T>::push(const T &val)`。此外模板的声明和定义通常都要放在头文件中——因为编译器在实例化时需要看到完整定义。",
    tags: ["类模板", "类外定义", "Stack<T>", "作用域"],
  },
  {
    id: "ct-4",
    chapter: "cpp-templates",
    level: 1,
    question: "什么是非类型模板参数？给一个常见的使用场景。",
    answer:
      "非类型模板参数是模板参数列表中不是类型名、而是一个具体的值——如 `template<int N>` 中的 `N`。编译期就必须知道它的值（常量表达式）。最常见的场景是指定编译期数组大小：`template<typename T, size_t N> class Array { T data[N]; };`。标准库中的 `std::array<T, N>` 就是这种模式——`N` 在编译期确定、数组分配在栈上或对象的内部存储中、性能媲美内置数组。非类型参数不能是浮点数（C++20前）或类类型。",
    tags: ["非类型模板参数", "std::array", "常量表达式"],
  },
  {
    id: "ct-5",
    chapter: "cpp-templates",
    level: 1,
    question: "全特化和偏特化有什么区别？函数模板能偏特化吗？",
    answer:
      "**全特化**——所有模板参数都固定为具体类型：`template<> struct X<int>`。匹配优先级最高。**偏特化**——只固定部分参数或限定参数模式：`template<typename T> struct X<T*>` 匹配所有指针类型。匹配优先级在全特化之下、主模板之上。**函数模板只能全特化、不能偏特化**——如果需要针对某种模式（如 T*）做不同处理，应该另写一个重载的模板函数而非偏特化。重载的匹配规则更直观、暗坑更少。类模板两者都支持。",
    tags: ["全特化", "偏特化", "函数模板", "匹配优先级"],
  },
  {
    id: "ct-6",
    chapter: "cpp-templates",
    level: 1,
    question: "什么是可变参数模板？`typename... Args` 和 `sizeof...(Args)` 分别是什么？",
    answer:
      "可变参数模板是 C++11 引入的、接受零个或多个模板参数的模板。`typename... Args` 声明了一个**参数包（parameter pack）**——`Args` 代表零个到任意多个类型的集合。`sizeof...(Args)` 在编译期返回包中当前的参数数量。可变参数模板通过递归展开——每次取出包中第一个元素处理、对剩余包递归调用自身，直到包为空时由 base case 终止递归。标准库中的 `std::tuple`、`make_shared`、`emplace_back` 都是用可变参数模板实现的。",
    tags: ["可变参数模板", "参数包", "sizeof...", "递归展开"],
  },

  // ── L2 理解：用法与区别 ──
  {
    id: "ct-7",
    chapter: "cpp-templates",
    level: 2,
    question: "函数模板的类型参数推导有哪些规则？`max(3, 4.5)` 为什么编译失败？",
    answer:
      "编译器推导模板参数时的关键规则：① 每个模板参数必须能从函数参数推导出来——推导不出来就编译错误；② 同一个类型参数 `T` 出现多次时，推导出的类型必须一致——不能一个位置是 `int`、另一个是 `double`；③ 只有函数参数参与推导——返回类型不参与。`max(3, 4.5)` 编译失败因为 `T` 既要匹配 `int`（来自实参 3）又要匹配 `double`（来自实参 4.5）——类型不一致、无法统一。修法：显式指定 `max<double>(3, 4.5)` 或将其中一个实参转型 `max(static_cast<double>(3), 4.5)`。",
    tags: ["类型推导", "模板参数", "max", "类型不一致"],
  },
  {
    id: "ct-8",
    chapter: "cpp-templates",
    level: 2,
    question: "`Stack<int>` 和 `Stack<string>` 这两个类型之间是什么关系？它们的 `static` 成员变量会共享吗？",
    answer:
      "`Stack<int>` 和 `Stack<string>` 是**两个完全独立的类**——彼此之间没有任何继承、友元或关联关系。它们只是共享同一套源代码模板、但编译后生成的是两份完全不同的机器代码。关于 `static` 成员——每个实例化后的类有自己独立的 `static` 存储空间。`Stack<int>::staticData` 和 `Stack<string>::staticData` 是两个不同的变量、在内存中相隔万里、互不影响。这印证了一个核心认知——模板只是代码生成器，每次实例化都是全新的产品。",
    tags: ["Stack", "static", "实例化", "独立类"],
  },
  {
    id: "ct-9",
    chapter: "cpp-templates",
    level: 2,
    question: "模板和非模板的代码组织方式有什么区别？为什么模板的声明和定义通常放在同一个头文件中？",
    answer:
      "非模板代码——声明放 `.h`、定义放 `.cpp`→ 编译 `.cpp` 时生成目标文件 → 链接时其他翻译单元找到符号。模板的生成逻辑不同——编译器在编译**调用处**时需要看到模板的**完整定义**才能实例化（推导类型 → 替换占位符 → 生成代码）。如果把定义放在 `.cpp` 中——编译调用处（如 `main.cpp`）时看不到定义 → 无法实例化 → 链接时报 `undefined reference`。解决方案：声明 + 定义全部放头文件（`.h`/`.hpp`）；或用 `.tpp`/`.impl.h` 并在头文件末尾 `#include`。",
    tags: ["代码组织", "头文件", "实例化", "undefined reference"],
  },
  {
    id: "ct-10",
    chapter: "cpp-templates",
    level: 2,
    question: "可变参数模板的递归展开机制是怎样的？如果忘了写终止条件（base case）会有什么后果？",
    answer:
      "递归展开机制——每次调用从参数包中取出第一个元素（`first`）处理，对剩余的元素（`rest...`）递归调用自身。每次 `sizeof...(Args)` 减少 1——包在逐步缩小。当 `Args` 为空时，编译器在重载集中找无参版本——这就是终止条件（base case）：`void print() {}`。如果忘了写终止条件，包为空时编译器尝试匹配 `print(T, Args...)`——没有实参可推导 `T`→ 编译错误（一般报 'no matching function'）。最坏的情况——编译器误推导 `T` 后进入同一模板、无限递归——**编译器会限制模板递归深度并报错，不会运行期爆栈**。",
    tags: ["可变参数模板", "递归展开", "base case", "终止条件"],
  },

  // ── L3 应用：代码级判断与用法 ──
  {
    id: "ct-11",
    chapter: "cpp-templates",
    level: 3,
    question:
      `下面代码有两个问题——找出并修正：\n\`\`\`cpp\ntemplate<typename T>\nT average(const std::vector<T> &v) {\n    T sum = 0;\n    for (auto &x : v) sum += x;\n    return sum / v.size();\n}\n\`\`\``,
    answer:
      "两个问题：① `T sum = 0;` ——当 `T` 是 `string` 时，不能用 `0` 初始化（没有 `string` 到 `int` 的隐式转换）。应该用值初始化 `T sum{};`（对算术类型是 0、对 string 是空串）。② `return sum / v.size();` ——当 `T` 是 `string` 时不能做除法。通常这种泛型算法应加上约束或文档说明要求 `T` 支持算术运算。修正版可用 `T sum{};` 且建议改名为更专门的名称（如 `arithmetic_average`）或在 C++20 用 `requires`。",
    tags: ["值初始化", "泛型约束", "模板实现"],
  },
  {
    id: "ct-12",
    chapter: "cpp-templates",
    level: 3,
    question:
      "为 `Stack<T>` 类模板写出完整的类外成员函数定义——`push`、`pop`、`top`、`empty`、`size`。包含必要的异常检查和访问控制。",
    answer:
      '```cpp\ntemplate<typename T>\nclass Stack {\npublic:\n    void push(const T &val);\n    T pop();\n    T top() const;\n    bool empty() const { return data.empty(); }\n    size_t size() const { return data.size(); }\nprivate:\n    std::vector<T> data;\n};\n\ntemplate<typename T>\nvoid Stack<T>::push(const T &val) { data.push_back(val); }\n\ntemplate<typename T>\nT Stack<T>::pop() {\n    if (data.empty()) throw std::out_of_range("Stack<>::pop empty");\n    T val = data.back();\n    data.pop_back();\n    return val;\n}\n\ntemplate<typename T>\nT Stack<T>::top() const {\n    if (data.empty()) throw std::out_of_range("Stack<>::top empty");\n    return data.back();\n}\n```\n关键点：① 每个类外定义都必须带 `template<typename T>` ② 必须是 `Stack<T>::` 不是 `Stack::` ③ `empty`/`size` 简单内联在类内——不需要类外定义 ④ `pop` 和 `top` 检查空栈、抛异常而非 UB。',
    tags: ["Stack", "类外定义", "异常检查", "Stack<T>::"],
  },
  {
    id: "ct-13",
    chapter: "cpp-templates",
    level: 3,
    question:
      "实现一个 `compare` 函数模板的三个版本：(1) 通用版本 `compare(const T&, const T&)` 用 `<` 比较；(2) 全特化为 `const char*` 用 `strcmp`；(3) 针对指针类型的**重载**函数模板（非偏特化）`compare(T*, T*)` 使用 `*` 解引用后调用通用版本。说明为什么指针版用重载而非偏特化。",
    answer:
      '```cpp\n// (1) 通用版本\ntemplate<typename T>\nint compare(const T &a, const T &b) {\n    if (a < b) return -1;\n    if (b < a) return 1;\n    return 0;\n}\n\n// (2) 全特化——const char*\ntemplate<>\nint compare(const char* const &a, const char* const &b) {\n    return std::strcmp(a, b);\n}\n\n// (3) 重载——指针版本（非偏特化！函数模板不能偏特化）\ntemplate<typename T>\nint compare(T *a, T *b) {\n    return compare(*a, *b);  // 解引用后委托给通用版本\n}\n```\n指针版用**重载**而非偏特化——因为**函数模板不支持偏特化**。如果写 `template<typename T> int compare(T* const &a, T* const &b)` 尝试偏特化——编译器把它当作另一个重载而不是特化，匹配规则不同且容易意外选错。重载更安全、规则更直观——当实参是指针类型时，重载版本比通用版本更特化，编译器会优先选择。',
    tags: ["compare", "全特化", "重载", "偏特化限制"],
  },
  {
    id: "ct-14",
    chapter: "cpp-templates",
    level: 3,
    question:
      "实现一个 `print_all` 可变参数模板——接受任意数量的任意类型参数，将它们全部输出到 `std::cout`，参数间用空格分隔，最后输出换行。必须包含终止条件。",
    answer:
      '```cpp\n#include <iostream>\n\n// 终止条件——一个参数时只输出它+换行\ntemplate<typename T>\nvoid print_all(const T &t) {\n    std::cout << t << "\\n";\n}\n\n// 可变参数版本——输出 first + 空格 + 递归\ntemplate<typename T, typename... Args>\nvoid print_all(const T &first, const Args&... rest) {\n    std::cout << first << " ";\n    print_all(rest...);\n}\n\n// 使用：\nprint_all(1, 2.5, "hello", \'x\');  // 输出：1 2.5 hello x\n```\n设计要点：① 终止条件接受一个参数——输出它并换行（递归的最后一层）② 可变参数版本输出 `first` 加空格、对 `rest...` 递归——每次消耗一个参数 ③ `sizeof...(rest)` 在递归中逐次减 1 ④ 如果忘了写终止条件——包为空时找不到匹配 → 编译错误。',
    tags: ["可变参数模板", "print_all", "递归展开", "终止条件"],
  },
  {
    id: "ct-15",
    chapter: "cpp-templates",
    level: 3,
    question:
      '解释为什么以下代码在链接时报错——undefined reference to Stack<int>::push(int)。模板定义在 stack.cpp 中、声明在 stack.h 中。如何修复？\n```cpp\n// stack.h\ntemplate<typename T> class Stack {\npublic: void push(const T &val);\n};\n// stack.cpp\ntemplate<typename T>\nvoid Stack<T>::push(const T &val) { /* ... */ }\n```',
    answer:
      '链接错误的原因是**模板的实例化机制不是常规的编译-链接模型**。当 main.cpp 中写 Stack<int> s; s.push(42); 时，编译器编译 main.cpp 时看到了 stack.h 中的模板声明——但没有看到 stack.cpp 中的定义。没有完整定义编译器无法实例化 Stack<int>::push(int)——于是它假设这个函数在其他翻译单元中已生成、标记为外部符号。但编译 stack.cpp 时，并没有任何代码请求 Stack<int> 的实例化——所以编译器不会生成该实例。链接时——两边都没生成→符号缺失→链接错误。修复方法：把定义全部移到头文件（stack.h）中，或在头文件末尾 #include "stack.cpp"，或在模板定义文件中显式实例化 template class Stack<int>;。',
    tags: ["链接错误", "undefined reference", "实例化", "头文件"],
  },

  // ── L4 综合：场景选型与完整设计 ──
  {
    id: "ct-16",
    chapter: "cpp-templates",
    level: 4,
    question:
      "设计一个 `DimArray<T, N, M>` 类模板——表示 N×M 的二维定长数组。(1) 写出模板声明；(2) 提供 `operator()(int row, int col)` 取元素；(3) 提供 `size()` 返回总元素数 `N*M`；(4) 说明非类型模板参数 `N` 和 `M` 的约束。",
    answer:
      '```cpp\ntemplate<typename T, std::size_t N, std::size_t M>\nclass DimArray {\npublic:\n    DimArray() = default;\n    DimArray(const T &init) {\n        for (auto &x : data) x = init;\n    }\n\n    T& operator()(std::size_t row, std::size_t col) {\n        return data[row * M + col];  // 行优先存储\n    }\n    const T& operator()(std::size_t row, std::size_t col) const {\n        return data[row * M + col];\n    }\n\n    constexpr std::size_t size() const { return N * M; }\n    constexpr std::size_t rows() const { return N; }\n    constexpr std::size_t cols() const { return M; }\n\nprivate:\n    T data[N * M];  // N*M 也是编译期常量\n};\n```\n约束：① `N` 和 `M` 必须是编译期常量表达式——可以在编译时求出值 ② 必须是整型（`size_t`）——浮点数或类类型不能作为非类型模板参数（C++20之前）③ 所有 `DimArray<int,3,4>` 的类型相同、`DimArray<int,2,6>` 是不同的类型 ④ `size()` 标记为 `constexpr`——因为 `N*M` 编译期已确定。',
    tags: ["非类型模板参数", "二维数组", "constexpr", "DimArray"],
  },
  {
    id: "ct-17",
    chapter: "cpp-templates",
    level: 4,
    question:
      "设计一个 `Vector<T>` 类模板的特化层次：(1) 主模板——通用 `Vector<T>`（内部用 `std::vector<T>`）；(2) 偏特化 `Vector<T*>`——存储指针时自动 `delete` 所指向的对象；(3) 全特化 `Vector<bool>`——用位压缩存储节省空间。说明编译器的选择规则。",
    answer:
      '```cpp\n// (1) 主模板\ntemplate<typename T>\nclass Vector {\n    std::vector<T> data;\npublic:\n    void push_back(const T &val) { data.push_back(val); }\n    ~Vector() = default;  // T 不是指针——不需要 delete\n};\n\n// (2) 偏特化——T* 指针版本\ntemplate<typename T>\nclass Vector<T*> {\n    std::vector<T*> data;\npublic:\n    void push_back(T *ptr) { data.push_back(ptr); }\n    ~Vector() { for (auto p : data) delete p; }  // 释放指向对象\n};\n\n// (3) 全特化——bool 版本\ntemplate<>\nclass Vector<bool> {\n    // 位压缩实现（略）——比主模板省 8 倍空间\n};\n```\n选择规则——编译器总是选最具体的：`Vector<int*>` → 偏特化 `T*`（`T=int` 匹配指针模式、比主模板具体）；`Vector<bool>` → 全特化 `bool`（所有参数已固定、优先级最高）；`Vector<string>` → 主模板（不匹配任何特化）。顺序：全特化 > 偏特化 > 主模板。',
    tags: ["Vector", "特化层次", "指针特化", "bool特化"],
  },
  {
    id: "ct-18",
    chapter: "cpp-templates",
    level: 4,
    question: '判断对错并解释：类模板的 static 成员变量在所有实例化之间共享——因为模板只有一份代码。',
    answer:
      "**错**。虽然类模板的源代码只有一份，但**每个不同的实例化参数组合生成的是独立的类**——各自拥有自己的 `static` 成员存储空间。`Stack<int>` 的 `static` 变量和 `Stack<string>` 的 `static` 变量是两个完全不同的变量。模板是代码复印机——`Stack<int>` 和 `Stack<string>` 在编译器眼里就是两个毫不相关的类，只是碰巧由同一模板生成。同一个 `Stack<int>` 下所有对象（`s1`、`s2`）确实共享 `static`——但跨实例化参数组合（`Stack<int>` vs `Stack<string>`）不共享。",
    tags: ["static", "实例化", "独立类", "误解"],
  },
  {
    id: "ct-19",
    chapter: "cpp-templates",
    level: 4,
    question:
      "实现一个 `sum_all` 可变参数模板——接受任意数量的算术类型参数，返回它们的和。要求：(1) 用折叠表达式（C++17）写一个版本；(2) 用递归展开写另一个版本；(3) 比较两种实现的优劣。",
    answer:
      "```cpp\n// 版本 1：C++17 折叠表达式——一行搞定\ntemplate<typename... Args>\nauto sum_all(const Args&... args) {\n    return (args + ...);  // 一元右折叠\n}\n\n// 版本 2：递归展开（兼容 C++11/14）\ntemplate<typename T>\nT sum_all(const T &t) { return t; }  // base case\n\ntemplate<typename T, typename... Args>\nT sum_all(const T &first, const Args&... rest) {\n    return first + sum_all(rest...);\n}\n```\n比较：折叠表达式（C++17）——一行搞定、零运行时递归开销、编译器直接展开为加法链；递归展开（C++11）——需要 base case + 递归模板、运行时 N 次函数调用开销。递归版本有额外的 template 声明开销、代码更长——但在理解可变参数模板的机制时递归展开是核心思维模型。生产环境优先折叠表达式。",
    tags: ["折叠表达式", "递归展开", "sum_all", "C++17"],
  },
  {
    id: "ct-20",
    chapter: "cpp-templates",
    level: 4,
    question:
      "你接手了一个旧的代码库——`Matrix<T>` 用模板实现但类外成员函数定义被放在了 `.cpp` 中。现在使用方编译时报 undefined reference to Matrix<double>::invert()。解释这个错误的根因，给出两种修复方案，并分析各自的适用场景。",
    answer:
      "**根因**：模板不是普通函数——编译器编译 main.cpp 时在头文件里看到 Matrix<T> 的声明但看不到定义（定义在 matrix.cpp），无法实例化 Matrix<double>——标记为外部符号。而编译 matrix.cpp 时没有任何代码请求 Matrix<double> 的实例化——编译器不生成它。链接时两边都没生成→符号缺失。\n\n**修复方案一**（推荐·小中项目）：把全部定义移到头文件（matrix.h）。main.cpp 使用时看到完整定义→自动实例化。最简单、不会出错。适用场景：定义不大、或编译时间不是瓶颈。\n\n**修复方案二**（大项目控制编译时间）：保持 .cpp 分离 + 在 .cpp 底部显式实例化所有需要的版本：template class Matrix<double>; template class Matrix<float>;。使用方只能使用这些预定版本——新增类型需修改 .cpp 重新编译。适用场景：模板定义很重、或需要限制外部可用的类型组合（如只支持 float 和 double）。",
    tags: ["undefined reference", "代码组织", "显式实例化", "头文件"],
  },
];
