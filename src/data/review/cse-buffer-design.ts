import type { ReviewQuestion } from "./types";

/** C++ 服务器开发精髓 · 缓冲区设计复习题 */
export const cseBufferDesignQuestions: ReviewQuestion[] = [
  {
    id: "cse-buffer-design-1",
    chapter: "cse-buffer-design",
    level: 1,
    question: `三种缓冲区方案是什么？各自的优缺点？`,
    answer:
      `三种缓冲区方案：\n\n1. 环形缓冲区（Ring Buffer）：\n- 优点：零内存分配、缓存友好（连续内存）、固定大小无碎片\n- 缺点：大小固定，不适合变长数据，满了必须等读出才能写\n- 适合：固定大小流式数据（音视频帧）\n\n2. vector 缓冲区：\n- 优点：自动扩容、实现简单、缓存友好\n- 缺点：扩容时需要拷贝旧数据到新内存\n- 适合：通用场景（HTTP 服务、聊天服务器）\n\n3. 链表分块缓冲区：\n- 优点：无拷贝扩容（加新块即可）、内存灵活\n- 缺点：缓存不友好（内存不连续）、遍历复杂\n- 适合：大数据量传输（文件上传下载）\n\n实际服务器常组合使用：小块用 vector（或环形），大块用链表。`,
    tags: ["环形缓冲区", "vector", "链表分块"],
  },
  {
    id: "cse-buffer-design-2",
    chapter: "cse-buffer-design",
    level: 2,
    question: `vector 缓冲区的 compact（整理）操作是什么？为什么需要它？`,
    answer:
      `compact 操作：把缓冲区中未读的数据搬运到数组开头，回收已读空间，把 readIndex 归零。\n\n为什么需要：\n- read 指针不断前进，readIndex 前面的空间是已读的废数据\n- 如果不回收，writeIndex 到末尾的空间越来越小，很快就要扩容\n- compact 后把废数据覆盖，writeIndex 到末尾的空间变大，可能不需要扩容\n\n\`\`\`cpp\nvoid compact() {\n  // 把 [readIndex_, writeIndex_) 的数据移到开头\n  std::copy(begin() + readIndex_, begin() + writeIndex_, begin());\n  writeIndex_ -= readIndex_;\n  readIndex_ = 0;\n}\n\`\`\`\n\nappend 时的策略：\n\`\`\`cpp\nvoid ensure_writable(size_t len) {\n  if (writable() >= len) return;       // 够了\n  if (writable() + readIndex_ >= len) {\n    compact();                         // 先整理，复用已读空间\n  } else {\n    buf_.resize(buf_.size() * 2);      // 不够才扩容\n  }\n}\n\`\`\`\n\n优先 compact 再扩容，减少拷贝次数。`,
    tags: ["compact", "读写指针", "扩容"],
  },
  {
    id: "cse-buffer-design-3",
    chapter: "cse-buffer-design",
    level: 3,
    question: `为什么用 readv 配合缓冲区可以减少系统调用次数？`,
    answer:
      `普通 read 如果缓冲区尾部剩余空间不够，一次 read 只能读到少量数据，需要多次 read 才凑够。每次 read 都是一次系统调用（用户态↔内核态切换），开销大。\n\nreadv 可以一次 read 到多块不连续的内存：\n\`\`\`cpp\n// 栈上预备一块额外空间\nchar extrabuf[65536];\nstruct iovec vec[2];\nvec[0].iov_base = buf_.begin_write();      // 第一块：缓冲区尾部\nvec[0].iov_len = buf_.writable();\nvec[1].iov_base = extrabuf;                // 第二块：栈上临时空间\nvec[1].iov_len = sizeof(extrabuf);\n\nint n = readv(fd, vec, 2);                 // 一次系统调用读两块\nif (n > vec[0].iov_len) {\n  // 第一块满了，多出来的在 extrabuf 里\n  buf_.append(extrabuf, n - vec[0].iov_len);\n}\n\`\`\`\n\n好处：\n1. 一次系统调用读到 64KB+ 数据，减少系统调用次数\n2. 不需要提前扩容缓冲区（用栈上临时空间兜底）\n3. 读到的数据 append 到缓冲区，只在需要时才扩容\n\n这是 muduo Buffer 的 \`readFd\` 方法的核心技巧。`,
    tags: ["readv", "系统调用", "muduo"],
  },
  {
    id: "cse-buffer-design-4",
    chapter: "cse-buffer-design",
    level: 4,
    question: `综合分析：设计一个高性能服务器的 Buffer，你会怎么选型和组合？`,
    answer:
      `选型组合方案：\n\n1. 接收缓冲区（read buffer）：\n- 用 vector 方案 + readv\n- 原因：网络消息长度不定，vector 自动扩容最灵活\n- 用 readv + 栈上 extrabuf 减少系统调用\n- append 前 ensure_writable（先 compact 再扩容）\n- 初始大小设为常见消息大小的 2 倍（如 2KB），避免频繁扩容\n\n2. 发送缓冲区（write buffer）：\n- 也用 vector 方案\n- 原因：响应数据也是变长的\n- 写完 EPOLLOUT 后移除写事件，避免 busy-loop\n\n3. 大文件传输缓冲区：\n- 用链表分块或 sendfile（零拷贝）\n- 原因：文件数据量大，vector 扩容拷贝开销大\n- sendfile 直接内核态拷贝，不经过用户空间\n\n4. 连接级 vs 全局缓冲：\n- 每个连接有独立的 read/write buffer（隔离）\n- 全局维护一个 Buffer 对象池（复用）\n- 连接关闭时归还 buffer 到池\n\n5. 内存控制：\n- 单连接 buffer 设上限（如 1MB），防止恶意大包\n- 全局 buffer 总量监控，超限时踢除空闲连接\n\n核心原则：变长数据用 vector + compact + readv，大数据用 sendfile 或链表，所有 buffer 有上限做背压。`,
    tags: ["综合", "选型", "readv", "sendfile"],
  },
];
