import type { ReviewQuestion } from "./types";

export const ndgFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ndg-final-review-1",
    chapter: "ndg-final-review",
    level: 3,
    question: `用「一次 HTTP 请求的完整生命周期」串联全书十个知识点。`,
    answer:
      `①模块系统（第3章）：服务器启动时 require/import 加载路由和中间件代码，缓存在 Module._cache；②事件循环（第2章）：请求到达后 poll 阶段接收，回调进入执行；③TCP/TLS（第7章）：底层 TCP 三次握手建立连接，HTTPS 则经 TLS 握手协商对称密钥；④HTTP 服务器（第6章）：http 模块解析请求头，创建 req（IncomingMessage 可读流）和 res（ServerResponse 可写流）；⑤Buffer（第5章）：请求体以 Buffer chunk 流式到达，需手动拼接解析；⑥fs（第5章）：处理逻辑可能读写文件，用 fs.promises 异步 API 不阻塞；⑦流与管道（第4章）：大文件响应用 createReadStream().pipe(res) 流式传输，背压自动处理；⑧集群（第8章）：cluster 主进程 round-robin 分发请求到多核 Worker；⑨性能（第9章）：Profiler 监控 CPU/内存，事件循环延迟检测阻塞。一个请求贯穿全部九个机制。`,
    tags: ["全书主线", "HTTP请求", "运行时旅程"],
  },
  {
    id: "ndg-final-review-2",
    chapter: "ndg-final-review",
    level: 3,
    question: `CommonJS 和 ESM 在模块加载、值传递、静态分析三个维度的本质区别是什么？`,
    answer:
      `①加载：CJS 同步加载（require 在运行时求值，代码执行到 require 行才加载）；ESM 异步加载（import 在编译期静态解析依赖图，构建阶段确定所有依赖关系，运行时按拓扑序异步求值）。②值传递：CJS 值拷贝——导出时复制当前值，之后模块内部修改不影响导入方（基本类型拷贝值，引用类型拷贝引用但重新赋值不影响）；ESM 实时绑定（live binding）——导出的是引用绑定，模块内部修改变量后导入方立即看到新值。③静态分析：CJS 动态——require 可在 if/函数中条件调用，依赖在运行时才确定，无法静态分析所以不支持 tree-shaking；ESM 静态——import 必须在顶层且路径为字符串字面量，编译期即可确定完整依赖图，构建工具可做 tree-shaking（删除未使用的导出）。新项目推荐 ESM。`,
    tags: ["CommonJS", "ESM", "值拷贝", "live binding", "tree-shaking"],
  },
  {
    id: "ndg-final-review-3",
    chapter: "ndg-final-review",
    level: 4,
    question: `一个 Node.js HTTP 服务器在高并发下响应变慢，请描述系统化的排查思路。`,
    answer:
      `分层排查：①事件循环延迟——用 monitorEventLoopDelay 检测 p99，>10ms 说明有同步阻塞。若有，用 CPU Profile 找热点函数（可能 JSON.parse 大对象/正则回溯/同步循环），拆到 worker_threads 或分块执行。②I/O 瓶颈——检查数据库慢查询、外部 API 超时、fs 同步操作。用 --prof 看是否有大量 I/O 等待。libuv 线程池默认 4 线程（UV_THREADPOOL_SIZE），I/O 密集场景可能不够，调大。③内存——process.memoryUsage() 看 heapUsed 是否持续增长（泄漏导致 GC 频繁→STW 停顿）。拍 Heap Snapshot 找泄漏对象。④连接数——检查 fd 是否耗尽（lsof -p pid | wc -l），调高 ulimit -n 或用 cluster。⑤CPU——top/htop 看进程 CPU 是否打满单核（单线程瓶颈），用 cluster 扩展到多核。⑥网络——检查 TCP 连接队列溢出（netstat -s | grep overflow），调 somaxconn。先量后改：先监控指标定位瓶颈层，再针对性优化。`,
    tags: ["性能排查", "事件循环", "内存泄漏", "I/O瓶颈", "系统化"],
  },
  {
    id: "ndg-final-review-4",
    chapter: "ndg-final-review",
    level: 4,
    question: `为什么说「理解 Node.js 运行时比会写 API 更重要」？请结合全书内容论述。`,
    answer:
      `API 是「怎么做」，运行时是「为什么」。会写 http.createServer 不代表能解释：为什么一个慢请求不阻塞其他请求（事件循环 + 异步 I/O）、为什么 CPU 密集会卡住所有请求（单线程同步阻塞）、为什么 require 的模块修改不生效（缓存机制）、为什么大文件 readFile 会 OOM 而用 Stream 不会（流式 vs 全量加载）、为什么 pipe 会内存泄漏而 pipeline 不会（错误传播差异）、为什么 TLS 比 TCP 慢（握手开销 + 加密计算）、为什么 Worker 崩溃不影响其他 Worker（进程隔离）、为什么内存持续增长需要 Heap Snapshot（retainer 链分析）。生产事故 100% 是运行时层面的问题——不是「API 写错了」而是「不理解 API 背后的机制」。全书从事件循环到性能调试，每一章都是在拆解「代码跑起来后发生了什么」。把运行时当核心的人才能在故障时快速定位根因、在架构时做出正确取舍。`,
    tags: ["运行时", "工程思维", "全书总结"],
  },
];
