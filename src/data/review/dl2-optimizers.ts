import { ReviewQuestion } from "../types";

export const dl2OptimizersQuestions: ReviewQuestion[] = [
  {
    id: "dl2-optimizers-1",
    chapter: "dl2-optimizers",
    level: 1,
    question: "优化器在框架中扮演什么角色？Optimizer 基类的接口设计是怎样的？",
    answer:
      "优化器在框架中扮演「参数更新者」的角色——反向传播算出梯度后，优化器根据梯度按特定策略更新参数。Optimizer 基类的接口设计：①__init__——初始化超参数和 hooks（预处理钩子）。②setup(target)——绑定要优化的目标（Model 或 Layer），返回 self 支持链式调用。③update()——核心方法，通过 `self.target.params()` 收集目标的所有参数，逐个调用 `_update_one(param)` 更新。④_update_one(param)——抽象方法，子类实现具体更新策略（SGD/Momentum/Adam）。设计要点：Optimizer 不直接操作单个参数，而是通过 target.params() 收集，这使得一个 Optimizer 实例可统一处理 Layer、Model 等任意层级的参数容器。hooks 机制允许在更新前做梯度裁剪等预处理。",
    tags: ["优化器", "Optimizer接口", "参数更新"],
  },
  {
    id: "dl2-optimizers-2",
    chapter: "dl2-optimizers",
    level: 2,
    question: "实现 SGD 和 Momentum 优化器，说明 Momentum 相比 SGD 的优势。",
    answer:
      "SGD 实现：`class SGD(Optimizer): def __init__(self, lr=0.01): self.lr=lr; def _update_one(self, param): param.data -= self.lr * param.grad`。更新公式 `W ← W - lr*grad`。Momentum 实现：`class Momentum(Optimizer): def __init__(self, lr=0.01, momentum=0.9): self.lr=lr; self.momentum=momentum; self.vs={}; def _update_one(self, param): v=self.vs.get(id(param), np.zeros_like(param.data)); v=self.momentum*v - self.lr*param.grad; self.vs[id(param)]=v; param.data += v`。更新公式 `v ← momentum*v - lr*grad; W ← W + v`。Momentum 相比 SGD 的优势：①抵消震荡——在病态曲率（椭圆形损失面）下，SGD 会在陡峭方向来回震荡。Momentum 的 0.9 倍历史速度提供惯性，使震荡方向的更新因正负抵消而减弱。②加速收敛——在一致梯度方向上，速度不断累积加速，比 SGD 更快到达最优。③更平稳——惯性平滑了梯度噪声的影响。",
    tags: ["SGD", "Momentum", "优化器实现"],
  },
  {
    id: "dl2-optimizers-3",
    chapter: "dl2-optimizers",
    level: 3,
    question: "Adam 优化器的更新公式是什么？一阶矩和二阶矩各有什么作用？",
    answer:
      "Adam 的更新公式：①一阶矩 `m ← β1*m + (1-β1)*grad`（梯度的指数移动平均，β1=0.9）。②二阶矩 `v ← β2*v + (1-β2)*grad^2`（梯度平方的指数移动平均，β2=0.999）。③偏差修正 `m_hat = m/(1-β1^t); v_hat = v/(1-β2^t)`。④参数更新 `W ← W - α * m_hat / (√v_hat + ε)`（α=0.001, ε=1e-8）。一阶矩的作用：类似 Momentum，累积梯度方向的历史信息，提供惯性使更新更平稳。二阶矩的作用：衡量梯度的历史幅度，用于自适应调节学习率——梯度大的参数学习率自动减小（除以 √v_hat），梯度小的参数学习率自动增大。两者结合使 Adam 既有 Momentum 的平稳性，又有 RMSProp 的自适应性。偏差修正消除 m、v 初始为 0 带来的早期偏小问题。",
    tags: ["Adam", "一阶矩", "二阶矩", "自适应学习率"],
  },
  {
    id: "dl2-optimizers-4",
    chapter: "dl2-optimizers",
    level: 3,
    question: "在训练循环中如何使用优化器？与 PyTorch 的用法有何对应？",
    answer:
      "DeZero 训练循环使用优化器的标准模式：①定义模型 `model = MLP((100,10))`。②设置优化器 `optimizer = Adam().setup(model)`——setup 自动收集模型所有参数。③训练循环：前向计算 `y = model(x)`，算损失 `loss = softmax_cross_entropy(y, t)`，清零梯度 `model.cleargrads()`，反向传播 `loss.backward()`，更新参数 `optimizer.update()`。与 PyTorch 的对应：①DeZero `Adam().setup(model)` ↔ PyTorch `optim.Adam(model.parameters())`。②DeZero `model.cleargrads()` ↔ PyTorch `optimizer.zero_grad()`。③DeZero `loss.backward()` ↔ PyTorch `loss.backward()`。④DeZero `optimizer.update()` ↔ PyTorch `optimizer.step()`。两者流程几乎一致，区别仅在于 API 命名（update/step、cleargrads/zero_grad）。这种相似性说明 DeZero 成功复刻了工业框架的训练范式。",
    tags: ["训练循环", "PyTorch对应", "optimizer用法"],
  },
];
