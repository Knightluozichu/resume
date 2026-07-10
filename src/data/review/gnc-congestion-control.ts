import type { ReviewQuestion } from "./types";

export const gncCongestionControlQuestions: ReviewQuestion[] = [
  {
    id: "gnc-congestion-control-1",
    chapter: "gnc-congestion-control",
    level: 2,
    question: `AIMD（加性增/乘性减）策略是什么？为什么这种不对称设计保证公平性？`,
    answer:
      `AIMD 是经典拥塞窗口调节策略：正常时每个 RTT 把 cwnd 加 1（线性/加性增长），检测到丢包时把 cwnd 减半（乘性下降）。不对称设计保证全局公平性：多个连接共享带宽时，减半快的连接（丢包多）会让出更多资源给减半慢的（丢包少），最终收敛到公平分配。如果增长和减少都是线性的，一个贪婪的连接可以持续抢占带宽不收敛；乘性减的「一刀切」让抢占者快速退让，是数学上证明可收敛到公平点的策略。`,
    tags: ["AIMD", "拥塞控制", "公平性"],
  },
  {
    id: "gnc-congestion-control-2",
    chapter: "gnc-congestion-control",
    level: 3,
    question: `为什么 BBR 比 CUBIC 更适合高延迟链路？`,
    answer:
      `CUBIC 以丢包为拥塞信号，但现代路由器的深缓冲区（bufferbloat）会让包排队很久才丢——在丢包发生前延迟已经飙升到几百毫秒。BBR 不等丢包，而是主动探测瓶颈带宽和最小 RTT，把在途数据量控制在 BDP（带宽×RTT）附近。这意味着 BBR 不会让缓冲区排队，延迟始终接近物理最小 RTT。对于跨区游戏（如中美 200ms RTT），CUBIC 可能把延迟推到 500ms+，而 BBR 能维持在 200ms 附近。`,
    tags: ["BBR", "CUBIC", "bufferbloat", "延迟"],
  },
  {
    id: "gnc-congestion-control-3",
    chapter: "gnc-congestion-control",
    level: 3,
    question: `BDP（带宽延迟积）是什么？为什么它是拥塞窗口的理想值？`,
    answer:
      `BDP = 瓶颈带宽 × 往返延迟（RTT），表示「在收到第一个 ACK 之前，链路上最多能容纳多少在途数据」。如果 cwnd 小于 BDP，带宽没用满（管道没填满）；如果 cwnd 大于 BDP，多余数据会在路由器缓冲区排队，导致延迟增加但不增加吞吐。因此 BDP 是既不浪费带宽又不增加排队延迟的理想窗口值，BBR 的核心就是把 cwnd 维持在 BDP 附近。`,
    tags: ["BDP", "拥塞窗口", "BBR"],
  },
  {
    id: "gnc-congestion-control-4",
    chapter: "gnc-congestion-control",
    level: 4,
    question: `游戏场景的拥塞控制为什么不能直接套用 TCP 算法？需要哪些适配？`,
    answer:
      `三个原因：①游戏流量是小包高频，AIMD 粒度太粗——cwnd 减半意味着一半关键操作发不出去；②游戏有优先级——位置心跳可丢，开火指令不能丢，拥塞时应优先保障高优先级消息，而 TCP 不区分优先级；③游戏对延迟敏感——基于丢包的算法在 bufferbloat 下延迟飙升到几百毫秒。适配方案：用 BBR 思路做带宽估计（不因丢包就大幅降速），配合优先级队列在拥塞时先丢低优先级包，cwnd 乘性减而非砍到 1（CUBIC 风格），保证关键操作通道不被饿死。`,
    tags: ["拥塞控制", "游戏适配", "优先级", "BBR"],
  },
];
