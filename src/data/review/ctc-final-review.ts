import type { ReviewQuestion } from "./types";

export const ctcFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ctc-final-review-1",
    chapter: "ctc-final-review",
    level: 2,
    question: "如何从wrong value、stuck work、retained resource和boundary fault反向定位章节？",
    answer: "Wrong value回到type/equality/query/schema；stuck work查Task、thread、lock、I/O和queue；retained resource查Dispose、GC root、pool和callback；boundary fault查network、assembly identity、ABI、crypto与regex budget。先收集最低成本证据再修改。",
    tags: ["causal-trace", "diagnostics", "boundary"],
  },
  {
    id: "ctc-final-review-2",
    chapter: "ctc-final-review",
    level: 3,
    question: "25章的最终掌握标准为什么必须包含解释、实现、诊断和迁移？",
    answer: "解释证明机制与反例，实现在成功/失败路径落实owner和limit，诊断用before/after证据建立因果，迁移证明不是背诵原例。四项都通过才具备面对未知工程问题的判断力。",
    tags: ["mastery", "implementation", "transfer"],
  },
];
