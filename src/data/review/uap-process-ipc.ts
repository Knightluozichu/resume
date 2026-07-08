import type { ReviewQuestion } from "./types";

export const uapProcessIpcQuestions: ReviewQuestion[] = [
  {
    id: "uap-ipc-1",
    chapter: "uap-process-ipc",
    level: 2,
    question: "管道（pipe）有什么限制？FIFO（命名管道）解决了什么问题？",
    answer:
      "管道的限制：①半双工——数据只能单向流动（fd[1]写、fd[0]读），如需双向需两个管道；②必须有亲缘关系——pipe只能在fork后父子进程间使用（通过继承fd通信）；③无名字——管道没有路径名，不能被不相关进程打开。\nFIFO（命名管道）解决了「无亲缘关系进程间通信」的问题：①有名字——mkfifo(path, mode)创建一个在文件系统中可见的特殊文件；②任何有权限的进程都可以open(path)来使用；③语义与pipe相同——半双工、内核缓冲、先进先出。FIFO的常见用途：①shell命令管道——mkfifo后多个独立程序通过路径名通信；②客户-服务器模型——服务器创建FIFO，多个客户端open写入请求。注意：FIFO的open默认阻塞直到另一端也打开。",
    tags: ["管道", "FIFO", "IPC"],
  },
  {
    id: "uap-ipc-2",
    chapter: "uap-process-ipc",
    level: 3,
    question: "共享内存为什么是最快的IPC？它的同步问题如何解决？",
    answer:
      "共享内存是最快的IPC，原因：所有IPC机制中，只有共享内存省去了内核拷贝。管道/消息队列/套接字都需要数据从用户空间→内核空间→用户空间两次拷贝。共享内存让多个进程映射同一块物理内存到各自的虚拟地址空间，一个进程写入，另一个进程立即可见，全程零内核拷贝。\n同步问题：共享内存本身不提供任何同步机制——如果进程A正在写而进程B同时在读，会读到不一致的数据。解决方案：①信号量——进程A操作前P操作（减1），操作完V操作（加1），进程B在P操作处等待；②互斥锁——如果使用pthread互斥锁，需设置PTHREAD_PROCESS_SHARED属性，放在共享内存区域中；③记录锁（fcntl文件锁）——用文件锁保护共享区域。典型模式：shmget创建共享内存 → shmat映射 → 用信号量同步访问 → shmdt解除映射 → shmctl删除。",
    tags: ["共享内存", "信号量", "同步"],
  },
  {
    id: "uap-ipc-3",
    chapter: "uap-process-ipc",
    level: 3,
    question: "消息队列和管道相比有什么优势和劣势？",
    answer:
      "消息队列相比管道的优势：①有格式的消息——每条消息有type字段和数据部分，msgrcv可以按type选择性接收（不是严格的FIFO）；②面向消息——消息队列保留消息边界，一次msgsnd对应一次msgrcv，而管道是字节流无边界；③内核持久——消息队列随内核持续存在，即使所有使用它的进程都退出，消息也不丢失（直到显式msgctl删除或内核重启）；④异步——写端不需要读端等待（管道在缓冲区满时写端阻塞）。\n劣势：①性能——消息队列每次msgsnd/msgrcv都要从用户空间拷贝到内核空间，比共享内存慢；②容量限制——消息队列有系统级总大小限制；③API复杂——msgget/msgsnd/msgrcv/msgctl比pipe(fd)复杂得多。现代编程中，消息队列的使用逐渐减少，套接字和共享内存更常用。",
    tags: ["消息队列", "管道", "IPC对比"],
  },
  {
    id: "uap-ipc-4",
    chapter: "uap-process-ipc",
    level: 4,
    question: "mmap存储映射I/O的两种主要用法是什么？MAP_SHARED和MAP_PRIVATE有什么区别？",
    answer:
      "mmap的两种主要用法：①文件映射——将文件映射到进程内存空间，读写内存等价于读写文件，无需read/write系统调用。用于高效文件I/O和进程间共享文件数据。②匿名映射——无文件关联（fd=-1或MAP_ANON），用于分配内存（类似malloc）或父子进程共享内存。\nMAP_SHARED vs MAP_PRIVATE：①MAP_SHARED——修改写入底层文件（文件映射时）或被其他映射同一区域的进程看到（共享）。fork后子进程继承父进程的mmap映射，MAP_SHARED区域的修改父子互相可见，是IPC方式。②MAP_PRIVATE——写时复制（Copy-on-Write），进程修改时创建私有副本，不影响其他进程或底层文件。fork后子进程继承MAP_PRIVATE映射，任一方修改触发COW，互不影响。选择原则：需要进程间共享用MAP_SHARED，只需高效文件读取或独立内存用MAP_PRIVATE。mmap还需要配合msync刷盘和munmap解除映射。",
    tags: ["mmap", "存储映射", "MAP_SHARED"],
  },
];
