import { ReviewQuestion } from "./types";

export const dltProbabilityInfoQuestions: ReviewQuestion[] = [
  {
    id: "dlt-probability-info-1",
    chapter: "dlt-probability-info",
    level: 2,
    question: `贝叶斯定理的各部分在机器学习中分别对应什么？MLE 和 MAP 的关系是什么？`,
    answer:
      `贝叶斯定理 P(theta|x) = P(x|theta)P(theta) / P(x) 中：P(theta) 是先验（对参数的初始信念），P(x|theta) 是似然（数据在参数下的概率），P(theta|x) 是后验（观测数据后对参数的信念），P(x) 是证据（归一化常数）。MLE（最大似然估计）忽略先验，找使似然最大的参数——等价于均匀先验。MAP（最大后验估计）加入先验，找使后验正比于似然×先验最大的参数。关系：MAP = MLE + 先验。L2 正则化等价于高斯先验的 MAP，L1 正则化等价于拉普拉斯先验的 MAP。MLE 无先验可能过拟合，MAP 通过先验约束缓解过拟合。`,
    tags: ["贝叶斯定理", "MLE", "MAP", "先验"],
  },
  {
    id: "dlt-probability-info-2",
    chapter: "dlt-probability-info",
    level: 2,
    question: `信息熵、交叉熵和 KL 散度之间的关系是什么？为什么分类问题用交叉熵损失？`,
    answer:
      `关系：交叉熵 = 熵 + KL 散度，即 H(P,Q) = H(P) + D_KL(P||Q)。①信息熵 H(P) = -sum P(x) log P(x) 衡量分布本身的不确定性。②交叉熵 H(P,Q) = -sum P(x) log Q(x) 衡量用 Q 编码来自 P 的数据所需的信息量。③KL 散度 D_KL(P||Q) = H(P,Q) - H(P) 衡量 Q 偏离 P 的额外信息量。分类问题用交叉熵的原因：P 是 one-hot 标签分布（H(P)=0），所以交叉熵 = KL 散度 = -log Q(correct)。最小化交叉熵 = 最小化 KL 散度 = 让模型分布 Q 逼近真实分布 P。相比 MSE，交叉熵梯度不受 sigmoid 饱和影响，训练更高效。`,
    tags: ["信息熵", "交叉熵", "KL散度", "分类损失"],
  },
  {
    id: "dlt-probability-info-3",
    chapter: "dlt-probability-info",
    level: 3,
    question: `KL 散度有哪些性质？它为什么不是真正的距离度量？`,
    answer:
      `KL 散度 D_KL(P||Q) = sum P(x) log(P(x)/Q(x)) 的性质：①非负性——D_KL >= 0，当且仅当 P=Q 时为 0。②非对称性——D_KL(P||Q) != D_KL(Q||P)。③不满足三角不等式。④支撑集要求——前向 KL 要求 Q 在 P 非零处非零，反向 KL 要求 P 在 Q 非零处非零。不是真正距离度量的原因：距离度量必须满足对称性和三角不等式，KL 散度都不满足。前向 KL（P||Q）是「zero-avoiding」（Q 试图覆盖 P 的所有支撑），反向 KL（Q||P）是「zero-forcing」（Q 集中在 P 的支撑内）。VAE 最小化反向 KL，GAN 隐式最小化前向 KL，这是两者生成特性不同的原因之一。`,
    tags: ["KL散度", "非对称性", "距离度量", "VAE与GAN"],
  },
  {
    id: "dlt-probability-info-4",
    chapter: "dlt-probability-info",
    level: 4,
    question: `如何用概率视角统一理解最大似然估计、交叉熵损失和 KL 散度？`,
    answer:
      `三者是等价的：最大似然估计 = 最小化负对数似然 = 最小化经验分布与模型分布的 KL 散度 = 最小化交叉熵。推导：①MLE 目标是最大化 sum log P_model(x_i; theta)，等价于最小化 -sum log P_model = N * E_hat[-log P_model]。②交叉熵 H(P_hat, P_model) = E_hat[-log P_model]，与负对数似然一致。③KL 散度 D_KL(P_hat||P_model) = H(P_hat, P_model) - H(P_hat) = 交叉熵 - 经验熵。数据集固定时 H(P_hat) 是常数，故最小化交叉熵 = 最小化 KL 散度。统一视角：分类的交叉熵损失、回归的 MSE（高斯似然负对数）、VAE 的 ELBO 本质都是最大似然。正则化（L1/L2）对应 MAP 估计——在最大似然基础上加入先验。`,
    tags: ["MLE", "交叉熵", "KL散度", "统一视角", "最大似然"],
  },
];
