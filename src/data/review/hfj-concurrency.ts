import type { ReviewQuestion } from "./types";

export const hfjConcurrencyQuestions: ReviewQuestion[] = [
  {
    id: "hfj-cc-1",
    chapter: "hfj-concurrency",
    level: 2,
    question: `创建线程的两种方式是什么？为什么推荐 Runnable？`,
    answer:
      `方式1：extends Thread——继承 Thread 类，重写 run() 方法，new MyThread().start() 启动。\n方式2：implements Runnable——实现 Runnable 接口的 run() 方法，new Thread(new MyJob()).start() 启动。\n推荐 Runnable 的原因：①Java 单继承——extends Thread 后就不能继承其他类了，限制了类的扩展性；implements Runnable 还可以继承其他类；②解耦——Thread 类负责线程管理（启动/睡眠/等待），Runnable 只负责任务逻辑，职责分离更清晰；③复用——同一个 Runnable 实例可以被多个 Thread 共享执行（如线程池），Thread 子类做不到；④与线程池兼容——ExecutorService 接受 Runnable/Callable，不直接接受 Thread 子类。\n调用 start() 而非 run()：start() 创建新线程并自动调用 run()；直接调 run() 只是在当前线程同步执行，不创建新线程。`,
    tags: ["Thread", "Runnable", "线程创建"],
  },
  {
    id: "hfj-cc-2",
    chapter: "hfj-concurrency",
    level: 2,
    question: `线程的几种状态是什么？start()、sleep()、wait() 分别做什么？`,
    answer:
      `线程状态：①NEW——已创建（new Thread）但未启动；②RUNNABLE——已 start()，正在运行或等待 CPU 调度；③BLOCKED——等待获取 synchronized 锁；④WAITING——调用了 wait()/join() 无限期等待；⑤TIMED_WAITING——调用了 sleep(ms)/wait(ms) 有限期等待；⑥TERMINATED——run() 执行完毕。\nstart()：从 NEW 转到 RUNNABLE，创建新线程并调用 run()。一个线程只能 start 一次。\nsleep(ms)：当前线程从 RUNNABLE 转到 TIMED_WAITING，暂停指定毫秒后自动回到 RUNNABLE。不释放锁。\nwait()：当前线程从 RUNNABLE 转到 WAITING，必须在 synchronized 块内调用（否则抛 IllegalMonitorStateException），会释放持有的锁。需要其他线程调用 notify()/notifyAll() 唤醒，唤醒后需要重新获取锁才能继续。wait() 是 Object 的方法，sleep() 是 Thread 的静态方法。`,
    tags: ["线程状态", "sleep", "wait"],
  },
  {
    id: "hfj-cc-3",
    chapter: "hfj-concurrency",
    level: 3,
    question: `什么是竞争条件（race condition）？用银行取款举例说明，并解释 synchronized 如何解决。`,
    answer:
      `竞争条件：多个线程同时访问和修改共享数据时，由于执行顺序的不确定性导致结果不正确的问题。\n银行取款示例：balance=100，线程A和B同时取50。①A读 balance=100；②B读 balance=100（A还没写回）；③A计算 100-50=50，写 balance=50；④B计算 100-50=50，写 balance=50。结果取了两次50，余额还有50（应该为0）。问题出在「读-计算-写」不是原子操作，中间会被其他线程插入。\nsynchronized 解决：把取款方法标记为 synchronized，同一时刻只有一个线程能进入该方法。线程A进入后获取锁，B必须在A执行完释放锁后才能进入。保证了「读-计算-写」的原子性。\n\`\`\`java\npublic synchronized void withdraw(int amt) {\n    if (balance >= amt) balance -= amt;\n}\n\`\`\`\n同步代价：性能下降（线程排队等待锁），只在必要时同步，同步块尽量小。`,
    tags: ["竞争条件", "synchronized", "线程安全"],
  },
  {
    id: "hfj-cc-4",
    chapter: "hfj-concurrency",
    level: 4,
    question: `wait() 和 sleep() 有什么区别？notify() 和 notifyAll() 有什么区别？`,
    answer:
      `wait() vs sleep()：①所属——wait() 是 Object 的方法，sleep() 是 Thread 的静态方法；②锁——wait() 会释放持有的锁，sleep() 不释放锁；③调用条件——wait() 必须在 synchronized 块内调用（持有锁才能释放），sleep() 可以在任何地方调用；④唤醒——wait() 需要 notify/notifyAll 唤醒或超时，sleep() 超时自动唤醒；⑤目的——wait() 用于线程间通信（等待条件满足），sleep() 用于延迟执行。\nnotify() vs notifyAll()：①notify()——唤醒等待在该对象上的一个线程（JVM 选择，不确定哪个），如果只有一个线程等待则等价于 notifyAll；②notifyAll()——唤醒等待在该对象上的所有线程，它们竞争锁，只有一个能获取锁继续执行，其余继续等待。\n推荐 notifyAll()：notify() 可能唤醒不相关的线程导致信号丢失（如生产者唤醒了另一个生产者而不是消费者）。notifyAll() 更安全，性能差异在大多数场景可忽略。`,
    tags: ["wait", "sleep", "notify", "线程通信"],
  },
];
