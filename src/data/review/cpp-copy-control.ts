/** 复习题库 · C++ 拷贝控制（cpp-copy-control）。C++ Primer §13 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppCopyControlQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "ccc-1",
    chapter: "cpp-copy-control" as any,
    level: 1,
    question: "什么是浅拷贝？它为什么对管理堆资源的类是危险的？",
    answer:
      "浅拷贝只复制指针本身的值（地址），不复制指针指向的堆数据。后果：两个对象的指针指向同一块堆内存——修改一个影响另一个，析构时各自 `delete` 同一个指针，导致 **双重释放（double free）**——属于未定义行为，可能立即崩溃或静默损坏数据。编译器合成的拷贝控制成员对指针成员就是浅拷贝。",
    tags: ["浅拷贝", "双重释放", "合成拷贝"],
  },
  {
    id: "ccc-2",
    chapter: "cpp-copy-control" as any,
    level: 1,
    question: "拷贝构造函数和拷贝赋值运算符有什么区别？各自的函数签名是什么？",
    answer:
      "**拷贝构造函数**：用已有对象初始化**新对象**——新对象刚诞生，没有旧资源需要释放。签名：`ClassName(const ClassName&)`。**拷贝赋值运算符**：把已有对象赋值给另一个**已存在的对象**——需要先释放当前持有的资源，再复制新数据。签名：`ClassName& operator=(const ClassName&)`——返回 `*this` 引用以支持链式赋值。",
    tags: ["拷贝构造", "拷贝赋值", "函数签名"],
  },
  {
    id: "ccc-3",
    chapter: "cpp-copy-control" as any,
    level: 1,
    question: "如果没有为类定义析构函数，编译器合成的析构函数会做什么？什么时候必须自己写？",
    answer:
      "合成的析构函数：函数体为空，然后自动按声明顺序的**逆序**调用每个类类型成员的析构函数。对内置类型成员（int、指针）什么都不做。**必须自己写析构的场景**：类管理了需要手动释放的资源——有裸指针指向 `new` 出来的内存、有文件句柄需要 `fclose`、有网络连接需要关闭。一句话——如果析构需要 `delete` 某个成员，就必须自定义。",
    tags: ["析构函数", "合成析构", "资源管理"],
  },
  {
    id: "ccc-4",
    chapter: "cpp-copy-control" as any,
    level: 1,
    question: "什么是三法则（Rule of Three）？C++11 之后的五法则（Rule of Five）又加了什么？",
    answer:
      "**三法则**：如果一个类需要自定义析构函数、拷贝构造函数或拷贝赋值运算符中的任意一个，几乎一定需要全部三个——因为它们都是从不同入口做同一件资源管理工作。**五法则**（C++11）：在三法则基础上加上移动构造函数和移动赋值运算符——拷贝/移动/析构是一整套相互关联的资源管理决策，自定义了其中任意一个，全部五个都需要显式处理（写实现或 `= default` / `= delete`）。",
    tags: ["三法则", "五法则", "Rule of Three", "Rule of Five"],
  },
  {
    id: "ccc-5",
    chapter: "cpp-copy-control" as any,
    level: 1,
    question: "移动语义的核心思想是什么？移动操作通常有多快？",
    answer:
      "移动语义的核心思想：**不拷贝数据，只转移资源的所有权**。具体做法是把源对象的裸指针直接「偷」过来，然后把源对象指针置空。移动操作是 O(1) 常数时间——只复制一个指针值（8 字节），没有内存分配、没有逐字节拷贝。类比：不是复印整本书，而是把书直接递给你——书的所有权变了，原主手里没书了。",
    tags: ["移动语义", "O(1)", "所有权转移"],
  },
  {
    id: "ccc-6",
    chapter: "cpp-copy-control" as any,
    level: 1,
    question: "`= delete` 的作用是什么？和 `= default` 有什么区别？",
    answer:
      "`= delete`：明确告诉编译器「这个函数不存在」——任何调用尝试在**编译期**直接报错。用于禁止不应发生的操作——如禁止 `NonCopyable` 类的拷贝。`= default`：请求编译器「替我合成默认版本」——用在你想保留默认行为但编译器因你定义了其他特殊成员而不再自动生成的场景（如显式 `= default` 默认构造，当你已定义了其他构造时）。",
    tags: ["= delete", "= default", "阻止拷贝"],
  },

  // ── L2 理解：用法与区别 ──
  {
    id: "ccc-7",
    chapter: "cpp-copy-control" as any,
    level: 2,
    question: "拷贝赋值运算符的实现为什么推荐「先分配新→再释放旧→接管新」的三步走策略？如果先释放旧再分配新有什么问题？",
    answer:
      "**三步走策略**（先分配新→再释放旧→接管新）保证**异常安全**：如果新内存分配失败（`std::bad_alloc`），旧数据还在——对象仍然有效。先释放旧再分配新的问题：如果 `new` 抛异常，对象的指针已经变成野指针——既不指向旧数据（已 delete），也不指向新数据——对象处于崩溃状态。对自赋值场景（`a = a;`），三步走策略仍然正确——先分配旧数据的副本、再释放旧数据、再接管副本。",
    tags: ["拷贝赋值", "异常安全", "自赋值"],
  },
  {
    id: "ccc-8",
    chapter: "cpp-copy-control" as any,
    level: 2,
    question: "移动操作为什么应该标 `noexcept`？如果没标会有什么影响？",
    answer:
      "标准库容器（如 `vector`）在扩容时优先使用移动操作——因为它快。但 `vector` 必须保证**异常安全**：如果移动可能抛异常，扩容中途失败会导致部分元素已被移走、部分还在——容器处于不一致状态。所以 `vector` 只会用标了 `noexcept` 的移动操作——没标的宁可走更慢的拷贝。移动操作通常不分配内存、不调用可能抛异常的函数——所以它们天然就该标 `noexcept`，不标是性能损失。",
    tags: ["noexcept", "vector", "移动语义", "异常安全"],
  },
  {
    id: "ccc-9",
    chapter: "cpp-copy-control" as any,
    level: 2,
    question: "std::move 做了什么？调用 `std::move(a)` 后，`a` 处于什么状态？还能使用 `a` 吗？",
    answer:
      "`std::move` 本质是一个类型转换——把左值强制转成右值引用。**它本身不移动任何东西**——真正的移动由移动构造函数或移动赋值运算符执行。调用 `std::move(a)` 后，`a` 处于「有效但未指定」状态——可以安全析构（`delete nullptr` 合法）、可以重新赋值（`a = HasPtr('new')`），但不能假设它的成员还有什么值（移动实现可能把指针置空了）。**最佳实践**：`std::move` 是对代码读者的承诺「我以后不用它了」——遵守这个承诺，不要再读它的内容。",
    tags: ["std::move", "移动后状态", "右值引用"],
  },
  {
    id: "ccc-10",
    chapter: "cpp-copy-control" as any,
    level: 2,
    question: "什么情况下编译器会隐式删除合成的拷贝控制成员？举例说明。",
    answer:
      "① 类成员中有 `const` 数据成员——`const` 不能赋值，合成拷贝赋值被删除。② 类成员中有引用成员——引用不能重新绑定，合成拷贝赋值被删除。③ 类成员的类型本身删除了对应的拷贝控制成员——如成员是 `unique_ptr`，它删除了拷贝构造和拷贝赋值，导致整个类的合成拷贝控制也被删除。④ 类有自定义析构——编译器不会隐式删除拷贝，这是一个强烈信号「你应该也自定义拷贝」。",
    tags: ["合成拷贝", "= delete", "隐式删除"],
  },

  // ── L3 应用：代码级判断与用法 ──
  {
    id: "ccc-11",
    chapter: "cpp-copy-control" as any,
    level: 3,
    question:
      "下面 HasPtr 类的拷贝赋值有什么问题？\n```cpp\nHasPtr& HasPtr::operator=(const HasPtr &rhs) {\n    delete ps;\n    ps = new std::string(*rhs.ps);\n    i = rhs.i;\n    return *this;\n}\n```",
    answer:
      "两个问题：① **异常不安全**——先 `delete ps` 再 `new`：如果 `new` 抛 `std::bad_alloc`，`ps` 已变成野指针——对象处于崩溃状态。② **自赋值时未定义行为**——如果 `rhs` 就是 `*this`：`delete ps` 释放了自己的数据，然后 `*rhs.ps` 读的正是已释放的内存——undefined behavior。修法：先分配新内存再释放旧的——`auto *newp = new string(*rhs.ps); delete ps; ps = newp;`。",
    tags: ["拷贝赋值", "异常安全", "自赋值"],
  },
  {
    id: "ccc-12",
    chapter: "cpp-copy-control" as any,
    level: 3,
    question:
      "为下面这个管理动态数组的类补全五法则（拷贝构造/拷贝赋值/移动构造/移动赋值/析构）：\n```cpp\nclass IntArray {\npublic:\n    IntArray(std::size_t n) : data(new int[n]), size(n) {}\nprivate:\n    int *data;\n    std::size_t size;\n};\n```",
    answer:
      "```cpp\n// 拷贝构造\nIntArray(const IntArray &rhs) : data(new int[rhs.size]), size(rhs.size) {\n    std::copy(rhs.data, rhs.data + size, data);\n}\n// 拷贝赋值\nIntArray& operator=(const IntArray &rhs) {\n    if (this != &rhs) {\n        auto *new_data = new int[rhs.size];\n        std::copy(rhs.data, rhs.data + rhs.size, new_data);\n        delete[] data;\n        data = new_data;\n        size = rhs.size;\n    }\n    return *this;\n}\n// 移动构造\nIntArray(IntArray &&rhs) noexcept : data(rhs.data), size(rhs.size) {\n    rhs.data = nullptr;\n    rhs.size = 0;\n}\n// 移动赋值\nIntArray& operator=(IntArray &&rhs) noexcept {\n    if (this != &rhs) {\n        delete[] data;\n        data = rhs.data;\n        size = rhs.size;\n        rhs.data = nullptr;\n        rhs.size = 0;\n    }\n    return *this;\n}\n// 析构\n~IntArray() { delete[] data; }\n```",
    tags: ["五法则", "动态数组", "delete[]"],
  },
  {
    id: "ccc-13",
    chapter: "cpp-copy-control" as any,
    level: 3,
    question:
      "移动构造函数应该把源对象的哪些成员置为「安全状态」？为什么这个状态很重要？",
    answer:
      "源对象中所有指向堆资源的指针都应置为 `nullptr`，其他值类型成员保持原值即可（但不保证，具体取决于语义）。这个状态很重要因为：① **析构安全**——源对象离开作用域时析构函数执行 `delete ptr`，`delete nullptr` 合法且无事发生。如果没置空，源对象析构时就会 `delete` 已被移走的资源——双重释放。② **可重新赋值**——`source = HasPtr('new')` 时拷贝赋值会先 `delete` 当前 `ptr`（nullptr 安全），再分配新内存。",
    tags: ["移动构造", "移动后状态", "nullptr"],
  },
  {
    id: "ccc-14",
    chapter: "cpp-copy-control" as any,
    level: 3,
    question:
      "编写一个 `swap(HasPtr&, HasPtr&)` 函数——直接交换两个对象的 `ps` 指针，不拷贝 string 内容。这个 swap 比 `std::swap` 好在哪里？",
    answer:
      "```cpp\ninline void swap(HasPtr &lhs, HasPtr &rhs) {\n    using std::swap;\n    swap(lhs.ps, rhs.ps);  // 只交换指针——8 字节\n    swap(lhs.i, rhs.i);    // 交换 int——4 字节\n}\n```\n比 `std::swap` 好的地方：`std::swap` 实现为一次拷贝构造 + 一次拷贝赋值——两个 string 都要完整深拷贝（分配堆内存 + 复制全部字符）。自定义版本只交换两个指针本身——O(1) 时间，零内存分配，零字符拷贝。在大量交换的场景下（如排序算法）差距巨大。",
    tags: ["swap", "性能优化", "指针交换"],
  },
  {
    id: "ccc-15",
    chapter: "cpp-copy-control" as any,
    level: 3,
    question:
      "如果一个类只用了 `string`、`vector`、`shared_ptr` 这些标准库类型作为成员，没有裸指针——它需要自定义拷贝控制成员吗？为什么？",
    answer:
      "**不需要**。`string`、`vector`、`shared_ptr` 这些类自身已经正确实现了拷贝控制成员——它们的拷贝构造会做深拷贝、析构会释放资源、移动构造会高效转移。编译器为该类合成的拷贝控制成员会逐成员调用这些标准库类型的已有实现——结果是正确的。这是 **零法则（Rule of Zero）**——尽量让你的类靠标准库类型组合而成，不自己管理裸资源，从而不需要写任何拷贝控制成员。",
    tags: ["零法则", "Rule of Zero", "标准库"],
  },

  // ── L4 综合：场景选型与完整设计 ──
  {
    id: "ccc-16",
    chapter: "cpp-copy-control" as any,
    level: 4,
    question:
      "设计一个 `TextBlock` 类，内部用 `char*` 管理动态分配的 C 风格字符串。要求：(1) 支持构造、拷贝、移动、赋值；(2) 提供 `length()` 和 `c_str()` 方法；(3) 实现 `operator==` 比较内容；(4) 说明你的每个设计决策。",
    answer:
      "```cpp\nclass TextBlock {\npublic:\n    TextBlock(const char *s = \"\")\n        : data(new char[std::strlen(s) + 1]), len(std::strlen(s)) {\n        std::strcpy(data, s);\n    }\n    TextBlock(const TextBlock &rhs)\n        : data(new char[rhs.len + 1]), len(rhs.len) {\n        std::strcpy(data, rhs.data);\n    }\n    TextBlock& operator=(const TextBlock &rhs) {\n        if (this != &rhs) {\n            auto *nd = new char[rhs.len + 1];\n            std::strcpy(nd, rhs.data);\n            delete[] data;\n            data = nd;\n            len = rhs.len;\n        }\n        return *this;\n    }\n    TextBlock(TextBlock &&rhs) noexcept : data(rhs.data), len(rhs.len) {\n        rhs.data = nullptr;\n        rhs.len = 0;\n    }\n    TextBlock& operator=(TextBlock &&rhs) noexcept {\n        if (this != &rhs) {\n            delete[] data;\n            data = rhs.data;\n            len = rhs.len;\n            rhs.data = nullptr;\n            rhs.len = 0;\n        }\n        return *this;\n    }\n    ~TextBlock() { delete[] data; }\n    std::size_t length() const { return len; }\n    const char* c_str() const { return data; }\n    bool operator==(const TextBlock &rhs) const {\n        return std::strcmp(data, rhs.data) == 0;\n    }\nprivate:\n    char *data;\n    std::size_t len;\n};\n```\n设计决策：① 用 `new char[]` → 析构必须 `delete[]`（不是 `delete`）② 拷贝赋值先分配新再释放旧——异常安全 ③ 移动操作标 `noexcept` ④ 移动后 `rhs.data = nullptr`——源可安全析构 ⑤ `c_str()` 返回 `const char*`——不给外部修改权。",
    tags: ["五法则", "C风格字符串", "类设计"],
  },
  {
    id: "ccc-17",
    chapter: "cpp-copy-control" as any,
    level: 4,
    question:
      "下面三个类的设计意图：(A) 数据库连接类——连接不可被共享也不可被拷贝 (B) 日志记录器——多个组件可以共享同一个日志器 (C) 临时计算结果缓存——函数内部创建、返回给调用方——调用方接管所有权。为每个类选择拷贝/移动策略：哪些 =delete？哪些 =default？需不需要移动？为什么？",
    answer:
      "**(A) 数据库连接类**：拷贝构造和拷贝赋值 `= delete`——连接不可复制。保留移动——资源可以从创建者转移给别人。析构关闭连接。**(B) 日志记录器**：用 `shared_ptr` 管理，拷贝和移动都 `= default`——让 shared_ptr 的语义自然处理共享。析构 `= default`。这就是零法则（Rule of Zero）的实例——类本身不管理裸资源。**(C) 临时结果缓存**：拷贝 `= delete` 或自定义深拷贝（看数据量）。保留移动——工厂函数 `return` 时自动走移动，零开销。移动后源为空。如果数据小（几 KB），也可以保留拷贝让调用方灵活。数据大且不可共享：只保留移动，删除拷贝。",
    tags: ["场景选型", "= delete", "= default", "所有权设计"],
  },
  {
    id: "ccc-18",
    chapter: "cpp-copy-control" as any,
    level: 4,
    question:
      "你写了一个管理堆资源的类，正确实现了五法则。在 `vector` 中用它——`v.emplace_back(...)` 扩容时是走移动还是拷贝？如果不确定，设计一个实验来验证你的答案，并解释为什么 `noexcept` 在这里是关键。",
    answer:
      "如果移动构造和移动赋值都标了 `noexcept`，`vector` 扩容时**优先走移动**。验证实验：给类的移动构造加一行 `cout << \"moved\\n\"`、拷贝构造加一行 `cout << \"copied\\n\"`，然后 `vector<MyClass> v; for(int i=0;i<10;i++) v.emplace_back(...);`——观察输出。如果只有 `moved` 没有 `copied`，说明移动生效。如果 `noexcept` 被移除后出现了 `copied`，确认了 `noexcept` 的关键作用。原理：`vector` 扩容时复制/移动元素到新空间——如果移动不抛异常（标了 `noexcept`），`vector` 就用移动（O(1) 快）；否则用拷贝（O(n) 慢但安全）来保证异常安全。",
    tags: ["vector", "noexcept", "移动语义", "扩容"],
  },
  {
    id: "ccc-19",
    chapter: "cpp-copy-control" as any,
    level: 4,
    question:
      "判断对错并解释：\"只要类定义了析构函数，编译器就不会再合成拷贝构造和拷贝赋值。所以定义析构后必须手写拷贝控制。\"",
    answer:
      "**错**。编译器仍然会合成拷贝构造和拷贝赋值——C++11 把这种行为标记为 deprecated（不推荐），但合成的版本**仍然可用**。然而这正是一个强烈的危险信号：你定义了析构说明类管理了资源（要在析构中释放），但合成的拷贝只做浅拷贝——这就是本章开头 `HasPtr` 的翻车案例。所以这句话的**精神是对的**但**技术描述不准**：编译器没有不合成，是你不该依赖合成的版本——你必须手写深拷贝（或显式 `= delete` 禁止拷贝）。这也是三法则的来源：析构 → 必须也管拷贝。",
    tags: ["合成拷贝", "析构", "三法则"],
  },
  {
    id: "ccc-20",
    chapter: "cpp-copy-control" as any,
    level: 4,
    question:
      "你接手了一个旧代码库中的 `Buffer` 类：内部用 `unsigned char*` 管理堆缓冲区。它的析构函数存在，拷贝构造和拷贝赋值不存在。请设计一个安全的重构计划（不修改现有调用方代码），让这个类满足五法则，同时解释每一步的原因和风险。",
    answer:
      "**重构计划**：\n1. **先加拷贝构造**：`Buffer(const Buffer &rhs)`——分配新堆缓冲区、`memcpy` 数据。原因——当前浅拷贝是所有 bug 的根源。风险——如果有代码依赖了浅拷贝的「共享」行为（错误设计），重构会暴露这些代码的 bug。\n2. **再加拷贝赋值**：三步走（先分配新→释放旧→接管新）。原因——`b1 = b2` 当前是合成版本、浅拷贝、双重释放。风险——如果有自赋值路径未覆盖。\n3. **加移动构造+移动赋值**：标 `noexcept`，接管指针。原因——提升性能，让 vector 扩容走移动。风险——低，两个都是净新增。\n4. **删除不必要的默认构造（如果没有）**：如果 Buffer 必须有大小参数，删掉默认构造——`Buffer() = delete`。\n5. **加 size 成员**：连同 `data` 一起管理，拷贝/移动时一起操作。\n6. **运行全部单元测试 + valgrind memcheck**：验证无泄漏、无双重释放。",
    tags: ["重构", "五法则", "遗留代码", "Buffer"],
  },
];
