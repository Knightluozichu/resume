import { ReviewQuestion } from "./types";

export const pdpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "pdp-lm-1",
    chapter: "pdp-learning-map",
    level: 1,
    question: `《刻意练习》全书的四大学习阶段分别是什么？`,
    answer: `四大学习阶段是：基础认知（全景图、什么是练习）、核心机制（心理表征、黄金标准）、方法实践（刻意练习原则、导师、瓶颈）、应用与整合（专家之路、日常、全书复习）。`,
    tags: ["学习路径", "知识结构"],
  },
  {
    id: "pdp-lm-2",
    chapter: "pdp-learning-map",
    level: 1,
    question: `天真练习、目的练习和刻意练习的核心区别是什么？`,
    answer: `天真练习无目标无反馈，只是简单重复；目的练习有目标有反馈但缺乏领域专家标准；刻意练习在已发展领域中有导师指导、有标准参照、有反馈纠错、在舒适区外系统训练。`,
    tags: ["三种练习", "核心概念"],
  },
  {
    id: "pdp-lm-3",
    chapter: "pdp-learning-map",
    level: 2,
    question: `什么是心理表征？它为什么是刻意练习的核心？`,
    answer: `心理表征是专家大脑中对应特定领域的高质量认知结构，不是记忆量的差异而是信息组织方式的差异。它是刻意练习的核心，因为刻意练习的本质就是持续构建和升级高质量心理表征，表征越精细表现越好。`,
    tags: ["心理表征", "核心概念"],
  },
  {
    id: "pdp-lm-4",
    chapter: "pdp-learning-map",
    level: 2,
    question: `全书的核心脉络是什么？它如何体现从天真练习到专家级表现的演进？`,
    answer: `核心脉络是：天真练习 → 目的练习 → 刻意练习 → 心理表征升级 → 专家级表现。这四个环节是递进循环：从无意识重复开始，到有目标努力，再到有标准有反馈的系统训练，最终通过持续构建心理表征实现专家级表现。`,
    tags: ["核心脉络", "知识结构"],
  },
];
