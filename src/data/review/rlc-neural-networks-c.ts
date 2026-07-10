import { ReviewQuestion } from "./types";

export const rlcNeuralNetworksCQuestions: ReviewQuestion[] = [
  {
    id: "rlc-neural-networks-c-1",
    chapter: "rlc-neural-networks-c",
    level: 1,
    question: `在C语言中如何用struct表示一个多层前馈神经网络？各字段的作用是什么？`,
    answer:
      `在C语言中用struct表示多层前馈神经网络，典型定义：\`typedef struct { int n_layers; int* sizes; double*** W; double** b; double** a; double** z; } NeuralNetwork;\`。各字段作用：①n_layers——网络层数（含输入输出层）。②sizes——每层神经元数量数组，如 \`{2,3,2}\` 表示输入2、隐藏3、输出2。③W——三维数组 \`W[layer][out_neuron][in_neuron]\`，存储层间权重矩阵，\`W[l][j][i]\` 是第l-1层第i个神经元到第l层第j个神经元的连接权重。④b——二维数组 \`b[layer][neuron]\`，每层的偏置向量。⑤a——二维数组 \`a[layer][neuron]\`，每层的激活值（前向传播时填充）。⑥z——二维数组 \`z[layer][neuron]\`，每层的加权和（激活前），反向传播时需要。C语言用三维指针动态分配内存，或用固定大小的二维数组（教学场景更常见，如 \`double W[MAX_LAYERS][MAX_NEURONS][MAX_NEURONS]\`）。相比Python的numpy数组，C语言需要手动管理内存和索引，但能直观看到「神经网络本质就是一堆矩阵和向量」。`,
    tags: ["C语言struct", "网络结构", "权重矩阵"],
  },
  {
    id: "rlc-neural-networks-c-2",
    chapter: "rlc-neural-networks-c",
    level: 2,
    question: `写出前向传播的计算过程，并用C语言实现单层的前向传播。`,
    answer:
      `前向传播逐层计算：对每一层l，先算加权和 \`z_l[j] = Σ_i W[l][j][i] * a_{l-1}[i] + b[l][j]\`，再过激活函数 \`a_l[j] = f(z_l[j])\`。从输入层开始，输入x作为a_0，逐层传播到输出层得到预测值ŷ。C语言实现单层前向传播：\`void forward_layer(double** W, double* b, double* a_prev, double* z, double* a, int n_in, int n_out, double (*act)(double)) { for (int j = 0; j < n_out; j++) { double sum = b[j]; for (int i = 0; i < n_in; i++) { sum += W[j][i] * a_prev[i]; } z[j] = sum; a[j] = act(sum); } }\`。激活函数作为函数指针传入，如sigmoid：\`double sigmoid(double x) { return 1.0 / (1.0 + exp(-x)); }\`。整网前向传播就是循环调用该函数。关键点：①这是纯矩阵乘法+逐元素激活，没有框架的黑盒。②保存z（激活前的加权和）供反向传播使用。③C语言中循环顺序影响缓存效率，j在外层i在内层更友好（行优先存储）。`,
    tags: ["前向传播", "C语言实现", "矩阵乘法"],
  },
  {
    id: "rlc-neural-networks-c-3",
    chapter: "rlc-neural-networks-c",
    level: 2,
    question: `对比Sigmoid、ReLU、Tanh三种激活函数的公式、特点和适用场景。`,
    answer:
      `三种激活函数对比：①Sigmoid——公式 \`σ(x) = 1/(1+e^{-x})\`，输出∈(0,1)。特点：平滑可导，适合输出概率。缺点：梯度消失（x绝对值大时导数趋近0，深层网络梯度无法回传）、输出非零均值（影响下一层输入分布）。适用场景：二分类输出层、早期浅层网络。C语言：\`1.0/(1.0+exp(-x))\`。②ReLU（Rectified Linear Unit）——公式 \`ReLU(x) = max(0, x)\`，输出∈[0,+∞)。特点：计算极简（C语言 \`x>0?x:0\`）、缓解梯度消失（正区间梯度恒为1）、稀疏激活（负区间输出0）。缺点：神经元死亡（负区间梯度为0，可能永久不更新）。适用场景：隐藏层（现代深度学习默认选择）。③Tanh——公式 \`tanh(x) = (e^x - e^{-x})/(e^x + e^{-x})\`，输出∈(-1,1)。特点：零均值（优于sigmoid）、仍存在梯度消失（但比sigmoid轻）。适用场景：隐藏层（RNN常用）、需要对称输出的场景。C语言：\`tanh(x)\`（math.h提供）。选择原则：隐藏层优先ReLU，输出层按任务选（二分类sigmoid，回归线性，多分类softmax）。`,
    tags: ["激活函数", "Sigmoid", "ReLU", "Tanh"],
  },
  {
    id: "rlc-neural-networks-c-4",
    chapter: "rlc-neural-networks-c",
    level: 3,
    question: `为什么神经网络需要非线性激活函数？如果用线性激活函数会发生什么？`,
    answer:
      `神经网络需要非线性激活函数的原因：如果所有层都用线性激活函数 \`f(x) = cx\`，那么无论多少层叠加，整个网络等价于一个单层线性变换。证明：设两层网络，第一层 \`z1 = W1·x + b1, a1 = c1·z1\`，第二层 \`z2 = W2·a1 + b2, a2 = c2·z2 = c2·(W2·(c1·(W1·x+b1)) + b2) = c1·c2·W2·W1·x + (c1·c2·W2·b1 + c2·b2)\`，这等价于一个单层 \`a2 = W'·x + b'\`，其中 \`W' = c1·c2·W2·W1\`。数学归纳可知任意层线性网络都坍缩为单层。后果：①表达能力被限制在线性可分问题，无法拟合XOR、复杂决策边界、连续控制等非线性任务。②增加层数毫无意义——深层线性网络 = 浅层线性网络，浪费计算。非线性激活（如ReLU、Sigmoid）打破了这个坍缩，使网络能逼近任意连续函数（万能逼近定理）。在本书中，RL的Q函数、策略函数通常是非线性的（如CartPole的状态-值映射），必须用非线性激活。这也是为什么C语言实现中激活函数是「灵魂」——一行 \`x>0?x:0\` 就赋予了网络非线性能力。`,
    tags: ["非线性", "线性坍缩", "万能逼近定理"],
  },
];
