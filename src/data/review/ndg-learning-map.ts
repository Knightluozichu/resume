import type { ReviewQuestion } from "./types";

export const ndgLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ndg-learning-map-1",
    chapter: "ndg-learning-map",
    level: 2,
    question: `全书五阶段递进结构是什么？为什么是这个顺序？`,
    answer:
      `基础入门（学习地图）→ 核心机制（事件循环/模块系统）→ I/O与流（流管道/Buffer/fs）→ 网络通信（HTTP/TCP/TLS）→ 进阶与总复习（集群/性能调试/总复习）。顺序由依赖决定：上层依赖下层。没有事件循环和模块系统就没有 Node 运行时基础；没有流和 Buffer 就无法处理 I/O 数据；没有网络模块就构不成服务器；没有集群和性能调试就无法扩展到生产。先有「能调度」，再有「能读写」，然后「能通信」，接着「能扩展」，最后「能监控」。`,
    tags: ["架构", "学习路径"],
  },
  {
    id: "ndg-learning-map-2",
    chapter: "ndg-learning-map",
    level: 2,
    question: `Node.js 为什么是单线程，却能处理高并发的网络 I/O？`,
    answer:
      `Node.js 的 JavaScript 执行是单线程（一个主线程 + 一个事件循环），但底层 libuv 线程池是多线程的（默认 4 线程）。遇到文件 I/O、DNS 等异步操作时，主线程把工作交给 libuv 线程池或操作系统异步接口（epoll/kqueue/IOCP），自己继续执行同步代码不阻塞。完成后回调进入队列，事件循环在阶段切换时取出执行。这种「单线程执行 + 多线程 I/O + 事件循环调度」让 Node 既避免多线程同步复杂度，又能高效处理并发 I/O。代价是 CPU 密集任务会阻塞事件循环，需用 worker_threads 拆分。`,
    tags: ["单线程", "事件循环", "libuv", "异步"],
  },
  {
    id: "ndg-learning-map-3",
    chapter: "ndg-learning-map",
    level: 3,
    question: `用「一次 HTTP 请求」的完整运行时旅程描述全书主线。`,
    answer:
      `①模块系统——服务器代码通过 require/import 加载（第 3 章）；②事件循环——请求到达后由事件循环的 poll 阶段接收（第 2 章）；③TCP/TLS——底层 TCP 连接已建立，若 HTTPS 则经 TLS 加密（第 7 章）；④HTTP 服务器——http 模块解析为 req（IncomingMessage 可读流）和 res（ServerResponse 可写流）（第 6 章）；⑤Buffer/fs——请求体以 Buffer chunk 流式到达，可能读写文件（第 4-5 章）；⑥流与管道——大响应用 pipe 流式输出（第 4 章）；⑦集群——cluster 分发请求到多核 Worker（第 8 章）；⑧性能——Profiler 监控 CPU/内存（第 9 章）。一个请求，九层全部参与。`,
    tags: ["架构", "运行时旅程"],
  },
  {
    id: "ndg-learning-map-4",
    chapter: "ndg-learning-map",
    level: 4,
    question: `会写 Node.js API 和真正懂 Node.js 运行时有什么本质区别？`,
    answer:
      `会写 API 只是表层——用 http.createServer 起服务、用 fs.readFile 读文件，照文档抄就会。真正难点在运行时：事件循环六阶段如何调度、微任务和宏任务的优先级、require 的路径解析和缓存机制、流的背压如何防止内存爆掉、Buffer 是堆外内存不经过 GC、TLS 握手的非对称到对称密钥切换、cluster 的 round-robin 分发、Heap Snapshot 如何找泄漏。这些是「代码跑起来后」才显现的机制，也是中高级面试与生产事故排查的真正考点。把 API 当终点的人写的代码能跑但脆弱；把运行时当核心的人才能写出可控、可扩展、可排查的 Node.js 服务。`,
    tags: ["架构", "运行时", "工程思维"],
  },
];
