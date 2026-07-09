import type { ReviewQuestion } from "./types";

export const lcpChainsSequencesQuestions: ReviewQuestion[] = [
  {
    id: "lcp-chains-sequences-1",
    chapter: "lcp-chains-sequences",
    level: 1,
    question: "LLMChain 的三个核心组件是什么？它的工作流程是怎样的？",
    answer:
      "LLMChain 的三个核心组件：①PromptTemplate——格式化用户输入，将变量填充到模板中生成提示文本。②LLM/ChatModel——接收格式化后的提示，调用模型生成响应。③OutputParser（可选）——将模型返回的原始文本解析为结构化数据。工作流程：用户输入变量 → PromptTemplate.format() 生成提示 → Model.invoke() 调用模型 → OutputParser.parse() 解析输出 → 返回最终结果。在 LCEL 中，LLMChain 可以用管道符简洁表示：chain = prompt | model | output_parser，然后 chain.invoke(input) 调用。LLMChain 是最基础的链结构，适合单步推理任务。传统写法是 LLMChain(llm=..., prompt=..., output_parser=...)，但现代推荐用 LCEL 管道替代。",
    tags: ["LLMChain", "三组件", "工作流程"],
  },
  {
    id: "lcp-chains-sequences-2",
    chapter: "lcp-chains-sequences",
    level: 2,
    question: "SequentialChain 和 SimpleSequentialChain 有什么区别？如何选择？",
    answer:
      "区别：①SimpleSequentialChain——每个链只有一个输入和一个输出，前一个链的输出直接作为后一个链的输入。适合线性的单数据流场景，如：问题分析 → 信息检索 → 答案生成，每步只有单一文本传递。②SequentialChain——支持多个输入键和输出键，每个链可以接收多个命名输入并产出多个命名输出。通过 input_variables 和 output_variables 管理数据流，更灵活但也更复杂。适合需要多数据流的场景，如：链1输出\"分析结果\"和\"关键词\"，链2同时接收\"分析结果\"和外部\"上下文\"。选择原则：如果每步只需一个输入一个输出，用 SimpleSequentialChain 更简单；如果需要多个数据流或命名变量传递，用 SequentialChain。但两者都是传统写法，现代推荐用 LCEL 管道和 RunnablePassthrough/RunnableParallel 替代，代码更简洁且自动支持流式。",
    tags: ["SequentialChain", "SimpleSequentialChain", "链组合"],
  },
  {
    id: "lcp-chains-sequences-3",
    chapter: "lcp-chains-sequences",
    level: 2,
    question: "如何用 LCEL 管道语法实现一个多步骤链？与传统 Chain 相比代码有何不同？",
    answer:
      "LCEL 管道实现多步骤链：①定义组件——prompt = ChatPromptTemplate.from_messages([...])，model = ChatOpenAI()，parser = StrOutputParser()。②管道连接——chain = prompt | model | parser，管道符 | 自动将前一个组件的输出作为后一个组件的输入。③调用——chain.invoke({\"input\": \"问题\"}) 同步调用，chain.stream(...) 流式调用，chain.batch([...]) 批量调用。④复杂数据流——用 RunnablePassthrough 透传原始输入，RunnableParallel 并行执行多个分支，RunnableLambda 包装自定义函数。与传统 Chain 对比：传统写法需要显式构造 SequentialChain(chains=[chain1, chain2], input_variables=[...], output_variables=[...])，代码冗长且不支持流式。LCEL 写法只需管道符连接，代码简洁，且自动继承流式/异步/批量/可观测能力。例如 RAG 链：chain = (RunnablePassthrough.assign(context=retriever) | prompt | model | parser)。",
    tags: ["LCEL", "管道语法", "多步骤链", "代码对比"],
  },
  {
    id: "lcp-chains-sequences-4",
    chapter: "lcp-chains-sequences",
    level: 3,
    question: "设计一个多步推理链：用户提问 → 分析问题类型 → 根据类型检索 → 生成答案。用 LCEL 如何实现？",
    answer:
      "LCEL 实现多步推理链：①定义分析链——analyze_prompt = ChatPromptTemplate.from_template(\"分析以下问题的类型（技术/业务/通用）：{question}\")，analyze_chain = analyze_prompt | model | StrOutputParser()。②定义检索链——根据分析结果选择检索策略，用 RunnableBranch 实现条件路由：retriever = RunnableBranch({(lambda x: \"技术\" in x[\"type\"]): tech_retriever}, default_retriever)。③定义生成链——qa_prompt = ChatPromptTemplate.from_template(\"基于以下信息回答：{context}\\n问题：{question}\")，qa_chain = qa_prompt | model | StrOutputParser()。④组合完整链——full_chain = (RunnablePassthrough.assign(type=analyze_chain) | RunnablePassthrough.assign(context=retriever) | qa_chain)。⑤调用——full_chain.invoke({\"question\": \"如何实现 RAG？\"})。关键点：RunnablePassthrough.assign 在不丢失原始数据的前提下添加新字段，实现多步数据流传递。",
    tags: ["LCEL", "多步推理", "RunnableBranch", "综合应用"],
  },
];
