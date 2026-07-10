import type { ReviewQuestion } from "./types";

/** Modern C++ Design 全书总复习题 */
export const mcdFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "mcd-final-review-1",
    chapter: "mcd-final-review",
    level: 1,
    question: `用一句话概括 Modern C++ Design 四大分支各自的核心目标。`,
    answer:
      `1. Policy 与 Typelist（第 1-3 章）：用 Policy 解耦正交设计维度，用 Typelist 在编译时操作类型集合——为后续所有组件提供元编程基础设施。\n2. Loki 组件（第 4-6 章）：用 Policy + Typelist 实现智能指针、小对象分配器、广义仿函数三大实用组件，展示 Policy 化设计如何造出可定制的库组件。\n3. 设计模式实现（第 7-9 章）：用模板元编程重新实现 Singleton、对象工厂、抽象工厂，把 GoF 模式从运行时多态升级为编译时生成。\n4. 编译时哲学（贯穿全书）：把尽可能多的决策推到编译时，用模板做类型级计算，零运行时开销换取类型安全与性能。\n\n一条主线：从「Policy/Typelist 元编程基础设施」到「Loki 组件应用」到「设计模式自动化」，层层递进——前者是工具，中者是工具的实战，后者是工具对经典模式的重新表达。`,
    tags: ["总复习", "四大分支", "主线"],
  },
  {
    id: "mcd-final-review-2",
    chapter: "mcd-final-review",
    level: 2,
    question: `Policy 设计如何贯穿 Loki 各组件？以 SmartPtr 和 SingletonHolder 为例说明。`,
    answer:
      `Policy 贯穿 Loki 的方式：\n\n每个 Loki 组件都是一个「Host 模板类」，接收若干 Policy 模板参数，把「正交的设计维度」拆成可独立替换的策略。使用者按场景组合 Policy，得到定制化组件，无需继承或修改源码。\n\nSmartPtr 的 Policy 维度：\n\`\`\`cpp\ntemplate<\n  typename T,\n  class OwnershipPolicy = RefCounted,\n  class ConversionPolicy = DisallowConversion,\n  class CheckingPolicy = AssertCheck,\n  class StoragePolicy = DefaultSPStorage\n> class SmartPtr;\n\`\`\`\n四个 Policy 分别管：所有权（独占/共享/转移）、转换（是否允许隐式转 raw pointer）、检查（空指针检查时机）、存储（如何存指针）。组合得到 unique_ptr 风格、shared_ptr 风格、深拷贝智能指针等各种变体——同一套核心代码，四种正交维度任意搭配。\n\nSingletonHolder 的 Policy 维度：\n\`\`\`cpp\ntemplate<\n  typename T,\n  template<class> class CreationPolicy = CreateUsingNew,\n  template<class> class LifetimePolicy = DefaultLifetime,\n  template<class> class ThreadingModel = ObjectLevelLockable\n> class SingletonHolder;\n\`\`\`\n三个 Policy 分别管：创建（new/malloc/static）、生命周期（默认/Phoenix/Longevity）、线程模型（单线程/对象锁/类锁）。组合得到各种单例变体——Meyers 风格、Phoenix 风格、线程安全单例等。\n\n共同点：\n1. 每个组件都把「变化的维度」识别为 Policy，而非写死。\n2. Policy 是模板参数（通常 template template parameter），编译时组合，零虚函数开销。\n3. 默认 Policy 提供常用行为，使用者只需覆盖需要定制的维度。\n4. Policy 之间正交——换所有权不影响检查策略，换创建不影响线程模型。\n\n这就是 Policy 化设计的威力：用一个 Host 类 + N 个 Policy 维度，覆盖 N 维组合空间，远比继承层次灵活。Modern C++ Design 全书所有组件都遵循这一范式，Policy 是 Loki 的灵魂。`,
    tags: ["Policy", "SmartPtr", "SingletonHolder", "贯穿", "组件设计"],
  },
  {
    id: "mcd-final-review-3",
    chapter: "mcd-final-review",
    level: 3,
    question: `Typelist 在 Loki 各组件中扮演什么角色？为什么说它是「Loki 的骨架」？`,
    answer:
      `Typelist 在 Loki 中的角色：编译时类型容器，让组件能「对一组类型做批量操作」——遍历、索引、查找、变换——全部在编译时完成，零运行时开销。它是 Loki 元编程的骨架，几乎所有自动化都依赖它。\n\n在各组件中的应用：\n\n1. GenFactory（对象工厂）：用 typelist 列出所有派生类型，自动生成「索引 → 创建函数」映射，省手写 Register 和 switch-case。\n\n2. AbstractFactory（抽象工厂）：用 typelist 列出所有产品基类，通过 GenScatterHierarchy 自动生成 N 个 Make 方法接口；ConcreteFactory 用对应具体类 typelist 自动实现这些方法。\n\n3. Functor（广义仿函数）：用 typelist 表示函数签名 \`Functor<R(Args...)>\`，内部用 typelist 操作参数类型，支持任意参数数量的统一封装。\n\n4. 小对象分配器：用 typelist 管理不同 blockSize 的分配器族（虽非核心，但分桶策略可用 typelist 表达）。\n\n5. 智能指针：用 typelist 处理多类型转换（如允许 SmartPtr<Derived> 转 SmartPtr<Base> 的类型链检查）。\n\n为什么是骨架：\n\n1. 连接 Policy 与组件：Policy 决定单点行为，typelist 决定「批量行为」——工厂造一族对象、抽象工厂造一族产品、仿函数处理一组参数，都靠 typelist 把「多个类型」当作一等公民操作。\n\n2. 实现编译时自动化：typelist 让 Loki 能「写一次模板，自动生成 N 个变体」——工厂的 N 个创建分支、抽象工厂的 N 个 Make 方法、仿函数的 N 参数支持，都是 typelist 递归实例化的产物。\n\n3. 零开销抽象：typelist 是编译时结构，不存在运行时对象，所有操作在类型级完成，运行时只剩生成的代码——这是「用编译时间换运行时性能与类型安全」的极致。\n\n4. 模板元编程基石：typelist 是 Loki 元编程的「链表」，所有更复杂的元函数（TypeAt、Length、Append、Erase）都建立在它之上，类比运行时容器对算法的意义。\n\n没有 typelist，Loki 的工厂要手写、抽象工厂要手写、仿函数要为每个参数数量特化——typelist 是把这些自动化串起来的骨架。C++11 后变参模板 \`template<typename... Ts>\` 取代了 typelist，但思想完全一致——typelist 是变参模板的 C++03 手工版。`,
    tags: ["Typelist", "骨架", "GenFactory", "AbstractFactory", "Functor"],
  },
  {
    id: "mcd-final-review-4",
    chapter: "mcd-final-review",
    level: 4,
    question: `Modern C++ Design 对后续 C++ 标准和现代 C++ 设计有何影响？今天读这本书还有价值吗？`,
    answer:
      `对 C++ 标准与设计的影响：\n\n1. 模板元编程普及：Modern C++ Design 是第一本系统讲解 C++ 模板元编程的书，把 typelist、Policy、编译时计算从「少数专家的奇技淫巧」变成可学习的工程方法，深刻影响了 Boost.MPL、Boost.Tuple、Boost.Fusion 等库。\n\n2. Policy 化设计：Policy 思想渗透进现代 C++——std::allocator_traits、std::char_traits、std::pointer_traits 都是 Policy 化设计；std::execution（C++26）的执行策略也是 Policy 思路。Policy 让标准库组件可定制而不需继承。\n\n3. Typelist → 变参模板：Loki typelist 是 C++11 变参模板 \`template<typename... Ts>\` 的前身。变参模板把 typelist 的递归链表变成语言原生支持，元编程大幅简化。std::tuple、std::variant、std::optional 都继承自 typelist 思想。\n\n4. 智能指针标准化：Loki SmartPtr 的 Policy 维度（所有权/检查/存储）影响了 std::unique_ptr（独占所有权）、std::shared_ptr（引用计数）、std::weak_ptr（观察者）的设计。标准版简化了 Policy 组合，但核心维度一致。\n\n5. 小对象分配 → pmr pool：Loki 小对象分配器思想体现在 std::pmr::synchronized_pool_resource / unsynchronized_pool_resource，标准化了「分桶 + 空闲链表」的小对象优化。\n\n6. Functor → std::function：Loki Functor 是 std::function 的直系前身，类型擦除 + handle/impl 结构被标准继承，加上移动语义和 SBO 更高效。\n\n7. 编译时哲学 → constexpr/概念：Modern C++ Design「把决策推到编译时」的哲学在 C++14/17/20 的 constexpr、consteval、概念、模板约束里全面强化，编译时计算能力远超 Loki 时代。\n\n今天读这本书的价值：\n\n1. 学元编程思想：typelist、Policy、递归模板实例化是理解现代变参模板、概念、constexpr 的思想基础。读 Loki 能搞懂「为什么变参模板这样设计」。\n\n2. 学设计模式与模板的结合：GoF 模式用模板元编程重新实现，是把「运行时多态」升级为「编译时生成」的经典示范，对理解现代 C++ 的零开销抽象极有启发。\n\n3. 学 Policy 化设计：Policy 是比继承更灵活的组合方式，现代 C++ 库设计仍大量使用，读 Loki 能掌握这一范式。\n\n4. 理解标准库内部：std::function、std::tuple、std::shared_ptr 的实现思路都能在 Loki 里找到原型，读 Loki 等于读「标准库的前世」。\n\n5. 局限：Loki 的具体实现（宏 typelist、裸指针、无移动）已过时，生产代码应改用现代 C++。但思想不朽——它是从 C++98 走向现代 C++ 的桥梁，读它能理解现代 C++「为什么这样设计」的来龙去脉。\n\n一句话：Modern C++ Design 是 C++ 模板元编程的奠基之作，思想被现代标准全面继承，实现已被现代语法全面超越——读思想、弃实现，是今天读它的正确姿势。`,
    tags: ["总复习", "现代影响", "变参模板", "Policy", "std::function", "价值"],
  },
];
