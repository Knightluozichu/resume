import type { ReviewQuestion } from "./types";

export const wjNetworkProgrammingQuestions: ReviewQuestion[] = [
  {
    id: "wj-network-programming-1",
    chapter: "wj-network-programming",
    level: 2,
    question: `Winsock 的初始化和清理流程是什么？为什么需要 WSAStartup/WSACleanup？`,
    answer:
      `Winsock 使用前必须初始化：\`WSAStartup(MAKEWORD(2, 2), &wsaData)\` 传入请求的版本号（2.2），返回 \`WSADATA\` 结构（含实际协商的版本、系统描述等）。程序退出前调用 \`WSACleanup()\` 释放 Winsock 资源。两者必须配对——每调用一次 \`WSAStartup\` 对应一次 \`WSACleanup\`，内部引用计数。需要初始化的原因：①Winsock 是独立的 DLL（\`ws2_32.dll\`），需要加载和版本协商（应用程序请求 2.0，系统可能返回 2.2）；②初始化内部数据结构（套接字描述符表、网络子系统）；③允许同一进程多次初始化（库引用计数）。不调用 \`WSAStartup\` 直接使用套接字 API 会返回 \`WSANOTINITIALISED\` 错误。现代 Windows（Vista+）推荐使用 Winsock 2.2。\`MAKEWORD(2, 2)\` 表示主版本 2、次版本 2。`,
    tags: ["Winsock", "初始化", "生命周期"],
  },
  {
    id: "wj-network-programming-2",
    chapter: "wj-network-programming",
    level: 2,
    question: `TCP 服务器端和客户端的套接字调用流程分别是什么？`,
    answer:
      `TCP 服务器端流程：①\`WSAStartup\` 初始化 → ②\`socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)\` 创建流式套接字 → ③\`bind(sock, &addr, sizeof(addr))\` 绑定本地地址和端口 → ④\`listen(sock, backlog)\` 进入监听状态（\`backlog\` 为等待队列长度）→ ⑤\`accept(sock, &clientAddr, &addrLen)\` 阻塞等待连接，返回新套接字专门与该客户端通信 → ⑥\`recv(newSock, buf, len, 0)\`/\`send(newSock, buf, len, 0)\` 收发数据 → ⑦\`closesocket(newSock)\` 关闭客户端连接 → ⑧\`closesocket(listenSock)\` 关闭监听套接字 → ⑨\`WSACleanup\` 清理。TCP 客户端流程：①\`WSAStartup\` → ②\`socket(AF_INET, SOCK_STREAM, 0)\` → ③\`connect(sock, &serverAddr, sizeof(addr))\` 主动连接服务器（三次握手）→ ④\`send\`/\`recv\` 通信 → ⑤\`closesocket\` → ⑥\`WSACleanup\`。区别：服务器需要 \`bind\`+\`listen\`+\`accept\`，客户端只需 \`connect\`。\`accept\` 返回的新套接字与原监听套接字共享本地端口但有不同的远程地址。`,
    tags: ["TCP", "套接字", "网络编程"],
  },
  {
    id: "wj-network-programming-3",
    chapter: "wj-network-programming",
    level: 3,
    question: `Winsock 的五种 I/O 模型分别是什么？各自的特点和适用场景？`,
    answer:
      `五种 I/O 模型：①\`select\` 模型——用 \`fd_set\` 集合管理多个套接字，\`select()\` 阻塞等待任一套接字就绪，有 FD 上限（默认 64，可改 1024），适合少量连接、跨平台需求。②\`WSAAsyncSelect\`——基于窗口消息通知网络事件（\`WM_SOCKET\`），把网络事件转化为窗口消息，适合 GUI 程序混合网络。③\`WSAEventSelect\`——基于事件对象通知，\`WSAEventSelect\` 关联套接字与事件，\`WSAWaitForMultipleEvents\` 等待事件，\`WSAEnumNetworkEvents\` 查询具体事件，适合无窗口的控制台程序。④Overlapped I/O——异步 \`WSARecv\`/\`WSASend\` 配合 \`OVERLAPPED\` 结构，完成后通过事件或 APC 通知，适合中等并发。⑤完成端口 IOCP——\`CreateIoCompletionPort\` 将套接字关联到完成端口，\`GetQueuedCompletionStatus\` 取完成通知，线程池处理，适合高并发服务器（数千连接）。性能递增、复杂度递增：select 最简单但性能最差，IOCP 最复杂但性能最好。`,
    tags: ["I/O模型", "网络编程", "性能"],
  },
  {
    id: "wj-network-programming-4",
    chapter: "wj-network-programming",
    level: 3,
    question: `TCP 和 UDP 在套接字编程上的主要区别是什么？UDP 服务器为什么不需要 accept？`,
    answer:
      `TCP（\`SOCK_STREAM\`）是面向连接的可靠传输：需要 \`connect\`/\`accept\` 建立连接（三次握手），\`send\`/\`recv\` 保证有序不丢失，有流量控制和拥塞控制，适合文件传输、Web、数据库等需要可靠性的场景。UDP（\`SOCK_DGRAM\`）是无连接的不可靠传输：无需 \`connect\`/\`accept\`，直接 \`sendto\`/\`recvfrom\` 发送和接收数据报，每个数据报独立，可能丢失/乱序/重复，但开销低延迟小，适合 DNS、视频流、游戏等实时性要求高于可靠性的场景。UDP 服务器不需要 \`accept\` 的原因：UDP 无连接概念——每个 \`recvfrom\` 直接接收来自任意客户端的数据报，参数返回发送方地址，服务器用 \`sendto\` 向该地址回复。\`listen\` 和 \`accept\` 是 TCP 连接队列机制，UDP 没有连接故不需要。UDP 客户端可以调用 \`connect\`（仅为设置默认目标地址，不发起握手），之后用 \`send\`/\`recv\` 替代 \`sendto\`/\`recvfrom\`。`,
    tags: ["TCP", "UDP", "网络编程"],
  },
];
