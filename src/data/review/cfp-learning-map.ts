import type { ReviewQuestion } from "./types";

export const cfpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cfp-learning-map-1",
    chapter: "cfp-learning-map",
    level: 1,
    question: "第一版3部分15章如何递进？",
    answer: "Part 1第1-5章建立purity、types、patterns和composition；Part 2第6-10章扩展到errors、application、data与persistence；Part 3第11-15章处理lazy/state/async/Rx/message effects，出口依次是pure core、versioned application与operable lifecycle。",
    tags: ["outline", "parts", "learning-path"],
  },
  {
    id: "cfp-learning-map-2",
    chapter: "cfp-learning-map",
    level: 2,
    question: "如何用地图为真实项目选择阅读路线？",
    answer: "盘点signature hidden dependencies、typed errors、state version、effect terminal/capacity；从最早缺证据的章节开始并保留前置依赖。每章绑定真实workflow、fault case和exit gate，不以浏览页数判断完成。",
    tags: ["route", "evidence", "workflow"],
  },
];
