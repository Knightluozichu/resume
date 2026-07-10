import type { ReviewQuestion } from "./types";

export const dnjFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dnj-final-review-1",
    chapter: "dnj-final-review",
    level: 3,
    question: `用一次完整的「用户请求到达 Node.js 服务器到响应返回」旅程，串联全书核心知识点。`,
    answer:
      `①V8 引擎——服务器代码经 V8 JIT 编译执行，热点函数被 TurboFan 优化为机器码；②事件循环——TCP 连接有数据到达，libuv 通知事件循环 poll 阶段取出 I/O 回调；③HTTP 模块——net.Socket（Duplex Stream）触发 data 事件，http 模块解析 HTTP 报文生成 req（Readable）和 res（Writable）；④异步编程——业务代码用 async/await 编排异步操作（读数据库、调外部 API），await 暂停函数但不阻塞事件循环；⑤Stream——若响应大文件，用 pipeline 流式输出，背压机制防止内存溢出；⑥TCP/HTTP——响应通过 Keep-Alive 复用的 TCP 连接返回，连接放入空闲池；⑦WebSocket——若是实时通信场景则走 WebSocket 全双工通道；⑧NPM 模块——所有代码通过 require 加载，模块缓存保证单例；⑨测试部署——服务经 PM2 cluster 多进程管理或 Docker 容器化部署，SIGTERM 优雅关闭。一个请求贯穿全书。`,
    tags: ["综合", "运行时旅程", "事件循环", "Stream", "HTTP"],
  },
  {
    id: "dnj-final-review-2",
    chapter: "dnj-final-review",
    level: 3,
    question: `Node.js 为什么适合 I/O 密集型而不适合 CPU 密集型？CPU 密集任务如何解决？`,
    answer:
      `适合 I/O 密集型：Node.js 单线程事件循环 + libuv 异步 I/O，遇到 I/O 操作（网络、磁盘）时主线程不阻塞，把工作交给 libuv 线程池或 OS 异步接口，自己继续处理其他请求。一个线程能管理数万并发连接，I/O 等待时间被其他请求利用，吞吐量高。不适合 CPU 密集型：JavaScript 执行在单线程上，CPU 密集计算（加密、压缩、图像处理）会阻塞事件循环，期间无法处理任何 I/O 回调，所有请求被卡住。即使有 libuv 线程池（默认 4 线程），那也只是 I/O 辅助线程，JS 计算仍单线程。解决方案：①worker_threads——Node 10+ 的 Worker Threads，创建独立 V8 实例在子线程中执行 JS，通过 MessagePort 通信；②child_process——fork 子进程处理，适合隔离性要求高的场景；③cluster——多进程利用多核，主进程分发请求；④C++ Addon / N-API——将计算密集部分用 C++ 实现为原生模块，在 libuv 线程池中执行。⑤拆分为微服务——将 CPU 密集任务独立为服务。`,
    tags: ["综合", "I/O密集", "CPU密集", "worker_threads", "cluster"],
  },
  {
    id: "dnj-final-review-3",
    chapter: "dnj-final-review",
    level: 4,
    question: `一个 Node.js 服务内存持续增长直到 OOM，你会从哪些角度排查？`,
    answer:
      `排查路径：①确认是 V8 堆泄漏还是堆外内存（Buffer/C++ 层）——用 process.memoryUsage() 看 heapUsed vs rss，若 rss 增长但 heapUsed 稳定则是堆外泄漏（Buffer/原生模块）。②V8 堆泄漏——用 --inspect 连接 DevTools，拍 Heap Snapshot 对比（标记未释放对象），或用 heapdump 在生产定时抓快照。常见原因：①闭包引用——事件监听器未移除（EventEmitter 内存泄漏）、全局 Map/Set 缓存无淘汰策略、定时器引用大对象未 clear；②Stream 未正确关闭——pipe 错误未处理导致流和底层资源不释放；③模块缓存——动态 require 不同路径导致 Module._cache 膨胀。③堆外泄漏——Buffer 分配未释放（大文件一次性读入 Buffer 而非流式）、C++ Addon 内存泄漏。④GC 调优——若非泄漏而是 GC 跟不上（老生代膨胀），调 --max-old-space-size 增大堆，或 --expose-gc 手动触发 gc 观察。⑤工具——clinic.js doctor 分析内存趋势，--prof 生成 CPU/内存 profile。预防：设置 max-old-space-size 上限 + PM2 max_memory_restart 自动重启兜底。`,
    tags: ["综合", "内存泄漏", "OOM", "Heap Snapshot", "排查"],
  },
  {
    id: "dnj-final-review-4",
    chapter: "dnj-final-review",
    level: 4,
    question: `如果要设计一个支撑 10 万并发连接的 Node.js 实时通信服务，你会如何架构？`,
    answer:
      `架构设计：①连接层——用 WebSocket（ws 库或 Socket.io）建立长连接，单进程管理 ~1-2 万连接（受 fd 限制和事件循环压力），10 万连接需多进程；②进程模型——cluster 模式 fork N 个 Worker（N = CPU 核数），主进程 round-robin 分发；或用 PM2 cluster 管理。跨进程消息共享用 Redis Pub/Sub 或消息队列。③内存管理——连接对象用 Map 存储，设置心跳超时（30s ping/pong）自动清理断连；消息缓冲用流式处理避免大消息驻留内存。④背压控制——WebSocket 发送慢的客户端用 writable.writableHighWaterMark 判断，缓冲满时暂停推送或丢弃旧消息，防内存爆。⑤水平扩展——前端用 Nginx/HAProxy 做 WebSocket 负载均衡（ip_hash 或 sticky session），多台 Node 实例通过 Redis Pub/Sub 广播消息。⑥优雅关闭——SIGTERM 时停止接受新连接、等存量消息处理完、通知客户端重连其他节点。⑦监控——Prometheus 采集连接数、消息延迟、内存占用，设告警。⑧安全——wss:// TLS 加密、JWT 鉴权、限流防刷。关键指标：每连接内存 ~50KB，10 万连接约 5GB 堆外 + 堆内，需调 --max-old-space-size 和系统 ulimit -n（fd 上限）。`,
    tags: ["综合", "架构", "高并发", "WebSocket", "cluster", "Redis"],
  },
];
