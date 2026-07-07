import type { ReviewQuestion } from "./types";

/** 单例模式章复习题 */
export const dpSingletonQuestions: ReviewQuestion[] = [
  {
    id: "dp-singleton-01",
    chapter: "dp-singleton",
    level: 1,
    question: "单例模式的意图是什么？",
    answer:
      "保证一个类只有一个实例，并提供一个全局访问点来获取该实例。\n\n核心要点：\n① 构造函数私有化，外部无法直接 `new`；\n② 类内部持有唯一实例；\n③ 通过静态方法（如 `getInstance()`）对外暴露该实例。",
    tags: ["意图", "基础概念"],
  },
  {
    id: "dp-singleton-02",
    chapter: "dp-singleton",
    level: 2,
    question: "饿汉式和懒汉式单例有什么区别？各自的线程安全性如何？",
    answer:
      "饿汉式：在类加载时就创建实例（`static final`），天生线程安全，因为类加载由 JVM 保证单次执行；缺点是不管用不用都会创建，可能浪费资源。\n\n懒汉式：在第一次调用 `getInstance()` 时才创建实例，实现了延迟加载；但在多线程下若不加同步会产生多个实例。常见的线程安全做法：\n① 方法级 `synchronized`——简单但性能差（每次调用都加锁）；\n② 双重检查锁（DCL）——只在实际创建时加锁；\n③ 静态内部类——利用类加载机制实现延迟加载 + 线程安全，推荐写法。",
    tags: ["饿汉式", "懒汉式", "线程安全"],
  },
  {
    id: "dp-singleton-03",
    chapter: "dp-singleton",
    level: 3,
    question: "双重检查锁（DCL）单例为什么需要 volatile？请用 Java/TypeScript 说明。",
    answer:
      "因为 `new` 一个对象不是原子操作，它分三步：\n① 分配内存；② 调用构造方法初始化对象；③ 把引用指向该内存。\n\nJVM/CPU 可能对 ②③ 做指令重排序，执行顺序变成 ①→③→②。此时另一个线程在第一次检查时看到 `instance` 非 null（步骤③已完成），就直接返回了一个尚未初始化的对象，导致 NPE 或状态错乱。\n\nJava 用 `volatile` 禁止重排序：\n```\nprivate static volatile Singleton instance;\npublic static Singleton getInstance() {\n  if (instance == null) {\n    synchronized (Singleton.class) {\n      if (instance == null) {\n        instance = new Singleton();\n      }\n    }\n  }\n  return instance;\n}\n```\n\nTypeScript/JavaScript 是单线程的，不涉及真正的指令重排序问题；但若用 Worker 或转译到多线程环境，同理需要保证可见性。实践中 TS 单例更推荐用静态内部类或模块级单例（ES Module 本身就是单例）。",
    tags: ["DCL", "volatile", "指令重排序"],
  },
  {
    id: "dp-singleton-04",
    chapter: "dp-singleton",
    level: 4,
    question: "单例模式有什么缺点？在什么场景下应该避免使用？",
    answer:
      "缺点：\n① 全局状态：单例本质是全局变量，状态隐藏在全局，难以追踪谁在何时修改了它；\n② 隐藏依赖：使用者直接调用 `getInstance()`，依赖关系不透明，违反显式依赖原则；\n③ 难以测试：单例全局共享状态，单元测试间会相互污染，mock 困难；\n④ 违反单一职责：既管「唯一实例」又管业务逻辑；\n⑤ 扩展困难：想改成多例或换实现要改所有调用点；\n⑥ 并发瓶颈：有状态的 singleton 在高并发下成为共享可变状态，需加锁。\n\n应避免的场景：\n① 需要灵活扩展为多例的场合；\n② 对单元测试可测性要求高的项目；\n③ 分布式/集群环境（每个进程一个实例，单例语义失效）；\n④ 对象生命周期需要精细管理（如按请求/会话隔离）的场合。替代方案：依赖注入容器管理单例，把「唯一性」决策上移，而不是硬编码在类里。",
    tags: ["缺点", "反模式", "依赖注入"],
  },
];
