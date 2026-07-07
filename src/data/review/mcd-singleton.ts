import type { ReviewQuestion } from "./types";

/** Modern C++ Design Singleton 实现复习题 */
export const mcdSingletonQuestions: ReviewQuestion[] = [
  {
    id: "mcd-singleton-1",
    chapter: "mcd-singleton",
    level: 1,
    question: "SingletonHolder 用哪三个 Policy 参数化？分别解决什么问题？",
    answer:
      "SingletonHolder 是 Loki 的模板化单例，用三个 Policy 参数化：\n\n```cpp\ntemplate <\n  typename T,\n  template <class> class CreationPolicy = CreateUsingNew,\n  template <class> class LifetimePolicy = DefaultLifetime,\n  template <class> class ThreadingModel = ObjectLevelLockable\n>\nclass SingletonHolder;\n```\n\n1. CreationPolicy（创建策略）：决定单例对象怎么造。默认 CreateUsingNew 用 new 创建；可换 CreateUsingMalloc（用 malloc + placement new）、CreateStatic（静态局部对象，避免堆分配）、Prototype（从原型克隆）。解决了「单例如何构造」的可定制性。\n\n2. LifetimePolicy（生命周期策略）：决定单例何时销毁、销毁顺序、销毁后访问怎么办。默认 DefaultLifetime 在 atexit 链里销毁；可换 PhoenixSingleton（销毁后可重建，像凤凰复活）、SingletonWithLongevity（按 longevity 数值排序销毁，解决跨单例依赖顺序）。解决了「多单例销毁顺序与死引用」问题。\n\n3. ThreadingModel（线程模型）：决定单例的线程安全等级。默认 ObjectLevelLockable 对每个单例对象加锁；可换 SingleThreaded（无锁，单线程用）、ClassLevelLockable（类级锁）。解决了「多线程首次访问的初始化竞争」问题。\n\n核心思想：经典单例把创建、生命周期、线程安全写死成「 Meyers 单例」，Loki 把三者拆成 Policy，让使用者按场景组合——例如需要 phoenix 行为就换 LifetimePolicy，需要无锁就换 ThreadingModel。",
    tags: ["SingletonHolder", "CreationPolicy", "LifetimePolicy", "ThreadingModel"],
  },
  {
    id: "mcd-singleton-2",
    chapter: "mcd-singleton",
    level: 2,
    question: "PhoenixSingleton 与 SingletonWithLongevity 各解决什么问题？多单例销毁顺序为何难？",
    answer:
      "问题背景：C++ 全局/静态对象销毁顺序与构造顺序相反，但跨翻译单元的单例依赖关系编译器看不到，导致「A 依赖 B，但 B 先销毁了，A 析构时访问 B 拿到死引用」——dead reference 问题。\n\nPhoenixSingleton（凤凰单例）：\n- 思路：单例销毁后，若再被访问，就重建一个新实例——像凤凰死后复活。\n- 实现：Instance() 检查「是否已销毁」标志，若已销毁则重新构造并返回新实例。\n- 适用：单例可在程序任意阶段重建，且重建成本可接受（如配置缓存、连接池）。\n- 风险：重建后的实例不再走正常 atexit 销毁，可能内存泄漏；多次重建语义混乱；多线程下重建需加锁。\n\nSingletonWithLongevity：\n- 思路：让使用者给每个单例一个 longevity 数值，按 longevity 降序销毁（longevity 大的先销毁），保证被依赖的单例活到最后。\n- 实现：单例注册时声明 longevity，调度器收集所有单例的 longevity，按序插入 atexit 链。\n- 适用：单例依赖关系明确、能给每个单例排 longevity 的场景。\n- 风险：longevity 数值要人工指定且全局一致，单例多了易错；循环依赖无解。\n\n多单例销毁顺序难的根因：\n1. C++ 标准只保证同一翻译单元内静态对象按构造逆序销毁，跨翻译单元顺序未定义。\n2. 单例间依赖（A 析构调 B）是运行时才知道的，编译器无法静态排序。\n3. Phoenix 逃避问题（重建），Longevity 显式排序（人工声明依赖），各有利弊。\n\n现代 C++ 建议：尽量减少全局单例，用依赖注入把生命周期交给调用方；实在要单例用 Meyers（函数内 static），C++11 起线程安全初始化由标准保证。",
    tags: ["PhoenixSingleton", "SingletonWithLongevity", "销毁顺序", "死引用"],
  },
  {
    id: "mcd-singleton-3",
    chapter: "mcd-singleton",
    level: 3,
    question: "双重检查锁定模式（DCLP）为什么在 C++03 下有 bug？C++11 后正确写法是什么？",
    answer:
      "DCLP（Double-Checked Locking Pattern）经典写法：\n```cpp\nif (instance == nullptr) {            // 第一次检查（无锁）\n  Lock lock;\n  if (instance == nullptr) {          // 第二次检查（持锁）\n    instance = new Singleton;          // 构造\n  }\n}\nreturn instance;\n```\n\nC++03 下 bug：\n`instance = new Singleton;` 这一行分三步：1) 分配内存，2) 构造对象，3) 把指针赋给 instance。编译器和 CPU 可能重排成 1→3→2——先赋指针再构造。另一线程在第一次检查时看到 instance 非空，直接返回，但对象其实还没构造完，访问到半成品对象，未定义行为。\n\n根因：C++03 没有内存模型，没法约束「赋值与构造的可见性顺序」，锁只能保证临界区内串行，但锁外的第一次检查读 instance 没有同步，可能读到「指针已赋但对象未构造」的中间状态。\n\nC++11 正确写法：\n用 Meyers 单例（函数内 static 局部变量），标准保证线程安全初始化：\n```cpp\nSingleton& Instance() {\n  static Singleton inst;   // C++11 起线程安全\n  return inst;\n}\n```\n编译器会在内部插入线程安全的初始化代码（基于原子 + 内存屏障），等价于正确实现的 DCLP。\n\n若必须手动实现，用 std::call_once：\n```cpp\nstatic Singleton* instance = nullptr;\nstatic std::once_flag flag;\nSingleton& Instance() {\n  std::call_once(flag, []{ instance = new Singleton; });\n  return *instance;\n}\n```\n或用 std::atomic + acquire/release 屏障手写，但 Meyers 单例最简洁。Loki 的 DCLP 在 C++03 是已知缺陷，现代 C++ 应改用 Meyers 或 call_once。",
    tags: ["DCLP", "双重检查锁定", "内存模型", "Meyers 单例", "std::call_once"],
  },
  {
    id: "mcd-singleton-4",
    chapter: "mcd-singleton",
    level: 4,
    question: "为什么单例模式长期被批评？Loki SingletonHolder 的 Policy 化设计能解决这些批评吗？现代 C++ 应如何对待单例？",
    answer:
      "单例被批评的核心理由：\n\n1. 全局可变状态：单例本质是全局变量，引入隐式依赖——任何代码都能访问，耦合隐藏在调用链里，难以测试和推理。\n2. 隐藏依赖：函数签名看不出依赖了哪个单例，单元测试要 mock 单例极麻烦（单例全局唯一，无法注入替身）。\n3. 并发难题：全局共享状态是多线程竞争源头，加锁降低并发，锁粒度难调。\n4. 生命周期混乱：多单例销毁顺序、死引用、Phoenix 重建等问题（Loki 用 LifetimePolicy 处理）。\n5. 违反单一职责：单例类既管「自己是单例」又管业务逻辑，职责叠加。\n6. 难以扩展：全局唯一意味着无法有多个实例（如多配置、多租户场景受限）。\n\nLoki SingletonHolder 的 Policy 化能解决一部分：\n- 生命周期问题（LifetimePolicy）→ 解决销毁顺序与死引用。\n- 线程安全（ThreadingModel）→ 解决初始化竞争。\n- 创建方式（CreationPolicy）→ 解决构造灵活性。\n- 但无法解决「全局可变状态、隐藏依赖、难测试」这三个核心批评——Policy 化只让单例更灵活，没让单例不再是全局状态。\n\n现代 C++ 应如何对待单例：\n1. 优先用依赖注入：把「需要唯一」的对象作为参数传给使用者，生命周期交给调用方或 IoC 容器，可测试性、可见性都好。\n2. 实在要单例用 Meyers：函数内 static，C++11 起线程安全，语法最简，避免手写 DCLP。\n3. 区分「全局唯一配置」（只读，可接受单例）与「全局可变状态」（应避免，改注入）。\n4. 跨线程共享用 std::call_once 或 std::once_flag 初始化，配合 const 或 atomic 访问。\n5. 把 Loki SingletonHolder 当「Policy 设计范例」学，理解 Policy 化如何解耦正交关注点，但生产代码优先用依赖注入 + Meyers。\n\n一句话：单例不是不能用，是要慎用——Loki 让单例更安全灵活，但治标不治本，依赖注入才是根治。",
    tags: ["单例批评", "依赖注入", "Meyers", "现代 C++", "Policy 化"],
  },
];
