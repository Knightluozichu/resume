import type { ReviewQuestion } from "./types";

export const ucnCppServerBaseQuestions: ReviewQuestion[] = [
  {
    id: "ucn-cpp-server-base-1",
    chapter: "ucn-cpp-server-base",
    level: 2,
    question: `epoll 的 LT（水平触发）和 ET（边沿触发）有什么区别？各有什么注意事项？`,
    answer:
      `LT 水平触发：只要 fd 上有可读/可写数据，每次 epoll_wait 都会通知，直到处理完为止。编程简单，但可能被重复通知。ET 边沿触发：只在 fd 状态变化时通知一次（从不可读变为可读），必须一次性读完所有数据（循环 read 直到返回 EAGAIN），否则下次不会再通知。ET 效率更高（减少内核-用户态切换），但编程复杂，必须搭配非阻塞 I/O 使用。游戏服务器一般用 ET 获得更高吞吐量。`,
    tags: ["epoll", "IO模型", "Linux"],
  },
  {
    id: "ucn-cpp-server-base-2",
    chapter: "ucn-cpp-server-base",
    level: 2,
    question: `Reactor 模式和 Proactor 模式的核心区别是什么？分别对应什么系统 API？`,
    answer:
      `Reactor（反应器）：同步 I/O，操作系统通知「数据就绪」（fd 可读），由应用程序自己执行 read/write 拷贝数据。对应 Linux epoll。优点是跨平台、编程模型清晰。Proactor（前摄器）：异步 I/O，应用程序发起读请求后立即返回，操作系统完成数据拷贝后通知「I/O 完成」。对应 Windows IOCP（WSARecv + GetQueuedCompletionStatus）。Proactor 性能略高（内核负责拷贝），但平台绑定。`,
    tags: ["Reactor", "Proactor", "IO模型", "架构"],
  },
  {
    id: "ucn-cpp-server-base-3",
    chapter: "ucn-cpp-server-base",
    level: 3,
    question: `设计一个游戏服务器的线程模型：IO 线程和逻辑线程如何分工？`,
    answer:
      `采用「IO 线程 + 逻辑线程」分离模型：① IO 线程（1-N 个）跑 epoll_wait/IOCP 事件循环，只负责收发字节流——recv 到数据后拆包，将完整消息推入消息队列；发包时从发送队列取数据调用 send。不做任何业务逻辑。② 逻辑线程（1-N 个）从消息队列取消息，按 MsgId 查路由表分发到 Handler，执行业务逻辑（计算伤害/移动校验等），生成回包推入发送队列。③ 线程间用无锁队列或互斥锁队列通信。这样 IO 不阻塞逻辑，逻辑不阻塞 IO，可独立扩缩容。`,
    tags: ["线程模型", "架构", "并发"],
  },
  {
    id: "ucn-cpp-server-base-4",
    chapter: "ucn-cpp-server-base",
    level: 1,
    question: `为什么游戏服务器通常选择单线程逻辑而不是多线程并行逻辑？如何兼顾性能？`,
    answer:
      `单线程逻辑的最大好处是「不需要锁」——所有游戏状态（HP/位置/背包）在同一线程内串行修改，天然线程安全，避免了锁竞争、死锁、ABA 等并发问题。游戏逻辑本质上是状态机，串行执行语义最简单。兼顾性能的方法：① IO 和网络层多线程并行（IO 线程不影响逻辑）；② 逻辑线程用高效的定时器和优先级队列减少空转；③ 耗时操作（数据库/日志）异步化，投递到独立线程池；③ 如果单核扛不住，按房间/场景分进程（分片），而不是在同一进程内多线程并行逻辑。`,
    tags: ["线程模型", "并发", "架构", "锁"],
  },
];
