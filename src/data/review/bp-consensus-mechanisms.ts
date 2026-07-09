import type { ReviewQuestion } from "./types";

export const bpConsensusMechanismsQuestions: ReviewQuestion[] = [
  {
    id: "bp-consensus-01",
    chapter: "bp-consensus-mechanisms",
    level: "L1",
    question: "什么是共识机制？它要解决的核心问题是什么？",
    answer: "共识机制是去中心化网络中互不信任的节点就账本状态达成一致的规则和算法。核心问题是拜占庭将军问题：在可能存在恶意或故障节点的网络中，如何让诚实节点就同一账本达成共识，防止双花并保证数据一致性。",
    tags: ["共识机制", "拜占庭将军", "去中心化", "一致性"],
  },
  {
    id: "bp-consensus-02",
    chapter: "bp-consensus-mechanisms",
    level: "L1",
    question: "PoW、PoS 和 DPoS 的基本原理分别是什么？",
    answer: "PoW（工作量证明）：矿工通过算力竞赛解哈希谜题，谁先解出谁获得记账权，代表为比特币。PoS（权益证明）：按持币量和持币时间选举验证者，质押越多被选中概率越大，作恶则质押被罚没，代表为以太坊2.0。DPoS（委托权益证明）：持币者投票选出少量超级节点，由代表轮流记账，代表为 EOS。",
    tags: ["PoW", "PoS", "DPoS", "工作量证明", "权益证明"],
  },
  {
    id: "bp-consensus-03",
    chapter: "bp-consensus-mechanisms",
    level: "L2",
    question: "什么是区块链不可能三角？各共识机制如何取舍？",
    answer: "不可能三角指安全性、去中心化和可扩展性三者难以同时满足。PoW 重安全性和去中心化，但可扩展性差（TPS 低）；DPoS 重可扩展性（TPS 高），但去中心化程度弱；PoS 处于中间平衡。任何共识机制都在三角之间做权衡取舍。",
    tags: ["不可能三角", "安全性", "去中心化", "可扩展性", "权衡"],
  },
  {
    id: "bp-consensus-04",
    chapter: "bp-consensus-mechanisms",
    level: "L2",
    question: "什么是临时分叉？PoW 和 PoS 在最终性上有何区别？",
    answer: "临时分叉是指两个矿工几乎同时出块，导致链出现分支，通过最长链原则消解，短链上的交易被废弃回滚。PoW 是概率最终性，确认数越多越安全，但理论上始终可能被更长的链取代；PoS 和 PBFT 提供绝对最终性，一旦区块被确认就不可回滚。",
    tags: ["分叉", "最长链原则", "最终性", "概率最终性", "确认数"],
  },
];
