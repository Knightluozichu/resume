import type { ReviewQuestion } from "./types";

export const ndgClusterWorkerQuestions: ReviewQuestion[] = [
  {
    id: "ndg-cluster-worker-1",
    chapter: "ndg-cluster-worker",
    level: 2,
    question: "cluster 模块的作用是什么？多个 Worker 如何共享同一个端口？",
    answer:
      "cluster 模块让 Node.js 利用多核 CPU——主进程 fork 出多个子进程（Worker），每个 Worker 运行同一份代码的独立事件循环。端口共享原理：所有 Worker 调用 listen(port) 时，实际上是主进程统一创建一个 listen socket，然后通过 IPC 把句柄传给各 Worker。连接到达时，主进程用 round-robin 策略（除 Windows 外默认）把连接分发给 Worker——不是各 Worker 竞争 accept（惊群问题）。所以 N 个 Worker 可以共同服务一个端口，每个 Worker 独立处理分配到的连接。判断角色：cluster.isMaster（主进程）vs cluster.isWorker（子进程）。典型模式：主进程 fork CPU 核心数个 Worker，Worker 崩溃时自动重启（cluster.on('exit', () => cluster.fork())）。PM2 就是基于 cluster 封装的生产级进程管理器。",
    tags: ["cluster", "多进程", "端口共享", "round-robin"],
  },
  {
    id: "ndg-cluster-worker-2",
    chapter: "ndg-cluster-worker",
    level: 3,
    question: "worker_threads 和 cluster 的本质区别是什么？各自适合什么场景？",
    answer:
      "本质区别：cluster 是多进程——每个 Worker 是独立进程，有独立的 V8 实例、独立内存空间、独立事件循环，通过 IPC（消息序列化）通信。worker_threads 是多线程——每个 Worker 在同进程内的独立线程，有独立的 V8 实例和事件循环，但共享进程内存（可通过 SharedArrayBuffer 零拷贝通信）。适合场景：cluster 适合 I/O 密集的水平扩展（HTTP 服务器多核负载），进程隔离保证一个崩溃不影响其他。worker_threads 适合 CPU 密集计算（图像处理/加密/压缩），不阻塞主线程事件循环，且比 cluster 轻量（不需要复制整个进程内存）。选择原则：I/O 并发用 cluster（或多开实例 + 负载均衡），CPU 计算用 worker_threads。注意 worker_threads 不是「替代多进程」而是「补足 CPU 密集场景」。",
    tags: ["worker_threads", "cluster", "多进程", "多线程", "对比"],
  },
  {
    id: "ndg-cluster-worker-3",
    chapter: "ndg-cluster-worker",
    level: 3,
    question: "worker_threads 中主线程和 Worker 线程如何通信？SharedArrayBuffer 有什么优势和风险？",
    answer:
      "通信方式：①postMessage/on('message')——结构化克隆传输数据（支持对象/ArrayBuffer 但函数不行），简单但有序列化开销。②MessageChannel——创建双向通信管道，port1/port2 分别给两端。③SharedArrayBuffer——多线程共享同一块内存，零拷贝读写，配合 Atomics 保证原子操作。优势：零拷贝——大数据传输无需序列化，微秒级延迟。风险：①数据竞争——多线程同时写同一位置导致数据损坏，必须用 Atomics.load/store/compareExchange 保护；②内存泄漏——SharedArrayBuffer 不会被 GC 直到所有线程释放引用；③安全限制——浏览器中因 Spectre 漏洞默认禁用，需 COOP/COEP 头；Node 中无此限制。最佳实践：简单场景用 postMessage，极致性能用 SharedArrayBuffer + Atomics，避免直接操作共享内存。",
    tags: ["worker_threads", "postMessage", "SharedArrayBuffer", "Atomics"],
  },
  {
    id: "ndg-cluster-worker-4",
    chapter: "ndg-cluster-worker",
    level: 4,
    question: "生产环境中如何实现 Node.js 服务的零停机重启（zero-downtime reload）？",
    answer:
      "基于 cluster + 信号机制：①主进程收到 SIGUSR2（PM2 reload 信号），逐个重启 Worker 而非全部同时；②对一个 Worker 发送 SIGTERM，Worker 收到后停止接受新连接（server.close()），等待已有连接处理完毕后退出；③主进程监听 exit 事件，fork 新 Worker 替换。关键：server.close() 是优雅关闭——停止 listen 且等待已有连接结束，但长连接（WebSocket）需要超时强制断开。如果全部 Worker 同时重启会导致短暂无可用 Worker。所以逐个替换——始终有 N-1 个 Worker 在服务。PM2 的 reload 命令就是这个原理。如果用 cluster 自己实现：维护一个 isShuttingDown 标志，server.close() + 设置超时 + cluster.fork()。K8s 环境中还可以用 readiness probe + 滚动更新实现。",
    tags: ["零停机", "优雅关闭", "SIGTERM", "PM2", "cluster"],
  },
];
