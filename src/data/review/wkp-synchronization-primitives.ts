import type { ReviewQuestion } from "./types";

export const wkpSynchronizationPrimitivesQuestions: ReviewQuestion[] = [
  {
    id: "wkp-synchronization-primitives-1",
    chapter: "wkp-synchronization-primitives",
    level: 2,
    question: "自旋锁的工作原理是什么？为什么它必须提升IRQL？",
    answer:
      "自旋锁（SpinLock）是多核间互斥访问共享数据的机制。KeAcquireSpinLock原子性地测试锁变量：若空闲则获取并自旋等待，若已被占用则循环检查（忙等待/spin）直到锁释放。获取时将当前CPU的IRQL提升至DISPATCH_LEVEL，释放时恢复原IRQL。必须提升IRQL的原因：①防止同核抢占——若不提升IRQL，当前线程持锁时被同核更高优先级线程抢占，该线程若也请求同一锁则同核死锁（单核死锁）；②DISPATCH_LEVEL以上不会被线程调度器打断，保证持锁期间不被抢占。忙等待而非阻塞的原因：自旋锁用于极短临界区和高IRQL（DPC/ISR），阻塞等待需要调度器（PASSIVE_LEVEL）不适用。多核自旋时，等待核在循环中不释放CPU但可响应更高优先级中断，所以持锁必须极短以减少自旋浪费。",
    tags: ["自旋锁", "IRQL", "同步"],
  },
  {
    id: "wkp-synchronization-primitives-2",
    chapter: "wkp-synchronization-primitives",
    level: 3,
    question: "通知事件（NotificationEvent）和同步事件（SynchronizationEvent）有什么区别？",
    answer:
      "通知事件（NotificationEvent，手动复位事件）：KeSetEvent后保持信号状态直到显式KeResetEvent/KeClearEvent调用。所有等待线程同时被唤醒（广播）。适用于「一次通知多个等待者」的场景，如驱动卸载时通知所有工作线程退出。同步事件（SynchronizationEvent，自动复位事件）：KeSetEvent后只唤醒一个等待线程，随后自动复位为非信号状态。适用于「每次只让一个线程通过」的生产者-消费者场景。区别总结：①唤醒数量——通知事件唤醒所有等待者，同步事件只唤醒一个；②复位方式——通知事件手动复位，同步事件自动复位。KeWaitForSingleObject对两者的行为相同：等待信号状态。事件对象本身在非分页池（KEVENT结构），可在任意IRQL调用KeSetEvent/KeResetEvent（但KeWaitForSingleObject等待非零超时需PASSIVE_LEVEL，零超时可在DISPATCH_LEVEL）。选型：广播通知用通知事件，互斥传递用同步事件。",
    tags: ["事件", "通知事件", "同步事件", "同步原语"],
  },
  {
    id: "wkp-synchronization-primitives-3",
    chapter: "wkp-synchronization-primitives",
    level: 3,
    question: "执行体互斥体（FastMutex）与自旋锁在什么场景下分别使用？",
    answer:
      "执行体互斥体（ExAcquireFastMutex/ExReleaseFastMutex）运行在APC_LEVEL（将IRQL提升至APC_LEVEL），获取失败时阻塞等待（线程进入等待状态，让出CPU），适合较长临界区和PASSIVE_LEVEL的互斥。自旋锁（KeAcquireSpinLock）运行在DISPATCH_LEVEL，获取失败时忙等待（自旋不释放CPU），适合极短临界区和DPC/ISR中的互斥。场景区分：①PASSIVE_LEVEL派遣函数中保护较长操作（如遍历链表、调用I/O函数）——用FastMutex，避免长时间自旋浪费CPU；②DPC/ISR中保护极短操作（如链表头插入、标志位更新）——用自旋锁，因为DPC/ISR不能用阻塞等待；③PASSIVE_LEVEL中保护极短操作（如计数器递增）——可用自旋锁（KeAcquireSpinLock）或更轻量的互锁操作（InterlockedIncrement）；④需要递归获取同一锁——用FastMutex的变种（ExAcquireFastMutexUnsafe不支持递归，需用ERESOURCE支持递归）。核心原则：能阻塞就用FastMutex（不浪费CPU），必须自旋才用SpinLock。",
    tags: ["互斥体", "FastMutex", "自旋锁", "选型"],
  },
  {
    id: "wkp-synchronization-primitives-4",
    chapter: "wkp-synchronization-primitives",
    level: 4,
    question: "内核中常见的死锁场景有哪些？如何防范和检测？",
    answer:
      "常见死锁场景：①锁序违反——线程A先获取锁1再获取锁2，线程B先获取锁2再获取锁1，交叉等待死锁；②IRQL反转——低IRQL代码持有自旋锁后试图获取需要更高IRQL的资源，或高IRQL代码等待低IRQL才能释放的资源；③自旋锁持有时分页——持锁期间（DISPATCH_LEVEL）访问分页内存缺页，缺页需要APC_LEVEL无法满足；④持锁时调用阻塞API——持自旋锁时调用KeWaitForSingleObject等阻塞函数，线程被换出但锁未释放；⑤DPC与线程竞争——DPC获取自旋锁后，被抢占的线程持有DPC需要的另一把锁。防范：①统一锁序——全局规定锁获取顺序，所有代码遵守；②持锁极短——自旋锁持锁期间只做简单操作，不调用复杂API；③持锁不分页——确保持锁期间访问的数据和代码都在非分页池；④持锁不阻塞——DISPATCH_LEVEL以上绝不调用阻塞API；⑤分层锁——用分层设计避免一把锁保护过多资源。检测：Driver Verifier的Deadlock Detection跟踪锁获取顺序，发现违反锁序时蓝屏报告；WDF Verifier检查WDF锁的IRQL约束；!locks和!deadlock命令在调试器中分析死锁。",
    tags: ["死锁", "锁序", "Driver Verifier", "调试"],
  },
];
