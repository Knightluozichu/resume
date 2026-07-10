import type { ReviewQuestion } from "./types";

export const cntCongestionControlQuestions: ReviewQuestion[] = [
  {
    id: "cnt-cc-1",
    chapter: "cnt-congestion-control",
    level: 1,
    question: `TCP Reno的四个阶段是什么？慢启动和拥塞避免的增长方式有什么区别？`,
    answer: `TCP Reno四个阶段：①慢启动——初始cwnd=1 MSS，每收到ACK cwnd+1，等效每RTT翻倍（指数增长）②拥塞避免——cwnd达到ssthresh后进入，每RTT cwnd+1 MSS（线性增长）③快速重传——收到3个重复ACK判定丢包，立即重传 ④快速恢复——ssthresh=cwnd/2，cwnd=ssthresh，继续拥塞避免。慢启动是指数增长（每RTT翻倍），用于快速探测网络容量；拥塞避免是线性增长（每RTT+1 MSS），接近容量后谨慎探测。切换由ssthresh控制。`,
    tags: ["TCP Reno", "慢启动", "拥塞避免"],
  },
  {
    id: "cnt-cc-2",
    chapter: "cnt-congestion-control",
    level: 2,
    question: `AIMD的数学公式是什么？为什么乘性减而非线性减？`,
    answer: `AIMD公式：加性增 cwnd = cwnd + 1/cwnd（每ACK），等效每RTT cwnd增加1 MSS；乘性减 cwnd = cwnd/2（检测到拥塞时减半）。选择乘性减而非线性减的原因：①乘性减能快速从拥塞中恢复——减半让网络队列迅速排空，线性减太慢导致拥塞持续 ②AIMD保证公平性——多个竞争连接收敛到公平分享（占带宽多的减得也多，最终趋于相等），数学上可证明AIMD轨迹收敛到公平线 ③线性减收敛慢且在动态网络中无法达到公平。加性增是为了温和探测可用带宽。`,
    tags: ["AIMD", "乘性减", "公平性"],
  },
  {
    id: "cnt-cc-3",
    chapter: "cnt-congestion-control",
    level: 2,
    question: `快速重传和快速恢复的机制是什么？与超时事件有什么区别？`,
    answer: `快速重传：发送方收到3个重复ACK时判定分组丢失，立即重传而不等超时定时器。3个重复ACK比超时更早出现，且说明后续分组已到达网络（网络并未严重拥塞）。快速恢复：快速重传后不回到慢启动，而是ssthresh=cwnd/2、cwnd=ssthresh，继续拥塞避免。与超时的区别：超时事件意味着严重拥塞（分组及其后续ACK都丢失），因此超时时ssthresh=cwnd/2且cwnd=1（回到慢启动）。3个重复ACK意味着轻度拥塞（后续分组到达了），只需减半不需要回到慢启动。`,
    tags: ["快速重传", "快速恢复", "超时"],
  },
  {
    id: "cnt-cc-4",
    chapter: "cnt-congestion-control",
    level: 4,
    question: `在稳态下TCP的吞吐量如何估算？如果丢包率为p，吞吐量与RTT和p的关系是什么？`,
    answer: `稳态吞吐量估算：在拥塞避免阶段，窗口从W/2线性增长到W，平均窗口为3W/4，平均吞吐量约(3/4)*(W/RTT)。丢包时窗口减半（W/2），所以W与丢包率p有关。根据Mathis公式：吞吐量 ≈ 1.22 * MSS / (RTT * sqrt(p))。这意味着吞吐量与RTT成反比、与丢包率p的平方根成反比。高RTT或高丢包率会显著降低TCP吞吐量。例如RTT加倍则吞吐量减半，丢包率增4倍则吞吐量减半。这也是为什么卫星链路（高RTT）和无线链路（高丢包）对TCP性能影响大。`,
    tags: ["吞吐量", "丢包率", "Mathis公式", "稳态"],
  },
];
