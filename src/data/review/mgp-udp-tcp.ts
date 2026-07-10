import type { ReviewQuestion } from "./types";

export const mgpUdpTcpQuestions: ReviewQuestion[] = [
  {
    id: "mgp-udp-tcp-1",
    chapter: "mgp-udp-tcp",
    level: 2,
    question: `解释 TCP 队头阻塞的原因及其对实时游戏的影响。`,
    answer:
      `TCP 保证可靠有序传输：数据必须按发送顺序交付给应用层。当一个包丢失时，后续已到达的包被阻塞在内核接收缓冲区中，直到丢失的包重传成功才能按序交付。在实时游戏中，服务器每 30ms 发一帧快照，如果第 N 帧丢了，第 N+1、N+2 帧即使已到达也无法交付，必须等第 N 帧重传——额外延迟至少一个 RTT（30-100ms）。而此时第 N 帧已经过时了，重传它毫无意义。这让游戏在丢包时出现明显卡顿。`,
    tags: ["TCP", "队头阻塞", "延迟"],
  },
  {
    id: "mgp-udp-tcp-2",
    chapter: "mgp-udp-tcp",
    level: 3,
    question: `TCP_NODELAY 解决了什么问题？它能解决队头阻塞吗？`,
    answer:
      `TCP_NODELAY 禁用 Nagle 算法，解决了「发送端攒小包」的延迟问题——Nagle 算法会在有未确认小包时暂缓发送新小包，攒到一定大小才发。这对游戏的小输入包有害。但 TCP_NODELAY 不能解决队头阻塞——队头阻塞是「接收端等包」问题：丢一个包后内核阻塞后续已到达的包等待重传，与发送端的 Nagle 算法无关。对实时游戏来说，TCP 的队头阻塞是结构性缺陷，无法通过任何 socket 选项修复，必须用 UDP。`,
    tags: ["TCP", "Nagle", "TCP_NODELAY", "队头阻塞"],
  },
  {
    id: "mgp-udp-tcp-3",
    chapter: "mgp-udp-tcp",
    level: 3,
    question: `游戏应该全部用 UDP 还是 UDP+TCP 混合？各自的优缺点是什么？`,
    answer:
      `两种方案都可以。混合方案：主循环流量（位置、输入）走 UDP 保证低延迟，辅助功能（登录、聊天、匹配）走 TCP 保证可靠性。优点是各取所长，TCP 可靠性免费获得；缺点是维护两套连接、穿越 NAT 更复杂（两个端口）、TCP 和 UDP 混用时拥塞控制可能互相干扰。全 UDP 方案：自己在 UDP 上实现按需可靠性（可靠通道 + 不可靠通道）。优点是只有一个连接、NAT 穿透只需一次、可靠性可控；缺点是要自己实现 ACK/重传/序号。大多数竞技游戏选择全 UDP，因为控制力更强。`,
    tags: ["UDP", "TCP", "架构选型"],
  },
  {
    id: "mgp-udp-tcp-4",
    chapter: "mgp-udp-tcp",
    level: 4,
    question: `为什么说「按需可靠」是游戏网络相对 TCP 的核心优势？举例说明。`,
    answer:
      `TCP 的可靠性是全有或全无的——所有数据都可靠有序，无法选择性丢弃。但游戏数据有时效性分级：输入指令（开火、施法）必须可靠到达；位置快照每 30ms 一帧，丢了最新的下一个就补上，旧的不需要重传。用 UDP 自建可靠性可以分通道：可靠通道重传输入，不可靠通道直接发快照丢了就算。例如服务器连发 5 帧位置（1-5），帧 3 丢了：TCP 会让帧 4、5 等帧 3 重传，全部延迟一个 RTT 且帧 3 已过时；UDP 直接用帧 4、5 渲染，帧 3 永远不需要。这就是「按需可靠」的价值。`,
    tags: ["按需可靠", "UDP", "TCP", "延迟"],
  },
];
