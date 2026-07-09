import type { ReviewQuestion } from "./types";

export const bdpDeploymentMainnetQuestions: ReviewQuestion[] = [
  {
    id: "bdp-deployment-mainnet-01",
    chapter: "bdp-deployment-mainnet",
    level: 1,
    question: "主网上线的七阶段流水线是什么？",
    answer: "七阶段为：1 编译（solc 产出 ABI 与字节码）、2 测试（单元/模糊/分叉覆盖）、3 测试网部署（Sepolia 联调）、4 验证（Etherscan 源码核验）、5 审计（第三方审计修复高危）、6 多签（Gnosis Safe 分散权限）、7 主网部署（正式不可撤销）。",
    tags: ["部署流水线", "主网上线", "七阶段", "CI/CD"],
  },
  {
    id: "bdp-deployment-mainnet-02",
    chapter: "bdp-deployment-mainnet",
    level: 2,
    question: "可升级合约的治理流程为什么需要提案-时间锁-多签-执行四个环节？",
    answer: "提案公开升级内容供社区知情；时间锁设延迟执行窗口，让用户有时间在恶意升级前退出资金；多签批准要求 M-of-N 签名防止单点作恶；执行才真正切换 Logic 地址。四环节把升级权关进笼子，兼顾可迭代性与用户保护，避免治理单点风险。",
    tags: ["可升级", "治理", "时间锁", "多签", "Gnosis Safe"],
  },
  {
    id: "bdp-deployment-mainnet-03",
    chapter: "bdp-deployment-mainnet",
    level: 2,
    question: "上线后运维监控应关注哪些指标与应急手段？",
    answer: "链上监控关注 TVL、交易量、Gas 与异常大额转账告警；事件追踪用 The Graph 索引与 Dune 仪表盘分析；应急手段包括 Pausable 暂停开关与资金抢救预案。监控与应急是上线后的生命线，能在漏洞被利用时快速止损。",
    tags: ["运维监控", "The Graph", "Dune", "Pausable", "应急响应"],
  },
  {
    id: "bdp-deployment-mainnet-04",
    chapter: "bdp-deployment-mainnet",
    level: 3,
    question: "为什么说「合约本身不可回滚，代理可换逻辑但状态难撤」？这对设计阶段意味着什么？",
    answer: "主网合约部署后字节码不可更改，已发生的交易与状态转移无法撤销；代理虽能替换 Logic 代码，但已写入的 storage 状态难以安全回退，错误状态可能已被外部依赖。因此设计阶段就必须把漏洞挡在门外：权限最小化、预留暂停开关、严守检查-生效-交互，安全靠设计而非靠回滚。",
    tags: ["不可回滚", "代理升级", "状态", "设计阶段", "安全前置"],
  },
];
