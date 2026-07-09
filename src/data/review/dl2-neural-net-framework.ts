import { ReviewQuestion } from "../types";

export const dl2NeuralNetFrameworkQuestions: ReviewQuestion[] = [
  {
    id: "dl2-neural-net-framework-1",
    chapter: "dl2-neural-net-framework",
    level: 1,
    question: "DeZero 框架的核心设计目标是什么？它要解决什么问题？",
    answer:
      "DeZero 框架的核心设计目标是「自动微分」——用户只写前向计算，框架自动构建计算图并反向求导。它要解决的问题是：在第一部中用 NumPy 手写神经网络时，前向传播是手动的矩阵乘法，反向传播是手写的梯度公式。当网络变复杂时，手写梯度既繁琐又容易出错。DeZero 通过 Variable 包装数据、Function 抽象运算、creator 链记录计算图，让框架自动完成梯度计算。此外还有两个目标：①可组合——运算可像积木一样组合，构建任意复杂的计算流程；②可扩展——新增运算只需继承 Function 并实现 forward/backward，无需修改框架其他代码。DeZero 追求「最小实现，最大理解」，不追求性能而是让每个设计决策清晰可见。",
    tags: ["设计目标", "自动微分", "可扩展"],
  },
  {
    id: "dl2-neural-net-framework-2",
    chapter: "dl2-neural-net-framework",
    level: 2,
    question: "DeZero 的四层架构是什么？各层的核心类和职责是什么？",
    answer:
      "DeZero 采用四层架构，自底向上：①数据层——核心类 Variable，职责是包装 NumPy 数组（data 属性）、记录计算图链接（creator 属性）、持有梯度（grad 属性）。②运算层——核心类 Function 及其子类，职责是定义具体运算的 forward（前向计算）和 backward（反向梯度），在 `__call__` 中通过 `output.creator = self` 连接计算图。③引擎层——核心是 Variable.backward 方法，职责是对计算图做拓扑排序，沿图反向传递梯度，实现自动求导。④工程层——核心类 Layer/Model/Optimizer，职责是封装参数管理（权重收集与梯度清零）、网络组合（多层嵌套）、训练循环（参数更新）。这种分层设计使每层职责单一，自底向上逐层抽象。",
    tags: ["四层架构", "Variable", "Function", "Layer"],
  },
  {
    id: "dl2-neural-net-framework-3",
    chapter: "dl2-neural-net-framework",
    level: 2,
    question: "解释「定义即计算图」的设计哲学，并用代码说明。",
    answer:
      "「定义即计算图」是 DeZero 的核心设计哲学：用户写的每一行前向计算代码都在同时构建计算图，无需手动维护图结构。框架在 `Function.__call__` 中自动通过 creator 链记录运算关系。代码示例：`x = Variable(np.array(2.0)); a = square(x); b = exp(a); y = add(b, x)`。用户只写了前向计算，但框架已自动构建了计算图：x 经过 square 得到 a，a 经过 exp 得到 b，b 和 x 经过 add 得到 y。每一步 `__call__` 都执行 `output.creator = self`，把输出和运算连接起来。之后调用 `y.backward()` 时，框架沿 creator 链从 y 回溯到 x，自动用链式法则算出 y 对 x 的导数并存入 x.grad。用户完全不需要手写梯度公式。",
    tags: ["定义即计算图", "creator链", "设计哲学"],
  },
  {
    id: "dl2-neural-net-framework-4",
    chapter: "dl2-neural-net-framework",
    level: 3,
    question: "DeZero 与 PyTorch 有何对应关系？理解 DeZero 对使用 PyTorch 有何帮助？",
    answer:
      "DeZero 与 PyTorch 的对应关系：①Variable ↔ Tensor（requires_grad=True）——都是数据容器，都记录计算图。②Function ↔ autograd.Function——都定义 forward/backward，都是计算图节点。③backward() ↔ backward()——都沿计算图反向传递梯度。④Layer ↔ nn.Module——都封装参数与运算，都可嵌套组合。⑤Model ↔ nn.Module（嵌套）——都组合多个层构成网络。⑥Optimizer ↔ optim.SGD 等——都根据梯度更新参数。理解 DeZero 对使用 PyTorch 的帮助：①理解 autograd——知道 `loss.backward()` 内部是在沿计算图反向传递梯度，不再视为黑箱。②理解 nn.Module——知道 Module 的参数收集、梯度清零、状态管理机制。③调试能力——当梯度异常（NaN、梯度消失）时，能定位是哪个 Function 的 backward 实现有问题。④扩展能力——能自定义 autograd.Function 实现框架未提供的运算。",
    tags: ["PyTorch对应", "autograd", "迁移能力"],
  },
];
