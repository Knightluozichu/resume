import { ReviewQuestion } from "./types";

export const unpDaemonIpcQuestions: ReviewQuestion[] = [
  {
    id: "unp-daemon-ipc-1",
    chapter: "unp-daemon-ipc",
    level: 2,
    question: `守护进程化的核心步骤是什么？为什么要 fork 两次？`,
    answer:
      `守护进程化步骤：①fork() 父进程退出 ②setsid() 创建新会话 ③fork() 再次退出父进程（防止重新获取终端）④chdir(/) ⑤umask(0) ⑥close 所有终端 fd ⑦重定向 stdin/stdout/stderr 到 /dev/null。fork 两次的原因：第一次 fork + setsid 使进程成为新会话组长，脱离控制终端；但会话组长仍可能重新获取终端，第二次 fork 使进程不再是会话组长，无法重新关联终端，确保彻底脱离终端。`,
    tags: ["守护进程", "daemon", "setsid", "fork"],
  },
  {
    id: "unp-daemon-ipc-2",
    chapter: "unp-daemon-ipc",
    level: 1,
    question: `管道（pipe）和 FIFO（命名管道）有什么区别？各自适用于什么场景？`,
    answer:
      `管道（pipe）：由 pipe() 创建，半双工（单向），只能在有亲缘关系的进程间使用（父子进程），存在内核缓冲区中，fd 通过 fork 继承传递。FIFO（命名管道）：由 mkfifo(path) 创建，存在于文件系统中，任意进程都可以 open(path) 使用。管道适用于父子进程间简单通信；FIFO 适用于无亲缘关系的进程间通信，通过文件系统路径名关联。两者都是字节流，read 空时阻塞，write 断端时 SIGPIPE。`,
    tags: ["管道", "FIFO", "命名管道", "IPC"],
  },
  {
    id: "unp-daemon-ipc-3",
    chapter: "unp-daemon-ipc",
    level: 2,
    question: `共享内存为什么是最快的 IPC？使用它时需要注意什么问题？`,
    answer:
      `共享内存最快是因为它零拷贝：多个进程将同一块物理内存映射到各自的虚拟地址空间，直接读写同一块内存，无需内核中转。管道/消息队列每次通信都要经过内核拷贝。注意问题：①共享内存本身不提供同步机制，必须配合信号量或互斥锁保护并发访问，否则有竞态条件 ②需要处理进程异常退出时的资源清理 ③要注意内存可见性（缓存一致性）。典型用法：shm_open + mmap 映射，sem_open 创建信号量同步。`,
    tags: ["共享内存", "信号量", "IPC", "同步"],
  },
  {
    id: "unp-daemon-ipc-4",
    chapter: "unp-daemon-ipc",
    level: 2,
    question: `Unix 域套接字（AF_LOCAL）与网络套接字有什么区别？它有什么独特能力？`,
    answer:
      `区别：①Unix 域套接字地址是文件系统路径，不经过网络协议栈，只在本地进程间通信 ②比网络套接字快（无 IP/TCP 头处理、无校验和）③可靠、有序、全双工。独特能力：可以通过辅助数据（SCM_RIGHTS）在进程间传递文件描述符——发送进程将一个打开的 fd 放入 sendmsg 的辅助数据，内核在接收进程中创建新 fd 指向同一文件表项。这是 Unix 域套接字独有的能力，网络套接字做不到。`,
    tags: ["Unix域套接字", "AF_LOCAL", "fd传递", "SCM_RIGHTS"],
  },
];
