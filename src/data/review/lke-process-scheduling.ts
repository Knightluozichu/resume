import type { ReviewQuestion } from "./types";

export const lkeProcessSchedulingQuestions: ReviewQuestion[] = [
  {
    id: "lke-ps-1",
    chapter: "lke-process-scheduling",
    level: 2,
    question: `CFS为什么用红黑树而不是普通链表或优先队列？`,
    answer:
      `CFS需要频繁做三种操作：①插入新进程到运行队列；②删除被调度走或被阻塞的进程；③取vruntime最小的进程（leftmost）。红黑树是自平衡二叉搜索树，三种操作都是O(log n)。普通链表取最小值O(n)（需遍历）。优先队列（堆）取最小值O(1)但删除任意节点O(n)（无法高效删除非根节点），而CFS需要从树中删除任意进程。红黑树还保证最坏情况O(log n)深度，性能可预测。此外红黑树的leftmost指针缓存在cfs_rq中，取最小节点实际上是O(1)。综合来看，红黑树在插入/删除/查找最小三个操作上提供了最优的均衡性能。`,
    tags: ["调度器", "数据结构"],
  },
  {
    id: "lke-ps-2",
    chapter: "lke-process-scheduling",
    level: 2,
    question: `vruntime的计算公式是什么？它如何实现公平？`,
    answer:
      `vruntime += delta_exec * NICE_0_LOAD / se.load.weight。delta_exec是进程实际运行的时间片，NICE_0_LOAD是nice 0进程的基准权重，se.load.weight是当前进程的权重（由nice值决定）。关键洞察：nice 0的进程vruntime增长等于实际运行时间（NICE_0_LOAD/weight=1）；nice -10（高优先级）权重大，vruntime增长慢，获得更多CPU时间；nice +10（低优先级）权重小，vruntime增长快，获得更少CPU时间。CFS总是选vruntime最小的进程运行（红黑树leftmost），结果每个进程的「虚拟时间」公平推进，但实际CPU时间按权重分配——这就是「完全公平」的本质：按你应得的份额分配，而非绝对平均。`,
    tags: ["调度器", "vruntime"],
  },
  {
    id: "lke-ps-3",
    chapter: "lke-process-scheduling",
    level: 3,
    question: `描述从进程A切换到进程B的完整上下文切换过程。`,
    answer:
      `①时钟中断或进程A主动调用schedule()触发调度；②__schedule()调用pick_next_task()，从调度类优先级从高到低查找，CFS取红黑树leftmost（进程B）；③判断prev!=next，调用context_switch()；④switch_mm()：加载B的页表（B->mm->pgd）到CR3寄存器，刷新TLB；⑤switch_to()：保存A的callee-saved寄存器（RBP/RBX/R12-R15）到A的内核栈，加载B的寄存器从B的内核栈，切换RSP内核栈指针，切换TLS（FS/GS段基址）；⑥此时CPU已在B的上下文中执行；⑦finish_task_switch()清理A的残留工作（如果A已退出则最终释放task_struct）；⑧B从上次被切换走的位置继续执行。核心开销在页表切换（TLB失效）和寄存器保存恢复。`,
    tags: ["调度器", "上下文切换"],
  },
  {
    id: "lke-ps-4",
    chapter: "lke-process-scheduling",
    level: 3,
    question: `fork()创建子进程时，CFS如何设置新进程的vruntime以防止作弊？`,
    answer:
      `fork创建子进程时，子进程的初始vruntime设为min(curr->vruntime, cfs_rq->min_vruntime)。如果直接设为0，子进程vruntime最小，会立即抢占CPU并长时间独占——进程可以不断fork来获取CPU。如果设为父进程的vruntime，子进程和父进程vruntime相同，轮流运行——看起来公平但可能被利用（fork炸弹）。取min(curr->vruntime, min_vruntime)的方案：保证新进程vruntime不会小于当前运行队列的最小vruntime太多，既不会被饿死（vruntime不会太大），也不会独占CPU（vruntime不会太小）。此外，睡眠进程被唤醒时，vruntime设为max(se->vruntime, min_vruntime - sched_latency)，保证唤醒后不会被饿死也不会因vruntime太小独占。`,
    tags: ["调度器", "fork"],
  },
];
