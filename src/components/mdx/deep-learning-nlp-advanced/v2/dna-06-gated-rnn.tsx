"use client";

import { NlpEvidenceLab, type NlpEvidenceModel } from "./nlp-evidence-lab";

const model = {
  unitId: "dna-06",
  title: "第6章 Gated RNN",
  question:
    "怎样沿时间检查梯度流，区分门控收益、裁剪作用和正则化效果？ 本章各目录坐标如何汇合为同一证据链？",
  concepts: [
    "第6章 Gated RNN",
    "6.1 RNN的问题",
    "6.1.1 RNN的复习",
    "6.1.2 梯度消失和梯度爆炸",
    "6.1.3 梯度消失和梯度爆炸的原因",
    "6.1.4 梯度爆炸的对策",
    "6.2 梯度消失和LSTM",
    "6.2.1 LSTM的接口",
    "6.2.2 LSTM层的结构",
    "6.2.3 输出门",
    "6.2.4 遗忘门",
    "6.2.5 新的记忆单元",
    "6.2.6 输入门",
    "6.2.7 LSTM的梯度的流动",
    "6.3 LSTM的实现",
    "6.3.1 Time LSTM的实现",
    "6.4 使用LSTM的语言模型",
    "6.5 进一步改进RNNLM",
    "6.5.1 LSTM层的多层化",
    "6.5.2 基于Dropout抑制过拟合",
    "6.5.3 权重共享",
    "6.5.4 更好的RNNLM的实现",
    "6.5.5 前沿研究",
    "6.6 小结",
  ],
  stages: [
    {
      name: "测量梯度",
      input:
        "第6章 Gated RNN：锁定语料/数据、词表、切分与运行版本，保持其余表示、序列与评价合同不变",
      operation:
        "冻结数据哈希、token/ID映射、dtype/shape、时间窗口和允许读取的信息，并持续满足“门值、cell/hidden状态、梯度范数、裁剪阈值、共享权重与训练模式一致；第6章 Gated RNN的结论不得越过原版目录与数据边界”",
      output: "测量梯度产生可追溯NLP实验前置状态",
      check:
        "可追溯NLP实验前置状态、词ID/shape/状态/梯度/指标断言；出现“把梯度裁剪当作消失对策，或在评估时仍启用Dropout随机mask；在第6章 Gated RNN验收中只注入这一处”时停止",
    },
    {
      name: "展开门控",
      input:
        "第6章 Gated RNN：执行本章表示、采样、序列或对齐变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存输入输出ID/shape、权重、隐藏状态、mask、参数与缓存，并持续满足“门值、cell/hidden状态、梯度范数、裁剪阈值、共享权重与训练模式一致；第6章 Gated RNN的结论不得越过原版目录与数据边界”",
      output: "展开门控产生可重放表示或序列状态",
      check:
        "可重放表示或序列状态、词ID/shape/状态/梯度/指标断言；出现“把梯度裁剪当作消失对策，或在评估时仍启用Dropout随机mask；在第6章 Gated RNN验收中只注入这一处”时停止",
    },
    {
      name: "更新记忆",
      input:
        "第6章 Gated RNN：执行损失、反向、状态更新或统计变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存目标、损失分母、梯度范数、时间索引、采样分布和更新轨迹，并持续满足“门值、cell/hidden状态、梯度范数、裁剪阈值、共享权重与训练模式一致；第6章 Gated RNN的结论不得越过原版目录与数据边界”",
      output: "更新记忆产生可复核学习状态",
      check:
        "可复核学习状态、词ID/shape/状态/梯度/指标断言；出现“把梯度裁剪当作消失对策，或在评估时仍启用Dropout随机mask；在第6章 Gated RNN验收中只注入这一处”时停止",
    },
    {
      name: "约束训练",
      input:
        "第6章 Gated RNN：运行参考案例与单一故障注入，保持其余表示、序列与评价合同不变",
      operation:
        "保存近邻、序列输出、对齐权重、指标、异常和回退差分，并持续满足“门值、cell/hidden状态、梯度范数、裁剪阈值、共享权重与训练模式一致；第6章 Gated RNN的结论不得越过原版目录与数据边界”",
      output: "约束训练产生可比较NLP行为",
      check:
        "可比较NLP行为、词ID/shape/状态/梯度/指标断言；出现“把梯度裁剪当作消失对策，或在评估时仍启用Dropout随机mask；在第6章 Gated RNN验收中只注入这一处”时停止",
    },
    {
      name: "模式回归",
      input:
        "第6章 Gated RNN：在隔离评价集上重放并核对历史边界，保持其余表示、序列与评价合同不变",
      operation:
        "检查语料泄漏、词表漂移、时序状态、随机性、指标和2018/当前边界，并持续满足“门值、cell/hidden状态、梯度范数、裁剪阈值、共享权重与训练模式一致；第6章 Gated RNN的结论不得越过原版目录与数据边界”",
      output: "模式回归产生独立NLP证据包",
      check:
        "独立NLP证据包、词ID/shape/状态/梯度/指标断言；出现“把梯度裁剪当作消失对策，或在评估时仍启用Dropout随机mask；在第6章 Gated RNN验收中只注入这一处”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "为“第6章 Gated RNN”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 固定数据、词表、输入、shape、时间顺序、容差和种子。",
      prediction:
        "沿“测量梯度 → 展开门控 → 更新记忆 → 约束训练 → 模式回归”得到可复核NLP证据链。",
      boundary:
        "全过程必须满足“门值、cell/hidden状态、梯度范数、裁剪阈值、共享权重与训练模式一致；第6章 Gated RNN的结论不得越过原版目录与数据边界”。",
    },
    {
      name: "边界反例",
      observation:
        "为“第6章 Gated RNN”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 其余条件不变，只注入“把梯度裁剪当作消失对策，或在评估时仍启用Dropout随机mask；在第6章 Gated RNN验收中只注入这一处”。",
      prediction:
        "定位第一处词ID、shape、表示、时序状态、梯度、采样或评价偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第6章 Gated RNN”冻结语料/数据、词表、dtype/shape、时间顺序、容差和随机种子",
    "执行测量梯度、展开门控，保存词ID、输入输出、表示、状态、参数与缓存",
    "推进更新记忆、约束训练，记录损失、梯度、采样、序列与评价状态",
    "在模式回归交付dna-06语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  ],
  faultTrace: [
    "“第6章 Gated RNN”复用相同语料/数据、词表、dtype/shape、时间顺序、容差和种子",
    "只改变一个条件：把梯度裁剪当作消失对策，或在评估时仍启用Dropout随机mask；在第6章 Gated RNN验收中只注入这一处",
    "沿“测量梯度 → 展开门控 → 更新记忆 → 约束训练 → 模式回归”寻找最早的词ID、表示、时序、梯度、采样或评价分叉",
    "撤销故障重放；只有“门值、cell/hidden状态、梯度范数、裁剪阈值、共享权重与训练模式一致；第6章 Gated RNN的结论不得越过原版目录与数据边界”恢复才接受修正",
  ],
  invariant:
    "门值、cell/hidden状态、梯度范数、裁剪阈值、共享权重与训练模式一致；第6章 Gated RNN的结论不得越过原版目录与数据边界",
  fault:
    "把梯度裁剪当作消失对策，或在评估时仍启用Dropout随机mask；在第6章 Gated RNN验收中只注入这一处",
  artifact:
    "dna-06语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  gates: [
    {
      label: "语料、词表与切分",
      detail:
        "“第6章 Gated RNN”的语料/数据哈希、token/ID映射、训练/验证/测试切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "表示、shape与时序状态",
      detail:
        "“第6章 Gated RNN”的输入输出词ID、表示/参数shape、时间索引、隐藏状态、mask和前向缓存已冻结。",
    },
    {
      label: "梯度、采样与随机性",
      detail:
        "“第6章 Gated RNN”的损失分母、局部/累加梯度、负采样或解码策略、初值和随机种子可重放。",
    },
    {
      label: "独立评价与历史边界",
      detail:
        "“第6章 Gated RNN”归档近邻/困惑度/序列或对齐指标、独立评价、反例、复现环境和2018/当前标签。",
    },
  ],
} as const satisfies NlpEvidenceModel;

export function Dna06GatedRnnRepresentationLedgerLab() {
  return <NlpEvidenceLab model={model} view="representation-ledger" />;
}

export function Dna06GatedRnnSequenceTraceLab() {
  return <NlpEvidenceLab model={model} view="sequence-trace" />;
}

export function Dna06GatedRnnEvaluationGateLab() {
  return <NlpEvidenceLab model={model} view="evaluation-gate" />;
}
