import type { ReviewQuestion } from "./types";

export const lcpAdvancedChainsQuestions: ReviewQuestion[] = [
  {
    id: "lcp-advanced-chains-1",
    chapter: "lcp-advanced-chains",
    level: 1,
    question: `LCEL 的核心 Runnable 原语有哪些？各自的作用是什么？`,
    answer:
      `LCEL 核心 Runnable 原语：①RunnablePassthrough——透传输入，不修改数据。常用于 RunnablePassthrough.assign() 在保留原始输入的同时添加新字段。在 RAG 中用于同时传递检索结果和原始问题。②RunnableParallel——并行执行多个 Runnable，输入相同，结果按字典键合并。用于同时从多个来源获取数据，如并行检索多个知识库。③RunnableLambda——将普通 Python 函数包装为 Runnable，使其可以加入管道。用于自定义数据转换逻辑。④RunnableBranch——条件分支，根据条件函数选择执行不同的 Runnable。用于动态路由，替代传统 RouterChain。⑤RunnableMap——字典映射，类似 RunnableParallel，将输入分发到多个 Runnable 并收集结果。⑥RunnableSequence——管道序列，用 | 连接多个 Runnable 自动创建。⑦RunnableWithFallbacks——主 Runnable 失败时自动切换到备用 Runnable，用于容错。这些原语都实现 Runnable 接口，可以用 | 连接组合。`,
    tags: ["LCEL", "Runnable原语", "RunnablePassthrough", "RunnableParallel"],
  },
  {
    id: "lcp-advanced-chains-2",
    chapter: "lcp-advanced-chains",
    level: 2,
    question: `如何用 LCEL 实现动态路由（Router Chain）？与传统 RouterChain 相比有何优势？`,
    answer:
      `LCEL 实现动态路由的两种方式：①RunnableBranch——branch = RunnableBranch({(lambda x: \"技术\" in x[\"topic\"]): tech_chain}, {(lambda x: \"商业\" in x[\"topic\"]): business_chain}, default_chain)。每个条件是 (判断函数, 对应 Runnable) 元组，按顺序匹配，第一个满足的执行其 Runnable，都不匹配则执行 default。②自定义 RunnableLambda 路由——def route(info): if \"技术\" in info[\"topic\"]: return tech_chain; ...。full_chain = classify_chain | RunnableLambda(route)。先用 LLM 分类，再根据分类结果路由到对应链。与传统 RouterChain 对比的优势：①代码更简洁——无需定义 MultiPromptChain、RouterOutputParser 等多个组件。②自动流式——LCEL 管道原生支持 stream，传统 RouterChain 不支持。③更灵活——条件函数可以是任意 Python 逻辑，不依赖 LLM 输出格式。④可组合——路由链可以与其他 LCEL 组件无缝组合。⑤可观测——与 LangSmith 集成，自动追踪路由决策。`,
    tags: ["Router", "RunnableBranch", "动态路由", "LCEL"],
  },
  {
    id: "lcp-advanced-chains-3",
    chapter: "lcp-advanced-chains",
    level: 2,
    question: `RunnablePassthrough.assign 的工作原理是什么？在 RAG 链中如何使用？`,
    answer:
      `RunnablePassthrough.assign 工作原理：它接收一个字典输入，在不修改原始键值对的前提下，添加新的键值对。新键的值通过传入的 Runnable 计算得到，输入是该步骤的完整输入字典。例如 RunnablePassthrough.assign(context=retriever) 会：①保留输入中的所有原始字段（如 question）。②执行 retriever(input) 获取检索结果。③将检索结果赋值给 context 字段。④输出包含原始字段和新 context 字段的字典。在 RAG 链中的使用：chain = (RunnablePassthrough.assign(context=(lambda x: format_docs(retriever.get_relevant_documents(x[\"question\"])))) | prompt | model | StrOutputParser())。关键作用：①数据流管理——检索器只需要 question 字段，但模型需要 context 和 question 两个字段。assign 确保两者都传递到下游。②链式组合——每一步都可以 assign 新字段，构建复杂的数据流管道。③保留原始数据——不像普通管道那样替换数据，而是在原始数据基础上扩展。`,
    tags: ["RunnablePassthrough", "assign", "RAG链", "数据流"],
  },
  {
    id: "lcp-advanced-chains-4",
    chapter: "lcp-advanced-chains",
    level: 3,
    question: `设计一个多知识库路由 RAG 系统：用户问题先分类，再路由到对应知识库检索，最后生成答案。用 LCEL 实现。`,
    answer:
      `多知识库路由 RAG 系统实现：①定义分类链——classify_prompt = ChatPromptTemplate.from_template(\"将以下问题分类为 tech/finance/legal/general，只返回类别名：{question}\")，classify_chain = classify_prompt | model | StrOutputParser()。②准备多个检索器——tech_retriever = tech_vectorstore.as_retriever()，finance_retriever = finance_vectorstore.as_retriever()，legal_retriever = legal_vectorstore.as_retriever()，general_retriever = general_vectorstore.as_retriever()。③定义路由函数——def route_retriever(info): category = info[\"category\"].strip().lower(); retrievers = {\"tech\": tech_retriever, \"finance\": finance_retriever, \"legal\": legal_retriever}; return retrievers.get(category, general_retriever)。④构建完整链——full_chain = (RunnablePassthrough.assign(category=classify_chain) | RunnablePassthrough.assign(context=(lambda x: format_docs(route_retriever(x).get_relevant_documents(x[\"question\"])))) | qa_prompt | model | StrOutputParser())。⑤调用——full_chain.invoke({\"question\": \"公司法对股东权利的规定？\"})，自动分类为 legal，路由到法律知识库检索。关键点：两个 assign 步骤分别添加 category 和 context，原始 question 始终保留。`,
    tags: ["综合设计", "多知识库", "路由RAG", "LCEL"],
  },
];
