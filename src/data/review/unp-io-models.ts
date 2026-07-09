import { ReviewQuestion } from "../types";

export const unpIoModelsQuestions: ReviewQuestion[] = [
  {
    id: "unp-io-models-1",
    chapter: "unp-io-models",
    level: 2,
    question: "UNIX 网络编程中的五种 I/O 模型是什么？它们的核心区别在哪里？",
    answer:
      "五种 I/O 模型：①阻塞式 I/O（默认，recvfrom 全程阻塞）②非阻塞式 I/O（轮询，返回 EWOULDBLOCK）③I/O 复用（select/poll 阻塞等待多个 fd）④信号驱动式 I/O（SIGIO 通知就绪，拷贝阶段仍阻塞）⑤异步 I/O（aio_read，内核完成全部工作后通知）。核心区别在于「等待数据就绪」和「数据拷贝」两个阶段谁来阻塞：前四种在拷贝阶段都阻塞，只有异步 I/O 两阶段都不阻塞。",
    tags: ["I/O模型", "select", "epoll", "异步I/O"],
  },
  {
    id: "unp-io-models-2",
    chapter: "unp-io-models",
    level: 2,
    question: "select 函数的工作原理是什么？它有哪些局限性？",
    answer:
      "select 的工作原理：将关心的 fd 集合（读/写/异常）传给内核，内核检查这些 fd 是否就绪，有就绪则返回，返回后应用需遍历所有 fd 检查哪些就绪。局限性：①fd 数量受 FD_SETSIZE 限制（默认 1024）②每次调用需全量拷贝 fd 集合到内核③返回后需 O(n) 遍历全部 fd 找出就绪的④不能跨平台高效支持大量连接。这些局限催生了 epoll。",
    tags: ["select", "I/O复用", "fd限制"],
  },
  {
    id: "unp-io-models-3",
    chapter: "unp-io-models",
    level: 3,
    question: "epoll 相比 select/poll 有哪些优势？水平触发（LT）和边沿触发（ET）有什么区别？",
    answer:
      "epoll 优势：①fd 无上限限制②内核维护兴趣列表，无需每次全量拷贝③就绪检测 O(1)——通过回调直接返回就绪 fd，不遍历全部④支持 ET 模式。LT（水平触发）：只要 fd 有数据可读就持续通知，编程简单但可能通知多次。ET（边沿触发）：仅在状态变化时通知一次，必须一次性读完所有数据（循环 read 到 EAGAIN），编程复杂但效率更高，减少了 epoll_wait 的调用次数。",
    tags: ["epoll", "LT", "ET", "边沿触发"],
  },
  {
    id: "unp-io-models-4",
    chapter: "unp-io-models",
    level: 2,
    question: "I/O 复用如何让单线程同时处理多个客户端连接？",
    answer:
      "I/O 复用让单线程在 select/poll/epoll 上阻塞等待多个 fd，任一 fd 就绪就返回，然后处理该就绪 fd 的 I/O 操作，再回到等待状态。这样单线程可以管理大量连接：服务端将监听套接字和所有已连接套接字都加入 fd 集合，select 返回后判断是哪个 fd 就绪——如果是监听套接字则 accept 新连接，如果是已连接套接字则 read/write 数据。避免了每个连接一个线程的开销。",
    tags: ["I/O复用", "单线程", "并发", "select"],
  },
];
