import type { ReviewQuestion } from "./types";

export const lcpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "lcp-final-review-1",
    chapter: "lcp-final-review",
    level: 1,
    question: "用一句话概括 LangChain 编程的全流程，然后展开解释四个层次。",
    answer:
      "一句话：LangChain 编程是从理解框架架构出发，通过 Model I/O 和 Chains 组装基础管道，用 Memory 维持对话状态，用 Agents 和 RAG 构建智能应用，最后通过流式/缓存/追踪/容错实现生产部署的完整过程。四个层次：①基础层（ch0-ch1）——理解 LangChain 架构设计和 Runnable/LCEL 抽象，掌握五大模块定位和标准化设计理念。②组件层（ch2-ch4）——掌握 Model I/O 三阶段（提示模板/模型调用/输出解析）、Chains 组合（LLMChain/SequentialChain/LCEL 管道）、Memory 状态管理（Buffer/Window/Summary/KG 四种策略）。③应用层（ch5-ch7）——Agent 智能体实现自主执行（ReAct 循环/Tool Calling），RAG 实现知识增强（离线索引/在线检索/优化策略），高级链实现动态路由（RunnableBranch/RunnableParallel）。④工程层（ch8）——流式输出/缓存/异步/可观测性/容错/安全六大生产优化。四层递进：框架理解定义边界，组件掌握定义能力，智能应用定义场景，生产部署定义可靠。",
    tags: ["全流程", "四层视角", "统一概括"],
  },
  {
    id: "lcp-final-review-2",
    chapter: "lcp-final-review",
    level: 2,
    question: "LCEL 管道、Memory、Agent 和 RAG 四种技术各自解决什么问题？如何组合使用？",
    answer:
      "四种技术解决的问题：①LCEL 管道——解决\"组件编排\"问题。用管道符 | 连接 Runnable 组件，统一同步/异步/流式/批量调用，原生支持可观测性。是所有链组合的基础写法。②Memory——解决\"上下文丢失\"问题。在多轮对话中维护历史状态，让模型记住之前说过的话。Buffer 存全量、Window 滑动窗口、Summary 摘要压缩、KG 知识图谱。③Agent——解决\"自主执行\"问题。LLM 作为推理引擎，自主选择工具、规划步骤、循环执行。ReAct 思考-行动-观察，Tool Calling 结构化调用。④RAG——解决\"知识不足\"问题。检索外部知识库为模型提供准确信息，减少幻觉。离线索引+在线检索两阶段。组合使用：①RAG + Memory——检索增强的同时记住对话历史，用户可以追问检索结果。用 RunnablePassthrough.assign 注入历史和检索结果。②Agent + RAG——将检索器作为 Agent 的工具，Agent 自主决定何时检索。③LCEL + 所有——LCEL 管道是底层编排，Memory/RAG/Agent 都通过 LCEL 组合。④Agent + Memory——Agent 执行多步骤任务时记住中间结果。实际应用中常同时使用四种技术构建完整应用。",
    tags: ["技术组合", "LCEL", "Memory", "Agent", "RAG"],
  },
  {
    id: "lcp-final-review-3",
    chapter: "lcp-final-review",
    level: 2,
    question: "从框架选择到生产上线，LangChain 应用开发的核心决策链是怎样的？",
    answer:
      "核心决策链：①模型选择——考量能力/成本/延迟/隐私。简单任务用 GPT-3.5，复杂任务用 GPT-4o，隐私敏感用开源模型自部署。②提示设计——PromptTemplate 还是 ChatPromptTemplate？需不需要 FewShot？输出格式用 Pydantic 约束。先优化提示再考虑增强。③链的组合——单步用 LCEL 管道（prompt | model | parser），多步用 RunnablePassthrough.assign 传递数据流，需要路由用 RunnableBranch。④记忆策略——短对话 Buffer，中等 Window，长对话 SummaryBuffer，需结构化查询 KG。生产用 Redis/Postgres 持久化。⑤知识增强——知识频繁更新用 RAG，固定知识可微调。分块策略、检索策略、重排序是关键优化点。⑥自主执行——简单用 Function Calling，复杂用 Tool Calling Agent。工具描述要清晰，max_iterations 要限制。⑦生产优化——流式降低延迟，缓存降低成本，追踪便于调试，容错保障可用，安全防止滥用。⑧部署——FastAPI + Uvicorn 或 LangServe，Docker + K8s 容器化，HPA 自动扩缩。",
    tags: ["决策链", "模型选择", "生产上线", "综合应用"],
  },
  {
    id: "lcp-final-review-4",
    chapter: "lcp-final-review",
    level: 3,
    question: "设计一个企业智能客服系统的完整方案，涵盖 RAG 知识库、多轮记忆、Agent 工具调用和生产部署。",
    answer:
      "企业智能客服系统方案：①需求——7x24 客服，准确回答产品问题，支持查订单、提工单，多轮对话。②知识库构建（RAG 离线）——文档加载（产品手册/FAQ/工单历史 PDF），RecursiveCharacterTextSplitter 分块（chunk_size=500, overlap=50），OpenAIEmbeddings 向量化，存入 Chroma 向量数据库。③检索增强（RAG 在线）——用户问题向量化，similarity_search Top-10，Cross-Encoder 重排 Top-5，构造增强提示。④多轮记忆——ConversationSummaryBufferMemory(max_token_limit=2000)，Redis 持久化，session_id 隔离用户。⑤Agent 工具——a) knowledge_search：RAG 检索知识库。b) query_order：查询订单系统 API。c) create_ticket：创建工单到工单系统。d) transfer_human：转人工。用 @tool 定义，description 清晰描述使用场景。⑥Agent 创建——create_tool_calling_agent(llm, tools, system_prompt)。系统提示：\"你是企业客服，先检索知识库，必要时查询订单或创建工单，无法解决转人工。\"⑦AgentExecutor——max_iterations=10, handle_parsing_errors=True。⑧生产部署——FastAPI SSE 流式输出，Redis 精确缓存高频问题，with_fallbacks(备用模型)，LangSmith 追踪，API Key 鉴权+速率限制，Docker+K8s 部署。⑨评估——100 测试问题人工标注准确率，LLM-Judge 大规模评估，A/B 测试对比有无 RAG。",
    tags: ["完整方案", "企业客服", "RAG", "Agent", "Memory", "生产部署"],
  },
];
