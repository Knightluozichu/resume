import type { ReviewQuestion } from "./types";

export const lslServingInferenceQuestions: ReviewQuestion[] = [
  {
    id: "lsl-serving-inference-1",
    chapter: "lsl-serving-inference",
    level: 1,
    question: `KV 缓存为什么能加速推理？它的显存占用如何计算？`,
    answer:
      `KV 缓存加速原理：自回归生成时，每生成一个新 Token 需要计算它与之前所有 Token 的注意力。若不缓存，每步都需重新计算所有历史 Token 的 Key/Value 投影，计算量为 O(n^2)。KV 缓存将之前步骤算出的 Key/Value 向量缓存下来，新 Token 只需计算自己的 Q/K/V，然后用新 Q 与缓存的 K 算注意力、与缓存的 V 加权求和。每步计算量降为 O(n)，总推理从 O(n^3) 降为 O(n^2)。显存占用计算：KV 缓存大小 = 2（K和V）* n_layers * n_heads * d_head * seqlen * batch_size * 2_bytes（FP16）。以 LLaMA-7B 为例：32 层 * 32 头 * 128 维 * 2(KV) * 2 bytes = 0.5MB/Token，2048 上下文单条请求约 1GB，batch=32 约 32GB，与模型参数（14GB FP16）相当甚至更大。这就是为什么长上下文和 batch 推理时显存压力大，也是 PagedAttention、MQA/GQA 等优化 KV 缓存技术的动机。`,
    tags: ["KV缓存", "推理加速", "显存计算"],
  },
  {
    id: "lsl-serving-inference-2",
    chapter: "lsl-serving-inference",
    level: 2,
    question: `vLLM 的 PagedAttention 如何工作？为什么能大幅提升吞吐？`,
    answer:
      `PagedAttention 借鉴操作系统虚拟内存的分页机制管理 KV 缓存：①传统方式为每个请求预分配最大上下文长度的连续 KV 缓存空间，导致大量显存浪费（实际生成长度通常远小于最大值）和碎片化。②PagedAttention 将 KV 缓存划分为固定大小的块（block，如 16 Token/块），用块表（block table）映射逻辑块到物理块，物理块可非连续存储。③按需分配——请求生成时动态分配新块，无需预分配最大空间，显存利用率从约 20-40% 提升到接近 100%。④Copy-on-Write 共享——多个请求共享相同前缀（如系统 prompt）的 KV 缓存块，只在分叉处复制新块，大幅减少重复计算和存储。⑤消除碎片——非连续分配消除外部碎片，块大小固定消除内部碎片。提升吞吐的原因：①更高 batch size——显存利用率提升后可同时处理更多请求。②更少显存浪费——从预分配最大到按需分配，同样的 GPU 可服务更多并发请求。③前缀共享——多请求共享 prompt 前缀的 KV，减少重复计算。vLLM 实测吞吐比 HuggingFace Transformers 高 2-4 倍，是目前最流行的开源推理框架。`,
    tags: ["PagedAttention", "vLLM", "分页管理", "吞吐优化"],
  },
  {
    id: "lsl-serving-inference-3",
    chapter: "lsl-serving-inference",
    level: 2,
    question: `INT8 和 INT4 量化的原理和适用场景分别是什么？AWQ/GPTQ 如何减少量化精度损失？`,
    answer:
      `量化原理：将 FP16 权重映射到低位整数（INT8/INT4），减少显存和加速计算。INT8 将 FP16 值线性映射到 [-128, 127]，显存降 50%，计算用 INT8 矩阵乘法（GPU Tensor Core 支持）加速。INT4 映射到 [-8, 7]，显存降 75%，但精度损失更大，需特殊处理。适用场景：INT8 近似无损，适合生产环境通用部署；INT4 轻微掉点（1-3%），适合显存极度受限场景（如单卡部署大模型）。AWQ（Activation-aware Weight Quantization）减少损失：①观察发现并非所有权重通道同等重要——激活值大的通道对应的权重对输出影响大。②保护这些「重要通道」保持高精度（FP16），其余通道量化到 INT4。③通过分析校准数据的激活分布自动识别重要通道，无需反向传播。GPTQ 减少损失：①基于二阶信息（Hessian 矩阵）的逐层量化。②量化一个权重时考虑它对未量化权重的影响，用 Hessian 信息做误差补偿。③逐列量化并更新剩余权重补偿量化误差。两者相比：AWQ 更简单高效（无需复杂计算），GPTQ 精度略高但更慢。实践：INT4 量化推荐 AWQ 或 GPTQ，INT8 可用简单的 RTN（Round-to-Nearest）。`,
    tags: ["量化", "INT8", "INT4", "AWQ", "GPTQ"],
  },
  {
    id: "lsl-serving-inference-4",
    chapter: "lsl-serving-inference",
    level: 3,
    question: `投机解码（Speculative Decoding）如何加速推理？连续批处理为什么能提升 GPU 利用率？`,
    answer:
      `投机解码加速推理：①动机——大模型自回归生成是内存带宽受限的（每步只生成 1 个 Token，计算量小但需读取全部权重），GPU 计算利用率低。②方法——用一个小的「草稿模型」快速生成 k 个候选 Token（小模型快但可能不准），大模型一次前向并行验证这 k 个 Token（大模型慢但一次前向可验证多个）。③接受策略——大模型对比自己的概率分布和草稿模型的分布，接受一致的 Token，拒绝处从大模型分布重新采样。④加速原理——若草稿模型准确率高，大模型一次前向可确认多个 Token，减少大模型的前向次数。若草稿模型生成 4 个 Token 验证通过 3 个，大模型一次前向产出 4 个 Token（3 接受+1重采样），速度提升近 4 倍。⑤关键——草稿模型要小且快，同时与大模型分布接近（可用同一模型的小版本或 n-gram 模型）。连续批处理提升 GPU 利用率：①传统静态批处理——等一个 batch 的所有请求都生成完才处理下一 batch，长请求拖累短请求，GPU 空闲等待。②连续批处理——在 iteration 级别动态调度：某请求生成完立即从 batch 移除，新请求立即加入，不同长度请求共存。③GPU 持续满载——无空闲等待，吞吐提升 3-8 倍。④配合 PagedAttention——非连续 KV 缓存使动态加入/退出 batch 更高效。两者结合（vLLM）是当前最高效的推理方案。`,
    tags: ["投机解码", "连续批处理", "GPU利用率", "推理加速", "综合"],
  },
];
