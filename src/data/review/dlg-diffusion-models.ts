import { ReviewQuestion } from "../types";

export const dlgDiffusionModelsQuestions: ReviewQuestion[] = [
  {
    id: "dlg-diffusion-models-1",
    chapter: "dlg-diffusion-models",
    level: 1,
    question: "扩散模型的基本原理是什么？前向过程和反向过程分别做什么？",
    answer:
      "扩散模型由前向过程和反向过程组成。前向过程（加噪）：从原始数据 x_0 开始，逐步添加高斯噪声，经过 T 步后得到纯噪声 x_T。每一步的转移为 q(x_t|x_{t-1}) = N(sqrt(1-beta_t)*x_{t-1}, beta_t*I)，其中 beta_t 是预设的噪声调度（如线性从 0.0001 到 0.02）。前向过程是固定的（无需学习），且可以跳步直接计算 x_t = sqrt(alpha_bar_t)*x_0 + sqrt(1-alpha_bar_t)*eps（eps 是标准高斯噪声）。反向过程（去噪/生成）：从纯噪声 x_T 开始，学习一个神经网络逐步去噪，p_theta(x_{t-1}|x_t) = N(mu_theta(x_t,t), sigma_theta(x_t,t))，直到恢复出干净图像 x_0。反向过程是模型需要学习的——用神经网络参数化每一步的去噪分布。核心思想：将生成问题转化为去噪问题，每步只需做微小修正，降低了学习难度。",
    tags: ["扩散模型", "前向过程", "反向过程"],
  },
  {
    id: "dlg-diffusion-models-2",
    chapter: "dlg-diffusion-models",
    level: 2,
    question: "扩散模型的训练目标是什么？为什么预测噪声 epsilon 比直接预测 x_0 更好？",
    answer:
      "扩散模型的训练目标（DDPM 简化损失）：L = E_{t, x_0, eps}[||eps - eps_theta(x_t, t)||^2]。训练步骤：①从训练集采样 x_0。②随机采样时间步 t ~ Uniform(1,T)。③采样噪声 eps ~ N(0,I)。④计算加噪样本 x_t = sqrt(alpha_bar_t)*x_0 + sqrt(1-alpha_bar_t)*eps。⑤用神经网络 eps_theta 预测加入的噪声 eps。⑥最小化预测噪声与真实噪声的 MSE。为什么预测噪声而非直接预测 x_0：①数学等价性——从 x_t 和 eps 可以解析地求出 x_0 = (x_t - sqrt(1-alpha_bar_t)*eps) / sqrt(alpha_bar_t)，两者等价。②训练稳定性——预测噪声 eps 是预测一个零均值、单位方差的标准化量，网络输出范围稳定，易于优化。而直接预测 x_0 需要输出与图像像素同范围的值，不同时间步的目标分布差异大（t 大时 x_0 信息少，t 小时信息多），训练不稳定。③理论推导——从变分下界推导出的自然结果，重参数化使得损失函数简化为去噪 MSE。这个简化是 DDPM 成功的关键贡献之一。",
    tags: ["训练目标", "预测噪声", "DDPM"],
  },
  {
    id: "dlg-diffusion-models-3",
    chapter: "dlg-diffusion-models",
    level: 2,
    question: "扩散模型的噪声调度（Noise Schedule）是什么？它如何影响生成质量？",
    answer:
      "噪声调度定义了前向过程中每一步添加的噪声量 beta_t（或等价的 alpha_t = 1 - beta_t, alpha_bar_t = prod alpha_i）。常见调度：①线性调度——beta_t 从 beta_1=0.0001 线性增长到 beta_T=0.02（DDPM 原始论文），T=1000。前期间隔小、后期间隔大。②余弦调度——alpha_bar_t 按余弦曲线衰减，使噪声增长更均匀，改善高分辨率图像生成。③学习式调度——将 beta_t 作为可学习参数优化。噪声调度的影响：①生成质量——如果后期噪声太大，模型难以恢复细节；如果前期噪声太小，模型学不到全局结构。余弦调度在多种数据集上优于线性调度。②采样速度——较大的 beta_t 步长可以用更少的步数完成前向/反向过程，加速采样。③信息保留——alpha_bar_t 度量了在步骤 t 时原始数据保留的比例。当 alpha_bar_t 接近 0 时，x_T 几乎是纯噪声。噪声调度是扩散模型的重要超参数，不同的调度适合不同的数据类型和分辨率。",
    tags: ["噪声调度", "线性调度", "余弦调度"],
  },
  {
    id: "dlg-diffusion-models-4",
    chapter: "dlg-diffusion-models",
    level: 3,
    question: "扩散模型相比 GAN 和 VAE 有什么优势？它的主要缺点是什么？有哪些加速采样的方法？",
    answer:
      "扩散模型的优势：①训练稳定——优化明确的去噪 MSE 损失，无 GAN 的对抗博弈困境（模式崩溃、训练不稳定、梯度消失）。②生成质量高——多步迭代去噪使每步只需做微小修正，生成质量超越 GAN（尤其是高分辨率图像）。③多样性好——从纯噪声采样天然覆盖整个数据分布，不像 GAN 容易模式崩溃。④理论优美——基于非平衡热力学的变分推断，有坚实的理论基础。⑤灵活的条件化——易于引入文本、类别等条件信息（通过交叉注意力注入）。主要缺点：采样速度慢——生成一张图像需要 T 步迭代（T=1000），每步都要跑一次 U-Net 前向传播，比 GAN 的单次前向慢数百倍。加速采样的方法：①DDIM（Denoising Diffusion Implicit Models）——修改反向过程为非马尔可夫，允许跳步采样，50 步即可接近 1000 步质量。②DPM-Solver——基于扩散 ODE 的高阶求解器，10-20 步即可生成高质量图像。③潜在扩散（Latent Diffusion / Stable Diffusion）——在压缩的隐空间而非像素空间扩散，大幅降低每步计算量。④一致性模型（Consistency Models）——将扩散过程蒸馏为单步生成模型，实现一步采样。这些方法使扩散模型的采样速度提升数百倍，接近实时生成。",
    tags: ["扩散模型优势", "采样加速", "DDIM", "潜在扩散"],
  },
];
