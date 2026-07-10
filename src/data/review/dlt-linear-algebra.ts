import { ReviewQuestion } from "./types";

export const dltLinearAlgebraQuestions: ReviewQuestion[] = [
  {
    id: "dlt-linear-algebra-1",
    chapter: "dlt-linear-algebra",
    level: 1,
    question: `向量、矩阵和张量的区别是什么？在深度学习中它们分别对应什么？`,
    answer:
      `标量是零维的单个数（如学习率），向量是一维数组（如一层偏置或一个样本特征），矩阵是二维数组（如全连接权重 W 或一批样本组成的数据矩阵 X），张量是任意维数组（如一批彩色图像是 4 维张量 [batch, channels, height, width]）。在深度学习框架中所有数据都表示为张量——全连接层权重是矩阵（2 维张量），卷积核是 4 维张量 [out_channels, in_channels, kernel_h, kernel_w]。矩阵乘法是最核心的运算：前向传播 y = Wx + b，反向传播梯度计算 grad_W = grad_y · x^T，都依赖矩阵乘法的高效实现（GPU 上的 GEMM）。`,
    tags: ["向量", "矩阵", "张量", "数据表示"],
  },
  {
    id: "dlt-linear-algebra-2",
    chapter: "dlt-linear-algebra",
    level: 2,
    question: `L1 范数和 L2 范数在正则化中有何区别？为什么 L1 会产生稀疏解？`,
    answer:
      `L2 正则化加 lambda * ||w||_2^2 = lambda * sum(w_i^2)，L1 正则化加 lambda * ||w||_1 = lambda * sum(|w_i|)。区别：①几何形状——L2 约束区域是球体（圆滑），L1 约束区域是菱形（有尖角）。②稀疏性——L1 产生稀疏解（权重精确为零），L2 产生小但不为零的权重。③优化特性——L2 处处可微，L1 在零点不可微。L1 产生稀疏的原因：L1 的菱形约束区域的顶点在坐标轴上，优化时等高线最先与顶点相切，使某些维度恰好为零。L2 的球体没有顶点，相切位置一般不在坐标轴上。L1 适用于特征选择，L2 适用于一般正则化。`,
    tags: ["L1范数", "L2范数", "正则化", "稀疏性"],
  },
  {
    id: "dlt-linear-algebra-3",
    chapter: "dlt-linear-algebra",
    level: 3,
    question: `什么是奇异值分解（SVD）？它与特征分解有什么区别和联系？`,
    answer:
      `SVD 将任意 m×n 矩阵 A 分解为 A = U Σ V^T，其中 U 是 m×m 正交矩阵（左奇异向量），Σ 是 m×n 对角矩阵（奇异值降序），V 是 n×n 正交矩阵（右奇异向量）。区别：①适用范围——特征分解只适用于方阵且未必存在，SVD 适用于任意矩阵且总是存在。②分解形式——特征分解 A = V Λ V^(-1)，SVD 用两个不同的正交矩阵 U 和 V。联系：对称矩阵的 SVD 和特征分解等价——当 A 是对称半正定矩阵时，U = V = 特征向量矩阵，Σ = 特征值绝对值。SVD 是特征分解的推广，是线性代数最通用的分解工具。`,
    tags: ["SVD", "特征分解", "矩阵分解", "PCA"],
  },
  {
    id: "dlt-linear-algebra-4",
    chapter: "dlt-linear-algebra",
    level: 3,
    question: `SVD 在深度学习中有哪些应用？如何用 SVD 实现低秩近似？`,
    answer:
      `SVD 在深度学习中的应用：①PCA 降维——对数据矩阵做 SVD，保留最大奇异值方向实现降维和去噪。②矩阵伪逆——A^+ = V Σ^+ U^T，用于求解最小二乘。③低秩近似——截断小奇异值用低秩矩阵近似原矩阵实现压缩。④推荐系统——协同过滤中将评分矩阵分解为低秩矩阵乘积。⑤模型压缩——对预训练权重矩阵做 SVD，保留 top-k 奇异值，将大矩阵分解为两个小矩阵乘积减少参数。低秩近似方法：对 A 做 SVD 得 A = U Σ V^T，取前 k 个最大奇异值构造 A_k = U_k Σ_k V_k^T。根据 Eckart-Young 定理，A_k 是秩为 k 的最佳近似（Frobenius 范数下误差最小）。`,
    tags: ["SVD应用", "低秩近似", "模型压缩", "PCA"],
  },
];
