import type { ReviewQuestion } from "./types";

/** 并发编程 复习题 */
export const rplConcurrencyQuestions: ReviewQuestion[] = [
  {
    id: "rpl-concurrency-1",
    chapter: "rpl-concurrency",
    level: 1,
    question: "Rust 的 Send 和 Sync 标记分别表示什么？",
    answer: "Send：类型可安全在线程间转移所有权（move 到另一线程）。Sync：类型可安全被多线程同时共享引用（&T 是 Send 的）。大部分类型自动实现。Rc<T> 不是 Send（引用计数非原子），Arc<T> 是 Send。Mutex<T> 是 Send+Sync。Cell<T> 是 Send 但不是 Sync。",
    tags: ["Send","Sync","线程安全","Arc"],
  },
  {
    id: "rpl-concurrency-2",
    chapter: "rpl-concurrency",
    level: 2,
    question: "Rust 所有权系统如何帮助保证线程安全？",
    answer: "1.数据竞争不可能：&mut T 独占，多线程下编译器拒绝共享 &mut T。2.共享数据需 Arc<T>（原子引用计数），但只提供 &T 不可变。3.需修改共享数据需 Arc<Mutex<T>>——Mutex 通过锁保证安全。4.编译器通过 Send/Sync 在编译期验证——不 Send 的类型编译错误阻止 move 到其他线程。Rust 消除大部分数据竞争。",
    tags: ["所有权","线程安全","Arc","Mutex","数据竞争"],
  },
  {
    id: "rpl-concurrency-3",
    chapter: "rpl-concurrency",
    level: 3,
    question: "Arc<Mutex<T>> 的工作原理？为什么需要两层？",
    answer: "Arc<T>：原子引用计数，多线程共享所有权，最后一个 Arc drop 时释放。提供 &T 访问。Mutex<T>：互斥锁，lock() 返回 MutexGuard（RAII 守卫），持守卫可修改数据，drop 时解锁。两层：Arc 让多线程共享所有权（数据不被提前释放），Mutex 让多线程安全修改共享数据。Arc<Mutex<T>>=共享所有权+安全可变。",
    tags: ["Arc","Mutex","RAII","共享可变"],
  },
  {
    id: "rpl-concurrency-4",
    chapter: "rpl-concurrency",
    level: 4,
    question: "Rust 中如何避免死锁？有什么检测工具？",
    answer: "避免：1.固定锁顺序——所有线程按相同顺序获取多锁避免循环等待。2.缩短锁作用域——不在持锁时调外部代码。3.用 try_lock 替代 lock——失败时释放已有锁重试。4.用 channel 替代共享锁——消息传递避免共享可变。检测：parking_lot::Mutex 有 deadlock 检测（panic 提示）。Thread Sanitizer 检测数据竞争。测试中模拟高并发暴露隐藏死锁。",
    tags: ["死锁","锁顺序","channel","try_lock","parking_lot"],
  }
];
