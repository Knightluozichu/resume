import { ReviewQuestion } from "./types";

export const DlgDcganQuestions: ReviewQuestion[] = [
  {
    id: "dlg-dcgan-1",
    chapter: "dlg-dcgan",
    level: 1,
    question: `DCGAN 与原始 GAN 的主要区别是什么？为什么用卷积替代全连接层？`,
    answer:
      `DCGAN（Deep Convolutional GAN）是将卷积神经网络引入 GAN 的架构。与原始 GAN 的主要区别：①生成器用转置卷积（ConvTranspose2d）逐步上采样——从 4x4 特征图逐步放大到目标分辨率（如 64x64），而非全连接层映射。②判别器用步长卷积（stride=2）替代池化下采样——让网络自己学习下采样方式。③使用 BatchNorm 稳定训练——生成器除输出层外都用 BN，判别器除输入层外都用 BN。④激活函数——生成器用 ReLU（输出层用 Tanh），判别器用 LeakyReLU（斜率 0.2）。用卷积替代全连接的原因：①参数效率——卷积共享权重，参数量远少于全连接，适合高维图像。②空间结构——卷积保留图像的空间局部性，能学习边缘、纹理等层次化特征。③训练效果——卷积架构使 GAN 训练更稳定，生成质量显著提升。DCGAN 是首个成功生成高质量图像的 GAN 架构，奠定了后续 StyleGAN 等模型的基础。`,
    tags: ["DCGAN", "卷积", "架构设计"],
  },
  {
    id: "dlg-dcgan-2",
    chapter: "dlg-dcgan",
    level: 2,
    question: `DCGAN 生成器的架构是怎样的？数据从噪声到图像的维度变化过程是什么？`,
    answer:
      `DCGAN 生成器架构（以 64x64x3 图像为例）：①输入——噪声 z（100 维向量，从 N(0,I) 采样）。②投影+Reshape——线性投影到 4x4x1024 的特征图（将 100 维向量投影到 4*4*1024=16384 维，reshape 为 4x4x1024）。③转置卷积层 1——ConvTranspose2d(1024, 512, kernel=4, stride=2, padding=1) + BatchNorm + ReLU → 8x8x512。④转置卷积层 2——ConvTranspose2d(512, 256, ...) + BN + ReLU → 16x16x256。⑤转置卷积层 3——ConvTranspose2d(256, 128, ...) + BN + ReLU → 32x32x128。⑥转置卷积层 4——ConvTranspose2d(128, 3, ...) + Tanh → 64x64x3（RGB 图像）。维度变化：100 → 4x4x1024 → 8x8x512 → 16x16x256 → 32x32x128 → 64x64x3。每层 stride=2 的转置卷积使空间尺寸翻倍。Tanh 将输出归一化到 [-1, 1]（训练时图像也归一化到 [-1, 1]）。`,
    tags: ["生成器架构", "转置卷积", "上采样"],
  },
  {
    id: "dlg-dcgan-3",
    chapter: "dlg-dcgan",
    level: 2,
    question: `DCGAN 的训练流程是怎样的？判别器和生成器如何交替训练？`,
    answer:
      `DCGAN 训练流程（每个 iteration）：①训练判别器 D——a. 从训练集采样一批真实数据 x_real。b. 从 N(0,I) 采样噪声 z，用 G 生成假数据 x_fake = G(z)。c. 计算 D 的损失：L_D = -[log D(x_real) + log(1 - D(x_fake))]（二元交叉熵，真实标签 1，假标签 0）。d. 对 D 的参数做一步梯度下降（冻结 G）。②训练生成器 G——a. 从 N(0,I) 采样新噪声 z，生成 x_fake = G(z)。b. 计算 G 的损失（非饱和损失）：L_G = -log D(G(z))（让 D 将假数据判为真）。c. 对 G 的参数做一步梯度下降（冻结 D）。优化器通常用 Adam（lr=0.0002, beta1=0.5, beta2=0.999）。交替训练的关键：保持 D 和 G 的能力大致均衡。如果 D 太强，G 的梯度消失；如果 G 太强，D 无法提供有效反馈。实践中可以每训练 D 一次训练 G 一次，或根据损失动态调整训练比例。`,
    tags: ["训练流程", "交替训练", "Adam优化器"],
  },
  {
    id: "dlg-dcgan-4",
    chapter: "dlg-dcgan",
    level: 3,
    question: `DCGAN 中 BatchNorm 的作用是什么？为什么生成器输出层和判别器输入层不用 BatchNorm？`,
    answer:
      `BatchNorm 的作用：①稳定训练——BN 对每层输入做归一化（减均值除标准差），缓解内部协变量偏移，使每层输入分布稳定，允许使用更大的学习率。②缓解模式崩溃——BN 引入的小批量统计量使生成器不能只针对单个样本优化，间接鼓励多样性。③梯度传播——BN 使梯度更平滑，缓解 GAN 训练中的梯度消失/爆炸问题。生成器输出层不用 BN 的原因：输出层需要精确控制生成图像的像素值范围（Tanh 归一化到 [-1,1]）。BN 会引入批量统计噪声到最终输出，破坏生成图像的精确性。此外，输出层需要保留样本间的差异（不同的 z 生成不同的图像），BN 的归一化会削弱这种差异。判别器输入层不用 BN 的原因：输入层直接接收原始图像像素，BN 会改变原始数据分布，可能丢失判别所需的关键信息。此外，判别器需要区分真实图像和生成图像的细微差异，输入层的 BN 可能使两种图像的统计特征趋同，降低判别能力。这一设计经验被后续 GAN 变体广泛采用。`,
    tags: ["BatchNorm", "训练稳定", "DCGAN设计"],
  },
];
