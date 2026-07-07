import type { ReviewQuestion } from "./types";

/** Modern C++ Design 全书学习地图复习题 */
export const mcdLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "mcd-learning-map-1",
    chapter: "mcd-learning-map",
    level: 1,
    question: "Modern C++ Design 全书分为哪三大板块？各包含哪些章节？",
    answer:
      "全书围绕「编译时多态」一条主线，分为三大板块：\n\n1. Policy 与 Typelist（第 1-2 章）：Policy 设计（把策略做成模板参数，组合优先于继承）、Typelist（用递归模板把类型串成编译时链表）。这是全书的方法论基石。\n2. Loki 组件（第 4-6 章）：智能指针设计（SmartPtr 四维策略）、小对象分配（SmallObject 分桶 + 空闲链表）、广义仿函数（Functor 类型擦除统一可调用对象）。把 Policy/Typelist 落地成可复用组件。\n3. 设计模式实现（第 7-10 章）：Singleton（三策略可定制单例）、对象工厂（typelist 驱动注册创建）、抽象工厂（typelist 自动生成接口）、总复习。用前面工具重写经典模式。\n\n记忆线索：Policy 筑基，Typelist 作骨，Loki 落地，模式收口。",
    tags: ["学习地图", "全书结构", "三大板块"],
  },
  {
    id: "mcd-learning-map-2",
    chapter: "mcd-learning-map",
    level: 2,
    question: "为什么说 Policy 与 Typelist 是后续 Loki 组件与设计模式实现的基石？跳过它们直接学组件会遇到什么困难？",
    answer:
      "Policy 与 Typelist 提供了全书的两套基本工具：\n\n1. Policy 设计是一种「编译时策略注入」范式——把可变行为抽象成模板参数，用组合取代继承层级，在编译期定型、零虚函数开销。Loki 几乎每个组件（SmartPtr、Singleton、Functor）都把自己的可变维度暴露成 Policy 参数。\n2. Typelist 是「类型级数据结构」——用 `Typelist<Head, Typelist<Tail, NullType>>` 的递归模板把类型串成链表，再配 Length/TypeAt/Append/Erase 等编译时算法。对象工厂、抽象工厂用它来批量处理一组类型。\n\n跳过它们直接学组件的困难：\n- SmartPtr 的 `SmartPtr<T, Ownership, Conversion, Checking, Storage>` 看起来像五个模板参数乱炖，不懂 Policy 设计就不知道为什么能把维度拆开、为什么零开销。\n- 抽象工厂「一份 typelist 自动生成一组 Make 接口」完全依赖 Typelist 的递归展开，不懂 Typelist 就读不懂接口是怎么冒出来的。\n- 这两块是后续所有组件的「语法」，跳过等于带着语法盲区读文章。",
    tags: ["Policy 设计", "Typelist", "基石", "学习路径"],
  },
  {
    id: "mcd-learning-map-3",
    chapter: "mcd-learning-map",
    level: 3,
    question: "推荐的全书阅读路径是什么？如果先学设计模式实现（第 7-10 章）再学 Policy 与 Typelist，会有什么问题？",
    answer:
      "推荐路径：Policy 设计 → Typelist → Loki 组件（智能指针、小对象、Functor）→ 设计模式实现 → 总复习。\n\n三阶段说明：\n\n1. 打工具底（Policy + Typelist）：先掌握把行为做成模板参数、把类型做成链表的两种编译时手段，建立「编译时多态」的直觉。\n2. 学 Loki 组件：在工具基础上看它们如何落地成可复用库，理解 Policy 如何参数化真实组件。\n3. 学设计模式：综合运用 Policy + Typelist 重写 Singleton/工厂等经典模式，看模板如何消灭样板代码。\n\n先学设计模式再学工具的问题：\n- SingletonHolder 的三策略模板签名、AbstractFactory 基于 typelist 的接口自动生成，都需要 Policy/Typelist 语法才能读懂，反过来学会因为缺前置概念而卡壳。\n- 设计模式章是「应用题」，没有工具就看不到「为什么这样设计」，容易把模板技巧误记成黑魔法。\n- 总复习思维导图以 Policy/Typelist/Loki/模式四大分支收束，顺序错乱会让收束图无法对应认知。",
    tags: ["学习路径", "推荐顺序", "设计模式"],
  },
  {
    id: "mcd-learning-map-4",
    chapter: "mcd-learning-map",
    level: 4,
    question: "全书的核心哲学「编译时多态 / 零开销抽象」如何贯穿三大板块？这套思想对现代 C++（C++11 之后）有何影响？",
    answer:
      "核心哲学：把能在编译期决定的事绝不留到运行期——用模板在编译时完成策略选择、类型遍历、代码生成，换取零虚函数开销与强类型安全。\n\n贯穿三大板块：\n1. Policy 与 Typelist 是「编译时多态」的两套原语：Policy 让行为在实例化时定型（替代虚函数分派），Typelist 让类型集合在编译时可遍历（替代运行时容器）。\n2. Loki 组件用这些原语构造编译时可定制的库：SmartPtr 把四个维度做成模板参数，编译期生成定制指针，无虚函数；SmallObject 用模板固定大小实现 O(1) 分配；Functor 用类型擦除但调用路径在编译期定型。\n3. 设计模式实现用原语重写经典模式：Singleton/工厂的行为在编译期由策略决定，消除了运行时分支与样板代码。\n\n对现代 C++ 的影响：\n- Policy 思想被 C++11 的别名模板、C++14/17 的变量模板与 `if constexpr` 进一步简化，策略类演变为现代的 concept/constraints（C++20）。\n- Typelist 的递归模板手法被 C++11 的可变参数模板（parameter pack）与折叠表达式取代，但「类型级数据结构」思路不变。\n- 「编译时多态」成为现代 C++ 的主流方向：constexpr、模板元编程、concepts、ranges 都延续这条线。\n- Alexandrescu 的「组合优于继承、策略参数化」直接启发了标准库的分配器策略、执行器（executors）等设计。",
    tags: ["编译时多态", "零开销抽象", "现代 C++", "核心哲学"],
  },
];
