import type { ReviewQuestion } from "./types";

export const cgptFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "cgpt-final-review-1",
    chapter: "cgpt-final-review",
    level: 1,
    question: "用一句话概括 ChatGPT 从原理到落地的全流程，然后展开解释四个层次。",
    answer:
      "一句话：ChatGPT 是从 GPT 架构出发，经预训练获得语言能力，用 RLHF 对齐人类偏好，再经推理优化、提示与工具、微调工程化，最终成为可靠线上智能服务的过程。四个层次：①原理层（ch0-ch3）——理解 GPT 解码器架构、自回归预训练、缩放律与涌现、RLHF 三阶段对齐，回答「模型如何诞生」。②工程层（ch4-ch5）——掌握 KV 缓存/量化/批处理推理优化和 CoT/ReAct 提示工程，回答「如何跑得快用得好」。③应用层（ch6-ch7）——通过 Function Calling 工具调用和 LoRA/QLoRA 微调构建应用，回答「如何落地业务」。④未来层（ch8）——把握多模态、Agent、开源、安全趋势。核心脉络：原理理解定义本质，工程掌握定义效率，应用构建定义场景，未来把握定义方向。",
    tags: ["全流程", "四层视角", "统一概括"],
  },
  {
    id: "cgpt-final-review-2",
    chapter: "cgpt-final-review",
    level: 2,
    question: "预训练、对齐、提示、工具、微调五种手段各自解决什么问题？如何组合使用？",
    answer:
      "①预训练——解决「能力来源」问题，海量语料自回归学习获得通用语言能力，产出基座模型。②对齐——解决「行为规范」问题，SFT+RM+PPO 让模型听话安全有用。③提示——解决「行为引导」问题，零成本调模型行为，CoT 提升推理。④工具——解决「能力边界」问题，Function Calling 让模型用外部工具补知识盲区和操作能力。⑤微调——解决「领域适配」问题，LoRA 等把通用模型变领域专家。组合：预训练是地基，对齐是必经，提示+工具+微调是应用层三件套，常组合——提示调即时行为、微调固化风格、工具扩展能力、RAG 补事实。先用提示试，不够加 RAG/工具，还不够微调。",
    tags: ["五种手段", "组合使用", "技术选型"],
  },
  {
    id: "cgpt-final-review-3",
    chapter: "cgpt-final-review",
    level: 2,
    question: "从选模型到上生产，ChatGPT 类应用开发的核心决策链是怎样的？",
    answer:
      "决策链：①架构理解——选基座（闭源 API vs 开源自部署），按能力/成本/隐私权衡。②预训练（通常跳过，直接用现成基座）——理解模型能力边界。③对齐——用现成对齐模型或自己做 SFT/DPO。④推理优化——KV 缓存、量化、连续批处理降本提速，选 vLLM/llama.cgpt 等框架。⑤提示与工具——先提示工程调行为，需外部能力加 Function Calling，复杂任务用 Agent 循环。⑥微调——提示不够再微调，LoRA 起步，数据精标优先。⑦评估——指标 + 人工 + LLM-Judge。⑧部署——服务化、限流、监控、容错。⑨迭代——上线后持续收集反馈优化。核心：按需递进，能用轻的不上重的。",
    tags: ["决策链", "模型选型", "生产上线", "综合应用"],
  },
  {
    id: "cgpt-final-review-4",
    chapter: "cgpt-final-review",
    level: 3,
    question: "设计一个企业智能客服系统的完整方案，涵盖推理优化、RAG、工具调用和微调。",
    answer:
      "方案：①需求——7x24 客服，准确回答产品问题，支持查订单、提工单，多轮对话。②模型选型——开源 Qwen-14B 自部署保隐私，或调 GPT-4o-mini 降本。③推理优化——vLLM 部署，PagedAttention + 连续批处理提吞吐，INT8 量化降显存，SSE 流式输出降延迟。④RAG 知识库——离线加载产品手册/FAQ 分块向量化存 Chroma；在线检索 Top-10 重排 Top-5 注入提示。⑤工具调用——knowledge_search（RAG 检索）、query_order（查订单 API）、create_ticket（建工单）、transfer_human（转人工），用 Function Calling，高风险操作加确认。⑥微调——用 5000 条客服对话精标数据做 LoRA 微调固化客服风格和术语。⑦多轮记忆——滑动窗口 + 摘要，Redis 持久化按 session 隔离。⑧安全——越狱防御、敏感词过滤、权限校验、审计日志。⑨评估——100 测试题人工标注 + LLM-Judge + A/B 测试。⑩迭代——上线后持续收集 bad case 补微调数据。",
    tags: ["完整方案", "企业客服", "RAG", "工具调用", "微调", "推理优化"],
  },
];
