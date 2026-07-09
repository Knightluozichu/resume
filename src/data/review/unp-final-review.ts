import { ReviewQuestion } from "../types";

export const unpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "unp-final-review-1",
    chapter: "unp-final-review",
    level: 4,
    question: "从套接字 API 到生产级网络服务，UNP 卷1 的知识体系如何递进？",
    answer:
      "四层递进：①套接字基础（ch1）——socket/bind/listen/accept/connect 的 API 原语和地址结构 ②套接字编程（ch2-3）——TCP 字节流和 UDP 数据报的客户端-服务端模型 ③高级编程（ch4-6）——I/O 复用（单线程多连接）、套接字选项（控制行为）、IPv6 协议无关 ④生产级编程（ch7-8）——守护进程脱离终端、IPC 进程间通信、高级 I/O（scatter-gather、fd 传递）。每一层为上一层提供更复杂场景的能力支撑。",
    tags: ["知识体系", "递进", "生产级"],
  },
  {
    id: "unp-final-review-2",
    chapter: "unp-final-review",
    level: 3,
    question: "设计一个高并发 TCP echo 服务端，需要用到 UNP 的哪些技术？整体架构是什么？",
    answer:
      "技术组合：①socket/bind/listen/accept 建立服务端 ②epoll（I/O 复用）单线程管理大量连接 ③非阻塞 I/O 避免某个慢客户端阻塞整体 ④ET 边沿触发 + 循环 read 到 EAGAIN 最大化效率 ⑤SO_REUSEADDR 允许快速重启 ⑥TCP_NODELAY 降低回显延迟（小包场景）⑦守护进程化脱离终端。架构：主线程 epoll_wait 等待所有 fd，监听套接字就绪则 accept 新连接加入 epoll，已连接套接字就绪则 read→write 回显。或用多线程 + 每线程一个 epoll。",
    tags: ["高并发", "epoll", "echo服务端", "综合设计"],
  },
  {
    id: "unp-final-review-3",
    chapter: "unp-final-review",
    level: 4,
    question: "TCP 和 UDP 在编程模型、可靠性、边界处理上的差异如何影响应用设计？",
    answer:
      "编程模型：TCP 需 connect/accept 建立连接，用 read/write；UDP 无连接，用 recvfrom/sendto 带地址。可靠性：TCP 保证可靠有序交付，应用无需处理丢包重传；UDP 不保证，应用需自己实现（如超时重传、序号确认）或容忍丢失（如视频流）。边界处理：TCP 字节流无边界，应用需自己分帧（定长/长度头/分隔符）；UDP 数据报保留边界，一次 sendto 对应一次 recvfrom。应用设计：要求可靠传输选 TCP（如文件传输），要求低延迟/容忍丢失选 UDP（如 DNS、视频），需要多播/广播只能用 UDP。",
    tags: ["TCP", "UDP", "应用设计", "对比"],
  },
  {
    id: "unp-final-review-4",
    chapter: "unp-final-review",
    level: 3,
    question: "协议无关编程的完整实现方案是什么？涉及哪些 UNP 的 API 和结构？",
    answer:
      "方案：①用 getaddrinfo(host, port, hints, res) 替代硬编码 sockaddr_in，设 hints.ai_family=AF_UNSPEC ②getaddrinfo 返回 addrinfo 链表，遍历每个节点 ③用 res->ai_family 创建 socket(res->ai_family, res->ai_socktype, res->ai_protocol) ④客户端用 connect(res->ai_addr)，服务端用 bind(res->ai_addr) ⑤成功则 break 退出遍历 ⑥用完调 freeaddrinfo(res) 释放 ⑦地址转换用 inet_ntop/inet_pton 替代 inet_addr/inet_ntoa。涉及结构：addrinfo、sockaddr（通用）、sockaddr_in/sockaddr_in6（具体）。此方案同一代码同时支持 IPv4 和 IPv6。",
    tags: ["协议无关", "getaddrinfo", "IPv6", "综合"],
  },
];
