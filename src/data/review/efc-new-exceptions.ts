import type { ReviewQuestion } from "./types";

/** Effective C++ new、delete 与异常复习题 */
export const efcNewExceptionsQuestions: ReviewQuestion[] = [
  {
    id: "efc-new-exceptions-1",
    chapter: "efc-new-exceptions",
    level: 1,
    question: "new 表达式的执行过程是什么？分为哪两个阶段？",
    answer:
      "new 表达式分两个阶段执行：\n\n1. 分配内存：调用 `operator new`（或 `operator new[]`）分配足够大的原始内存。这一步不涉及任何对象构造。\n\n2. 构造对象：在分配的内存上调用构造函数，构造对象。\n\n完成后返回指向新对象的指针。\n\n关键细节：\n- 如果第一阶段成功但第二阶段（构造函数）抛异常，编译器会自动调用 `operator delete` 释放第一阶段分配的内存——不会泄漏\n- 这就是为什么 `operator new` 和 `operator delete` 必须成对出现\n- `delete` 表达式是反向的两阶段：先调用析构函数，再调用 `operator delete` 释放内存",
    tags: ["new", "operator new", "两阶段", "基本概念"],
  },
  {
    id: "efc-new-exceptions-2",
    chapter: "efc-new-exceptions",
    level: 2,
    question:
      "条款 49 介绍 new-handler。什么是 new-handler？它如何帮助处理内存不足？",
    answer:
      "new-handler 是当 `operator new` 无法满足内存分配请求时调用的函数，通过 `set_new_handler` 设置。\n\n```cpp\nvoid outOfMemory() {\n  std::cerr << \"内存不足\" << std::endl;\n  std::abort();\n}\nstd::set_new_handler(outOfMemory);\n```\n\nnew-handler 可以做四件事（条款 49）：\n\n1. 释放更多内存：如果程序预留了一块「应急内存」，new-handler 可以释放它，让 `operator new` 重试分配。\n\n2. 安装不同的 new-handler：如果当前 handler 无法解决问题，可以换一个更激进的 handler（比如下一个 handler 直接 abort），然后返回让 `operator new` 重试。\n\n3. 卸载 new-handler：`set_new_handler(nullptr)` 让 `operator new` 在内存不足时直接抛 `bad_alloc` 异常。\n\n4. 抛出 `bad_alloc` 异常：直接抛异常，不被 `operator new` 捕获。\n\n5. 不返回：调用 `abort()` 或 `exit()` 直接终止程序。\n\n类专属 new-handler（RAII 模式）：\n- 某个类可能需要自己的 new-handler（如 `Widget` 在内存不足时释放自己的缓存）\n- 用 RAII 类在构造时保存全局 new-handler 并安装类专属 handler，析构时恢复\n- 这保证了异常安全——即使构造抛异常，handler 也会被恢复",
    tags: ["条款49", "new-handler", "set_new_handler", "内存不足", "bad_alloc"],
  },
  {
    id: "efc-new-exceptions-3",
    chapter: "efc-new-exceptions",
    level: 3,
    question:
      "条款 51 说「编写 new 和 delete 时需固守常规」。自定义 `operator new` 和 `operator delete` 需要遵守哪些规则？",
    answer:
      "自定义 `operator new` 需要遵守的常规（条款 51）：\n\n1. 正确返回内存：成功时返回指向足够大内存的指针\n\n2. 内存不足时调用 new-handler：循环调用 new-handler 并重试分配，直到成功或 handler 抛异常/abort\n\n3. 处理零字节请求：`new` 请求 0 字节时也应返回合法指针（C++ 规定 `operator new(0)` 返回非空指针，通常当作 1 字节处理）\n\n4. 避免隐藏正常形式的 new：类内定义 `operator new` 会隐藏全局版本和其他重载版本。应确保所有标准形式的 `operator new` 都可用（声明并转发到全局版本）\n\n```cpp\nclass Widget {\npublic:\n  static void* operator new(std::size_t size) throw(std::bad_alloc) {\n    if (size == 0) size = 1;  // 处理零字节\n    while (true) {\n      void* p = ::operator new(size);  // 尝试分配\n      if (p) return p;\n      new_handler h = set_new_handler(0);  // 获取当前 handler\n      set_new_handler(h);\n      if (h) (*h)();  // 调用 handler\n      else throw std::bad_alloc();  // 无 handler 则抛异常\n    }\n  }\n  // 不要忘记声明标准形式\n  static void* operator new(std::size_t size, void* p) throw() {\n    return ::operator new(size, p);  // placement new 转发\n  }\n};\n```\n\n自定义 `operator delete` 需要遵守的常规：\n\n1. 安全处理空指针：`delete nullptr` 是合法的，`operator delete` 应检查并忽略空指针\n\n2. 恢复被隐藏的标准形式：如果类隐藏了全局 `operator delete`，需声明标准形式\n\n3. 匹配对应的 `operator new`：每个自定义 `operator new` 都应有对应的 `operator delete`（包括 placement 版本）\n\n4. 不抛异常：`operator delete` 应声明为 `noexcept`/`throw()`——析构和释放过程中抛异常是灾难性的",
    tags: ["条款51", "operator new", "operator delete", "自定义", "常规"],
  },
  {
    id: "efc-new-exceptions-4",
    chapter: "efc-new-exceptions",
    level: 4,
    question:
      "条款 52 说「写了 placement new 也要写 placement delete」。请综合论述 placement new/delete 的配对机制，以及不配对会导致什么问题？",
    answer:
      "placement new 的概念：\n- 普通 `new` 先分配内存再构造对象\n- placement new 在已有内存上构造对象，不分配内存\n- 经典形式：`new (ptr) T()`——在 `ptr` 指向的内存上构造 `T`\n\nplacement new/delete 的配对机制：\n\n1. 正常路径的配对\n- `new` 表达式匹配 `operator new` 的重载：参数签名决定匹配哪个\n- `delete` 表达式匹配 `operator delete` 的重载：参数签名必须与对应的 `operator new` 匹配\n\n2. 异常路径的配对（关键！）\n- 如果 `new` 表达式在分配内存后、构造对象时抛异常\n- 编译器需要调用对应的 `operator delete` 释放内存\n- 编译器用 `operator new` 的签名去查找匹配的 `operator delete`\n- 如果找不到匹配的 `operator delete`，编译器不调用任何 delete——内存泄漏\n\n不配对导致的问题：\n\n```cpp\nclass Widget {\npublic:\n  static void* operator new(std::size_t size, std::ostream& log) throw(std::bad_alloc) {\n    log << \"allocating\";\n    return ::operator new(size);\n  }\n  // 忘了写对应的 placement delete\n};\n\n// 正常使用不泄漏\nWidget* w = new (std::cerr) Widget;\ndelete w;  // 调用普通 operator delete，OK\n\n// 但如果构造函数抛异常——泄漏！\nWidget* w = new (std::cerr) Widget();  // 如果构造抛异常\n// 编译器找 operator delete(size, ostream)——找不到\n// 不调用任何 delete——内存泄漏\n```\n\n正确做法：\n```cpp\nclass Widget {\npublic:\n  static void* operator new(std::size_t size, std::ostream& log) throw(std::bad_alloc);\n  static void operator delete(void* p, std::ostream& log) throw() {  // 配对的 placement delete\n    log << \"deallocating\";\n    ::operator delete(p);\n  }\n  // 还需要普通版本\n  static void* operator new(std::size_t size) throw(std::bad_alloc);\n  static void operator delete(void* p) throw();\n};\n```\n\n名称隐藏的陷阱：\n- 类内定义任何 `operator new` 都会隐藏所有全局版本（包括标准 placement new）\n- 如果类用了 placement new 但没声明标准版本，基类的 placement new 会被隐藏\n- 解决：在类内声明所有标准形式并转发到全局版本\n\n```cpp\nclass Widget {\npublic:\n  // 自定义版本\n  static void* operator new(std::size_t size, std::ostream& log);\n  static void operator delete(void* p, std::ostream& log);\n\n  // 标准形式（避免隐藏）\n  static void* operator new(std::size_t size) { return ::operator new(size); }\n  static void operator delete(void* p) { ::operator delete(p); }\n  // placement new\n  static void* operator new(std::size_t size, void* p) { return ::operator new(size, p); }\n  static void operator delete(void* p, void*) {}  // placement delete 空实现\n};\n```\n\n综合结论：\n- placement new 和 placement delete 的配对是 C++ 内存安全的一个隐蔽但关键的机制\n- 正常 `delete` 不调用 placement delete——它只调用普通 `operator delete`\n- placement delete 仅在构造函数抛异常时被编译器调用——它是「异常路径的清理函数」\n- 不写 placement delete 不会导致正常使用出错，但会在构造抛异常时泄漏\n- 最佳实践：每写一个自定义 `operator new`（带额外参数），就写一个签名匹配的 `operator delete`，同时声明所有标准形式避免名称隐藏",
    tags: ["综合", "条款52", "placement new", "placement delete", "异常路径", "内存泄漏"],
  },
];
