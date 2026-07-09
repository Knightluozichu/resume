import type { ReviewQuestion } from "./types";

export const isnServerBasicsQuestions: ReviewQuestion[] = [
  {
    id: "isn-sb-1",
    chapter: "isn-server-basics",
    level: 1,
    question: "TCP和UDP的核心区别是什么？",
    answer: "TCP和UDP核心区别：①连接方式——TCP面向连接需三次握手，UDP无连接 ②可靠性——TCP保证送达和有序（序列号/确认重传/流量控制），UDP不保证 ③速度——TCP有握手和确认开销较慢，UDP无开销快 ④场景——TCP适合HTTP/数据库/文件传输，UDP适合DNS/视频流/实时游戏。",
    tags: ["TCP", "UDP", "协议对比"],
  },
  {
    id: "isn-sb-2",
    chapter: "isn-server-basics",
    level: 1,
    question: "套接字（Socket）是什么？服务器监听的流程是什么？",
    answer: "套接字是网络通信的端点，由IP地址和端口号组成（如192.168.1.10:80）。服务器监听流程：socket()创建套接字 → bind(IP:Port)绑定地址端口 → listen()开始监听 → accept()接受连接 → read/write收发数据 → close()关闭连接。套接字是应用层与传输层之间的API接口。",
    tags: ["套接字", "Socket", "服务器监听"],
  },
  {
    id: "isn-sb-3",
    chapter: "isn-server-basics",
    level: 2,
    question: "服务器有哪四种经典架构模型？Reactor模型为什么能支撑高并发？",
    answer: "四种经典架构模型：①迭代服务器——一次处理一个请求，并发极低 ②并发服务器（多进程）——每个连接fork子进程，并发中等（百级），代表早期Apache ③线程池——预创建线程池分配给空闲线程，并发中高（千级），代表Tomcat ④Reactor（事件驱动）——单线程事件循环+非阻塞IO，并发极高（万级），代表Nginx/Netty。Reactor能支撑高并发因为：单worker进程通过epoll监听数千个连接的非阻塞IO事件，哪个连接有数据就处理哪个，不需要为每个连接分配线程，线程切换开销远小于进程模型。",
    tags: ["架构模型", "Reactor", "高并发", "epoll"],
  },
  {
    id: "isn-sb-4",
    chapter: "isn-server-basics",
    level: 3,
    question: "TCP三次握手和四次挥手的过程是什么？TIME_WAIT问题如何解决？",
    answer: "三次握手：客户端发SYN→服务器回SYN+ACK→客户端发ACK，之后开始传输。四次挥手：主动方发FIN→被动方回ACK→被动方发FIN→主动方回ACK，连接断开。TIME_WAIT是主动关闭方在发最后ACK后进入的状态，持续2MSL（约60秒），目的是确保ACK到达和防止旧报文干扰新连接。高并发短连接场景下大量TIME_WAIT会耗尽端口。解决方案：使用长连接（Keep-Alive）、调整tcp_tw_reuse参数复用TIME_WAIT连接、使用连接池复用连接。",
    tags: ["TCP", "三次握手", "四次挥手", "TIME_WAIT"],
  },
];
