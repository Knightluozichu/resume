import { ReviewQuestion } from "../types";

export const dlsDeepLearningQuestions: ReviewQuestion[] = [
  {
    id: "dls-deep-learning-1",
    chapter: "dls-deep-learning",
    level: 1,
    question: "本书如何实现类层级的神经网络框架（DeeperNetWriter）？有哪些核心类？",
    answer:
      "本书在 ch7 将前几章手写的零散代码组织为类层级框架，核心设计思想是「所有层实现 forward 和 backward 两个方法」。核心类：①Affine 层——全连接层，前向 Y=X·W+B，反向计算 dX/dW/dB。②ReLU 层/Sigmoid 层——激活函数层，前向逐元素激活，反向乘以局部导数。③Softmax-with-Loss 层——将 softmax 和交叉熵合并为一个层，简化反向传播（梯度直接为 y-t）。④Convolution 层——卷积层，用 im2col 优化。⑤Pooling 层——池化层。⑥BatchNormalization 层——BN 层。⑦Dropout 层——随机失活层。这些层通过有序字典（OrderedDict）串联成 Sequential 模型。Trainer 类封装训练循环：接收模型和数据，执行 mini-batch 迭代、前向传播、损失计算、反向传播、参数更新，并记录 loss/accuracy 曲线。这种设计使得添加新层只需实现 forward/backward，模型组合变得灵活，也为迁移到 PyTorch 等框架打下基础。",
    tags: ["类层级框架", "Layer", "Trainer", "DeeperNetWriter"],
  },
  {
    id: "dls-deep-learning-2",
    chapter: "dls-deep-learning",
    level: 2,
    question: "为什么深度学习需要 GPU？CUDA 如何加速矩阵运算？",
    answer:
      "深度学习需要 GPU 的原因：①计算密集——神经网络的核心运算是大规模矩阵乘法（前向传播、反向传播），CPU 虽然单核性能强但核心数少（通常 4-16 核），并行度不足。②GPU 架构优势——GPU 有数千个轻量核心，天然适合并行执行矩阵运算中的大量独立乘加操作。例如矩阵 C=A×B 中每个 C[i][j] 的计算互不依赖，可完全并行。CUDA 加速矩阵运算的原理：CUDA（Compute Unified Device Architecture）是 NVIDIA 的并行计算平台。将矩阵乘法分解为大量线程，每个线程计算输出矩阵的一个元素或一小块，分配到 GPU 的数千核心上同时执行。GPU 的高带宽显存（HBM）配合大规模并行核心，可使矩阵乘法速度比 CPU 快数十到数百倍。实际使用：PyTorch/TensorFlow 通过 cuDNN 库自动将运算调度到 GPU，用户只需将模型和数据 .to('cuda') 即可。本书 ch7 介绍了如何利用 GPU 加速从手写实现到大规模训练的过渡。",
    tags: ["GPU", "CUDA", "矩阵运算", "并行计算"],
  },
  {
    id: "dls-deep-learning-3",
    chapter: "dls-deep-learning",
    level: 2,
    question: "学习率衰减有哪些策略？为什么需要学习率衰减？",
    answer:
      "需要学习率衰减的原因：训练初期需要大学习率快速接近最优区域，但接近最优解时大学习率会导致在最优点附近振荡无法收敛。衰减策略让学习率随训练逐步减小，实现「先快后稳」的收敛。常用策略：①指数衰减——η = η0 · α^epoch，每轮乘以衰减率 α（如 0.95），简单常用。②余弦退火——η = η_min + 0.5(η0-η_min)(1+cos(π·t/T))，从 η0 平滑衰减到 η_min，效果通常优于指数衰减。③阶跃衰减——每训练一定 epoch 后学习率乘以固定因子（如每 10 epoch 乘 0.1）。④Warmup——前若干步用很小的学习率逐渐增大（线性），再开始衰减，用于稳定训练初期（Transformer 训练常用）。⑤自适应优化器内置——Adam 等优化器本身有逐参数自适应学习率，但仍可叠加全局衰减。本书实现中用 Trainer 类的 learning_rate_decay 参数控制衰减。实际调参：学习率和衰减策略是最重要的超参数之一，通常通过验证集表现选择。",
    tags: ["学习率衰减", "指数衰减", "余弦退火", "超参数"],
  },
  {
    id: "dls-deep-learning-4",
    chapter: "dls-deep-learning",
    level: 3,
    question: "从手写 NumPy 实现迁移到 PyTorch 框架时，有哪些关键对应关系？框架的优势是什么？",
    answer:
      "从手写实现迁移到 PyTorch 的关键对应关系：①层定义——手写的 Affine 层 → torch.nn.Linear；ReLU 层 → torch.nn.ReLU；Convolution 层 → torch.nn.Conv2d；Pooling 层 → torch.nn.MaxPool2d。②模型组装——手写的 OrderedDict 串联 → torch.nn.Sequential 或自定义 Module 的 forward 方法。③损失函数——手写的 softmax+交叉熵 → torch.nn.CrossEntropyLoss（内置 softmax）。④自动微分——手写的反向传播 backward() → PyTorch 的 loss.backward() 自动完成，无需手写梯度计算。⑤优化器——手写的 SGD/Adam → torch.optim.SGD/Adam。⑥GPU 加速——手写实现在 CPU 上运行 → PyTorch 的 .to('cuda') 自动调度到 GPU。框架优势：①自动微分——用户只需定义前向传播，梯度自动计算，极大减少代码量和出错可能。②预置组件——大量层、损失函数、优化器、数据加载器开箱即用。③GPU 支持——一行代码切换 CPU/GPU。④生态——预训练模型、可视化工具、分布式训练。理解手写原理后再用框架，能做到「知其然且知其所以然」。",
    tags: ["PyTorch", "框架迁移", "自动微分", "手写实现"],
  },
];
