import type { ReviewQuestion } from "./types";

export const lcpMemoryStateQuestions: ReviewQuestion[] = [
  {
    id: "lcp-memory-state-1",
    chapter: "lcp-memory-state",
    level: 1,
    question: `LangChain Memory 的工作流程是什么？它如何与 Chain 集成？`,
    answer:
      `Memory 工作流程：①加载历史——每轮对话开始时，调用 memory.load_memory_variables() 加载历史对话记录。②构造提示——将历史记录插入提示模板的 MessagesPlaceholder 中，与当前用户输入一起组成完整上下文。③模型推理——将包含历史的完整提示发送给模型生成响应。④保存上下文——调用 memory.save_context(input, output) 将当前轮的用户输入和模型输出保存到记忆中。与 Chain 集成：传统写法在 ConversationChain 中设置 memory=ConversationBufferMemory()。LCEL 写法中，通过 RunnablePassthrough.assign(history=lambda x: memory.load_memory_variables()['history']) 将历史注入，并在链末尾用 RunnableLambda 调用 memory.save_context 保存。关键点：Memory 的两个核心方法是 load_memory_variables（读取历史）和 save_context（保存当前轮）。`,
    tags: ["Memory", "工作流程", "Chain集成"],
  },
  {
    id: "lcp-memory-state-2",
    chapter: "lcp-memory-state",
    level: 2,
    question: `BufferMemory、WindowMemory、SummaryMemory 和 KGMemory 各有什么优缺点？如何选择？`,
    answer:
      `四种记忆类型对比：①BufferMemory——保存所有对话原文。优点：信息完整无损失。缺点：Token 消耗随对话增长，长对话会超模型上下文限制。适合短对话场景。②WindowMemory（ConversationBufferWindowMemory）——只保留最近 N 轮对话。优点：Token 可控。缺点：丢失早期信息，无法回忆远期内容。适合中等长度对话，N 通常设 5-10。③SummaryMemory（ConversationSummaryMemory）——用 LLM 将历史对话不断总结为摘要。优点：Token 节省，保留长期信息。缺点：摘要过程有信息损失和额外 LLM 调用开销。适合长对话场景。④KGMemory（ConversationKGMemory）——从对话中提取实体和关系存入知识图谱。优点：结构化查询，精准检索相关历史。缺点：实体抽取开销大，实现复杂。适合知识管理型应用。选择策略：短对话用 Buffer，中等用 Window，长对话用 Summary，需结构化历史查询用 KG。也可组合使用，如 Summary + Window。`,
    tags: ["BufferMemory", "WindowMemory", "SummaryMemory", "KGMemory", "记忆选择"],
  },
  {
    id: "lcp-memory-state-3",
    chapter: "lcp-memory-state",
    level: 2,
    question: `Memory 如何实现持久化存储？有哪些后端选择？`,
    answer:
      `Memory 持久化通过 ChatMessageHistory 后端实现，将对话记录存储在外部存储而非进程内存中。后端选择：①InMemoryChatMessageHistory——进程内存存储，开发调试用，重启丢失，不支持多实例共享。②RedisChatMessageHistory——Redis 键值存储，高性能读写，支持 TTL 自动过期，适合高并发生产场景。③PostgresChatMessageHistory——PostgreSQL 关系数据库，持久化可靠，支持复杂查询和事务，适合需要审计追溯的场景。④SQLChatMessageHistory——通用 SQL 数据库，支持 SQLite/MySQL 等。⑤MongoDBChatMessageHistory——文档数据库，灵活 schema，适合非结构化对话。使用方式：history = RedisChatMessageHistory(session_id=\"user_123\", url=\"redis://...\"), memory = ConversationBufferMemory(chat_memory=history)。通过 session_id 区分不同用户/会话。生产环境推荐 Redis（高性能）或 Postgres（可靠性）。`,
    tags: ["持久化", "ChatMessageHistory", "存储后端"],
  },
  {
    id: "lcp-memory-state-4",
    chapter: "lcp-memory-state",
    level: 3,
    question: `设计一个客服聊天机器人的记忆方案，要求支持多用户、长对话且 Token 可控。`,
    answer:
      `客服聊天机器人记忆方案：①多用户隔离——用 RedisChatMessageHistory，每个用户分配唯一 session_id（如 user_id + 会话 ID），实现用户间记忆隔离。②Token 控制——使用 ConversationSummaryBufferMemory，设置 max_token_limit=2000。当历史 Token 超过阈值时，自动将最早的对话用 LLM 总结为摘要，保留最近几轮原文。这样既有摘要的长期记忆（不丢失关键信息），又有原文的精确短期记忆（最近对话细节完整）。③记忆结构——memory = ConversationSummaryBufferMemory(llm=ChatOpenAI(), max_token_limit=2000, return_messages=True, chat_memory=RedisChatMessageHistory(session_id=session_id, url=redis_url))。④会话管理——用 session_id 映射用户和会话，支持一个用户多个会话。会话超时自动归档。⑤增强策略——可选叠加 KGMemory 提取用户画像（偏好、历史问题），用 Redis 存储用户画像供跨会话使用。⑥定期清理——设置 Redis TTL（如 7 天），过期会话自动清理，控制存储成本。`,
    tags: ["综合设计", "SummaryBufferMemory", "多用户", "Token控制"],
  },
];
