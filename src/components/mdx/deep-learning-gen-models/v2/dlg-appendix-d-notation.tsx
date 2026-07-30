"use client";

import {
  GenerativeEvidenceLab,
  type GenerativeEvidenceModel,
} from "./generative-evidence-lab";

const model = {
  unitId: "dlg-app-d",
  title: "附录D 数学符号一览",
  question:
    "怎样证明同一个字母在公式、代码和图中指向相同随机变量、参数与shape？",
  concepts: [
    "附录D 数学符号一览",
    "D.1 本书使用的符号",
    "D.2 本书使用的数学式",
  ],
  stages: [
    {
      name: "登记符号",
      input:
        "附录D 数学符号一览在“登记符号”读取数据版本、样本轴、随机变量、分布支持集、参数shape与随机种子。",
      operation:
        "附录D 数学符号一览在“登记符号”阶段冻结本页问题所需的数据和模型快照，不运行优化或采样。",
      output:
        "附录D 数学符号一览在“登记符号”阶段产出可哈希的数据、分布与参数前置状态。",
      check:
        "附录D 数学符号一览在“登记符号”阶段保存数据来源、切分、dtype/shape、支持集、参数版本和种子。",
    },
    {
      name: "标注身份",
      input:
        "附录D 数学符号一览在“标注身份”读取冻结数据、当前随机变量、分布参数与本阶段输入张量。",
      operation:
        "附录D 数学符号一览在“标注身份”阶段只执行一次声明的概率变换、编码、加噪或条件计算。",
      output:
        "附录D 数学符号一览在“标注身份”阶段产出密度、潜变量、噪声状态、责任度或网络输出。",
      check:
        "附录D 数学符号一览在“标注身份”阶段保存输入输出shape、概率和、参数身份、时间下标与随机数位置。",
    },
    {
      name: "标注shape",
      input:
        "附录D 数学符号一览在“标注shape”读取冻结的中间状态、目标定义、旧参数和数值容差。",
      operation:
        "附录D 数学符号一览在“标注shape”阶段计算似然、KL、ELBO、重构项、噪声目标或其分解。",
      output:
        "附录D 数学符号一览在“标注shape”阶段产出不写参数的目标值、梯度输入与每个可复算分量。",
      check:
        "附录D 数学符号一览在“标注shape”阶段保存符号/代码映射、缩放口径、手算值、有限差分或闭式对照。",
    },
    {
      name: "连接代码",
      input:
        "附录D 数学符号一览在“连接代码”读取目标分量、旧参数、梯度、优化器状态与允许写集合。",
      operation:
        "附录D 数学符号一览在“连接代码”阶段只更新本页模型允许改变的分布参数或网络权重。",
      output:
        "附录D 数学符号一览在“连接代码”阶段产出新参数、首个真实张量差异与新的目标值。",
      check:
        "附录D 数学符号一览在“连接代码”阶段保存更新前后快照、梯度范数、写集合、目标变化与数值容差。",
    },
    {
      name: "检查冲突",
      input:
        "附录D 数学符号一览在“检查冲突”读取冻结后的模型、独立输入/初始噪声、采样种子与评估协议。",
      operation:
        "附录D 数学符号一览在“检查冲突”阶段关闭训练后生成或复算，并与基线及单故障运行比较。",
      output:
        "附录D 数学符号一览在“检查冲突”阶段产出不可写入参数的密度、样本、指标分布与边界反例。",
      check:
        "附录D 数学符号一览在“检查冲突”阶段保存采样前后哈希、逐种子结果、失败轨迹和历史边界。",
    },
  ],
  cases: [
    {
      name: "参考基线",
      setup:
        "附录D 数学符号一览使用冻结数据、固定参数快照、目标口径、预算和种子，不启用故障。",
      prediction:
        "附录D 数学符号一览应沿“登记符号 → 标注身份 → 标注shape → 连接代码 → 检查冲突”得到可重放的分布、目标、更新与样本轨迹。",
      boundary:
        "附录D 数学符号一览的参考运行只证明声明数据与预算内的机制，不外推到未测分布。",
    },
    {
      name: "单一故障",
      setup:
        "附录D 数学符号一览复用参考快照，只启用“在不同步骤复用同一符号表示噪声和模型参数且不声明作用域”。",
      prediction:
        "附录D 数学符号一览应在最终样本变化前定位首个密度、shape、目标、梯度或随机状态分岔。",
      boundary:
        "附录D 数学符号一览若同时更换数据、种子或预算，就不能把差异归因于该故障。",
    },
    {
      name: "边界探针",
      setup:
        "附录D 数学符号一览保持算法不变，只选择一个支持集、数值条件或原版范围失效的输入。",
      prediction:
        "附录D 数学符号一览应拒绝强结论并指出缺失的归一化、shape、支持条件或历史标签。",
      boundary:
        "附录D 数学符号一览的边界探针用于收窄结论，不能伪装成原版正文或官方实验。",
    },
  ],
  referenceTrace: [
    "为“附录D 数学符号一览”锁定数据、随机变量、分布/网络参数、dtype/shape、目标口径、预算和种子。",
    "在“附录D 数学符号一览”记录密度、潜变量或加噪状态，并手算本页似然、KL、ELBO或噪声目标。",
    "沿“登记符号 → 标注身份 → 标注shape → 连接代码 → 检查冲突”保存更新前后参数、梯度、缓存与随机数位置。",
    "冻结“附录D 数学符号一览”的训练状态，归档附录D 数学符号一览的数据/分布快照、随机变量与shape账本、目标分解、更新前后参数、失败复现和独立采样报告。",
  ],
  faultTrace: [
    "“附录D 数学符号一览”复用完全相同的数据、参数快照、目标口径、预算与随机序列。",
    "“附录D 数学符号一览”只改变一个条件：在不同步骤复用同一符号表示噪声和模型参数且不声明作用域。",
    "沿“登记符号 → 标注身份 → 标注shape → 连接代码 → 检查冲突”定位最早的密度、shape、目标、梯度或采样分岔。",
    "撤销故障后重放“附录D 数学符号一览”；只有“符号名称、随机/确定身份、条件集合、shape、时间下标与代码变量映射一致”恢复才接受修正。",
  ],
  invariant:
    "符号名称、随机/确定身份、条件集合、shape、时间下标与代码变量映射一致；附录D 数学符号一览的结论不得越过原版目录、数据分布和采样边界",
  fault:
    "在不同步骤复用同一符号表示噪声和模型参数且不声明作用域；在附录D 数学符号一览验收中只注入这一处",
  artifact:
    "附录D 数学符号一览的数据/分布快照、随机变量与shape账本、目标分解、更新前后参数、失败复现和独立采样报告",
  gates: [
    {
      label: "数据、分布与支持集",
      detail:
        "“附录D 数学符号一览”的数据版本、样本轴、随机变量、分布支持集、参数化与归一化条件可追溯。",
    },
    {
      label: "张量shape、目标与参数快照",
      detail:
        "“附录D 数学符号一览”的dtype/shape、潜变量、似然/KL/ELBO或噪声目标、参数与优化器已经冻结。",
    },
    {
      label: "随机性、数值条件与运行预算",
      detail:
        "“附录D 数学符号一览”的初始化、噪声、采样顺序、种子、随机数位置、步数与容差可重放。",
    },
    {
      label: "独立采样与历史边界",
      detail:
        "“附录D 数学符号一览”关闭训练，归档逐种子样本、失败轨迹、参数哈希与2024/当前标签。",
    },
  ],
} as const satisfies GenerativeEvidenceModel;

export function DlgAppendixDNotationDistributionLedgerLab() {
  return <GenerativeEvidenceLab model={model} view="distribution-ledger" />;
}

export function DlgAppendixDNotationLatentObjectiveTraceLab() {
  return <GenerativeEvidenceLab model={model} view="latent-objective-trace" />;
}

export function DlgAppendixDNotationSamplingGateLab() {
  return <GenerativeEvidenceLab model={model} view="sampling-gate" />;
}
