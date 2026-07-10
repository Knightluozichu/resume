import type { ReviewQuestion } from "./types";

export const lkeKernelSynchronizationQuestions: ReviewQuestion[] = [
  {
    id: "lke-ks-1",
    chapter: "lke-kernel-synchronization",
    level: 2,
    question: `自旋锁为什么必须关抢占？不关抢占会发生什么？`,
    answer:
      `自旋锁通过忙等获取锁，如果关抢占，持锁进程不会被调度器抢占。如果不关抢占，假设CPU0上的进程A持有自旋锁后被抢占（时间片用完或更高优先级进程就绪），调度器切换到进程B。如果进程B也需要获取同一把锁，它会忙等——但锁被A持有，A需要被调度回来才能释放锁，而B正在运行不让出CPU（忙等不让出CPU）。结果：B持有CPU不放，A永远得不到调度，锁永远不释放——死锁。即使B不需要同一把锁，A被抢占期间锁被无谓持有，其他CPU上等待此锁的进程白白忙等浪费CPU。因此自旋锁必须关抢占（spin_lock内部隐含preempt_disable）。在中断上下文使用时还需关中断（spin_lock_irqsave），防止中断打断持锁代码并尝试获取同一把锁导致死锁。`,
    tags: ["同步", "自旋锁"],
  },
  {
    id: "lke-ks-2",
    chapter: "lke-kernel-synchronization",
    level: 3,
    question: `RCU的宽限期是什么？写端如何安全释放旧数据？`,
    answer:
      `宽限期（Grace Period）是从指针替换（rcu_assign_pointer发布新指针）到所有CPU都经历「静止状态」之间的时间段。静止状态指CPU发生上下文切换或进入idle——因为RCU读临界区在rcu_read_lock/rcu_read_unlock之间（关抢占），一个CPU要发生上下文切换必然已退出所有RCU读临界区。因此当所有CPU都至少经过一次静止状态后，可以保证在指针替换之前进入的所有读者都已退出——它们要么看到旧指针（旧数据仍有效），要么看到新指针（新数据有效），不可能再访问旧数据。写端安全释放流程：①分配新副本，修改副本内容；②rcu_assign_pointer原子替换指针（发布新版本，后续新读者看到新指针）；③synchronize_rcu()等待宽限期——所有CPU经过静止状态，旧读者全部退出；④kfree释放旧数据——此时无人引用，安全释放。synchronize_rcu可能等待数毫秒，也可用call_rcu注册异步回调在宽限期结束后释放。`,
    tags: ["同步", "RCU"],
  },
  {
    id: "lke-ks-3",
    chapter: "lke-kernel-synchronization",
    level: 3,
    question: `自旋锁和互斥锁分别在什么场景下使用？选错会有什么后果？`,
    answer:
      `自旋锁：短临界区（<10us），忙等获取（CPU空转），关抢占/关中断，不能睡眠。适合中断上下文、极短的数据保护。选错为互斥锁：中断上下文中调用mutex_lock会睡眠，而中断上下文不能睡眠→panic。互斥锁：长临界区（>10us），争用时睡眠等待（让出CPU），在进程上下文使用，可以睡眠。适合需要睡眠的操作、较大的临界区。选错为自旋锁：长临界区中忙等会长时间空转浪费CPU，如果临界区内有睡眠操作（如kmalloc(GFP_KERNEL)）会导致panic。选型原则：中断上下文只能用自旋锁（spin_lock_irqsave）；进程上下文短临界区用自旋锁（spin_lock），长临界区或需要睡眠用互斥锁（mutex）。`,
    tags: ["同步", "选型"],
  },
  {
    id: "lke-ks-4",
    chapter: "lke-kernel-synchronization",
    level: 4,
    question: `RCU有哪些严格前提？不满足时应该用什么替代？`,
    answer:
      `RCU有四个严格前提：①读端只能通过指针访问数据——RCU保护的是「指针替换」而非「原地修改」，如果读者直接修改被指对象，RCU无法提供保护；②写端必须能容忍延迟回收——synchronize_rcu()可能等待数毫秒（需等所有CPU经过静止状态），实时性要求高的场景不能接受；③被保护的数据结构必须通过指针发布——链表、树等指针型结构适合，连续数组不适合；④写端开销大——每次写都要拷贝整个对象+等待宽限期。不满足时的替代方案：不满足①（原地修改）→用自旋锁或seqlock；不满足②（实时要求）→用自旋锁（忙等但无延迟）；不满足③（数组）→用读写自旋锁（rwlock）；读多写少但写端不能延迟→用seqlock（读端重读序号检测写冲突）。RCU最适合：配置表/路由表/模块列表等「几乎不写、大量读」的指针型数据结构。`,
    tags: ["同步", "RCU"],
  },
];
