import { ReviewQuestion } from "../types";

export const dltRegularizationQuestions: ReviewQuestion[] = [
  {
    id: "dlt-regularization-1",
    chapter: "dlt-regularization",
    level: 2,
    question: "L1 和 L2 正则化的数学形式和几何直觉是什么？为什么 L1 产生稀疏解？",
    answer:
      "数学形式：L2 加 alpha * sum(w_i^2)，梯度为 alpha*w，更新时 w <- (1-eta*alpha)*w - eta*grad（权重衰减）。L1 加 alpha * sum(|w_i|)，梯度为 alpha*sign(w)，每次将权重向零推进固定步长。几何直觉：L2 约束区域是球体（圆滑），等高线与球面相切，所有权重都变小但不为零。L1 约束区域是菱形（有尖角在坐标轴上），等高线最先与尖角相切使某些维度为零。L1 产生稀疏的原因：①几何上——菱形顶点在坐标轴上，相切点大概率在顶点。②梯度上——L1 梯度恒为 ±alpha（与 w 大小无关），w 接近零时被直接推到零；L2 梯度为 alpha*w，w 接近零时梯度也接近零。L1 适用于特征选择，L2 适用于一般正则化。",
    tags: ["L1正则化", "L2正则化", "稀疏解", "几何直觉"],
  },
  {
    id: "dlt-regularization-2",
    chapter: "dlt-regularization",
    level: 2,
    question: "Dropout 的正则化机制是什么？反向 Dropout 如何实现？",
    answer:
      "Dropout 的正则化机制：①近似集成——每个 mini-batch 随机丢弃不同神经元，等效训练大量不同子网络，测试时近似平均所有子网络预测（类似 Bagging）。②减少共适应——神经元不能依赖特定其他神经元的存在，被迫学习更鲁棒、更独立的特征。③噪声注入——随机置零等效向激活值注入乘性噪声。反向 Dropout 实现：训练时生成随机掩码 mask = (rand > p) / (1-p)，将激活值 h = h * mask（除以 1-p 做缩放补偿，使期望值不变）。测试时无需任何操作——因为训练时已做缩放补偿，测试时直接用全部神经元输出。反向 Dropout 的优点是测试时无额外计算。Dropout 广泛用于全连接层（p=0.5 常见），与 L2、数据增强互补。",
    tags: ["Dropout", "近似集成", "共适应", "反向Dropout"],
  },
  {
    id: "dlt-regularization-3",
    chapter: "dlt-regularization",
    level: 3,
    question: "早停为什么是一种正则化？它与 L2 正则化有什么关系？",
    answer:
      "早停是正则化的原因：训练初期模型学到通用模式（泛化好），后期开始记忆训练集细节（过拟合），在验证误差上升时停止可获最佳泛化。通过限制有效训练时长来控制模型的有效容量——训练轮数越少有效容量越小（类似更简单的模型）。与 L2 正则化的关系：花书证明早停在数学上等价于 L2 正则化。在线性模型中，训练 t 步的早停等价于 L2 系数 alpha = 1/(eta*t) 的权重衰减——训练越久 alpha 越小（正则化越弱），训练越少 alpha 越大（正则化越强）。早停的优点：①无需调正则化系数（通过验证集自动确定停止时机）。②训练一次就能得到不同正则化强度的模型（通过保存不同轮数的检查点）。③计算高效。早停是最简单实用的正则化方法。",
    tags: ["早停", "L2正则化", "有效容量", "验证集"],
  },
  {
    id: "dlt-regularization-4",
    chapter: "dlt-regularization",
    level: 3,
    question: "批归一化（BatchNorm）的作用是什么？它为什么有正则化效果？",
    answer:
      "BatchNorm 对每个 mini-batch 的激活值做归一化（减均值除标准差），再用可学习的 gamma 和 beta 做缩放平移。作用：①稳定训练——归一化使各层激活值分布稳定（均值零、方差一），减少内部协变量偏移，允许更大学习率。②缓解梯度问题——激活值不在饱和区，梯度更稳定。③降低初始化敏感性——归一化后初始权重的尺度影响减小。④正则化效果——mini-batch 的均值 mu_B 和方差 sigma_B^2 是对真实统计量的噪声估计，这种噪声等效向激活值注入随机扰动，有轻微正则化作用（类似 Dropout）。BatchNorm 的限制：要求 batch size 不能太小（否则均值方差估计不准），不适用于在线学习（batch size=1）。LayerNorm 是其变体，对单个样本的各维度归一化，适用于 RNN/Transformer。",
    tags: ["BatchNorm", "归一化", "内部协变量偏移", "正则化效果", "LayerNorm"],
  },
];
