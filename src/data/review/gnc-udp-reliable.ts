import type { ReviewQuestion } from "./types";

export const gncUdpReliableQuestions: ReviewQuestion[] = [
  {
    id: "gnc-udp-reliable-1",
    chapter: "gnc-udp-reliable",
    level: 2,
    question: `可靠 UDP 的三大基石是什么？各自的作用是什么？`,
    answer:
      `三大基石是序号、ACK 确认、超时重传。序号为每个包打上递增编号，接收方据此判断是否丢失、是否乱序。ACK 确认让接收方收到包后回送确认包，发送方据此知道哪些包已安全到达。超时重传在发送后启动定时器，若超时未收到 ACK 则重新发送。三者配合：序号标识包、ACK 反馈到达情况、重传补丢，实现应用层按需可靠性。`,
    tags: ["可靠 UDP", "序号", "ACK", "重传"],
  },
  {
    id: "gnc-udp-reliable-2",
    chapter: "gnc-udp-reliable",
    level: 3,
    question: `ACK 位域如何解决「ACK 本身丢失」的问题？`,
    answer:
      `ACK 位域用一个 32 位整数记录 ack 序号之后 32 个包的到达状态。即使某个 ACK 包丢失，发送方在收到下一个 ACK 时，其位域中对应位仍为 1，表明那个包已经到达。这意味着只要后续有任何一个 ACK 包到达，就能补上之前丢失的确认信息。这种设计把「确认可靠性」从依赖单个 ACK 变成依赖连续多个 ACK 中的任意一个到达，大幅降低了不必要的重传。一个 ACK 包可同时确认 33 个包。`,
    tags: ["ACK 位域", "可靠性"],
  },
  {
    id: "gnc-udp-reliable-3",
    chapter: "gnc-udp-reliable",
    level: 3,
    question: `游戏消息的三种可靠性分类是什么？为什么不能全部走可靠通道？`,
    answer:
      `三种分类：①可靠有序（聊天、交易、登录）——必须到达且顺序正确，用独立队列保证；②可靠无序（技能释放、物品拾取）——需保证到达但顺序无所谓，最新覆盖旧；③不可靠无序（位置心跳、动画状态）——丢了就丢了，下帧覆盖。不能全部走可靠通道：位置心跳这类高频消息设为可靠会导致待确认队列无限膨胀——旧的位置包还在等重传，新的又不断加入，带宽被无意义重传吃满。按需可靠性是可靠 UDP 的核心价值。`,
    tags: ["按需可靠性", "消息分类"],
  },
  {
    id: "gnc-udp-reliable-4",
    chapter: "gnc-udp-reliable",
    level: 4,
    question: `QUIC 相比 TCP 解决了哪些对游戏有害的问题？对游戏协议设计有何启示？`,
    answer:
      `QUIC 基于 UDP 解决了 TCP 三个固有缺陷：①队头阻塞——多流机制让一个流的丢包不阻塞其他流；②连接建立慢——TLS 握手合并进传输握手，1-RTT 甚至 0-RTT 建连；③连接迁移——用连接 ID 而非四元组标识连接，WiFi 切 4G 不断线。游戏通常不用 QUIC 直接传输（自定义 RUDP 更轻量），但 QUIC 的设计思路直接启发现代游戏协议：多流隔离队头阻塞、连接 ID 支持断线重连、0-RTT 减少首包延迟。这些是下一代游戏传输协议的设计方向。`,
    tags: ["QUIC", "TCP", "队头阻塞", "连接迁移"],
  },
];
