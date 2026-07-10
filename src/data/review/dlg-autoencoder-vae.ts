import { ReviewQuestion } from "./types";

export const dlgAutoencoderVaeQuestions: ReviewQuestion[] = [
  {
    id: "dlg-autoencoder-vae-1",
    chapter: "dlg-autoencoder-vae",
    level: 1,
    question: `自编码器（AE）的基本结构是什么？它能用于生成吗？`,
    answer:
      `自编码器由编码器和解码器两部分组成。编码器将输入 x 映射到低维隐向量 z = Encoder(x)，解码器将隐向量重建为 x' = Decoder(z)。训练目标是最小化重建误差 ||x - x'||^2。AE 的作用是学习数据的压缩表示（降维），可用于去噪、特征提取。但标准 AE 不能直接用于生成——因为隐空间不是连续的概率分布，而是确定性映射。从隐空间随机采样 z 不能保证解码出有意义的样本（隐空间可能不连续、有空洞）。AE 的隐向量 z 只是对训练数据的精确编码，没有学习到数据的分布结构。`,
    tags: ["自编码器", "编码器", "解码器"],
  },
  {
    id: "dlg-autoencoder-vae-2",
    chapter: "dlg-autoencoder-vae",
    level: 2,
    question: `VAE 与 AE 的关键区别是什么？重参数化技巧的作用是什么？`,
    answer:
      `VAE 与 AE 的关键区别：①概率隐空间——AE 的 z 是确定性编码，VAE 的 z 是概率分布（编码器输出均值 mu 和方差 sigma，z 从 N(mu, sigma^2) 采样）。②损失函数——AE 只有重建损失，VAE 增加了 KL 散度项，迫使隐空间接近标准正态分布 N(0,I)。③生成能力——AE 不能生成新样本（隐空间不连续），VAE 可以从 N(0,I) 采样 z 并解码生成新样本（隐空间连续可插值）。重参数化技巧的作用：直接从 N(mu, sigma^2) 采样 z 不可微分（采样操作有随机性，无法反向传播梯度）。重参数化将采样改写为 z = mu + sigma * eps，其中 eps ~ N(0, I)。这样梯度可以通过 mu 和 sigma 传播，而随机性被转移到 eps 上（eps 不需要梯度），使整个模型可以端到端训练。`,
    tags: ["VAE", "重参数化", "KL散度"],
  },
  {
    id: "dlg-autoencoder-vae-3",
    chapter: "dlg-autoencoder-vae",
    level: 2,
    question: `VAE 的损失函数是什么？每一项的作用是什么？`,
    answer:
      `VAE 的损失函数（ELBO 的负数）= 重建损失 + KL 散度。①重建损失 = E_{q(z|x)}[log P(x|z)]——衡量解码器从采样的 z 重建原始输入 x 的能力。通常用交叉熵（二值图像）或均方误差（连续图像）。这一项确保模型能准确重建训练数据。②KL 散度 = KL(q(z|x) || N(0,I))——衡量编码器输出的后验分布 q(z|x)（即 N(mu, sigma^2)）与先验标准正态分布 N(0,I) 的差异。这一项起正则化作用：迫使隐空间接近标准正态分布，使隐空间连续、无空洞，从而能从 N(0,I) 采样生成有意义的新样本。两项的权衡：重建损失保证保真度，KL 散度保证生成能力。如果 KL 权重过大，重建模糊；如果过小，隐空间退化（类似 AE 不能生成）。beta-VAE 通过调节 KL 权重 beta 控制隐空间的解耦程度。`,
    tags: ["VAE损失", "重建损失", "KL散度", "ELBO"],
  },
  {
    id: "dlg-autoencoder-vae-4",
    chapter: "dlg-autoencoder-vae",
    level: 3,
    question: `VAE 生成图像通常模糊的原因是什么？有哪些改进方向？`,
    answer:
      `VAE 生成图像模糊的原因：①损失函数特性——重建损失（MSE 或交叉熵）对所有像素等权，模型倾向于生成「平均」图像来最小化期望损失，导致模糊。②高斯假设——VAE 假设 P(x|z) 是高斯分布（或伯努利分布），对复杂图像细节的建模能力有限。③后验坍缩——当解码器足够强大时，KL 散度项可能被忽略（q(z|x) 退化为先验），隐空间不携带信息。④采样噪声——从 q(z|x) 采样 z 引入噪声，解码器需要「平均」多种可能的 z，导致输出模糊。改进方向：①VQ-VAE——用离散隐空间替代连续采样，避免重参数化的模糊问题。②扩散模型——将生成分解为多步去噪，每步只需做微小修正，大幅提升生成质量。③引入对抗损失——VAE-GAN 结合 GAN 的判别器提升细节锐度。④层次化 VAE——多层级隐变量建模更复杂的数据分布。`,
    tags: ["VAE模糊", "改进方向", "VQ-VAE"],
  },
];
