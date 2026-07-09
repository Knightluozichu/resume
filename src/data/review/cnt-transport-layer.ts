import type { ReviewQuestion } from "./types";

export const cntTransportLayerQuestions: ReviewQuestion[] = [
  {
    id: "cnt-tl-1",
    chapter: "cnt-transport-layer",
    level: 1,
    question: "TCP和UDP的核心区别是什么？各自适用于什么场景？",
    answer: "核心区别：①连接——TCP面向连接需三次握手，UDP无连接 ②可靠性——TCP保证送达和有序（序号/ACK/重传），UDP不保证 ③流量/拥塞控制——TCP有（rwnd/cwnd），UDP无 ④首部——TCP 20字节，UDP 8字节 ⑤速度——TCP有开销较慢，UDP无开销快。TCP适用于HTTP/SSH/邮件/文件传输等需可靠传输的场景；UDP适用于DNS/视频流/实时游戏等允许丢包但要求低延迟的场景。",
    tags: ["TCP", "UDP", "协议对比"],
  },
  {
    id: "cnt-tl-2",
    chapter: "cnt-transport-layer",
    level: 2,
    question: "TCP的三次握手过程是什么？为什么需要三次而不是两次？",
    answer: "三次握手过程：①客户端发送SYN报文（seq=x），进入SYN_SENT ②服务器发送SYN+ACK报文（seq=y, ack=x+1），进入SYN_RCVD ③客户端发送ACK报文（ack=y+1），双方进入ESTABLISHED。需要三次而非两次的原因：两次握手无法防止历史连接请求导致的错误——如果客户端的旧SYN延迟到达服务器，服务器回复SYN+ACK后直接建立连接，但客户端不会响应，服务器浪费资源等待。三次握手中客户端收到意外SYN+ACK后不发ACK，服务器收不到ACK就不建立连接。第三次ACK还确认了服务器序号。",
    tags: ["TCP", "三次握手", "连接管理"],
  },
  {
    id: "cnt-tl-3",
    chapter: "cnt-transport-layer",
    level: 3,
    question: "TCP如何动态估计RTT？写出EstimatedRTT和TimeoutInterval的计算公式。",
    answer: "TCP使用指数加权移动平均（EWMA）动态估计RTT。每次收到新的SampleRTT后更新：EstimatedRTT = (1-alpha)*EstimatedRTT + alpha*SampleRTT（alpha=0.125）。偏差：DevRTT = (1-beta)*DevRTT + beta*|SampleRTT - EstimatedRTT|（beta=0.25）。超时时间：TimeoutInterval = EstimatedRTT + 4*DevRTT。加4倍偏差是为了在RTT波动较大时避免不必要的超时重传。TCP只测量未重传报文段的RTT（Karn算法——无法区分是第一次还是重传的ACK）。",
    tags: ["TCP", "RTT估计", "EWMA", "超时"],
  },
  {
    id: "cnt-tl-4",
    chapter: "cnt-transport-layer",
    level: 3,
    question: "流量控制和拥塞控制有什么区别？TCP如何实现流量控制？",
    answer: "流量控制：接收方控制发送方速率，防止压垮接收方缓冲区，机制是接收窗口(rwnd)，端到端。拥塞控制：发送方感知网络拥塞并调整速率，防止压垮网络，机制是拥塞窗口(cwnd)通过AIMD调整。实际发送窗口=min(cwnd,rwnd)。TCP流量控制实现：接收方在ACK报文中携带rwnd=空闲缓冲区大小，发送方保证未确认数据量不超过rwnd。rwnd=0时发送方暂停发送但定期发零窗口探测报文防止死锁。",
    tags: ["流量控制", "拥塞控制", "rwnd", "cwnd"],
  },
];
