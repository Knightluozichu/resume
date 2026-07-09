import { ReviewQuestion } from "../types";

export const unpAdvancedIoQuestions: ReviewQuestion[] = [
  {
    id: "unp-advanced-io-1",
    chapter: "unp-advanced-io",
    level: 2,
    question: "readv/writev（scatter-gather I/O）的作用是什么？相比多次 read/write 有什么优势？",
    answer:
      "readv(fd, iov, iovcnt) 一次系统调用将数据分散读到多个缓冲区，writev 一次系统调用将多个缓冲区数据聚集写入。优势：①减少系统调用次数——多次 read/write 要多次陷入内核，readv/writev 只需一次 ②对于固定头部+变长体的协议（如 HTTP），可以分别用 iov[0] 读头部、iov[1] 读体，避免手动拼接 ③提高性能，尤其在数据量大时系统调用开销显著降低。",
    tags: ["readv", "writev", "scatter-gather", "系统调用"],
  },
  {
    id: "unp-advanced-io-2",
    chapter: "unp-advanced-io",
    level: 2,
    question: "信号驱动 I/O（SIGIO）的设置步骤是什么？它与 I/O 复用有什么区别？",
    answer:
      "设置步骤：①fcntl(fd, F_SETOWN, pid) 设置接收 SIGIO 的进程 ②fcntl(fd, F_SETFL, O_NONBLOCK | O_ASYNC) 开启异步通知 ③sigaction(SIGIO, handler) 注册信号处理函数 ④数据就绪时内核发 SIGIO，在 handler 中调用 recvfrom 读取。与 I/O 复用的区别：I/O 复用在 select 上阻塞等待，SIGIO 不阻塞主流程而是异步通知。但 SIGIO 的信号处理较复杂（信号屏蔽、可重入性），且仍有拷贝阶段阻塞，实际不如 epoll 常用。",
    tags: ["SIGIO", "信号驱动I/O", "fcntl", "O_ASYNC"],
  },
  {
    id: "unp-advanced-io-3",
    chapter: "unp-advanced-io",
    level: 3,
    question: "recvmsg/sendmsg 函数的 msghdr 结构包含哪些字段？相比 recvfrom/sendto 强在哪里？",
    answer:
      "msghdr 结构：msg_name（对端地址 sockaddr）、msg_namelen（地址长度）、msg_iov（iovec 数组，scatter-gather 缓冲区）、msg_iovlen（iov 数量）、msg_control（辅助数据缓冲区）、msg_controllen（辅助数据长度）、msg_flags（操作标志）。相比 recvfrom/sendto 的优势：①支持 scatter-gather（多个缓冲区）②支持辅助数据（传递 fd、TOS 等）③支持标志位返回。是功能最全的套接字 I/O 函数。",
    tags: ["recvmsg", "sendmsg", "msghdr", "辅助数据"],
  },
  {
    id: "unp-advanced-io-4",
    chapter: "unp-advanced-io",
    level: 3,
    question: "如何通过 Unix 域套接字传递文件描述符？内核是如何实现的？",
    answer:
      "发送端：构造 msghdr，在 msg_control 辅助数据中放入 SCM_RIGHTS 类型的 cmsg，cmsg_data 包含要传递的 fd，调 sendmsg。接收端：recvmsg 接收，从 msg_control 中解析 SCM_RIGHTS 取出新 fd。内核实现：发送端的 fd 不是直接传递数字，内核在接收进程中创建一个新的文件描述符，指向同一个文件表项（struct file）。两个 fd 不同但共享同一打开文件表项（偏移量、状态共享）。用途：权限委托、服务进程代理 I/O。",
    tags: ["fd传递", "SCM_RIGHTS", "Unix域套接字", "辅助数据"],
  },
];
