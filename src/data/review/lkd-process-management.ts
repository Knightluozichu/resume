import type { ReviewQuestion } from "./types";

export const lkdProcessManagementQuestions: ReviewQuestion[] = [
  {
    id: "lkd-pm-1",
    chapter: "lkd-process-management",
    level: 2,
    question: `Linux中进程和线程的区别是什么？内核如何表示它们？`,
    answer:
      `在Linux内核中，进程和线程在内部统一用 task_struct 表示，没有专门区分。区别在于共享程度：进程有独立的地址空间（mm_struct）、文件描述符表、信号处理表；线程（在Linux中称为轻量级进程 LWP）共享同一进程的这些资源。fork() 创建新进程时复制所有资源；pthread_create() / clone() 创建线程时通过 clone_flags 指定共享 mm、files、signal 等。task_struct 中 pid 是线程ID，tgid（thread group id）是进程ID。用户视角的「进程PID」实际上是 tgid， getpid() 返回 tgid。这种设计简化了内核实现——调度器只需处理 task_struct，无需区分进程/线程。`,
    tags: ["进程管理", "task_struct"],
  },
  {
    id: "lkd-pm-2",
    chapter: "lkd-process-management",
    level: 2,
    question: `fork()的写时复制（COW）机制是什么？为什么需要它？`,
    answer:
      `写时复制：fork()时不立即复制父进程的整个地址空间，而是让子进程共享父进程的物理页，将所有页标记为只读。只有当父或子进程尝试写入某个页时，才触发缺页异常，内核这时才复制该页，将副本标记为可写，两个进程各自持有独立的页。好处：①大幅减少fork()耗时——不需要拷贝整个地址空间（可能几百MB）；②节省物理内存——大部分页父子进程都不修改，共享即可；③典型场景优化——fork()后通常立即exec()加载新程序，此时完全不需要复制。COW是fork性能的关键优化。`,
    tags: ["进程管理", "写时复制"],
  },
  {
    id: "lkd-pm-3",
    chapter: "lkd-process-management",
    level: 3,
    question: `描述进程从fork到exit的完整生命周期，包括各阶段的状态转换。`,
    answer:
      `①fork()——创建子进程，初始状态 TASK_RUNNING（就绪）；②调度器选中——运行态执行代码；③等待I/O或事件——调用 wait/sleep，状态变为 TASK_INTERRUPTIBLE（可中断睡眠）或 TASK_UNINTERRUPTIBLE（不可中断睡眠）；④事件完成——被唤醒，回到 TASK_RUNNING（就绪）；⑤再次被调度运行；⑥exit()——调用 do_exit()，释放资源，状态变为 EXIT_ZOMBIE（僵尸态），保留 task_struct 等待父进程 wait() 回收；⑦父进程 wait()——调用 release_task() 释放剩余资源，task_struct 彻底销毁。中途可能还有 TASK_STOPPED（被信号暂停如SIGSTOP）。僵尸态是进程终止到父进程回收之间的过渡状态。`,
    tags: ["进程管理", "生命周期"],
  },
  {
    id: "lkd-pm-4",
    chapter: "lkd-process-management",
    level: 4,
    question: `task_struct是内核中最重要的数据结构之一，它包含哪些关键类别信息？为什么不能过大？`,
    answer:
      `task_struct 包含：①标识信息——pid/tgid/uid/comm（进程名）；②调度信息——state/policy/prio/sched_entity（vruntime/权重）；③内存信息——mm_struct指针（地址空间）/active_mm；④文件信息——files_struct（文件描述符表）/fs_struct（当前目录）；⑤信号信息——signal_struct/sighand_struct/pending（待处理信号）；⑥命名空间与cgroup——nsproxy/css_set；⑦内核栈指针；⑧定时器——utime/stime/real_start_time。task_struct 不能过大的原因：每个进程/线程都有一个，系统可能有数万个线程，结构体过大会消耗巨量内核内存（不可换出）。内核通过指针间接引用（如mm指向mm_struct）而非内嵌来控制大小，且用slab分配器缓存。`,
    tags: ["进程管理", "task_struct"],
  },
];
