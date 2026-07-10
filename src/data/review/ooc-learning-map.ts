import { ReviewQuestion } from "./types";

export const oocLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ooc-lm-1",
    chapter: "ooc-learning-map",
    level: 1,
    question: `《失控》全书的四大学习板块分别是什么？`,
    answer: `四大学习板块是：基础认知（全景图、生物与机器、涌现）、进化机制（共同进化、生态系统）、经济与智能（网络经济、群体智能）、反思与整合（控制失败、未来趋势、全书复习）。`,
    tags: ["学习路径", "知识结构"],
  },
  {
    id: "ooc-lm-2",
    chapter: "ooc-learning-map",
    level: 1,
    question: `《失控》的核心脉络是什么？`,
    answer: `核心脉络是：生物逻辑 → 涌现自组织 → 共同进化 → 分布式网络 → 失控即控制。这条脉络展示了从理解活系统法则，到认识涌现与共同进化，再到分布式网络经济，最终领悟失控即控制的完整演进。`,
    tags: ["核心脉络", "知识结构"],
  },
  {
    id: "ooc-lm-3",
    chapter: "ooc-learning-map",
    level: 2,
    question: `Kevin Kelly 在《失控》中提出的核心论点是什么？`,
    answer: `核心论点是：生物逻辑与机器逻辑正在趋同融合。机器正在获得生物属性（自修复、自进化、自繁殖），生物正在获得工程属性（基因编辑、合成生物）。两者走向合一，形成「活系统」——一种兼具生物韧性和机器精确性的新型系统。`,
    tags: ["核心论点", "活系统"],
  },
  {
    id: "ooc-lm-4",
    chapter: "ooc-learning-map",
    level: 2,
    question: `「失控即控制」是什么意思？为什么这是全书的核心结论？`,
    answer: `「失控即控制」指最可靠的控制方式是放弃集中控制，让系统通过分布式自组织实现自我调节。这是核心结论，因为 Kelly 发现复杂系统（生态系统、经济系统、网络系统）无法被中央控制有效管理——复杂性超载、延迟致命、单点脆弱。只有去中心化、让系统自组织，才能实现真正的稳定与适应。`,
    tags: ["失控即控制", "去中心化"],
  },
];
