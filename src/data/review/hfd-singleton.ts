import type { ReviewQuestion } from "./types";

/** Head First 设计模式 · 单例模式复习题 */
export const hfdSingletonQuestions: ReviewQuestion[] = [
  {
    id: "hfd-singleton-1",
    chapter: "hfd-singleton",
    level: 1,
    question: `单例模式的定义是什么？它要解决什么问题？`,
    answer:
      `单例模式定义：确保一个类只有一个实例，并提供一个全局访问点。\n\n解决的问题：\n1. 全局唯一实例：有些对象在系统中只需要一个（线程池、缓存、注册表、日志器、配置管理器）。如果创建多个会导致状态不一致或资源浪费。\n2. 全局访问点：提供一个统一的访问方式，避免到处传引用。\n3. 延迟创建：在首次使用时才创建实例，而非启动时就创建。\n\n实现要点：\n- 构造函数私有（private），外部不能 new。\n- 类内部持有唯一的 static 实例引用。\n- 提供 static getInstance() 方法返回实例。\n\n注意：单例模式常被批评为「全局变量的面向对象版本」，使用时需谨慎——它会引入隐式全局状态，增加测试和并发难度。`,
    tags: ["定义", "全局唯一", "问题"],
  },
  {
    id: "hfd-singleton-2",
    chapter: "hfd-singleton",
    level: 2,
    question: `为什么懒汉式的 \`getInstance()\` 需要加 synchronized？加在整个方法上有什么性能问题？`,
    answer:
      `为什么需要 synchronized：\n懒汉式在首次调用 getInstance() 时才创建实例。多线程下，两个线程同时进入 \`if (instance == null)\` 判断，都为 true，都创建实例——破坏单例。synchronized 保证同一时刻只有一个线程能进入方法。\n\n加在整个方法上的性能问题：\nsynchronized 方法每次调用都加锁，即使实例已经创建好了。实际上只有第一次创建时需要同步，后续每次调用只是 return instance，完全不需要锁。\n\n在高频调用场景下，每次 getInstance() 都同步会导致线程阻塞、性能下降。\n\n这就是双检锁（DCL）的动机：只在实例未创建时加锁，创建好后直接返回——兼顾线程安全和性能。\n\n\`\`\`java\n// 懒汉同步（性能差）\npublic synchronized static Singleton getInstance() {\n    if (instance == null) instance = new Singleton();\n    return instance;\n}\n\`\`\`\n\n更推荐用静态内部类方案，利用 JVM 类加载机制天然保证线程安全且无同步开销。`,
    tags: ["线程安全", "synchronized", "性能"],
  },
  {
    id: "hfd-singleton-3",
    chapter: "hfd-singleton",
    level: 3,
    question: `双检锁（DCL）为什么要用 volatile 修饰 instance？不加 volatile 会出什么问题？`,
    answer:
      `不加 volatile 的问题：指令重排序导致「部分构造」。\n\n\`instance = new Singleton()\` 不是原子操作，JVM 分三步：\n1. 分配内存\n2. 调用构造函数初始化对象\n3. 把内存地址赋给 instance 引用\n\nJVM 可能重排序为 1→3→2：先分配内存再把地址赋给 instance，最后才调构造函数。\n\n线程 A 执行到步骤 3（instance 已非 null 但对象未初始化），线程 B 进入 getInstance()，第一次检查 instance != null，直接返回——拿到的是「半初始化」的对象，使用时崩溃。\n\nvolatile 的作用：\n1. 禁止指令重排序：volatile 写操作前面的操作不会被重排序到后面（happens-before 语义）。\n2. 内存可见性：volatile 写立即刷到主内存，其他线程的 volatile 读能立即看到。\n\n\`\`\`java\nprivate volatile static Singleton instance;\npublic static Singleton getInstance() {\n    if (instance == null) {              // 第一次检查（无锁）\n        synchronized (Singleton.class) {\n            if (instance == null) {      // 第二次检查（有锁）\n                instance = new Singleton();\n            }\n        }\n    }\n    return instance;\n}\n\`\`\`\n\n两次检查：第一次避免不必要的加锁，第二次防止多个线程同时通过第一次检查后重复创建。`,
    tags: ["DCL", "volatile", "指令重排", "应用"],
  },
  {
    id: "hfd-singleton-4",
    chapter: "hfd-singleton",
    level: 4,
    question: `单例模式被批评为「面向对象的全局变量」。在什么场景下应该避免使用单例？有什么替代方案？`,
    answer:
      `单例的问题：\n1. 隐式全局状态：任何代码都能访问单例，状态变化难以追踪——调试和测试噩梦。\n2. 紧耦合：依赖单例的类与单例硬绑定，无法替换实现——违反依赖倒置。\n3. 并发困难：单例的共享状态需要额外同步，多线程下容易出 bug。\n4. 生命周期问题：单例无法被垃圾回收（持有 static 引用），可能内存泄漏。\n5. 单元测试困难：单例的全局状态在测试间共享，测试不隔离。\n\n应该避免的场景：\n- 只是为了「方便访问」而非「真的需要唯一」——用依赖注入。\n- 单例有可变状态且多线程访问——状态竞争风险高。\n- 需要在测试中替换实现——单例难以 mock。\n\n替代方案：\n1. 依赖注入（DI）：把「唯一实例」的创建交给 DI 容器，通过构造函数注入。容器保证单例 scope，但类本身不实现单例模式——可测试、可替换。\n2. 静态工厂方法 + 配置：类似简单工厂，按配置返回实例，可以是单例也可以不是。\n3. 枚举单例（Java）：\`enum Singleton { INSTANCE; }\`——JVM 保证唯一且线程安全，是最安全的 Java 单例实现，但仍然有全局状态问题。\n\n核心原则：单例模式解决「唯一实例」问题没错，但「全局可变状态」才是真正的问题。用 DI 容器管理单例 scope，而非在类内部硬编码单例逻辑。`,
    tags: ["综合", "全局状态", "替代方案", "依赖注入"],
  },
];
