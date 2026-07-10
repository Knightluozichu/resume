import { ReviewQuestion } from "./types";

export const idlLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "idl-learning-map-1",
    chapter: "idl-learning-map",
    level: 1,
    question: `《图解深度学习》的知识体系如何分层？每层包含哪些章节和核心内容？`,
    answer:
      `知识体系分为四层：①基础层（ch1 神经网络基础 + ch2 前向传播与激活函数 + ch3 反向传播算法）——涵盖感知机/激活函数、前向传播计算流程、链式法则与梯度下降，是理解所有后续内容的前提；②核心网络层（ch4 卷积神经网络 + ch5 循环神经网络）——涵盖卷积/池化/经典 CNN 架构、RNN/LSTM/GRU 与序列建模，是深度学习的两大支柱网络；③进阶层（ch6 正则化与优化 + ch7 生成模型与自编码器）——涵盖 L2/Dropout/BatchNorm/优化器、自编码器/VAE/GAN，是提升泛化与生成能力的关键；④实践与整合层（ch8 深度学习应用实践 + ch9 全书复习与知识整合）——涵盖 CV/NLP/语音应用和端到端知识串联，是从理论走向工程的桥梁。`,
    tags: ["知识体系", "四层架构", "学习路径"],
  },
  {
    id: "idl-learning-map-2",
    chapter: "idl-learning-map",
    level: 2,
    question: `十章的学习路径和章节依赖关系是怎样的？`,
    answer:
      `学习路径：ch0 学习地图 → ch1 神经网络基础 → ch2 前向传播 → ch3 反向传播 → ch4 CNN → ch5 RNN → ch6 正则化与优化 → ch7 生成模型 → ch8 应用实践 → ch9 全书复习。依赖关系：ch1 无前置依赖（神经网络入门）；ch2 依赖 ch1（前向传播需理解感知机和网络结构）；ch3 依赖 ch2（反向传播需理解前向传播的计算流程）；ch4 依赖 ch3（CNN 的训练用反向传播）；ch5 依赖 ch3（RNN 的训练也用反向传播的变体 BPTT）；ch6 依赖 ch4-ch5（正则化和优化针对深层网络）；ch7 依赖 ch3+ch6（生成模型基于神经网络和优化技术）；ch8 依赖 ch4-ch7（应用实践需掌握各类模型）；ch9 依赖全部（端到端整合）。`,
    tags: ["学习路径", "章节依赖", "知识链路"],
  },
  {
    id: "idl-learning-map-3",
    chapter: "idl-learning-map",
    level: 2,
    question: `深度学习与传统机器学习的核心区别是什么？本书如何衔接两者？`,
    answer:
      `核心区别：①特征工程——传统 ML 需要人工提取特征（如 SIFT/HOG），深度学习通过端到端训练自动学习特征表示，这是 DL 最根本的优势；②模型复杂度——传统 ML 模型（SVM/决策树）参数少，适合中小数据集；DL 模型参数可达亿级，需要大数据和 GPU 算力；③性能上限——DL 在图像/语音/自然语言等感知任务上远超传统 ML，但在表格数据上传统 ML（如 XGBoost）仍有竞争力。衔接方式：本书在 ch1 神经网络基础中从感知机出发（与 ML 的线性模型对接），ch3 反向传播对应 ML 的梯度下降，ch6 正则化与优化直接继承 ML 的正则化思想（L2/Dropout 对应 Ridge/Lasso），形成从 ML 到 DL 的自然过渡。`,
    tags: ["深度学习", "机器学习", "特征工程", "对比"],
  },
  {
    id: "idl-learning-map-4",
    chapter: "idl-learning-map",
    level: 3,
    question: `本书的十章内容如何体现深度学习从基础到前沿的发展脉络？`,
    answer:
      `十章内容映射了深度学习的历史发展脉络：①基础期（ch1-ch3）——对应 1958 年感知机到 1986 年反向传播算法的提出，解决了神经网络「能不能训练」的问题；②网络架构期（ch4-ch5）——对应 1998 年 LeNet 到 2014 年 LSTM，CNN 解决视觉空间特征提取，RNN 解决序列时序建模，是深度学习两大基础架构；③训练优化期（ch6）——对应 2012 年 AlexNet 引爆深度学习后，Dropout/BatchNorm/Adam 等技术解决「如何训练更深的网络」的问题；④生成模型期（ch7）——对应 2014 年 GAN 到 2017 年 VAE，从判别模型走向生成模型，解决「如何创造新内容」的问题；⑤应用与统一期（ch8-ch9）——对应 Transformer 统一各领域、大模型时代，展示 DL 在 CV/NLP/语音的广泛应用和未来趋势。这条脉络帮助读者理解每个技术为什么出现、解决了什么问题。`,
    tags: ["发展脉络", "技术演进", "知识整合"],
  },
];
