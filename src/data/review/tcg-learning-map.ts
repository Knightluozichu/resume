import type { ReviewQuestion } from "./types";

export const tcgLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "tcg-learning-map-1",
    chapter: "tcg-learning-map",
    level: 1,
    question: `《这就是 ChatGPT》全书的核心主题是什么？ChatGPT本质上在做什么？`,
    answer:
      `全书核心主题是解释ChatGPT的工作原理。ChatGPT本质上在做\"下一个token预测\"——给定之前所有token的序列，预测最可能出现的下一个token，然后将其追加到序列中，不断重复这个过程来生成文本。这个看似简单的任务，在海量数据训练和巨大模型规模的加持下，产生了令人惊叹的语言理解和生成能力。全书从语言基础、神经网络、词嵌入、Transformer架构、训练过程、文本生成、注意力机制到未来影响，系统地解释了这一过程背后的原理。`,
    tags: ["核心主题", "下一个token预测", "全书概览"],
  },
  {
    id: "tcg-learning-map-2",
    chapter: "tcg-learning-map",
    level: 2,
    question: `全书十章如何组织？分为哪几个学习阶段？`,
    answer:
      `全书十章分为四个学习阶段：①语言基础（ch0-ch2）——知识全景图定位方向，语言与意义的基础建立token和语义概念，神经网络与机器学习建立权重和训练的基本认知。②语义表示与架构（ch3-ch5）——词嵌入与语义空间将词映射为高维向量，Transformer架构讲解自注意力机制，ChatGPT训练过程讲解预训练、监督微调和RLHF三阶段。③生成与应用（ch6-ch7）——预测与文本生成讲解自回归生成和采样策略，上下文与注意力机制讲解上下文窗口和信息流。④影响与整合（ch8-ch9）——AI的未来与影响讨论能力与局限，全书复习以统一视角整合知识闭环。`,
    tags: ["章节组织", "四阶段", "学习路径"],
  },
  {
    id: "tcg-learning-map-3",
    chapter: "tcg-learning-map",
    level: 2,
    question: `ChatGPT的技术栈包含哪些核心组件？它们之间是什么关系？`,
    answer:
      `ChatGPT的技术栈包含四大核心组件：①Token化——将文本切分为离散单元（token），每个token对应一个整数ID，是语言到数学的第一步。②词嵌入——将每个token映射为高维向量，使语义关系可计算（相似词距离近）。③Transformer架构——核心是自注意力机制，让每个token能与所有token计算相关性，并行处理且能捕获长程依赖。④训练流程——预训练（学语言规律）+ 监督微调（学跟随指令）+ RLHF（学人类偏好）。关系：token化将文本数字化 → 嵌入将数字语义化 → Transformer学习序列规律 → 训练流程使模型对齐人类需求。四者层层递进，共同构成ChatGPT。`,
    tags: ["技术栈", "组件关系", "核心组件"],
  },
  {
    id: "tcg-learning-map-4",
    chapter: "tcg-learning-map",
    level: 3,
    question: `全书十章如何形成一个从语言基础到AI影响的完整知识闭环？`,
    answer:
      `全书形成「语言→表示→架构→训练→生成→影响→整合」的知识演进：①语言层（ch0-ch1）——token和语义建立语言数字化的基础，回答\"语言如何变成数据\"。②表示层（ch2-ch3）——神经网络提供函数近似能力，词嵌入将语义编码为高维空间中的位置，回答\"意义如何被计算\"。③架构层（ch4-ch5）——Transformer的自注意力机制让模型理解上下文关系，三阶段训练使模型从\"会接话\"进化到\"会回答\"，回答\"模型如何学习和理解\"。④生成层（ch6-ch7）——自回归生成和注意力机制解释模型如何逐token生成文本，回答\"文本如何被创造\"。⑤影响层（ch8-ch9）——讨论能力和局限、未来方向，以统一视角串联全书。核心脉络：语言定义输入，嵌入定义表示，Transformer定义架构，训练定义行为，生成定义输出，注意力定义理解。`,
    tags: ["知识闭环", "知识演进", "统一视角"],
  },
];
