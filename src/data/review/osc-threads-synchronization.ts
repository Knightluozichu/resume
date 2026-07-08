import type { ReviewQuestion } from "./types";

export const oscThreadsSynchronizationQuestions: ReviewQuestion[] = [
  {
    id: "osc-threads-synchronization-1",
    chapter: "osc-threads-synchronization",
    level: 2,
    question: "线程和进程的区别是什么？为什么多线程有时比多进程更高效？",
    answer:
      "进程是资源分配的单位（有独立地址空间、文件描述符表），线程是 CPU 调度的单位（共享进程的地址空间和资源，但有独立栈和寄存器）。同一进程内的线程切换不需切换地址空间（页表不变），而进程切换要换页表、flush TLB，开销大得多。线程间通信直接读写共享内存（快），进程间通信要走管道/消息队列/共享内存（慢）。所以多线程适合频繁协作的并发任务（如 Web 服务器处理连接），多进程适合需要强隔离的任务（如浏览器的每个标签页独立进程）。但多线程的代价是共享数据需要同步保护，否则竞态条件导致数据损坏——这是多线程编程复杂性的根源。",
    tags: ["线程", "进程", "并发"],
  },
  {
    id: "osc-threads-synchronization-2",
    chapter: "osc-threads-synchronization",
    level: 3,
    question: "临界区问题的三个准则是什么？Peterson 算法如何满足它们？",
    answer:
      "三准则：①互斥（mutual exclusion）——至多一个进程在临界区内；②前进（progress）——空闲时必须有资格进入的进程被选中进入，不能无限推迟；③有限等待（bounded waiting）——一个进程发出进入请求后，不能无限被其他进程插队。Peterson 算法用两个共享变量 `flag[2]` 和 `turn`：进入区设 `flag[i]=true; turn=j`，然后循环等待 `while(flag[j] && turn==j)`。互斥：若两进程都设了 flag，turn 只有一个值，后设 turn 的进程等待。前进：若对方不在临界区（flag[j]=false），循环条件不成立直接进入。有限等待：turn 保证轮流——对方退出临界区时若还想进，必须把 turn 让给当前等待者。Peterson 是软件互斥的经典解法，但现代系统用硬件指令（TSL、CAS）更高效。",
    tags: ["临界区", "Peterson算法", "互斥"],
  },
  {
    id: "osc-threads-synchronization-3",
    chapter: "osc-threads-synchronization",
    level: 3,
    question: "自旋锁和互斥锁的区别是什么？各适合什么场景？",
    answer:
      "自旋锁（spinlock）：获取不到锁时忙等待（while 循环不断测试），不释放 CPU。优点是延迟低——锁一释放立即获取，无需上下文切换。缺点是浪费 CPU 周期，在单核上尤其严重（自旋时另一个线程没机会释放锁）。适合临界区极短（几十条指令）且多核场景——等一会就拿到了，切换开销不值得。互斥锁（mutex）：获取不到锁时阻塞睡眠（加入等待队列），释放 CPU 给其他线程。锁释放时内核唤醒等待者。优点是不浪费 CPU，缺点是上下文切换开销（微秒级）。适合临界区较长（I/O、复杂计算）或单核场景。经验法则：临界区 < 两次上下文切换时间（约几微秒）用自旋锁，否则用互斥锁。",
    tags: ["自旋锁", "互斥锁", "同步原语"],
  },
  {
    id: "osc-threads-synchronization-4",
    chapter: "osc-threads-synchronization",
    level: 4,
    question: "用信号量解决「生产者-消费者」（有限缓冲问题），并解释为什么 P 操作顺序不能颠倒。",
    answer:
      "信号量定义：`empty = N`（空位数），`full = 0`（数据数），`mutex = 1`（互斥）。生产者：`P(empty); P(mutex); 放入数据; V(mutex); V(full)`。消费者：`P(full); P(mutex); 取出数据; V(mutex); V(empty)`。P 操作顺序不能颠倒：若生产者先 `P(mutex)` 再 `P(empty)`，当缓冲区满时 `P(empty)` 阻塞，但生产者持有 mutex，消费者无法 `P(mutex)` 去消费数据释放空位——死锁。同理消费者若先 `P(mutex)` 再 `P(full)`，缓冲区空时也会死锁。核心原则：先等资源信号量（empty/full），再等互斥信号量（mutex）。V 操作顺序无所谓——释放不会阻塞。这个「先资源后互斥」的原则是避免信号量死锁的关键模式。",
    tags: ["信号量", "生产者消费者", "死锁"],
  },
];
