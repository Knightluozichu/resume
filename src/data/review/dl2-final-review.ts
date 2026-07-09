import { ReviewQuestion } from "../types";

export const dl2FinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "dl2-final-review-1",
    chapter: "dl2-final-review",
    level: 3,
    question: "用一段代码串联全书知识，展示一次完整的训练流程，并标注每步对应哪个章节。",
    answer:
      "完整训练流程：`x = Variable(np.random.randn(30,784)); t = Variable(np.random.randint(0,10,30))`（ch3 Variable 包装数据）。`model = MLP((100,50,10))`（ch6-ch7 Layer+Model 定义网络）。`optimizer = Adam().setup(model)`（ch5 Optimizer 绑定模型）。`for epoch in range(100): y = model(x)`（ch3 前向传播，自动构建计算图）。`loss = softmax_cross_entropy(y, t)`（ch8 损失计算）。`model.cleargrads()`（ch4 梯度清零）。`loss.backward()`（ch4 反向传播，自动微分）。`optimizer.update()`（ch5 参数更新）。`acc = accuracy(model, test_set)`（ch8 评估精度）。这段代码展示了全书知识如何组装为完整工作流：Variable 提供数据容器，Function 提供运算单元，backward 提供自动微分，Layer/Model 提供网络封装，Optimizer 提供参数更新，训练循环把所有零件串联。",
    tags: ["知识串联", "训练流程", "全书整合"],
  },
  {
    id: "dl2-final-review-2",
    chapter: "dl2-final-review",
    level: 4,
    question: "DeZero 的四层架构分别解决什么问题？层与层之间如何协作？",
    answer:
      "DeZero 四层架构各解决的问题：①数据层（Variable）——解决「数据不可追溯」问题。裸 NumPy 数组无法记录运算历史，Variable 包装 data 并通过 creator 链记录产生它的 Function，使运算可追溯、可反向。②运算层（Function）——解决「运算需同时定义前向反向且自动连接计算图」问题。Function 基类在 `__call__` 中自动完成 creator 设置和 inputs/outputs 保存，子类只实现 forward/backward。③引擎层（backward）——解决「复杂计算图梯度计算」问题。通过 generation 拓扑排序 + 链式法则，从输出端自动反向传递梯度到所有输入。④工程层（Layer/Model/Optimizer）——解决「参数管理和网络组合」问题。Layer 封装参数+运算，Model 组合多层网络，Optimizer 根据梯度更新参数。层间协作：Layer 内部用 Function 实现前向计算，Function 产出 Variable 形成计算图，backward 沿计算图反向传递梯度填入 Variable.grad，Optimizer 读取 grad 更新 Layer 的 Parameter.data。",
    tags: ["四层架构", "层间协作", "架构设计"],
  },
  {
    id: "dl2-final-review-3",
    chapter: "dl2-final-review",
    level: 3,
    question: "DeZero 与 PyTorch 的核心概念如何对应？理解 DeZero 对使用 PyTorch 有何帮助？",
    answer:
      "DeZero 与 PyTorch 核心概念对应：Variable↔Tensor(requires_grad=True)——数据容器，均记录计算图。Function↔autograd.Function——运算单元，均有 forward/backward。backward()↔backward()——反向传播，均沿计算图反向传递梯度。Layer↔nn.Module——模块化层，均支持嵌套和参数收集。Model↔nn.Module(顶层)——网络容器。Optimizer↔optim.SGD/Adam——优化器，接口一致(update↔step)。cleargrads()↔zero_grad()——梯度清零。using_config↔no_grad()——禁用计算图。理解 DeZero 对使用 PyTorch 的帮助：①理解 autograd——知道 `loss.backward()` 内部是沿计算图反向传递梯度，不再视为黑箱。②理解 nn.Module——知道参数收集、梯度清零的机制。③调试能力——梯度异常时能定位问题。④扩展能力——能自定义 autograd.Function。⑤迁移零障碍——核心概念一一对应，只需学 API 命名差异。真正重要的是「计算图→反向传播→参数更新」机制，这在所有框架中通用。",
    tags: ["PyTorch对应", "框架迁移", "核心概念"],
  },
  {
    id: "dl2-final-review-4",
    chapter: "dl2-final-review",
    level: 4,
    question: "全书有哪四个核心设计决策？每个决策解决了什么问题？",
    answer:
      "全书四个核心设计决策：①计算图隐式构建——在前向传播时（Function.__call__）自动通过 creator 链构建计算图，用户无需显式定义。解决了「如何让用户只写前向计算，框架自动记录运算关系」的问题。对比静态图（TF 1.x），隐式构建更灵活、支持控制流。②反向传播用 generation 拓扑排序——每个 Variable/Function 持有 generation（计算图深度），反向传播时按 generation 降序处理。解决了「复杂计算图（有分支和汇合）如何保证节点处理顺序正确」的问题——高代数（离输出近）先处理，保证下游梯度先算完。③参数自动收集——Layer 的 `__setattr__` 在赋值时检测 Parameter 类型自动加入 _params，params() 递归收集子层参数。解决了「如何让框架自动发现和管理所有可学习参数」的问题，用户无需手动维护参数列表。④梯度累加而非覆盖——当 Variable 被多条路径使用时，反向传播用 `x.grad = x.grad + gx` 累加。解决了「多路径梯度如何正确汇总」的问题，符合链式法则在分叉汇合场景的要求。这四个决策共同支撑了「用户只写前向，框架自动求导」的核心能力。",
    tags: ["设计决策", "隐式计算图", "拓扑排序", "参数收集", "梯度累加"],
  },
];
