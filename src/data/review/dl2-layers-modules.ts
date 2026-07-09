import { ReviewQuestion } from "../types";

export const dl2LayersModulesQuestions: ReviewQuestion[] = [
  {
    id: "dl2-layers-modules-1",
    chapter: "dl2-layers-modules",
    level: 2,
    question: "Layer 基类如何实现参数的自动收集？请说明 `__setattr__` 和 `params()` 的机制。",
    answer:
      "Layer 基类通过两个机制实现参数自动收集：①`__setattr__`——在属性赋值时自动检测类型。当执行 `self.W = Parameter(...)` 时，`__setattr__` 拦截赋值操作，检查 value 是否为 Parameter 或 Layer 类型。如果是，将属性名 name 加入 `self._params` 集合，然后调用 `super().__setattr__` 完成实际赋值。这样用户无需手动声明参数列表，任何 Parameter 类型的属性都自动被收集。②`params()`——递归收集所有参数。遍历 _params 集合中的每个属性名，取出对应对象：如果是 Parameter 直接 yield（它是叶参数）；如果是 Layer（子层），递归调用 `yield from obj.params()` 继续深入。这种递归设计使网络可无限嵌套——无论外层 Model 包含多少层子 Layer，params() 都能找到所有叶参数。cleargrads() 遍历 params() 对每个参数调用 cleargrad()。这与 PyTorch 的 nn.Module.parameters() 机制一致。",
    tags: ["Layer", "参数收集", "__setattr__", "params"],
  },
  {
    id: "dl2-layers-modules-2",
    chapter: "dl2-layers-modules",
    level: 2,
    question: "实现 Linear 层，说明延迟初始化和 Xavier 初始化的作用。",
    answer:
      "Linear 层实现：`__init__` 接收 out_size、可选 nobias、dtype、in_size。创建 `self.W = Parameter(None)` 和 `self.b = Parameter(np.zeros(out_size))`。`_init_W` 方法用 Xavier 初始化：`W_data = np.random.randn(I, O) * np.sqrt(1/I)`。forward 方法中检查 `self.W.data is None`，若是则根据 x.shape[1] 推断 in_size 并调用 `_init_W`，然后计算 `y = matmul(x, self.W)`，若 b 不为 None 则 `y = add(y, self.b)`。延迟初始化的作用：允许用户在 `__init__` 时不指定 in_size（`Linear(100)`），首次前向传播时根据输入 x 的形状自动推断。省去用户手动计算输入维度（尤其在复杂网络中容易出错）。Xavier 初始化的作用：权重初始值设为 `randn * sqrt(1/I)`（I 是输入维度），使各层激活值方差大致相同，避免前向传播时信号指数增长或消失。Xavier 适合 sigmoid/tanh，He 初始化（sqrt(2/I)）适合 ReLU。",
    tags: ["Linear", "延迟初始化", "Xavier初始化"],
  },
  {
    id: "dl2-layers-modules-3",
    chapter: "dl2-layers-modules",
    level: 3,
    question: "Layer 和 Function 有什么关系？为什么要在这两者之上再封装 Layer？",
    answer:
      "Layer 和 Function 的关系：Function 是底层运算单元（无参数，纯运算，是计算图节点），Layer 是高层模块化单元（管理参数，可组合，是网络构建积木）。Layer 内部使用 Function 实现前向计算——如 Linear 内部用 matmul 和 add 两个 Function，Sigmoid 内部用 exp 和 div 等 Function。Layer 是 Function 之上的工程化封装。在 Function 之上再封装 Layer 的原因：①参数管理——Function 是无状态的运算，无法持有权重/偏置。Layer 把「运算+参数」封装为对象，通过 `__setattr__` 自动收集参数，params() 递归汇总。②模块化组合——散落的函数调用（`y=square(x); z=add(y,b)`）难以管理。Layer 可嵌套组合（TwoLayerNet 包含 fc1、activate1、fc2），像搭积木构建复杂网络。③复用性——同一个 Layer 实例可多次调用，权重在调用间共享。④API 一致性——所有层统一通过 `__call__` 调用，优化器统一通过 params() 收集参数，降低使用心智负担。",
    tags: ["Layer", "Function", "模块化", "参数管理"],
  },
  {
    id: "dl2-layers-modules-4",
    chapter: "dl2-layers-modules",
    level: 3,
    question: "如何用 Layer 组合构建一个两层网络？参数是如何被优化器收集的？",
    answer:
      "用 Layer 组合构建两层网络：`class TwoLayerNet(Layer): def __init__(self, hidden_size, out_size): super().__init__(); self.fc1 = Linear(hidden_size); self.activate1 = Sigmoid(); self.fc2 = Linear(out_size); def forward(self, x): z1=self.fc1(x); a1=self.activate1(z1); z2=self.fc2(a1); return z2`。`__init__` 中创建 fc1（Linear）、activate1（Sigmoid）、fc2（Linear）三个子层作为属性。`__setattr__` 自动将这三个 Layer 属性加入 _params。forward 中依次调用：fc1 做线性变换，activate1 做激活，fc2 做第二层线性变换。优化器收集参数的过程：`optimizer = SGD().setup(model)` 调用 setup 绑定 model 为 target。`optimizer.update()` 调用 `self.target.params()`，从 model 开始递归：model 的 _params 含 fc1、activate1、fc2。fc1 是 Layer，递归调用 fc1.params()，yield fc1.W 和 fc1.b。activate1 是 Layer 无参数。fc2 同理 yield fc2.W 和 fc2.b。最终优化器拿到 W(784,100)、b(100,)、W(100,10)、b(10,) 四个参数，逐个用 _update_one 更新。",
    tags: ["层组合", "TwoLayerNet", "参数收集", "优化器"],
  },
];
