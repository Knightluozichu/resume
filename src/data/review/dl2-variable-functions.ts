import { ReviewQuestion } from "./types";

export const dl2VariableFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "dl2-variable-functions-1",
    chapter: "dl2-variable-functions",
    level: 1,
    question: `Variable 类有哪些属性？各有什么作用？`,
    answer:
      `Variable 类有四个核心属性：①data——前向值，存储 NumPy ndarray，是实际参与运算的数据。\`__init__\` 时做类型校验，只接受 ndarray（或 None），拒绝 Python list 等以避免隐式行为。②grad——梯度，反向传播后填入。初始为 None，backward 过程中存储损失对该 Variable 的导数。③creator——产生该 Variable 的 Function，通过 set_creator 设置。creator 链构成计算图的边，是反向传播回溯的路径。④generation——计算图深度代数，初始为 0，set_creator 时设为 \`func.generation + 1\`。反向传播时优先处理高代数的 Function，保证拓扑顺序正确——高代数节点离输出端更近，其梯度必须先于低代数节点计算完毕。这四个属性共同支撑了「数据包装+计算图记录+梯度存储」的核心功能。`,
    tags: ["Variable", "属性", "generation", "计算图"],
  },
  {
    id: "dl2-variable-functions-2",
    chapter: "dl2-variable-functions",
    level: 2,
    question: `Function 类的 \`__call__\` 方法做了哪些事？请逐步说明。`,
    answer:
      `Function 的 \`__call__\` 方法完成六步：①取数据——\`xs = [x.data for x in inputs]\`，从输入 Variable 中取出 NumPy 数组。②前向计算——\`ys = self.forward(*xs)\`，调用子类实现的 forward 方法计算输出值，支持多输出（返回 tuple）。③包装为 Variable——\`outputs = [Variable(y) for y in ys]\`，把 NumPy 结果包装为 Variable。④设置 generation——\`self.generation = max([x.generation for x in inputs])\`，取所有输入的最大代数，保证拓扑排序正确。⑤连接计算图——\`output.set_creator(self)\`，让输出记住产生它的 Function，同时更新 output.generation。⑥保存输入和输出——\`self.inputs = inputs; self.outputs = outputs\`，供反向传播使用。最后返回 outputs（单输出时解包）。这六步在每次运算时自动完成计算图构建。`,
    tags: ["Function", "__call__", "计算图连接"],
  },
  {
    id: "dl2-variable-functions-3",
    chapter: "dl2-variable-functions",
    level: 2,
    question: `实现 Square 和 Add 的 Function 子类，写出 forward 和 backward。`,
    answer:
      `Square（平方）的实现：\`class Square(Function): def forward(self, x): return x ** 2; def backward(self, gy): x = self.inputs[0].data; return 2 * x * gy\`。forward 计算 x 的平方，backward 返回 \`2*x*gy\`（局部导数 2x 乘以上游梯度 gy）。Add（加法）的实现：\`class Add(Function): def forward(self, x0, x1): return x0 + x1; def backward(self, gy): return gy, gy\`。forward 计算两数之和，backward 返回 \`(gy, gy)\`——加法节点的梯度原样传递给两个输入（局部导数均为 1）。两者的 backward 都遵循链式法则：返回的是局部导数乘以上游梯度。Square 的局部导数是 2x（对 x 求导），Add 的局部导数是 1（对 x0 和 x1 均为 1），所以 Add 的 backward 原样返回 gy。`,
    tags: ["Square", "Add", "forward", "backward"],
  },
  {
    id: "dl2-variable-functions-4",
    chapter: "dl2-variable-functions",
    level: 3,
    question: `为什么当一个 Variable 被多次使用时，梯度需要累加？DeZero 如何实现？`,
    answer:
      `当一个 Variable 被多条路径使用时（如 \`y = add(x, x)\`，x 同时作为 add 的两个输入），根据链式法则，损失对 x 的梯度等于所有路径传回的梯度之和。在计算图上，x 有两条出边，反向传播时每条边都会传回一个梯度，必须累加才能得到正确的总梯度。如果不累加而是覆盖，后传回的梯度会覆盖先传回的，导致结果错误。DeZero 的实现：在 backward 方法中，当向某个输入 Variable 传递梯度时，先检查 \`x.grad is None\`：如果是 None（第一次）则直接赋值 \`x.grad = gx\`；如果不是 None（已有梯度）则累加 \`x.grad = x.grad + gx\`。这确保同一 Variable 从不同路径收到的梯度被正确汇总。这是链式法则在多路径（分叉后再汇合）计算图中的正确实现。`,
    tags: ["梯度累加", "链式法则", "多路径"],
  },
];
