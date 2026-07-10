import type { ReviewQuestion } from "./types";

export const ndgBufferFilesystemQuestions: ReviewQuestion[] = [
  {
    id: "ndg-buffer-filesystem-1",
    chapter: "ndg-buffer-filesystem",
    level: 2,
    question: `Buffer 是什么？它和普通 JS 对象有什么区别？Buffer.alloc 和 allocUnsafe 有何不同？`,
    answer:
      `Buffer 是 Node.js 中表示固定长度二进制数据的类，类似整数数组但每个元素是一个字节（0-255）。区别：①Buffer 分配在 V8 堆外内存（C++ 层），不经过 V8 GC 管理，适合处理大块二进制数据（文件/网络）不会给 GC 造成压力；②普通 JS 对象在 V8 堆内，受 GC 管理。Buffer.alloc(size) 分配并填零——安全但慢（要清零旧内存）。Buffer.allocUnsafe(size) 分配但不填零——快但可能包含旧数据（内存碎片中的敏感信息），所以必须手动写入覆盖后才能使用。Buffer.from(string, encoding) 从字符串创建。最佳实践：除非确定会立即填满整个 Buffer，否则用 alloc 而非 allocUnsafe 避免信息泄漏。`,
    tags: ["Buffer", "堆外内存", "alloc", "allocUnsafe"],
  },
  {
    id: "ndg-buffer-filesystem-2",
    chapter: "ndg-buffer-filesystem",
    level: 3,
    question: `fs 模块的三种文件读写方式（同步/异步回调/Promise）各有什么特点和适用场景？`,
    answer:
      `①同步（fs.readFileSync/writeFileSync）：阻塞事件循环直到完成。仅在进程启动期加载配置文件可用，运行时绝不可用——会阻塞所有请求。②异步回调（fs.readFile(path, cb)）：非阻塞，完成后回调。是 Node 传统风格，但容易回调地狱。可用 util.promisify 转成 Promise。③Promise（fs.promises.readFile/writeFile）：推荐方式。非阻塞 + 可用 async/await，代码清晰。注意：fs.promises 在 Node 10+ 可用。大文件不要用 readFile（一次性读入内存），用 createReadStream 流式读取。三种方式底层都走 libuv 线程池（默认 4 线程，UV_THREADPOOL_SIZE 可调），所以「异步」不等于「不需要线程」——只是不阻塞主线程。`,
    tags: ["fs", "同步", "异步", "Promise", "线程池"],
  },
  {
    id: "ndg-buffer-filesystem-3",
    chapter: "ndg-buffer-filesystem",
    level: 3,
    question: `path.join 和 path.resolve 有什么区别？__dirname 和 import.meta.url 分别在什么场景使用？`,
    answer:
      `path.join 将多个路径片段拼接成一条路径，不解析为绝对路径——path.join('a', 'b', '../c') → 'a/c'（.. 回退一层）。path.resolve 从右向左解析，把参数拼成绝对路径，以第一个绝对路径参数为基准，否则以 process.cwd() 为基准——path.resolve('a', 'b') → '/cwd/a/b'。区别：join 只拼接不绝对化；resolve 会绝对化。__dirname/__filename 是 CommonJS 全局变量，分别是当前模块所在目录和文件的绝对路径。ESM 中没有它们，用 import.meta.url（file:// URL 格式）替代，需用 fileURLToPath 转换：const __dirname = path.dirname(fileURLToPath(import.meta.url))。在需要引用同目录资源文件时（如读模板），用 __dirname 而非 cwd()——cwd 是启动目录不是文件目录。`,
    tags: ["path", "join", "resolve", "__dirname", "ESM"],
  },
  {
    id: "ndg-buffer-filesystem-4",
    chapter: "ndg-buffer-filesystem",
    level: 4,
    question: `如何用文件描述符（fd）实现大文件的随机读取？为什么不直接用 readFile？`,
    answer:
      `大文件随机读取：①fs.open(path, 'r', (err, fd) => ...) 打开文件获得 fd（整数句柄）；②fs.read(fd, buffer, offset, length, position, cb) 从指定 position 读取 length 字节到 buffer 的 offset 位置；③用完 fs.close(fd) 释放。为什么不用 readFile：readFile 会把整个文件读入内存——一个 10GB 文件会占 10GB 内存甚至 OOM 崩溃。随机读取只取需要的片段，内存恒定（=buffer 大小）。实际场景：数据库索引文件——跳到指定 offset 读一条记录。也可以用 fs.createReadStream(path, { start, end }) 流式读取文件片段（底层也是 fd + read）。最佳实践：fd 是有限系统资源（每个进程默认 1024 个），用完必须 close，否则 fd 泄漏导致后续 open 失败（EMFILE 错误）。生产环境用 graceful-fs 限制并发 fd 数。`,
    tags: ["fd", "随机读取", "大文件", "资源泄漏"],
  },
];
