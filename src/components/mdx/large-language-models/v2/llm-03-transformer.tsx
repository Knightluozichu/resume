"use client";

import { LlmEvidenceLab, type LlmEvidenceModel } from "./llm-evidence-lab";

const model = {
  unitId: "llm-03",
  title: "第3章 Transformer",
  question: "每个张量shape、掩码、位置关系、缓存和近似优化怎样影响同一输出？",
  concepts: [
    "第3章 Transformer",
    "3.1 Transformer编码器模块",
    "3.2 编码器-解码器架构",
    "3.3 位置嵌入",
    "3.3.1 绝对位置编码",
    "3.3.2 相对位置编码",
    "3.4 更长的上下文",
    "3.5 外部记忆",
    "3.6 更快、更小的Transformer",
    "3.6.1 高效注意力",
    "3.6.2 条件计算",
    "3.6.3 搜索高效Transformer",
    "3.6.4 在单个GPU上一天内训练一个语言模型",
    "3.7 推理优化",
    "3.7.1 推测解码",
    "3.7.2 简化Transformer",
    "3.7.3 修剪",
    "3.7.4 蒸馏",
    "3.7.5 混合精度",
    "3.7.6 高效扩展Transformer推理",
    "3.8 小结",
  ],
  invariant: "批次、头、序列、通道轴、因果掩码、位置、精度和缓存版本一致",
  fault: "因果掩码方向反转，注意力仍有数值却泄漏未来词元",
  artifact: "shape账本、注意力矩阵、缓存轨迹、首差与优化误差",
  stages: [
    {
      name: "第3章 Transformer · 数据与输入",
      input: "在一个可手算短序列上逐层追踪Transformer与推理解码",
      operation:
        "冻结注意力计算、位置与推理状态所需的数据角色、版本、切分、模板和shape",
      output: "第3章 Transformer的输入合同、版本表与基线快照",
      check: "第3章 Transformer的来源、许可、角色、单位、shape和可见性没有越界",
    },
    {
      name: "第3章 Transformer · 目标与计算",
      input: "第3章 Transformer的冻结输入与模型快照",
      operation:
        "执行从注意力、编码器—解码器、位置表示、长上下文、外部记忆到推理优化重建Transformer计算链的最小计算并保存中间状态",
      output: "第3章 Transformer的目标分量、计算轨迹与单故障分岔",
      check: "第3章 Transformer每一步可由同一输入、公式、版本和随机状态复算",
    },
    {
      name: "第3章 Transformer · 输出与解码",
      input: "第3章 Transformer的中间状态、候选与决策规则",
      operation: "比较输出、路由、检索、策略或资源估计的更新前后状态",
      output: "第3章 Transformer的候选差、引用/策略/资源谱系与恢复路径",
      check:
        "第3章 Transformer没有把代理目标、精选输出或训练内统计当作最终结论",
    },
    {
      name: "第3章 Transformer · 独立评估",
      input: "第3章 Transformer的冻结候选与未见数据、盲评或独立诊断",
      operation: "重放预测、单故障、恢复和不适用边界",
      output: "第3章 Transformer的接受、回退或拒绝理由",
      check:
        "第3章 Transformer满足“批次、头、序列、通道轴、因果掩码、位置、精度和缓存版本一致”",
    },
  ],
  cases: [
    {
      name: "第3章 Transformer · 基线",
      setup:
        "固定在一个可手算短序列上逐层追踪Transformer与推理解码的数据、模型、模板、种子和预算",
      prediction:
        "第3章 Transformer的参考轨迹应持续满足“批次、头、序列、通道轴、因果掩码、位置、精度和缓存版本一致”",
      boundary: "第3章 Transformer只回答本页正式坐标与已运行实验合同内的问题",
    },
    {
      name: "第3章 Transformer · 单故障",
      setup:
        "保持其余条件不变，只注入“因果掩码方向反转，注意力仍有数值却泄漏未来词元”",
      prediction:
        "第3章 Transformer应出现可定位的首个状态分岔，而不是只在末端输出异常",
      boundary:
        "第3章 Transformer的故障结论不能外推到未运行的数据、模型、语言或部署流量",
    },
    {
      name: "第3章 Transformer · 恢复",
      setup:
        "撤销故障并从同一快照重放在一个可手算短序列上逐层追踪Transformer与推理解码",
      prediction: "第3章 Transformer的计算、独立评估和交付证据应恢复基线",
      boundary:
        "第3章 Transformer若不能复现恢复结果，就不能把异常归因给单一故障",
    },
  ],
  referenceTrace: [
    "第3章 Transformer参考步骤1：冻结注意力计算、位置与推理状态所需的数据角色、版本、切分、模板和shape；保存第3章 Transformer的输入合同、版本表与基线快照。",
    "第3章 Transformer参考步骤2：执行从注意力、编码器—解码器、位置表示、长上下文、外部记忆到推理优化重建Transformer计算链的最小计算并保存中间状态；保存第3章 Transformer的目标分量、计算轨迹与单故障分岔。",
    "第3章 Transformer参考步骤3：比较输出、路由、检索、策略或资源估计的更新前后状态；保存第3章 Transformer的候选差、引用/策略/资源谱系与恢复路径。",
    "第3章 Transformer参考步骤4：重放预测、单故障、恢复和不适用边界；保存第3章 Transformer的接受、回退或拒绝理由。",
  ],
  faultTrace: [
    "第3章 Transformer故障步骤1：保持在一个可手算短序列上逐层追踪Transformer与推理解码不变，检查第3章 Transformer的输入合同、版本表与基线快照如何受单一故障传播。",
    "第3章 Transformer故障步骤2：只注入“因果掩码方向反转，注意力仍有数值却泄漏未来词元”，记录首个偏离“第3章 Transformer每一步可由同一输入、公式、版本和随机状态复算”的状态。",
    "第3章 Transformer故障步骤3：保持第3章 Transformer的中间状态、候选与决策规则不变，检查第3章 Transformer的候选差、引用/策略/资源谱系与恢复路径如何受单一故障传播。",
    "第3章 Transformer故障步骤4：保持第3章 Transformer的冻结候选与未见数据、盲评或独立诊断不变，检查第3章 Transformer的接受、回退或拒绝理由如何受单一故障传播。",
  ],
  gates: [
    {
      label: "原书结构与时间边界",
      detail:
        "第3章 Transformer区分2024年发行版目录、原始研究、当前框架行为与本站独立重写，不把后续进展倒填为原书内容。",
    },
    {
      label: "数据、表示与计算合同",
      detail:
        "第3章 Transformer的输入、来源、切分、词元/模态shape、模型版本、中间状态和随机性可复算。",
    },
    {
      label: "目标、输出与资源合同",
      detail:
        "第3章 Transformer的训练/代理目标、解码/路由/检索决策、输出、引用、资源或伤害指标已归档。",
    },
    {
      label: "独立评估与社会技术边界",
      detail:
        "第3章 Transformer以未见数据、盲评或独立诊断复核“批次、头、序列、通道轴、因果掩码、位置、精度和缓存版本一致”，并报告“因果掩码方向反转，注意力仍有数值却泄漏未来词元”的恢复结果。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function Llm03TransformerContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function Llm03TransformerComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function Llm03TransformerEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
