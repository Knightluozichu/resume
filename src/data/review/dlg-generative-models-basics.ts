import { ReviewQuestion } from "./types";

export const dlgGenerativeModelsBasicsQuestions: ReviewQuestion[] = [
  {
    id: "dlg-generative-models-basics-1",
    chapter: "dlg-generative-models-basics",
    level: 1,
    question: `什么是生成模型？它与判别模型有什么本质区别？`,
    answer:
      `生成模型是一类学习数据分布 P(x)（或联合分布 P(x,y)）的机器学习模型，能够从学习到的分布中采样生成新样本。判别模型学习条件分布 P(y|x)——给定输入 x 预测标签 y。本质区别：判别模型关注「如何区分」不同类别（学习决策边界），生成模型关注「数据长什么样」（学习数据分布）。举例：对于猫狗图片，判别模型学会区分猫和狗（输出标签），生成模型学会猫和狗各自长什么样（能生成新图片）。生成模型可以做判别模型能做的事（通过贝叶斯定理 P(y|x) = P(x,y)/P(x)），反之不行。`,
    tags: ["生成模型", "判别模型", "概率分布"],
  },
  {
    id: "dlg-generative-models-basics-2",
    chapter: "dlg-generative-models-basics",
    level: 2,
    question: `生成模型的核心目标是什么？如何形式化描述？`,
    answer:
      `生成模型的核心目标是学习一个模型分布 P_model(x)，使其尽可能逼近真实数据分布 P_data(x)。形式化：给定训练集 {x_1, ..., x_n}（假设从 P_data 独立采样），找到模型参数 theta 使 P_model(x; theta) 最接近 P_data(x)。常用方法：①最大似然估计——最大化 log P_model(x_i; theta) 的平均，等价于最小化 KL(P_data || P_model)。②显式密度——VAE 用变分下界（ELBO）近似，流模型用变量替换精确计算。③隐式密度——GAN 不显式建模 P(x)，而是通过对抗训练让生成样本分布逼近数据分布。④迭代采样——扩散模型通过逐步去噪近似数据分布。训练好后，从 P_model 采样即可生成新样本。`,
    tags: ["核心目标", "最大似然", "概率建模"],
  },
  {
    id: "dlg-generative-models-basics-3",
    chapter: "dlg-generative-models-basics",
    level: 2,
    question: `生成模型家族分为哪几大类？各自的特点是什么？`,
    answer:
      `生成模型家族分为四大类：①显式密度模型——VAE 和流模型。VAE 用变分推断优化 ELBO 下界（不精确但有理论保证），流模型用可逆变换精确计算对数似然（精确但架构受限）。②隐式密度模型——GAN。不显式建模 P(x)，通过生成器-判别器对抗博弈让生成分布逼近数据分布，生成质量高但训练不稳定。③迭代采样模型——扩散模型。通过前向加噪和反向去噪过程学习生成，训练稳定且质量最高，但采样速度慢（需多步迭代）。④条件生成——在上述模型基础上引入条件信息（如文本、类别），实现可控生成，文生图是典型应用。各类模型的权衡：质量 vs 稳定性 vs 速度 vs 精确性。`,
    tags: ["生成模型家族", "显式密度", "隐式密度"],
  },
  {
    id: "dlg-generative-models-basics-4",
    chapter: "dlg-generative-models-basics",
    level: 3,
    question: `为什么生成模型通常从噪声 z 采样开始？噪声分布的作用是什么？`,
    answer:
      `生成模型从噪声 z 采样开始的原因：①可控生成——噪声 z ~ N(0, I) 是一个已知的、易于采样的简单分布。模型学习一个映射 G(z) 将简单分布变换为复杂的数据分布 P_data(x)，这个过程是「从简单到复杂」的变换。②数学便利——高斯分布有良好的数学性质（可微分、解析概率密度），使得最大似然训练和梯度优化可行。③隐空间结构——z 的每个维度可以编码数据的某种语义特征（如姿态、颜色、形状），通过在隐空间中插值或操纵可以实现可控生成。④多样性——不同的 z 采样产生不同的生成样本，自然地提供了生成多样性。VAE、GAN、流模型和扩散模型都采用了这一范式：学习从噪声空间到数据空间的映射，区别在于映射的参数化方式和训练目标不同。`,
    tags: ["噪声采样", "隐空间", "生成过程"],
  },
];
