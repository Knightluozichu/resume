import type { ReviewQuestion } from "./types";

/** 算法心得总复习 复习题 */
export const hdFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "hd-final-review-1",
    chapter: "hd-final-review",
    level: 1,
    question: "Hacker's Delight 的核心思想？",
    answer: "用位运算的数学等价替代昂贵的操作：除法→乘法/移位、分支→位运算、循环→位运算。在性能关键路径上优化，非关键路径保持可读性。",
    tags: ["核心思想"],
  },
  {
    id: "hd-final-review-2",
    chapter: "hd-final-review",
    level: 2,
    question: "什么时候不该用位运算优化？",
    answer: "1.非性能关键路径（保持可读性）；2.编译器已自动优化（如 x/4→x>>2）；3.位运算破坏分支预测；4.可读性远比性能重要。先测量再优化。",
    tags: ["权衡", "可读性"],
  },
  {
    id: "hd-final-review-3",
    chapter: "hd-final-review",
    level: 3,
    question: "全书四大板块如何串联？",
    answer: "位操作基础（AND/OR/XOR/掩码）是语言→算术技巧（无分支/魔法数除法）是核心→高级技巧（快速幂/Gray码/浮点位操作）是综合→实际应用（CRC/哈希）是落地。递进。",
    tags: ["综合", "知识体系"],
  },
  {
    id: "hd-final-review-4",
    chapter: "hd-final-review",
    level: 4,
    question: "请总结位运算优化的核心原则。",
    answer: "1.理解硬件成本（除法贵位运算便宜）；2.在性能关键路径优化；3.用数学等价替代（补码/XOR自反性/浮点位模式）；4.消除不可预测分支；5.先测量再优化；6.非关键路径保持可读性。",
    tags: ["核心原则", "综合"],
  },
];
