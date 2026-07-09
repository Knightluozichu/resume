import { ReviewQuestion } from "../types";

export const dltDeepNetworksQuestions: ReviewQuestion[] = [
  {
    id: "dlt-deep-networks-1",
    chapter: "dlt-deep-networks",
    level: 1,
    question: "前馈神经网络的基本结构是什么？为什么需要激活函数？",
    answer:
      "前馈神经网络由输入层、若干隐藏层和输出层组成。每层对上层输出做线性变换（W·h + b）后加非线性激活 sigma，信息从输入单向流向前方。第 l 层计算 h^(l) = sigma(W^(l)·h^(l-1) + b^(l))。需要激活函数的原因：如果没有非线性激活，多层线性变换的复合仍然是线性变换——W2(W1·x) = (W2·W1)·x，多层网络等价于单层线性模型，无法逼近非线性函数。激活函数引入非线性使网络能表示复杂非线性映射。常见激活函数：Sigmoid（饱和区梯度消失）、Tanh（零中心化）、ReLU（max(0,x)，正区梯度恒为 1，是默认选择）。ReLU 的问题是负区导数为零可能导致神经元死亡，Leaky ReLU 在负区给小斜率解决此问题。",
    tags: ["前馈网络", "激活函数", "非线性", "ReLU"],
  },
  {
    id: "dlt-deep-networks-2",
    chapter: "dlt-deep-networks",
    level: 2,
    question: "反向传播算法的原理是什么？它的计算复杂度如何？",
    answer:
      "反向传播用链式法则高效计算损失对每个参数的梯度。过程分两步：①前向传播——从输入到输出逐层计算 z^(l) = W^(l)·h^(l-1) + b^(l) 和 h^(l) = sigma(z^(l))，保存中间值。计算损失 L。②反向传播——从输出到输入逐层计算误差信号 delta 和梯度：delta^(L) = grad_h L · sigma'(z^(L))，delta^(l) = (W^(l+1))^T · delta^(l+1) · sigma'(z^(l))，权重梯度 grad_W = delta · (h^(l-1))^T。计算复杂度与前向传播同阶（约 2 倍前向计算量），因为反向传播复用前向传播保存的中间值避免重复计算。对于 N 个参数的网络复杂度为 O(N)，是深度学习可扩展到亿级参数的关键。本质是计算图上的 reverse-mode 自动微分。",
    tags: ["反向传播", "链式法则", "计算复杂度", "自动微分"],
  },
  {
    id: "dlt-deep-networks-3",
    chapter: "dlt-deep-networks",
    level: 3,
    question: "万能逼近定理的内容是什么？它有什么局限性？",
    answer:
      "万能逼近定理指出：具有至少一个隐藏层、使用非多项式激活函数的前馈网络，只要隐藏层足够宽，就能以任意精度逼近任意连续函数。即对任意连续函数 f 和任意精度 epsilon > 0，存在网络 g 使 sup|f(x)-g(x)| < epsilon。局限性：①不保证可学习性——定理只说「存在」这样的网络，但不保证梯度下降能找到它，可能需要指数级数据。②不保证效率——浅层网络可能需要指数级宽度，而深层网络用线性宽度就能达到同样效果。这解释了为什么「深度」比「宽度」更有效。③不保证优化——损失函数非凸，梯度下降可能陷入局部最小值或鞍点。④实际泛化——定理只保证训练集上的逼近能力，不保证测试集上的泛化。",
    tags: ["万能逼近定理", "表达能力", "深度vs宽度", "局限性"],
  },
  {
    id: "dlt-deep-networks-4",
    chapter: "dlt-deep-networks",
    level: 3,
    question: "梯度消失和梯度爆炸的原因是什么？有哪些解决方案？",
    answer:
      "原因：反向传播通过链式法则将各层梯度相乘。delta^(l) = (W^(l+1))^T · delta^(l+1) · sigma'(z^(l))。当各层 |W·sigma'| < 1 时梯度指数衰减（梯度消失），浅层参数几乎不更新；当 |W·sigma'| > 1 时梯度指数增长（梯度爆炸），训练发散。Sigmoid/Tanh 在饱和区导数接近零是梯度消失的主因。解决方案：①激活函数——用 ReLU（正区梯度恒为 1）替代 Sigmoid/Tanh。②残差连接——h^(l+1) = F(h^(l)) + h^(l)，梯度可通过加法通路直接回传，不受乘法链影响。这是 ResNet 能训练上百层的关键。③归一化——BatchNorm/LayerNorm 归一化激活值使梯度更稳定。④梯度裁剪——当梯度范数超阈值时缩放防爆炸。⑤门控机制——LSTM/GRU 的门控提供梯度直接通路。⑥权重初始化——Xavier/He 初始化使各层激活值方差一致。",
    tags: ["梯度消失", "梯度爆炸", "ReLU", "残差连接", "BatchNorm"],
  },
];
