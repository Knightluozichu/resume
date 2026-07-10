import type { ReviewQuestion } from "./types";

export const bdpDappArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "bdp-dapp-architecture-01",
    chapter: "bdp-dapp-architecture",
    level: 1,
    question: `DApp 的三层架构是什么？各层职责如何划分？`,
    answer: `三层架构：前端层负责用户交互（UI 组件、状态管理、钱包签名授权）；链下层负责索引与存储（The Graph 子图、IPFS/Arweave 元数据、预言机 Oracle）；链上层负责共识与状态（核心合约、代理合约、EVM 共识）。链上只放必须去中心化的逻辑与资产，其余下沉到链下与前端。`,
    tags: ["DApp 架构", "三层架构", "链上", "链下", "前端"],
  },
  {
    id: "bdp-dapp-architecture-02",
    chapter: "bdp-dapp-architecture",
    level: 2,
    question: `为什么元数据通常存到 IPFS 而非直接上链？CID 内容寻址如何保证一致性？`,
    answer: `链上存储昂贵，元数据（图片、JSON 属性）体量大，直接上链成本高且僵化；IPFS 提供去中心化存储，链上只存 CID 哈希。CID 由内容哈希生成，内容一旦改变 CID 即变，因此链上记录的 CID 与链下内容一一对应，保证不可篡改与可验证一致性。`,
    tags: ["IPFS", "元数据", "CID", "内容寻址", "存储"],
  },
  {
    id: "bdp-dapp-architecture-03",
    chapter: "bdp-dapp-architecture",
    level: 2,
    question: `DApp 前端为什么需要「乐观更新」？它的回滚机制是什么？`,
    answer: `链上写入有区块确认延迟，若每次都等确认才更新 UI，体验极差。乐观更新指交易提交后立即在前端假定成功并更新界面，同时记录原状态；若交易最终失败或回滚，则用记录的原状态回滚 UI。这样在保持去中心化真实性的同时给出即时反馈。`,
    tags: ["乐观更新", "回滚", "用户体验", "状态管理"],
  },
  {
    id: "bdp-dapp-architecture-04",
    chapter: "bdp-dapp-architecture",
    level: 3,
    question: `DApp 架构面临的三组关键权衡是什么？如何决策？`,
    answer: `三组权衡：延迟 vs 去中心化（更多链下索引提升速度但弱化去中心化）；Gas 成本 vs 链上数据量（链上数据越多越可信但越贵，需把非必要数据下链）；可升级性 vs 不可篡改（可升级便于修漏洞但削弱信任，需用多签+时间锁约束）。决策原则是按场景取舍：资产与核心逻辑上链且谨慎升级，索引与展示下链优化体验。`,
    tags: ["权衡", "延迟", "Gas 成本", "可升级性", "架构决策"],
  },
];
