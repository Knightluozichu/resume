import { ReviewQuestion } from "../types";

export const slmLogisticRegressionQuestions: ReviewQuestion[] = [
  {
    id: "slm-logistic-regression-1",
    chapter: "slm-logistic-regression",
    level: 1,
    question: "什么是逻辑斯谛回归模型？它的模型形式是什么？",
    answer:
      "逻辑斯谛回归是一种分类模型，通过逻辑斯谛函数（sigmoid 函数）将线性模型的输出映射到 (0,1) 区间，表示为正类的概率。二分类逻辑斯谛回归模型：P(Y=1|x) = exp(w·x+b) / (1+exp(w·x+b))，P(Y=0|x) = 1 / (1+exp(w·x+b))。等价地，对数几率（log odds）log(P/(1-P)) = w·x+b 是 x 的线性函数。这意味着逻辑斯谛回归模型假设对数几率是特征 x 的线性组合。逻辑斯谛函数 σ(z) = 1/(1+exp(-z)) 的性质：①输出值在 (0,1) 之间，可解释为概率；②单调递增；③在 z=0 处值为 0.5。多项逻辑斯谛回归（softmax 回归）用于多分类：P(Y=yk|x) = exp(wk·x) / Σ exp(wj·x)。逻辑斯谛回归是判别式模型，直接建模 P(Y|X) 而非联合分布 P(X,Y)。它是最广为使用的分类模型之一，也是神经网络中 softmax 层的基础。",
    tags: ["逻辑斯谛回归", "sigmoid函数", "对数几率", "softmax"],
  },
  {
    id: "slm-logistic-regression-2",
    chapter: "slm-logistic-regression",
    level: 2,
    question: "逻辑斯谛回归的参数如何估计？",
    answer:
      "逻辑斯谛回归的参数通过极大似然估计来估计。给定训练集 T = {(x1,y1),...,(xN,yN)}，似然函数为 L(w) = Π [P(yi=1|xi)]^yi [P(yi=0|xi)]^(1-yi) = Π [π(xi)]^yi [1-π(xi)]^(1-yi)，其中 π(xi) = P(Y=1|xi)。对数似然函数为 l(w) = Σ [yi log π(xi) + (1-yi) log(1-π(xi))] = Σ [yi(w·xi) - log(1+exp(w·xi))]。极大似然估计就是求使 l(w) 最大的 w。由于 l(w) 是 w 的凹函数（concave），极大似然估计是一个无约束的凸优化问题，可以用梯度下降法或牛顿法求解。梯度：∂l/∂w = Σ (yi - π(xi)) xi。梯度下降更新：w ← w + η Σ (yi - π(xi)) xi。牛顿法利用二阶导数（Hessian 矩阵），收敛更快但计算量大。逻辑斯谛回归的凸优化性质保证了解的全局最优性，这与神经网络等非凸优化问题不同。",
    tags: ["极大似然估计", "对数似然", "梯度下降", "凸优化"],
  },
  {
    id: "slm-logistic-regression-3",
    chapter: "slm-logistic-regression",
    level: 2,
    question: "什么是最大熵原理？最大熵模型的形式是什么？",
    answer:
      "最大熵原理是概率模型学习的一个准则。其基本思想是：在所有满足约束条件的概率模型中，熵最大的模型是最好的。直觉是：在满足已知约束（从训练数据中得到的经验分布特征）的前提下，对未知部分不做任何额外假设，保持最大的不确定性（即最大熵）。最大熵模型的形式：Pw(y|x) = (1/Zw(x)) exp(Σ wi fi(x,y))，其中 fi(x,y) 是特征函数（二值函数，表示某种 (x,y) 组合是否出现），wi 是特征函数的权重，Zw(x) = Σ_y exp(Σ wi fi(x,y)) 是归一化因子。约束条件：特征函数关于模型分布的期望等于关于经验分布的期望，即 Σ P̃(x) P(y|x) fi(x,y) = Σ P̃(x,y) fi(x,y)。最大熵模型的学习等价于在约束条件下最大化对数似然函数，是一个约束优化问题，可以通过拉格朗日乘子法求解。最大熵模型是指数族分布的一种，具有优雅的数学性质。",
    tags: ["最大熵原理", "特征函数", "约束优化", "指数族分布"],
  },
  {
    id: "slm-logistic-regression-4",
    chapter: "slm-logistic-regression",
    level: 3,
    question: "逻辑斯谛回归与最大熵模型的关系是什么？最大熵模型的学习算法有哪些？",
    answer:
      "逻辑斯谛回归与最大熵模型的关系：二分类逻辑斯谛回归是最大熵模型的特例。当最大熵模型中特征函数取特定形式时（y=+1 时 f(x,y)=x，y=-1 时 f(x,y)=0），最大熵模型的解与逻辑斯谛回归形式完全一致。多项逻辑斯谛回归（softmax 回归）也可以看作多类最大熵模型的特例。两者的对数线性形式（log P(y|x) ∝ Σ wi fi(x,y)）是统一的。因此逻辑斯谛回归和最大熵模型在数学上是等价的，只是出发点不同——逻辑斯谛回归从对数几率的线性模型出发，最大熵从最大熵原理出发。最大熵模型的学习算法：①改进的迭代尺度法（IIS, Improved Iterative Scaling）——固定其他参数，逐个优化单个参数 wi。每次迭代中，对每个 wi 求解方程使其增量满足约束。优点是每次只需解一维优化问题，缺点是收敛较慢。②梯度下降法——同时对所有参数沿负梯度方向更新。③拟牛顿法（如 L-BFGS）——利用二阶信息（近似 Hessian 矩阵）加速收敛，是目前实践中最常用的方法。④牛顿法——精确计算 Hessian 矩阵，收敛最快但计算和存储开销大。",
    tags: ["逻辑斯谛回归与最大熵", "等价性", "IIS", "学习算法"],
  },
];
