import type { ReviewQuestion } from "./types";

/** 程序设计原则 复习题 */
export const ppDesignPrinciplesQuestions: ReviewQuestion[] = [
  {
    id: "pp-design-principles-1",
    chapter: "pp-design-principles",
    level: 1,
    question: `Bentley设计哲学的三个优先级？`,
    answer: `正确性优先、简洁性次之、效率第三。顺序不可颠倒。`,
    tags: ["设计哲学"],
  },
  {
    id: "pp-design-principles-2",
    chapter: "pp-design-principles",
    level: 2,
    question: `什么是循环不变式？三步验证法？`,
    answer: `每次循环开始时保持成立的条件。三步：初始化、保持、终止。`,
    tags: ["循环不变式"],
  },
  {
    id: "pp-design-principles-3",
    chapter: "pp-design-principles",
    level: 3,
    question: `从O(n^3)到O(n)的优化过程说明了什么设计原则？`,
    answer: `先用O(n^3)保证正确，再逐步优化。体现了正确性优先→效率第三的设计哲学。每步在保证正确性前提下优化。`,
    tags: ["最大子数组", "Kadane"],
  },
  {
    id: "pp-design-principles-4",
    chapter: "pp-design-principles",
    level: 4,
    question: `阐述逐步精化的设计方法。`,
    answer: `从高层抽象逐步细化到实现，每步保证正确性。如求最大子数组：遍历所有子数组（O(n^3)正确）→复用前缀和（O(n^2)）→观察负数无贡献（Kadane O(n)）。每步在正确性前提下优化效率。`,
    tags: ["综合", "逐步精化"],
  },
];
