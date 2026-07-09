import type { ReviewQuestion } from "./types";

export const blaOrchestrationFrameworksQuestions: ReviewQuestion[] = [
  {
    id: "bla-orchestration-frameworks-1",
    chapter: "bla-orchestration-frameworks",
    level: 1,
    question: "LangChain 的六大核心组件分别是什么？它们如何协作组成完整应用？",
    answer:
      "LangChain六大核心组件：①Models——模型抽象与统一接口，包括LLM（文本补全）、ChatModel（对话）、Embedding（向量化），屏蔽不同模型提供商的API差异。②Prompts——提示模板与输出解析，包括PromptTemplate（变量化模板）、FewShot（少样本示例）、OutputParser（输出解析为结构化数据）。③Memory——对话记忆与上下文管理，包括BufferMemory（完整历史）、WindowMemory（最近N轮）、SummaryMemory（LLM总结）。④Chains——链式调用编排，包括LLMChain（单步）、Sequential（顺序链）、Router（路由链）。⑤Agents——自主决策与工具选择，包括ReAct、OpenAI Functions等。⑥Retrievers——检索器与RAG集成，包括VectorStore Retriever、Multi-Query等。协作方式：用户输入→PromptTemplate格式化→Model调用→OutputParser解析→Memory更新→（可选）Retriever检索→（可选）Agent决策工具调用→输出结果。LCEL用管道符串联这些组件。",
    tags: ["LangChain", "六大组件", "组件协作"],
  },
  {
    id: "bla-orchestration-frameworks-2",
    chapter: "bla-orchestration-frameworks",
    level: 2,
    question: "LCEL 的管道符语法有什么优势？它支持哪些调用模式？",
    answer:
      "LCEL（LangChain Expression Language）用管道符 | 串联组件，如 chain = prompt | model | output_parser。核心优势：①流式输出——支持token级流式返回，降低首字延迟（TTFT），用户体验更好。②批量调用——内置批量处理（batch），一次处理多个输入，提升吞吐量。③异步支持——原生async/await，适合高并发场景，不阻塞事件循环。④可组合——任意LCEL链可作为更大链的子组件，支持复杂嵌套。⑤可追溯——内置回调机制，支持LangSmith等工具追踪每步执行。⑥回退机制——支持with_fallbacks()方法，主链失败自动切换备用链。调用模式：invoke()（单次同步调用）、batch()（批量同步调用）、stream()（流式输出）、ainvoke()/abatch()/astream()（异步版本）。LCEL是LangChain v0.1+的推荐语法，替代了旧的Chain类继承方式。",
    tags: ["LCEL", "管道符", "调用模式"],
  },
  {
    id: "bla-orchestration-frameworks-3",
    chapter: "bla-orchestration-frameworks",
    level: 2,
    question: "Chains 和 Agents 有什么区别？什么场景该用哪种？",
    answer:
      "Chains vs Agents的核心区别在于执行路径：①Chains（链）——预定义执行路径，输入按固定顺序经过各组件。特点：执行路径固定可控、成本可预测、延迟可预估、调试简单。适合流程确定的任务，如「查询→检索→生成」的标准RAG流程、「输入→翻译→校对」的流水线。②Agents（智能体）——动态决策路径，LLM根据当前状态自主选择下一步操作。特点：执行路径灵活、可调用工具、成本不可预测（多轮调用）、调试复杂。适合需要灵活决策的任务，如「搜索信息并综合分析」「根据问题选择不同工具」「多步骤探索性任务」。选择原则：能用Chain解决的不要用Agent（可控性和成本更好）；需要根据中间结果动态决策时才用Agent。实际项目中常见组合：外层Chain定义主流程，特定步骤嵌入Agent处理需要灵活决策的环节。例如客服系统：主流程用Chain（问候→分类→回答→结束），分类后复杂问题路由给Agent自主调用工具。",
    tags: ["Chains", "Agents", "编排模式"],
  },
  {
    id: "bla-orchestration-frameworks-4",
    chapter: "bla-orchestration-frameworks",
    level: 3,
    question: "LangChain 的 Memory 组件有哪些类型？如何根据场景选择？",
    answer:
      "LangChain Memory类型与选择：①ConversationBufferMemory——保留完整对话历史，不做任何处理。优点：信息完整。缺点：token消耗线性增长，长对话会超出上下文窗口。适合：短对话（10轮以内）。②ConversationBufferWindowMemory——只保留最近N轮对话。优点：token消耗可控。缺点：丢失早期上下文。适合：长对话控成本、近期上下文足够的场景。③ConversationSummaryMemory——用LLM将历史对话总结为摘要。优点：压缩历史信息，保留关键点。缺点：总结本身消耗token、可能丢失细节。适合：超长对话（50轮以上）。④ConversationSummaryBufferMemory——混合策略，保留近期对话+旧对话摘要。优点：兼顾近期细节和长期记忆。缺点：实现复杂。适合：需要完整上下文的长对话。⑤VectorStoreRetrieverMemory——将对话历史向量化存储，按相关性检索。优点：可跨会话记忆、按需检索。缺点：需要向量数据库、检索延迟。适合：跨会话记忆、用户偏好积累。选择原则：短对话用Buffer，控成本用Window，超长对话用Summary，跨会话用VectorStore。",
    tags: ["Memory", "对话记忆", "组件选择"],
  },
];
