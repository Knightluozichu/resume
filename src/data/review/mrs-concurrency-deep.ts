import type { ReviewQuestion } from "./types";

/** Rust 并发深入 复习题 */
export const mrsConcurrencyDeepQuestions: ReviewQuestion[] = [
  {
    id: "mrs-concurrency-deep-1",
    chapter: "mrs-concurrency-deep",
    level: 1,
    question: "Rust 中 Send 和 Sync trait 的含义是什么？它们的区别是什么？",
    answer: "Send 表示类型的所有权可以安全地跨线程转移——即一个线程可以把值 move 给另一个线程。Sync 表示类型的引用可以安全地跨线程共享——即 &T 可以被多个线程同时持有。区别：Send 关乎所有权转移（move），Sync 关乎引用共享（&）。关系：T: Sync 等价于 &T: Send（如果引用可以安全转移给别的线程，说明可以安全共享）。大多数类型自动实现 Send/Sync，Rc 和 RefCell 不是 Sync/Send（内部可变 + 引用计数不安全）。",
    tags: ["Send", "Sync", "基础"],
  },
  {
    id: "mrs-concurrency-deep-2",
    chapter: "mrs-concurrency-deep",
    level: 2,
    question: "为什么 Rc 不能跨线程使用？要用什么替代？Arc 的原理是什么？",
    answer: "Rc（引用计数）不是线程安全的——它的计数器用非原子操作递增/递减，多线程同时操作会导致计数错误（双重释放或内存泄漏）。替代方案是 Arc（Atomic Reference Counting）——用原子操作管理计数器，线程安全。Arc 的原理：1) 内部用 AtomicUsize 存储引用计数；2) clone() 时原子递增计数；3) Drop 时原子递减，归零时释放数据；4) 原子操作保证多线程并发修改不会出错。代价是原子操作比普通操作慢（CPU 缓存同步开销），所以单线程用 Rc，多线程才用 Arc。要修改 Arc 内的数据还需配合 Mutex 或 RwLock（Arc<Mutex<T>>）。",
    tags: ["Rc", "Arc", "原子操作", "理解"],
  },
  {
    id: "mrs-concurrency-deep-3",
    chapter: "mrs-concurrency-deep",
    level: 3,
    question: "请用 Rust 编写一个多线程并发计数器，要求线程安全且高效。",
    answer: "```rust\nuse std::sync::{Arc, Mutex};\nuse std::thread;\n\nfn main() {\n    // Arc<Mutex<T>> — 多线程共享可变状态\n    let counter = Arc::new(Mutex::new(0));\n    let handles: Vec<_> = (0..10).map(|_| {\n        let counter = Arc::clone(&counter);\n        thread::spawn(move || {\n            for _ in 0..1000 {\n                let mut num = counter.lock().unwrap();\n                *num += 1;\n            }\n        })\n    }).collect();\n\n    for h in handles {\n        h.join().unwrap();\n    }\n    println!(\"Result: {}\", *counter.lock().unwrap()); // 10000\n}\n```\n\n要点：Arc 共享所有权（多线程 clone），Mutex 保证独占写入（lock 后才能修改），lock().unwrap() 处理中毒情况。如果读多写少可用 RwLock 替代 Mutex 提升性能。",
    tags: ["Arc", "Mutex", "并发计数器", "代码编写"],
  },
  {
    id: "mrs-concurrency-deep-4",
    chapter: "mrs-concurrency-deep",
    level: 4,
    question: "Rust 的 async/await 与线程相比有什么优势？它的零成本体现在哪里？适合什么场景？",
    answer: "优势：1) 轻量——async 任务是状态机，栈开销极小（几 KB vs 线程几 MB），可创建十万级并发任务；2) 零成本——async fn 编译为状态机，.await 是状态机推进点，无回调无堆分配，与手写状态机性能一致；3) 取消安全——Drop 时自动清理资源。零成本体现：编译器把 async fn 转为实现了 Future trait 的状态机，每次 poll 推进状态，await 点是挂起/恢复点——没有 JS 的 Promise 回调开销，没有 Go 的 goroutine 调度器开销。适合 IO 密集型场景（网络服务、文件 IO）——成千上万的并发连接用线程太重，用 async 轻量高效。不适合 CPU 密集型——async 不提供并行，CPU 密集应用线程或 rayon。核心区别：线程是 OS 调度的并行单元，async 是用户态调度的并发单元，Rust 让二者可无缝组合（tokio::spawn_blocking）。",
    tags: ["async/await", "零成本", "并发模型", "综合"],
  },
];
