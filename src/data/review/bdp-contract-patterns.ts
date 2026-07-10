import type { ReviewQuestion } from "./types";

export const bdpContractPatternsQuestions: ReviewQuestion[] = [
  {
    id: "bdp-contract-patterns-01",
    chapter: "bdp-contract-patterns",
    level: 1,
    question: `合约设计模式的四大类别分别解决什么问题？`,
    answer: `四大类别：权限控制（管理谁能调用，如 Ownable、AccessControl、多签）；生命周期（管理何时可用，如 Pausable、状态机、自毁）；升级模式（管理如何迭代，如代理 Proxy、透明代理、UUPS）；工厂与数据（管理如何组织，如 Factory、注册表、ERC20/721、Pull 提款）。`,
    tags: ["设计模式", "权限控制", "升级模式", "工厂"],
  },
  {
    id: "bdp-contract-patterns-02",
    chapter: "bdp-contract-patterns",
    level: 2,
    question: `代理模式中 delegatecall 的工作原理是什么？为什么状态保留在 Proxy 而非 Logic 合约？`,
    answer: `delegatecall 在调用者（Proxy）的存储上下文中执行被调用者（Logic）的代码，即逻辑来自 Logic 但读写的是 Proxy 自己的 storage。因此状态保留在 Proxy，Logic 可被替换升级而状态不丢。EIP-1967 规定了固定的存储槽存放 Logic 地址，避免存储碰撞。`,
    tags: ["delegatecall", "代理模式", "可升级", "EIP-1967", "存储槽"],
  },
  {
    id: "bdp-contract-patterns-03",
    chapter: "bdp-contract-patterns",
    level: 3,
    question: `什么是重入攻击？「检查-生效-交互」模式如何防范它？`,
    answer: `重入攻击指合约在更新状态前调用外部合约，外部合约借机回调原合约，利用尚未更新的状态重复提取资产。「检查-生效-交互」模式要求：先做校验（检查）、再更新状态（生效）、最后才与外部合约交互（交互）。状态先改完，回调时已是新状态，从而阻断重入。配合 ReentrancyGuard 重入锁更稳妥。`,
    tags: ["重入攻击", "检查-生效-交互", "ReentrancyGuard", "安全"],
  },
  {
    id: "bdp-contract-patterns-04",
    chapter: "bdp-contract-patterns",
    level: 3,
    question: `推送支付为什么有风险？Pull 提款模式如何解决？`,
    answer: `推送支付即合约主动 transfer 给接收方，若接收方是恶意合约或 fallback 失败，会阻塞整个流程甚至导致拒绝服务。Pull 提款模式把支付改为「记入待领余额 + 接收方主动提取」，将失败隔离到单个接收方，不影响其他用户与合约主流程，是更安全的支付范式。`,
    tags: ["推送支付", "Pull 提款", "拒绝服务", "安全反模式"],
  },
];
