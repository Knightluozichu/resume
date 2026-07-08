import type { ReviewQuestion } from "./types";

export const dnjLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "dnj-learning-map-1",
    chapter: "dnj-learning-map",
    level: 2,
    question: "《深入浅出 Node.js》全书的核心脉络是什么？为什么是这个顺序？",
    answer:
      "核心脉络是：V8 引擎编译执行 → 事件循环调度 → 异步编程范式 → 流式 I/O → 网络通信 → 模块生态 → 工程化部署。顺序由依赖决定：先有引擎才能执行 JS（V8）；引擎之上是调度系统（事件循环）；调度之上是编程范式（异步编程）；范式需要数据流动方式（Stream）；流动需要传输通道（TCP/HTTP/WebSocket）；代码需要组织与分发（NPM 模块）；最后需要工程化保障（测试部署）。从「能执行」到「能调度」到「能编程」到「能流动」到「能通信」到「能复用」到「能上线」。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "dnj-learning-map-2",
    chapter: "dnj-learning-map",
    level: 2,
    question: "Node.js 的运行时由哪些核心组件构成？它们各自解决什么问题？",
    answer:
      "Node.js 运行时由五大核心组件构成：①V8 引擎——将 JS 编译为机器码执行，提供 JIT 优化和 GC；②libuv——跨平台异步 I/O 库，提供事件循环和线程池（默认 4 线程）；③核心模块（fs/http/net/stream 等）——封装系统能力为 JS API；④CommonJS/ESM 模块系统——组织代码加载与缓存；⑤事件循环——六阶段调度器，协调同步代码与异步回调。V8 解决「执行」，libuv 解决「I/O」，核心模块解决「能力」，模块系统解决「组织」，事件循环解决「调度」。",
    tags: ["运行时", "V8", "libuv", "事件循环"],
  },
  {
    id: "dnj-learning-map-3",
    chapter: "dnj-learning-map",
    level: 3,
    question: "「会用 Node.js API」和「懂 Node.js 运行时内核」有什么本质区别？",
    answer:
      "会用 API 只是表层——用 http.createServer 起服务、用 fs.readFile 读文件，照文档抄就会。真正难点在运行时内核：V8 的 JIT 如何热点优化、隐藏类如何加速属性访问、GC 如何分代回收；事件循环六阶段如何调度、微任务和宏任务的优先级；Stream 背压如何防止内存爆掉；TCP Keep-Alive 如何复用连接；require 的路径解析和缓存机制；npm 的语义化版本和依赖扁平化。这些是「代码跑起来后」才显现的机制，也是生产事故排查和性能优化的真正考点。把 API 当终点的人写的代码能跑但脆弱；把运行时当核心的人才能写出可控、可扩展、可排查的服务。",
    tags: ["架构", "运行时", "工程思维"],
  },
  {
    id: "dnj-learning-map-4",
    chapter: "dnj-learning-map",
    level: 4,
    question: "用「一次 HTTP 请求到达 → 处理 → 响应」的完整运行时旅程描述全书知识点如何串联。",
    answer:
      "①V8 引擎——服务器代码经 V8 JIT 编译执行（第2章）；②事件循环——请求到达后由 poll 阶段接收回调（第3章）；③异步编程——回调中可能用 async/await 编排多个异步操作（第4章）；④Stream——请求体以 chunk 流式到达，大响应用 pipeline 流式输出（第5章）；⑤TCP/HTTP——底层 TCP 连接复用（Keep-Alive），http 模块解析为 req/res（第6章）；⑥WebSocket——若升级协议则走 WebSocket 全双工通道（第7章）；⑦NPM 模块——依赖通过 require 加载（第8章）；⑧测试部署——服务经 PM2 集群管理或 Docker 容器化部署（第9章）。一个请求，全书知识点全部参与。",
    tags: ["架构", "运行时旅程", "综合"],
  },
];
