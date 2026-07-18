import type { ReviewQuestion } from "./types";

export const ecsLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ecs-learning-map-1",
    chapter: "ecs-learning-map",
    level: 1,
    question: "Effective C#第3版的5个原章和Item范围是什么？",
    answer: "Chapter 1 C# Language Idioms为Items 1-10；Chapter 2 .NET Resource Management为11-17；Chapter 3 Working with Generics为18-28；Chapter 4 Working with LINQ为29-44；Chapter 5 Exception Practices为45-50。课程以出版社目录、C# 6.0、ISBN 978-0-13-457944-3为结构基准。",
    tags: ["outline", "third-edition", "50-items"],
  },
  {
    id: "ecs-learning-map-2",
    chapter: "ecs-learning-map",
    level: 2,
    question: "为什么还要用type、lifetime、execution和failure四条横线复习？",
    answer: "原章顺序保证完整覆盖，横线把跨章风险连接起来：type从representation到provider binding；lifetime从creator到capture和Dispose；execution从construction到terminal/filter；failure从specific signal到cleanup、state guarantee和policy boundary。真实缺陷通常发生在这些连接处。",
    tags: ["contract-chain", "study-path", "evidence"],
  },
];
