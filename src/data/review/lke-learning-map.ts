import type { ReviewQuestion } from "./types";

export const lkeLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "lke-lm-1",
    chapter: "lke-learning-map",
    level: 2,
    question: `全书五阶段递进结构是什么？为什么是这个顺序？`,
    answer:
      `内核基础 → 进程与调度 → 内存管理 → 文件与I/O → 同步网络与调试。顺序由依赖关系决定：先掌握用户态与内核态的边界和系统调用入口才有「能进入内核」的基础；内核要管理进程和调度CPU，于是进入进程管理；进程需要内存才能运行，于是进入内存管理；进程要读写持久化数据，于是进入文件系统与I/O；多进程并发需要同步保护，网络是现代内核的核心子系统，调试是工程必备能力，总复习用一次完整的数据流串联。先「能进入」，再「能调度」，然后「能分配」，接着「能读写」，最后「能贯通」。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "lke-lm-2",
    chapter: "lke-learning-map",
    level: 2,
    question: `用户态和内核态的根本区别是什么？`,
    answer:
      `用户态运行在Ring 3，有独立虚拟地址空间，不能执行特权指令（如修改页表、关中断、直接I/O），错误只导致自己崩溃（SIGSEGV）。内核态运行在Ring 0，共享全局内核地址空间，可执行所有指令、访问所有硬件，错误导致整个系统崩溃（kernel panic）。用户程序想做需要特权的事必须通过系统调用请求内核代劳，内核校验参数后才执行。CPU硬件提供Ring特权级机制，内核利用它构建安全边界。`,
    tags: ["架构", "内核基础"],
  },
  {
    id: "lke-lm-3",
    chapter: "lke-learning-map",
    level: 3,
    question: `用一次read()系统调用描述全书主线，列出各子系统的入场时机。`,
    answer:
      `一次read()经过七个内核子系统：①系统调用入口（第2章）——syscall指令进入内核态，保存上下文，分发到sys_read；②VFS层（第5章）——通过fd找到file对象，调用file.f_op->read_iter；③Page Cache（第5章）——查缓存，命中则copy_to_user返回；④内存分配（第4章）——未命中时alloc_pages从Buddy分配物理页；⑤块I/O（第6章）——submit_bio提交请求，经I/O调度器到驱动，进程睡眠等待；⑥中断处理（第6章）——DMA完成后硬中断+softirq标记完成，唤醒等待进程；⑦同步保护（第7章）——全程用自旋锁/RCU保护共享数据。一条数据流，七大子系统全部参与。`,
    tags: ["架构", "运行时旅程"],
  },
  {
    id: "lke-lm-4",
    chapter: "lke-learning-map",
    level: 4,
    question: `会调内核API和懂内核机制有什么本质区别？举例说明。`,
    answer:
      `会调内核API是「能编译运行」——照着教程抄kmalloc、copy_to_user就能写驱动。懂内核机制是「能解释系统为什么这样设计」：为什么CFS用红黑树而非优先队列（O(log n)插入删除且可预测，优先队列删除任意节点O(n)）、为什么自旋锁要关抢占而非仅原子操作（防止单核上持锁进程被调度走导致死锁）、为什么RCU读端不加锁也能安全（写端先拷贝再延迟回收旧副本，读端看到的指针要么旧要么新）、为什么Page Cache用address_space而非缓冲区头（支持以页为单位的统一缓存，减少元数据开销）。把内核当黑盒的人遇到panic只能重启；懂机制的人能用crash分析vmcore、用eBPF追踪函数参数、用ftrace绘制调用图。`,
    tags: ["架构", "工程思维"],
  },
];
