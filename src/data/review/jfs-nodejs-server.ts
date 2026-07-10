import type { ReviewQuestion } from "./types";

export const jfsNodejsServerQuestions: ReviewQuestion[] = [
  {
    id: "jfs-nodejs-server-1",
    chapter: "jfs-nodejs-server",
    level: 2,
    question: `Node.js 事件循环的六个阶段是什么？process.nextTick 和 Promise 谁先执行？`,
    answer:
      `六个阶段：timers（执行到期的 setTimeout/setInterval 回调）→ pending callbacks（系统级回调如 ECONNREFUSED）→ idle/prepare（内部使用）→ poll（取新 I/O 事件，执行 I/O 回调）→ check（执行 setImmediate 回调）→ close callbacks（close 事件）。每个阶段之间会清空微任务队列。process.nextTick 的回调放在独立的 nextTick 队列，优先级高于 Promise 微任务队列，会在每个阶段切换前、Promise 之前全部清空。所以 nextTick 比 Promise 先执行。滥用 nextTick 会饿死 I/O（总插队），生产中优先用 setImmediate 让出轮次。`,
    tags: ["事件循环", "nextTick", "微任务"],
  },
  {
    id: "jfs-nodejs-server-2",
    chapter: "jfs-nodejs-server",
    level: 2,
    question: `为什么 Node.js 单线程却能处理高并发网络请求？`,
    answer:
      `Node 的「单线程」指 JavaScript 执行栈是单线程，但遇到 I/O 操作（fs、http、db）时不等待，把实际工作交给 libuv 线程池（默认 4 线程）或操作系统异步接口，主线程继续处理下一个请求。I/O 完成后回调进入队列，事件循环在主线程空闲时取出执行。这种「单线程执行 + 多线程 I/O + 事件循环调度」让一个进程能同时管理成千上万连接，避免了多线程的上下文切换和同步开销。代价是 CPU 密集任务会霸占主线程让所有请求排队，需用 Worker Threads 或 cluster 拆分。`,
    tags: ["单线程", "非阻塞I/O", "事件循环"],
  },
  {
    id: "jfs-nodejs-server-3",
    chapter: "jfs-nodejs-server",
    level: 3,
    question: `为什么 Stream 处理大文件比 readFile 一次性读取更优？背压是什么？`,
    answer:
      `readFile 把整个文件读进内存再返回，1GB 文件就吃 1GB 内存，并发几个就 OOM。Stream 分块读取（默认 64KB highWaterMark），读一块处理一块，内存占用恒定。背压（backpressure）是「读得快写得慢」的问题：可读流生产数据比可写流消费快，多余数据堆积在内存缓冲区。pipe 会自动监听可写流的 drain 事件，缓冲满时暂停 readable、消费完再恢复，避免内存爆炸。手动处理流若不接背压（如 readable.on('data') 直接 write），大文件会撑爆内存。这是 Node 流式处理的核心机制。`,
    tags: ["Stream", "背压", "内存"],
  },
  {
    id: "jfs-nodejs-server-4",
    chapter: "jfs-nodejs-server",
    level: 4,
    question: `Node.js 如何利用多核 CPU？cluster 和 Worker Threads 各适合什么场景？`,
    answer:
      `Node 单进程只用一个核，利用多核有两条路：①cluster 模块 fork 多个进程（通常每核一个），共享同一端口（靠主进程负载均衡分发连接），适合 Web 服务器水平扩展——每个进程独立事件循环，互不阻塞，某进程崩溃不影响其他；②Worker Threads 在同一进程内开多个线程跑 CPU 密集任务，通过 SharedArrayBuffer/MessagePort 通信，适合「需要共享内存或频繁通信的 CPU 密集计算」（如图像处理、加密）。选型：I/O 并发扩展用 cluster（进程隔离简单稳）；CPU 密集且需共享数据用 Worker Threads；若 CPU 密集且可独立分发，cluster 也够。真正会卡死 Node 的是同步 CPU 密集计算。`,
    tags: ["cluster", "Worker Threads", "多核"],
  },
];
