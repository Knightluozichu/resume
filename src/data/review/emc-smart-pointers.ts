import type { ReviewQuestion } from "./types";

/** 条款 7-10 迈向现代 C++ 与智能指针迁移复习题 */
export const emcSmartPointersQuestions: ReviewQuestion[] = [
  {
    id: "emc-smart-pointers-1",
    chapter: "emc-smart-pointers",
    level: 1,
    question: "从裸指针迁移到智能指针，unique_ptr、shared_ptr、weak_ptr 分别承担什么角色？",
    answer:
      "三种智能指针取代裸 new/delete，按所有权语义分工：\n\n1. unique_ptr：独占所有权。一个资源同一时刻只有一个 unique_ptr 持有，不可拷贝但可 move。零开销（与裸指针几乎等价），是管理动态资源的默认选择。\n2. shared_ptr：共享所有权。多个 shared_ptr 可指向同一资源，靠引用计数管理，计数归零才析构。代价是原子计数开销和循环引用风险。\n3. weak_ptr：观察者。指向 shared_ptr 管理的资源但不增引用计数，用 `lock()` 提升为 shared_ptr 安全访问。核心用途是打破 shared_ptr 循环引用。\n\n迁移原则：默认用 unique_ptr，需要多所有者才用 shared_ptr，循环引用处配 weak_ptr。unique_ptr 可隐式转 shared_ptr，反之不可，所以从独占开始是安全的降级起点。",
    tags: ["智能指针", "迁移", "unique_ptr", "shared_ptr", "weak_ptr"],
  },
  {
    id: "emc-smart-pointers-2",
    chapter: "emc-smart-pointers",
    level: 2,
    question: "条款 8 为什么建议用 nullptr 而非 0 或 NULL？0 和 NULL 在指针重载上有什么坑？",
    answer:
      "条款 8 建议用 nullptr 的核心原因是 0 和 NULL 在指针重载场景下会选错重载。\n\n坑在于：0 和 NULL 在 C++ 中本质是整型字面量。NULL 的具体定义由实现决定，常被定义为 `0L` 这样的整型。于是：\n```cpp\nvoid f(int);\nvoid f(void*);\nf(0);     // 调 f(int)，不是 f(void*)\nf(NULL);  // 结果由实现定义，常调 f(int)\nf(nullptr); // 明确调 f(void*)\n```\n\n程序员本意是传一个「空指针」给指针重载，但 0/NULL 会被解析成 int，匹配到 `f(int)` 重载，引发难以察觉的逻辑错误。nullptr 是 C++11 引入的独立类型 `std::nullptr_t`，不是整型，只能隐式转换为任意指针类型，不会误匹配整型重载。\n\n附加好处：nullptr 不存在整型到指针的隐式转换链，代码意图清晰；且能与模板推导配合（推导出真正的指针类型而非 int）。所以在所有「空指针」场景下一律用 nullptr。",
    tags: ["条款 8", "nullptr", "重载选择", "NULL"],
  },
  {
    id: "emc-smart-pointers-3",
    chapter: "emc-smart-pointers",
    level: 3,
    question:
      "条款 7 中「() 初始化」与「{} 花括号初始化」有何区别？为什么 Scott Meyers 仍建议优先用 {}？",
    answer:
      "区别：\n1. {} 花括号初始化（braced init）禁止「窄化转换」（narrowing conversion），如 `int x{3.14}` 会编译错误；而 `int x(3.14)` 会悄悄截断。\n2. {} 对大多数类型调用构造函数，但对 `std::vector` 等 `{a, b, c}` 会调用 initializer_list 构造函数，行为与 `vector<T>(n, val)` 不同。\n3. {} 是「最通用的初始化语法」：能初始化聚合、POD、带构造函数的类、甚至不可拷贝对象（如 atomic），而 () 不能初始化聚合。\n4. {} 不受「最烦人的解析」（most vexing parse）影响：`Widget w();` 会被解析成函数声明，`Widget w{};` 不会。\n\n建议优先用 {} 的理由：\n- 一处统一语法，避免 () 与 = 的混乱。\n- 禁窄化转换能消灭一类隐蔽 bug。\n- 不踩最烦人的解析。\n\n但要警惕 initializer_list 构造函数的强偏好：当类型有 initializer_list 构造函数时，`Widget w{1, 2}` 会优先匹配它而非 `Widget(int, int)`。这种情况下想调用非 initializer_list 构造函数，需用 `()` 形式。",
    tags: ["条款 7", "花括号初始化", "窄化转换", "最烦人的解析", "initializer_list"],
  },
  {
    id: "emc-smart-pointers-4",
    chapter: "emc-smart-pointers",
    level: 4,
    question:
      "条款 10 作用域枚举（scoped enum）相比传统枚举解决了哪些问题？请结合命名污染与底层类型说明。",
    answer:
      "条款 10 的作用域枚举（`enum class`）相比传统非作用域枚举（`enum`）解决三大问题：\n\n1. 命名污染：传统 enum 的枚举名泄漏到外层作用域。\n```cpp\nenum Color { Red, Green };     // Red/Green 污染外层\nenum class Color2 { Red, Green }; // 必须 Color2::Red，不污染\n```\n这导致两个传统 enum 不能有同名枚举值，而 scoped enum 可以。\n\n2. 隐式转换：传统 enum 会隐式转换为 int，容易写出 `if (color < 1.3)` 这种无意义比较；scoped enum 不能隐式转 int，必须显式 `static_cast<int>`，强制程序员明确意图。\n\n3. 底层类型：\n- 传统 enum 的底层类型由实现决定，不同编译器可能不同，影响 ABI 与前置声明。\n- scoped enum 默认底层类型是 int，且可显式指定：`enum class Status : std::uint32_t { Ok = 0, Err = 1 };`。指定底层类型后可前置声明，减少编译依赖。\n\n综合：scoped enum 通过「作用域化 + 禁隐式转换 + 可控底层类型」三件套，消灭了传统 enum 的命名冲突、误比较和 ABI 不确定性。现代 C++ 中新写的枚举应一律用 `enum class`。",
    tags: ["条款 10", "作用域枚举", "enum class", "命名污染", "底层类型"],
  },
];
