import { ReviewQuestion } from "../types";

export const dlsCnnQuestions: ReviewQuestion[] = [
  {
    id: "dls-cnn-1",
    chapter: "dls-cnn",
    level: 1,
    question: "卷积神经网络（CNN）相比全连接网络在处理图像时有哪些优势？为什么？",
    answer:
      "CNN 相比全连接网络的三大优势：①参数共享——同一个卷积核（滤波器）在图像的所有位置滑动使用相同的权重，大幅减少参数量。全连接层每个输入位置有独立权重，参数量随输入尺寸爆炸。②平移不变性——由于卷积核在整幅图上滑动，图像中某特征无论出现在哪个位置都能被同一个卷积核检测到。全连接层无法感知空间平移。③保留空间结构——卷积层保持输入的二维（H×W）结构，能捕获局部空间模式（边缘、角点、纹理）。全连接层将图像展平为一维向量，破坏了空间邻接关系。原因：图像数据具有局部相关性（相邻像素关系密切）和空间不变性（同一特征可能出现在不同位置），CNN 的卷积+池化设计正是为利用这两点而生。典型 CNN 结构：Conv→Pool→Conv→Pool→...→FC→softmax，前面的卷积层提取低级特征（边缘），后面的层组合出高级特征（物体部件）。",
    tags: ["CNN", "参数共享", "平移不变", "空间结构"],
  },
  {
    id: "dls-cnn-2",
    chapter: "dls-cnn",
    level: 2,
    question: "卷积运算的输出尺寸如何计算？填充（padding）和步幅（stride）各有什么作用？",
    answer:
      "卷积输出尺寸公式：OH = (H + 2P - FH) / S + 1，OW = (W + 2P - FW) / S + 1。其中 H/W 是输入高/宽，P 是填充量，FH/FW 是滤波器高/宽，S 是步幅。填充（padding）的作用：在输入周围补 0，控制输出尺寸。①当 P = (FH-1)/2（奇数滤波器）时，输出尺寸 = 输入尺寸，称为 same padding，保持空间大小不逐层缩小。②填充还能让边缘像素被滤波器充分处理，否则边缘像素只被卷积核访问一次。步幅（stride）的作用：控制滤波器滑动间隔。S=1 是逐像素滑动，S=2 是每隔一个像素滑动，输出尺寸减半。步幅用于下采样（替代池化层），减少计算量。实际使用：通常卷积层用 stride=1 + padding=same 保持尺寸，池化层用 stride=2 做下采样。需保证 (H + 2P - FH) 能被 S 整除，否则需要调整。CNN 的整体空间尺寸随网络深度逐渐减小（通过池化和步幅），通道数逐渐增加（通过更多卷积核）。",
    tags: ["卷积运算", "输出尺寸", "padding", "stride"],
  },
  {
    id: "dls-cnn-3",
    chapter: "dls-cnn",
    level: 2,
    question: "什么是 im2col？为什么用它优化卷积运算？它是如何工作的？",
    answer:
      "im2col（image to column）是一种将卷积运算转换为矩阵乘法的技术，用于高效实现卷积。为什么需要：原始卷积运算是嵌套 for 循环（遍历 batch、通道、输出位置、滤波器），Python 循环极慢。im2col 将卷积变为一次 np.dot 矩阵乘法，利用 NumPy/BLAS 的高效矩阵运算。工作原理：①对于输入数据 (N, C, H, W) 和滤波器 (FN, C, FH, FW)，im2col 将每个滑动窗口位置的 C×FH×FW 个元素展平为一行，所有输出位置排列为矩阵的行，得到展开矩阵 (N×OH×OW, C×FH×FW)。②滤波器也展平为 (C×FH×FW, FN) 的矩阵。③卷积运算变为一次矩阵乘法：output = np.dot(im2col_input, filter_col)，结果 (N×OH×OW, FN) 再 reshape 回 (N, FN, OH, OW)。代价：im2col 会消耗更多内存（展开后的矩阵远大于原始输入），但矩阵乘法的速度优势远超内存开销。本书用 im2col 实现了高效的 Convolution 层，是 CNN 实现的核心优化。",
    tags: ["im2col", "卷积优化", "矩阵乘法"],
  },
  {
    id: "dls-cnn-4",
    chapter: "dls-cnn",
    level: 3,
    question: "池化层的作用和特点是什么？Max Pooling 的反向传播如何实现？",
    answer:
      "池化层的作用和特点：①缩小空间尺寸——通常用 2×2 池化将 H×W 缩小为 H/2×W/2，减少计算量和参数。②无参数——池化层没有可学习参数（与卷积层不同）。③无通道变化——池化在通道维度独立操作，输入 N 个通道输出仍 N 个通道。④平移鲁棒性——微小平移后 max 值可能不变，增加对位置变化的容忍度。类型：Max Pooling（取窗口最大值，最常用）和 Average Pooling（取窗口平均值）。Max Pooling 的反向传播实现：前向传播时记录最大值的位置（每个池化窗口中最大值的位置索引），反向传播时将上游梯度只传给最大值位置，其余位置梯度为 0。代码思路：`def backward(self, dout): dmax = np.zeros_like(dout.flatten()); dmax[self.argmax] = dout.flatten(); return dmax.reshape(self.x.shape)`。直觉：max 操作的局部导数——对最大值位置导数为 1，其余为 0。池化层的反向传播比卷积层简单，因为每个窗口只有一个值被传递。",
    tags: ["池化层", "Max Pooling", "反向传播", "下采样"],
  },
];
