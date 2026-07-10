import { ReviewQuestion } from "./types";

export const tipTcpProtocolQuestions: ReviewQuestion[] = [
  {
    id: "tip-tcp-protocol-1",
    chapter: "tip-tcp-protocol",
    level: 2,
    question: `TCP 三次握手的过程是什么？为什么需要三次而不是两次？`,
    answer:
      `三次握手：①客户端发 SYN, seq=x ②服务端回 SYN+ACK, seq=y, ack=x+1 ③客户端发 ACK, seq=x+1, ack=y+1，连接建立。需要三次而非两次的原因：两次握手时，如果客户端的 SYN 延迟到达，服务端回 SYN+ACK 后就认为连接建立，但客户端并未发起连接，导致服务端资源浪费（历史连接问题）。三次握手让客户端有机会通过 ACK 确认是否真的要建立连接，防止历史/重复连接。同时双方都确认了对方的接收和发送能力正常。`,
    tags: ["TCP", "三次握手", "SYN", "ACK"],
  },
  {
    id: "tip-tcp-protocol-2",
    chapter: "tip-tcp-protocol",
    level: 2,
    question: `TCP 四次挥手的过程是什么？为什么需要 TIME_WAIT 状态？`,
    answer:
      `四次挥手：①主动方发 FIN, seq=m ②被动方回 ACK, ack=m+1（被动方进入 CLOSE_WAIT，可继续发剩余数据）③被动方发 FIN, seq=n ④主动方回 ACK, ack=n+1，主动方进入 TIME_WAIT，等待 2MSL 后关闭。TIME_WAIT 的原因：①确保最后的 ACK 能到达被动方——如果丢失，被动方会重发 FIN，主动方还能重发 ACK ②等待 2MSL 让本次连接的所有报文在网络中消亡，防止干扰新连接。`,
    tags: ["TCP", "四次挥手", "FIN", "TIME_WAIT"],
  },
  {
    id: "tip-tcp-protocol-3",
    chapter: "tip-tcp-protocol",
    level: 2,
    question: `TCP 的滑动窗口机制如何实现流量控制？`,
    answer:
      `滑动窗口是 TCP 流量控制的核心：接收方在 ACK 中携带 Window 字段，告知发送方自己还能接收多少数据（接收缓存剩余空间）。发送方根据 Window 大小控制发送量，不超过窗口限制。窗口随确认向前滑动：收到 ACK 后窗口左边界右移，接收方读取数据后缓存空出，Window 增大。如果 Window=0，发送方停止发送，启动坚持定时器周期性探测窗口。这样发送速率匹配接收方处理能力，防止接收方缓存溢出。`,
    tags: ["TCP", "滑动窗口", "流量控制"],
  },
  {
    id: "tip-tcp-protocol-4",
    chapter: "tip-tcp-protocol",
    level: 1,
    question: `TCP 包头中 Sequence Number 和 Acknowledgment Number 的作用是什么？`,
    answer:
      `Sequence Number（序号，32位）：标识该报文段中第一个数据字节的序号，用于按序重组和检测重复。初始序号（ISN）在握手时随机选择，后续按发送字节数递增。Acknowledgment Number（确认号，32位）：期望收到的下一个字节的序号，表示该序号之前的数据已正确收到。ACK 标志位为 1 时确认号才有效。例如收到 seq=1000 长度=500 的段，回 ack=1500 表示「1500 之前的都收到了，期待 1500」。`,
    tags: ["TCP", "序号", "确认号"],
  },
];
