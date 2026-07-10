import type { ReviewQuestion } from "./types";

/** C++ 服务器开发精髓 · 连接管理复习题 */
export const cseConnectionMgmtQuestions: ReviewQuestion[] = [
  {
    id: "cse-connection-mgmt-1",
    chapter: "cse-connection-mgmt",
    level: 1,
    question: `连接管理的三个支柱是什么？Connection 对象通常持有哪些状态？`,
    answer:
      `连接管理的三个支柱：\n\n1. Connection 对象：封装一个 TCP 连接的所有状态和操作\n2. fd 映射表：\`unordered_map<int, Connection*>\`，fd 为键，用于 epoll 返回 fd 后找到对应的 Connection\n3. 对象池：预先分配一批 Connection 对象，复用避免频繁 new/delete\n\nConnection 对象通常持有的状态：\n\`\`\`cpp\nclass Connection {\n  int fd_;                    // 文件描述符\n  std::string peer_addr_;     // 对端地址\n  Buffer read_buf_;           // 读缓冲区\n  Buffer write_buf_;          // 写缓冲区\n  time_t last_active_;        // 最后活跃时间（用于超时检测）\n  // 可能还有：定时器指针、协议状态、用户数据等\n};\n\`\`\`\n\n所有连接操作（读、写、关闭、超时检测）都通过这个对象进行。`,
    tags: ["Connection", "fd映射", "对象池"],
  },
  {
    id: "cse-connection-mgmt-2",
    chapter: "cse-connection-mgmt",
    level: 2,
    question: `连接关闭时的正确操作顺序是什么？为什么不能颠倒？`,
    answer:
      `正确顺序：\n1. 从 epoll 移除 fd（\`epoll_ctl(EPOLL_CTL_DEL)\`）\n2. close(fd)\n3. 从 fd 映射表 erase\n4. delete 或归还 Connection 对象到对象池\n\n为什么不能颠倒：\n- 如果先 close(fd) 再从 epoll 移除：内核可能复用这个 fd 号给新连接，epoll 里旧的 fd 号指向了新连接，事件错乱。\n- 如果先 delete Connection 再从 epoll 移除：epoll 可能返回该 fd 的事件，data.ptr 指向已释放的内存，use-after-free。\n- 如果先 erase 映射表再 close：如果 close 过程中需要查映射表（如回调中清理），找不到 Connection。\n\n\`\`\`cpp\nvoid Connection::close() {\n  reactor_->remove_handler(fd_);  // 1. 先从 epoll 移除\n  ::close(fd_);                   // 2. 再关 fd\n  connections_.erase(fd_);        // 3. 从映射表移除\n  conn_pool_.release(this);       // 4. 归还对象池\n}\n\`\`\``,
    tags: ["关闭顺序", "epoll", "use-after-free"],
  },
  {
    id: "cse-connection-mgmt-3",
    chapter: "cse-connection-mgmt",
    level: 3,
    question: `read 返回 0 意味着什么？如果不处理会怎样？`,
    answer:
      `read 返回 0 意味着对端关闭了连接（发送了 FIN），这是 TCP 的 EOF 信号。此时本端连接进入 CLOSE_WAIT 状态。\n\n如果不处理：\n1. fd 不会被关闭，也不会从 epoll 移除，fd 泄漏\n2. 连接对象不会被清理，内存泄漏\n3. CLOSE_WAIT 状态的连接堆积，\`netstat\` 会看到大量 CLOSE_WAIT\n4. 最终 fd 耗尽，新连接无法 accept，服务器拒绝服务\n\n正确处理：\n\`\`\`cpp\nvoid Connection::handle_read() {\n  int n = read(fd_, buf, sizeof(buf));\n  if (n == 0) {\n    // 对端关闭，必须主动 close\n    close();\n    return;\n  }\n  if (n < 0) {\n    if (errno == EAGAIN) return;  // 非阻塞，没数据\n    close();  // 其他错误也关闭\n    return;\n  }\n  // 正常处理数据\n  last_active_ = now();\n  process(buf, n);\n}\n\`\`\`\n\n也可以监听 EPOLLRDHUP 事件来检测对端关闭。`,
    tags: ["read返回0", "CLOSE_WAIT", "fd泄漏"],
  },
  {
    id: "cse-connection-mgmt-4",
    chapter: "cse-connection-mgmt",
    level: 4,
    question: `综合分析：一个高并发服务器有 5 万个空闲连接，如何管理才能不耗尽资源？`,
    answer:
      `5 万空闲连接的管理策略：\n\n1. 超时踢除：\n- 每个连接记录 last_active_ 时间\n- 时间轮定时器定期扫描（如每 10 秒），超过 60 秒未活跃的连接直接踢除\n- 防止恶意客户端连上不发数据不断开，白占资源\n\n2. fd 资源管理：\n- 系统级：调高 \`ulimit -n\` 到 100000+，\`/proc/sys/fs/file-max\`\n- 应用级：监控 fd 使用量，接近上限时拒绝新连接或踢旧连接\n\n3. 内存管理：\n- 对象池复用 Connection，避免 5 万个 Connection 的 new/delete 开销\n- 空闲连接的 Buffer 缩容或释放（保留最小容量）\n- 监控总内存，超限时触发 LRU 淘汰\n\n4. CPU 管理：\n- 用 epoll LT 或 ET，空闲连接不触发事件，不占 CPU\n- 不要轮询所有连接，只处理 epoll 返回的就绪事件\n\n5. 连接限流：\n- 限制单 IP 最大连接数\n- 全局连接数上限，满了拒绝新连接（返回 503）\n\n6. 监控告警：\n- 实时监控连接数、fd 使用率、内存占用\n- 异常增长时告警\n\n核心思路：用 epoll 让空闲连接零 CPU 开销，用定时器踢除超时连接，用对象池控制内存，用限流防雪崩。`,
    tags: ["综合", "高并发", "超时", "资源管理"],
  },
];
