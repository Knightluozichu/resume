import { ReviewQuestion } from "../types";

export const unpSocketIntroQuestions: ReviewQuestion[] = [
  {
    id: "unp-socket-intro-1",
    chapter: "unp-socket-intro",
    level: 1,
    question: "套接字 API 中服务端的四个核心函数是什么？各自的作用是什么？",
    answer:
      "服务端四个核心函数：①socket() 创建套接字描述符 ②bind() 将套接字绑定到本地地址和端口 ③listen() 将套接字转为监听状态，等待连接 ④accept() 从已完成连接队列中取出一个连接，返回新的已连接套接字描述符。这四个函数按顺序调用，构成服务端的基本流程。",
    tags: ["socket", "bind", "listen", "accept"],
  },
  {
    id: "unp-socket-intro-2",
    chapter: "unp-socket-intro",
    level: 2,
    question: "sockaddr_in 结构体有哪些字段？为什么需要强制转换为 sockaddr？",
    answer:
      "sockaddr_in（IPv4 地址结构）包含：sin_family（地址族，AF_INET）、sin_port（端口号，网络字节序）、sin_addr（IP 地址）、sin_zero[8]（填充）。强制转换为 sockaddr 是因为套接字 API（bind/connect/accept 等）的参数类型是通用 sockaddr，编译器要求类型匹配。两种结构大小相同（16 字节），转换是安全的内存重解释。",
    tags: ["sockaddr_in", "sockaddr", "地址结构"],
  },
  {
    id: "unp-socket-intro-3",
    chapter: "unp-socket-intro",
    level: 2,
    question: "什么是网络字节序和主机字节序？为什么需要 htons/ntohs 等转换函数？",
    answer:
      "主机字节序是 CPU 的本地字节序（x86 为小端，ARM 可配置大小端），网络字节序规定为大端序。端口号和 IP 地址在网络上传输时必须使用网络字节序，因此填入地址结构前需用 htons/htonl（主机序→网络序），从地址结构取出后用 ntohs/ntohl（网络序→主机序）。不转换会导致端口/IP 解释错误，连接失败。",
    tags: ["字节序", "htons", "ntohs", "网络编程"],
  },
  {
    id: "unp-socket-intro-4",
    chapter: "unp-socket-intro",
    level: 1,
    question: "客户端套接字编程的基本流程是什么？为什么客户端通常不需要 bind？",
    answer:
      "客户端流程：socket() 创建套接字 → connect() 发起连接到服务端 → read/write 数据交互 → close() 关闭。客户端通常不调 bind，因为内核会在 connect 时自动选择一个临时端口（ephemeral port）绑定。客户端不需要固定端口，内核分配即可；服务端才需要固定端口让客户端知道连接到哪里。",
    tags: ["客户端", "connect", "bind"],
  },
];
