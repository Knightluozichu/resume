import type { ReviewQuestion } from "./types";

export const dcsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dcs-final-review-1",
    chapter: "dcs-final-review",
    level: 1,
    question: "怎样让同一系统横穿第四版15章？",
    answer: "先按四Part扫描context/version、C# 2-5 foundation、C# 6 concision和C# 7+ shape/lifetime；再沿type、execution、data shape与memory四条chain追踪同一value和owner，记录original/modern version、normal/fault evidence。",
    tags: ["whole-book", "audit", "chain"],
  },
  {
    id: "dcs-final-review-2",
    chapter: "dcs-final-review",
    level: 2,
    question: "本书完成需要哪些最终证据？",
    answer: "第四版identity与4 Parts/15 Chapters coverage 100%，17个active pages按0/1-15/16导航，所有页100且每页3个专属labs，34道活动review questions，旧topic refs为0，MDX/type/targeted lint/diff通过；全库225本完成前不push/deploy。",
    tags: ["release", "quality-gate", "evidence"],
  },
];
