import type { ReviewQuestion } from "./types";

export const mgpReliableUdpQuestions: ReviewQuestion[] = [
  {
    id: "mgp-reliable-udp-1",
    chapter: "mgp-reliable-udp",
    level: 2,
    question: `解释序号、ACK 和重传如何在可靠 UDP 中协同工作。`,
    answer:
      `序号：发送方为每个可靠包分配递增序号，让接收方能识别包的顺序和检测缺失。ACK：接收方收到包后返回确认，告知发送方「这个序号的包已收到」。重传：发送方把已发但未确认的包存在 pendingAcks 中，每个包记录发送时间。每帧检查：如果当前时间 - 发送时间 > RTO（重传超时），就重新发送该包并重置计时器。收到 ACK 后从 pendingAcks 中移除对应包。三者协同：序号标识包 → ACK 确认到达 → 未确认超时触发重传，形成闭环。`,
    tags: ["序号", "ACK", "重传"],
  },
  {
    id: "mgp-reliable-udp-2",
    chapter: "mgp-reliable-udp",
    level: 3,
    question: `为什么使用累积确认 + ACK 位域而不是每个包单独 ACK？`,
    answer:
      `单独 ACK 每个包效率低——每个可靠包都要等一个 ACK 包，ACK 包数量等于数据包数量，浪费带宽。累积确认让一个 ACK 确认所有序号小于等于它的包，大幅减少 ACK 数量。ACK 位域更进一步：一个 ACK 包除了累积确认序号 N，还用 32 位 bitmask 标记 N+1 到 N+32 各是否收到，这样一个 ACK 包就能确认最多 33 个包的到达状态。这在乱序到达场景下特别有效——即使包不连续到达也能被批量确认，减少重传和 ACK 往返。`,
    tags: ["累积确认", "ACK位域", "带宽优化"],
  },
  {
    id: "mgp-reliable-udp-3",
    chapter: "mgp-reliable-udp",
    level: 3,
    question: `重传超时（RTO）设太短会有什么问题？正确的 RTO 应该怎么定？`,
    answer:
      `RTO 设太短会导致大量误判重传——包还在路上没到，你就以为丢了又发一份，反而加重网络负担。在丢包场景下会产生重传风暴：重传加剧拥塞 → 拥塞导致更多丢包 → 更多丢包导致更多重传，形成恶性循环。正确做法是 RTO 略大于一个 RTT（往返时延）。动态测量 RTT 并用类似 TCP 的公式：$RTO = SRTT + 4 \\times RTTVAR$（SRTT 是平滑 RTT，RTTVAR 是 RTT 方差）。典型游戏 RTO 在 100-500ms 之间，根据网络条件动态调整。`,
    tags: ["RTO", "重传", "RTT"],
  },
  {
    id: "mgp-reliable-udp-4",
    chapter: "mgp-reliable-udp",
    level: 4,
    question: `设计一个游戏网络的双通道系统（可靠+不可靠），说明哪些数据走哪个通道。`,
    answer:
      `可靠通道（ACK+重传+序号）：玩家输入（按键、开火、施法——不能丢，丢了操作就没了）、登录/认证请求、聊天消息、交易确认、场景加载请求。不可靠通道（直接发，丢了算了）：位置快照（每 30ms 一帧，旧的无用）、朝向/动画状态（下一帧就覆盖）、语音数据（偶尔丢包只是杂音）、事件特效（火花、爆炸——视觉表现，不影响逻辑）。关键原则：可靠通道只用于「丢了会影响游戏逻辑」的数据，不可靠通道用于「丢了不影响逻辑、下一个就覆盖」的数据。把所有数据都走可靠通道等于退回 TCP 的队头阻塞问题——一个快照丢了阻塞后续所有快照。`,
    tags: ["双通道", "可靠", "不可靠", "架构设计"],
  },
];
