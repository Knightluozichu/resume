import type { ReviewQuestion } from "./types";

export const ecsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ecs-final-review-1",
    chapter: "ecs-final-review",
    level: 1,
    question: "怎样对同一系统完成5章whole-book audit？",
    answer: "依次检查language surface的type/text/callback/dispatch，resource surface的construction与owner，generic surface的constraint/variance/substitution，LINQ surface的enumeration/provider/cardinality，exception surface的signal/cleanup/post-fault state；每项记录chosen contract、owner、normal/fault evidence。",
    tags: ["whole-book", "audit", "boundary"],
  },
  {
    id: "ecs-final-review-2",
    chapter: "ecs-final-review",
    level: 2,
    question: "整书完成与可发布分别需要哪些证据？",
    answer: "书内要求5章50条outline 100%、7个active pages、每章3个专属交互实验、章节与书分数100、旧active refs为0；工程门禁要求MDX、type、targeted lint与diff checks通过。全库225本完成前仍不push/deploy，避免局部通过冒充全局交付。",
    tags: ["release", "quality-gate", "evidence"],
  },
];
