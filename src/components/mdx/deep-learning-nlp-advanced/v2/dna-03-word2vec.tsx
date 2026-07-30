"use client";

import { NlpEvidenceLab, type NlpEvidenceModel } from "./nlp-evidence-lab";

const model = {
  unitId: "dna-03",
  title: "第3章 word2vec",
  question:
    "怎样让one-hot、输入/输出权重与概率目标在同一上下文合同中对齐？ 本章各目录坐标如何汇合为同一证据链？",
  concepts: [
    "第3章 word2vec",
    "3.1 基于推理的方法和神经网络",
    "3.1.1 基于计数的方法的问题",
    "3.1.2 基于推理的方法的概要",
    "3.1.3 神经网络中单词的处理方法",
    "3.2 简单的word2vec",
    "3.2.1 CBOW模型的推理",
    "3.2.2 CBOW模型的学习",
    "3.2.3 word2vec的权重和分布式表示",
    "3.3 学习数据的准备",
    "3.3.1 上下文和目标词",
    "3.3.2 转化为one-hot表示",
    "3.4 CBOW模型的实现",
    "3.4.1 学习代码的实现",
    "3.5 word2vec的补充说明",
    "3.5.1 CBOW模型和概率",
    "3.5.2 skip-gram模型",
    "3.5.3 基于计数与基于推理",
    "3.6 小结",
  ],
  stages: [
    {
      name: "切分上下文",
      input:
        "第3章 word2vec：锁定语料/数据、词表、切分与运行版本，保持其余表示、序列与评价合同不变",
      operation:
        "冻结数据哈希、token/ID映射、dtype/shape、时间窗口和允许读取的信息，并持续满足“窗口、上下文/目标索引、one-hot轴、权重选择、损失与表示读取一致；第3章 word2vec的结论不得越过原版目录与数据边界”",
      output: "切分上下文产生可追溯NLP实验前置状态",
      check:
        "可追溯NLP实验前置状态、词ID/shape/状态/梯度/指标断言；出现“上下文和目标错一位，或在输入/输出权重间切换却仍比较同一结果；在第3章 word2vec验收中只注入这一处”时停止",
    },
    {
      name: "编码词ID",
      input:
        "第3章 word2vec：执行本章表示、采样、序列或对齐变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存输入输出ID/shape、权重、隐藏状态、mask、参数与缓存，并持续满足“窗口、上下文/目标索引、one-hot轴、权重选择、损失与表示读取一致；第3章 word2vec的结论不得越过原版目录与数据边界”",
      output: "编码词ID产生可重放表示或序列状态",
      check:
        "可重放表示或序列状态、词ID/shape/状态/梯度/指标断言；出现“上下文和目标错一位，或在输入/输出权重间切换却仍比较同一结果；在第3章 word2vec验收中只注入这一处”时停止",
    },
    {
      name: "执行CBOW",
      input:
        "第3章 word2vec：执行损失、反向、状态更新或统计变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存目标、损失分母、梯度范数、时间索引、采样分布和更新轨迹，并持续满足“窗口、上下文/目标索引、one-hot轴、权重选择、损失与表示读取一致；第3章 word2vec的结论不得越过原版目录与数据边界”",
      output: "执行CBOW产生可复核学习状态",
      check:
        "可复核学习状态、词ID/shape/状态/梯度/指标断言；出现“上下文和目标错一位，或在输入/输出权重间切换却仍比较同一结果；在第3章 word2vec验收中只注入这一处”时停止",
    },
    {
      name: "反向更新",
      input:
        "第3章 word2vec：运行参考案例与单一故障注入，保持其余表示、序列与评价合同不变",
      operation:
        "保存近邻、序列输出、对齐权重、指标、异常和回退差分，并持续满足“窗口、上下文/目标索引、one-hot轴、权重选择、损失与表示读取一致；第3章 word2vec的结论不得越过原版目录与数据边界”",
      output: "反向更新产生可比较NLP行为",
      check:
        "可比较NLP行为、词ID/shape/状态/梯度/指标断言；出现“上下文和目标错一位，或在输入/输出权重间切换却仍比较同一结果；在第3章 word2vec验收中只注入这一处”时停止",
    },
    {
      name: "比较表示",
      input:
        "第3章 word2vec：在隔离评价集上重放并核对历史边界，保持其余表示、序列与评价合同不变",
      operation:
        "检查语料泄漏、词表漂移、时序状态、随机性、指标和2018/当前边界，并持续满足“窗口、上下文/目标索引、one-hot轴、权重选择、损失与表示读取一致；第3章 word2vec的结论不得越过原版目录与数据边界”",
      output: "比较表示产生独立NLP证据包",
      check:
        "独立NLP证据包、词ID/shape/状态/梯度/指标断言；出现“上下文和目标错一位，或在输入/输出权重间切换却仍比较同一结果；在第3章 word2vec验收中只注入这一处”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "为“第3章 word2vec”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 固定数据、词表、输入、shape、时间顺序、容差和种子。",
      prediction:
        "沿“切分上下文 → 编码词ID → 执行CBOW → 反向更新 → 比较表示”得到可复核NLP证据链。",
      boundary:
        "全过程必须满足“窗口、上下文/目标索引、one-hot轴、权重选择、损失与表示读取一致；第3章 word2vec的结论不得越过原版目录与数据边界”。",
    },
    {
      name: "边界反例",
      observation:
        "为“第3章 word2vec”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 其余条件不变，只注入“上下文和目标错一位，或在输入/输出权重间切换却仍比较同一结果；在第3章 word2vec验收中只注入这一处”。",
      prediction:
        "定位第一处词ID、shape、表示、时序状态、梯度、采样或评价偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第3章 word2vec”冻结语料/数据、词表、dtype/shape、时间顺序、容差和随机种子",
    "执行切分上下文、编码词ID，保存词ID、输入输出、表示、状态、参数与缓存",
    "推进执行CBOW、反向更新，记录损失、梯度、采样、序列与评价状态",
    "在比较表示交付dna-03语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  ],
  faultTrace: [
    "“第3章 word2vec”复用相同语料/数据、词表、dtype/shape、时间顺序、容差和种子",
    "只改变一个条件：上下文和目标错一位，或在输入/输出权重间切换却仍比较同一结果；在第3章 word2vec验收中只注入这一处",
    "沿“切分上下文 → 编码词ID → 执行CBOW → 反向更新 → 比较表示”寻找最早的词ID、表示、时序、梯度、采样或评价分叉",
    "撤销故障重放；只有“窗口、上下文/目标索引、one-hot轴、权重选择、损失与表示读取一致；第3章 word2vec的结论不得越过原版目录与数据边界”恢复才接受修正",
  ],
  invariant:
    "窗口、上下文/目标索引、one-hot轴、权重选择、损失与表示读取一致；第3章 word2vec的结论不得越过原版目录与数据边界",
  fault:
    "上下文和目标错一位，或在输入/输出权重间切换却仍比较同一结果；在第3章 word2vec验收中只注入这一处",
  artifact:
    "dna-03语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  gates: [
    {
      label: "语料、词表与切分",
      detail:
        "“第3章 word2vec”的语料/数据哈希、token/ID映射、训练/验证/测试切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "表示、shape与时序状态",
      detail:
        "“第3章 word2vec”的输入输出词ID、表示/参数shape、时间索引、隐藏状态、mask和前向缓存已冻结。",
    },
    {
      label: "梯度、采样与随机性",
      detail:
        "“第3章 word2vec”的损失分母、局部/累加梯度、负采样或解码策略、初值和随机种子可重放。",
    },
    {
      label: "独立评价与历史边界",
      detail:
        "“第3章 word2vec”归档近邻/困惑度/序列或对齐指标、独立评价、反例、复现环境和2018/当前标签。",
    },
  ],
} as const satisfies NlpEvidenceModel;

export function Dna03Word2vecRepresentationLedgerLab() {
  return <NlpEvidenceLab model={model} view="representation-ledger" />;
}

export function Dna03Word2vecSequenceTraceLab() {
  return <NlpEvidenceLab model={model} view="sequence-trace" />;
}

export function Dna03Word2vecEvaluationGateLab() {
  return <NlpEvidenceLab model={model} view="evaluation-gate" />;
}
