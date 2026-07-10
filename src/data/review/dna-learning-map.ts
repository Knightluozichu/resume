import { ReviewQuestion } from "./types";

export const dnaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "dna-learning-map-1",
    chapter: "dna-learning-map",
    level: 1,
    question: `《深度学习进阶：自然语言处理》（斋藤康毅）一书的核心理念是什么？`,
    answer:
      `本书核心理念是「用 NumPy 从零实现自然语言处理的核心模型」——不调用高级框架的黑箱 API，而是从词嵌入（word2vec）开始，逐步用 Python + NumPy 实现 CBOW、RNN、LSTM、seq2seq、注意力机制直至 Transformer，让读者理解现代 NLP 和大语言模型的每一个零件是如何工作的。与《深度学习入门》第一部的区别：第一部聚焦「用 NumPy 从零实现神经网络」（前向传播、反向传播、CNN），本书聚焦「自然语言处理」——处理离散的文本序列而非连续的图像像素，核心挑战从「空间模式识别」升级为「序列建模与语言理解」。`,
    tags: ["核心理念", "学习路径", "NLP"],
  },
  {
    id: "dna-learning-map-2",
    chapter: "dna-learning-map",
    level: 2,
    question: `全书的十章如何组织？分为哪几个阶段？`,
    answer:
      `全书十章分为四个阶段：①语言与词嵌入（ch0-ch3）——学习地图定位方向，NLP基础与预处理建立文本处理流水线，词嵌入与word2vec引入分布式表示，CBOW实现将理论落地为代码。②序列建模（ch4-ch5）——RNN与LSTM处理变长序列并解决梯度消失，seq2seq实现编码器-解码器翻译架构。③注意力与生成（ch6-ch8）——注意力机制打破固定上下文瓶颈，Transformer实现完全并行的注意力架构，文本生成实践将语言模型应用于生成任务。④全书整合（ch9）——从word2vec到Transformer的知识闭环。这种从「词」到「序列」到「注意力」到「生成」的递进是本书的组织主线。`,
    tags: ["章节组织", "四阶段", "学习路径"],
  },
  {
    id: "dna-learning-map-3",
    chapter: "dna-learning-map",
    level: 2,
    question: `为什么本书从 word2vec 开始而不是直接学 Transformer？`,
    answer:
      `本书从 word2vec 开始的三个原因：①理解表示——NLP 的根本问题是「如何把离散的单词变成计算机可计算的向量」。word2vec 是第一个成功的分布式表示方法，理解它才能理解为什么 Transformer 需要嵌入层。②理解训练——word2vec 的 CBOW 是一个完整的神经网络（输入层→隐藏层→输出层+Softmax），用最简单的结构展示了「定义模型→前向传播→计算损失→反向传播→更新参数」的完整训练流程，是后续所有模型的微缩标本。③理解注意力——word2vec 的权重矩阵 W_in 本质上就是一个「查询-键-值」检索：输入 one-hot 查询 W_in 得到嵌入向量，这与注意力机制 softmax(QK^T)V 的检索逻辑一脉相承。跳过 word2vec 直接学 Transformer 会缺乏这些直觉基础。`,
    tags: ["word2vec", "教学哲学", "分布式表示"],
  },
  {
    id: "dna-learning-map-4",
    chapter: "dna-learning-map",
    level: 3,
    question: `全书十章内容如何形成一个从 word2vec 到 Transformer 的知识闭环？`,
    answer:
      `全书形成一个「表示→序列→注意力→并行→闭环」的知识演进：①表示层（ch1-ch3）——NLP预处理把文本变成ID，word2vec把ID变成稠密向量（分布式假设让词有了可计算的语义空间），CBOW给出可训练的代码实现。②序列层（ch4-ch5）——RNN/LSTM处理变长序列（解决了词嵌入无法建模词序的问题），seq2seq实现跨语言映射。③注意力层（ch6-ch7）——注意力打破seq2seq的固定上下文瓶颈（每步动态聚焦），Transformer把注意力推向极致（去掉RNN实现完全并行）。④应用层（ch8）——文本生成将语言模型落地。⑤闭环（ch9）——从word2vec的「查表式表示」到Transformer的「注意力式表示」，底层统一为可微矩阵运算+梯度下降。三个关键跃迁贯穿始终：离散→连续（词嵌入）、固定→动态（注意力）、串行→并行（Transformer）。`,
    tags: ["知识闭环", "知识演进", "Transformer"],
  },
];
