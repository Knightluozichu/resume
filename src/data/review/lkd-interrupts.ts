import type { ReviewQuestion } from "./types";

export const lkdInterruptsQuestions: ReviewQuestion[] = [
  {
    id: "lkd-intr-1",
    chapter: "lkd-interrupts",
    level: 2,
    question: `中断上半部和下半部的分工原则是什么？为什么要把中断处理分成两部分？`,
    answer:
      `上半部（硬中断/top half）：响应硬件中断，执行最紧急的工作——应答设备（ACK）、禁用该中断线、将数据拷入内存、调度下半部。必须在极短时间内完成，因为中断处理期间该CPU的中断可能被禁用，延迟会影响系统响应性。下半部（bottom half）：执行可延迟的、不那么紧急的工作——如唤醒等待进程、协议解析、数据加工。下半部执行时中断是开启的，可以被新的中断抢占。分两部分的原因：中断处理本质上是「借用了被中断进程的上下文」，不能执行太耗时的工作（如睡眠、长时间计算）。上半部只做最少的应答和标记，下半部在合适的时机（开中断的环境下）完成剩余工作，既保证了中断的及时响应，又不会长时间禁用中断。`,
    tags: ["中断", "上下半部"],
  },
  {
    id: "lkd-intr-2",
    chapter: "lkd-interrupts",
    level: 2,
    question: `softirq、tasklet和workqueue三种下半部机制有什么区别？各自适用什么场景？`,
    answer:
      `softirq：最底层的软中断机制，静态编译注册（不可动态添加），同一类型的softirq可在不同CPU上并行执行，不能睡眠。适用于对性能要求极高且可并行的场景（如网络收包NET_RX_SOFTIRQ、块设备完成）。tasklet：基于softirq实现，可动态注册，同一tasklet不会在多个CPU上同时执行（串行化），不能睡眠。适用于大部分驱动的中断下半部，比softirq简单且安全。workqueue：基于内核线程实现，执行在进程上下文中，可以睡眠（能调用可能阻塞的函数如kmalloc(GFP_KERNEL)），可动态创建。适用于需要睡眠或执行耗时操作的下半部（如磁盘I/O、用户态交互）。选择原则：不能睡眠且高性能用softirq；不能睡眠用tasklet；需要睡眠用workqueue。`,
    tags: ["中断", "下半部机制"],
  },
  {
    id: "lkd-intr-3",
    chapter: "lkd-interrupts",
    level: 3,
    question: `中断处理函数（ISR）有哪些严格的编程限制？违反会怎样？`,
    answer:
      `ISR的限制：①不能睡眠/阻塞——不能调用可能睡眠的函数（mutex_lock、kmalloc(GFP_KERNEL)、schedule），因为ISR没有进程上下文，无法被调度唤醒，睡眠会导致死锁或panic；②不能访问用户空间——不能调用copy_to_user/copy_from_user，因为没有用户地址空间的上下文；③执行时间要尽量短——ISR期间该CPU通常禁用当前中断线甚至所有中断，太长会丢失中断或影响响应延迟；④不能持锁过久——持锁会阻塞其他CPU上的代码；⑤注意可重入性——同一ISR可能在多个CPU上同时执行。违反后果：睡眠导致panic或死锁；长时间执行导致中断丢失、系统卡顿；竞态条件导致数据损坏。正确做法是把耗时工作推迟到下半部。`,
    tags: ["中断", "编程约束"],
  },
  {
    id: "lkd-intr-4",
    chapter: "lkd-interrupts",
    level: 4,
    question: `中断向量表（IDT）的工作原理是什么？一个硬件中断从产生到ISR执行的完整路径是怎样的？`,
    answer:
      `IDT（Interrupt Descriptor Table）是CPU硬件机制，包含256个门描述符，每个描述符指向一个中断处理函数入口。CPU在启动时由内核初始化IDT。完整路径：①硬件设备产生中断信号，发送到中断控制器（如APIC/LAPIC）；②中断控制器将中断向量号（一个0-255的数字）发送给CPU；③CPU收到中断信号，如果当前优先级允许，暂停当前指令；④CPU保存上下文——将SS、RSP、RFLAGS、CS、RIP压入内核栈（如果发生特权级切换还需切换栈）；⑤CPU用中断向量号索引IDT，找到对应的门描述符；⑥跳转到描述符指向的入口函数（如 entry_INT_... ）；⑦入口函数保存完整寄存器到 pt_regs，调用 do_IRQ() → handle_irq() → 最终调用驱动注册的ISR；⑧ISR执行完毕，返回 do_IRQ，执行软中断检查，最后 iret 返回被中断的代码。`,
    tags: ["中断", "IDT"],
  },
];
