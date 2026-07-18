import type { ReviewQuestion } from "./types";

export const cfpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cfp-final-review-1",
    chapter: "cfp-final-review",
    level: 2,
    question: "怎样用四个boundaries复查一个函数式应用？",
    answer: "检查input是否进入typed values，decision是否deterministic，effect何时执行且由谁拥有，state/result何时versioned publish。再从external outcome反向追踪，任何hidden dependency、未分类failure或不明visibility都是缺口。",
    tags: ["architecture", "boundary", "review"],
  },
  {
    id: "cfp-final-review-2",
    chapter: "cfp-final-review",
    level: 3,
    question: "Book级发布为何需要四类证据？",
    answer: "Correctness证明examples/invariants/laws；compatibility证明old clients/events/messages与rolling versions；capacity证明queue/in-flight/replay上限；recovery证明duplicate/crash/checkpoint/idempotency/runbook。只通过unit tests不能覆盖后面三类风险。",
    tags: ["release", "compatibility", "recovery"],
  },
];
