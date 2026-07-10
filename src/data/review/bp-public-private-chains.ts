import type { ReviewQuestion } from "./types";

export const bpPublicPrivateChainsQuestions: ReviewQuestion[] = [
  {
    id: "bp-chain-01",
    chapter: "bp-public-private-chains",
    level: 1,
    question: `公有链、联盟链和私有链的主要区别是什么？`,
    answer: `公有链：任何人可参与，节点完全开放，匿名身份，用 PoW/PoS 共识，安全性最高但效率低（比特币、以太坊）。联盟链：由授权机构共同维护，节点需联盟成员授权，身份已知，用 PBFT/Raft 共识，效率较高（Hyperledger）。私有链：单一组织内部控制，效率最高但去中心化程度最低，用于内部审计和数据管理。`,
    tags: ["公有链", "联盟链", "私有链", "准入机制", "共识选择"],
  },
  {
    id: "bp-chain-02",
    chapter: "bp-public-private-chains",
    level: 1,
    question: `在什么场景下应该选择联盟链而非公有链？`,
    answer: `当多个互不信任但身份可知的机构需要协作，且对效率和隐私有较高要求时，应选择联盟链。典型场景包括：跨银行结算、供应链多方协作、政务数据共享。联盟链在成员间保持透明，用 PBFT 等共识实现高 TPS，同时控制数据访问权限，兼顾效率与多方信任。`,
    tags: ["联盟链", "场景选择", "多方协作", "PBFT", "权限管理"],
  },
  {
    id: "bp-chain-03",
    chapter: "bp-public-private-chains",
    level: 2,
    question: `什么是侧链和跨链技术？它们解决了什么问题？`,
    answer: `侧链是与主链并行运行的独立区块链，通过双向锚定机制实现资产在主链和侧链间转移，用于扩展主链功能（如闪电网络）。跨链技术（如 Polkadot、Cosmos）通过中继链或跨链桥实现不同区块链之间的资产和数据互通，解决区块链孤岛问题，构建万链互联的生态。`,
    tags: ["侧链", "跨链", "双向锚定", "Polkadot", "Cosmos", "互操作"],
  },
  {
    id: "bp-chain-04",
    chapter: "bp-public-private-chains",
    level: 2,
    question: `公有链的安全性为什么比私有链高？代价是什么？`,
    answer: `公有链安全性高因为：节点数量多且分布广，攻击者需控制大量算力或权益（51% 攻击成本极高），且任何人可验证账本。代价是：共识效率低（PoW 仅 7-15 TPS）、交易确认慢、Gas 费用高、隐私性差（账本全公开）。私有链效率高但依赖组织内部信任，安全性受限于参与方。`,
    tags: ["安全性", "公有链", "私有链", "51%攻击", "效率权衡"],
  },
];
