"use client";

import { NlpEvidenceLab, type NlpEvidenceModel } from "./nlp-evidence-lab";

const model = {
  unitId: "dna-app-a",
  title: "附录A sigmoid函数和tanh函数的导数",
  question:
    "怎样让符号推导、数值差分与饱和区观测相互印证？ 本章各目录坐标如何汇合为同一证据链？",
  concepts: [
    "附录A sigmoid函数和tanh函数的导数",
    "A.1 sigmoid函数",
    "A.2 tanh函数",
    "A.3 小结",
  ],
  stages: [
    {
      name: "选择输入",
      input:
        "附录A sigmoid函数和tanh函数的导数：锁定语料/数据、词表、切分与运行版本，保持其余表示、序列与评价合同不变",
      operation:
        "冻结数据哈希、token/ID映射、dtype/shape、时间窗口和允许读取的信息，并持续满足“函数值、解析导数、差分步长、误差与输入区间一致；附录A sigmoid函数和tanh函数的导数的结论不得越过原版目录与数据边界”",
      output: "选择输入产生可追溯NLP实验前置状态",
      check:
        "可追溯NLP实验前置状态、词ID/shape/状态/梯度/指标断言；出现“只在零点验证导数，忽略大绝对值输入的数值与梯度边界；在附录A sigmoid函数和tanh函数的导数验收中只注入这一处”时停止",
    },
    {
      name: "计算函数",
      input:
        "附录A sigmoid函数和tanh函数的导数：执行本章表示、采样、序列或对齐变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存输入输出ID/shape、权重、隐藏状态、mask、参数与缓存，并持续满足“函数值、解析导数、差分步长、误差与输入区间一致；附录A sigmoid函数和tanh函数的导数的结论不得越过原版目录与数据边界”",
      output: "计算函数产生可重放表示或序列状态",
      check:
        "可重放表示或序列状态、词ID/shape/状态/梯度/指标断言；出现“只在零点验证导数，忽略大绝对值输入的数值与梯度边界；在附录A sigmoid函数和tanh函数的导数验收中只注入这一处”时停止",
    },
    {
      name: "推导导数",
      input:
        "附录A sigmoid函数和tanh函数的导数：执行损失、反向、状态更新或统计变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存目标、损失分母、梯度范数、时间索引、采样分布和更新轨迹，并持续满足“函数值、解析导数、差分步长、误差与输入区间一致；附录A sigmoid函数和tanh函数的导数的结论不得越过原版目录与数据边界”",
      output: "推导导数产生可复核学习状态",
      check:
        "可复核学习状态、词ID/shape/状态/梯度/指标断言；出现“只在零点验证导数，忽略大绝对值输入的数值与梯度边界；在附录A sigmoid函数和tanh函数的导数验收中只注入这一处”时停止",
    },
    {
      name: "数值差分",
      input:
        "附录A sigmoid函数和tanh函数的导数：运行参考案例与单一故障注入，保持其余表示、序列与评价合同不变",
      operation:
        "保存近邻、序列输出、对齐权重、指标、异常和回退差分，并持续满足“函数值、解析导数、差分步长、误差与输入区间一致；附录A sigmoid函数和tanh函数的导数的结论不得越过原版目录与数据边界”",
      output: "数值差分产生可比较NLP行为",
      check:
        "可比较NLP行为、词ID/shape/状态/梯度/指标断言；出现“只在零点验证导数，忽略大绝对值输入的数值与梯度边界；在附录A sigmoid函数和tanh函数的导数验收中只注入这一处”时停止",
    },
    {
      name: "检查饱和",
      input:
        "附录A sigmoid函数和tanh函数的导数：在隔离评价集上重放并核对历史边界，保持其余表示、序列与评价合同不变",
      operation:
        "检查语料泄漏、词表漂移、时序状态、随机性、指标和2018/当前边界，并持续满足“函数值、解析导数、差分步长、误差与输入区间一致；附录A sigmoid函数和tanh函数的导数的结论不得越过原版目录与数据边界”",
      output: "检查饱和产生独立NLP证据包",
      check:
        "独立NLP证据包、词ID/shape/状态/梯度/指标断言；出现“只在零点验证导数，忽略大绝对值输入的数值与梯度边界；在附录A sigmoid函数和tanh函数的导数验收中只注入这一处”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "为“附录A sigmoid函数和tanh函数的导数”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 固定数据、词表、输入、shape、时间顺序、容差和种子。",
      prediction:
        "沿“选择输入 → 计算函数 → 推导导数 → 数值差分 → 检查饱和”得到可复核NLP证据链。",
      boundary:
        "全过程必须满足“函数值、解析导数、差分步长、误差与输入区间一致；附录A sigmoid函数和tanh函数的导数的结论不得越过原版目录与数据边界”。",
    },
    {
      name: "边界反例",
      observation:
        "为“附录A sigmoid函数和tanh函数的导数”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 其余条件不变，只注入“只在零点验证导数，忽略大绝对值输入的数值与梯度边界；在附录A sigmoid函数和tanh函数的导数验收中只注入这一处”。",
      prediction:
        "定位第一处词ID、shape、表示、时序状态、梯度、采样或评价偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“附录A sigmoid函数和tanh函数的导数”冻结语料/数据、词表、dtype/shape、时间顺序、容差和随机种子",
    "执行选择输入、计算函数，保存词ID、输入输出、表示、状态、参数与缓存",
    "推进推导导数、数值差分，记录损失、梯度、采样、序列与评价状态",
    "在检查饱和交付dna-app-a语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  ],
  faultTrace: [
    "“附录A sigmoid函数和tanh函数的导数”复用相同语料/数据、词表、dtype/shape、时间顺序、容差和种子",
    "只改变一个条件：只在零点验证导数，忽略大绝对值输入的数值与梯度边界；在附录A sigmoid函数和tanh函数的导数验收中只注入这一处",
    "沿“选择输入 → 计算函数 → 推导导数 → 数值差分 → 检查饱和”寻找最早的词ID、表示、时序、梯度、采样或评价分叉",
    "撤销故障重放；只有“函数值、解析导数、差分步长、误差与输入区间一致；附录A sigmoid函数和tanh函数的导数的结论不得越过原版目录与数据边界”恢复才接受修正",
  ],
  invariant:
    "函数值、解析导数、差分步长、误差与输入区间一致；附录A sigmoid函数和tanh函数的导数的结论不得越过原版目录与数据边界",
  fault:
    "只在零点验证导数，忽略大绝对值输入的数值与梯度边界；在附录A sigmoid函数和tanh函数的导数验收中只注入这一处",
  artifact:
    "dna-app-a语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  gates: [
    {
      label: "语料、词表与切分",
      detail:
        "“附录A sigmoid函数和tanh函数的导数”的语料/数据哈希、token/ID映射、训练/验证/测试切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "表示、shape与时序状态",
      detail:
        "“附录A sigmoid函数和tanh函数的导数”的输入输出词ID、表示/参数shape、时间索引、隐藏状态、mask和前向缓存已冻结。",
    },
    {
      label: "梯度、采样与随机性",
      detail:
        "“附录A sigmoid函数和tanh函数的导数”的损失分母、局部/累加梯度、负采样或解码策略、初值和随机种子可重放。",
    },
    {
      label: "独立评价与历史边界",
      detail:
        "“附录A sigmoid函数和tanh函数的导数”归档近邻/困惑度/序列或对齐指标、独立评价、反例、复现环境和2018/当前标签。",
    },
  ],
} as const satisfies NlpEvidenceModel;

export function DnaAppendixAActivationDerivativesRepresentationLedgerLab() {
  return <NlpEvidenceLab model={model} view="representation-ledger" />;
}

export function DnaAppendixAActivationDerivativesSequenceTraceLab() {
  return <NlpEvidenceLab model={model} view="sequence-trace" />;
}

export function DnaAppendixAActivationDerivativesEvaluationGateLab() {
  return <NlpEvidenceLab model={model} view="evaluation-gate" />;
}
