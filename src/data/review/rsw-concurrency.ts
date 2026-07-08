import type { ReviewQuestion } from "./types";

/** 并发与无畏并发 复习题 */
export const rswConcurrencyQuestions: ReviewQuestion[] = [
  {
    id: "rsw-concurrency-1",
    chapter: "rsw-concurrency",
    level: 1,
    question: "Send 和 Sync 标记 trait 分别表示什么？",
    answer: "Send 表示类型 T 的所有权可以安全地跨线程转移，转移后原线程不再访问。Sync 表示 &T 可以安全地被多个线程同时持有（即 &T 是 Send）。二者由编译器自动推导。例如 Rc 不 Send 不 Sync（非原子计数会数据竞争），Arc 在 T: Send+Sync 时是 Send+Sync。",
    tags: ["Send", "Sync", "标记trait"],
  },
  {
    id: "rsw-concurrency-2",
    chapter: "rsw-concurrency",
    level: 2,
    question: "Rust 能防止死锁吗？为什么？",
    answer: "不能。Rust 的 Send/Sync 在编译期防止数据竞争，但不防死锁——死锁是运行时行为（多个锁的获取顺序不一致），编译器无法静态检测。若线程 A 先锁 m1 再锁 m2，线程 B 先锁 m2 再锁 m1，就会死锁，编译器不警告。防死锁靠工程纪律：统一锁获取顺序、减少锁粒度、用 try_lock 超时、避免持锁时 await。",
    tags: ["死锁", "数据竞争", "Send/Sync"],
  },
  {
    id: "rsw-concurrency-3",
    chapter: "rsw-concurrency",
    level: 3,
    question: "Arc<Mutex<T>> 为什么是共享可变状态的标准模式？每一层各起什么作用？",
    answer: "解决多线程共享可变数据的三个需求：T 是实际数据；Mutex<T> 提供运行时互斥，lock() 返回 MutexGuard 离开作用域自动释放（RAII），让 T 变 Sync；Arc<...> 提供原子引用计数的共享所有权，让多个线程持有同一个 Mutex 的拥有权，是 Send+Sync。缺一不可：只有 Mutex 没 Arc 无法跨线程共享所有权；只有 Arc 没 Mutex 多线程同时修改会数据竞争。读多写少可用 Arc<RwLock<T>> 提升并发度。",
    tags: ["Arc", "Mutex", "共享状态"],
  },
  {
    id: "rsw-concurrency-4",
    chapter: "rsw-concurrency",
    level: 4,
    question: "对比「通过通信共享内存」（channel）与「通过共享内存通信」（Mutex）两种并发模型，各自适用场景？",
    answer: "channel（消息传递）：数据所有权通过 channel 转移，发送方发送后不再访问，天然避免数据竞争。适用生产者-消费者、事件流、actor 模型。优点是安全简洁，缺点是数据拷贝/所有权转移开销，不适合高频共享读写。Mutex（共享状态）：多线程持锁访问同一数据，适合需要高频读写同一可变状态的场景。优点是灵活、零拷贝，缺点是有锁开销和死锁风险。Rust 中 channel 更安全（编译器保证独占），共享状态更灵活。经验：优先 channel（所有权转移天然安全），需要细粒度共享状态时再用 Arc<Mutex<T>>。scoped threads 可在无需 Arc 时借用式共享只读数据。",
    tags: ["channel", "Mutex", "并发模型", "综合"],
  },
];
