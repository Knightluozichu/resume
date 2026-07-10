import type { ReviewQuestion } from "./types";

export const cgptInferenceServingQuestions: ReviewQuestion[] = [
  {
    id: "cgpt-inference-serving-1",
    chapter: "cgpt-inference-serving",
    level: 1,
    question: `大模型推理有哪两大瓶颈？它们分别发生在什么阶段？`,
    answer:
      `两大瓶颈：①计算瓶颈（Compute Bound）——发生在 Prefill 阶段（处理输入 prompt），需要一次性计算所有输入 token 的注意力，受 GPU 算力限制，优化方向是提高算力利用率。②访存瓶颈（Memory Bound）——发生在 Decode 阶段（逐 token 生成），每生成一个 token 都要读取全部 KV 缓存，数据搬运量远大于计算量，受显存带宽限制。理解瓶颈类型是选优化技术的前提：Prefill 优化靠算力，Decode 优化靠减访存。`,
    tags: ["推理瓶颈", "Prefill", "Decode", "访存瓶颈"],
  },
  {
    id: "cgpt-inference-serving-2",
    chapter: "cgpt-inference-serving",
    level: 2,
    question: `KV Cache 的原理是什么？为什么它是推理加速的头号功臣？`,
    answer:
      `KV Cache 缓存历史 token 的 Key 和 Value 矩阵。原理：自注意力中每个新 token 要和所有历史 token 计算注意力，历史 token 的 K/V 不变，若不缓存每次都要重算。缓存后生成第 t 个 token 时只需算新 token 的 Q，与缓存的 K/V 做注意力，复杂度从 O(t²) 降到 O(t)。它是头号功臣因为：①避免重复计算，直接降几个数量级计算量。②简单有效，几乎所有推理框架都标配。代价是占显存——KV 缓存随序列长度线性增长，长上下文场景显存压力大，于是有了 PagedAttention 分页管理。`,
    tags: ["KV Cache", "推理加速", "缓存原理"],
  },
  {
    id: "cgpt-inference-serving-3",
    chapter: "cgpt-inference-serving",
    level: 2,
    question: `量化、连续批处理、PagedAttention 分别解决什么问题？`,
    answer:
      `①量化（FP16→INT8/INT4）解决显存占用和带宽问题——权重和激活用低位表示，显存减半再减半，访存量降低，Decode 阶段提速明显；GPTQ/AWQ/GGUF 是主流算法，代价是少量精度损失。②连续批处理（Continuous Batching）解决吞吐量问题——传统批处理要等一个批次所有请求完成才能加新请求，短请求被长请求拖累；连续批处理让请求动态进出批次，GPU 利用率大增，吞吐量倍增。③PagedAttention 解决 KV 缓存碎片问题——像操作系统分页管理内存，把 KV 缓存分块按需分配，消除碎片，支持更长上下文和更高并发，是 vLLM 的核心技术。`,
    tags: ["量化", "连续批处理", "PagedAttention"],
  },
  {
    id: "cgpt-inference-serving-4",
    chapter: "cgpt-inference-serving",
    level: 3,
    question: `选型推理框架时需权衡哪些维度？vLLM、TGI、llama.cgpt 各适合什么场景？`,
    answer:
      `权衡维度：延迟（首 token 延迟 TTFT、每 token 延迟）、吞吐量（QPS）、显存效率、模型支持度、部署复杂度、量化灵活性。①vLLM——PagedAttention + 连续批处理，吞吐量王者，适合高并发生产服务，对主流模型支持好。②TGI（Text Generation Inference）——HuggingFace 出品，生态好易集成，适合已用 HF 体系的团队。③llama.cgpt——CPU/GPU 混合，GGUF 量化极致轻量，适合消费级硬件、边缘部署、本地推理。选型原则：云端高并发选 vLLM，HF 生态选 TGI，本地/边缘/低配选 llama.cgpt。`,
    tags: ["推理框架", "vLLM", "选型权衡", "llama.cgpt"],
  },
];
