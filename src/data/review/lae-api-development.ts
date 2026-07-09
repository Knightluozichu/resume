import type { ReviewQuestion } from "./types";

export const laeApiDevelopmentQuestions: ReviewQuestion[] = [
  {
    id: "lae-api-development-1",
    chapter: "lae-api-development",
    level: 1,
    question: "调用大模型API的核心请求参数有哪些？messages参数的结构是怎样的？",
    answer:
      "核心请求参数：①model——指定模型（如gpt-4、claude-3），决定能力和成本，必填。②messages——消息列表，包含对话历史，必填。③temperature——控制输出随机性（0-2），可选。④max_tokens——最大生成长度，控制成本和防止超长输出，可选。⑤top_p——核采样参数，可选。messages参数结构是一个数组，每个元素包含role和content：role为system（设定系统行为）、user（用户消息）或assistant（模型回复），content为消息文本。多轮对话通过累积messages历史实现，模型根据完整上下文生成回复。系统消息通常放在首位设定模型人设和约束。",
    tags: ["API参数", "messages", "请求结构"],
  },
  {
    id: "lae-api-development-2",
    chapter: "lae-api-development",
    level: 2,
    question: "流式响应和非流式响应有什么区别？各自适合什么场景？",
    answer:
      "非流式响应：模型生成完整结果后一次性返回。优点：解析简单，直接得到完整JSON。缺点：首字延迟高（用户需等待全部生成），长文本时体验差。适合：后台任务、批处理、需要完整结果再处理的场景。流式响应（SSE，Server-Sent Events）：模型每生成一个Token就推送给客户端。优点：首字延迟低，用户看到\"打字效果\"，体验好。缺点：解析复杂，需要处理SSE事件流和拼接Token。适合：聊天界面、实时交互、任何面向用户的场景。实现要点：设置stream=true参数，逐行读取SSE事件，每个data字段包含一个Token片段，拼接所有片段得到完整文本，以[DONE]标记结束。",
    tags: ["流式响应", "非流式", "SSE", "用户体验"],
  },
  {
    id: "lae-api-development-3",
    chapter: "lae-api-development",
    level: 2,
    question: "API调用中常见的错误类型有哪些？如何实现健壮的错误处理和重试机制？",
    answer:
      "常见错误类型：①4xx客户端错误——参数错误（400）、鉴权失败（401）、请求过多（429速率限制）。处理：检查参数和密钥，429需退避重试。②5xx服务端错误——模型过载（529）、超时、内部错误。处理：可重试。③网络错误——连接超时、DNS解析失败。处理：重试。健壮的错误处理：①指数退避重试——对5xx和429错误，等待时间按2的幂次递增（1s, 2s, 4s...），加随机抖动避免惊群，最多重试3-5次。②超时控制——设置请求级超时（如30s）和全局超时，超时后降级或返回缓存。③降级策略——主模型失败时切换备用模型或返回兜底响应。④4xx错误不重试（参数错误重试无用）。⑤记录错误日志便于排查。",
    tags: ["错误处理", "重试机制", "指数退避", "降级"],
  },
  {
    id: "lae-api-development-4",
    chapter: "lae-api-development",
    level: 3,
    question: "在实际开发中，如何设计一个大模型API调用的完整架构，兼顾可靠性、成本和用户体验？",
    answer:
      "完整架构设计：①API网关层——统一鉴权、限流、请求路由，支持多模型provider切换。②请求处理层——prompt模板管理、对话历史截断（控制Token数）、参数校验。③调用层——支持流式和非流式，实现重试+超时+降级，多模型fallback链（主模型失败切备用）。④缓存层——语义缓存，对相似问题命中缓存免调用，降低延迟和成本。⑤模型路由——简单问题路由到小模型（低成本），复杂问题路由到大模型（高质量）。⑥响应处理层——内容过滤、PII脱敏、格式标准化。⑦可观测层——记录请求/响应日志、采集延迟/错误率指标、全链路追踪。⑧异步队列——长任务异步处理，通过WebSocket或轮询返回结果。核心原则：缓存优先、小模型优先、流式优先、降级兜底。",
    tags: ["架构设计", "可靠性", "成本优化", "综合应用"],
  },
];
