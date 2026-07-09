import type { ReviewQuestion } from "./types";

export const bpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "bp-learning-map-01",
    chapter: "bp-learning-map",
    level: "L1",
    question: "《白话区块链》全书分为哪五个学习阶段？",
    answer: "五个学习阶段为：基础概念（区块链基础与密码学）、机制原理（共识机制与交易区块）、应用层（智能合约与钱包账户）、链类型与应用（公私联盟链与应用展望）、复习整合（全书复习与知识闭环）。",
    tags: ["学习路径", "知识全景", "阶段划分"],
  },
  {
    id: "bp-learning-map-02",
    chapter: "bp-learning-map",
    level: "L1",
    question: "为什么在学习区块链时要先学密码学再学共识机制？",
    answer: "密码学提供了哈希函数和非对称加密等基础工具，是共识机制和交易验证的信任基石。没有密码学，区块链无法实现防篡改、身份验证和交易授权，因此必须先掌握密码学基础才能理解共识机制的设计逻辑。",
    tags: ["学习顺序", "密码学", "共识机制", "前置依赖"],
  },
  {
    id: "bp-learning-map-03",
    chapter: "bp-learning-map",
    level: "L2",
    question: "智能合约与钱包账户在知识体系中处于什么位置？为什么放在共识机制之后学习？",
    answer: "智能合约与钱包账户属于应用层。它们依赖共识机制保证状态一致性、依赖交易与区块结构承载数据，必须先理解底层共识和数据结构，才能理解合约如何在链上自动执行、钱包如何管理密钥并签名交易。",
    tags: ["知识层次", "应用层", "依赖关系"],
  },
  {
    id: "bp-learning-map-04",
    chapter: "bp-learning-map",
    level: "L2",
    question: "全书学习路径的核心脉络是什么？如何形成知识闭环？",
    answer: "核心脉络为：理解区块链 → 掌握密码学 → 共识与交易 → 合约与钱包 → 链类型与应用 → 知识整合。通过全书复习将五大阶段串联，从基础层到生态层形成四层统一视角，最终在设计决策链中完成知识闭环。",
    tags: ["核心脉络", "知识闭环", "复习整合"],
  },
];
