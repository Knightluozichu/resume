import type { ReviewQuestion } from "./types";

export const ndgHttpServerQuestions: ReviewQuestion[] = [
  {
    id: "ndg-http-server-1",
    chapter: "ndg-http-server",
    level: 2,
    question: `http.createServer 的回调函数中 req 和 res 分别是什么？它们和流有什么关系？`,
    answer:
      `req 是 IncomingMessage 实例，继承自 Readable 流——因为 HTTP 请求体是流式到达的（尤其 POST body），需要用 req.on('data') 接收 chunk、req.on('end') 处理完成。可访问 req.method（GET/POST）、req.url（路径+查询串）、req.headers（请求头对象）。res 是 ServerResponse 实例，继承自 Writable 流——响应体通过 res.write() 分段写入或 res.end() 一次性结束。res.writeHead(statusCode, headers) 设置状态码和响应头，res.setHeader() 设置单个头。关系：req 是「可读的请求」、res 是「可写的响应」——这就是为什么大文件上传/下载可以用 pipe 直接连接 req 到文件流、文件流到 res，实现零内存拷贝的流式传输。`,
    tags: ["http", "req", "res", "流"],
  },
  {
    id: "ndg-http-server-2",
    chapter: "ndg-http-server",
    level: 3,
    question: `如何正确处理 POST 请求的 body？为什么不能直接 req.body？`,
    answer:
      `Node.js 原生 http 模块不自动解析 body（不像 Express 的 body-parser 中间件）。body 以 chunk 流式到达，必须手动收集：let body = ''; req.on('data', chunk => body += chunk); req.on('end', () => { /* body 完整了，解析 JSON/表单 */ })。不能用 req.body 因为原生模块没有这个属性——body 还没读完。注意事项：①大 body 要限制大小防止内存耗尽（DoS 攻击）——累计 chunk 长度超过限制就 req.destroy()；②chunk 是 Buffer，拼接字符串需指定编码 req.setEncoding('utf8') 或 chunk.toString('utf8')；③JSON.parse 放在 end 回调里，data 阶段数据不完整。框架（Express/Koa）的中间件就是封装了这套逻辑。`,
    tags: ["POST", "body", "chunk", "DoS"],
  },
  {
    id: "ndg-http-server-3",
    chapter: "ndg-http-server",
    level: 3,
    question: `为什么每个 HTTP 请求互不阻塞？但什么情况下它们会互相影响？`,
    answer:
      `互不阻塞：每个请求的回调在事件循环中独立排队执行，I/O 操作（读文件/查数据库）交给 libuv 线程池，主线程只管调度。一个请求等数据库时不阻塞其他请求的回调执行。互相影响的情况：①CPU 密集的同步代码——如果某个请求的回调里跑了一个 5 秒的同步循环，事件循环被阻塞 5 秒，所有其他请求在这 5 秒内都无法响应；②共享资源竞争——如全局变量/单例连接池，一个请求的异步操作未完成时另一个请求可能读到中间状态；③fd 耗尽——每个连接占用一个 fd，并发太高导致新连接无法 accept（EMFILE）。解决方案：CPU 密集用 worker_threads；共享资源用锁/队列；fd 限制用 cluster 或调高 ulimit -n。`,
    tags: ["并发", "阻塞", "CPU密集", "fd"],
  },
  {
    id: "ndg-http-server-4",
    chapter: "ndg-http-server",
    level: 4,
    question: `如何用 Node.js 原生 http 模块实现一个支持路由分发的简易服务器框架？`,
    answer:
      `核心思路：在 request 回调中根据 req.method + req.url 分发到不同处理函数。①解析 URL：const { pathname, query } = new URL(req.url, \`http://\${req.headers.host}\`)——用 URL API 安全解析。②路由匹配：维护一个路由表 [{method, pattern, handler}]，遍历匹配 method 和 pathname（支持路径参数 :id 用正则替换）。③中间件链：按顺序执行 middleware 数组，每个中间件调用 next() 传递控制权（类似 Express 的洋葱模型）。④错误处理：try/catch 包裹 handler，捕获后统一 500 响应。⑤body 解析：封装 readBody(req) 返回 Promise。生产建议直接用框架（Express/Koa/Fastify）——它们还处理了边缘情况：URL 编码、HEAD 方法、CORS、压缩等。理解原理的价值是能调试框架行为。`,
    tags: ["路由", "中间件", "框架", "URL解析"],
  },
];
