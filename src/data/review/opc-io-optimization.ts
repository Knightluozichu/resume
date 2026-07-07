import type { ReviewQuestion } from "./types";

/** C++ 性能优化指南 · I/O 优化复习题 */
export const opcIoOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "opc-io-optimization-1",
    chapter: "opc-io-optimization",
    level: 1,
    question: "为什么逐字节 I/O 极慢？系统调用的开销在哪里？",
    answer:
      "逐字节 I/O（如 `fgetc` 每次读 1 字节）每次都触发系统调用，开销巨大：\n\n1. 上下文切换：用户态 → 内核态 → 用户态，每次约 1-10 微秒。\n2. 内核开销：内核要检查文件描述符、拷贝数据、更新文件偏移量。\n3. 无缓冲放大：读 1MB 文件逐字节读 = 100 万次系统调用，仅上下文切换就耗数秒。\n\n对比：用 4KB 缓冲区一次读 4096 字节，1MB 文件只需 256 次系统调用，快数千倍。\n\n所以 I/O 优化的第一原则是减少系统调用次数——缓冲和批量是核心手段。",
    tags: ["系统调用", "上下文切换", "缓冲"],
  },
  {
    id: "opc-io-optimization-2",
    chapter: "opc-io-optimization",
    level: 2,
    question: "缓冲 I/O、批量 I/O 和异步 I/O 分别解决什么问题？它们能组合使用吗？",
    answer:
      "1. 缓冲 I/O：减少系统调用次数。攒够一个缓冲区大小（如 4KB/8KB）才触发一次系统调用。解决「调用次数太多」的问题。如 `std::ifstream` 自带缓冲、`setvbuf`。\n\n2. 批量 I/O：增大每次传输的数据量。一次 `read(fd, buf, 1MB)` 而非 256 次 `read(fd, buf, 4KB)`。解决「单次传输量太小」的问题。减少系统调用次数 + 提高吞吐。\n\n3. 异步 I/O：让 I/O 与计算重叠。发起 I/O 后不阻塞等待，继续做计算，I/O 完成后通知。解决「I/O 等待时间浪费 CPU」的问题。如 Linux `io_uring`、`aio_read`。\n\n组合使用：三者正交，可同时用。例如：用大缓冲区（缓冲+批量）攒数据，用 `io_uring` 异步提交（异步），I/O 完成后回调处理——三者叠加达到最高吞吐。实际上高性能 I/O 框架（如 Seastar）就是这样组合的。",
    tags: ["缓冲", "批量", "异步", "组合"],
  },
  {
    id: "opc-io-optimization-3",
    chapter: "opc-io-optimization",
    level: 3,
    question: "你需要读取一个 1GB 的日志文件并逐行处理。当前用 `std::getline` 逐行读，耗时 30 秒。请给出优化方案。",
    answer:
      "逐层优化：\n\n1. 增大缓冲区（快速验证）：\n`ifstream` 默认缓冲区可能很小。增大缓冲区：\n```\nstd::ifstream f(path);\nchar buf[1 << 20];  // 1MB\nf.rdbuf()->pubsetbuf(buf, sizeof(buf));\n```\n减少系统调用次数，可能提速 2-5 倍。\n\n2. 批量读取 + 内存中分行（大幅提速）：\n```\nstd::ifstream f(path, std::ios::binary);\nstd::string buf;\nbuf.resize(64 << 20);  // 64MB 块\nwhile (f.read(&buf[0], buf.size())) {\n    // 在 buf 中按 \\n 分行处理\n    // 注意处理跨块的行（保存尾部不完整行到下次）\n}\n```\n一次读 64MB，在内存中按 `\\n` 切分。减少系统调用到 ~16 次。\n\n3. mmap 内存映射（零拷贝）：\n```\nvoid* data = mmap(nullptr, file_size, PROT_READ, MAP_PRIVATE, fd, 0);\nmadvise(data, file_size, MADV_SEQUENTIAL);  // 提示顺序访问\n// 在 data 中按 \\n 分行处理\n```\nOS 按需将文件页映射到内存，无 `read` 系统调用，无用户态-内核态拷贝。`MADV_SEQUENTIAL` 触发预读。\n\n4. 多线程并行（如果行处理是瓶颈）：\n分块 mmap，多个线程并行处理不同块（注意行边界对齐）。\n\n推荐方案：先试 1（增大缓冲），再试 3（mmap + MADV_SEQUENTIAL）。通常 mmap 能把 30 秒降到 3-5 秒。如果处理逻辑本身慢，再上多线程。",
    tags: ["日志处理", "mmap", "批量读取", "应用"],
  },
  {
    id: "opc-io-optimization-4",
    chapter: "opc-io-optimization",
    level: 4,
    question: "综合分析：一个网络服务器同时服务 1 万个 TCP 连接，当前用「每连接一个线程 + 阻塞 read」模型，CPU 利用率低但延迟高。从 I/O 优化角度分析并设计改进方案。",
    answer:
      "问题分析：\n「每连接一线程 + 阻塞 read」的问题：\n1. 线程太多：1 万个线程的调度开销巨大，上下文切换频繁。\n2. 阻塞等待：大部分线程在 `read` 上阻塞，CPU 空转但延迟高（线程被唤醒有调度延迟）。\n3. 缓冲区浪费：每个线程独立缓冲区，1 万个连接 × 64KB = 640MB。\n\n改进方案（从简单到复杂）：\n\n1. I/O 多路复用（epoll + 非阻塞 I/O）：\n单线程用 `epoll` 监听 1 万个 fd，只处理就绪的连接。无阻塞等待，CPU 利用率高。`epoll_wait` 一次返回所有就绪事件，批量处理。\n\n2. Reactor 模式（事件驱动）：\n基于 epoll，主线程只做 I/O 读写，读到的数据交给工作线程池处理（计算与 I/O 分离）。读用非阻塞 + 边缘触发（ET），减少 epoll_wait 返回次数。\n\n3. io_uring（Linux 5.1+）：\n用异步 I/O 替代 epoll。提交 I/O 请求到内核的环形队列，内核完成后填完成队列。完全异步，无系统调用开销（共享内存通信），批量提交。这是当前最高性能的 I/O 方案。\n\n4. 缓冲管理：\n- 每连接一个可增长的 `vector<char>` 读缓冲，用 `readv`（scatter read）一次读到多个缓冲区。\n- 写缓冲：先攒响应到缓冲区，用 `writev`（gather write）一次写出多个缓冲区，减少 `write` 调用次数。\n\n5. 零拷贝：\n- 大文件传输用 `sendfile`（内核态直接从文件 fd 到 socket fd，无用户态拷贝）。\n- 静态响应用 `mmap` + `write`。\n\n实施顺序：先迁移到 epoll + 非阻塞（解决线程爆炸）→ 再优化缓冲（writev/readv）→ 最后评估 io_uring（极致性能）。\n\n验证：benchmark 连接数、吞吐量、P99 延迟。目标：单机 10 万连接、P99 < 1ms。",
    tags: ["综合", "epoll", "io_uring", "零拷贝", "网络服务器"],
  },
];
