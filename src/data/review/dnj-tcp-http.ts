import type { ReviewQuestion } from "./types";

export const dnjTcpHttpQuestions: ReviewQuestion[] = [
  {
    id: "dnj-tcp-http-1",
    chapter: "dnj-tcp-http",
    level: 2,
    question: "HTTP Keep-Alive 的作用是什么？HTTP/1.0 和 HTTP/1.1 的默认行为有何区别？",
    answer:
      "Keep-Alive 允许在同一条 TCP 连接上发送多个 HTTP 请求/响应，避免每次请求都进行 TCP 三次握手和四次挥手。区别：HTTP/1.0 默认关闭 Keep-Alive，需手动添加 `Connection: keep-alive` 头才启用；HTTP/1.1 默认开启 Keep-Alive（`Connection: keep-alive` 是默认行为），需 `Connection: close` 才关闭。收益：①减少握手延迟——首次请求需 3 次握手（~1 RTT），后续请求复用连接零握手；②减少带宽——TCP/IP 头部开销分摊到多个请求；③减轻服务端——减少连接建立/断开的系统调用。Node.js 中 http.Agent 默认 keepAlive 在 Node 19+ 已默认为 true，可通过 maxSockets（每个 origin 最大连接数）和 keepAliveTimeout（空闲超时，默认 4.5s）调优。",
    tags: ["HTTP", "Keep-Alive", "TCP", "连接复用"],
  },
  {
    id: "dnj-tcp-http-2",
    chapter: "dnj-tcp-http",
    level: 3,
    question: "Node.js http.Agent 的连接池是如何工作的？maxSockets 超出时会发生什么？",
    answer:
      "http.Agent 维护一个连接池：按 origin（host:port）分组管理 TCP 连接。每个 origin 有活跃连接和空闲连接两个池。请求到来时：①优先从空闲池取一个复用连接；②无空闲且活跃数 < maxSockets 则新建连接；③活跃数已达 maxSockets 则请求进入等待队列，等有连接释放再复用。连接完成响应后不立即关闭（Keep-Alive），放入空闲池等待复用，超过 keepAliveTimeout 才关闭。maxSockets 默认 Infinity（Node 全局 Agent）或 5（Node 19+ 的 globalAgent）。超出时请求排队等待，不会报错但会增加延迟。调优：maxSockets 太小导致排队（QPS 受限），太大导致过多连接消耗 fd 和内存。生产中通常设为 50-100，并配合 maxFreeSockets 限制空闲连接数。",
    tags: ["HTTP", "Agent", "连接池", "maxSockets", "性能"],
  },
  {
    id: "dnj-tcp-http-3",
    chapter: "dnj-tcp-http",
    level: 3,
    question: "Node.js 的 HTTP 模块是如何分层构建的？net.Socket 在其中扮演什么角色？",
    answer:
      "分层从上到下：①http.Server / http.ClientRequest——HTTP 协议层，解析 HTTP 报文（请求行、头部、body），提供 req/res 对象和事件接口；②net.Socket——TCP 层，是 Duplex Stream（可读可写），封装了底层 TCP 连接的读写和事件（data/end/close/error）；③libuv——跨平台 I/O 层，在 Linux 用 epoll、macOS 用 kqueue、Windows 用 IOCP，将 socket fd 注册到事件多路复用器，有数据可读时通知。net.Socket 扮演「桥梁」角色：向上对 HTTP 模块暴露 Stream 接口（可读可写 chunk），向下通过 libuv 异步收发 TCP 数据。http 模块监听 socket 的 data 事件，按 HTTP 协议解析报文，解析出的 body 通过 req（IncomingMessage，Readable Stream）传递给用户。这就是 Node.js「一切皆流」的体现——HTTP body 本质是流。",
    tags: ["HTTP", "net.Socket", "分层", "libuv", "Stream"],
  },
  {
    id: "dnj-tcp-http-4",
    chapter: "dnj-tcp-http",
    level: 4,
    question: "HTTP 请求的 body 在 Node.js 中是如何以流的形式到达的？为什么不直接拿到完整 body？",
    answer:
      "HTTP 请求 body 通过 TCP 分段传输到达，net.Socket 触发 data 事件，http 模块将 body chunk 推入 IncomingMessage（Readable Stream）。用户通过 req.on('data', chunk => ...) 或 req.pipe() 消费。不直接给完整 body 的原因：①内存效率——大文件上传（如 1GB）若一次性读入内存会 OOM，流式处理每次只有一个 chunk（如 64KB），内存恒定；②时间效率——流式处理可以在 body 还在传输时就开始处理（如边接收边写磁盘、边解析边返回），无需等全部接收完；③背压控制——如果消费慢，流可以暂停 TCP 读取（背压），避免内存堆积；④统一接口——req 本身就是 Readable Stream，可以 pipe 到任何 Writable，代码一致。获取完整 body 的方式：用 buffer 拼接或更推荐用流消费库（如 body-parser 中间件内部也是流式拼接）。",
    tags: ["HTTP", "Stream", "body", "内存", "背压"],
  },
];
