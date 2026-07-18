import type { ReviewQuestion } from "./types";

export const cvcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cvc-final-review-1",
    chapter: "cvc-final-review",
    level: 2,
    question: "Wrong implementation、retained memory、slow work和boundary fault分别先取什么证据？",
    answer: "Wrong implementation先取runtime type/method/assembly identity；retention先取survivor root path；slow work先做queue、CPU、I/O、lock与continuation的latency decomposition；boundary fault先取binding、wire/schema或ABI映射。先用最小证据排除竞争假设。",
    tags: ["incident", "evidence", "causal-trace"],
  },
  {
    id: "cvc-final-review-2",
    chapter: "cvc-final-review",
    level: 3,
    question: "CLR via C#这本书进入全库最终发布门前必须满足哪些条件？",
    answer: "5部分30章完整，导学加30章加总复习恰好32页且逐页100；64道题与chapter key一一对应；旧抽样页题图零残留；导航、MDX、TypeScript、ESLint、引用和diff检查通过，并能完成跨Part故障迁移。全库225本未全部完成前仍不push部署。",
    tags: ["acceptance-gate", "quality", "deployment"],
  },
];
