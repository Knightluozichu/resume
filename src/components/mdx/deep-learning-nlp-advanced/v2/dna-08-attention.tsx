"use client";

import { NlpEvidenceLab, type NlpEvidenceModel } from "./nlp-evidence-lab";

const model = {
  unitId: "dna-08",
  title: "第8章 Attention",
  question:
    "怎样证明注意力图来自归一化对齐计算，而不是只展示漂亮热力图？ 本章各目录坐标如何汇合为同一证据链？",
  concepts: [
    "第8章 Attention",
    "8.1 Attention的结构",
    "8.1.1 seq2seq存在的问题",
    "8.1.2 编码器的改进",
    "8.1.3 解码器的改进①",
    "8.1.4 解码器的改进②",
    "8.1.5 解码器的改进③",
    "8.2 带Attention的seq2seq的实现",
    "8.2.1 编码器的实现",
    "8.2.2 解码器的实现",
    "8.2.3 seq2seq的实现",
    "8.3 Attention的评价",
    "8.3.1 日期格式转换问题",
    "8.3.2 带Attention的seq2seq的学习",
    "8.3.3 Attention的可视化",
    "8.4 关于Attention的其他话题",
    "8.4.1 双向RNN",
    "8.4.2 Attention层的使用方法",
    "8.4.3 seq2seq的深层化和skip connection",
    "8.5 Attention的应用",
    "8.5.1 GNMT",
    "8.5.2 Transformer",
    "8.5.3 NTM",
    "8.6 小结",
  ],
  stages: [
    {
      name: "冻结序列",
      input:
        "第8章 Attention：锁定语料/数据、词表、切分与运行版本，保持其余表示、序列与评价合同不变",
      operation:
        "冻结数据哈希、token/ID映射、dtype/shape、时间窗口和允许读取的信息，并持续满足“Encoder序列、score、softmax轴、mask、context加权和、Decoder状态与评价一致；第8章 Attention的结论不得越过原版目录与数据边界”",
      output: "冻结序列产生可追溯NLP实验前置状态",
      check:
        "可追溯NLP实验前置状态、词ID/shape/状态/梯度/指标断言；出现“在错误轴归一化、忽略padding，或把8.5.2 Transformer扩写成原书独立章；在第8章 Attention验收中只注入这一处”时停止",
    },
    {
      name: "计算score",
      input:
        "第8章 Attention：执行本章表示、采样、序列或对齐变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存输入输出ID/shape、权重、隐藏状态、mask、参数与缓存，并持续满足“Encoder序列、score、softmax轴、mask、context加权和、Decoder状态与评价一致；第8章 Attention的结论不得越过原版目录与数据边界”",
      output: "计算score产生可重放表示或序列状态",
      check:
        "可重放表示或序列状态、词ID/shape/状态/梯度/指标断言；出现“在错误轴归一化、忽略padding，或把8.5.2 Transformer扩写成原书独立章；在第8章 Attention验收中只注入这一处”时停止",
    },
    {
      name: "归一Attention",
      input:
        "第8章 Attention：执行损失、反向、状态更新或统计变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存目标、损失分母、梯度范数、时间索引、采样分布和更新轨迹，并持续满足“Encoder序列、score、softmax轴、mask、context加权和、Decoder状态与评价一致；第8章 Attention的结论不得越过原版目录与数据边界”",
      output: "归一Attention产生可复核学习状态",
      check:
        "可复核学习状态、词ID/shape/状态/梯度/指标断言；出现“在错误轴归一化、忽略padding，或把8.5.2 Transformer扩写成原书独立章；在第8章 Attention验收中只注入这一处”时停止",
    },
    {
      name: "汇聚context",
      input:
        "第8章 Attention：运行参考案例与单一故障注入，保持其余表示、序列与评价合同不变",
      operation:
        "保存近邻、序列输出、对齐权重、指标、异常和回退差分，并持续满足“Encoder序列、score、softmax轴、mask、context加权和、Decoder状态与评价一致；第8章 Attention的结论不得越过原版目录与数据边界”",
      output: "汇聚context产生可比较NLP行为",
      check:
        "可比较NLP行为、词ID/shape/状态/梯度/指标断言；出现“在错误轴归一化、忽略padding，或把8.5.2 Transformer扩写成原书独立章；在第8章 Attention验收中只注入这一处”时停止",
    },
    {
      name: "评价对齐",
      input:
        "第8章 Attention：在隔离评价集上重放并核对历史边界，保持其余表示、序列与评价合同不变",
      operation:
        "检查语料泄漏、词表漂移、时序状态、随机性、指标和2018/当前边界，并持续满足“Encoder序列、score、softmax轴、mask、context加权和、Decoder状态与评价一致；第8章 Attention的结论不得越过原版目录与数据边界”",
      output: "评价对齐产生独立NLP证据包",
      check:
        "独立NLP证据包、词ID/shape/状态/梯度/指标断言；出现“在错误轴归一化、忽略padding，或把8.5.2 Transformer扩写成原书独立章；在第8章 Attention验收中只注入这一处”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "为“第8章 Attention”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 固定数据、词表、输入、shape、时间顺序、容差和种子。",
      prediction:
        "沿“冻结序列 → 计算score → 归一Attention → 汇聚context → 评价对齐”得到可复核NLP证据链。",
      boundary:
        "全过程必须满足“Encoder序列、score、softmax轴、mask、context加权和、Decoder状态与评价一致；第8章 Attention的结论不得越过原版目录与数据边界”。",
    },
    {
      name: "边界反例",
      observation:
        "为“第8章 Attention”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 其余条件不变，只注入“在错误轴归一化、忽略padding，或把8.5.2 Transformer扩写成原书独立章；在第8章 Attention验收中只注入这一处”。",
      prediction:
        "定位第一处词ID、shape、表示、时序状态、梯度、采样或评价偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第8章 Attention”冻结语料/数据、词表、dtype/shape、时间顺序、容差和随机种子",
    "执行冻结序列、计算score，保存词ID、输入输出、表示、状态、参数与缓存",
    "推进归一Attention、汇聚context，记录损失、梯度、采样、序列与评价状态",
    "在评价对齐交付dna-08语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  ],
  faultTrace: [
    "“第8章 Attention”复用相同语料/数据、词表、dtype/shape、时间顺序、容差和种子",
    "只改变一个条件：在错误轴归一化、忽略padding，或把8.5.2 Transformer扩写成原书独立章；在第8章 Attention验收中只注入这一处",
    "沿“冻结序列 → 计算score → 归一Attention → 汇聚context → 评价对齐”寻找最早的词ID、表示、时序、梯度、采样或评价分叉",
    "撤销故障重放；只有“Encoder序列、score、softmax轴、mask、context加权和、Decoder状态与评价一致；第8章 Attention的结论不得越过原版目录与数据边界”恢复才接受修正",
  ],
  invariant:
    "Encoder序列、score、softmax轴、mask、context加权和、Decoder状态与评价一致；第8章 Attention的结论不得越过原版目录与数据边界",
  fault:
    "在错误轴归一化、忽略padding，或把8.5.2 Transformer扩写成原书独立章；在第8章 Attention验收中只注入这一处",
  artifact:
    "dna-08语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  gates: [
    {
      label: "语料、词表与切分",
      detail:
        "“第8章 Attention”的语料/数据哈希、token/ID映射、训练/验证/测试切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "表示、shape与时序状态",
      detail:
        "“第8章 Attention”的输入输出词ID、表示/参数shape、时间索引、隐藏状态、mask和前向缓存已冻结。",
    },
    {
      label: "梯度、采样与随机性",
      detail:
        "“第8章 Attention”的损失分母、局部/累加梯度、负采样或解码策略、初值和随机种子可重放。",
    },
    {
      label: "独立评价与历史边界",
      detail:
        "“第8章 Attention”归档近邻/困惑度/序列或对齐指标、独立评价、反例、复现环境和2018/当前标签。",
    },
  ],
} as const satisfies NlpEvidenceModel;

export function Dna08AttentionRepresentationLedgerLab() {
  return <NlpEvidenceLab model={model} view="representation-ledger" />;
}

export function Dna08AttentionSequenceTraceLab() {
  return <NlpEvidenceLab model={model} view="sequence-trace" />;
}

export function Dna08AttentionEvaluationGateLab() {
  return <NlpEvidenceLab model={model} view="evaluation-gate" />;
}
