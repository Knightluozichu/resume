import type { ReviewQuestion } from "./types";

export const cgptLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cgpt-learning-map-1",
    chapter: "cgpt-learning-map",
    level: 1,
    question: `《ChatGPT 原理与实战》全书的核心主题是什么？它解决什么问题？`,
    answer:
      `全书核心主题是系统讲解 ChatGPT 背后的大语言模型原理与工程落地实践。它解决的核心问题是：大众只看到 ChatGPT 的对话能力，却不理解它为何能工作、如何从模型架构一路走到可用服务。全书从 GPT 架构、预训练、对齐 RLHF 的原理层，到推理服务、提示技巧的工程层，再到插件工具、微调实战的应用层，最后到生态与未来展望，把「模型如何诞生、如何变快、如何变好、如何落地」的完整链路讲透。`,
    tags: ["核心主题", "全书概览", "知识闭环"],
  },
  {
    id: "cgpt-learning-map-2",
    chapter: "cgpt-learning-map",
    level: 2,
    question: `全书十章如何组织？分为哪几个学习阶段？`,
    answer:
      `全书十章分为四个学习阶段：①原理奠基（ch0-ch3）——知识全景图定位方向，GPT 模型架构讲解 Transformer 解码器，预训练与规模化讲解自回归和缩放律，对齐与 RLHF 讲解 SFT/RM/PPO 三阶段。②工程实践（ch4-ch5）——推理与服务化讲解 KV 缓存、量化、连续批处理，高级提示技巧讲解 CoT、ReAct、自洽。③应用落地（ch6-ch7）——插件与工具调用讲解 Function Calling 循环，微调实战讲解全参/LoRA/QLoRA。④未来展望（ch8-ch9）——生态与未来展望讲解多模态与 Agent，全书复习整合知识闭环。`,
    tags: ["章节组织", "四阶段", "学习路径"],
  },
  {
    id: "cgpt-learning-map-3",
    chapter: "cgpt-learning-map",
    level: 2,
    question: `ChatGPT 的技术链路包含哪些核心环节？它们之间是什么关系？`,
    answer:
      `核心环节：①GPT 架构——纯解码器 Transformer，自回归生成下一个 token，定义模型骨架。②预训练——海量语料自回归学习，产出具备通用语言能力的基座模型。③对齐 RLHF——SFT 学对话、RM 学偏好、PPO 强化学习，让模型听话安全。④推理服务——KV 缓存、量化、批处理让模型跑得快。⑤提示与工具——CoT 提升推理、Function Calling 扩展能力边界。⑥微调——LoRA 等让通用模型变领域专家。关系：架构是骨架，预训练是能力来源，对齐是行为塑造，推理是工程保障，提示/工具/微调是应用层增强，六者层层递进构成完整 ChatGPT 技术栈。`,
    tags: ["技术链路", "核心环节", "环节关系"],
  },
  {
    id: "cgpt-learning-map-4",
    chapter: "cgpt-learning-map",
    level: 3,
    question: `全书如何形成一个从原理理解到工程落地的完整知识闭环？`,
    answer:
      `全书形成「原理 → 工程 → 应用 → 未来 → 整合」的知识演进：①原理层（ch0-ch3）理解 GPT 架构、预训练和对齐，回答「模型如何诞生」。②工程层（ch4-ch5）掌握推理优化和提示工程，回答「如何跑得快用得好」。③应用层（ch6-ch7）通过工具调用和微调构建应用，回答「如何落地业务」。④未来层（ch8）把握多模态、Agent、安全趋势，回答「向何处去」。⑤整合层（ch9）用统一视角串联全书。核心脉络：原理理解定义本质，工程掌握定义效率，应用构建定义场景，未来把握定义方向，知识闭环定义整合。`,
    tags: ["知识闭环", "知识演进", "统一视角"],
  },
];
