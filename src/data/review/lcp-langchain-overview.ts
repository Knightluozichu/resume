import type { ReviewQuestion } from "./types";

export const lcpLangchainOverviewQuestions: ReviewQuestion[] = [
  {
    id: "lcp-langchain-overview-1",
    chapter: "lcp-langchain-overview",
    level: 1,
    question: "LangChain 的核心设计理念是什么？它通过什么机制实现模块化组合？",
    answer:
      "LangChain 的核心设计理念有四点：①标准化抽象——通过 Runnable 接口统一所有组件的调用方式（invoke/stream/batch），封装异构模型差异。②模块化组合——组件可插拔自由编排，提示、模型、解析器、记忆等模块独立替换。③LCEL 表达式语言——用管道符 | 连接 Runnable 组件，原生支持流式/异步/批量。④生态集成——提供数百种工具和模型集成，覆盖主流 LLM 提供商和工具服务。模块化组合通过 Runnable 接口实现：所有组件实现统一接口（invoke/ainvoke/stream/astream/batch/abatch），用管道符 | 连接时自动传递数据，支持并行（RunnableParallel）、透传（RunnablePassthrough）、分支（RunnableBranch）等组合模式。",
    tags: ["设计理念", "Runnable", "模块化"],
  },
  {
    id: "lcp-langchain-overview-2",
    chapter: "lcp-langchain-overview",
    level: 2,
    question: "LangChain 的五大核心模块分别是什么？各自承担什么职责？",
    answer:
      "五大核心模块：①Model I/O——处理与模型的交互，包含 Prompts（提示模板格式化输入）、LLMs/ChatModels（模型统一调用）、Output Parsers（输出解析结构化）。是所有应用的基础管道。②Chains——将多个组件按顺序组合执行，LLMChain 是最简形式，SequentialChain 支持串行多链，LCEL 管道是现代推荐写法。③Memory——在多轮对话中维护上下文状态，ConversationBufferMemory 存全量历史，WindowMemory 滑动窗口，SummaryMemory 摘要压缩，KGMemory 知识图谱。④Agents——LLM 作为推理引擎自主决策，结合 Tools 工具集和 AgentExecutor 执行循环，实现 ReAct 思考-行动-观察。⑤Retrieval——Document Loaders 加载文档，Text Splitters 分块，Embeddings 向量化，Vector Stores 存储检索，支撑 RAG 应用。",
    tags: ["五大模块", "核心架构", "模块职责"],
  },
  {
    id: "lcp-langchain-overview-3",
    chapter: "lcp-langchain-overview",
    level: 2,
    question: "Runnable 接口提供了哪些核心方法？这些方法如何统一不同组件的调用模式？",
    answer:
      "Runnable 接口提供四种调用模式，每种有同步和异步两个版本：①invoke(input) / ainvoke(input)——单次同步/异步调用，输入一个请求返回一个结果，最基础的调用方式。②stream(input) / astream(input)——流式同步/异步调用，逐 Token 返回输出，降低首字延迟，适合实时交互场景。③batch(inputs) / abatch(inputs)——批量同步/异步调用，并行处理多个输入，提升吞吐量，适合离线处理。统一机制：所有 LangChain 组件（Prompt、Model、Parser、Retriever、Chain）都实现 Runnable 接口，因此可以用相同的四种方法调用任何组件。这种统一性使得组件可以无缝组合——管道符 | 连接的每个组件都支持相同的调用模式，整条管道自动继承流式/异步/批量能力。",
    tags: ["Runnable", "调用模式", "接口统一"],
  },
  {
    id: "lcp-langchain-overview-4",
    chapter: "lcp-langchain-overview",
    level: 3,
    question: "LCEL（LangChain Expression Language）相比传统 Chain 类有哪些优势？为什么推荐使用？",
    answer:
      "LCEL 相比传统 Chain 类的四大优势：①流式原生——传统 Chain 需要额外改造才能流式输出，LCEL 管道自动支持 stream/astream，任意组件组合后仍保持流式能力。②异步支持——传统 Chain 的异步支持有限，LCEL 原生支持 ainvoke/astream/abatch，适合高并发生产场景。③批量处理——传统 Chain 需要手动循环处理批量输入，LCEL 的 batch 方法自动并行化，提升吞吐量。④可观测性——LCEL 管道与 LangSmith 深度集成，自动记录每步输入输出和延迟，便于调试和监控。推荐原因：LCEL 是 LangChain 官方推荐的新写法，传统 Chain 类（如 LLMChain）已逐渐被标记为遗留。LCEL 用管道符 | 替代显式构造，代码更简洁，且自动获得流式/异步/批量/可观测四大能力，无需额外开发。",
    tags: ["LCEL", "管道语法", "流式", "可观测性"],
  },
];
