import type { ReviewQuestion } from "./types";

export const dcsLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "dcs-learning-map-1",
    chapter: "dcs-learning-map",
    level: 1,
    question: "C# in Depth第四版的4个Part和15章怎样分布？",
    answer: "Part 1是Chapter 1 context；Part 2是Chapters 2-7的C# 2-5 foundations；Part 3是Chapters 8-10的C# 6 concision；Part 4是Chapters 11-15的C# 7与C# 8 preview。课程以Jon Skeet、Manning、2019-03、ISBN 9781617294532为identity。",
    tags: ["outline", "fourth-edition", "15-chapters"],
  },
  {
    id: "dcs-learning-map-2",
    chapter: "dcs-learning-map",
    level: 2,
    question: "为什么纵向版本路线之外还要四条横向chain？",
    answer: "Type chain连接generics到nullable references；execution chain连接delegate/iterator到async stream；shape chain连接initializer/format到tuple/pattern；memory chain连接copy/capture到ref-like lifetime。真实缺陷常发生在跨章连接处。",
    tags: ["type", "execution", "lifetime"],
  },
];
