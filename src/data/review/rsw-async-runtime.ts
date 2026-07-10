import type { ReviewQuestion } from "./types";

/** async 运行时 复习题 */
export const rswAsyncRuntimeQuestions: ReviewQuestion[] = [
  {
    id: "rsw-async-runtime-1",
    chapter: "rsw-async-runtime",
    level: 1,
    question: `async fn 调用后会立即执行吗？为什么？`,
    answer: `不会。async fn 调用只返回一个 Future 状态机，函数体一行不执行——直到被 poll 才开始。这是因为 Future 是惰性的（lazy）。必须通过 .await 或 spawn（提交给执行器）来驱动。这与普通函数「调用即执行」根本不同，也不同于 JS Promise（调用即开始执行到第一个 await）。`,
    tags: ["async fn", "Future", "惰性"],
  },
  {
    id: "rsw-async-runtime-2",
    chapter: "rsw-async-runtime",
    level: 2,
    question: `poll/Waker 协作式调度的工作流程是什么？`,
    answer: `1. 执行器从任务队列取任务调用 poll；2. poll 执行到 await，若 I/O 未就绪，注册 Waker 返回 Pending；3. I/O 完成（reactor 通知），Waker 被调用，任务重新入队；4. 执行器再次 poll，从挂起点恢复，I/O 已就绪继续执行。每个 .await 是一个挂起点，编译器在此保存状态。这让少数线程承载海量并发任务。`,
    tags: ["poll", "Waker", "执行器"],
  },
  {
    id: "rsw-async-runtime-3",
    chapter: "rsw-async-runtime",
    level: 3,
    question: `为什么在 async 代码中不能用 std::sync::Mutex 或 std::thread::sleep？`,
    answer: `std::sync::Mutex 持锁期间阻塞当前线程，std::thread::sleep 也阻塞——这些会卡住整个执行器线程，导致该线程上所有其他 async 任务无法推进。更糟的是，若持 std 锁时 await，唤醒需要同一把锁会直接死锁。async 代码必须用异步版本：tokio::sync::Mutex（持锁时让出执行权）、tokio::time::sleep。CPU 密集任务用 tokio::task::spawn_blocking 丢到独立线程池。规则：永远不在持有任何锁时 .await。`,
    tags: ["async", "阻塞", "Mutex", "死锁"],
  },
  {
    id: "rsw-async-runtime-4",
    chapter: "rsw-async-runtime",
    level: 4,
    question: `对比 OS 线程与 async 任务，说明各自适用场景及「一个服务员服务多桌」的类比。`,
    answer: `OS 线程：每条约 2MB 栈、内核调度、阻塞式 I/O，万级已是上限，适合 CPU 密集。async 任务：每条约百字节、用户态协作调度、非阻塞 I/O，百万级轻松，适合 I/O 密集高并发。类比「一个服务员服务多桌」：OS 线程像一桌一个服务员（端完菜站着等客人吃完，效率低）；async 像一个服务员服务多桌（点完一桌趁等厨房做菜立刻去下一桌，厨房好了回来上菜）。.await 就是「我暂时没事做，让出 CPU 给别人」的信号。协作式调度让少数线程承载海量并发。CPU 密集用线程（避免频繁切换），I/O 密集用 async（让出等待时间）。`,
    tags: ["线程", "async", "对比", "综合"],
  },
];
