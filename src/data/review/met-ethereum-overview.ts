import type { ReviewQuestion } from "./types";

export const metEthereumOverviewQuestions: ReviewQuestion[] = [
  {
    id: "met-ethereum-overview-01",
    chapter: "met-ethereum-overview",
    level: 1,
    question: `以太坊的核心设计目标是什么？它如何超越比特币的定位？`,
    answer: `以太坊的设计目标是成为去中心化的图灵完备智能合约平台，即「世界计算机」。比特币是去中心化数字货币（价值存储），脚本受限；以太坊在比特币之上扩展可编程性，让区块链承载任意复杂逻辑，实现可编程价值，超越单纯的账本定位。`,
    tags: ["设计目标", "世界计算机", "图灵完备", "比特币对比"],
  },
  {
    id: "met-ethereum-overview-02",
    chapter: "met-ethereum-overview",
    level: 2,
    question: `描述以太坊四层架构，并说明各层职责。`,
    answer: `四层架构：共识层（PoS 权益证明，验证者质押 ETH 产出区块，保障去中心化共识）；执行层（EVM 处理交易、计量 Gas、驱动状态转换）；合约层（Solidity 合约编译为字节码，定义可编程逻辑）；应用层（DApp/DeFi/NFT/DAO，用户与合约交互的入口）。`,
    tags: ["四层架构", "共识层", "执行层", "合约层", "应用层"],
  },
  {
    id: "met-ethereum-overview-03",
    chapter: "met-ethereum-overview",
    level: 2,
    question: `EOA 与 CA 有什么区别？为什么合约账户不能主动发起交易？`,
    answer: `EOA（外部拥有账户）由私钥控制，可主动发起交易，状态仅含 nonce 和余额。CA（合约账户）由代码控制，含字节码和存储，不能主动发起交易——因为合约没有私钥，无法对交易签名。合约只能被 EOA 发起的交易或其他合约调用时被动执行逻辑。EOA 是交易的发起者，CA 是执行者。`,
    tags: ["EOA", "CA", "账户模型", "交易发起"],
  },
  {
    id: "met-ethereum-overview-04",
    chapter: "met-ethereum-overview",
    level: 3,
    question: `什么是以太坊的状态机模型？全局状态如何组织？`,
    answer: `以太坊本质是一台状态机：每个区块包含一批交易，交易驱动状态从前一区块转换到下一区块。全局状态用默克尔帕特里夏树（MPT）组织，每个账户的状态（余额、nonce、存储根、代码哈希）都是树中的一个节点。状态根哈希写入区块头，任何节点都可独立验证状态一致性。这与比特币的 UTXO 集合模型截然不同。`,
    tags: ["状态机", "MPT", "全局状态", "状态转换", "状态根"],
  },
];
