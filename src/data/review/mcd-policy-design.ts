import type { ReviewQuestion } from "./types";

/** Modern C++ Design Policy 设计复习题 */
export const mcdPolicyDesignQuestions: ReviewQuestion[] = [
  {
    id: "mcd-policy-design-1",
    chapter: "mcd-policy-design",
    level: 1,
    question: `Policy 设计的核心思想是什么？Policy 类与传统策略模式有何不同？`,
    answer:
      `Policy 设计的核心思想：把可变行为抽象成模板参数（Policy 类），让宿主类在编译时通过组合多个 Policy 来定型，而非在运行时通过虚函数分派。\n\nPolicy 类是一个暴露了约定接口（如 \`Create()\`、\`Check()\`）的类或模板，通常无数据成员（瘦 Policy）或携带少量配置（富 Policy）。宿主类以 Policy 为模板参数，通过继承或成员方式使用它：\n\`\`\`cpp\ntemplate <class CreationPolicy>\nclass Host : public CreationPolicy {\n  void DoSomething() {\n    T* p = CreationPolicy::Create();  // 编译时绑定\n  }\n};\n\`\`\`\n\n与策略模式（运行时策略对象 + 虚函数）的区别：\n1. 绑定时机：Policy 在编译期实例化时定型，策略模式在运行时通过指针/虚函数分派。\n2. 开销：Policy 调用可被内联，零虚函数开销；策略模式每次调用经过虚表。\n3. 灵活性：Policy 在编译期选定后不可换；策略模式可运行时替换。\n4. 类型安全：Policy 把行为编进类型，不同 Policy 组合产生不同类型，编译器可静态检查。`,
    tags: ["Policy 设计", "策略模式", "编译时绑定"],
  },
  {
    id: "mcd-policy-design-2",
    chapter: "mcd-policy-design",
    level: 2,
    question: `Policy 设计与基于虚函数的继承多态相比，各有何优劣？什么时候该用 Policy，什么时候该用继承？`,
    answer:
      `Policy 设计（编译时组合）：\n- 优势：调用可内联、零虚表开销；不同 Policy 组合生成不同具体类型，类型安全强；无运行时分支，便于编译器优化；可在栈上使用、无动态分配。\n- 劣势：Policy 在编译期固定，运行时不能换；不同 Policy 组合是不同类型，难以放进同一容器（需类型擦除）；模板导致代码膨胀与较长编译时间；接口约定靠文档/概念，错配错误信息可能晦涩。\n\n继承多态（运行时虚函数）：\n- 优势：运行时可替换实现；同基类指针可放进同一容器、跨模块传参；接口显式（抽象基类），错误信息友好；支持二进制边界（动态库）。\n- 劣势：虚函数调用不可内联、有虚表间接开销；运行时分支难以优化；派生类对象通常堆分配；菱形继承与多重继承复杂。\n\n选择原则：\n- 行为在编译期可确定、性能敏感、需要零开销抽象 → Policy（如 SmartPtr 的所有权策略、Singleton 的线程模型）。\n- 行为需运行时切换、需跨二进制边界、需异构对象放入同容器 → 继承多态。\n- 二者可结合：用 Policy 定型具体类，再用类型擦除或基类把它放进运行时容器。`,
    tags: ["Policy 设计", "继承多态", "虚函数", "取舍"],
  },
  {
    id: "mcd-policy-design-3",
    chapter: "mcd-policy-design",
    level: 3,
    question: `Policy 设计如何解决「多重继承的组合爆炸」与「菱形继承」问题？Host 模板如何组合多个正交 Policy？`,
    answer:
      `传统多重继承的组合爆炸：每新增一个行为维度就要派生一个子类，N 个维度各有 M 个选项会产生 N^M 个组合类，且菱形继承带来二义性与重复基类。\n\nPolicy 设计用「模板参数化 + 线性组合」化解：\n1. 把每个维度做成一个 Policy 参数，Host 用一条模板签名声明所有维度：\n\`\`\`cpp\ntemplate\n<\n  class CreationPolicy,\n  class CheckingPolicy,\n  class ThreadingModel\n>\nclass Host : public CreationPolicy, public CheckingPolicy, public ThreadingModel\n{\n  // 把各 Policy 的能力混入\n};\n\`\`\`\n2. 各 Policy 互不继承、互不引用，天然正交，没有菱形基类——每个 Policy 是独立的叶子类，Host 多重继承它们不会形成菱形。\n3. 组合数从「手写 N^M 个类」变成「实例化时挑 N 个 Policy」，编译器自动生成具体类，手写零样板。\n4. Policy 之间若需协作，由 Host 调用协调（如 SmartPtr 在析构时先 Ownership 释放、再 Storage 清理），而非 Policy 互相耦合。\n\n关键点：Policy 的正交性是设计前提——每个 Policy 只管一个维度、接口最小化，Host 负责把它们粘合，这样多重继承不会退化为耦合网。`,
    tags: ["Policy 设计", "多重继承", "组合爆炸", "Host 模板"],
  },
  {
    id: "mcd-policy-design-4",
    chapter: "mcd-policy-design",
    level: 4,
    question: `「富 Policy」（带数据成员的 Policy）与「瘦 Policy」（无数据成员）有何区别与权衡？Policy 设计对模板代码膨胀有何影响？`,
    answer:
      `瘦 Policy：无数据成员（或仅静态/枚举配置），只提供一组静态或成员函数。优势是 Host 继承它不增加对象体积（空基类优化 EBO 可把零大小基类压到 0 字节），调用可内联。劣势是策略无法携带运行时状态。\n\n富 Policy：携带数据成员（如引用计数、分配器配置、阈值），能表达有状态的策略。劣势是增加 Host 对象体积、可能破坏 EBO、策略间状态同步更复杂。\n\n权衡：\n- 能用静态/编译期常量表达的配置优先做成瘦 Policy（如线程模型、检查策略这类纯行为策略）。\n- 必须携带运行时状态时才用富 Policy（如引用计数 Ownership 必须存计数）。Loki 的 SmartPtr 故意把计数放在 Ownership Policy 内，正是因为计数是运行时状态。\n- 富 Policy 要小心 EBO 失效：若多个 Policy 都带数据，Host 体积会叠加，可考虑用成员而非继承持有富 Policy。\n\n模板代码膨胀：每个 Policy 组合实例化出一份 Host 代码，N×M 组合会产生 N×M 份模板实例。缓解手段：\n1. 把与 Policy 无关的公共逻辑抽到非模板基类，减少重复实例化。\n2. Policy 接口尽量小，减少被实例化的成员函数。\n3. 关键路径内联、非关键路径可显式实例化并外联。\n- 权衡本质：Policy 用「编译期生成多种类型」换「运行时零开销」，代码膨胀是这笔交易的代价，需在编译时间/二进制体积与运行时性能间取舍。`,
    tags: ["富 Policy", "瘦 Policy", "EBO", "代码膨胀"],
  },
];
