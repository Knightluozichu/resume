import type { ReviewQuestion } from "./types";

export const ucnMessageRoutingQuestions: ReviewQuestion[] = [
  {
    id: "ucn-message-routing-1",
    chapter: "ucn-message-routing",
    level: "B",
    question: "为什么 IO 线程不能直接处理业务逻辑？必须通过消息队列转发给逻辑线程？",
    answer:
      "① 防止 IO 阻塞：业务逻辑可能涉及数据库查询、复杂计算，如果 IO 线程直接处理，会阻塞 epoll_wait 事件循环，导致其他连接的收发全部卡住；② 线程安全：IO 线程可能有多个，业务逻辑操作共享状态（HP/背包/位置），直接处理需要加锁，复杂且易错；③ 职责分离：IO 线程只管「搬字节」，逻辑线程只管「跑业务」，各自优化互不影响；④ 可控性：逻辑线程单线程串行执行，天然有序，不需要担心并发问题。消息队列是两者之间的缓冲——IO 线程生产消息，逻辑线程消费消息，解耦且异步。",
    tags: ["IO线程", "逻辑线程", "消息队列", "架构"],
  },
  {
    id: "ucn-message-routing-2",
    chapter: "ucn-message-routing",
    level: "B",
    question: "消息路由表的本质是什么？如何实现 MsgId 到 Handler 的映射？",
    answer:
      "路由表本质是一个哈希表：key 是 uint16 的 MsgId，value 是处理函数（函数指针/std::function/委托）。实现方式：① 服务启动时，各模块通过宏或代码注册：REGISTER_HANDLER(1001, &amp;LoginHandler::OnLogin)，宏内部自动展开为 g_handler_map[1001] = std::bind(...)；② 收到消息后，逻辑线程从路由表查 MsgId，找到对应的 Handler 函数，传入 Session* 和 Protobuf 反序列化后的消息指针；③ 查不到则记录未知消息号警告（可能是版本不一致或攻击）；④ Handler 内执行业务逻辑，通过 Session 发送回包。路由表是只读的（启动后不变），查询无锁。",
    tags: ["路由", "Handler", "消息分发"],
  },
  {
    id: "ucn-message-routing-3",
    chapter: "ucn-message-routing",
    level: "C",
    question: "设计一个无锁消息队列用于 IO 线程到逻辑线程的通信。需要注意什么？",
    answer:
      "使用「单生产者单消费者无锁环形队列」（SPSC Ring Buffer）：① IO 线程是唯一生产者，逻辑线程是唯一消费者——SPSC 模型可以用原子操作实现无锁；② write_pos 和 read_pos 用 std::atomic&lt;size_t&gt;，生产者只写 write_pos，消费者只写 read_pos，互相读对方的 pos；③ 写入时检查 (write_pos + 1) % capacity != read_pos（不满），写入数据后 write_pos.store(release)；④ 读取时检查 write_pos != read_pos（不空），读出数据后 read_pos.store(release)；⑤ 注意：队列大小必须是 2 的幂（用位运算取模），数据拷贝必须在指针 publish 之前完成（内存序保证）。如果有多 IO 线程则退化为 MPMC，需要用 CAS 或分段锁。",
    tags: ["无锁队列", "并发", "Ring Buffer", "内存序"],
  },
  {
    id: "ucn-message-routing-4",
    chapter: "ucn-message-routing",
    level: "A",
    question: "如果服务器收到一个未知 MsgId 的消息，应该如何处理？这背后涉及什么安全问题？",
    answer:
      "处理策略：① 记录 WARNING 日志（MsgId + 来源 IP + Session ID），用于排查版本不一致或协议定义遗漏；② 丢弃该消息，不崩溃（服务器绝不能因为一个非法消息而宕机）；③ 统计同一 Session 的未知消息次数，超过阈值（如 10 次/分钟）则判定为异常——可能是客户端被篡改或恶意攻击，主动断开连接并封禁 IP。安全考量：① 攻击者可能发送伪造 MsgId 探测服务器协议；② 未知 MsgId 的消息体长度不可预知，必须严格按长度前缀拆包，不能盲目反序列化；③ 路由表查询前必须校验消息体长度与 MsgId 声明的长度匹配。",
    tags: ["安全", "异常处理", "路由", "反作弊"],
  },
];
