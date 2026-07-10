import type { ReviewQuestion } from "./types";

export const ndgStreamPipeQuestions: ReviewQuestion[] = [
  {
    id: "ndg-stream-pipe-1",
    chapter: "ndg-stream-pipe",
    level: 2,
    question: `Node.js 流有哪四种类型？各自的特点和典型应用场景是什么？`,
    answer:
      `①Readable（可读流）：数据源，可被读取。如 fs.createReadStream、http.IncomingMessage（req）。②Writable（可写流）：数据目的地，可被写入。如 fs.createWriteStream、http.ServerResponse（res）。③Duplex（双工流）：同时可读可写，读写独立缓冲不互通。如 TCP socket（net.Socket），一端收数据一端发数据。④Transform（转换流）：Duplex 的特例，写入的数据经变换后从读取端输出（读 = 写的函数）。如 zlib.createGzip()（写入原始数据→读出压缩数据）、crypto.createCipheriv（加密转换）。前两者是基础，后两者是组合——Duplex 是「两条独立管道」，Transform 是「一条管道中间加了过滤器」。`,
    tags: ["流", "Readable", "Writable", "Duplex", "Transform"],
  },
  {
    id: "ndg-stream-pipe-2",
    chapter: "ndg-stream-pipe",
    level: 3,
    question: `什么是背压（Backpressure）？pipe 如何处理它？为什么推荐 pipeline 替代 pipe？`,
    answer:
      `背压：当 Readable 生产数据的速度 > Writable 消费速度时，数据在内存中堆积。pipe 内部自动处理——Writable.write() 返回 false 时，pipe 自动调用 Readable.pause() 暂停读取，等 Writable 的 drain 事件触发后调用 Readable.resume() 恢复。推荐 pipeline 替代 pipe 的原因：①pipe 不会自动传播错误——如果中间流出错，源流和目标流不会被自动销毁，导致内存泄漏；pipeline 会自动销毁所有流并调用回调传递错误。②pipeline 支持多个 Transform 串联（pipeline(src, gzip, encrypt, dest)）。③pipeline 有 Promise 版本（stream.promises.pipeline）。用法：stream.pipeline(readable, gzip, writable, err => { ... })。`,
    tags: ["背压", "pipe", "pipeline", "错误传播"],
  },
  {
    id: "ndg-stream-pipe-3",
    chapter: "ndg-stream-pipe",
    level: 3,
    question: `Readable 流的流动模式（flowing）和暂停模式（paused）有什么区别？如何切换？`,
    answer:
      `暂停模式（默认）：需要显式调用 readable.read() 拉取数据，监听 'readable' 事件表示有数据可读。流动模式：数据自动推送，监听 'data' 事件接收 chunk。切换：添加 'data' 监听器 → 切换到流动模式；移除所有 'data' 监听器 → 回到暂停模式；readable.pause() 暂停流动；readable.resume() 恢复流动；readable.pipe() 内部会添加 'data' 监听器进入流动模式。最佳实践：用 pipe/pipeline 而非手动监听 'data'——前者自动处理背压。如果必须手动读取，用 for await...of（异步迭代，Node 10+），它以暂停模式逐块拉取且自带背压处理：for await (const chunk of readable) { ... }。`,
    tags: ["流动模式", "暂停模式", "read", "异步迭代"],
  },
  {
    id: "ndg-stream-pipe-4",
    chapter: "ndg-stream-pipe",
    level: 4,
    question: `如何自定义一个 Transform 流实现「读取文件 → 行号前缀 → 写入文件」？`,
    answer:
      `继承 Transform 或用 new Transform({ transform })。核心是 _transform(chunk, encoding, callback)：接收输入 chunk，处理后用 this.push() 推送输出，调用 callback() 表示完成。实现行号前缀：维护一个行计数器和未完成的行缓冲。每次 transform 收到 chunk（Buffer），按 \\n split 成行，给每行加 \`\${++lineNo}: \` 前缀后 push，最后一行可能不完整需缓存到下次。还需要 _flush(callback) 处理最后残留的行。代码骨架：const t = new Transform({ transform(chunk, enc, cb) { ... this.push(prefixed); cb(); }, flush(cb) { ... cb(); } }); 然后 pipeline(readStream, t, writeStream)。关键点：chunk 边界不等于行边界——一个 chunk 可能在行中间断开，必须用缓冲拼接。`,
    tags: ["Transform", "自定义流", "行处理", "pipeline"],
  },
];
