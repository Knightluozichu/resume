"use client";

import { NlpEvidenceLab, type NlpEvidenceModel } from "./nlp-evidence-lab";

const model = {
  unitId: "dna-04",
  title: "第4章 word2vec的高速化",
  question:
    "怎样证明加速改变的是计算路径，而不是学习目标、样本分布或梯度语义？ 本章各目录坐标如何汇合为同一证据链？",
  concepts: [
    "第4章 word2vec的高速化",
    "4.1 word2vec的改进①",
    "4.1.1 Embedding层",
    "4.1.2 Embedding层的实现",
    "4.2 word2vec的改进②",
    "4.2.1 中间层之后的计算问题",
    "4.2.2 从多分类到二分类",
    "4.2.3 sigmoid函数和交叉熵误差",
    "4.2.4 多分类到二分类的实现",
    "4.2.5 负采样",
    "4.2.6 负采样的采样方法",
    "4.2.7 负采样的实现",
    "4.3 改进版word2vec的学习",
    "4.3.1 CBOW模型的实现",
    "4.3.2 CBOW模型的学习代码",
    "4.3.3 CBOW模型的评价",
    "4.4 word2vec相关的其他话题",
    "4.4.1 word2vec的应用例",
    "4.4.2 单词向量的评价方法",
    "4.5 小结",
  ],
  stages: [
    {
      name: "锁定词ID",
      input:
        "第4章 word2vec的高速化：锁定语料/数据、词表、切分与运行版本，保持其余表示、序列与评价合同不变",
      operation:
        "冻结数据哈希、token/ID映射、dtype/shape、时间窗口和允许读取的信息，并持续满足“词ID索引、正负样本、采样分布、Sigmoid损失、共享权重与梯度累加一致；第4章 word2vec的高速化的结论不得越过原版目录与数据边界”",
      output: "锁定词ID产生可追溯NLP实验前置状态",
      check:
        "可追溯NLP实验前置状态、词ID/shape/状态/梯度/指标断言；出现“负样本含目标词、重复索引梯度被覆盖，或不同采样种子被当作公平比较；在第4章 word2vec的高速化验收中只注入这一处”时停止",
    },
    {
      name: "查询Embedding",
      input:
        "第4章 word2vec的高速化：执行本章表示、采样、序列或对齐变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存输入输出ID/shape、权重、隐藏状态、mask、参数与缓存，并持续满足“词ID索引、正负样本、采样分布、Sigmoid损失、共享权重与梯度累加一致；第4章 word2vec的高速化的结论不得越过原版目录与数据边界”",
      output: "查询Embedding产生可重放表示或序列状态",
      check:
        "可重放表示或序列状态、词ID/shape/状态/梯度/指标断言；出现“负样本含目标词、重复索引梯度被覆盖，或不同采样种子被当作公平比较；在第4章 word2vec的高速化验收中只注入这一处”时停止",
    },
    {
      name: "抽取负样本",
      input:
        "第4章 word2vec的高速化：执行损失、反向、状态更新或统计变换，保持其余表示、序列与评价合同不变",
      operation:
        "保存目标、损失分母、梯度范数、时间索引、采样分布和更新轨迹，并持续满足“词ID索引、正负样本、采样分布、Sigmoid损失、共享权重与梯度累加一致；第4章 word2vec的高速化的结论不得越过原版目录与数据边界”",
      output: "抽取负样本产生可复核学习状态",
      check:
        "可复核学习状态、词ID/shape/状态/梯度/指标断言；出现“负样本含目标词、重复索引梯度被覆盖，或不同采样种子被当作公平比较；在第4章 word2vec的高速化验收中只注入这一处”时停止",
    },
    {
      name: "累计梯度",
      input:
        "第4章 word2vec的高速化：运行参考案例与单一故障注入，保持其余表示、序列与评价合同不变",
      operation:
        "保存近邻、序列输出、对齐权重、指标、异常和回退差分，并持续满足“词ID索引、正负样本、采样分布、Sigmoid损失、共享权重与梯度累加一致；第4章 word2vec的高速化的结论不得越过原版目录与数据边界”",
      output: "累计梯度产生可比较NLP行为",
      check:
        "可比较NLP行为、词ID/shape/状态/梯度/指标断言；出现“负样本含目标词、重复索引梯度被覆盖，或不同采样种子被当作公平比较；在第4章 word2vec的高速化验收中只注入这一处”时停止",
    },
    {
      name: "效率对照",
      input:
        "第4章 word2vec的高速化：在隔离评价集上重放并核对历史边界，保持其余表示、序列与评价合同不变",
      operation:
        "检查语料泄漏、词表漂移、时序状态、随机性、指标和2018/当前边界，并持续满足“词ID索引、正负样本、采样分布、Sigmoid损失、共享权重与梯度累加一致；第4章 word2vec的高速化的结论不得越过原版目录与数据边界”",
      output: "效率对照产生独立NLP证据包",
      check:
        "独立NLP证据包、词ID/shape/状态/梯度/指标断言；出现“负样本含目标词、重复索引梯度被覆盖，或不同采样种子被当作公平比较；在第4章 word2vec的高速化验收中只注入这一处”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "为“第4章 word2vec的高速化”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 固定数据、词表、输入、shape、时间顺序、容差和种子。",
      prediction:
        "沿“锁定词ID → 查询Embedding → 抽取负样本 → 累计梯度 → 效率对照”得到可复核NLP证据链。",
      boundary:
        "全过程必须满足“词ID索引、正负样本、采样分布、Sigmoid损失、共享权重与梯度累加一致；第4章 word2vec的高速化的结论不得越过原版目录与数据边界”。",
    },
    {
      name: "边界反例",
      observation:
        "为“第4章 word2vec的高速化”冻结语料/数据、词表、shape、时序切分、随机种子与代码版本，再对照参考路径和单故障路径。 其余条件不变，只注入“负样本含目标词、重复索引梯度被覆盖，或不同采样种子被当作公平比较；在第4章 word2vec的高速化验收中只注入这一处”。",
      prediction:
        "定位第一处词ID、shape、表示、时序状态、梯度、采样或评价偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第4章 word2vec的高速化”冻结语料/数据、词表、dtype/shape、时间顺序、容差和随机种子",
    "执行锁定词ID、查询Embedding，保存词ID、输入输出、表示、状态、参数与缓存",
    "推进抽取负样本、累计梯度，记录损失、梯度、采样、序列与评价状态",
    "在效率对照交付dna-04语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  ],
  faultTrace: [
    "“第4章 word2vec的高速化”复用相同语料/数据、词表、dtype/shape、时间顺序、容差和种子",
    "只改变一个条件：负样本含目标词、重复索引梯度被覆盖，或不同采样种子被当作公平比较；在第4章 word2vec的高速化验收中只注入这一处",
    "沿“锁定词ID → 查询Embedding → 抽取负样本 → 累计梯度 → 效率对照”寻找最早的词ID、表示、时序、梯度、采样或评价分叉",
    "撤销故障重放；只有“词ID索引、正负样本、采样分布、Sigmoid损失、共享权重与梯度累加一致；第4章 word2vec的高速化的结论不得越过原版目录与数据边界”恢复才接受修正",
  ],
  invariant:
    "词ID索引、正负样本、采样分布、Sigmoid损失、共享权重与梯度累加一致；第4章 word2vec的高速化的结论不得越过原版目录与数据边界",
  fault:
    "负样本含目标词、重复索引梯度被覆盖，或不同采样种子被当作公平比较；在第4章 word2vec的高速化验收中只注入这一处",
  artifact:
    "dna-04语料与词表快照、张量/时序账本、前向缓存、梯度轨迹、评价结果、反例与失败复现",
  gates: [
    {
      label: "语料、词表与切分",
      detail:
        "“第4章 word2vec的高速化”的语料/数据哈希、token/ID映射、训练/验证/测试切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "表示、shape与时序状态",
      detail:
        "“第4章 word2vec的高速化”的输入输出词ID、表示/参数shape、时间索引、隐藏状态、mask和前向缓存已冻结。",
    },
    {
      label: "梯度、采样与随机性",
      detail:
        "“第4章 word2vec的高速化”的损失分母、局部/累加梯度、负采样或解码策略、初值和随机种子可重放。",
    },
    {
      label: "独立评价与历史边界",
      detail:
        "“第4章 word2vec的高速化”归档近邻/困惑度/序列或对齐指标、独立评价、反例、复现环境和2018/当前标签。",
    },
  ],
} as const satisfies NlpEvidenceModel;

export function Dna04Word2vecAccelerationRepresentationLedgerLab() {
  return <NlpEvidenceLab model={model} view="representation-ledger" />;
}

export function Dna04Word2vecAccelerationSequenceTraceLab() {
  return <NlpEvidenceLab model={model} view="sequence-trace" />;
}

export function Dna04Word2vecAccelerationEvaluationGateLab() {
  return <NlpEvidenceLab model={model} view="evaluation-gate" />;
}
