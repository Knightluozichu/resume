import type { ReviewQuestion } from "./types";

/** 条款 35-42 并发 API 复习题 */
export const emcConcurrencyApiQuestions: ReviewQuestion[] = [
  {
    id: "emc-concurrency-api-1",
    chapter: "emc-concurrency-api",
    level: 1,
    question: "条款 35 说「优先用基于任务的编程而非基于线程的」，二者区别是什么？",
    answer:
      "基于线程（thread-based）：用 `std::thread` 显式创建线程，把函数丢进去执行，结果通过共享变量 + 同步原语取回。\n基于任务（task-based）：用 `std::async` 启动一个「任务」，返回 `std::future`，通过 future 的 `get()` 直接取结果。\n\n区别：\n1. 结果获取：任务式 future::get 直接拿返回值并传播异常；线程式需自己设计共享变量、加锁、传异常，繁琐易错。\n2. 异常处理：任务式把函数抛的异常存入 future，get() 时重新抛出，可被捕获；线程式若函数抛异常且未被捕获，程序 std::terminate。\n3. 资源管理：thread 析构前必须 join 或 detach（否则 terminate）；future 析构自动等待，无需手动管理。\n4. 调度灵活性：std::async 可指定 launch::async（新线程）或 launch::deferred（延迟到 get 时执行），thread 必须新开线程。\n\n条款 35 的建议：能用 future/async 表达的，就别用裸 thread。任务式更安全、更高层、更易取结果。只有需要访问底层线程 API（如线程亲和性、优先级）时才退回 std::thread。",
    tags: ["条款 35", "task-based", "thread-based", "std::async", "std::future"],
  },
  {
    id: "emc-concurrency-api-2",
    chapter: "emc-concurrency-api",
    level: 2,
    question:
      "条款 37 说「std::thread 在所有路径上都不可 joinable」。如果 thread 析构时仍 joinable 会怎样？怎么避免？",
    answer:
      "若 std::thread 析构时仍 joinable（即既未 join 也未 detach），程序调用 std::terminate，直接终止——这是 std::thread 的设计：析构一个 joinable 的 thread 是严重错误，强制 terminate 以避免更难查的资源/数据问题。\n\njoinable 的常见来源：\n1. 函数中途 return / 抛异常，跳过了 join 语句。\n2. thread 创建后还没来得及 join 就离开作用域。\n\n避免方法——RAII 封装 thread：\n```cpp\nclass ThreadGuard {\n  std::thread t;\npublic:\n  explicit ThreadGuard(std::thread t_) : t(std::move(t_)) {}\n  ~ThreadGuard() { if (t.joinable()) t.join(); }  // 或 detach\n  ThreadGuard(ThreadGuard&&) = default;\n  ThreadGuard& operator=(ThreadGuard&&) = default;\n};\n```\n\n或者更简单：在所有可能抛异常或提前返回的路径前确保 join，用 try/catch 或 RAII 保证。核心思想是把 thread 当资源管理，析构时必须 unjoinable，和智能指针管理内存一个道理。",
    tags: ["条款 37", "std::thread", "joinable", "RAII", "std::terminate"],
  },
  {
    id: "emc-concurrency-api-3",
    chapter: "emc-concurrency-api",
    level: 3,
    question:
      "条款 40 强调「std::atomic 用于并发，volatile 用于特殊内存」。二者能互换吗？为什么？",
    answer:
      "不能互换。std::atomic 和 volatile 解决完全不同的问题：\n\nstd::atomic：用于「多线程并发访问」。\n- 保证操作的原子性（不可分割）和可见性（一个线程的写对其它线程可见）。\n- 防止编译器把操作重排到原子操作之外，建立 happens-before 关系。\n- 典型用法：计数器、标志位、无锁数据结构。\n- `atomic<int> x; x.fetch_add(1);` 多线程下安全。\n\nvolatile：用于「特殊内存」（memory-mapped I/O、硬件寄存器、信号处理）。\n- 告诉编译器「这个变量的读写有副作用，不要优化掉、不要缓存到寄存器」。\n- 不保证原子性，不保证多线程可见性，不建立 happens-before。\n- 典型用法：嵌入式硬件寄存器、内存映射 IO。\n\n为什么不能互换：\n- 用 volatile 做并发：volatile 不保证原子性也不建立内存序，多线程下仍有数据竞争和可见性问题。`volatile int x; x++;` 在多线程下不安全（++ 是读-改-写三步，非原子）。\n- 用 atomic 做特殊内存：atomic 会把访问优化成原子指令（如 lock 前缀），对硬件寄存器可能产生非预期副作用或多余屏障。\n\n所以并发用 atomic，特殊内存用 volatile，两者职责分明，绝不可混用。这是 C++ 区别于 Java/C# 的一个特点（那些语言的 volatile 带有并发语义，C++ 的没有）。",
    tags: ["条款 40", "std::atomic", "volatile", "并发", "特殊内存", "内存序"],
  },
  {
    id: "emc-concurrency-api-4",
    chapter: "emc-concurrency-api",
    level: 4,
    question:
      "条款 36 说 std::async 的默认启动策略不确定。具体有什么风险？应如何修正？",
    answer:
      "std::async 的默认启动策略是 `std::launch::async | std::launch::deferred`（两者按位或）。这意味着运行时可以选择「立即新开线程异步执行」，也可以选择「延迟到 future::get() 时才在当前线程同步执行」——具体选哪个由实现决定，程序员无法保证。\n\n风险：\n1. 无法预测是否真的异步：若选 deferred，任务根本没在新线程跑，所谓「并发」消失，性能预期落空。\n2. 死锁风险：若调用方在 future 上 wait，而任务被 deferred（未执行），wait 会永远阻塞——因为任务要等到 get() 才执行，但调用方在 wait 不调 get。\n3. TLS 与线程局部状态不确定：deferred 在调用线程执行，访问的是调用线程的 TLS；async 在新线程，访问新线程的 TLS。行为不一致。\n4. 调试困难：同一个程序在不同实现/不同运行表现不同，bug 难复现。\n\n修正（条款 36）：明确指定启动策略为 `std::launch::async`，强制要求异步新线程执行：\n```cpp\nauto fut = std::async(std::launch::async, task);  // 明确异步\n```\n\n封装一个工具函数 `reallyAsync` 固定 async 策略，避免每次手写。只有确实需要 lazy 求值时才用 deferred，并显式写出来。核心：不要依赖默认策略的不确定性，按需显式指定。",
    tags: ["条款 36", "std::async", "启动策略", "launch::async", "launch::deferred", "死锁"],
  },
];
