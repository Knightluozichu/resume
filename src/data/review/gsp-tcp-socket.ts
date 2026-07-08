import type { ReviewQuestion } from "./types";

export const gspTcpSocketQuestions: ReviewQuestion[] = [
  {
    id: "gsp-tcp-socket-1",
    chapter: "gsp-tcp-socket",
    level: "B",
    question: "TCP 三次握手的过程是什么？为什么不是两次或四次？",
    answer:
      "客户端发 SYN, seq=x → 服务器回 SYN+ACK, seq=y, ack=x+1 → 客户端发 ACK, ack=y+1。三次是因为要确认双方的收发能力都正常：第一次确认客户端能发，第二次确认服务器能收能发，第三次确认客户端能收。两次无法确认客户端的接收能力；四次多余——服务器可以把 SYN 和 ACK 合并为一次发送。",
    tags: ["TCP", "三次握手", "连接管理"],
  },
  {
    id: "gsp-tcp-socket-2",
    chapter: "gsp-tcp-socket",
    level: "B",
    question: "什么是粘包？如何在应用层解决？",
    answer:
      "粘包是指 TCP 字节流中多个消息被合并接收，或一个消息被拆分接收的现象。TCP 是字节流协议，不维护消息边界。解决方案是在应用层定义封包格式，最常用的是长度前缀法：包头包含魔数、消息长度、消息ID，接收端先读包头再按长度读取完整消息体。",
    tags: ["粘包", "TCP", "封包"],
  },
  {
    id: "gsp-tcp-socket-3",
    chapter: "gsp-tcp-socket",
    level: "C",
    question: "为什么游戏服务器用 epoll 而不是多线程阻塞模型？",
    answer:
      "多线程阻塞模型为每个连接分配一个线程，数千线程消耗数十 GB 栈内存且切换开销线性增长。epoll 是事件驱动：一个线程管理数千连接，只在有事件时被唤醒处理，空闲时不消耗 CPU。这使得单机承载万级连接成为可能。",
    tags: ["epoll", "IO模型", "性能"],
  },
  {
    id: "gsp-tcp-socket-4",
    chapter: "gsp-tcp-socket",
    level: "A",
    question: "TCP 四次挥手的过程是什么？为什么需要四次而不是三次？",
    answer:
      "一方发 FIN → 对方回 ACK → 对方再发 FIN → 一方回 ACK，连接关闭。需要四次是因为 TCP 是全双工的——关闭时两个方向的通道需要独立关闭。一方发 FIN 只表示「我没有数据要发了」，但对方可能还有数据要发，所以先回 ACK，等自己的数据发完再发 FIN。三次挥手只在对方没有数据要发时才可能（FIN 和 ACK 合并），但通常不行。",
    tags: ["TCP", "四次挥手", "连接管理"],
  },
];
