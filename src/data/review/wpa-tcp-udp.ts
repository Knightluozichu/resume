import { ReviewQuestion } from "../types";

export const wpaTcpUdpQuestions: ReviewQuestion[] = [
  {
    id: "wpa-tcp-udp-1",
    chapter: "wpa-tcp-udp",
    level: 1,
    question: "TCP 三次握手的过程是什么？每一步的 Seq 和 Ack 值如何变化？",
    answer:
      "三次握手：①客户端发送 SYN，Seq=x，进入 SYN_SENT 状态 ②服务器收到后回复 SYN+ACK，Seq=y，Ack=x+1，进入 SYN_RCVD 状态 ③客户端回复 ACK，Seq=x+1，Ack=y+1，双方进入 ESTABLISHED 状态。Seq 是自己的序列号，Ack 是期望收到的下一个序列号（=对方 Seq+1）。三次握手确保双方都能发送和接收，协商初始序列号。Wireshark 中可通过 `tcp.flags.syn==1 && tcp.flags.ack==0` 过滤 SYN 包。",
    tags: ["TCP", "三次握手", "Seq", "Ack"],
  },
  {
    id: "wpa-tcp-udp-2",
    chapter: "wpa-tcp-udp",
    level: 2,
    question: "TCP 四次挥手的过程是什么？为什么需要 TIME_WAIT 状态？",
    answer:
      "四次挥手：①主动方发 FIN，Seq=u，进入 FIN_WAIT_1 ②被动方回 ACK，Ack=u+1，进入 CLOSE_WAIT；主动方进入 FIN_WAIT_2 ③被动方发 FIN，Seq=v，进入 LAST_ACK ④主动方回 ACK，Ack=v+1，进入 TIME_WAIT，等待 2MSL 后关闭；被动方收到 ACK 后关闭。TIME_WAIT 原因：①确保最后一个 ACK 能到达对方（如果丢失，对方会重发 FIN，本端还能重发 ACK）②让旧连接的延迟包在网络中消亡，避免影响新连接。MSL（Maximum Segment Lifetime）是报文最大生存时间。",
    tags: ["TCP", "四次挥手", "TIME_WAIT", "FIN"],
  },
  {
    id: "wpa-tcp-udp-3",
    chapter: "wpa-tcp-udp",
    level: 1,
    question: "TCP 和 UDP 的主要区别是什么？各自适用于什么场景？",
    answer:
      "TCP：面向连接（需三次握手）、可靠传输（重传机制）、有序到达（序列号排序）、流量控制和拥塞控制、包头 20 字节。适用于 HTTP/HTTPS/SSH/邮件等需要可靠传输的场景。UDP：无连接、不可靠（不重传）、不保证顺序、无流控、包头仅 8 字节、速度快开销低。适用于 DNS/DHCP/视频流/游戏/VoIP 等追求低延迟、容忍少量丢包的场景。选择依据：数据完整性要求高用 TCP，实时性要求高用 UDP。",
    tags: ["TCP", "UDP", "对比", "可靠性"],
  },
  {
    id: "wpa-tcp-udp-4",
    chapter: "wpa-tcp-udp",
    level: 2,
    question: "在 Wireshark 中如何检测 TCP 重传、乱序和重复确认？这些现象说明什么问题？",
    answer:
      "检测方法：①TCP 重传——`tcp.analysis.retransmission`，说明包丢失或超时，网络可能拥塞 ②乱序——`tcp.analysis.out_of_order`，说明包到达顺序与发送顺序不一致，可能是多路径路由 ③重复确认——`tcp.analysis.duplicate_ack`，接收方收到乱序包后发的重复 ACK，触发快重传机制。使用 Analyze → Follow → TCP Stream 可查看完整流。Statistics → Flow Graph 可可视化 TCP 流的时序图。大量重传和重复确认通常意味着网络质量差、带宽不足或中间设备问题。",
    tags: ["TCP", "重传", "乱序", "Wireshark分析"],
  },
];
