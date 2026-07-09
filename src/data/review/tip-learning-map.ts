import { ReviewQuestion } from "../types";

export const tipLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "tip-learning-map-1",
    chapter: "tip-learning-map",
    level: 1,
    question: "TCP/IP 协议栈的四层模型分别是什么？每层的主要协议有哪些？",
    answer:
      "TCP/IP 四层模型：①链路层——以太网、ARP，负责物理寻址与帧传输 ②网络层——IP、ICMP、IGMP，负责路由与寻址 ③传输层——TCP、UDP，负责端到端通信 ④应用层——HTTP、DNS、SMTP、FTP，负责具体业务数据。",
    tags: ["TCP/IP", "四层模型", "协议栈"],
  },
  {
    id: "tip-learning-map-2",
    chapter: "tip-learning-map",
    level: 2,
    question: "数据在 TCP/IP 协议栈中是如何逐层封装和解封装的？",
    answer:
      "封装（发送方）：应用层数据 → 传输层加 TCP/UDP 头 → 网络层加 IP 头 → 链路层加以太网帧头尾，逐层向下传递。解封装（接收方）：链路层剥离帧头 → 网络层剥离 IP 头 → 传输层剥离 TCP/UDP 头 → 应用层拿到原始数据。每层只处理本层头部，上层数据作为下层 Payload。",
    tags: ["TCP/IP", "封装", "解封装"],
  },
  {
    id: "tip-learning-map-3",
    chapter: "tip-learning-map",
    level: 1,
    question: "本书 10 章内容按什么顺序组织？各章之间的依赖关系是什么？",
    answer:
      "顺序：ch0 学习地图 → ch1 链路层 → ch2 IP协议 → ch3 ICMP/IGMP → ch4 UDP → ch5 TCP → ch6 超时重传 → ch7 路由协议 → ch8 应用层 → ch9 复习整合。依赖关系自底向上：链路层是地基，IP 路由依赖链路层 ARP，传输层依赖 IP，应用层依赖传输层。TCP 超时重传是 TCP 协议的深化，路由协议是 IP 路由的延伸。",
    tags: ["学习路径", "章节依赖"],
  },
  {
    id: "tip-learning-map-4",
    chapter: "tip-learning-map",
    level: 2,
    question: "TCP/IP 模型与 OSI 七层模型的对应关系是什么？",
    answer:
      "TCP/IP 四层对应 OSI 七层：链路层对应 OSI 的物理层+数据链路层（第1-2层）；网络层对应 OSI 的网络层（第3层）；传输层对应 OSI 的传输层（第4层）；应用层对应 OSI 的会话层+表示层+应用层（第5-7层）。TCP/IP 模型更简洁实用，将 OSI 的上三层合并为应用层，下两层合并为链路层。",
    tags: ["TCP/IP", "OSI", "模型对应"],
  },
];
