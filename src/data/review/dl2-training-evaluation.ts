import { ReviewQuestion } from "../types";

export const dl2TrainingEvaluationQuestions: ReviewQuestion[] = [
  {
    id: "dl2-training-evaluation-1",
    chapter: "dl2-training-evaluation",
    level: 2,
    question: "为什么 softmax 交叉熵要合并为一个 Function 实现？写出 forward 和 backward。",
    answer:
      "softmax 交叉熵合并为一个 Function 实现的原因：如果分开实现（先 softmax 再交叉熵），softmax 的 backward 涉及雅可比矩阵，形式复杂。合并后，利用 softmax + 交叉熵的导数有简洁形式 `(softmax - onehot) / N`，大幅简化计算。forward 实现：接收预测得分 x(N,C) 和标签 t(N,)。先做数值稳定的 softmax（减最大值），再算交叉熵 `y = -sum(log(softmax[arange(N), t] + 1e-10)) / N`，加 1e-10 防 log(0)。backward 实现：重算 softmax，梯度 `gx = softmax.copy(); gx[arange(N), t] -= 1; gx = gx * gy / N`。即 softmax 概率减去 onehot 标签（预测正确的类别减 1），再乘以上游梯度 gy 除以 N。梯度含义：预测正确（softmax 接近 1）时梯度接近 0，预测错误（softmax 接近 0）时梯度大，能快速纠正错误预测。",
    tags: ["softmax交叉熵", "forward", "backward", "损失函数"],
  },
  {
    id: "dl2-training-evaluation-2",
    chapter: "dl2-training-evaluation",
    level: 2,
    question: "DataLoader 如何实现 mini-batch 数据加载？写出核心逻辑。",
    answer:
      "DataLoader 实现 mini-batch 数据加载的核心逻辑：`__init__` 接收 dataset、batch_size、shuffle 参数，计算 data_size 和 max_iter（总 batch 数）。`__iter__` 初始化 iteration=0，若 shuffle 则生成随机排列的 index 数组，否则用顺序 index。`__next__` 检查 iteration 是否超过 max_iter，若是则 raise StopIteration。否则取当前 batch 的 index 切片 `batch_index = self.index[i*batch_size:(i+1)*batch_size]`，从 dataset 中按 batch_index 取出数据，组装为 x（特征数组）和 t（标签数组），iteration+=1 后返回 (x, t)。关键设计：①shuffle 用 `np.random.permutation` 打乱顺序，每个 epoch 重新打乱。②index 数组在 `__iter__` 时生成，保证每个 epoch 的打乱不同。③batch_index 切片处理最后一个 batch 不足 batch_size 的情况（max_iter = data_size // batch_size 向下取整，丢弃尾部不足一个 batch 的数据）。",
    tags: ["DataLoader", "mini-batch", "数据加载"],
  },
  {
    id: "dl2-training-evaluation-3",
    chapter: "dl2-training-evaluation",
    level: 3,
    question: "写出完整的训练循环，说明每一步的作用。",
    answer:
      "完整训练循环：`for epoch in range(max_epoch): for x, t in train_loader: y = model(x); loss = softmax_cross_entropy(y, t); model.cleargrads(); loss.backward(); optimizer.update(); if epoch % 10 == 0: acc = accuracy(model, test_set); print(...)`。每一步作用：①`for x, t in train_loader`——DataLoader 按 mini-batch 迭代，每次返回一个 batch 的特征和标签。②`y = model(x)`——前向传播，模型对输入 x 计算预测值 y。③`loss = softmax_cross_entropy(y, t)`——计算预测值 y 与真实标签 t 之间的损失。④`model.cleargrads()`——清零所有参数的梯度，防止上一轮的梯度残留累加。⑤`loss.backward()`——反向传播，沿计算图从 loss 回溯到所有参数，填充梯度。⑥`optimizer.update()`——优化器根据梯度更新所有参数的 data。⑦定期评估——每若干 epoch 在测试集上算精度，监控训练进度和泛化能力。外层 epoch 循环控制训练轮数，内层 batch 循环遍历所有数据。",
    tags: ["训练循环", "前向传播", "反向传播", "参数更新"],
  },
  {
    id: "dl2-training-evaluation-4",
    chapter: "dl2-training-evaluation",
    level: 3,
    question: "如何检测过拟合？DeZero 中评估时如何禁用计算图构建以节省内存？",
    answer:
      "过拟合检测方法：对比训练精度和测试精度。如果训练精度持续升高但测试精度停滞或下降，说明模型过拟合——记住了训练数据的细节（包括噪声）但没有学到通用规律。具体监控：每个 epoch 记录训练损失、训练精度和测试精度。训练精度高（如 99%）但测试精度低（如 70%）是典型过拟合信号。应对方法：增加数据量、正则化（L2）、Dropout、早停（在测试精度开始下降时停止训练）。DeZero 中评估时禁用计算图构建：用 `with using_config('enable_backprop', False):` 上下文管理器包裹评估代码。在该上下文内，Function.__call__ 检测到 enable_backprop 为 False，跳过 creator 设置和 inputs/outputs 保存，不构建计算图。这样评估（只做前向）时不占用计算图内存，与 PyTorch 的 `with torch.no_grad():` 作用一致。实现原理是 DeZero 的 Config 类支持全局配置，Function.__call__ 中 `if Config.enable_backprop: output.set_creator(self)` 做条件判断。",
    tags: ["过拟合", "评估", "no_grad", "enable_backprop"],
  },
];
