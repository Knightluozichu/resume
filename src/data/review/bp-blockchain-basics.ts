import type { ReviewQuestion } from "./types";

export const bpBlockchainBasicsQuestions: ReviewQuestion[] = [
  {
    id: "bp-basics-01",
    chapter: "bp-blockchain-basics",
    level: "L1",
    question: "什么是区块链？它的核心特征是什么？",
    answer: "区块链是一种以链式结构存储数据的分布式账本技术。核心特征包括：去中心化（无单一管理中心）、不可篡改（哈希链式绑定）、公开透明（账本全网可见）、匿名性（地址不绑身份）、可追溯（交易全链可查）。",
    tags: ["区块链定义", "核心特征", "去中心化", "不可篡改"],
  },
  {
    id: "bp-basics-02",
    chapter: "bp-blockchain-basics",
    level: "L1",
    question: "区块之间是如何链接的？为什么篡改单个区块会导致全链失效？",
    answer: "每个区块在区块头中存储了上一个区块的哈希值（前区块哈希），形成链式绑定。如果篡改某个区块的数据，该区块的哈希值会改变（雪崩效应），导致后续所有区块中存储的前区块哈希失配，从而被全网节点识别为非法链而拒绝。",
    tags: ["区块结构", "哈希指针", "防篡改", "链式绑定"],
  },
  {
    id: "bp-basics-03",
    chapter: "bp-blockchain-basics",
    level: "L2",
    question: "P2P 节点网络中，全节点、矿工节点和轻节点各有什么职责？",
    answer: "全节点存储完整区块链数据并独立验证所有交易和区块；矿工节点在全节点基础上还参与共识过程（如 PoW 挖矿），负责打包新区块；轻节点只存储区块头，通过 SPV（简化支付验证）验证与自己相关的交易，不保存全量数据。",
    tags: ["节点类型", "P2P网络", "全节点", "轻节点", "SPV"],
  },
  {
    id: "bp-basics-04",
    chapter: "bp-blockchain-basics",
    level: "L2",
    question: "区块链与传统数据库在数据存储方式上有何本质区别？",
    answer: "传统数据库由中心化机构管理，数据可增删改查；区块链是去中心化的分布式账本，数据只能追加（Append-Only），不可修改不可删除，所有节点持有相同副本并通过共识达成一致。区块链牺牲了写入效率换取了不可篡改性和去中心化信任。",
    tags: ["区块链", "数据库", "去中心化", "追加写入"],
  },
];
