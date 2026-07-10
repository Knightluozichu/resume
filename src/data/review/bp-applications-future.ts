import type { ReviewQuestion } from "./types";

export const bpApplicationsFutureQuestions: ReviewQuestion[] = [
  {
    id: "bp-app-01",
    chapter: "bp-applications-future",
    level: 1,
    question: `列举区块链的三大核心应用领域并简述其价值。`,
    answer: `1. DeFi 去中心化金融：无需银行即可实现借贷、交易、稳定币等金融服务，全天候开放，降低门槛。2. NFT 数字资产：为艺术品、收藏品、游戏道具等提供唯一确权，可验证不可复制。3. 供应链溯源：全链路追踪物流和原产地，防伪保真，不可篡改，增强消费者信任。`,
    tags: ["DeFi", "NFT", "供应链溯源", "应用领域", "价值"],
  },
  {
    id: "bp-app-02",
    chapter: "bp-applications-future",
    level: 1,
    question: `区块链技术演进经历了哪几个阶段？`,
    answer: `区块链1.0：以比特币为代表的数字货币阶段，实现去中心化支付。区块链2.0：以以太坊为代表的智能合约阶段，实现可编程金融。区块链3.0：千行百业应用阶段，将区块链应用于政务、溯源、身份等领域。区块链4.0：可信互联阶段，通过跨链和隐私计算实现万链互联的可信基础设施。`,
    tags: ["技术演进", "区块链1.0", "区块链2.0", "区块链3.0", "区块链4.0"],
  },
  {
    id: "bp-app-03",
    chapter: "bp-applications-future",
    level: 2,
    question: `什么是 Layer2 扩容方案？为什么需要扩容？`,
    answer: `Layer2 是在主链（Layer1）之上构建的二层扩容方案，如 Rollup 和状态通道。需要扩容是因为主链 TPS 不足（以太坊约 15 TPS），交易拥堵导致 Gas 费高企。Layer2 将大量交易在链下处理，仅将最终结果提交主链，从而大幅提升 TPS、降低费用，同时继承主链的安全性。`,
    tags: ["Layer2", "扩容", "Rollup", "状态通道", "TPS", "Gas"],
  },
  {
    id: "bp-app-04",
    chapter: "bp-applications-future",
    level: 2,
    question: `区块链大规模落地面临哪些核心挑战？`,
    answer: `核心挑战包括：1. 扩展性瓶颈（TPS 不足、Gas 费高）；2. 监管不确定性（各国政策差异大，合规困难）；3. 用户体验差（私钥管理门槛高，操作复杂）；4. 能源消耗（PoW 共识高碳排放）；5. 隐私与透明的矛盾（账本公开 vs 商业隐私）。需要通过 Layer2、零知识证明、CBDC 合规等技术逐步解决。`,
    tags: ["核心挑战", "扩展性", "监管", "用户体验", "能源消耗", "隐私"],
  },
];
