import type { ReviewQuestion } from "./types";

export const blaLlmLandscapeQuestions: ReviewQuestion[] = [
  {
    id: "bla-llm-landscape-1",
    chapter: "bla-llm-landscape",
    level: 1,
    question: "LLM 应用生态的四层技术栈分别是什么？它们之间是什么关系？",
    answer:
      "四层技术栈自底向上：①模型层——提供核心能力，包括闭源API（GPT-4/Claude/Gemini）、开源模型（LLaMA/Mistral/Qwen）、嵌入模型（text-embedding/BGE/E5）、多模态模型（GPT-4V/LLaVA/CLIP）。②编排层——负责组件组合，包括 LangChain、LlamaIndex、Semantic Kernel、Haystack。③工具层——提供存储与增强，包括向量数据库（Pinecone/Chroma/FAISS）、文档加载器、评测工具（RAGAS/TruLens）、观测平台（Phoenix/Langfuse）。④应用层——面向用户场景，包括对话助手、RAG系统、Agent、Copilot。关系：模型层是底座提供能力，编排层组合能力为流程，工具层提供存储和增强，应用层面向用户交付价值，四层自底向上层层叠加。",
    tags: ["四层技术栈", "生态架构", "层级关系"],
  },
  {
    id: "bla-llm-landscape-2",
    chapter: "bla-llm-landscape",
    level: 2,
    question: "闭源 API 与开源模型的选型需要考虑哪些维度？什么场景适合用哪种？",
    answer:
      "选型需在四个维度间权衡：①能力与成本——闭源API能力最强但成本随调用量线性增长，开源模型成本低但需自备GPU算力。②数据隐私——敏感数据需私有化部署（开源模型），非敏感数据可用云API（闭源）。③延迟与吞吐——闭源API依赖网络延迟，开源模型内网部署延迟更低且可优化吞吐。④可观测性——生产系统需全链路追踪，开源模型更可控。场景选择：原型开发和非敏感数据用闭源API（快速验证）；金融/医疗/政府等敏感场景用开源模型私有化部署；企业级生产系统用混合部署（简单请求用小模型，复杂请求路由大模型）。",
    tags: ["模型选型", "闭源vs开源", "决策维度"],
  },
  {
    id: "bla-llm-landscape-3",
    chapter: "bla-llm-landscape",
    level: 2,
    question: "LangChain、LlamaIndex、Haystack 三个编排框架各有什么特点？分别适合什么场景？",
    answer:
      "三大编排框架对比：①LangChain——生态最全，提供 Models/Prompts/Chains/Memory/Agents/Retrievers 六大组件，适合快速原型与Agent开发，组件丰富但抽象层较多。②LlamaIndex——RAG专精，数据连接能力强，提供丰富的数据加载器和索引结构，适合文档检索与知识库场景，在RAG领域有深度优化。③Haystack——Pipeline设计，类型安全，适合生产级RAG系统，架构清晰但生态不如LangChain丰富。选择建议：快速原型和Agent用LangChain；文档密集型RAG用LlamaIndex；对类型安全和生产稳定性要求高用Haystack。实际项目中也可组合使用，如用LlamaIndex做数据层、LangChain做编排层。",
    tags: ["编排框架", "LangChain", "框架对比"],
  },
  {
    id: "bla-llm-landscape-4",
    chapter: "bla-llm-landscape",
    level: 3,
    question: "如果要为企业构建一个知识问答系统，你会如何选择模型层和工具层的组件？",
    answer:
      "企业知识问答系统的组件选择：①模型层——主模型选开源模型（如Qwen-72B/LLaMA-3-70B）私有化部署，兼顾能力和数据隐私；嵌入模型选BGE-large或text-embedding-ada-002，确保中英文检索效果。②工具层——向量数据库选Chroma或Weaviate（支持本地部署、过滤查询）；文档加载器用LangChain/LlamaIndex的Loader支持PDF/HTML/Markdown；评测工具用RAGAS评估检索质量和生成质量；观测平台用Langfuse追踪调用链路和成本。③编排层——用LangChain串联RAG流程，LCEL语法组合检索-重排-生成链。④部署——API网关鉴权限流，负载均衡多副本，GPU集群私有化。关键决策：数据敏感所以私有化，知识更新频繁所以用RAG而非微调，延迟要求高所以加语义缓存。",
    tags: ["企业方案", "知识问答", "组件选型", "RAG"],
  },
];
