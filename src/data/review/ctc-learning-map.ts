import type { ReviewQuestion } from "./types";

export const ctcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ctc-learning-map-1",
    chapter: "ctc-learning-map",
    level: 1,
    question: "官方25章可以分成哪六段学习路径？",
    answer: "Language 1-4；.NET and Data 5-11；Runtime Services 12-17；Metadata and Dynamic 18-20；Concurrency and Low-level 21-24；Text 25。每段以前一段的type、owner和boundary模型为前置。",
    tags: ["official-outline", "learning-path", "25-chapters"],
  },
  {
    id: "ctc-learning-map-2",
    chapter: "ctc-learning-map",
    level: 2,
    question: "Predict-trace-break-transfer循环怎样证明一章已掌握？",
    answer: "先预测机制结果，再画type/state/owner/boundary，注入invalid、fault或race，最后迁移到陌生案例；保留compile test、timeline、benchmark、heap path或wire bytes等可复查证据。",
    tags: ["evidence", "failure-injection", "transfer"],
  },
];
