import { ReviewQuestion } from "./types";

export const dlgTextToImageQuestions: ReviewQuestion[] = [
  {
    id: "dlg-text-to-image-1",
    chapter: "dlg-text-to-image",
    level: 1,
    question: `文本到图像生成的基本流程是什么？文本条件如何注入生成模型？`,
    answer:
      `文本到图像生成的基本流程：①文本输入——用户输入文本描述（如「一只猫坐在月亮上」）。②文本编码——用预训练的文本编码器（CLIP 文本编码器、T5、BERT 等）将文本映射为嵌入向量 c。③条件生成——将文本嵌入 c 作为条件注入生成模型（通常用扩散模型），从噪声 z_T 开始逐步去噪生成图像。④输出生成图像——与文本描述语义匹配的图像。文本条件注入的主要方法：①交叉注意力（Cross-Attention）——在 U-Net 的中间层加入交叉注意力模块，文本嵌入作为 Key 和 Value，图像特征作为 Query，使图像生成在每一步都「关注」文本描述的对应部分。这是 Stable Diffusion 的核心方法。②条件归一化（AdaBN）——用文本嵌入调制 BatchNorm 的缩放和偏移参数，全局控制生成风格。③无分类器引导（Classifier-Free Guidance）——训练时随机丢弃条件（以一定概率用无条件替代有条件），推理时用条件和无条件预测的差值放大文本引导强度，显著提升文本-图像匹配度。`,
    tags: ["文生图", "条件生成", "交叉注意力"],
  },
  {
    id: "dlg-text-to-image-2",
    chapter: "dlg-text-to-image",
    level: 2,
    question: `CLIP 模型在文本到图像生成中起什么作用？为什么它适合做文本编码器？`,
    answer:
      `CLIP（Contrastive Language-Image Pre-training）是 OpenAI 提出的多模态模型，通过对比学习将文本和图像映射到同一嵌入空间。在文生图中的作用：①文本编码器——CLIP 的文本编码器将用户输入的文本映射为语义丰富的嵌入向量，作为扩散模型的条件输入。②语义对齐——CLIP 在 4 亿图文对上训练，学到的文本嵌入与图像语义高度对齐，使生成模型能准确理解文本描述的含义。③评估——CLIP Score 可评估生成图像与文本的语义匹配度。CLIP 适合做文本编码器的原因：①跨模态对齐——CLIP 的对比学习目标迫使文本和对应图像在嵌入空间中靠近，文本编码器天然学会了「描述图像」的能力。②泛化性强——在大规模数据上预训练，CLIP 对未见过的文本描述也有良好的泛化。③语义连续——CLIP 嵌入空间是连续的，语义相近的文本嵌入也相近，有利于生成模型的条件注入。Stable Diffusion 1.x 用 CLIP 文本编码器，SD 2.0+ 和 Imagen 改用更强的 T5/CLIP 组合。`,
    tags: ["CLIP", "文本编码器", "多模态"],
  },
  {
    id: "dlg-text-to-image-3",
    chapter: "dlg-text-to-image",
    level: 2,
    question: `潜在扩散模型（Latent Diffusion / Stable Diffusion）是如何工作的？为什么在隐空间扩散比在像素空间扩散更好？`,
    answer:
      `潜在扩散模型（LDM）工作流程：①训练自编码器——先用 VAE/GAN 训练一个图像压缩自编码器，将 512x512x3 的图像压缩到 64x64x4 的隐空间表示（压缩比约 48:1）。②在隐空间训练扩散模型——前向加噪和反向去噪都在 64x64x4 的隐空间进行，而非原始像素空间。③生成——从隐空间噪声 z_T 开始逐步去噪得到隐表示 z_0，再用解码器将 z_0 解码为最终图像。在隐空间扩散的优势：①计算效率——隐空间维度远低于像素空间（64*64*4=16384 vs 512*512*3=786432），每步去噪的计算量减少约 48 倍，使训练和推理都大幅加速。②感知质量——自编码器过滤了高频像素噪声，隐空间只保留感知上有意义的语义信息，扩散模型在更「干净」的空间上学习，生成质量更高。③灵活性——隐空间是统一的低维表示，易于引入条件信息（文本、布局、深度图等）。Stable Diffusion 是 LDM 的开源实现，是文生图领域最重要的模型之一，证明了隐空间扩散的实用性和可扩展性。`,
    tags: ["潜在扩散", "Stable Diffusion", "隐空间"],
  },
  {
    id: "dlg-text-to-image-4",
    chapter: "dlg-text-to-image",
    level: 3,
    question: `无分类器引导（Classifier-Free Guidance）是什么？它如何提升文本到图像生成的质量？`,
    answer:
      `无分类器引导（CFG）是一种在推理时增强条件信号的技术。训练阶段：以一定概率（如 10%）随机丢弃条件——模型同时学习条件生成 epsilon_theta(x_t, t, c) 和无条件生成 epsilon_theta(x_t, t, None)。推理阶段：用条件和无条件预测的差值放大条件引导：eps_guided = eps_uncond + w * (eps_cond - eps_uncond)，其中 w 是引导强度（guidance scale，通常 7-15）。原理：eps_cond - eps_uncond 度量了「条件信号的方向」。沿这个方向放大（乘以 w > 1）使生成结果更强烈地遵循文本描述，代价是减少多样性。CFG 提升质量的原因：①增强文本遵循度——大的 w 使生成图像更精确地匹配文本描述（如「红色汽车」一定生成红色汽车而非任意颜色）。②简化训练——不需要像分类器引导（Classifier Guidance）那样额外训练一个噪声分类器，只需训练一个同时支持条件和无条件的扩散模型。③可控权衡——w=1 时为标准条件生成（高多样性），w 大时为强引导（高质量、低多样性），用户可按需调节。CFG 是现代文生图模型（Stable Diffusion、DALL-E 2、Imagen）的标准配置，是让文本到图像生成「听话」的关键技术。`,
    tags: ["无分类器引导", "CFG", "引导强度"],
  },
];
