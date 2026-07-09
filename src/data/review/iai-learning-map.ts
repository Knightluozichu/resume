import { ReviewQuestion } from "../types";

export const iaiLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "iai-learning-map-1",
    chapter: "iai-learning-map",
    level: 1,
    question: "《图解人工智能》的知识体系如何分层？每层包含哪些章节和核心内容？",
    answer:
      "知识体系分为四层：①基础层（ch1 AI 发展史与定义 + ch2 搜索与优化）——涵盖符号主义/连接主义范式、BFS/DFS/A*/博弈树等早期 AI 支柱；②核心层（ch3 机器学习基础 + ch4 深度学习入门）——涵盖监督/无监督/强化三范式、神经网络/反向传播/CNN/RNN，是现代 AI 引擎；③应用层（ch5 NLP + ch6 CV + ch7 RL）——涵盖分词/嵌入/Transformer、卷积/检测/分割、MDP/Q-learning/策略梯度，是 AI 落地的三大领域；④展望层（ch8 AI 伦理 + ch9 全书复习）——涵盖公平/透明/隐私/安全/对齐和端到端知识整合，是负责任 AI 的保障。",
    tags: ["知识体系", "四层架构", "学习路径", "章节依赖"],
  },
  {
    id: "iai-learning-map-2",
    chapter: "iai-learning-map",
    level: 2,
    question: "AI、ML、DL 三者的关系是什么？每层的核心思想和代表技术分别是什么？",
    answer:
      "三者是逐层包含关系：AI ⊃ ML ⊃ DL。AI（人工智能）是最大概念，核心思想是让机器表现出智能行为，代表技术包括符号推理、专家系统、搜索算法。ML（机器学习）是 AI 的子领域，核心思想是从数据中自动学习规律而非手工编码规则，代表技术包括监督学习（SVM/决策树）、无监督学习（K-Means/PCA）、强化学习（Q-learning）。DL（深度学习）是 ML 的子领域，核心思想是用多层神经网络自动提取层次化特征，代表技术包括 CNN、RNN、Transformer。关键认知：AI 不等于深度学习，深度学习只是连接主义路线的实现手段。",
    tags: ["AI", "ML", "DL", "包含关系", "范式"],
  },
  {
    id: "iai-learning-map-3",
    chapter: "iai-learning-map",
    level: 2,
    question: "十章的学习路径和章节依赖关系是怎样的？",
    answer:
      "学习路径：ch0 学习地图 → ch1 AI 发展史 → ch2 搜索与优化 → ch3 机器学习 → ch4 深度学习 → ch5 NLP → ch6 CV → ch7 强化学习 → ch8 AI 伦理 → ch9 全书复习。依赖关系：ch1 无前置依赖；ch2 依赖 ch1（需要理解 AI 范式背景）；ch3 依赖 ch1（理解 AI 框架后进入 ML）；ch4 依赖 ch3（DL 是 ML 子集，需先理解 ML 基础）；ch5 和 ch6 都依赖 ch4（NLP 和 CV 都基于深度学习架构）；ch7 依赖 ch3（RL 是 ML 三范式之一）；ch8 依赖全部章节（伦理需理解全链路）；ch9 依赖全部（端到端整合）。",
    tags: ["学习路径", "章节依赖", "知识链路"],
  },
  {
    id: "iai-learning-map-4",
    chapter: "iai-learning-map",
    level: 3,
    question: "为什么说「AI 不等于深度学习」？请从范式角度解释。",
    answer:
      "AI 包含多种实现范式的技术路线，深度学习只是其中一种。AI 的三大范式：①符号主义——认为智能 = 符号操作 + 逻辑推理，通过手工编码规则自顶向下实现，代表是 LISP、Prolog、专家系统，优势是可解释，劣势是知识获取瓶颈；②连接主义——认为智能 = 神经网络 + 数据驱动学习，从数据中自底向上学习，代表是 CNN、RNN、Transformer，优势是泛化强，劣势是黑箱难解释；③行为主义——通过试错和奖励信号学习行为策略，代表是强化学习。深度学习属于连接主义范式，虽然当前最成功，但符号主义在知识推理、行为主义在序列决策中仍有不可替代的价值。理解多范式有助于跳出狭隘认知。",
    tags: ["AI 范式", "符号主义", "连接主义", "行为主义", "深度学习"],
  },
];
