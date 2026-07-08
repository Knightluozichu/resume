import type { ReviewQuestion } from "./types";

export const ucnSocketProgrammingQuestions: ReviewQuestion[] = [
  {
    id: "ucn-socket-programming-1",
    chapter: "ucn-socket-programming",
    level: "B",
    question: "什么是 TCP 粘包？为什么会出现？如何解决？",
    answer:
      "TCP 是字节流协议，没有消息边界——发送方连续发送的多条消息可能在接收方合并成一段（粘包），或一条消息被拆成多段（半包）。原因是 TCP 的 Nagle 算法合并小包、MSS 分片、接收方读取不及时。解决方案是「长度前缀法」：每条消息前加固定长度（如 2 字节 uint16）表示消息体长度。接收方循环执行：① 先读前缀获取长度 N；② 检查缓冲区可读字节 &gt;= N；③ 不足则等下次 recv；④ 够了则取出 N 字节作为完整消息，剩余字节留给下一条。",
    tags: ["TCP", "粘包", "封包", "缓冲区"],
  },
  {
    id: "ucn-socket-programming-2",
    chapter: "ucn-socket-programming",
    level: "B",
    question: "为什么网络编程要使用环形缓冲区（Ring Buffer）？它比 std::vector 好在哪里？",
    answer:
      "环形缓冲区是固定大小的数组 + 读指针 + 写指针，数据到达时 write_pos 前移，消费后 read_pos 前移，到末尾后回绕到开头。优势：① 无内存分配——固定大小，不会像 vector 那样扩容时拷贝；② 缓存友好——连续内存，CPU cache 命中率高；③ 适合生产者-消费者模型——IO 线程写（生产），逻辑线程读（消费），可以用无锁实现（原子操作读写指针）；④ 内存可预测——不会因流量突增导致 OOM。缺点是需要处理回绕（数据跨末尾时的拼接）。",
    tags: ["缓冲区", "Ring Buffer", "性能"],
  },
  {
    id: "ucn-socket-programming-3",
    chapter: "ucn-socket-programming",
    level: "C",
    question: "设计一个完整的网络封包格式，并描述收发包流程。",
    answer:
      "封包格式：[消息长度 2B uint16][消息号 2B uint16][Protobuf 序列化体 N B]。收包流程：① recv 读字节流写入接收缓冲区 → ② 检查可读 &gt;= 2，读出长度 N → ③ 检查可读 &gt;= 2+N，不足则等下次 recv → ④ 读出 MsgId 和 Protobuf 体 → ⑤ read_pos 前移 2+N → ⑥ 按 MsgId 反序列化 Protobuf 消息 → ⑦ 推入消息队列等逻辑线程处理。发包流程：① 业务层构造 Protobuf 消息并 SerializeToString → ② 填 MsgId → ③ 计算总长度填入头部 → ④ 写入发送缓冲区 → ⑤ epoll 注册 EPOLLOUT 或直接 send。",
    tags: ["封包", "TCP", "Protobuf", "流程"],
  },
  {
    id: "ucn-socket-programming-4",
    chapter: "ucn-socket-programming",
    level: "A",
    question: "游戏服务器该用 TCP 还是 UDP？各自的适用场景和取舍是什么？",
    answer:
      "TCP：可靠传输、有序、自动重传。适合回合制/卡牌/MMORPG——这些游戏对消息可靠性要求高（交易/登录/聊天不能丢），对延迟敏感度中等。缺点是队头阻塞——一个包丢了后面全等。UDP：不可靠、无序、无重传。适合 FPS/竞速/格斗——这些游戏对延迟极敏感，丢一两个移动包无所谓（下一个快照会覆盖），但不能容忍 TCP 的重传等待。通常做法：MMO 用 TCP 长连接；竞技游戏用 UDP + 自己实现可靠层（KCP/QUIC）——重要消息（登录/结算）可靠传输，位置同步用不可靠传输。本书以 TCP 为主线讲解。",
    tags: ["TCP", "UDP", "架构", "对比"],
  },
];
