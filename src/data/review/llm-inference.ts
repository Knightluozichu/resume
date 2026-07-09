import type { ReviewQuestion } from "./types";

export const llmInferenceQuestions: ReviewQuestion[] = [
  {
    id: "llm-inference-1",
    chapter: "llm-inference",
    level: 1,
    question: "KV Cache 的原理是什么？它如何加速自回归推理？",
    answer:
      "KV Cache 原理：在自回归生成中，每生成一个新 token 需要计算它与之前所有 token 的注意力。如果不缓存，每步都要重新计算所有历史 token 的 K（键）和 V（值）矩阵，计算量随序列长度平方增长。KV Cache 将每层每头的 K 和 V 矩阵缓存下来，新 token 只需计算自己的 Q（查询）与缓存的 K 做注意力，然后用注意力权重对缓存的 V 加权求和。加速效果：①避免重复计算——历史 token 的 K/V 只算一次，后续直接复用；②将每步计算从 O(n^2) 降为 O(n)（n 为序列长度）；③推理分为 Prefill（处理输入 prompt，计算密集）和 Decode（逐 token 生成，访存密集）两阶段。PagedAttention（vLLM）进一步优化——将 KV Cache 分页管理，减少显存碎片，支持更多并发请求。代价是 KV Cache 占用显存，长序列时显存压力大。",
    tags: ["KV Cache", "自回归推理", "Prefill", "Decode", "PagedAttention"],
  },
  {
    id: "llm-inference-2",
    chapter: "llm-inference",
    level: 2,
    question: "模型量化的常见方法有哪些？INT8 和 INT4 量化各有什么优缺点？",
    answer:
      "常见量化方法：①GPTQ——基于二阶信息的后训练量化，逐层用 Hessian 矩阵逆补偿量化误差。②AWQ（Activation-aware Weight Quantization）——根据激活值分布保护重要权重通道，保持关键权重精度。③GGUF（原 GGML）——llama.cpp 生态的量化格式，支持多种量化级别，适合 CPU/边缘部署。④PTQ（Post-Training Quantization）——不需重训练，直接量化预训练模型。INT8 量化：将 FP16 权重压缩到 8 位整数，显存减少约 50%，精度损失极小（通常 <1%），几乎所有 GPU 支持 INT8 加速。优点是精度好，缺点是压缩比不够大。INT4 量化：将权重压缩到 4 位，显存减少约 75%，但精度损失较大（2-5%），部分能力（如复杂推理）可能下降明显。优点是极大降低显存和成本，缺点是需要更精细的校准和误差补偿。选择原则：对精度要求高用 INT8，对成本敏感且可接受少量精度损失用 INT4，实践中常用混合精度（关键层 FP16/INT8，其余 INT4）。",
    tags: ["量化", "GPTQ", "AWQ", "INT8", "INT4", "PTQ"],
  },
  {
    id: "llm-inference-3",
    chapter: "llm-inference",
    level: 2,
    question: "连续批处理（Continuous Batching）为什么能大幅提升推理吞吐量？",
    answer:
      "传统静态批处理的问题：①不同请求长度不同，必须等最长请求完成才能释放整个 batch，短请求的 GPU 空闲浪费；②新请求必须等当前 batch 完成才能加入，排队延迟高。连续批处理（也叫 Inflight Batching / Dynamic Batching）解决方案：①请求级动态拼批——不同请求可在不同时间加入/离开 batch，无需同步等待；②Iteration-level 调度——每个 token 生成步都可重新组 batch，已完成请求立即返回，新请求立即加入；③Padding 最小化——同一 batch 内只对当前步的 token 做对齐，而非整个序列。效果：①GPU 利用率从 30-40% 提升到 70-90%；②吞吐量提升 2-10 倍；③降低用户排队延迟。vLLM 和 TGI 等框架内置连续批处理，是大模型服务化的标配技术。配合 PagedAttention 管理 KV Cache，进一步支持更多并发请求。",
    tags: ["连续批处理", "Inflight Batching", "吞吐量", "vLLM", "TGI"],
  },
  {
    id: "llm-inference-4",
    chapter: "llm-inference",
    level: 3,
    question: "投机解码（Speculative Decoding）的原理是什么？它如何在不损失精度的前提下加速生成？",
    answer:
      "投机解码原理：①用一个小模型（Draft Model）快速生成 k 个候选 token（起草）；②用大模型（Target Model）并行验证这 k 个 token——大模型一次前向传播即可验证多个 token（因为注意力可并行计算）；③接受大模型概率分布一致的 token，拒绝不一致的，从第一个拒绝点重新采样。加速原理：①大模型的自回归生成是访存密集型（每步只生成 1 token 但要加载全部权重），GPU 利用率低；②投机解码让大模型一次前向传播验证多个 token，将多次串行的 Decode 步合并为一次并行计算；③小模型虽要生成 k 个 token，但小模型推理极快。不损失精度的原因：验证过程保证最终输出与大模型自回归生成的分布完全一致——接受/拒绝逻辑保证了采样等价性，只是改变了计算顺序。Medusa 头是变体——在大模型上添加多个预测头直接并行预测多个未来 token，无需单独小模型。实际加速 2-3 倍，在长文本生成场景效果显著。",
    tags: ["投机解码", "Speculative Decoding", "Medusa", "加速生成", "无损"],
  },
];
