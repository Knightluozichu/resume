import type { ReviewQuestion } from "./types";
export const flpLearningMapQuestions: ReviewQuestion[] = [
  { id: "flp-learning-map-1", chapter: "flp-learning-map", level: 1, question: "全书五个Part怎样形成依赖？", answer: "数据结构建立对象协议，函数作为对象组合行为，类与协议建立替换边界，控制流管理暂停并发，元编程处理声明层重复。", tags: ["学习地图", "五Part"] },
  { id: "flp-learning-map-2", chapter: "flp-learning-map", level: 2, question: "为什么不能按技巧清单阅读？", answer: "技巧脱离协议、状态和失败路径就无法迁移。应沿官方章序先建立模型，再实现正常、边界和失败实验。", tags: ["学习策略"] },
  { id: "flp-learning-map-3", chapter: "flp-learning-map", level: 3, question: "每章的最小验收证据是什么？", answer: "一个可运行实现、一个边界反例、一个失败路径解释，以及四道分级题均能独立回答。", tags: ["验收"] },
  { id: "flp-learning-map-4", chapter: "flp-learning-map", level: 4, question: "何时应回退补前置章？", answer: "当无法说明语法由哪个协议分派、状态由谁拥有、类型如何缩窄或取消怎样传播时，应回到对应前置章。", tags: ["依赖"] },
];
