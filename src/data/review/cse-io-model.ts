import type { ReviewQuestion } from "./types";

/** C++ 服务器开发精髓 · IO 模型复习题 */
export const cseIoModelQuestions: ReviewQuestion[] = [
  {
    id: "cse-io-model-1",
    chapter: "cse-io-model",
    level: 1,
    question: `一次网络 IO 操作分为哪两个阶段？五种 IO 模型的核心区别在哪个阶段？`,
    answer:
      `一次网络 IO 分两个阶段：\n\n1. 等待数据阶段：内核等待网卡把数据收到 socket 接收队列。\n2. 复制数据阶段：内核把数据从内核空间拷贝到用户空间（read 的缓冲区）。\n\n五种 IO 模型的核心区别在「等待数据」阶段：\n- 阻塞 IO：线程挂起等待，什么都做不了\n- 非阻塞 IO：没数据立刻返回 EAGAIN，但要忙轮询\n- IO 多路复用：一个线程用 epoll 同时等多个 fd\n- 信号驱动 IO：内核数据就绪时发信号通知\n- 异步 IO：内核把两个阶段都做完才通知\n\n前四种模型在「复制数据」阶段仍然阻塞，只有异步 IO 全程不阻塞。`,
    tags: ["IO 模型", "两阶段", "epoll"],
  },
  {
    id: "cse-io-model-2",
    chapter: "cse-io-model",
    level: 2,
    question: `为什么加入 epoll 的 fd 必须设为非阻塞（O_NONBLOCK）？`,
    answer:
      `因为 epoll_wait 返回就绪 fd 后，调用 read 时数据可能已经被其他线程或上一次处理读完了。如果 fd 是阻塞的，read 会挂起线程等待新数据到达，导致整个事件循环卡在一个连接上，其他连接的事件得不到处理。\n\n设为非阻塞后：\n- read 没数据时立刻返回 EAGAIN，循环可以继续处理下一个就绪 fd\n- 边缘触发（ET）模式下必须循环 read 到 EAGAIN 为止，非阻塞是前提\n\n\`\`\`cpp\n// 设置非阻塞\nint flags = fcntl(fd, F_GETFL, 0);\nfcntl(fd, F_SETFL, flags | O_NONBLOCK);\n\`\`\`\n\n这是 epoll 编程的基本纪律：所有加入 epoll 的 fd 必须非阻塞。`,
    tags: ["非阻塞", "epoll", "EAGAIN"],
  },
  {
    id: "cse-io-model-3",
    chapter: "cse-io-model",
    level: 3,
    question: `边缘触发（ET）和水平触发（LT）有什么区别？ET 模式下 read 该怎么写？`,
    answer:
      `水平触发（LT，默认）：只要 fd 有数据可读，每次 epoll_wait 都会返回它。即使你没读完，下次还会通知。\n\n边缘触发（ET）：只在状态变化时通知一次（从无数据到有数据）。如果一次 read 没读完，后续数据不会再通知，会丢数据。\n\nET 模式下 read 必须循环读到 EAGAIN：\n\`\`\`cpp\nvoid handle_read(int fd) {\n  while (true) {\n    int n = read(fd, buf, sizeof(buf));\n    if (n > 0) {\n      // 处理数据\n    } else if (n == 0) {\n      // 对端关闭\n      close(fd);\n      break;\n    } else {\n      if (errno == EAGAIN || errno == EWOULDBLOCK) {\n        break;  // 读完了，正常退出\n      }\n      // 其他错误\n      close(fd);\n      break;\n    }\n  }\n}\n\`\`\`\n\nET 减少了 epoll_wait 的返回次数（效率高），但编程复杂度更高。不确定就用 LT。`,
    tags: ["边缘触发", "水平触发", "EAGAIN"],
  },
  {
    id: "cse-io-model-4",
    chapter: "cse-io-model",
    level: 4,
    question: `综合分析：为什么 Linux 高性能服务器普遍选择 IO 多路复用（epoll）而非异步 IO（aio）？`,
    answer:
      `Linux 高性能服务器选择 epoll 而非 aio 的原因：\n\n1. Linux aio 的局限：Linux 原生 aio（\`aio_read\`）对网络 socket 支持不完善，主要面向文件 IO。且需要预分配缓冲区，灵活性差。io_uring 是较新的异步方案，但生态和稳定性仍在完善。\n\n2. epoll 的成熟度：epoll 自 Linux 2.6 起就是标准，经过十几年验证，性能稳定。O(1) 事件返回，支持数十万 fd。\n\n3. Reactor 生态：epoll 配合 Reactor 模式有大量成熟框架（muduo、libevent、libev），工具链完善。aio 对应的 Proactor 模式在 Linux 上缺乏生态。\n\n4. 编程模型一致性：epoll + 非阻塞 fd + Reactor 的模型统一处理网络和定时器事件，心智模型一致。aio 的回调和事件循环模型不同。\n\n5. 实际性能足够：epoll + 线程池的性能在绝大多数场景已经足够，且「等待数据」阶段 epoll 已做到不阻塞，「复制数据」阶段的数据量通常很小，阻塞影响有限。\n\n所以 epoll 成为事实标准，io_uring 是未来的趋势但目前还不够普及。`,
    tags: ["综合", "epoll", "异步IO", "选型"],
  },
];
