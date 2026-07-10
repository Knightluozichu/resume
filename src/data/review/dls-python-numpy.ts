import { ReviewQuestion } from "./types";

export const dlsPythonNumpyQuestions: ReviewQuestion[] = [
  {
    id: "dls-python-numpy-1",
    chapter: "dls-python-numpy",
    level: 1,
    question: `NumPy 的 ndarray 有哪些核心属性？为什么神经网络代码要用 NumPy 而非 Python 列表？`,
    answer:
      `NumPy ndarray 的核心属性包括：shape（形状，表示各维度大小）、dtype（元素数据类型）、ndim（维度数）、size（元素总数）。神经网络代码使用 NumPy 而非 Python 列表的原因：①向量化运算——NumPy 底层用 C 实现，对整个数组做运算时无需 Python 循环，速度快数十到数百倍。例如对 1000 个元素求平方，Python 列表需要 for 循环，而 NumPy 直接写 \`x ** 2\` 即可。②矩阵运算——神经网络的本质是矩阵乘法（np.dot），NumPy 原生支持高效矩阵操作。③广播机制——不同形状的数组可以自动对齐运算，代码简洁。④内存连续——ndarray 在内存中连续存储，CPU 缓存命中率高。全书所有神经网络代码都基于 NumPy 向量化运算构建。`,
    tags: ["NumPy", "ndarray", "向量化运算"],
  },
  {
    id: "dls-python-numpy-2",
    chapter: "dls-python-numpy",
    level: 2,
    question: `什么是 NumPy 广播（Broadcasting）？广播规则是什么？举例说明。`,
    answer:
      `广播是 NumPy 对不同形状的数组进行算术运算的机制，无需显式复制数据即可将较小数组「扩展」到较大数组的形状。广播规则：①维度从尾部（最右轴）对齐。②如果某维度大小相等或其中一个为 1，则可以广播。③缺失的维度视为 1。④最终形状取各维度最大值。举例：①标量广播——A(3,4) + 5，标量 5 广播为 (3,4)，每个元素加 5。②一维广播——A(3,4) + B(4,)，B 沿第 0 轴（行）复制为 (3,4)。③二维广播——A(3,1) + B(1,4)，A 沿第 1 轴复制为 (3,4)，B 沿第 0 轴复制为 (3,4)，结果 (3,4)。广播在神经网络中用于偏置加法：矩阵 W·x 的形状为 (N, M)，偏置 b 的形状为 (M,)，通过广播 b 自动加到每一行。`,
    tags: ["广播", "Broadcasting", "数组运算"],
  },
  {
    id: "dls-python-numpy-3",
    chapter: "dls-python-numpy",
    level: 2,
    question: `NumPy 中 axis 参数的作用是什么？在神经网络中如何使用？`,
    answer:
      `axis 参数指定聚合运算（如 sum、mean、max）沿哪个轴进行。对于二维数组 A(shape=(3,4))：axis=0 表示沿行方向（第 0 轴）聚合，结果形状为 (4,)，即对每一列求和；axis=1 表示沿列方向（第 1 轴）聚合，结果形状为 (3,)，即对每一行求和。在神经网络中的使用：①计算 batch 的平均损失——对 mini-batch 的 N 个样本损失求平均，用 \`loss = np.sum(batch_loss) / N\` 或 \`loss = np.mean(batch_loss)\`。②softmax 沿类别维度归一化——对每个样本的输出向量沿类别轴做 exp/sum，需要 \`x - x.max(axis=1, keepdims=True)\` 做数值稳定。③BatchNorm 计算均值和方差——沿 batch 轴（axis=0）计算每个特征的统计量。keepdims=True 保持维度以便广播运算。`,
    tags: ["axis", "聚合运算", "神经网络"],
  },
  {
    id: "dls-python-numpy-4",
    chapter: "dls-python-numpy",
    level: 3,
    question: `在神经网络实现中，如何用 NumPy 高效实现矩阵乘法和广播偏置？写出关键代码并解释。`,
    answer:
      `神经网络前向传播的核心是矩阵乘法加偏置。对于输入 X(shape=(N, D))，权重 W(shape=(D, H))，偏置 b(shape=(H,))，前向传播代码：\`A = np.dot(X, W) + b\`。解释：①np.dot(X, W) 计算矩阵乘法，结果形状为 (N, H)，每行是一个样本的隐藏层输出。②加偏置 b 时利用广播机制：b 的形状 (H,) 自动广播为 (N, H)，即 b 加到每个样本的对应位置。③这种写法无需 for 循环遍历 batch 中的每个样本，一次性处理整个 mini-batch，效率极高。如果用 Python 列表实现同样操作，需要嵌套 for 循环，速度慢数百倍。反向传播时梯度计算同样利用矩阵运算：\`dW = np.dot(X.T, dA)\`、\`dX = np.dot(dA, W.T)\`、\`db = np.sum(dA, axis=0)\`。全书的神经网络实现都是基于这种 NumPy 矩阵运算模式构建的。`,
    tags: ["矩阵乘法", "np.dot", "广播偏置", "前向传播"],
  },
];
