import type { ReviewQuestion } from "./types";

export const lcpProductionDeploymentQuestions: ReviewQuestion[] = [
  {
    id: "lcp-production-deployment-1",
    chapter: "lcp-production-deployment",
    level: 1,
    question: `LangChain 生产部署的六大优化维度是什么？各自解决什么问题？`,
    answer:
      `六大优化维度：①流式输出（Streaming）——用 stream/astream 方法逐 Token 返回输出，解决首字延迟问题。用户无需等待完整响应生成，提升交互体验。通过 SSE 或 WebSocket 推送到前端。②缓存（Cache）——用 InMemoryCache 或 RedisCache 缓存 LLM 响应，解决重复请求成本问题。相同输入直接返回缓存结果，大幅降低 API 调用费用。语义缓存可命中相似问题。③异步（Async）——用 ainvoke/abatch/astream 异步调用，解决高并发吞吐量问题。asyncio 并发处理多个请求，配合 FastAPI 实现高并发服务。④可观测性（Tracing）——用 LangSmith 全链路追踪，解决调试和监控问题。记录每步输入输出、延迟、Token 消耗和成本，支持性能分析和问题定位。⑤容错（Fallbacks）——with_fallbacks 设置备用模型，解决可用性问题。主模型失败自动切换备用，配合重试和超时机制保障服务。⑥安全（Safety）——输入校验和输出过滤，解决安全问题。Guardrails 防注入，PII 脱敏，速率限流防止滥用。`,
    tags: ["生产优化", "六大维度", "流式", "缓存", "容错"],
  },
  {
    id: "lcp-production-deployment-2",
    chapter: "lcp-production-deployment",
    level: 2,
    question: `如何在 LangChain 中实现流式输出？astream_events 和普通 stream 有什么区别？`,
    answer:
      `实现流式输出：①基本流式——chain.stream(input) 返回生成器，逐 Token 产出输出。适用于简单的单组件链。②异步流式——await chain.astream(input) 异步版本，适合高并发场景。③事件流——chain.astream_events(input, version=\"v2\") 产生更细粒度的事件流。stream 和 astream_events 的区别：①stream 只输出最终结果的 Token 流，无法看到中间步骤（如检索结果、工具调用）的流式输出。②astream_events 产生完整事件流，包括每个 Runnable 的开始/结束事件、中间步骤的 Token 流、错误事件等。事件类型包括 on_chain_start/on_chain_end、on_llm_start/on_llM_new_token/on_llm_end、on_tool_start/on_tool_end 等。③astream_events 适合复杂链调试和多步骤 UI 展示，如 Agent 场景中同时展示思考过程和工具调用。④前端集成——FastAPI 中用 StreamingResponse 或 Server-Sent Events 将流推送到前端，JavaScript 用 EventSource 接收。`,
    tags: ["流式输出", "stream", "astream_events", "事件流"],
  },
  {
    id: "lcp-production-deployment-3",
    chapter: "lcp-production-deployment",
    level: 2,
    question: `如何配置 LangChain 缓存？语义缓存和精确缓存有什么区别？`,
    answer:
      `配置 LangChain 缓存：①精确缓存——from langchain.globals import set_llm_cache; from langchain_community.cache import InMemoryCache; set_llm_cache(InMemoryCache())。或用 Redis：set_llm_cache(RedisCache(redis_=redis_client))。精确缓存以 prompt+model 参数为 key，完全匹配才命中。②语义缓存——from langchain_community.cache import RedisSemanticCache; set_llm_cache(RedisSemanticCache(redis_url=\"...\", embedding=OpenAIEmbeddings()))。语义缓存用嵌入向量比较相似度，相似度超过阈值即命中。区别：①精确缓存——输入必须完全相同（包括 prompt 文本和模型参数），适合重复的固定查询。优点是零误差，缺点是命中率低。②语义缓存——输入语义相似即可命中（如\"什么是 RAG\"和\"RAG 是什么\"），适合自然语言查询场景。优点是命中率高，缺点是有误命中风险（相似但不同义的问题返回错误答案）。生产建议：高一致性场景用精确缓存，高复用场景用语义缓存（设置较高相似度阈值如 0.95），配合 TTL 过期避免脏数据。`,
    tags: ["缓存", "语义缓存", "Redis", "精确缓存"],
  },
  {
    id: "lcp-production-deployment-4",
    chapter: "lcp-production-deployment",
    level: 3,
    question: `设计一个 LangChain 应用的生产部署方案，涵盖 API 服务、流式输出、容错、缓存和监控。`,
    answer:
      `生产部署方案：①API 服务——用 FastAPI 构建 REST API，POST /chat 端点接收请求。集成 LangChain 链，用 StreamingResponse 返回 SSE 流。②流式输出——端点内用 chain.astream_events(input, version=\"v2\") 产生事件流，yield 格式化为 SSE 事件推送到前端。前端用 EventSource 接收逐 Token 显示。③容错机制——model = ChatOpenAI().with_fallbacks([ChatAnthropic(), ChatOpenAI(model=\"gpt-3.5-turbo\")])。主模型失败自动切换 Anthropic，再切 GPT-3.5。配合 tenacity 重试（3 次，指数退避）和 30 秒超时。④缓存——Redis 精确缓存高频请求，set_llm_cache(RedisCache(redis_client))。设置 1 小时 TTL，避免知识更新后的脏数据。⑤监控——LangSmith 追踪全链路：每步输入输出、延迟分布、Token 消耗、成本统计。设置告警：错误率 > 5%、P99 延迟 > 10s、日成本超阈值。⑥安全——API Key 鉴权、速率限制（100 req/min/user）、输入长度限制（10000 字符）、敏感词过滤。⑦部署——Docker 容器化，Kubernetes 编排，HPA 自动扩缩（CPU > 70% 扩容），多副本负载均衡。⑧日志——结构化 JSON 日志到 ELK，记录 request_id/user_id/latency/tokens/cost。`,
    tags: ["综合设计", "生产部署", "FastAPI", "容错", "缓存", "监控"],
  },
];
