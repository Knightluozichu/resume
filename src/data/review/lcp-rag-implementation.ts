import type { ReviewQuestion } from "./types";

export const lcpRagImplementationQuestions: ReviewQuestion[] = [
  {
    id: "lcp-rag-implementation-1",
    chapter: "lcp-rag-implementation",
    level: 1,
    question: "RAG 的完整流程分为哪两个阶段？每个阶段包含哪些步骤？",
    answer:
      "RAG 分为离线索引和在线检索两个阶段：①离线索引阶段——a) Document Loaders：加载 PDF/Word/HTML/Markdown 等格式文档。b) Text Splitters：将长文档分块，常用 RecursiveCharacterTextSplitter，设置 chunk_size（500-1000）和 chunk_overlap（10%-20%）。c) Embeddings：用 OpenAIEmbeddings 或开源嵌入模型将文本块向量化。d) Vector Store：将向量存入 Chroma/FAISS/Milvus 等向量数据库，建立索引。②在线检索阶段——a) 用户提问：接收用户问题，用相同嵌入模型向量化。b) similarity_search：在向量数据库中检索 Top-K 最相似的文档块。c) Context 构造：将检索到的文档块与用户问题组装为增强提示（系统指令+检索内容+用户问题）。d) LLM 生成：模型基于检索内容生成回答，可引用来源。LCEL 实现：chain = (retriever | prompt | model | output_parser)，或用 RunnablePassthrough.assign(context=retriever) 保留原始问题。",
    tags: ["RAG流程", "离线索引", "在线检索"],
  },
  {
    id: "lcp-rag-implementation-2",
    chapter: "lcp-rag-implementation",
    level: 2,
    question: "RecursiveCharacterTextSplitter 的工作原理是什么？chunk_size 和 chunk_overlap 如何影响 RAG 效果？",
    answer:
      "RecursiveCharacterTextSplitter 工作原理：递归地尝试用一组分隔符（默认 [\"\\n\\n\", \"\\n\", \" \", \"\"]）分割文本。先尝试用段落分隔符（\\n\\n）分割，如果块仍大于 chunk_size，再用换行符（\\n）分割，以此类推。这种递归方式尽可能保持语义完整性，优先在段落边界分割，其次在行边界，最后在词边界。chunk_size 影响：①太大（>1000）——单个块包含太多信息，检索精度下降（相似度被稀释），且消耗更多 Token。②太小（<300）——语义不完整，可能丢失上下文，检索到的块无法提供足够信息。chunk_overlap 影响：①重叠确保块边界处的信息不丢失，相邻块有 10%-20% 重叠。②太大导致冗余存储和重复检索，太小可能遗漏边界信息。推荐配置：chunk_size=500-1000，chunk_overlap=50-200。对于代码文档可用 CodeTextSplitter 按函数/类分割。选择原则：语义完整性优先，兼顾检索精度和 Token 效率。",
    tags: ["TextSplitter", "分块策略", "chunk_size", "chunk_overlap"],
  },
  {
    id: "lcp-rag-implementation-3",
    chapter: "lcp-rag-implementation",
    level: 2,
    question: "如何用 LCEL 实现一个完整的 RAG 链？如何同时传递检索结果和原始问题给模型？",
    answer:
      "LCEL 实现 RAG 链：①创建检索器——vectorstore = Chroma(embedding_function=OpenAIEmbeddings(), persist_directory=\"./db\"), retriever = vectorstore.as_retriever(search_type=\"similarity\", search_kwargs={\"k\": 4})。②定义提示模板——prompt = ChatPromptTemplate.from_template(\"基于以下上下文回答问题。如果上下文不包含答案，说不知道。\\n\\n上下文：{context}\\n\\n问题：{question}\")。③组合 RAG 链——关键是同时传递检索结果和原始问题。用 RunnablePassthrough.assign 保留原始输入并添加新字段：chain = (RunnablePassthrough.assign(context=(lambda x: retriever.get_relevant_documents(x[\"question\"]))) | prompt | model | StrOutputParser())。④另一种写法——用 RunnableParallel 并行获取：chain = (RunnableParallel({\"context\": retriever, \"question\": RunnablePassthrough()}) | prompt | model | StrOutputParser())。⑤调用——chain.invoke({\"question\": \"什么是 RAG？\"})。RunnablePassthrough 的作用是透传原始输入，确保 question 字段在经过 retriever 后不丢失。",
    tags: ["LCEL", "RAG链", "RunnablePassthrough", "RunnableParallel"],
  },
  {
    id: "lcp-rag-implementation-4",
    chapter: "lcp-rag-implementation",
    level: 3,
    question: "如何优化 RAG 系统的检索质量？描述至少三种高级优化策略及其原理。",
    answer:
      "三种高级优化策略：①混合检索（Hybrid Search）——结合向量语义检索和 BM25 关键词检索。向量检索擅长语义相似但可能遗漏关键词精确匹配，BM25 擅长关键词匹配但不懂语义。用 EnsembleRetriever(weights=[0.5, 0.5]) 融合两者结果，取长补短，显著提升召回率。原理：向量检索覆盖语义相关但用词不同的文档，BM25 覆盖包含精确关键词的文档。②重排序（Re-ranking）——先检索 Top-20 候选，再用 Cross-Encoder 模型对候选重新打分排序，取 Top-5。用 ContextualCompressionRetriever 包装 base_retriever，配合 LLMListwiseReranker 或 CohereRerank。原理：向量检索用 Bi-Encoder 速度快但精度有限，Cross-Encoder 对 query-doc 对逐一打分精度更高但速度慢，两阶段方案平衡速度和精度。③Multi-Query 查询扩展——用 MultiQueryRetriever 让 LM 从多个角度重写用户问题，每个问题分别检索，合并去重结果。原理：用户提问可能表述单一，多角度查询覆盖更多语义维度，提高召回率。④额外策略：Parent Document Retriever（检索小块返回大块保上下文）、Self-Query（元数据过滤+语义检索）、时间加权检索（偏好最新文档）。",
    tags: ["RAG优化", "混合检索", "重排序", "Multi-Query", "高级策略"],
  },
];
