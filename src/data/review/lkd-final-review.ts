import type { ReviewQuestion } from "./types";

export const lkdFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "lkd-fr-1",
    chapter: "lkd-final-review",
    level: 3,
    question: "用「一次fork()+exec()+wait()」串联进程管理、内存管理、VFS和系统调用四个子系统。",
    answer:
      "①fork()——系统调用进入内核，进程管理子系统分配新task_struct，内存管理用COW复制父进程地址空间（共享页表标记只读），文件描述符表共享或复制；②exec()——系统调用进入内核，VFS读取ELF文件头（经dentry/inode找到文件），内存管理销毁旧mm_struct，建立新地址空间（映射代码段/数据段/BSS/堆/栈），设置入口地址，从第一条指令重新执行；③子进程运行期间——通过系统调用（read/write等）与内核交互，经VFS操作文件，经内存管理分配/释放内存；④exit()——进程管理执行do_exit()，释放mm/files/signal，设置EXIT_ZOMBIE状态；⑤wait()——父进程系统调用进入内核，进程管理检查子进程是否为僵尸态，若是则release_task()回收task_struct。一次进程的诞生到消亡，四个子系统全部参与。",
    tags: ["全书复习", "数据流"],
  },
  {
    id: "lkd-fr-2",
    chapter: "lkd-final-review",
    level: 4,
    question: "如果系统出现严重性能问题，你会从哪些内核子系统排查？给出排查思路。",
    answer:
      "排查思路按子系统分层：①进程调度——top/htop看CPU占用率和运行队列长度（loadavg），如果runqueue长说明CPU不足或调度不均；pidstat看单个进程CPU时间分布。如果大量si（软中断）时间说明网络或I/O中断负载重；②内存管理——free看可用内存，vmstat看swap和page fault频率；如果si/so（swap in/out）高说明内存不足在换页；slabtop看内核slab缓存占用；oom-killer日志判断是否触发OOM；③I/O与VFS——iostat看磁盘IOPS和延迟，如果%util高且await大说明磁盘瓶颈；iotop找I/O大户；/proc/diskstats看块设备队列深度；④中断——/proc/interrupts看中断分布，如果某个CPU中断集中说明IRQ亲和性不均；⑤同步——perf lock看锁竞争，如果大量spinlock等待说明并发瓶颈。用perf top/ftrace/eBPF定位热点函数。",
    tags: ["全书复习", "性能排查"],
  },
  {
    id: "lkd-fr-3",
    chapter: "lkd-final-review",
    level: 4,
    question: "对比分析内核同步中自旋锁、信号量、RCU三种机制的适用场景和取舍。",
    answer:
      "自旋锁：临界区极短、不睡眠、中断上下文可用。CPU忙等浪费但不切换开销小，适合微秒级。多CPU争用短临界区首选。缺点：持锁时忙等占CPU，不能持锁睡眠。信号量/互斥锁：临界区较长或需睡眠。获取失败时进程睡眠让CPU，不浪费CPU但切换开销大（上下文切换约几微秒）。适合毫秒级或可阻塞场景。缺点：不能在中断上下文使用（中断不能睡眠），获取/释放开销比自旋锁大。RCU：读多写极少场景。读端零开销（不加锁不原子操作），写端需复制+延迟回收，有宽限期延迟。适合路由表/dentry等读密集结构。缺点：只保护指针数据结构，写端复杂，不适合频繁写的场景。取舍核心：短临界区→自旋锁（CPU换延迟），长临界区→信号量（调度换CPU），读多写少→RCU（空间换时间）。",
    tags: ["全书复习", "同步对比"],
  },
  {
    id: "lkd-fr-4",
    chapter: "lkd-final-review",
    level: 4,
    question: "从内核架构角度，解释「机制与策略分离」在Linux各子系统中的具体体现。",
    answer:
      "「机制与策略分离」贯穿Linux内核各子系统：①进程调度——CFS提供调度机制（红黑树管理运行队列、vruntime计算、上下文切换），调度策略（时间片粒度、唤醒抢占、组调度）通过可配置参数和调度类（sched_class）实现，用户可通过 nice/cgroups/chrt 调整策略不改内核；②VFS——VFS提供文件操作机制（superblock/inode/dentry/file对象、路径查找、Page Cache），具体策略由各文件系统实现（ext4的日志策略、nfs的网络传输策略、procfs的动态生成策略），通过file_operations/inode_operations函数指针表多态分发；③内存管理——Buddy/Slab提供分配机制，分配策略由GFP标志控制（GFP_KERNEL可睡眠等待、GFP_ATOMIC不睡眠、GFP_DMA限定Zone）；④中断——上半部/下半部是机制，具体用softirq/tasklet/workqueue是策略选择；⑤设备驱动——bus-device-driver绑定是机制，具体驱动行为是策略。这让内核保持通用而可扩展。",
    tags: ["全书复习", "架构哲学"],
  },
];
