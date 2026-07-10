import type { ReviewQuestion } from "./types";

export const gep1MathLibraryQuestions: ReviewQuestion[] = [
  {
    id: "gep1-math-library-1",
    chapter: "gep1-math-library",
    level: 1,
    question: `向量、矩阵、四元数在引擎中分别表示什么？`,
    answer: `向量表示方向与位置（点乘算夹角与投影、叉乘算垂直方向）。矩阵表示线性变换（平移/旋转/缩放/投影，4×4 齐次矩阵可通过乘法复合多个变换）。四元数 $(w, x, y, z)$ 专门表示旋转——4 个分量、球面插值 slerp 平滑、无万向锁。`,
    tags: ["向量", "矩阵", "四元数"],
  },
  {
    id: "gep1-math-library-2",
    chapter: "gep1-math-library",
    level: 2,
    question: `为什么用四元数而不是欧拉角表示旋转？`,
    answer: `三个原因：① 无万向锁——欧拉角按固定轴序旋转，当两轴重合时丢失一个自由度；② 插值平滑——四元数 slerp 在球面上等角插值，欧拉角线性插值会导致转速不均匀；③ 复合高效——两个四元数相乘约 16 次乘法，两个旋转矩阵相乘 64 次。欧拉角只在需要人类可读角度（编辑器面板）时用，内部计算一律四元数。`,
    tags: ["四元数", "欧拉角", "万向锁"],
  },
  {
    id: "gep1-math-library-3",
    chapter: "gep1-math-library",
    level: 3,
    question: `数学类型为什么不能有虚函数？`,
    answer: `虚函数会让对象多一个 vptr 指针（8 字节），破坏 16 字节对齐。SIMD 的 \`__m128\` 加载要求 16 字节对齐，不对齐会触发对齐错误或性能惩罚。此外数学类型是值语义、高频拷贝的，虚函数的动态分发开销和缓存不友好都会拖慢性能。正确做法是用普通函数或模板泛型，把多态需求留给上层的游戏对象系统。`,
    tags: ["虚函数", "SIMD", "对齐"],
  },
  {
    id: "gep1-math-library-4",
    chapter: "gep1-math-library",
    level: 4,
    question: `四元数忘记归一化会有什么后果？如何从底层原理分析？`,
    answer: `数值误差累积会让 $|q| \\neq 1$。单位四元数才表示纯旋转——当 $|q| \\neq 1$ 时，\`toMatrix(q)\` 产生的矩阵不再正交，旋转中混入了缩放，物体会变形。原理：四元数转矩阵的公式假设 $|q|=1$，非单位四元数的分量平方和不等于 1，导致矩阵的基向量长度偏离 1。此外复合旋转（四元数相乘）会让非单位性进一步放大。修法：每次复合后或每帧做 \`q = normalize(q)\`。`,
    tags: ["综合", "归一化", "四元数"],
  },
];
