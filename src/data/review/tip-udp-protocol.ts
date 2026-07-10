import { ReviewQuestion } from "./types";

export const tipUdpProtocolQuestions: ReviewQuestion[] = [
  {
    id: "tip-udp-protocol-1",
    chapter: "tip-udp-protocol",
    level: 1,
    question: `UDP 报文头的结构是什么？为什么说 UDP 是无连接的？`,
    answer:
      `UDP 报文头固定 8 字节：Source Port（16位）+ Destination Port（16位）+ Length（16位，UDP头+数据总长）+ Checksum（16位）。UDP 是无连接的：发送数据前不需要建立连接（不像 TCP 三次握手），直接发送数据报文；也不维护连接状态、不保证可靠交付、不进行流控和拥塞控制。每个 UDP 报文独立传输，互不依赖。`,
    tags: ["UDP", "报文头", "无连接"],
  },
  {
    id: "tip-udp-protocol-2",
    chapter: "tip-udp-protocol",
    level: 2,
    question: `UDP 校验和计算中的伪首部是什么？为什么需要它？`,
    answer:
      `伪首部（Pseudo Header）包含：Source IP（32位）+ Destination IP（32位）+ Zero（8位=0）+ Protocol（8位=17）+ UDP Length（16位）。伪首部不在网络中传输，仅在发送方和接收方参与校验和计算。需要它的原因：验证数据不仅正确到达了正确端口，还到达了正确的主机（IP地址验证）和正确的协议（Protocol=17 验证）。如果没有伪首部，UDP 只校验数据和端口，无法防止 IP 层误投。`,
    tags: ["UDP", "伪首部", "校验和"],
  },
  {
    id: "tip-udp-protocol-3",
    chapter: "tip-udp-protocol",
    level: 2,
    question: `UDP 适合哪些应用场景？为什么？`,
    answer:
      `UDP 适合：①DNS/DHCP/SNMP 等查询-响应型协议——请求小、响应快，省去握手开销 ②实时音视频（RTP）——允许少量丢包但不能容忍重传延迟 ③TFTP/NTP 等简单协议——应用层自行保证可靠性 ④广播和组播——UDP 支持一对多，TCP 只能点对点。原因：UDP 头部仅 8 字节（TCP 最少 20 字节），无握手延迟，无流控阻塞，实时性好。`,
    tags: ["UDP", "应用场景", "实时"],
  },
  {
    id: "tip-udp-protocol-4",
    chapter: "tip-udp-protocol",
    level: 1,
    question: `UDP 和 TCP 在可靠性、有序性、流控方面有什么区别？`,
    answer:
      `可靠性：TCP 通过序号/确认/重传保证可靠交付，UDP 不保证（可能丢包、重复、乱序）。有序性：TCP 保证数据按序到达（靠序号重组），UDP 不保证顺序。流控：TCP 有滑动窗口进行流量控制、有拥塞控制（慢启动/快重传等），UDP 既无流控也无拥塞控制。连接：TCP 面向连接（三次握手建立），UDP 无连接。头部开销：TCP 至少 20 字节，UDP 仅 8 字节。`,
    tags: ["UDP", "TCP", "可靠性", "流控"],
  },
];
