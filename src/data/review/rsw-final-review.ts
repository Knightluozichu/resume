import type { ReviewQuestion } from "./types";

/** 总复习 复习题 */
export const rswFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "rsw-final-review-1",
    chapter: "rsw-final-review",
    level: 1,
    question: "用一句话总结 Rust 全书的设计主线。",
    answer: "编译期安全 + 运行时零成本——把内存安全、线程安全、引用有效的检查全部前移到编译期，运行时不付额外代价（无 GC、无虚表、无运行时检查）。所有权是这条主线的统一内核。",
    tags: ["设计主线", "全书总结"],
  },
  {
    id: "rsw-final-review-2",
    chapter: "rsw-final-review",
    level: 2,
    question: "所有权如何作为统一内核串联全书各特性？",
    answer: "借用是所有权的访问授权（&/&mut 编译期验证互斥），生命周期是所有权的时间约束（'a 防悬垂），trait/泛型是所有权的行为抽象（单态化零开销），错误处理是所有权的失败路径（Result 显式化），unsafe 是所有权的边界逃生舱（解锁编译器无法验证的操作），Send/Sync 是所有权的多线程延伸（编译期防数据竞争），async 是所有权的协作式调度（Future 状态机零开销），宏是所有权的代码生成（编译期展开无运行时痕迹）。",
    tags: ["所有权内核", "特性串联"],
  },
  {
    id: "rsw-final-review-3",
    chapter: "rsw-final-review",
    level: 3,
    question: "零成本抽象在不同特性中如何统一体现？举三个例子。",
    answer: "零成本抽象贯穿所有特性，统一原则是「不用的不付代价、用的不比手写慢」。例 1：迭代器——链式 map/filter/sum 优化成单次遍历，无中间集合分配。例 2：泛型——单态化为每个具体类型生成特化代码，无虚表跳转，与手写专用函数一样快。例 3：async——async fn 编译成 Future 状态机，栈空间极小、无堆分配、无 GC，比 OS 线程轻量百万倍。宏编译期展开运行时零痕迹也遵循此原则。",
    tags: ["零成本抽象", "统一性", "举例"],
  },
  {
    id: "rsw-final-review-4",
    chapter: "rsw-final-review",
    level: 4,
    question: "设计一个并发安全的内存缓存 Cache<K,V>，说明会用到全书哪些特性及如何体现「编译期安全+运行时零成本」。",
    answer: "用到特性：1. 所有权——Cache 持有 HashMap 所有权，Arc 让多线程共享；2. 泛型+trait bound——Cache<K: Hash+Eq+Clone, V: Clone> 单态化零开销，可定义 Expirable trait；3. 并发——内部 Arc<RwLock<HashMap>>，RwLock 多读单写，Send/Sync 编译期验证；4. 错误处理——get 返回 Result<V, CacheError>，? 传播，可恢复错误用 Result；5. async（可选）——tokio::sync::RwLock 异步刷新，注意不持锁 await；6. 生命周期——get 返回 owned 值而非引用，避免借用 guard 的生命周期纠缠。体现「编译期安全」：Send/Sync 让编译器阻止错误共享；体现「运行时零成本」：泛型单态化无虚表、无 GC。所有权决定数据结构设计（Arc 共享、RwLock 保护、Result 传播）。",
    tags: ["综合设计", "缓存", "并发安全", "零成本"],
  },
];
