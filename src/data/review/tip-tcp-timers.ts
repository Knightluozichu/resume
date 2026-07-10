import { ReviewQuestion } from "./types";

export const tipTcpTimersQuestions: ReviewQuestion[] = [
  {
    id: "tip-tcp-timers-1",
    chapter: "tip-tcp-timers",
    level: 3,
    question: `TCP 如何估计 RTT 并计算 RTO？Karn 算法解决什么问题？`,
    answer:
      `RTT 估计：SRTT = (1-α)·SRTT + α·R（α=1/8，平滑 RTT），RTTVAR = (1-β)·RTTVAR + β·|SRTT-R|（β=1/4，RTT 方差），RTO = SRTT + max(G, 4·RTTVAR)（G 为时钟粒度）。Karn 算法解决重传歧义问题：当一个包被重传后，收到 ACK 时无法判断这个 ACK 是对原始包还是重传包的确认。Karn 算法规定：重传的包不参与 RTT 测量；同时重传时 RTO 指数退避（加倍），直到成功传输后恢复正常。`,
    tags: ["TCP", "RTT", "RTO", "Karn算法"],
  },
  {
    id: "tip-tcp-timers-2",
    chapter: "tip-tcp-timers",
    level: 2,
    question: `TCP 超时重传和快速重传的区别是什么？`,
    answer:
      `超时重传：发送方为每个已发未确认的包启动重传定时器，RTO 超时未收到 ACK 则重传，同时认为网络拥塞，ssthresh=cwnd/2，cwnd=1（慢启动）。快速重传：不等超时，收到 3 个重复 ACK（说明后面的包到了但某个包丢了）就立即重传丢失的包，同时 ssthresh=cwnd/2，cwnd=ssthresh（快恢复，不回到 1）。快速重传比重传定时器响应更快，对网络吞吐影响更小。`,
    tags: ["TCP", "超时重传", "快速重传", "重复ACK"],
  },
  {
    id: "tip-tcp-timers-3",
    chapter: "tip-tcp-timers",
    level: 2,
    question: `TCP 拥塞控制的四个阶段是什么？cwnd 如何变化？`,
    answer:
      `①慢启动：cwnd 从 1 开始，每收到一个 ACK cwnd+1（指数增长），到 ssthresh 转拥塞避免。②拥塞避免：cwnd 每个 RTT 加 1（线性增长），直到丢包。③快重传：3 个重复 ACK 触发，立即重传丢失包，ssthresh=cwnd/2。④快恢复：cwnd=ssthresh（不从 1 开始），继续拥塞避免线性增长。如果是超时丢包（非重复 ACK），则 ssthresh=cwnd/2，cwnd=1，回到慢启动。`,
    tags: ["TCP", "拥塞控制", "慢启动", "快恢复"],
  },
  {
    id: "tip-tcp-timers-4",
    chapter: "tip-tcp-timers",
    level: 1,
    question: `TCP 有哪些定时器？各自的作用是什么？`,
    answer:
      `①重传定时器：已发数据未收到 ACK 时触发超时重传 ②坚持定时器：收到 Window=0 后周期性发送窗口探测包，检查接收方窗口是否更新 ③保活定时器：连接长时间空闲时探测对端是否存活（非标准，可选）④2MSL 定时器：TIME_WAIT 状态等待 2 倍最大报文段生存时间，确保延迟报文消亡且最后 ACK 能重传。这些定时器共同保障 TCP 的可靠性和连接管理。`,
    tags: ["TCP", "定时器", "重传", "2MSL"],
  },
];
