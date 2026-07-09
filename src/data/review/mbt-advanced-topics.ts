import type { ReviewQuestion } from "./types";

export const mbtAdvancedTopicsQuestions: ReviewQuestion[] = [
  {
    id: "mbt-advanced-topics-01",
    chapter: "mbt-advanced-topics",
    level: 2,
    question: "隔离见证（SegWit）解决了什么问题？如何实现的？",
    answer: "SegWit 解决两个问题：1）交易延展性——传统交易中签名数据可被第三方修改导致 txid 变化，SegWit 将签名数据移至独立的「见证」字段，txid 不再受签名影响，为闪电网络等二层协议铺平道路。2）区块容量——见证数据以折扣方式计入区块权重（权重 = 基础大小 ×4 + 见证大小 ×1），实际增加了可容纳的交易数量，降低手续费。SegWit 以软分叉方式部署，向后兼容。",
    tags: ["SegWit", "隔离见证", "交易延展性", "区块容量", "软分叉"],
  },
  {
    id: "mbt-advanced-topics-02",
    chapter: "mbt-advanced-topics",
    level: 2,
    question: "闪电网络如何实现链下即时支付？",
    answer: "闪电网络通过支付通道实现链下支付：1）两个用户在链上开启通道（2/2 多签锁定资金）；2）双方在链下无限次更新余额分配（只签不广播）；3）关闭时将最终余额结算上链，仅需两次链上交易。多跳路由让无直接通道的用户通过中间节点路由支付。链下支付毫秒级确认、极低手续费，适合微支付和高频交易场景，大幅扩展比特币的吞吐量。",
    tags: ["闪电网络", "支付通道", "链下", "路由", "多签"],
  },
  {
    id: "mbt-advanced-topics-03",
    chapter: "mbt-advanced-topics",
    level: 3,
    question: "什么是扩展性不可能三角？比特币如何应对这一挑战？",
    answer: "扩展性不可能三角指去中心化、安全性、吞吐量三者不可兼得，最多同时满足两个。比特币优先保证去中心化和安全性，牺牲吞吐量（约 7 TPS）。应对方案分两类：链上优化（SegWit 扩容、Schnorr 签名聚合、Taproot 隐私增强）在协议层提升效率；链下方案（闪电网络）将大量交易移至链下处理，只在结算时上链。两者互补，在不牺牲去中心化和安全性的前提下提升实际吞吐。",
    tags: ["扩展性三角", "去中心化", "安全性", "吞吐量", "链下方案"],
  },
  {
    id: "mbt-advanced-topics-04",
    chapter: "mbt-advanced-topics",
    level: 3,
    question: "Schnorr 签名和 Taproot 为比特币带来了哪些改进？",
    answer: "Schnorr 签名：1）线性可聚合——多签交易的多个签名可聚合成一个，降低手续费并提升隐私（外部观察者无法区分单签和多签）；2）数学证明安全，比 ECDSA 更简洁。Taproot：1）将复杂脚本（如多签、时间锁）在链上表现为普通支付，未执行的条件不暴露，增强隐私；2）多数情况下用 Taproot 路径（密钥路径）花费，更经济。两者结合使比特币更高效、更隐私，同时保持向后兼容。",
    tags: ["Schnorr", "Taproot", "签名聚合", "隐私", "脚本优化"],
  },
];
