"use client";

import { NlpEvidenceLab, type NlpEvidenceModel } from "./nlp-evidence-lab";

const model = {
  unitId: "dna-07",
  title: "第7章 基于RNN生成文本",
  question:
    "怎样让训练时目标、推理时自回归输入和可变长序列使用同一编码合同？ 本章各目录坐标如何汇合为同一证据链？",
  concepts: [
    "第7章 基于RNN生成文本",
    "7.1 使用语言模型生成文本",
    "7.1.1 使用RNN生成文本的步骤",
    "7.1.2 文本生成的实现",
    "7.1.3 更好的文本生成",
    "7.2 seq2seq模型",
    "7.2.1 seq2seq的原理",
    "7.2.2 时序数据转换的简单尝试",
    "7.2.3 可变长度的时序数据",
    "7.2.4 加法数据集",
    "7.3 seq2seq的实现",
    "7.3.1 Encoder类",
    "7.3.2 Decoder类",
    "7.3.3 Seq2seq类",
    "7.3.4 seq2seq的评价",
    "7.4 seq2seq的改进",
    "7.4.1 反转输入数据（Reverse）",
    "7.4.2 偷窥（Peeky）",
    "7.5 seq2seq的应用",
    "7.5.1 聊天机器人",
    "7.5.2 算法学习",
    "7.5.3 自动图像描述",
    "7.6 小结",
  ],
  stages: [
    {
      name: "编码输入",
      input:
        "第7章 基于RNN生成文本：锁定语料/数据、词表、切分与运行版本，保持其余表示、序列与评价合同不变",
      operation:
        "冻结数据哈希、token/ID映射、dtype/shape、时间窗口和允许读取的信息，并持续满足“词表、起止符、Encoder状态、Decoder输入、mask、采样策略与评价集一致；第7章 基于RNN生成文本的结论不得越过原版目录与数据边界”",
      output: "编码输入产生可追溯NLP实验前置状态",
      check:
        "可追溯NLP实验前置状态、词ID/shape/状态/梯度/指标断言；出现“推理偷看目标序列、padding进入损失，或用不同随机采样比较结构改进；在第7章 基于RNN生成文本验收中只注入这一处”时停止",
    },
    {
      name: "压缩状态",
      input:
        "第7章 基于RNN生成文本：执行本章表示、采样、序列或对齐变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存输入输出ID/shape、权重、隐藏状态、mask、参数与缓存，并持续满足“词表、起止符、Encoder状态、Decoder输入、mask、采样策略与评价集一致；第7章 基于RNN生成文本的结论不得越过原版目录与数据边界”",
      output: "压缩状态产生可重放表示或序列状态",
      check:
        "可重放表示或序列状态、词ID/shape/状态/梯度/指标断言；出现“推理偷看目标序列、padding进入损失，或用不同随机采样比较结构改进；在第7章 基于RNN生成文本验收中只注入这一处”时停止",
    },
    {
      name: "自回归解码",
      input:
        "第7章 基于RNN生成文本：执行损失、反向、状态更新或统计变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存目标、损失分母、梯度范数、时间索引、采样分布和更新轨迹，并持续满足“词表、起止符、Encoder状态、Decoder输入、mask、采样策略与评价集一致；第7章 基于RNN生成文本的结论不得越过原版目录与数据边界”",
      output: "自回归解码产生可复核学习状态",
      check:
        "可复核学习状态、词ID/shape/状态/梯度/指标断言；出现“推理偷看目标序列、padding进入损失，或用不同随机采样比较结构改进；在第7章 基于RNN生成文本验收中只注入这一处”时停止",
    },
    {
      name: "应用改进",
      input:
        "第7章 基于RNN生成文本：运行参考案例与单一故障注入，保持其余表示、序列与评价合同不变",
      operation:
        "保存近邻、序列输出、对齐权重、指标、异常和回退差分，并持续满足“词表、起止符、Encoder状态、Decoder输入、mask、采样策略与评价集一致；第7章 基于RNN生成文本的结论不得越过原版目录与数据边界”",
      output: "应用改进产生可比较NLP行为",
      check:
        "可比较NLP行为、词ID/shape/状态/梯度/指标断言；出现“推理偷看目标序列、padding进入损失，或用不同随机采样比较结构改进；在第7章 基于RNN生成文本验收中只注入这一处”时停止",
    },
    {
      name: "隔离评价",
      input:
        "第7章 基于RNN生成文本：在隔离评价集上重放并核对历史边界，保持其余表示、序列与评价合同不变",
      operation:
        "检查语料泄漏、词表漂移、时序状态、随机性、指标和2018/当前边界，并持续满足“词表、起止符、Encoder状态、Decoder输入、mask、采样策略与评价集一致；第7章 基于RNN生成文本的结论不得越过原版目录与数据边界”",
      output: "隔离评价产生独立NLP证据包",
      check:
        "独立NLP证据包、词ID/shape/状态/梯度/指标断言；出现“推理偷看目标序列、padding进入损失，或用不同随机采样比较结构改进；在第7章 基于RNN生成文本验收中只注入这一处”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "为“第7章 基于RNN生成文本”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 固定数据、词表、输入、shape、时间顺序、容差和种子。",
      prediction:
        "沿“编码输入 → 压缩状态 → 自回归解码 → 应用改进 → 隔离评价”得到可复核NLP证据链。",
      boundary:
        "全过程必须满足“词表、起止符、Encoder状态、Decoder输入、mask、采样策略与评价集一致；第7章 基于RNN生成文本的结论不得越过原版目录与数据边界”。",
    },
    {
      name: "边界反例",
      observation:
        "为“第7章 基于RNN生成文本”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 其余条件不变，只注入“推理偷看目标序列、padding进入损失，或用不同随机采样比较结构改进；在第7章 基于RNN生成文本验收中只注入这一处”。",
      prediction:
        "定位第一处词ID、shape、表示、时序状态、梯度、采样或评价偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第7章 基于RNN生成文本”冻结语料/数据、词表、dtype/shape、时间顺序、容差和随机种子",
    "执行编码输入、压缩状态，保存词ID、输入输出、表示、状态、参数与缓存",
    "推进自回归解码、应用改进，记录损失、梯度、采样、序列与评价状态",
    "在隔离评价交付dna-07语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  ],
  faultTrace: [
    "“第7章 基于RNN生成文本”复用相同语料/数据、词表、dtype/shape、时间顺序、容差和种子",
    "只改变一个条件：推理偷看目标序列、padding进入损失，或用不同随机采样比较结构改进；在第7章 基于RNN生成文本验收中只注入这一处",
    "沿“编码输入 → 压缩状态 → 自回归解码 → 应用改进 → 隔离评价”寻找最早的词ID、表示、时序、梯度、采样或评价分叉",
    "撤销故障重放；只有“词表、起止符、Encoder状态、Decoder输入、mask、采样策略与评价集一致；第7章 基于RNN生成文本的结论不得越过原版目录与数据边界”恢复才接受修正",
  ],
  invariant:
    "词表、起止符、Encoder状态、Decoder输入、mask、采样策略与评价集一致；第7章 基于RNN生成文本的结论不得越过原版目录与数据边界",
  fault:
    "推理偷看目标序列、padding进入损失，或用不同随机采样比较结构改进；在第7章 基于RNN生成文本验收中只注入这一处",
  artifact:
    "dna-07语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  gates: [
    {
      label: "语料、词表与切分",
      detail:
        "“第7章 基于RNN生成文本”的语料/数据哈希、token/ID映射、训练/验证/测试切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "表示、shape与时序状态",
      detail:
        "“第7章 基于RNN生成文本”的输入输出词ID、表示/参数shape、时间索引、隐藏状态、mask和前向缓存已冻结。",
    },
    {
      label: "梯度、采样与随机性",
      detail:
        "“第7章 基于RNN生成文本”的损失分母、局部/累加梯度、负采样或解码策略、初值和随机种子可重放。",
    },
    {
      label: "独立评价与历史边界",
      detail:
        "“第7章 基于RNN生成文本”归档近邻/困惑度/序列或对齐指标、独立评价、反例、复现环境和2018/当前标签。",
    },
  ],
} as const satisfies NlpEvidenceModel;

export function Dna07RnnTextGenerationRepresentationLedgerLab() {
  return <NlpEvidenceLab model={model} view="representation-ledger" />;
}

export function Dna07RnnTextGenerationSequenceTraceLab() {
  return <NlpEvidenceLab model={model} view="sequence-trace" />;
}

export function Dna07RnnTextGenerationEvaluationGateLab() {
  return <NlpEvidenceLab model={model} view="evaluation-gate" />;
}
