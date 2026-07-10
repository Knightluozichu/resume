import type { ReviewQuestion } from "./types";

export const dnjStreamImplementationQuestions: ReviewQuestion[] = [
  {
    id: "dnj-stream-implementation-1",
    chapter: "dnj-stream-implementation",
    level: 2,
    question: `Node.js Stream 有哪四种类型？各自的特点和典型场景是什么？`,
    answer:
      `四种类型：①Readable（可读流）——只输出数据，消费者从流中读取。典型：fs.createReadStream、process.stdin、http.IncomingMessage。②Writable（可写流）——只接收数据，生产者向流中写入。典型：fs.createWriteStream、process.stdout、http.ServerResponse。③Duplex（双工流）——可读可写，读写独立互不干扰（读和写是两个独立的缓冲区）。典型：net.Socket（TCP 连接，可收可发）。④Transform（转换流）——Duplex 的特例，写入的数据经变换后从读取端输出（读和写有因果关系）。典型：zlib.createGzip（写入原始数据，读取压缩数据）、crypto 加解密流。自定义时分别继承对应类并实现 _read()/_write()/_transform()/_final()。`,
    tags: ["Stream", "Readable", "Writable", "Duplex", "Transform"],
  },
  {
    id: "dnj-stream-implementation-2",
    chapter: "dnj-stream-implementation",
    level: 3,
    question: `Stream 的背压（Backpressure）机制是什么？它如何防止内存溢出？`,
    answer:
      `背压机制：Writable 流有一个 highWaterMark（高水位线，默认 16KB 对象流则为 16 个对象）缓冲区。当写入速度慢于读取速度时，写缓冲区会堆积。Writable.write(chunk) 返回布尔值：缓冲区未满返回 true（可继续写），超过 highWaterMark 返回 false（应停止写入）。在 pipe/pipeline 中，当 write 返回 false 时自动调用 Readable.pause() 暂停读取，防止缓冲区无限膨胀导致内存溢出。当 Writable 的缓冲区排空（drain 事件）后，自动调用 Readable.resume() 恢复读取。这就是背压的闭环：写得快读得慢 → write 返回 false → 暂停读取 → 写完 drain → 恢复读取。如果不用 pipe 而手动 write，必须检查返回值并处理 drain 事件，否则内存会爆。这是流处理大文件不爆内存的核心机制。`,
    tags: ["Stream", "背压", "highWaterMark", "内存", "性能"],
  },
  {
    id: "dnj-stream-implementation-3",
    chapter: "dnj-stream-implementation",
    level: 3,
    question: `pipe 和 pipeline 有什么区别？为什么推荐用 pipeline？`,
    answer:
      `①pipe——readable.pipe(writable)，最早的管道 API。问题：错误处理复杂，需要分别监听 readable 和 writable 的 error 事件；且 pipe 不会在错误时自动销毁流，可能导致资源泄漏（文件描述符不释放）。②pipeline——stream.pipeline(src, ...transforms, dest, callback)，Node 10+ 引入。优势：统一错误处理——任一流出错，回调接收错误并自动销毁所有流（调用 destroy），防止资源泄漏；支持中间 Transform 流链式传递（如 pipeline(readStream, gzip, encrypt, writeStream)）；回调式 API 更符合 Node 约定。pipeline 还能正确处理「中途流提前结束」的边界情况。结论：新代码一律用 pipeline（或 stream/promises 的 pipeline Promise 版），pipe 已不推荐。`,
    tags: ["Stream", "pipe", "pipeline", "错误处理", "资源泄漏"],
  },
  {
    id: "dnj-stream-implementation-4",
    chapter: "dnj-stream-implementation",
    level: 4,
    question: `如何自定义一个 Transform 流？实现 _transform 和 _flush 的作用分别是什么？`,
    answer:
      `自定义 Transform 流：继承 Transform 类，实现 _transform(chunk, encoding, callback) 和可选的 _flush(callback)。_transform 的作用：每接收到一个 chunk 时调用，在此对 chunk 做变换处理，然后调用 callback(err, transformedChunk) 将变换后的数据推送到可读端。可以不输出（过滤）、输出一个（1:1 变换）、输出多个（1:N 拆分）。_flush 的作用：在流结束前（所有 chunk 处理完后、end 之前）调用一次，用于输出缓存的尾部数据（如 Base64 编码的填充符、GZIP 的尾部校验）。_flush 中调用 callback(err, finalChunk) 后流才真正结束。示例场景：行分割器在 _transform 中按 \\n 拆分，但最后一行可能不完整，需在 _flush 中将剩余部分输出。关键：_transform 中的 callback 必须调用，否则流会卡住。`,
    tags: ["Stream", "Transform", "自定义流", "_transform", "_flush"],
  },
];
