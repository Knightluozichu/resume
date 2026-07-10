import type { ReviewQuestion } from "./types";

/** 浮点数技巧：IEEE 754 的位级操作 复习题 */
export const hdFloatingPointQuestions: ReviewQuestion[] = [
  {
    id: "hd-floating-point-1",
    chapter: "hd-floating-point",
    level: 1,
    question: `IEEE 754 单精度的位布局？`,
    answer: `32位：1位符号S + 8位指数E（偏移127）+ 23位尾数M。值=(-1)^S × 1.M × 2^(E-127)。指数在高位使正浮点数的 int 比较等价于 float 比较。`,
    tags: ["IEEE754", "位布局"],
  },
  {
    id: "hd-floating-point-2",
    chapter: "hd-floating-point",
    level: 2,
    question: `为什么 0x5f3759df 能近似平方根倒数？`,
    answer: `浮点位模式近似 log2(x) 的线性表示。1/sqrt(x)=2^(-0.5·log2(x))，对位模式做\"除2取负\"（i>>1后用魔法数减）近似1/sqrt(x)的位模式。0x5f3759df是最优偏移量。`,
    tags: ["快速平方根倒数", "魔法数"],
  },
  {
    id: "hd-floating-point-3",
    chapter: "hd-floating-point",
    level: 3,
    question: `快速平方根倒数在现代 CPU 上还有优势吗？`,
    answer: `不一定。现代 CPU 有 rsqrtss 指令（SSE），硬件实现更快。快速平方根倒数的价值在历史意义和教学。现代代码用 rsqrtss 或 1.0f/sqrtf(x)。`,
    tags: ["现代CPU", "rsqrtss"],
  },
  {
    id: "hd-floating-point-4",
    chapter: "hd-floating-point",
    level: 4,
    question: `float 和 int 类型双关的严格别名问题如何解决？`,
    answer: `C 标准中通过不同类型指针访问同一内存是未定义行为。用 memcpy 或 union（C99+）做类型双关可规避。C++ 中 union 也是合法的。`,
    tags: ["类型双关", "严格别名"],
  },
];
