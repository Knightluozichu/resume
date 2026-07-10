import type { ReviewQuestion } from "./types";

/** 算术技巧：无分支与位运算加减 复习题 */
export const hdArithmeticTricksQuestions: ReviewQuestion[] = [
  {
    id: "hd-arithmetic-tricks-1",
    chapter: "hd-arithmetic-tricks",
    level: 1,
    question: `无分支代码为什么在某些场景更快？`,
    answer: `现代 CPU 有 10-20 级流水线，分支预测失败需冲刷流水线代价 10-20 周期。无分支代码虽多几条指令但无预测失败风险。分支不可预测时无分支快 2-3 倍。`,
    tags: ["无分支", "流水线"],
  },
  {
    id: "hd-arithmetic-tricks-2",
    chapter: "hd-arithmetic-tricks",
    level: 2,
    question: `用位运算求绝对值的原理？`,
    answer: `mask=x>>31（算术右移）。负数 mask=0xFFFFFFFF，正数 mask=0。abs=(x^mask)-mask。负数：(~x)-(-1)=~x+1=-x。正数：x^0-0=x。利用补码和算术右移性质。`,
    tags: ["绝对值", "无分支"],
  },
  {
    id: "hd-arithmetic-tricks-3",
    chapter: "hd-arithmetic-tricks",
    level: 3,
    question: `位运算加法的原理？`,
    answer: `a^b 是无进位和，(a&b)<<1 是进位。递归 a^b + (a&b)<<1 直到进位为0。在无硬件加法器的场景（FPGA、教学）有意义，实际 CPU 有硬件加法器不需此法。`,
    tags: ["位运算加法"],
  },
  {
    id: "hd-arithmetic-tricks-4",
    chapter: "hd-arithmetic-tricks",
    level: 4,
    question: `什么时候不该用无分支代码？`,
    answer: `分支可预测时直接用 if 更快（无分支多了几条指令）。可读性要求高的代码不用位运算。现代编译器可能自动生成无分支代码，手写可能干扰优化。先测量再决定。`,
    tags: ["权衡", "可读性"],
  },
];
