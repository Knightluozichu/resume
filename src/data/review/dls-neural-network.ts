import { ReviewQuestion } from "./types";

export const dlsNeuralNetworkQuestions: ReviewQuestion[] = [
  {
    id: "dls-neural-network-1",
    chapter: "dls-neural-network",
    level: 1,
    question: `神经网络中常用的激活函数有哪些？各有什么特点和适用场景？`,
    answer:
      `常用激活函数：①阶跃函数 step(x)——x>0 输出 1，否则输出 0。最简单但不可导，仅用于感知机。②sigmoid 函数 h(x) = 1/(1+e^(-x))——输出 (0,1) 区间，平滑可导。优点：输出可解释为概率；缺点：输入很大或很小时梯度接近 0（梯度消失），输出不以 0 为中心。适用于二分类输出层。③tanh 函数——输出 (-1,1) 区间，以 0 为中心，但仍有梯度消失问题。④ReLU（Rectified Linear Unit）h(x) = max(0, x)——x>0 时输出 x，x≤0 时输出 0。优点：计算简单（只需比较）、在正区间梯度恒为 1（缓解梯度消失）、产生稀疏激活。缺点：负区间梯度为 0（神经元死亡）。ReLU 是当前深度学习隐藏层的默认选择。全书手写实现中，隐藏层用 ReLU，输出层用 softmax（多分类）或 sigmoid（二分类）。`,
    tags: ["激活函数", "sigmoid", "ReLU", "softmax"],
  },
  {
    id: "dls-neural-network-2",
    chapter: "dls-neural-network",
    level: 2,
    question: `如何用矩阵运算实现三层神经网络的前向传播？请写出关键公式和代码。`,
    answer:
      `三层神经网络（输入层→隐藏层→输出层）的前向传播用矩阵运算实现。设输入 X(shape=(N, D))，第一层权重 W1(shape=(D, H))，偏置 b1(shape=(H,))，第二层权重 W2(shape=(H, O))，偏置 b2(shape=(O,))。公式：①隐藏层：A1 = np.dot(X, W1) + b1；Z1 = sigmoid(A1) 或 relu(A1)。②输出层：A2 = np.dot(Z1, W2) + b2；Z2 = softmax(A2)（分类）或 identity(A2)（回归）。关键点：①偏置加法利用广播——b1 形状 (H,) 自动广播到 (N, H)。②激活函数对矩阵逐元素操作——sigmoid 对 A1 的每个元素独立计算。③整个 mini-batch 一次性处理——N 个样本同时前向传播，无需 for 循环。④权重 W1 的行数等于输入维度，列数等于隐藏层神经元数。这种矩阵化实现是全书神经网络代码的基础模式。`,
    tags: ["前向传播", "矩阵运算", "三层网络"],
  },
  {
    id: "dls-neural-network-3",
    chapter: "dls-neural-network",
    level: 2,
    question: `softmax 函数的作用是什么？实现时为什么要减去最大值？写出代码。`,
    answer:
      `softmax 函数将任意实数向量转换为概率分布：yk = exp(ak) / Σexp(ai)，输出满足所有分量非负且和为 1，适用于多分类输出层。实现时减去最大值的原因：数值稳定性——当 ak 很大时，exp(ak) 可能溢出（如 exp(1000) = inf）。由于 softmax 具有平移不变性（分子分母同除以 exp(max) 后结果不变），减去最大值不影响输出但避免溢出。代码实现：\`def softmax(a): c = np.max(a); exp_a = np.exp(a - c); sum_exp_a = np.sum(exp_a); y = exp_a / sum_exp_a; return y\`。对于批量输入矩阵，需要沿类别轴求最大值：\`c = np.max(a, axis=1, keepdims=True)\`，然后 \`exp_a = np.exp(a - c)\`，\`y = exp_a / np.sum(exp_a, axis=1, keepdims=True)\`。keepdims=True 保持形状以便广播除法。softmax 的导数在反向传播中与交叉熵损失结合时有简洁形式。`,
    tags: ["softmax", "数值稳定性", "概率分布"],
  },
  {
    id: "dls-neural-network-4",
    chapter: "dls-neural-network",
    level: 3,
    question: `神经网络的损失函数（交叉熵误差）如何定义？为什么用交叉熵而非均方误差做分类？`,
    answer:
      `交叉熵误差（Cross Entropy Error）定义：L = -Σ tk·log(yk)，其中 tk 是标签的 one-hot 编码，yk 是 softmax 输出。对于 mini-batch：L = -1/N · Σn Σk tnk·log(ynk)。为什么用交叉熵而非均方误差（MSE）做分类：①梯度形式——交叉熵+softmax 的反向传播梯度为 yk - tk，简洁且与预测误差成正比，学习效率高。MSE+softmax 的梯度含 softmax 导数项，形式复杂且当预测值接近 0 或 1 时梯度趋近 0（学习停滞）。②概率视角——交叉熵衡量两个概率分布的距离，与分类任务的概率输出语义一致。MSE 假设高斯噪声，适用于回归而非分类。③收敛速度——交叉熵的梯度始终与误差成正比，即使预测很自信但错误时梯度仍然大，能快速纠正。代码：\`def cross_entropy_error(y, t): delta = 1e-7; return -np.sum(t * np.log(y + delta)) / batch_size\`，delta 防止 log(0)。`,
    tags: ["交叉熵", "损失函数", "softmax", "分类"],
  },
];
