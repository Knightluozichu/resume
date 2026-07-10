import type { ReviewQuestion } from "./types";

export const lkeKernelArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "lke-ka-1",
    chapter: "lke-kernel-architecture",
    level: 2,
    question: `系统调用和中断有什么异同？`,
    answer:
      `相同点：两者都触发CPU从Ring 3切换到Ring 0，都保存用户态上下文，都跳转到内核预定义入口执行。不同点：①发起方——系统调用由用户程序主动执行syscall指令发起（同步），中断由外设硬件或CPU异常触发（异步或被动）；②入口——系统调用经syscall_dispatch_table按rax寄存器值分发，中断经IDT（中断描述符表）按中断号分发；③上下文——系统调用在进程上下文中执行（可以睡眠、可访问当前进程task_struct），硬件中断在中断上下文中执行（不能睡眠、无明确进程归属）；④返回——系统调用用sysret/iret返回，中断用iret返回并可能检查是否需要调度。`,
    tags: ["系统调用", "中断"],
  },
  {
    id: "lke-ka-2",
    chapter: "lke-kernel-architecture",
    level: 2,
    question: `Linux内核包含哪些核心子系统？各自的职责是什么？`,
    answer:
      `六大核心子系统：①进程管理——task_struct描述进程，CFS调度器分配CPU，负责进程创建/调度/销毁；②内存管理——Zone分区物理内存，Buddy伙伴系统按2^n页分配，Slab管理小对象，4级页表翻译虚拟地址；③文件系统——VFS用super_block/inode/dentry/file四对象抽象所有文件系统，Page Cache加速读写；④网络协议栈——sk_buff为统一载体，分层处理TCP/UDP/IP，Netfilter提供防火墙钩子；⑤设备驱动——字符/块/网络三类设备，bus-device-driver三角绑定；⑥同步原语——自旋锁/互斥锁/RCU/原子操作保护并发访问。`,
    tags: ["架构", "子系统"],
  },
  {
    id: "lke-ka-3",
    chapter: "lke-kernel-architecture",
    level: 3,
    question: `为什么系统调用比普通函数调用昂贵得多？`,
    answer:
      `普通函数调用只涉及栈帧切换（几纳秒），系统调用涉及：①特权级切换（Ring 3→Ring 0），CPU需要刷新流水线；②栈切换（用户栈→内核栈），保存用户态所有寄存器；③内核入口函数执行参数校验和安全性检查；④TLB可能部分失效（页表切换），导致后续访存miss；⑤分支预测器缓存污染，内核代码的分支模式与用户态不同。实测一次getpid()约100~200ns，普通函数调用约1~2ns，差两个数量级。这就是为什么glibc的printf要先写入用户态缓冲区，攒够一页再write系统调用一次性输出——减少跨越用户态/内核态边界的次数。`,
    tags: ["系统调用", "性能"],
  },
  {
    id: "lke-ka-4",
    chapter: "lke-kernel-architecture",
    level: 3,
    question: `中断上下文和进程上下文有什么区别？对编程有什么约束？`,
    answer:
      `进程上下文是系统调用执行时的环境，有当前进程的task_struct，可以睡眠（调度器能切换回来）、可以持有互斥锁、可以分配GFP_KERNEL内存、可以执行可能阻塞的I/O操作。中断上下文是硬件中断处理函数的执行环境，不属于任何进程，没有task_struct可供调度，不能睡眠（调度器无法切换回来，会导致死锁或panic）、不能持有互斥锁（mutex可能睡眠）、不能分配GFP_KERNEL内存（可能换出导致睡眠）、不能执行copy_from_user（可能缺页睡眠）。只能用自旋锁（spin_lock_irqsave）、分配GFP_ATOMIC内存、执行快速非阻塞操作。耗时操作应推迟到下半部（workqueue运行在进程上下文，可睡眠）。`,
    tags: ["中断", "上下文"],
  },
];
