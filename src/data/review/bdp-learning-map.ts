import type { ReviewQuestion } from "./types";

export const bdpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "bdp-learning-map-01",
    chapter: "bdp-learning-map",
    level: 1,
    question: "《区块链开发实战》全书分为哪五个开发阶段？",
    answer: "五个开发阶段为：基础与搭建（知识全景图与开发环境）、合约开发（Solidity 基础与设计模式）、集成与架构（Web3 集成与 DApp 架构）、测试与部署（安全审计与主网上线）、进阶与复习（DeFi/NFT 实战与知识闭环）。",
    tags: ["学习路径", "知识全景", "阶段划分"],
  },
  {
    id: "bdp-learning-map-02",
    chapter: "bdp-learning-map",
    level: 1,
    question: "为什么在学习 Solidity 合约开发之前必须先搭建好开发环境？",
    answer: "开发环境是合约开发的基础基座：编译器、框架、本地链和钱包共同支撑编译、部署、调试的完整闭环。没有可运行的环境，合约代码无法验证、无法测试、无法迭代，因此必须先搭好环境再编写合约。",
    tags: ["学习顺序", "开发环境", "前置依赖"],
  },
  {
    id: "bdp-learning-map-03",
    chapter: "bdp-learning-map",
    level: 2,
    question: "Web3 集成与 DApp 架构在知识体系中处于什么位置？为什么放在合约开发之后学习？",
    answer: "Web3 集成与 DApp 架构属于应用层。它们依赖合约层提供的 ABI 与链上状态，必须先理解合约如何读写、事件如何发出，才能设计前端与链上交互的数据通路和分层架构，因此放在合约开发之后。",
    tags: ["知识层次", "应用层", "依赖关系"],
  },
  {
    id: "bdp-learning-map-04",
    chapter: "bdp-learning-map",
    level: 2,
    question: "全书学习路径的核心脉络是什么？如何形成工程闭环？",
    answer: "核心脉络为：搭建环境 → 编写合约 → 集成前端 → 测试审计 → 部署主网 → 进阶实战 → 知识闭环。通过全书复习将五大阶段串联，从环境层到运维层形成四层工程视角，最终在工程决策链中完成知识闭环。",
    tags: ["核心脉络", "工程闭环", "复习整合"],
  },
];
