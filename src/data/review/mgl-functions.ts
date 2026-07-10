import type { ReviewQuestion } from "./types";

/** 函数 复习题 */
export const mglFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "mgl-functions-1",
    chapter: "mgl-functions",
    level: 1,
    question: `函数复合 (f∘g)(x) = f(g(x)) 满足什么律但不满足什么律？`,
    answer: `满足结合律，不满足交换律。复合满足结合律 (f∘g)∘h=f∘(g∘h)，但不满足交换律 f∘g≠g∘f（一般情况）。`,
    tags: ["函数复合", "结合律"],
  },
  {
    id: "mgl-functions-2",
    chapter: "mgl-functions",
    level: 2,
    question: `函数 f(x)=x² 在什么条件下有逆函数？`,
    answer: `限制定义域到 [0,+∞)。x² 在全体实数上不是一一对应（f(2)=f(-2)），限制到 [0,+∞) 后单调，逆为 √x。`,
    tags: ["逆函数", "定义域"],
  },
  {
    id: "mgl-functions-3",
    chapter: "mgl-functions",
    level: 3,
    question: `以下函数增长最慢的是？`,
    answer: `log n。增长速度：log n < n < n² < 2ⁿ。对数增长最慢，这也是 O(log n) 算法高效的原因。`,
    tags: ["增长速度", "对数"],
  },
  {
    id: "mgl-functions-4",
    chapter: "mgl-functions",
    level: 4,
    question: `数学中的函数与编程中的哪种函数完全对应？`,
    answer: `纯函数（无副作用）。数学函数是纯映射——相同输入永远产生相同输出、无副作用。对应编程中的纯函数，是函数式编程的核心。`,
    tags: ["纯函数", "函数式编程"],
  },
];
