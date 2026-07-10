import { ReviewQuestion } from "./types";

export const idlBackpropagationQuestions: ReviewQuestion[] = [
  {
    id: "idl-backpropagation-1",
    chapter: "idl-backpropagation",
    level: 1,
    question: `什么是反向传播？请描述完整的前向传播-反向传播训练循环。`,
    answer:
      `反向传播是训练神经网络的核心算法，用链式法则从输出层向输入层逐层计算损失函数对每个参数的梯度。完整训练循环包含四个步骤：①前向传播——输入数据从输入层经过隐藏层到输出层，计算各层激活值和最终预测。隐藏层：z1 = W1*x + b1，a1 = ReLU(z1)；输出层：z2 = W2*a1 + b2，a2 = softmax(z2)。②计算损失——用预测值 a2 和真实标签 y 计算损失函数（如交叉熵 L = -sum(y * log(a2))）。③反向传播——用链式法则从输出层向输入层逐层计算梯度。输出层：dL/dz2 = a2 - y，dL/dW2 = dL/dz2 * a1^T；隐藏层：dL/da1 = W2^T * dL/dz2，dL/dz1 = dL/da1 * ReLU'(z1)，dL/dW1 = dL/dz1 * x^T。④参数更新——用梯度下降更新所有参数：W = W - lr * dL/dW，b = b - lr * dL/db。重复 1-4 直到损失收敛。`,
    tags: ["反向传播", "训练循环", "前向传播", "梯度下降"],
  },
  {
    id: "idl-backpropagation-2",
    chapter: "idl-backpropagation",
    level: 2,
    question: `链式法则在反向传播中如何应用？请以两层网络为例推导梯度计算过程。`,
    answer:
      `链式法则：如果 y = f(g(x))，则 dy/dx = f'(g(x)) * g'(x)。在神经网络中，损失 L 是多层复合函数，梯度需要逐层展开。以两层网络为例，前向计算为 z1 = W1*x + b1 → a1 = ReLU(z1) → z2 = W2*a1 + b2 → a2 = softmax(z2) → L = CE(a2, y)。反向推导：①输出层梯度——dL/dz2 = a2 - y（交叉熵 + softmax 的简化形式，这是最优美的一步，避免了单独求 softmax 和交叉熵的复杂导数）。②输出层参数梯度——dL/dW2 = dL/dz2 * a1^T（外积），dL/db2 = dL/dz2。③隐藏层梯度（链式法则反向传播）——dL/da1 = W2^T * dL/dz2（梯度从输出层传到隐藏层，乘以权重矩阵的转置），dL/dz1 = dL/da1 ⊙ ReLU'(z1)（逐元素乘以激活函数的导数，ReLU'(z) = 1 if z>0 else 0）。④隐藏层参数梯度——dL/dW1 = dL/dz1 * x^T，dL/db1 = dL/dz1。可以看到每一层的梯度都依赖于后一层的梯度，因此必须从后向前计算，这也是「反向传播」名称的由来。`,
    tags: ["链式法则", "梯度计算", "反向传播", "导数"],
  },
  {
    id: "idl-backpropagation-3",
    chapter: "idl-backpropagation",
    level: 2,
    question: `什么是梯度消失和梯度爆炸？各自的成因和解决方案是什么？`,
    answer:
      `梯度消失和梯度爆炸是深层网络训练中的核心问题，根源在于反向传播时梯度经过多层的连乘。梯度消失：当激活函数导数 < 1 时（如 Sigmoid 最大导数 0.25），多层连乘后梯度以指数级衰减趋近于 0，浅层权重几乎不更新，网络无法学习有效特征。梯度爆炸：当权重值较大时，多层连乘后梯度以指数级增长趋向无穷，参数震荡发散，损失变为 NaN。解决方案：①使用 ReLU 激活函数——正区间导数恒为 1，梯度不衰减，是缓解梯度消失最有效的方法；②批归一化（BatchNorm）——对每层输入做标准化，使激活值落在非饱和区；③残差连接（ResNet）——引入跳跃连接 y = F(x) + x，梯度可直接通过跳跃连接传到浅层，不经过导数连乘，使上百层网络可训练；④梯度裁剪——对梯度做范数裁剪，防止梯度爆炸；⑤合适的权重初始化——Xavier 初始化（Sigmoid/Tanh）或 He 初始化（ReLU），使各层梯度的方差保持在合理范围；⑥LSTM/GRU——对 RNN 的梯度消失问题，通过门控机制控制信息流。`,
    tags: ["梯度消失", "梯度爆炸", "ReLU", "BatchNorm", "残差连接"],
  },
  {
    id: "idl-backpropagation-4",
    chapter: "idl-backpropagation",
    level: 3,
    question: `为什么交叉熵损失配合 Softmax 输出层能简化梯度计算？这对训练有什么实际意义？`,
    answer:
      `交叉熵损失 L = -sum(y_i * log(a_i)) 配合 Softmax 输出 a = softmax(z)，其梯度有优美的简化形式 dL/dz = a - y（预测值减真实标签）。推导过程：①先求 dL/da_i = -y_i / a_i（交叉熵对 a 求导）。②再求 softmax 的雅可比矩阵 da_i/dz_j = a_i * (delta_ij - a_j)。③用链式法则组合：dL/dz_j = sum_i (dL/da_i * da_i/dz_j) = sum_i (-y_i/a_i * a_i * (delta_ij - a_j)) = -y_j + a_j * sum_i(y_i) = a_j - y_j（因为 sum(y_i) = 1，one-hot 编码）。简化结果 dL/dz = a - y 的实际意义：①计算高效——无需计算 softmax 的完整雅可比矩阵，直接用预测值减标签，大幅减少计算量。②梯度稳定——当预测完全正确时 a = y，梯度为 0，参数不更新；当预测错误时梯度较大，参数快速调整。这种自适应的梯度大小使训练更高效。③避免学习速度饱和——如果用均方误差 + Sigmoid，梯度中会多一个 sigmoid'(z) 项，当预测饱和时该项趋近 0 导致学习停滞；交叉熵 + Softmax 消除了这一项，学习速度不受饱和影响。这是分类任务几乎统一使用交叉熵损失的根本原因。`,
    tags: ["交叉熵", "Softmax", "梯度简化", "损失函数"],
  },
];
