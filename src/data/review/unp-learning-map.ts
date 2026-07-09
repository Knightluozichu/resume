import { ReviewQuestion } from "../types";

export const unpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "unp-learning-map-1",
    chapter: "unp-learning-map",
    level: 1,
    question: "UNIX网络编程卷1 的核心主题是什么？全书按什么层次组织？",
    answer:
      "核心主题是套接字（Socket）联网 API。全书按四个层次组织：①套接字基础（socket/bind/listen/accept 等 API）②套接字编程（TCP/UDP 客户端-服务端）③高级编程（I/O 复用、套接字选项、IPv6）④生产级编程（守护进程、IPC、高级 I/O）。",
    tags: ["UNP", "学习地图", "知识体系"],
  },
  {
    id: "unp-learning-map-2",
    chapter: "unp-learning-map",
    level: 2,
    question: "TCP 套接字与 UDP 套接字在编程模型上的主要区别是什么？",
    answer:
      "TCP 是面向连接的字节流，需要 connect/accept 建立连接，用 read/write 传输数据，保证可靠有序交付。UDP 是无连接的数据报，不需要建立连接，用 recvfrom/sendto 收发数据，每个数据报保留边界但不保证可靠交付。TCP 服务端需要 listen+accept，UDP 服务端只需 bind 后直接 recvfrom。",
    tags: ["TCP", "UDP", "编程模型"],
  },
  {
    id: "unp-learning-map-3",
    chapter: "unp-learning-map",
    level: 1,
    question: "UNP 卷1 的 10 章内容按什么顺序学习？各章之间的依赖关系是什么？",
    answer:
      "顺序：ch0 学习地图 → ch1 套接字简介 → ch2 TCP 套接字 → ch3 UDP 套接字 → ch4 I/O 复用 → ch5 高级套接字选项 → ch6 IPv6 → ch7 守护进程与 IPC → ch8 高级 I/O → ch9 复习整合。依赖关系：ch1 是全部 API 基础，ch2/ch3 依赖 ch1，ch4-ch6 是高级编程依赖 ch2/ch3，ch7/ch8 是生产级编程依赖前面所有章节。",
    tags: ["学习路径", "章节依赖"],
  },
  {
    id: "unp-learning-map-4",
    chapter: "unp-learning-map",
    level: 2,
    question: "什么是协议无关编程？为什么 UNP 推荐使用 getaddrinfo 而非硬编码 IPv4？",
    answer:
      "协议无关编程是指代码不绑定特定协议族（IPv4 或 IPv6），同一代码同时支持两者。使用 getaddrinfo 替代硬编码 sockaddr_in，因为 getaddrinfo 返回 addrinfo 链表，每个节点包含自适应的 sockaddr 结构（可能是 IPv4 或 IPv6），遍历链表逐个尝试即可。这样代码无需修改即可在不同协议环境运行，符合未来 IPv6 普及的趋势。",
    tags: ["协议无关", "getaddrinfo", "IPv6"],
  },
];
