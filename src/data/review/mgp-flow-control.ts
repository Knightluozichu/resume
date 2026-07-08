import type { ReviewQuestion } from "./types";

export const mgpFlowControlQuestions: ReviewQuestion[] = [
  {
    id: "mgp-flow-control-1",
    chapter: "mgp-flow-control",
    level: 2,
    question: "流量控制和拥塞控制有什么区别？分别保护什么？",
    answer:
      "流量控制保护接收方：防止发送方发包速度超过接收方的处理和缓冲能力。机制是滑动窗口——接收方通过 ACK 告知发送方「我还能收多少」（advertised window），发送方不超过此限制。拥塞控制保护网络：防止发送方发包速度超过网络链路的承载能力。机制是拥塞窗口 + AIMD——发送方通过丢包反馈估计网络容量，正常时线性增大窗口，丢包时乘性减小。有效发送窗口 = min(接收窗口, 拥塞窗口)，同时保护接收方和网络。",
    tags: ["流量控制", "拥塞控制", "滑动窗口"],
  },
  {
    id: "mgp-flow-control-2",
    chapter: "mgp-flow-control",
    level: 3,
    question: "解释 AIMD 策略，为什么加性增、乘性减能让多连接公平收敛？",
    answer:
      "AIMD：正常时加性增——每个 RTT 拥塞窗口 +1 MSS（线性增长），缓慢探测可用带宽。丢包时乘性减——窗口减半（乘 0.5），快速释放带宽。公平收敛原理：假设两条连接共享一条带宽为 B 的链路。初始时各占 B/2。如果某次丢包，一条减半到 B/4，另一条保持 B/2。下一轮：B/4 的加性增到 B/4+1，B/2 的因丢包减到 B/4。两者趋于 B/2 的平衡。乘性减保证总带宽不超过链路容量，加性增保证减小的连接能逐渐追回带宽。数学上可证明多个 AIMD 连接最终收敛到公平共享。",
    tags: ["AIMD", "公平收敛", "拥塞控制"],
  },
  {
    id: "mgp-flow-control-3",
    chapter: "mgp-flow-control",
    level: 3,
    question: "滑动窗口机制是如何工作的？窗口大小对性能有什么影响？",
    answer:
      "滑动窗口：发送方维护一个窗口，窗口内的包可以连续发送而不必等 ACK。bytesInFlight（已发未确认字节数）+ 新包大小 <= windowSize 时才能发送。收到 ACK 后 sendBase 前移、bytesInFlight 减少，窗口向前「滑动」，可以发更多数据。窗口大小的影响：窗口太小 → 在途包少，带宽利用率低，RTT 内只能发 windowSize 字节（吞吐量 = windowSize / RTT）；窗口太大 → 在途包多，可能压垮接收方或网络，导致丢包。理想窗口 = 带宽 × RTT（BDP，带宽延迟积），刚好填满管道。",
    tags: ["滑动窗口", "BDP", "吞吐量"],
  },
  {
    id: "mgp-flow-control-4",
    chapter: "mgp-flow-control",
    level: 4,
    question: "为什么游戏可靠 UDP 也需要做拥塞控制？不做会有什么后果？",
    answer:
      "即使游戏数据量小，不做拥塞控制也会出问题。当多个玩家同时连接服务器时，如果每个连接都全速发送，路由器队列会溢出导致大量丢包。没有拥塞控制意味着丢包后重传频率不变甚至更猛（因为不减速），形成恶性循环——重传加剧拥塞，拥塞导致更多丢包，更多丢包导致更多重传。最终所有连接的延迟飙升、吞吐量崩溃（拥塞崩溃）。TCP 的 AIMD 证明了：即使每个连接自私地最大化自己的吞吐，AIMD 策略也能让它们公平收敛。游戏可靠 UDP 必须实现某种形式的拥塞控制（如基于 ACK 的带宽估计 + AIMD），否则在网络拥塞时会崩溃。",
    tags: ["拥塞控制", "拥塞崩溃", "AIMD"],
  },
];
