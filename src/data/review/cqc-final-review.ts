import type { ReviewQuestion } from "./types";

export const cqcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cqc-final-review-1",
    chapter: "cqc-final-review",
    level: 1,
    question: "整书终审的五重gate分别验证什么？",
    answer: "Outline验证版本、12章157条100%映射；chapter验证导学+12章+终审共14页质量；source验证旧content/diagram/review/registration为0且导航唯一；compile验证TypeScript/MDX/lint/diff；publish必须等225本全局完成后再build/push/deploy并提供线上证据。",
    tags: ["终审", "quality-gate", "publish"],
  },
  {
    id: "cqc-final-review-2",
    chapter: "cqc-final-review",
    level: 2,
    question: "怎样用producer-to-consumer chain审查一个parallel encrypted export？",
    answer: "从input bounds和query snapshot到stream/resource ownership，继续追cancellation/all-task faults、parallel degree/local reduction，再到AEAD/signature、version selector、artifact provenance和deployed smoke。每个箭头用boundary/fault tests、handle baseline、benchmark、signature verification和release evidence替换。",
    tags: ["contract-chain", "scenario-audit", "evidence"],
  },
];
