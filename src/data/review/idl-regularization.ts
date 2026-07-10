import { ReviewQuestion } from "./types";

export const idlRegularizationQuestions: ReviewQuestion[] = [
  {
    id: "idl-regularization-1",
    chapter: "idl-regularization",
    level: 1,
    question: `什么是过拟合？如何判断模型是否过拟合？有哪些常见正则化方法？`,
    answer:
      `过拟合是模型在训练集上表现很好，但在验证集/测试集上表现差的现象——模型「记住」了训练数据的细节和噪声，而非学到了通用规律。判断方法：监控训练损失和验证损失——如果训练损失持续下降但验证损失开始上升，说明过拟合开始发生；如果训练准确率远高于验证准确率（如 99% vs 80%），也是过拟合的信号。常见正则化方法：①L2 正则化（权重衰减）——在损失函数中加入 lambda*||W||^2 惩罚项，限制权重过大，使模型更平滑。②Dropout——训练时随机将一部分神经元的输出置为 0（丢弃率通常 0.2-0.5），迫使网络不依赖任何单个神经元，增强鲁棒性。推理时不丢弃，但输出乘以 (1-p) 补偿。③Batch Normalization——对每层输入做标准化（均值 0、方差 1），不仅加速训练，还有正则化效果（批统计量引入噪声）。④Early Stopping——监控验证集损失，当其连续若干轮不下降时停止训练，防止过训练。⑤数据增强——通过翻转、裁剪、旋转等变换扩充训练数据，等效于增加数据量。⑥L1 正则化——加入 lambda*||W|| 惩罚项，可产生稀疏权重（部分权重为 0），有特征选择效果。`,
    tags: ["过拟合", "正则化", "L2", "Dropout", "BatchNorm", "Early Stopping"],
  },
  {
    id: "idl-regularization-2",
    chapter: "idl-regularization",
    level: 2,
    question: `Dropout 的工作原理是什么？训练和推理时有什么区别？为什么能防止过拟合？`,
    answer:
      `Dropout 的工作原理：训练时，在每个 mini-batch 的前向传播中，以概率 p（丢弃率）随机将部分神经元的输出置为 0，被丢弃的神经元在该次前向传播中不参与计算。反向传播时也不更新被丢弃神经元的权重。训练和推理的区别：①训练时——以概率 p 随机丢弃神经元，每次前向传播使用不同的子网络，相当于训练了指数级多个子网络的集成。②推理时——不丢弃任何神经元，使用完整网络。但需要将权重乘以 (1-p) 进行缩放（或训练时做 inverted dropout 将保留的神经元输出乘以 1/(1-p)），保证训练和推理时每一层的期望输出一致。为什么能防止过拟合：①打破共适应——没有 Dropout 时，神经元之间可能形成固定的协作关系（共适应），Dropout 迫使每个神经元独立工作，不能依赖特定其他神经元的存在，增强鲁棒性。②模型集成效应——每次 Dropout 采样不同的子网络，相当于训练了大量不同结构的子网络，推理时用完整网络相当于这些子网络的近似集成，集成通常能降低过拟合。③稀疏激活——Dropout 使网络不会过度依赖少数几个「明星神经元」，更均匀地利用所有神经元。Dropout 通常用在全连接层，卷积层一般不用（因为卷积层参数已很少，且特征图相邻像素相关，Dropout 效果不佳）。`,
    tags: ["Dropout", "共适应", "模型集成", "训练推理差异", "正则化"],
  },
  {
    id: "idl-regularization-3",
    chapter: "idl-regularization",
    level: 2,
    question: `SGD、Momentum、RMSprop、Adam 四种优化器的原理和特点分别是什么？`,
    answer:
      `四种优化器：①SGD（随机梯度下降）——最基础的优化器，W = W - lr * dW。每次用 mini-batch 的梯度更新参数。优点是简单稳定，缺点是学习率固定、容易在鞍点附近震荡、对不同参数维度用相同学习率。②Momentum——引入动量（惯性），v = beta * v + dW，W = W - lr * v（beta 通常 0.9）。动量累积了历史梯度方向，在一致方向上加速，在震荡方向上抵消，比 SGD 收敛更快更稳。③RMSprop——自适应学习率，维护梯度平方的移动平均 s = beta * s + (1-beta) * dW^2，更新时 W = W - lr * dW / (sqrt(s) + epsilon)。对梯度大的参数减小学习率，梯度小的参数增大学习率，适合非平稳目标（如 RNN）。④Adam——结合 Momentum 和 RMSprop，同时维护梯度的一阶矩估计 m（动量）和二阶矩估计 v（自适应学习率）。m = beta1*m + (1-beta1)*dW，v = beta2*v + (1-beta2)*dW^2，做偏差校正后 W = W - lr * m / (sqrt(v) + epsilon)。Adam 兼具动量的加速和自适应学习率的稳定性，是最常用的默认优化器，通常不需要精细调参就有好效果。实践建议：先用 Adam 快速实验，如果需要极致性能再尝试 SGD+Momentum 配合学习率调度。`,
    tags: ["SGD", "Momentum", "RMSprop", "Adam", "优化器", "自适应学习率"],
  },
  {
    id: "idl-regularization-4",
    chapter: "idl-regularization",
    level: 3,
    question: `Batch Normalization 的工作原理是什么？它有哪些作用？训练和推理时有什么区别？`,
    answer:
      `Batch Normalization 的工作原理：在每个 mini-batch 内，对每一层的输入（或激活值）做标准化——计算 batch 内的均值 mu 和方差 sigma^2，然后 z_norm = (z - mu) / sqrt(sigma^2 + epsilon)，最后通过可学习的缩放和平移参数恢复表达能力：z_out = gamma * z_norm + beta。BatchNorm 的作用：①加速训练——标准化后激活值分布在合理范围（非饱和区），梯度能有效传播，允许使用更大的学习率。②降低对初始化的敏感性——即使权重初始化不好，BatchNorm 也能将激活值拉回合理范围。③正则化效果——batch 内的统计量（均值、方差）引入了噪声，有类似 Dropout 的正则化作用。④缓解内部协变量偏移——深层网络中，每层输入的分布会随前层参数更新而变化，BatchNorm 稳定了每层输入的分布。训练和推理的区别：①训练时——使用当前 mini-batch 的均值和方差做标准化。②推理时——使用训练过程中累积的移动平均均值和方差（而非当前 batch 的统计量），因为推理时可能只有单个样本，无法计算 batch 统计量。这也是 BatchNorm 在 batch size 很小时（如 batch=1）效果不好的原因——统计量不稳定。后续出现的 Layer Norm（对单个样本的所有维度做标准化）不依赖 batch size，在 Transformer 中广泛使用。`,
    tags: ["BatchNorm", "标准化", "训练推理差异", "加速训练", "内部协变量偏移", "Layer Norm"],
  },
];
