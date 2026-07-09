import type { ReviewQuestion } from "./types";

export const lcpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "lcp-learning-map-1",
    chapter: "lcp-learning-map",
    level: 1,
    question: "《LangChain 编程从入门到实践》全书的核心主题是什么？LangChain 解决什么问题？",
    answer:
      "全书核心主题是系统讲解如何使用 LangChain 框架开发大语言模型应用。LangChain 解决的核心问题是：大语言模型本身只提供文本输入输出接口，构建完整应用需要提示管理、链式调用、记忆状态、工具集成、检索增强等大量工程化能力。LangChain 通过标准化抽象（Runnable 接口）、模块化组件（Model I/O / Chains / Memory / Agents / Retrieval）和 LCEL 表达式语言，将异构模型和复杂流程统一为可组合、可编排、可部署的应用框架，让开发者专注于业务逻辑而非底层管道。",
    tags: ["核心主题", "框架定位", "全书概览"],
  },
  {
    id: "lcp-learning-map-2",
    chapter: "lcp-learning-map",
    level: 2,
    question: "全书十章如何组织？分为哪几个学习阶段？",
    answer:
      "全书十章分为四个学习阶段：①基础概念（ch0-ch1）——知识全景图定位学习方向，LangChain 框架概览讲解架构与核心模块。②核心组件（ch2-ch4）——模型与提示模板讲解 Model I/O 三阶段，链与序列操作讲解 LLMChain 和 SequentialChain，记忆与状态管理讲解四种 Memory 类型。③高级应用（ch5-ch7）——工具与智能体讲解 Agent 执行循环，RAG 系统实现讲解检索增强生成完整流程，高级链与路由讲解 LCEL 原语和 Router 分发。④生产实践（ch8-ch9）——生产部署与优化讲解流式缓存追踪容错，全书复习整合知识闭环。",
    tags: ["章节组织", "四阶段", "学习路径"],
  },
  {
    id: "lcp-learning-map-3",
    chapter: "lcp-learning-map",
    level: 2,
    question: "LangChain 的技术栈包含哪些核心模块？它们之间是什么关系？",
    answer:
      "五大核心模块：①Model I/O——提示模板格式化输入，LLM/ChatModel 统一调用，Output Parser 结构化输出，是所有应用的基础管道。②Chains——将多个组件按顺序组合，LLMChain 最基础，LCEL 管道是推荐的现代写法。③Memory——在多轮对话中维护上下文状态，Buffer/Window/Summary/KG 四种策略适配不同场景。④Agents——LLM 作为推理引擎自主选择工具和规划步骤，ReAct 循环实现思考-行动-观察。⑤Retrieval——文档加载分块向量化存储检索，RAG 让模型开卷考试。关系：Model I/O 是基础，Chains 是编排，Memory 维持状态，Agents 实现自主，Retrieval 提供知识。五者通过 Runnable 接口统一组合。",
    tags: ["技术栈", "模块关系", "核心组件"],
  },
  {
    id: "lcp-learning-map-4",
    chapter: "lcp-learning-map",
    level: 3,
    question: "全书如何形成一个从框架理解到生产部署的完整知识闭环？",
    answer:
      "全书形成「框架 → 组件 → 智能应用 → 生产部署 → 整合」的知识演进：①框架层（ch0-ch1）——理解 LangChain 架构设计和 Runnable/LCEL 抽象，回答\"框架如何工作\"。②组件层（ch2-ch4）——掌握 Model I/O、Chains、Memory 三大核心组件，回答\"如何组装基础应用\"。③应用层（ch5-ch7）——通过 Agent、RAG、高级链构建智能应用，回答\"如何让应用更智能\"。④工程层（ch8）——流式/缓存/追踪/容错/安全，回答\"如何可靠上线\"。⑤整合层（ch9）——统一视角串联全书知识。核心脉络：框架理解定义边界，组件掌握定义能力，智能应用定义场景，生产部署定义可靠，知识闭环定义整合。",
    tags: ["知识闭环", "知识演进", "统一视角"],
  },
];
