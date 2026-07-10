import type { ReviewQuestion } from "./types";

export const bpSmartContractsQuestions: ReviewQuestion[] = [
  {
    id: "bp-contract-01",
    chapter: "bp-smart-contracts",
    level: 1,
    question: `什么是智能合约？它与传统合同有什么区别？`,
    answer: `智能合约是部署在区块链上的程序，当预设条件满足时自动执行，无需第三方中介。与传统合同的区别：传统合同依赖法律和人工执行，存在违约风险；智能合约由代码定义规则，链上自动执行，不可篡改不可阻止，代码即法律。但合约漏洞也无法撤销。`,
    tags: ["智能合约", "自动执行", "代码即法律", "与传统合同对比"],
  },
  {
    id: "bp-contract-02",
    chapter: "bp-smart-contracts",
    level: 1,
    question: `智能合约的部署和执行流程分别是什么？`,
    answer: `部署流程：编写合约代码（如 Solidity）→ 编译为字节码 → 通过部署交易广播上链 → 获得合约地址，合约在链上存储运行。执行流程：用户或合约发起调用 → EVM 虚拟机读取合约状态并执行逻辑（消耗 Gas）→ 更新链上状态或转账 → 触发事件日志 → 全网共识确认结果不可逆。`,
    tags: ["合约部署", "合约执行", "EVM", "Gas", "字节码"],
  },
  {
    id: "bp-contract-03",
    chapter: "bp-smart-contracts",
    level: 2,
    question: `什么是 Gas？为什么智能合约执行需要消耗 Gas？`,
    answer: `Gas 是衡量智能合约执行计算量的单位，每一步操作都消耗对应的 Gas。需要 Gas 的原因：1. 防止恶意用户编写无限循环合约耗尽全网资源；2. 激励矿工/验证者执行合约并获得报酬；3. 为计算资源定价，使复杂合约成本更高，促进代码优化。Gas 费由发起者支付，Gas 不足则交易回滚。`,
    tags: ["Gas", "手续费", "资源限制", "EVM", "Gas耗尽"],
  },
  {
    id: "bp-contract-04",
    chapter: "bp-smart-contracts",
    level: 2,
    question: `智能合约面临哪些主要安全风险？如何理解重入攻击？`,
    answer: `主要风险包括：代码漏洞不可撤回、Gas 耗尽攻击、重入攻击、预言机问题（链外数据不可信）、可升级性矛盾。重入攻击是指合约在更新内部状态前先向外部地址转账，攻击者利用 fallback 函数 recursively 回调原合约，在状态未更新前重复提取资金。预防方法包括 Checks-Effects-Interactions 模式和使用重入锁。`,
    tags: ["安全风险", "重入攻击", "Gas耗尽", "预言机问题", "Checks-Effects-Interactions"],
  },
];
