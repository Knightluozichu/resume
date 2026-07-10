import { ReviewQuestion } from "./types";

export const iaiFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "iai-final-review-1",
    chapter: "iai-final-review",
    level: 1,
    question: `全书十章的知识金字塔如何分层？每层的核心知识点和章节是什么？`,
    answer:
      `知识金字塔分四层：①基础层（ch1 AI 发展史 + ch2 搜索与优化）——核心知识点：符号主义 vs 连接主义两大范式、三次浪潮与两次寒冬、AI 四层定义、搜索五要素、BFS/DFS/UCS/IDS、A* 评估函数 f(n)=g(n)+h(n)、Minimax+Alpha-Beta 剪枝、MCTS。这是早期 AI 的两大支柱，建立了 AI 的历史脉络和搜索思维。②核心层（ch3 机器学习 + ch4 深度学习）——核心知识点：监督/无监督/强化三范式、分类与回归、评估指标（准确率/精确率/召回率/F1）、偏差-方差权衡、过拟合与正则化、神经网络结构、前向传播与反向传播（链式法则）、激活函数（ReLU/Sigmoid/Softmax）、CNN/RNN/Transformer 三大架构、梯度消失与残差连接。这是现代 AI 的引擎。③应用层（ch5 NLP + ch6 CV + ch7 RL）——核心知识点：分词与词嵌入、Word2Vec 语义类比、Transformer 自注意力、预训练+微调、CNN 卷积/池化、分类/检测/分割三大任务、MDP 五元组、贝尔曼方程、Q-learning/DQN、策略梯度/PPO、探索与利用。这是 AI 落地的三大领域。④展望层（ch8 伦理 + ch9 整合）——核心知识点：公平/透明/隐私/安全/对齐五大支柱、RLHF、当前风险与长期挑战、三层治理路径。这是负责任 AI 的保障。`,
    tags: ["知识金字塔", "基础层", "核心层", "应用层", "展望层", "知识整合"],
  },
  {
    id: "iai-final-review-2",
    chapter: "iai-final-review",
    level: 2,
    question: `跨章节的核心关联有哪些？请从搜索→ML→DL→NLP/CV→RL→伦理梳理知识链路。`,
    answer:
      `跨章节关联：①搜索→ML：A* 是启发式搜索（在状态空间中找最优路径），ML 的超参数搜索本质也是优化问题（在参数空间中找最优参数）。搜索是早期 AI 的核心方法（符号主义路线），ML 是从数据中自动学习——两者是 AI 实现手段的演进，搜索偏手工设计启发函数，ML 偏数据驱动。②ML→DL：深度学习是机器学习的子集，用多层神经网络自动提取特征，解决了传统 ML 需要人工特征工程的瓶颈。反向传播 = 链式法则计算梯度 + 梯度下降更新权重，是连接 ML（优化目标函数）和 DL（深层网络训练）的桥梁。③DL→NLP/CV：Transformer 和 CNN 分别是 NLP 和 CV 的核心架构。两者都用深度学习自动学习表示，但针对不同模态设计了不同归纳偏置——CNN 利用图像局部性和平移不变性（卷积+池化），Transformer 利用序列的全局依赖（自注意力）。ViT 正在模糊两者边界（将 Transformer 用于视觉）。④RL→伦理：RLHF（人类反馈强化学习）是价值对齐的关键技术——用人类对 AI 输出的偏好训练奖励模型，再用强化学习（PPO）优化 AI 行为。AlphaGo 的 RL 自对弈思想（通过试错超越人类经验）被迁移到对齐训练中（让 AI 行为对齐人类期望）。整条链路：搜索（手动启发）→ ML（数据学习）→ DL（自动特征）→ NLP/CV（具体应用）→ RL（序列决策）→ 伦理（价值对齐），体现了 AI 从「人工设计规则」到「数据驱动学习」再到「负责任部署」的完整演进。`,
    tags: ["跨章节关联", "知识链路", "搜索", "ML", "DL", "NLP", "CV", "RL", "伦理"],
  },
  {
    id: "iai-final-review-3",
    chapter: "iai-final-review",
    level: 3,
    question: `列出全书的核心公式及其含义。`,
    answer:
      `全书核心公式：①f(n) = g(n) + h(n)（ch2 搜索）——A* 算法的评估函数，g(n) 是起点到 n 的实际代价，h(n) 是 n 到目标的启发估计，h 可采纳时保证最优。②F1 = 2PR/(P+R)（ch3 ML）——F1 分数，精确率 P 和召回率 R 的调和均值，适用于类别不平衡场景。③L = -sum(y*log(p))（ch3 ML）——交叉熵损失，衡量预测分布 p 与真实分布 y 的差异，是分类任务的标准损失函数。④W -= lr * dL/dW（ch4 DL）——梯度下降权重更新，lr 是学习率，dL/dW 是损失对权重的梯度（由反向传播计算）。⑤Attention(Q,K,V) = softmax(QK^T/sqrt(d)) * V（ch4/ch5）——Transformer 自注意力，Q/K/V 分别是查询/键/值矩阵，sqrt(d) 防止点积过大。⑥输出 = (W-K+2P)/S+1（ch6 CV）——卷积输出尺寸，W 输入尺寸/K 核尺寸/P 填充/S 步长。⑦IoU = 交集面积/并集面积（ch6 CV）——交并比，语义分割评估指标。⑧V(s) = max_a [R(s,a) + gamma*E[V(s')]]（ch7 RL）——贝尔曼方程，当前状态价值 = 即时奖励 + 折扣后的后续状态价值，是 RL 算法推导的基础。`,
    tags: ["核心公式", "A*", "F1", "交叉熵", "梯度下降", "自注意力", "卷积输出", "IoU", "贝尔曼方程"],
  },
  {
    id: "iai-final-review-4",
    chapter: "iai-final-review",
    level: 4,
    question: `学完全书后应具备哪些能力？如何持续学习保持知识更新？`,
    answer:
      `学完全书后应具备四层能力：①认知层——理解 AI 三次浪潮和两次寒冬的历史脉络、符号主义与连接主义两大范式的核心差异、ML 与 DL 的本质区别（DL 自动提取特征）、AI/ML/DL 的包含关系。对应 ch1/ch3/ch4。②分析层——能评估模型性能：分类用准确率/精确率/召回率/F1，检测用 mAP，分割用 IoU/mIoU；理解偏差-方差权衡和过拟合/欠拟合的诊断与解决；理解梯度消失等问题。对应 ch3/ch6。③应用层——掌握 NLP（分词/嵌入/Transformer/预训练+微调）、CV（CNN/分类/检测/分割/迁移学习）、RL（MDP/Q-learning/DQN/PPO）的核心任务与代表模型，能根据场景选型和调优。对应 ch5/ch6/ch7。④思辨层——理解 AI 伦理五大支柱（公平/透明/隐私/安全/对齐）和当前风险（偏见/深度伪造/隐私/就业），能从技术（差分隐私/XAI/RLHF）、制度（审计/问责/分级监管）、文化（AI 素养/公众参与）三层思考治理路径。对应 ch8。持续学习建议：AI 领域发展极快，本书建立的是知识框架而非最新进展。①关注顶会论文——NeurIPS/ICML/ICLR（综合）、CVPR/ECCV/ICCV（视觉）、ACL/EMNLP（NLP）；②关注开源社区——Hugging Face（模型和数据集）、Papers With Code（论文+代码）；③动手实践——用 PyTorch/TensorFlow 复现经典模型，参加 Kaggle 竞赛；④关注技术博客——OpenAI/Google AI/Meta AI 等机构博客。在实践中持续更新知识。`,
    tags: ["能力地图", "认知", "分析", "应用", "思辨", "持续学习", "顶会"],
  },
];
