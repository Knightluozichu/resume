import { ReviewQuestion } from "./types";

export const dlsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dls-final-review-1",
    chapter: "dls-final-review",
    level: 2,
    question: `总结从感知机到深度学习的完整技术演进路线，每一阶段的关键突破是什么？`,
    answer:
      `完整技术演进路线及关键突破：①感知机（ch2）——线性分类器 f(x)=step(w·x+b)，手工设置权重实现与门/或门/与非门。关键限制：单层只能线性分类，无法实现 XOR；权重需人工设置。②多层感知机——通过组合逻辑门（AND+OR+NAND）实现 XOR，证明多层结构可非线性分类。关键限制：仍用阶跃函数，权重仍需手工设置。③神经网络（ch3-ch4）——关键突破有三：a) 用 sigmoid/ReLU 替代阶跃函数实现可导；b) 用损失函数（交叉熵）量化预测误差；c) 用反向传播（计算图+链式法则）自动计算梯度，用梯度下降自动学习权重。从此权重从手工设置变为自动学习。④学习技巧（ch5）——优化器（SGD→Adam）加速收敛、初始化（Xavier/He）稳定训练、BatchNorm 加速+正则化、Dropout/L2 抑制过拟合。突破：让网络学得更快、更稳、更泛化。⑤CNN（ch6）——卷积+池化替代全连接，参数共享+平移不变+保留空间结构，突破全连接网络在图像上的参数爆炸问题。⑥深度学习（ch7-ch8）——框架化封装+GPU加速+残差连接+数据增强，突破规模化训练瓶颈。每一阶段都在前一阶段基础上解决新瓶颈。`,
    tags: ["技术演进", "感知机", "神经网络", "深度学习", "知识整合"],
  },
  {
    id: "dls-final-review-2",
    chapter: "dls-final-review",
    level: 3,
    question: `前向传播和反向传播如何配合完成一次完整的参数更新？请从 mini-batch 训练的完整流程说明。`,
    answer:
      `一次完整参数更新的流程（mini-batch SGD）：①采样——从训练集随机抽取 batch_size 个样本 (X, T)，X 是输入数据，T 是标签。②前向传播——数据从输入层逐层流向输出层：a) Affine 层：A = np.dot(X, W) + B，缓存 X 供反向传播；b) 激活函数层：Z = relu(A) 或 sigmoid(A)，缓存 A；c) 重复 Affine+激活直到输出层；d) 输出层：Y = softmax(A_last)。每一层计算时缓存中间结果（输入值）供反向传播使用。③损失计算——L = cross_entropy_error(Y, T)，衡量预测 Y 与真实标签 T 的差距。④反向传播——从损失层开始反向逐层计算梯度：a) Softmax-with-Loss 层：dA = Y - T（softmax+交叉熵的简洁梯度）；b) Affine 层：dW = np.dot(X.T, dA)、dX = np.dot(dA, W.T)、dB = np.sum(dA, axis=0)，利用前向缓存的 X；c) 激活函数层：dA = dZ * relu_grad(A)，利用前向缓存的 A。每一层将梯度传给前一层。⑤参数更新——用优化器更新所有层的参数：W ← W - η·dW（SGD）或更复杂的 Adam 更新。⑥重复①-⑤直到收敛。这就是神经网络训练的完整引擎。`,
    tags: ["前向传播", "反向传播", "mini-batch", "参数更新", "训练流程"],
  },
  {
    id: "dls-final-review-3",
    chapter: "dls-final-review",
    level: 3,
    question: `全连接层、卷积层、池化层三者对比：各自的输入输出形状、参数量、梯度计算有何不同？`,
    answer:
      `三者对比：①全连接层（Affine）——输入 (N, D)，输出 (N, H)，权重 W(D,H)+偏置 b(H)。参数量 = D×H+H。前向 Y=X·W+b。反向：dW=X.T·dY, dX=dY·W.T, dB=sum(dY, axis=0)。特点：破坏空间结构，参数量大。②卷积层（Conv）——输入 (N, C, H, W)，输出 (N, FN, OH, OW)，权重 (FN, C, FH, FW)+偏置 (FN,)。参数量 = FN×C×FH×FW+FN（与输入尺寸无关，参数共享）。前向用 im2col 展开后矩阵乘法。反向：dW 用 im2col 输入转置乘 dY 再 reshape，dX 用 dY 乘权重转置再 col2im 逆变换。特点：保留空间结构，参数量小，平移不变。③池化层（Pool）——输入 (N, C, H, W)，输出 (N, C, OH, OW)。参数量 = 0（无可学习参数）。前向 Max Pooling 取窗口最大值并记录位置。反向：梯度只传给前向最大值位置，其余为 0。特点：下采样，无参数，无梯度学习。总结：全连接适合最终分类，卷积适合特征提取，池化适合尺寸缩减。CNN = Conv（提取特征）+ Pool（缩减尺寸）+ FC（最终分类）的组合。`,
    tags: ["全连接层", "卷积层", "池化层", "对比", "梯度计算"],
  },
  {
    id: "dls-final-review-4",
    chapter: "dls-final-review",
    level: 4,
    question: `如果让你用本书学到的知识从零搭建一个 MNIST 手写数字识别系统，你会如何设计？说明每一步的原理和实现要点。`,
    answer:
      `MNIST 手写数字识别系统设计（从零搭建）：①数据准备——加载 MNIST 数据集（60000 训练+10000 测试，28×28 灰度图，10 类）。用 NumPy 加载为 (N, 1, 28, 28) 的数组，归一化到 [0,1]，标签 one-hot 编码。划分训练集和验证集监控过拟合。②模型架构——两层方案：a) 简单方案：Affine(784→100)+ReLU+Affine(100→10)+Softmax，适合快速验证；b) CNN 方案：Conv(16个5×5)+ReLU+Pool(2×2)+Conv(32个5×5)+ReLU+Pool(2×2)+Affine(7×7×32→10)+Softmax，精度更高。③损失函数——交叉熵误差 L = -Σ tk·log(yk)，与 softmax 合并为 Softmax-with-Loss 层简化梯度。④优化器——用 Adam（lr=0.001），比 SGD 收敛快且对学习率不敏感。batch_size=100。⑤正则化——加 Dropout(p=0.5) 在全连接层之间，加 Weight Decay(λ=0.01) 抑制过拟合。可选加 BatchNorm。⑥训练循环——Trainer 封装：每 epoch 遍历全部训练数据，每个 mini-batch 做前向→损失→反向→更新。记录 train/test loss 和 accuracy 曲线。⑦学习率衰减——指数衰减（每 epoch ×0.9）或余弦退火，后期精调。⑧评估——测试集 accuracy 达到 99%+（CNN 方案）。关键实现要点：全部用 NumPy 向量化运算、im2col 优化卷积、层对象化封装 forward/backward、OrderedDict 串联层。这就是本书从 ch1 到 ch8 知识的完整应用。`,
    tags: ["MNIST", "系统设计", "知识整合", "端到端"],
  },
];
