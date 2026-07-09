import type { ReviewQuestion } from "./types";

export const mbtBitcoinOverviewQuestions: ReviewQuestion[] = [
  {
    id: "mbt-bitcoin-overview-01",
    chapter: "mbt-bitcoin-overview",
    level: 1,
    question: "比特币系统的三层架构是什么？",
    answer: "三层架构为：应用层（比特币作为货币，提供价值传输、支付结算、储值手段）；协议层（共识规则与交易验证，包括 PoW 共识、区块链账本、交易脚本、UTXO 模型、难度调整）；网络层（P2P 传播，包括全节点、矿工节点、SPV 轻节点、Gossip 协议）。",
    tags: ["三层架构", "应用层", "协议层", "网络层"],
  },
  {
    id: "mbt-bitcoin-overview-02",
    chapter: "mbt-bitcoin-overview",
    level: 1,
    question: "比特币的五大核心特征是什么？",
    answer: "五大核心特征为：去中心化（无中央服务器）、无需信任（密码学验证）、抗审查（点对点传播）、不可篡改（链式哈希锚定）、限量发行（2100 万枚上限）。",
    tags: ["核心特征", "去中心化", "不可篡改", "限量发行"],
  },
  {
    id: "mbt-bitcoin-overview-03",
    chapter: "mbt-bitcoin-overview",
    level: 2,
    question: "比特币如何通过密码学实现「无需信任」？",
    answer: "比特币用 ECDSA 椭圆曲线签名验证交易发起者身份，用 SHA256 哈希链接区块保证不可篡改，用 PoW 共识让节点独立验证而非依赖第三方。用户只需验证密码学证明即可确认交易有效性，无需信任任何中间机构。这是比特币区别于传统金融系统的根本设计。",
    tags: ["无需信任", "密码学", "ECDSA", "PoW", "设计原理"],
  },
  {
    id: "mbt-bitcoin-overview-04",
    chapter: "mbt-bitcoin-overview",
    level: 2,
    question: "比特币的创世与关键发展节点有哪些？",
    answer: "2008 年中本聪发表白皮书提出比特币概念；2009 年创世块诞生、主网上线；2012 年首次产量减半；此后持续演进，引入隔离见证（SegWit）修复延展性并扩容，发展闪电网络实现链下即时支付。每次减半约每 4 年（21 万块）发生一次，区块奖励逐步递减，总量趋近 2100 万。",
    tags: ["发展历史", "创世块", "减半", "隔离见证", "闪电网络"],
  },
];
