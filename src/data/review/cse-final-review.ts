import type { ReviewQuestion } from "./types";

/** C++ 服务器开发精髓 · 总复习复习题 */
export const cseFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cse-final-review-1",
    chapter: "cse-final-review",
    level: 1,
    question: "全书四大板块的递进关系是什么？主线是什么？",
    answer:
      "四大板块递进关系：\n\n1. IO 模型（地基）：解决「怎么等数据」——从阻塞到非阻塞到 epoll 多路复用\n2. 事件架构（骨架）：解决「怎么处理」——Reactor 分发事件，线程池处理耗时任务\n3. 并发管理（血肉）：解决「怎么管理」——连接生命周期、缓冲区读写、协议编解码\n4. 工程实践（体检）：解决「怎么调优」——时间轮管理超时，性能调优定位瓶颈\n\n主线：从单连接到高并发，从阻塞到事件驱动。\n\n每一板块解决前一板块遗留的问题：\n- 阻塞 IO 线程爆炸 → 需要 epoll（IO 模型）\n- epoll 逻辑堆一起 → 需要 Reactor（事件架构）\n- Reactor 怕阻塞操作 → 需要线程池（事件架构）\n- 有了事件循环 → 需要管理连接和缓冲（并发管理）\n- 生产环境有超时和性能问题 → 需要定时器和调优（工程实践）\n\n跳过任何一环，服务器就建不起来或运行不稳。",
    tags: ["全书脉络", "四段递进", "主线"],
  },
  {
    id: "cse-final-review-2",
    chapter: "cse-final-review",
    level: 2,
    question: "一条数据从到达网卡到被业务处理完，经过哪些步骤？每步用到了哪章的知识？",
    answer:
      "数据处理的七步流程：\n\n1. 数据到达网卡 → 内核放接收队列 → epoll 感知可读\n   用到第 2 章 IO 模型（epoll_wait）\n\n2. Reactor 拿到就绪 fd → 根据 data.ptr 找到 Connection → 调用 handle_read\n   用到第 3 章 Reactor 模式（事件分发）\n\n3. handle_read 调用 read → 数据写入 Connection 的 Buffer\n   用到第 6 章缓冲区设计（append、ensure_writable、compact）\n\n4. Buffer 里的数据可能半条或多条 → 用 TLV 协议 decode 循环切帧\n   用到第 7 章协议设计（粘包处理、Length 字段）\n\n5. 完整消息根据 Type 分发 → 业务处理器执行逻辑\n   耗时操作丢线程池，结果通过 eventfd 回调\n   用到第 4 章线程池（submit、异步回调）\n\n6. 每个连接有超时定时器 → 60 秒不活跃被时间轮踢除\n   用到第 8 章定时器（时间轮 add/tick）\n\n7. 全程 perf 采样、火焰图分析、P99 延迟监控\n   用到第 9 章性能调优（测量驱动循环）\n\n连接的建立和关闭管理用到第 5 章连接管理（fd 映射、对象池、close 顺序）。",
    tags: ["数据流程", "七步", "知识串联"],
  },
  {
    id: "cse-final-review-3",
    chapter: "cse-final-review",
    level: 3,
    question: "从零搭建一个高性能 C++ 服务器，你会怎么分步实现？",
    answer:
      "分六步递进实现：\n\n第一步：搭 IO 骨架\n```cpp\nint listenfd = socket(...); bind(...); listen(...);\nint epfd = epoll_create1(0);\n// fd 设非阻塞，加入 epoll，写事件循环\n```\n用到第 2 章：epoll 基本用法、非阻塞 fd。\n\n第二步：封装 Reactor\n```cpp\nReactor reactor;\nreactor.add_handler(listenfd, new AcceptHandler, EPOLLIN);\nreactor.run();\n```\n用到第 3 章：事件源-多路分离器-分发器-处理器四角色。\n\n第三步：连接管理 + 缓冲区\n```cpp\nclass ConnHandler : public Handler {\n  Buffer read_buf_, write_buf_;\n  void handle_read() { read_buf_.append(...); }\n};\n```\n用到第 5、6 章：Connection 生命周期、fd 映射、对象池、Buffer。\n\n第四步：协议编解码\n```cpp\nvoid on_message(Buffer& buf) {\n  while (decode(buf, msg)) dispatch(msg);\n}\n```\n用到第 7 章：TLV 帧、粘包处理、字节序。\n\n第五步：线程池 + 定时器\n```cpp\nThreadPool pool(4);\nTimerWheel timer(1024, 10);\n```\n用到第 4、8 章：submit 异步执行、时间轮超时管理。\n\n第六步：性能调优\n```bash\nwrk -t4 -c10000 http://localhost:8080/\nperf record -g -p $(pgrep server)\n```\n用到第 9 章：测量驱动循环、火焰图、四层瓶颈定位。\n\n每步建立在前一步基础上，逐步加层。",
    tags: ["搭建", "分步实现", "递进"],
  },
  {
    id: "cse-final-review-4",
    chapter: "cse-final-review",
    level: 4,
    question: "综合分析：如果让你设计一个支撑 10 万并发的 C++ 聊天服务器，整体架构怎么设计？",
    answer:
      "10 万并发聊天服务器架构设计：\n\n1. 网络层：主从 Reactor\n- 主 Reactor：1 个线程，只负责 accept 新连接\n- 从 Reactor：N 个线程（N = CPU 核数），每个管一部分连接的读写\n- 用 epoll + 非阻塞 fd\n- 好处：accept 不成为瓶颈，读写分散到多核\n\n2. 连接管理：\n- 每个连接封装为 Connection 对象（fd、Buffer、用户信息）\n- fd→Connection 映射用分段锁（16 shard）\n- 对象池复用 Connection\n- 60 秒心跳超时，用时间轮管理\n\n3. 协议层：\n- TLV 帧：Magic(2B) + Length(2B) + MsgId(2B) + Payload(NB)\n- Payload 用 Protobuf 编码\n- 粘包处理：不够不取，够了循环切\n- 消息类型：登录、聊天、心跳、群发\n\n4. 业务层：\n- 耗时操作（持久化、推送）丢线程池\n- 线程池大小 = 核数 x 2（IO 密集）\n- 消息路由：根据目标用户查连接，跨 Reactor 线程用消息队列传递\n\n5. 存储层：\n- Redis 存在线状态、消息队列\n- MySQL 存历史消息、用户信息\n- 读写分离，用线程池异步访问\n\n6. 定时器：\n- 时间轮管理 10 万连接的心跳超时\n- tick = 100ms，1024 槽\n- 到期检测 last_active，超时踢除\n\n7. 性能保障：\n- 用 wrk 压测基线，火焰图定位热点\n- 监控 QPS、P99 延迟、连接数、内存\n- 分段锁减少锁竞争\n- readv 减少 read 次数\n- sendfile 零拷贝发文件\n\n8. 容灾：\n- 多机部署，LB 负载均衡\n- Redis 集群存共享状态\n- 优雅退出：收到 SIGTERM 停止 accept，等连接处理完\n\n核心思路：主从 Reactor 利用多核，分段锁减少竞争，时间轮管理海量超时，线程池隔离耗时操作，协议层解决粘包。",
    tags: ["综合", "架构设计", "高并发", "聊天服务器"],
  },
];
