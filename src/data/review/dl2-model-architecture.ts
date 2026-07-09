import { ReviewQuestion } from "../types";

export const dl2ModelArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "dl2-model-architecture-1",
    chapter: "dl2-model-architecture",
    level: 1,
    question: "Model 类与 Layer 类有什么关系？为什么说「一切皆 Layer」？",
    answer:
      "Model 类继承自 Layer，复用 Layer 的所有能力（`__setattr__` 参数自动收集、params() 递归收集、cleargrads() 梯度清零、`__call__` 前向转发），并添加网络级功能如 plot（计算图可视化）。在 DeZero 中 Model 与 Layer 区分不大，Model 更多是一个语义标记，表示「这是一个完整的网络」而非单个层。说「一切皆 Layer」的原因：①统一抽象——Linear、Sigmoid、MLP、CNN 都是 Layer，都用 `__call__` 调用，都用 params() 收集参数，优化器统一处理。②无限嵌套——Layer 内部可包含子 Layer（Model 也是 Layer），params() 递归收集，网络可任意嵌套。③一致性——无论网络多复杂，训练流程一致：前向→损失→cleargrads→backward→update。这种设计对应 PyTorch 的 nn.Module 既是层又是模型的哲学，降低了学习心智负担。",
    tags: ["Model", "Layer", "一切皆Layer", "继承"],
  },
  {
    id: "dl2-model-architecture-2",
    chapter: "dl2-model-architecture",
    level: 2,
    question: "DeZero 支持哪两种网络组合模式？各举一个例子。",
    answer:
      "DeZero 支持两种网络组合模式：①顺序组合——在 Layer 的 forward 中依次调用各子层，数据线性流过。例如 MLP：`class MLP(Layer): def __init__(self, sizes): for i,out_size in enumerate(sizes): setattr(self, f'fc{i}', Linear(out_size)); def forward(self, x): for i,layer in enumerate(self.layers): x=layer(x); if i<len-1: x=activate(x); return x`。简单直观，适合线性结构网络。②嵌套组合——外层 Model 包含多个子 Block（也是 Layer），子 Block 内部又包含子层。例如 BigNet：`class BigNet(Model): def __init__(self): self.block1=SmallBlock(); self.block2=SmallBlock(); self.head=Linear(10); def forward(self, x): x=self.block1(x); x=self.block2(x); x=self.head(x); return x`。params() 递归收集，使 block1、block2 内部的子层参数也被自动找到。适合构建 ResNet 等含重复模块的复杂网络。两种模式可混用。",
    tags: ["顺序组合", "嵌套组合", "网络构建"],
  },
  {
    id: "dl2-model-architecture-3",
    chapter: "dl2-model-architecture",
    level: 3,
    question: "描述参数从定义到更新的完整管理链路。",
    answer:
      "参数管理链路分四个阶段：①定义阶段——在 Linear.__init__ 中 `self.W = Parameter(...); self.b = Parameter(...)`。Layer 的 `__setattr__` 拦截赋值，检测到 Parameter 类型后自动将属性名加入 `self._params` 集合。用户无需手动声明参数列表。②收集阶段——`optimizer = Adam().setup(model)` 绑定 model 为 target。update() 时调用 `model.params()`，递归遍历 model 的 _params：对 Parameter 直接 yield，对子 Layer 递归调用其 params()。无论网络多深，所有叶参数都被收集。③更新阶段——`optimizer.update()` 逐个取出参数，调用 `_update_one(param)`，用 `param.data -= lr * param.grad`（SGD）或更复杂策略更新参数 data。④清零阶段——`model.cleargrads()` 遍历 params() 对每个参数调用 `param.cleargrad()`（grad=None），为下一轮反向传播准备，防止梯度累加。这四步在训练循环中反复执行。",
    tags: ["参数管理", "定义收集更新", "训练链路"],
  },
  {
    id: "dl2-model-architecture-4",
    chapter: "dl2-model-architecture",
    level: 3,
    question: "如何在 DeZero 中实现一个简单的 CNN？参数是如何被收集的？",
    answer:
      "DeZero 中实现简单 CNN：`class SimpleCNN(Model): def __init__(self): super().__init__(); self.conv1=Conv2d(16,3,pad=1); self.relu1=ReLU(); self.pool1=MaxPool2d(2); self.fc=Linear(10); def forward(self, x): x=self.conv1(x); x=self.relu1(x); x=self.pool1(x); x=reshape(x,(x.shape[0],-1)); x=self.fc(x); return x`。`__init__` 中创建 conv1（Conv2d，含卷积核权重）、relu1（ReLU，无参数）、pool1（MaxPool2d，无参数）、fc（Linear，含权重和偏置）四个子层。`__setattr__` 将这四个 Layer 属性加入 _params。参数收集过程：`optimizer.setup(model)` 绑定 model。update() 调用 model.params() 递归：conv1 是 Layer，递归收集其 W（卷积核）和 b（偏置）。relu1 无参数。pool1 无参数。fc 递归收集其 W 和 b。最终优化器拿到 conv1.W、conv1.b、fc.W、fc.b 四个参数，逐个更新。激活层和池化层无参数不参与收集。",
    tags: ["CNN", "参数收集", "Conv2d", "SimpleCNN"],
  },
];
