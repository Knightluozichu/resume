import type { ReviewQuestion } from "./types";

export const lkeFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "lke-fr-1",
    chapter: "lke-final-review",
    level: 3,
    question: "用一次read()系统调用串联全书所有子系统，说明各子系统的入场时机。",
    answer:
      "一次read(fd, buf, 4096)经过七个子系统：①系统调用入口（第2章）——syscall指令从Ring 3进入Ring 0，保存用户态上下文，按系统调用号分发到sys_read；②VFS层（第5章）——通过fd找到file对象，调用file.f_op->read_iter，经dentry/inode查找文件元数据；③Page Cache（第5章）——在address_space的XArray中查找页索引，命中则直接copy_to_user返回；④内存分配（第4章）——未命中时alloc_pages从Buddy System分配物理页加入Page Cache；⑤块I/O栈（第6章）——submit_bio提交I/O请求，经I/O调度器合并排序到块设备驱动，设置DMA后进程睡眠等待；⑥中断处理（第6章）——DMA完成后硬中断ACK并调度softirq，softirq标记页完成并唤醒等待进程；⑦同步保护（第7章）——全程用RCU保护dentry查找、自旋锁保护Page Cache和I/O队列、等待队列管理阻塞进程。被唤醒进程经CFS调度器（第3章）重新调度后copy_to_user返回数据。",
    tags: ["全书复习", "数据流"],
  },
  {
    id: "lke-fr-2",
    chapter: "lke-final-review",
    level: 3,
    question: "进程管理和同步机制之间有什么关联？共享了什么数据结构？",
    answer:
      "进程管理（第3章）和同步机制（第7章）通过task_struct的等待队列深度关联。当进程调用mutex_lock争用失败、或调用wait_event等待条件时，进程被设置为TASK_INTERRUPTIBLE/TASK_UNINTERRUPTIBLE状态，从运行队列移除，挂到等待队列（wait_queue_head_t）上睡眠。唤醒时（mutex_unlock或wake_up），同步原语从等待队列取出进程，设置为TASK_RUNNING，加入CFS运行队列的红黑树。此外，自旋锁通过关抢占（preempt_disable）直接影响调度器——持锁期间进程不会被调度走。信号量/互斥锁内部维护等待队列链表，链表节点包含task_struct指针。这种关联使得「让出CPU」和「保护共享数据」成为同一个机制的两面：同步原语既保护数据，又管理等待进程的生命周期。",
    tags: ["全书复习", "跨章关联"],
  },
  {
    id: "lke-fr-3",
    chapter: "lke-final-review",
    level: 4,
    question: "Linux内核各子系统有哪些共同的设计哲学？举例说明。",
    answer:
      "五大共性设计哲学：①分层抽象——VFS用super_block/inode/dentry/file抽象所有文件系统，网络栈按TCP/IP四层分层，设备模型用bus/device/driver抽象所有总线。上层通过操作函数表多态分发，不关心下层实现。②延迟处理——malloc只分配虚拟地址空间，首次访问触发缺页才分配物理页（延迟分配）；write只写Page Cache标记脏页，由flusher线程异步写回磁盘（延迟写回）；RCU写端替换指针后旧数据等宽限期后才释放（延迟回收）。③缓存优先——文件读写经Page Cache加速（命中率>95%），地址翻译经TLB加速（命中率>99%），路径查找经dcache/icache加速。④零拷贝——sk_buff在各协议层间只移动指针不加/剥头，Page Cache让多次读取同一文件不重复I/O，sendfile在内核页间直接传递不经用户空间。⑤按需加载——按需调页减少内存占用，内核模块按需insmod，设备驱动按需probe。",
    tags: ["全书复习", "设计哲学"],
  },
  {
    id: "lke-fr-4",
    chapter: "lke-final-review",
    level: 4,
    question: "为什么说内核不是孤立子系统的堆叠，而是紧密耦合的数据流网络？",
    answer:
      "以一次read()为例：系统调用入口（第2章）需要查task_struct（第3章）确认fd表；VFS（第5章）的dentry查找用RCU（第7章）保护；Page Cache（第5章）的物理页由Buddy（第4章）分配；未命中时submit_bio（第6章）下发到块设备驱动（第6章）；DMA完成后中断（第6章）唤醒等待进程，进程经CFS（第3章）重新调度；copy_to_user涉及页表（第4章）和权限检查；整个过程被自旋锁/RCU（第7章）保护；如果出问题用eBPF/perf（第9章）追踪；网络收包（第8章）的sk_buff从Slab（第4章）分配，NAPI复用中断/softirq（第6章）机制，路由表查找用RCU（第7章）保护。共享数据结构（task_struct/page/sk_buff/file）是各子系统的连接点，函数调用链是数据流的通道。理解这些关联才能从系统视角排查问题——一个网络延迟问题可能根因在内存管理的Slab碎片化，一个I/O性能问题可能根因在同步机制的锁争用。",
    tags: ["全书复习", "系统视角"],
  },
];
