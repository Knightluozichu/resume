import { ReviewQuestion } from "./types";

export const dlsBackpropagationQuestions: ReviewQuestion[] = [
  {
    id: "dls-backpropagation-1",
    chapter: "dls-backpropagation",
    level: 1,
    question: `什么是计算图？用计算图表示反向传播有什么优势？`,
    answer:
      `计算图是一种用节点和边表示数学运算的图结构：节点表示运算（加法、乘法、平方等），边表示数据流动。例如 y = (x + b)² 的计算图为：x 和 b → 加法节点 → 得到 a → 平方节点 → 得到 y。用计算图表示反向传播的优势：①直观可视化——复杂计算被分解为简单运算的组合，每一步清晰可见。②局部计算——每个节点只需关心自己的输入输出和局部导数，不需要了解全局计算，大幅简化梯度推导。③自动微分基础——计算图是自动微分（autograd）的数据结构基础，现代深度学习框架都基于计算图实现自动求导。④复用前向计算——反向传播沿着前向传播的计算图反向传递梯度，复用已计算的中间结果。本书通过构建计算图的加法层（AddLayer）和乘法层（MulLayer）等模块，从最简单的例子开始理解反向传播，再推广到神经网络的全连接层。`,
    tags: ["计算图", "反向传播", "自动微分"],
  },
  {
    id: "dls-backpropagation-2",
    chapter: "dls-backpropagation",
    level: 2,
    question: `在计算图中，加法节点和乘法节点的反向传播规则分别是什么？`,
    answer:
      `加法节点的反向传播规则：梯度原样传递。z = x + y，则 ∂z/∂x = 1, ∂z/∂y = 1，所以上游传来的梯度 dz 直接传给 x 和 y：dx = dz, dy = dz。直觉：加法只是把两个值合并，对各自的贡献是 1:1 的。乘法节点的反向传播规则：梯度「翻转」相乘。z = x · y，则 ∂z/∂x = y, ∂z/∂y = x，所以上游传来的梯度 dz 乘以另一个输入值：dx = dz · y, dy = dz · x。直觉：乘法中一个变量对结果的贡献取决于另一个变量的值。例如 z = x·y，如果 y=10 则 x 每变化 1，z 变化 10。这两种基本节点的反向传播规则是构建所有复杂运算反向传播的基础。神经网络的全连接层（Affine 层）本质上就是矩阵乘法加偏置，其反向传播遵循乘法和加法的组合规则。`,
    tags: ["加法节点", "乘法节点", "链式法则", "局部导数"],
  },
  {
    id: "dls-backpropagation-3",
    chapter: "dls-backpropagation",
    level: 2,
    question: `链式法则（Chain Rule）在反向传播中如何应用？以 z = (x + y)² 为例说明。`,
    answer:
      `链式法则：如果 y = f(g(x))，则 ∂y/∂x = ∂y/∂g · ∂g/∂x，即复合函数的导数等于各层导数的乘积。在反向传播中，梯度沿着计算图逐层传递，每层用链式法则将上游梯度乘以本层的局部导数。以 z = (x + y)² 为例，计算图为：x,y → 加法 → a(=x+y) → 平方 → z。前向：a = x + y, z = a²。反向：①从 z 开始，∂L/∂z = 1（假设 L = z）。②平方层局部导数 ∂z/∂a = 2a，所以 ∂L/∂a = ∂L/∂z · 2a = 2a = 2(x+y)。③加法层局部导数 ∂a/∂x = 1, ∂a/∂y = 1，所以 ∂L/∂x = ∂L/∂a · 1 = 2(x+y)，∂L/∂y = ∂L/∂a · 1 = 2(x+y)。关键：每个节点只需知道自己的局部导数和上游传来的梯度，就能计算传给下游的梯度。这种「局部计算」使得即使计算图有数百层，也能系统性地计算所有参数的梯度。`,
    tags: ["链式法则", "反向传播", "复合函数"],
  },
  {
    id: "dls-backpropagation-4",
    chapter: "dls-backpropagation",
    level: 3,
    question: `如何用 NumPy 实现全连接层（Affine 层）的前向和反向传播？写出关键代码并解释。`,
    answer:
      `全连接层（Affine 层）实现矩阵乘法加偏置：Y = X·W + B。前向传播：\`def forward(self, X): self.X = X; return np.dot(X, self.W) + self.B\`，其中 X(shape=(N, D))、W(shape=(D, H))、B(shape=(H,))，输出 Y(shape=(N, H))，偏置通过广播加到每行。反向传播：已知上游梯度 dY(shape=(N, H))，需计算 dX、dW、dB。①dW = np.dot(X.T, dY)——X 转置后与 dY 相乘，shape=(D, N)×(N, H)=(D, H)。②dB = np.sum(dY, axis=0)——对 batch 维度求和，因为偏置对每个样本都加了相同的 B，梯度累加，shape=(H,)。③dX = np.dot(dY, W.T)——dY 与 W 转置相乘，shape=(N, H)×(H, D)=(N, D)。解释：dW 和 dX 分别遵循乘法节点的「翻转」规则（dW = X·dY 对应 ∂Y/∂W = X，dX = dY·W 对应 ∂Y/∂X = W），dB 遵循加法节点的「原样传递」再沿 batch 求和。将多个 Affine 层与激活函数层串联，即可构建完整的神经网络反向传播。`,
    tags: ["Affine层", "全连接", "矩阵反向传播", "NumPy"],
  },
];
