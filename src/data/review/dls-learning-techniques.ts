import { ReviewQuestion } from "../types";

export const dlsLearningTechniquesQuestions: ReviewQuestion[] = [
  {
    id: "dls-learning-techniques-1",
    chapter: "dls-learning-techniques",
    level: 1,
    question: "SGD、Momentum、AdaGrad、Adam 四种优化器各自的原理和特点是什么？",
    answer:
      "四种优化器原理：①SGD（随机梯度下降）——最基本形式 W ← W - η·∂L/∂W，沿梯度反方向更新。缺点：在椭圆状损失函数（各方向梯度差异大）上走「之」字形路径，收敛慢。②Momentum——引入动量 v = αv - η·∂L/∂W，W ← W + v，α 通常 0.9。模拟物理动量，累积历史梯度方向，在一致方向加速，在振荡方向抑制，缓解「之」字形问题。③AdaGrad——为每个参数自适应调整学习率：h += ∂L/∂W ⊙ ∂L/∂W，W ← W - η/√h · ∂L/∂W。频繁更新的参数学习率减小，少更新的参数学习率保持大。缺点：学习率单调递减，后期可能过小而停滞。④Adam——融合 Momentum 和 AdaGrad：结合一阶矩估计（动量）和二阶矩估计（自适应学习率），并进行偏差修正。兼具 Momentum 的加速和 AdaGrad 的自适应，是当前最常用的优化器。全书推荐 Adam 作为默认选择。",
    tags: ["SGD", "Momentum", "AdaGrad", "Adam", "优化器"],
  },
  {
    id: "dls-learning-techniques-2",
    chapter: "dls-learning-techniques",
    level: 2,
    question: "为什么神经网络权重不能全部初始化为 0？Xavier 初始化和 He 初始化的区别是什么？",
    answer:
      "权重不能全部初始化为 0 的原因：对称性问题——如果所有权重相同，则在反向传播时所有神经元的梯度也相同，导致所有神经元学到完全相同的特征，等效于只有一个神经元，浪费了多层结构的表达能力。这称为「权重对称性」问题，必须通过随机初始化打破。Xavier 初始化（Glorot 初始化）：权重从标准差为 √(1/n) 的高斯分布采样，n 为前一层节点数。适用于 sigmoid/tanh 等激活函数，使各层激活值方差保持一致，避免梯度消失或爆炸。He 初始化：权重从标准差为 √(2/n) 的高斯分布采样，是 Xavier 的两倍。专门为 ReLU 设计——ReLU 会将一半输入置零，方差减半，因此需要更大的初始权重补偿，使 ReLU 后的激活值方差保持稳定。总结：激活函数用 sigmoid/tanh → Xavier；激活函数用 ReLU → He。初始权重的选择直接影响训练能否启动和收敛速度。",
    tags: ["权重初始化", "Xavier", "He初始化", "对称性问题"],
  },
  {
    id: "dls-learning-techniques-3",
    chapter: "dls-learning-techniques",
    level: 2,
    question: "Batch Normalization 的原理和作用是什么？它解决了什么问题？",
    answer:
      "Batch Normalization（BN）的原理：对每个 mini-batch 的每层输入进行标准化——先计算 batch 内的均值 μ 和方差 σ²，将输入归一化为均值 0、方差 1，然后用可学习参数 γ（缩放）和 β（偏移）恢复表达能力：y = γ · (x - μ)/√(σ²+ε) + β。BN 的作用：①加速学习——标准化使损失函数更平滑，允许使用更大学习率，收敛更快。②降低对初始化的依赖——即使权重初始化不理想，BN 也能将激活值拉回合理范围。③抑制过拟合——batch 内的统计量引入了轻微噪声，起到正则化效果（类似 Dropout）。④缓解梯度消失/爆炸——标准化使各层激活值分布稳定，梯度在反向传播中不会消失或爆炸。BN 解决的核心问题：深层网络中各层的激活值分布随训练不断变化（内部协变量偏移），使训练困难。BN 通过强制每层输入分布稳定来解决这一问题。BN 层通常插入在全连接/卷积层之后、激活函数之前。",
    tags: ["BatchNorm", "标准化", "内部协变量偏移", "加速学习"],
  },
  {
    id: "dls-learning-techniques-4",
    chapter: "dls-learning-techniques",
    level: 3,
    question: "过拟合的原因是什么？Dropout 和权重衰减（L2 正则化）分别如何抑制过拟合？",
    answer:
      "过拟合的原因：模型复杂度相对于数据量过高——参数过多、网络太深、训练数据不足时，模型会记忆训练集的噪声和细节，导致训练精度高但测试精度低（泛化差）。判断方法：训练精度持续上升但验证精度停止上升或下降。权重衰减（L2 正则化）抑制过拟合的原理：在损失函数中加入权重惩罚项 L = L_original + ½λ·||W||²，λ 是正则化系数。梯度更新变为 ∂L/∂W = ∂L_original/∂W + λW，每次更新时权重被「拉向 0」，抑制过大的权重值。直觉：大权重意味着模型对个别特征过度敏感（过拟合），L2 衰减鼓励权重均匀分布。Dropout 抑制过拟合的原理：训练时每次随机「丢弃」一部分神经元（以概率 p 置零，通常 p=0.5），测试时全部使用但输出乘以 (1-p)。效果：①每次训练使用不同的子网络，相当于集成多个模型。②防止神经元过度依赖特定其他神经元（co-adaptation），迫使每个神经元学到更鲁棒的特征。两者互补：L2 从权重大小角度限制复杂度，Dropout 从结构角度限制复杂度，常组合使用。",
    tags: ["过拟合", "Dropout", "权重衰减", "L2正则化"],
  },
];
