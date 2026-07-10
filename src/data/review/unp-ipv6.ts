import { ReviewQuestion } from "./types";

export const unpIpv6Questions: ReviewQuestion[] = [
  {
    id: "unp-ipv6-1",
    chapter: "unp-ipv6",
    level: 1,
    question: `IPv4 的 sockaddr_in 和 IPv6 的 sockaddr_in6 结构体有什么主要区别？`,
    answer:
      `sockaddr_in（IPv4，16 字节）：sin_family(AF_INET)、sin_port(2字节)、sin_addr(4字节，32位IPv4)、sin_zero[8](填充)。sockaddr_in6（IPv6，28 字节）：sin6_family(AF_INET6)、sin6_port(2字节)、sin6_flowinfo(4字节，流标签)、sin6_addr(16字节，128位IPv6)、sin6_scope_id(4字节，范围ID，用于链路本地地址)。IPv6 地址更长，增加了 flowinfo 和 scope_id 字段。`,
    tags: ["IPv6", "sockaddr_in6", "sockaddr_in", "地址结构"],
  },
  {
    id: "unp-ipv6-2",
    chapter: "unp-ipv6",
    level: 2,
    question: `getaddrinfo 函数相比 gethostbyname 有哪些优势？如何实现协议无关编程？`,
    answer:
      `getaddrinfo 优势：①同时支持 IPv4 和 IPv6，gethostbyname 只支持 IPv4 ②线程安全，gethostbyname 返回静态缓冲区非线程安全 ③直接返回 sockaddr 结构可直接用于 socket/connect，gethostbyname 返回 hostent 需手动组装 ④支持服务名解析（端口号）。协议无关编程：设 hints.ai_family=AF_UNSPEC，getaddrinfo 返回 addrinfo 链表，遍历链表逐个 socket+connect 尝试，成功即用，无需关心是 IPv4 还是 IPv6。`,
    tags: ["getaddrinfo", "协议无关", "IPv6", "线程安全"],
  },
  {
    id: "unp-ipv6-3",
    chapter: "unp-ipv6",
    level: 2,
    question: `什么是 IPv4 映射的 IPv6 地址？它在 IPv6 套接字上如何实现双栈通信？`,
    answer:
      `IPv4 映射的 IPv6 地址格式为 ::ffff:IPv4（如 ::ffff:192.168.1.1），将 32 位 IPv4 地址嵌入 128 位 IPv6 地址。在双栈系统上，创建 IPv6 套接字并设 IPV6_V6ONLY=0（默认），该套接字既能接收 IPv6 连接，也能接收 IPv4 连接——内核将 IPv4 连接的源地址转为映射地址格式。这样服务端只需一个 IPv6 套接字即可同时服务 IPv4 和 IPv6 客户端，实现协议无关。`,
    tags: ["IPv6", "IPv4映射地址", "双栈", "IPV6_V6ONLY"],
  },
  {
    id: "unp-ipv6-4",
    chapter: "unp-ipv6",
    level: 3,
    question: `inet_pton 和 inet_ntop 函数的用途是什么？为什么取代了 inet_addr 和 inet_ntoa？`,
    answer:
      `inet_pton(af, src, dst) 将文本 IP 地址转为二进制，inet_ntop(af, src, dst, size) 将二进制转为文本。它们取代 inet_addr/inet_ntoa 的原因：①支持 IPv6（af 参数可为 AF_INET 或 AF_INET6），旧函数只支持 IPv4 ②inet_ntoa 返回静态缓冲区非线程安全，inet_ntop 由调用者提供缓冲区 ③inet_addr 不区分 255.255.255.255 和错误。inet_pton/ntop 是协议无关的推荐函数。`,
    tags: ["inet_pton", "inet_ntop", "地址转换", "IPv6"],
  },
];
