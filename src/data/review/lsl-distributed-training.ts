import type { ReviewQuestion } from "./types";

export const lslDistributedTrainingQuestions: ReviewQuestion[] = [
  {
    id: "lsl-distributed-training-1",
    chapter: "lsl-distributed-training",
    level: 1,
    question: "数据并行、张量并行、流水线并行三种并行策略分别切分什么？各自有什么瓶颈？",
    answer:
      "数据并行（DP）：每张 GPU 持有完整模型副本，将训练数据切分到各卡，各卡独立做前向/反向，通过 AllReduce 同步梯度。瓶颈：模型必须能装入单卡显存，无法训练超大模型。张量并行（TP）：将模型权重矩阵按行或列切分到不同 GPU，每卡持有部分参数，层内通过 AllReduce 通信。瓶颈：层内通信频繁且量大，通常限制在同一机内（NVLink 高带宽），跨机通信代价高。流水线并行（PP）：将模型按层切分到不同 GPU，每卡持有一段连续层，数据以微批次流水线方式流过各卡。瓶颈：产生流水线气泡——某些 GPU 在等待其他 GPU 完成计算时空闲，气泡比例随流水线阶段数增加。三种并行互补：DP 扩规模、TP 切大层、PP 切层数，3D 组合（DP x TP x PP）可训练万亿参数模型。",
    tags: ["数据并行", "张量并行", "流水线并行", "3D并行"],
  },
  {
    id: "lsl-distributed-training-2",
    chapter: "lsl-distributed-training",
    level: 2,
    question: "ZeRO 优化器的三个阶段分别切分什么？显存节省和通信代价如何权衡？",
    answer:
      "ZeRO（Zero Redundancy Optimizer）三个阶段：ZeRO-1 切分优化器状态（optimizer states，如 Adam 的动量和方差），显存降低约 4x，通信量与标准 DP 相同（AllReduce 梯度）。ZeRO-2 在 ZeRO-1 基础上额外切分梯度，显存降低约 8x，通信量仍与 DP 相当（用 Reduce-Scatter 替代 AllReduce）。ZeRO-3 在 ZeRO-2 基础上额外切分模型参数，显存降低 Nx（N=GPU 数），但通信量增大——前向和反向时需通过 All-Gather 临时收集完整参数，通信量为 ZeRO-2 的约 1.5x。权衡：ZeRO-1/2 几乎无额外通信开销，是「免费午餐」；ZeRO-3 用更多通信换显存，适合模型大到 ZeRO-2 放不下的场景。实践中常用 ZeRO-2（性价比最优）或 ZeRO-3（模型极大时），DeepSpeed 和 FSDP 都实现了 ZeRO。显存构成参考：7B 模型 FP16 训练，参数 14GB + 梯度 14GB + Adam 优化器状态 56GB + 激活值，ZeRO-3 可将前三项从 84GB 分摊到多卡。",
    tags: ["ZeRO", "显存优化", "通信代价", "优化器状态"],
  },
  {
    id: "lsl-distributed-training-3",
    chapter: "lsl-distributed-training",
    level: 2,
    question: "混合精度训练如何工作？激活重计算（Gradient Checkpointing）如何以计算换显存？",
    answer:
      "混合精度训练：①用 FP16/BF16 做前向和反向计算（速度快、显存省），用 FP32 维护主权重和优化器状态（精度高）。②前向时将 FP32 权重转为 FP16 计算前向；反向得到 FP16 梯度后转为 FP32 更新主权重。③损失缩放（Loss Scaling）——FP16 动态范围小，反向时小梯度可能下溢为 0，将 loss 乘以缩放因子放大梯度，更新前再缩放回来。BF16（Brain Float 16）有与 FP32 相同的动态范围（8 位指数），无需损失缩放，现代 GPU（A100+）支持 BF16 后成为主流。激活重计算：①正常训练需保存前向所有中间激活值用于反向传播，激活显存随层数和序列长度线性增长。②激活重计算只保存部分检查点（如每层的输入），前向时不保存中间激活。③反向时在检查点之间重新做前向计算恢复激活，用约 33% 的额外计算换取激活显存大幅降低（可降到 sqrt(层数) 级别）。④选择性重计算——只重计算占用显存大但计算量小的激活（如注意力矩阵），进一步优化计算-显存权衡。两者结合是大模型长序列训练的标准配置。",
    tags: ["混合精度", "BF16", "激活重计算", "显存优化"],
  },
  {
    id: "lsl-distributed-training-4",
    chapter: "lsl-distributed-training",
    level: 3,
    question: "如何为一个千亿参数模型设计 3D 并行策略？需要考虑哪些因素？",
    answer:
      "设计 3D 并行需考虑：①模型大小与单卡显存——千亿参数 FP16 需约 200GB（参数+梯度+优化器），远超单卡 80GB，必须用 TP/PP/ZeRO 切分。②TP 范围——TP 通信量大（层内 AllReduce），通常限制在同一机内（8 卡 NVLink 互联），TP 度一般取 4-8。③PP 范围——PP 通信量小（层间 send/recv），可跨机，PP 度根据层数和节点数确定。④DP 扩规模——TP*PP 确定单副本卡数后，剩余卡做 DP 扩展到更多节点。⑤通信拓扑——机内 NVLink 高带宽适合 TP，机间 InfiniBand 适合 PP 和 DP 的 AllReduce。⑥流水线气泡——用 1F1B 或 Interleave 调度减少气泡，Interleave 将每卡的层段进一步切分减少等待。⑦负载均衡——各 PP 阶段的计算量应均衡，避免最慢阶段拖累。⑧示例配置：175B 模型，TP=8（单机8卡）x PP=8（8台机器）= 64 卡/副本，DP=8（再8台）= 512 卡总。⑨ ZeRO 配合——在 DP 维度可叠加 ZeRO-1/2 进一步切分优化器状态。综合考虑模型结构、集群拓扑、通信带宽、气泡比例做整体优化。",
    tags: ["3D并行", "千亿模型", "并行设计", "综合决策"],
  },
];
