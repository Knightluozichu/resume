import type { ReviewQuestion } from "./types";

export const metLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "met-learning-map-01",
    chapter: "met-learning-map",
    level: 1,
    question: "《精通以太坊》全书分为哪五个学习阶段？",
    answer: "五个学习阶段为：基础认知（知识全景图与以太坊概览）、基础机制（账户与密钥、交易与 Gas）、核心运行（EVM 与字节码）、合约与代币（Solidity 编程、智能合约安全、代币与标准）、应用与复习（DApp 与预言机、知识闭环）。",
    tags: ["学习路径", "知识全景", "阶段划分"],
  },
  {
    id: "met-learning-map-02",
    chapter: "met-learning-map",
    level: 1,
    question: "为什么在学习 EVM 与字节码之前必须先掌握账户与交易结构？",
    answer: "EVM 的输入是交易，交易的发起者是账户。不理解账户与密钥就无法理解交易签名与授权；不理解交易与 Gas 就无法理解 EVM 为何计量计算资源。EVM 执行建立在对账户和交易的理解之上，因此必须先掌握基础机制再学 EVM。",
    tags: ["学习顺序", "前置依赖", "基础机制"],
  },
  {
    id: "met-learning-map-03",
    chapter: "met-learning-map",
    level: 2,
    question: "全书学习路径的核心脉络是什么？如何形成系统闭环？",
    answer: "核心脉络为：理解原理 → 掌握账户 → 解析交易 → EVM 执行 → 合约编程 → 安全防护 → 代币标准 → DApp 应用 → 知识闭环。通过全书复习将各阶段串联，从认知层到应用层形成四层系统视角，最终在合约调用决策链中完成知识闭环。",
    tags: ["核心脉络", "系统闭环", "复习整合"],
  },
  {
    id: "met-learning-map-04",
    chapter: "met-learning-map",
    level: 2,
    question: "用四层系统视角概括以太坊知识体系。",
    answer: "四层视角为：认知层（世界计算机设计、账户模型、智能合约、PoS 共识，建立系统认知）；机制层（椭圆曲线密钥、EOA/CA 账户、交易结构、Gas 计量，定义数据与费用）；执行层（EVM 虚拟机、栈/内存/存储、字节码执行、状态转换，定义运行逻辑）；应用层（Solidity 合约、安全工程、ERC 代币标准、DApp 与预言机，定义生态应用）。",
    tags: ["四层视角", "认知层", "机制层", "执行层", "应用层", "知识体系"],
  },
];
