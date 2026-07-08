import type { ReviewQuestion } from "./types";

export const uapLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "uap-lm-1",
    chapter: "uap-learning-map",
    level: 2,
    question: "《UNIX环境高级编程》全书的知识递进结构是什么？为什么是这个顺序？",
    answer:
      "全书分为六个递进阶段：①文件I/O（open/read/write/close）→ ②文件与目录及进程环境（stat/目录遍历/environ）→ ③进程控制与信号（fork/exec/wait/signal）→ ④进程间通信与线程（pipe/mmap/pthread）→ ⑤高级I/O（select/poll/epoll）→ ⑥全书复习。顺序由依赖关系决定：先掌握文件描述符和基本I/O操作，再理解文件属性和进程的内存布局与启动流程；进程是UNIX编程核心对象，需先掌握创建与控制；信号是进程间异步通信的基础；IPC和线程解决多任务协作；高级I/O解决高并发场景。先「会读写文件」，再「管理进程」，然后「处理异步事件」，接着「进程间协作」，再「多线程并发」，最后「高性能I/O」。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "uap-lm-2",
    chapter: "uap-learning-map",
    level: 2,
    question: "UNIX编程的核心理念「一切皆文件」是什么含义？它如何影响API设计？",
    answer:
      "「一切皆文件」是UNIX的核心设计哲学。UNIX将普通文件、目录、设备（字符/块）、管道、套接字、FIFO都统一为文件描述符接口，用 open/read/write/close 操作一切。好处：①API统一——学一套接口就能操作所有资源；②可组合——管道可以把任何程序的输出接到另一个程序的输入；③工具链——cat、grep、sort 等工具因为统一接口可以任意组合。这使UNIX编程模型极其简洁而强大，是APUE全书的基础。",
    tags: ["设计哲学", "文件描述符"],
  },
  {
    id: "uap-lm-3",
    chapter: "uap-learning-map",
    level: 3,
    question: "用一次「Web服务器处理并发请求」串联全书主要章节。",
    answer:
      "一次Web请求串联全书：①文件I/O（第1-2章）——socket()创建fd，accept()返回新fd，read/write收发数据；②文件与目录（第3-4章）——stat()获取静态文件大小，进程环境提供配置；③进程控制+信号（第5-6章）——fork()创建子进程处理请求，SIGCHLD回收僵尸进程，SIGPIPE处理客户端断连；④IPC+线程（第7-8章）——多线程模型中主线程accept工作线程处理，互斥锁保护共享数据；⑤高级I/O（第9-10章）——epoll单线程管理数万连接，非阻塞I/O配合ET边缘触发。一条请求流，全书知识点全部参与。",
    tags: ["架构", "运行时旅程"],
  },
  {
    id: "uap-lm-4",
    chapter: "uap-learning-map",
    level: 4,
    question: "APUE中从「单进程阻塞I/O」到「单线程epoll高并发」的演进路径是什么？每步解决了什么问题？",
    answer:
      "演进路径：①单进程阻塞I/O——简单但一个连接阻塞整个进程，无法处理并发；②多进程fork——每个连接一个子进程，隔离好但进程创建开销大、资源消耗多；③多线程——每连接一个线程，比进程轻量但线程同步复杂、大量线程调度开销大；④select/poll多路转接——单线程管理多个fd，但O(n)遍历和fd数量限制；⑤epoll——O(1)就绪通知，内核维护就绪表，支持百万连接。每步解决的问题：fork解决并发隔离，线程解决进程开销，select/poll解决线程数量爆炸，epoll解决select/poll的O(n)遍历和fd限制。核心思想：用更少的系统资源管理更多的并发连接。",
    tags: ["架构", "并发模型"],
  },
];
