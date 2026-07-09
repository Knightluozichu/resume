import { ReviewQuestion } from "../types";

export const unpUdpSocketsQuestions: ReviewQuestion[] = [
  {
    id: "unp-udp-sockets-1",
    chapter: "unp-udp-sockets",
    level: 1,
    question: "UDP 服务端编程的基本流程是什么？与 TCP 服务端有什么主要区别？",
    answer:
      "UDP 服务端流程：socket() → bind() → recvfrom() / sendto() 循环 → close()。与 TCP 的主要区别：①不需要 listen() 和 accept()——UDP 无连接，直接 recvfrom 接收数据报 ②用 recvfrom/sendto 而非 read/write ③recvfrom 返回时同时获得对端地址，sendto 需要指定目标地址 ④不需要维护已连接套接字，一个套接字处理所有客户端。",
    tags: ["UDP", "服务端", "recvfrom", "sendto"],
  },
  {
    id: "unp-udp-sockets-2",
    chapter: "unp-udp-sockets",
    level: 2,
    question: "recvfrom 函数的参数有哪些？如何从中获取发送方地址？",
    answer:
      "recvfrom(fd, buf, len, flags, from, addrlen)：fd 是套接字描述符，buf/len 是接收缓冲区，flags 是操作标志（通常为 0），from 是输出参数——sockaddr 结构指针，recvfrom 返回时填入发送方地址，addrlen 是输入输出参数——传入 from 的大小，返回时填入实际地址长度。通过 from 参数可以知道是谁发来的数据报，用于后续 sendto 回送。",
    tags: ["UDP", "recvfrom", "发送方地址"],
  },
  {
    id: "unp-udp-sockets-3",
    chapter: "unp-udp-sockets",
    level: 2,
    question: "UDP 是数据报协议，这意味着什么？与 TCP 字节流有什么本质区别？",
    answer:
      "UDP 保留消息边界：发送方一次 sendto 的数据报，接收方一次 recvfrom 完整收到（不会拆分或合并）。每个数据报是独立单元。TCP 是字节流：没有边界，一次 write 可能被拆分，多次 write 可能被合并。UDP 的 recvfrom 返回值就是数据报的实际大小，而 TCP 的 read 返回值只是当前可读的字节数。UDP 的代价是不保证可靠交付、不保证顺序。",
    tags: ["UDP", "数据报", "消息边界", "TCP对比"],
  },
  {
    id: "unp-udp-sockets-4",
    chapter: "unp-udp-sockets",
    level: 3,
    question: "UDP 客户端可以用 connect 函数吗？如果可以，效果是什么？",
    answer:
      "UDP 客户端可以调用 connect，但它不发起三次握手（UDP 无连接），效果是内核将该套接字绑定到指定对端地址。之后的好处：①只能与该对端通信，其他源的数据报被内核丢弃 ②可以用 read/write 代替 recvfrom/sendto ③异步错误（如 ICMP 端口不可达）能通过 read 返回报告给应用，不用 connect 则收不到异步错误。这叫已连接 UDP 套接字。",
    tags: ["UDP", "connect", "已连接UDP"],
  },
];
