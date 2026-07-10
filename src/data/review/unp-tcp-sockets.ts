import { ReviewQuestion } from "./types";

export const unpTcpSocketsQuestions: ReviewQuestion[] = [
  {
    id: "unp-tcp-sockets-1",
    chapter: "unp-tcp-sockets",
    level: 2,
    question: `TCP echo 服务端的工作流程是什么？listen 和 accept 分别做了什么？`,
    answer:
      `TCP echo 服务端流程：socket() → bind() → listen() → accept() → read()/write() 循环回显 → close()。listen() 将套接字从 CLOSED 转为 LISTEN 状态，内核维护两个队列：未完成连接队列（SYN_RCVD）和已完成连接队列（ESTABLISHED）。accept() 从已完成连接队列队头取出一个连接，返回新的已连接套接字描述符，服务端用这个新 fd 与客户端通信。`,
    tags: ["TCP", "echo服务端", "listen", "accept"],
  },
  {
    id: "unp-tcp-sockets-2",
    chapter: "unp-tcp-sockets",
    level: 3,
    question: `当 read 返回 0 时表示什么？服务端应该如何处理？`,
    answer:
      `read 返回 0 表示对端关闭了连接（发送了 FIN）。服务端收到 0 返回值后应停止读取，调用 close() 关闭已连接套接字。如果忽略返回值 0 继续 read，会不断返回 0 造成死循环。正确处理：read 返回值大于 0 时处理数据，等于 0 时正常关闭连接，小于 0 时检查 errno 判断是 EINTR（被信号中断，应重试）还是真正错误。`,
    tags: ["TCP", "read", "连接关闭", "EOF"],
  },
  {
    id: "unp-tcp-sockets-3",
    chapter: "unp-tcp-sockets",
    level: 2,
    question: `TCP 是字节流协议，这对编程有什么影响？如何处理粘包问题？`,
    answer:
      `TCP 是字节流协议，没有消息边界——一次 write 的数据可能被拆成多个 TCP 段传输，也可能多个 write 的数据合并到一个段。接收方无法从 read 的返回值判断发送方每次写了多少。处理粘包的方法：①定长消息（每条消息固定长度）②带长度头的消息（先读长度再读数据）③分隔符（如 HTTP 的 \\r\\n）。应用层必须自己实现消息分帧。`,
    tags: ["TCP", "字节流", "粘包", "消息分帧"],
  },
  {
    id: "unp-tcp-sockets-4",
    chapter: "unp-tcp-sockets",
    level: 1,
    question: `TCP 客户端 connect 函数的作用是什么？它何时返回？`,
    answer:
      `connect 的作用是向服务端发起 TCP 三次握手。它发送 SYN 给服务端，等待服务端的 SYN+ACK，再回 ACK。connect 返回时连接已建立（ESTABLISHED），可以开始 read/write。如果服务端未启动或拒绝连接，connect 返回 -1 且 errno 为 ECONNREFUSED。connect 默认是阻塞的，也可以设为非阻塞实现连接超时控制。`,
    tags: ["TCP", "connect", "三次握手"],
  },
];
