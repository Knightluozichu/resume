import type { ReviewQuestion } from "./types";

export const mbtLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "mbt-learning-map-01",
    chapter: "mbt-learning-map",
    level: 1,
    question: `《精通比特币》全书分为哪五个学习阶段？`,
    answer: `五个学习阶段为：基础认知（知识全景图与比特币概览）、核心机制（密钥与地址、交易结构、区块链账本）、挖矿与网络（挖矿共识与 P2P 协议）、应用实践（钱包与实际使用）、进阶与复习（高级话题与知识闭环）。`,
    tags: ["学习路径", "知识全景", "阶段划分"],
  },
  {
    id: "mbt-learning-map-02",
    chapter: "mbt-learning-map",
    level: 1,
    question: `为什么在学习挖矿与共识之前必须先掌握密钥与交易结构？`,
    answer: `挖矿的本质是将交易打包成区块并通过 PoW 竞争出块。不理解密钥就无法理解交易签名与验证；不理解交易结构就无法理解区块内容。挖矿与共识建立在对密钥和交易的理解之上，因此必须先掌握核心机制再学挖矿。`,
    tags: ["学习顺序", "前置依赖", "核心机制"],
  },
  {
    id: "mbt-learning-map-03",
    chapter: "mbt-learning-map",
    level: 2,
    question: `全书学习路径的核心脉络是什么？如何形成系统闭环？`,
    answer: `核心脉络为：理解原理 → 掌握密钥 → 解析交易 → 链式账本 → 共识挖矿 → 网络传播 → 实际应用 → 进阶扩展 → 知识闭环。通过全书复习将各阶段串联，从认知层到应用层形成四层系统视角，最终在比特币设计决策链中完成知识闭环。`,
    tags: ["核心脉络", "系统闭环", "复习整合"],
  },
  {
    id: "mbt-learning-map-04",
    chapter: "mbt-learning-map",
    level: 2,
    question: `用四层系统视角概括比特币知识体系。`,
    answer: `四层视角为：认知层（比特币设计原理、去中心化价值、三层架构、五大特征，建立系统认知）；密码层（椭圆曲线密钥、Base58Check 编码、UTXO 交易模型、脚本与签名，定义数据结构）；共识层（PoW 挖矿、难度调整、最长链原则、P2P 网络传播，定义去中心化）；应用层（HD 钱包、隔离见证、闪电网络、扩展与隐私，定义实际使用）。`,
    tags: ["四层视角", "认知层", "密码层", "共识层", "应用层", "知识体系"],
  },
];
