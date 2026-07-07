import type { ReviewQuestion } from "./types";

/** C++ 高性能编程 · 模板元编程性能复习题 */
export const chpTemplateMetaprogrammingQuestions: ReviewQuestion[] = [
  {
    id: "chp-template-metaprogramming-1",
    chapter: "chp-template-metaprogramming",
    level: 1,
    question: "模板元编程如何把计算挪到编译期？这带来什么性能收益？",
    answer:
      "模板是图灵完备的编译期语言：编译器在实例化模板时执行模板代码，结果直接编进二进制。利用这一点可把运行期计算挪到编译期——如用模板递归算阶乘、用 `constexpr` 函数算常量、用 `if constexpr` 分支裁剪。\n\n性能收益：\n1. 零运行期开销：编译期算好的常量直接内联为立即数，运行期不计算。如 `factorial<5>::value` 编译后就是字面量 120。\n2. 消除分支：`if constexpr` 在编译期裁剪不需要的分支，运行期无跳转、无分支预测失败。\n3. 激进内联与特化：模板为每个类型生成专门代码，编译器能针对具体类型做内联、向量化，比运行期泛化（虚函数/类型标签）快。\n4. 类型安全零成本抽象：如 `std::array`、`std::span` 编译期已知大小/布局，无运行期开销却比 C 数组更安全。\n\n代价：编译时间变长、二进制变大（代码膨胀），需权衡。",
    tags: ["模板元编程", "编译期", "constexpr", "零开销"],
  },
  {
    id: "chp-template-metaprogramming-2",
    chapter: "chp-template-metaprogramming",
    level: 2,
    question: "什么是模板的代码膨胀（code bloat）？它为什么既是性能优势又是性能隐患？",
    answer:
      "代码膨胀指模板为每个不同的模板参数生成一份独立代码。如 `vector<int>`、`vector<float>`、`vector<string>` 会生成三份独立的 `push_back`/`operator[]` 等成员函数，二进制里有三段几乎相同的机器码。\n\n既是优势又是隐患：\n\n优势面：每份特化都针对具体类型优化——编译器能看到确切类型，敢内联、向量化、消除虚调用。`vector<int>::push_back` 能用 SIMD memmove，而一个泛化的「运行期类型分发」版本做不到。这是「零成本抽象」的来源。\n\n隐患面：\n1. 指令缓存压力：二进制膨胀后，热路径代码可能塞不进指令缓存（L1i），icache miss 让 CPU 等取指。函数虽快，但取指慢，净亏。\n2. 编译时间：N 个类型实例化 N 份，编译慢、占内存。\n3. 重复代码：不同编译单元可能各自实例化同一份，链接期才去重，中间浪费。\n\n缓解：把与类型无关的部分抽到非模板基类或独立函数（如 `vector` 的内存管理用 `void*` 实现核心、模板外壳转发）；用 `extern template` 显式实例化减少重复；剖析确认 icache 不是瓶颈前别过度合并。取舍：保留「热点的特化」拿性能，「冷路径的泛化」合并省体积。",
    tags: ["代码膨胀", "指令缓存", "extern template", "权衡"],
  },
  {
    id: "chp-template-metaprogramming-3",
    chapter: "chp-template-metaprogramming",
    level: 3,
    question: "`if constexpr`、`#if` 预处理、运行时 `if` 三者都能做条件分支，它们在性能与工程上有什么区别？该用哪个？",
    answer:
      "三者区别：\n\n`#if`（预处理）：编译前文本裁剪，按宏条件决定哪些代码进入编译。完全无运行期开销，也无可调试性（被裁掉的代码根本不编译）。适合跨平台/构建配置（如 `#ifdef _WIN32`），不适合业务逻辑——它是文本替换，不感知类型与作用域，易出错。\n\n运行时 `if`：条件在运行期求值，两分支都编译进二进制，CPU 动态跳转。开销：分支预测失败时冲刷流水线（~10–20 周期）；且两分支代码都在，可能挤占指令缓存。适合条件依赖运行期值（如 `if (mode == FAST)`）的场景。\n\n`if constexpr`（C++17）：编译期按常量表达式裁剪，不成立的分支根本不实例化（不编译）。零运行期分支开销，又类型安全（在模板内可按类型条件写不同代码，如 `if constexpr (is_integral_v<T>)`）。适合条件依赖编译期已知信息（类型、模板参数、`constexpr` 变量）。\n\n选用原则：\n- 依赖构建/平台 → `#if`。\n- 依赖运行期值 → 运行时 `if`。\n- 依赖编译期已知信息（类型/常量）→ `if constexpr`，既零开销又比 `#if` 安全可调试。\n\n性能上 `if constexpr` 能消除模板里「为错误类型写的分支」，让特化更精简、icache 更友好。模板内优先 `if constexpr` 替代 SFINAE/标签分发。",
    tags: ["if constexpr", "预处理", "运行时分支", "应用"],
  },
  {
    id: "chp-template-metaprogramming-4",
    chapter: "chp-template-metaprogramming",
    level: 4,
    question: "综合分析：「模板是零成本抽象」这句话在什么意义上成立，什么意义上不成立？工程中如何拿捏模板化的度？",
    answer:
      "成立的意义（运行期成本）：\n- 相比运行期多态（虚函数、类型标签、`any`），模板把分发挪到编译期，运行期无间接调用、无类型检查。`vector<int>` 与手写 `int` 数组运行期一样快，比「存 `vector<void*>`+运行期类型转换」快。在这个意义上「抽象的运行期成本为零」成立。\n- `constexpr`/`if constexpr` 把计算与分支挪到编译期，运行期确实零成本。\n\n不成立的意义（编译期与间接成本）：\n1. 编译期成本：模板实例化消耗编译时间与内存，大型模板库（Boost、Folly）让构建变慢，影响开发效率与 CI。\n2. 代码膨胀：每类型一份代码，二进制变大，icache 压力上升。当热点函数因膨胀塞不进 L1i，运行期反而变慢——「零成本」变成「负成本」。\n3. 可读性与调试：模板错误信息难懂、栈帧难看，维护成本高，是隐性「人力开销」。\n4. 抽象泄漏：复杂模板元编程（如表达式模板、CRTP）一旦写错，定位极难，工程风险大。\n\n拿捏的度：\n1. 热点优先模板化：剖析证实的运行期热点，用模板消多态/挪编译期，收益最大。冷路径用运行期多态更省体积、更好维护。\n2. 控制实例化种类：同义类型用 `using`/`static_cast` 而非新模板；与类型无关的逻辑抽到非模板基类（`vector` 内核用 `void*`，模板外壳薄）。\n3. 用 `extern template` 显式实例化集中编译，减少重复。\n4. 优先现代轻量设施：`if constexpr`、`concepts`、`constexpr` 函数比老式 TMP（递归模板、SFINAE）更易读、编译更快。\n5. 设编译时间预算：模板化后用 build timing 工具看编译是否超标，超标就回退部分模板。\n\n本质：「零成本抽象」承诺的是「运行期不比手写慢」，但前提是不计编译期与工程成本。工程上模板化是投资：热点值得投，冷路径与过度泛化是负债。拿捏标准始终是剖析数据 + 编译/维护成本权衡，而非教条地「能模板就模板」。",
    tags: ["综合", "零成本抽象", "代码膨胀", "编译期成本", "工程权衡"],
  },
];
