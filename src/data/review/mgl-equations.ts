import type { ReviewQuestion } from "./types";

/** 方程 复习题 */
export const mglEquationsQuestions: ReviewQuestion[] = [
  {
    id: "mgl-equations-1",
    chapter: "mgl-equations",
    level: 1,
    question: `韦达定理：x²-5x+6=0 的两根之和与积分别是？`,
    answer: `和=5，积=6。韦达定理：x₁+x₂=-b/a=5/1=5，x₁·x₂=c/a=6/1=6。两根为 2 和 3，验证 2+3=5, 2×3=6。`,
    tags: ["韦达定理", "二次方程"],
  },
  {
    id: "mgl-equations-2",
    chapter: "mgl-equations",
    level: 2,
    question: `判别式 Δ=b²-4ac<0 时，二次方程的根是？`,
    answer: `两个共轭复根。Δ<0 时抛物线不与 x 轴相交，方程有两个共轭复根 x=(-b±i√|Δ|)/2a。`,
    tags: ["判别式", "复根"],
  },
  {
    id: "mgl-equations-3",
    chapter: "mgl-equations",
    level: 3,
    question: `阿贝尔-鲁菲尼定理说明了什么？`,
    answer: `五次及以上方程无通用根式求根公式。阿贝尔-鲁菲尼定理证明五次及以上一般多项式方程不存在通用的根式求根公式，催生了群论。`,
    tags: ["阿贝尔-鲁菲尼", "群论"],
  },
  {
    id: "mgl-equations-4",
    chapter: "mgl-equations",
    level: 4,
    question: `牛顿迭代法求方程近似解的公式是？`,
    answer: `x_{n+1} = x_n - f(x_n)/f'(x_n)。牛顿迭代：x_{n+1}=x_n-f(x_n)/f'(x_n)，用切线与 x 轴交点逼近根，二阶收敛。`,
    tags: ["牛顿迭代", "数值方法"],
  },
];
