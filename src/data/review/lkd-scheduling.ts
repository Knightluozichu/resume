import type { ReviewQuestion } from "./types";

export const lkdSchedulingQuestions: ReviewQuestion[] = [
  {
    id: "lkd-sched-1",
    chapter: "lkd-scheduling",
    level: 2,
    question: "CFS（完全公平调度器）的核心思想是什么？它如何用vruntime实现公平？",
    answer:
      "CFS的核心思想：维护每个进程的虚拟运行时间（vruntime），始终选择vruntime最小的进程运行，这样每个进程都能获得公平的CPU时间份额。vruntime的计算公式为 vruntime += delta_exec * NICE_0_LOAD / weight，其中 delta_exec 是实际运行时间，weight 是进程权重（由nice值决定），NICE_0_LOAD 是nice 0的权重。nice值越低（优先级越高），weight越大，vruntime增长越慢，进程获得更多CPU时间。CFS用红黑树按vruntime排序所有可运行进程，总是选择最左节点（vruntime最小者）运行，插入/删除复杂度O(log n)。当vruntime最小的进程运行一段时间后其vruntime增长，不再是最小，调度器切换到新的最小者，实现公平轮转。",
    tags: ["进程调度", "CFS"],
  },
  {
    id: "lkd-sched-2",
    chapter: "lkd-scheduling",
    level: 3,
    question: "nice值与进程权重的关系是什么？CFS如何通过权重实现优先级？",
    answer:
      "nice值范围 -20 到 +19，默认0。nice值越低优先级越高。CFS将nice值映射为权重：nice 0对应权重1024，每差1级nice值权重乘以约1.25（即 nice值每差1，CPU时间份额差约10%）。权重表是预计算的数组（prio_to_weight[40]）。进程的CPU时间份额 = weight / sum(所有可运行进程weight)。例如两个进程A(nice 0, weight 1024)和B(nice -5, weight约3121)，A获得 1024/(1024+3121)≈25%的CPU时间，B获得75%。vruntime用 NICE_0_LOAD/weight 归一化：高权重进程vruntime增长慢，被调度的频率更高。这实现了「优先级高的进程获得更多CPU时间」同时保证低优先级进程不会被饿死。",
    tags: ["进程调度", "nice值"],
  },
  {
    id: "lkd-sched-3",
    chapter: "lkd-scheduling",
    level: 3,
    question: "上下文切换（context switch）的完整过程是什么？哪些开销是不可避免的？",
    answer:
      "上下文切换过程：①schedule()被调用（主动yield、时间片耗尽或抢占）；②pick_next_task()——调度器从运行队列选出下一个进程；③context_switch()——执行切换：a) switch_mm()——切换地址空间，加载新进程的页表基址到CR3寄存器，刷新TLB；b) switch_to()——切换CPU寄存器和内核栈指针，保存当前进程的寄存器状态到task_struct->thread，加载新进程的寄存器状态。不可避免的开关：①TLB刷新（不同地址空间时）导致后续访存变慢；②CPU缓存（L1/L2/L3）冷启动，新进程的数据不在缓存中；③寄存器/栈恢复开销；④分支预测器冷启动。上下文切换是纯开销（约几微秒），调度器应尽量减少不必要的切换。",
    tags: ["进程调度", "上下文切换"],
  },
  {
    id: "lkd-sched-4",
    chapter: "lkd-scheduling",
    level: 4,
    question: "CFS用红黑树而非普通链表或优先队列来组织运行队列，这个设计选择的深层原因是什么？",
    answer:
      "红黑树的优势：①查找最小值O(1)——最左节点即vruntime最小者，CFS每次调度只需取最左节点；②插入和删除O(log n)——进程入队（被唤醒）和出队（被调度或睡眠）高效；③平衡性保证——红黑树是最坏情况平衡的，不会退化为链表（普通BST可能退化），保证操作稳定可预测。对比其他结构：普通链表查找最小值O(n)，无法接受；优先队列（堆）虽查找最小值O(1)、插入O(log n)，但删除任意节点（如进程被信号杀死需从队列移除）需要O(n)扫描定位，而红黑树通过指针可直接删除O(log n)。此外红黑树按vruntime排序天然支持「选最小」的调度语义。CFS选择红黑树是「操作复杂度」和「功能需求」的平衡。",
    tags: ["进程调度", "数据结构"],
  },
];
