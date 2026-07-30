"use client";

import {
  GenerativeEvidenceLab,
  type GenerativeEvidenceModel,
} from "./generative-evidence-lab";

const model = {
  unitId: "dlg-05",
  title: "步骤5 EM算法",
  question:
    "怎样让责任度、下界、对数似然和参数更新形成可检查的单调改进证据链？",
  concepts: [
    "步骤5 EM算法",
    "5.1 KL散度",
    "5.1.1 关于数学式的表示方法",
    "5.1.2 KL散度的定义式",
    "5.1.3 KL散度与最大似然估计之间的关系",
    "5.2 EM算法的推导①",
    "5.2.1 拥有潜变量的模型",
    "5.2.2 任意概率分布q(z)",
    "5.3 EM算法的推导②",
    "5.3.1 ELBO（证据的下限）",
    "5.3.2 进入EM算法",
    "5.3.3 扩展到多个数据",
    "5.3.4 log p(x; theta_new)不小于log p(x; theta_old)的证明",
    "5.4 GMM和EM算法",
    "5.4.1 EM算法的E步骤",
    "5.4.2 EM算法的M步骤",
    "5.5 EM算法的实现",
    "5.5.1 数据集和GMM的代码",
    "5.5.2 E步骤和M步骤的实现",
    "5.5.3 数据生成",
  ],
  stages: [
    {
      name: "冻结旧参数",
      input:
        "步骤5 EM算法在“冻结旧参数”读取数据版本、样本轴、随机变量、分布支持集、参数shape与随机种子。",
      operation:
        "步骤5 EM算法在“冻结旧参数”阶段冻结本页问题所需的数据和模型快照，不运行优化或采样。",
      output:
        "步骤5 EM算法在“冻结旧参数”阶段产出可哈希的数据、分布与参数前置状态。",
      check:
        "步骤5 EM算法在“冻结旧参数”阶段保存数据来源、切分、dtype/shape、支持集、参数版本和种子。",
    },
    {
      name: "计算责任度",
      input:
        "步骤5 EM算法在“计算责任度”读取冻结数据、当前随机变量、分布参数与本阶段输入张量。",
      operation:
        "步骤5 EM算法在“计算责任度”阶段只执行一次声明的概率变换、编码、加噪或条件计算。",
      output:
        "步骤5 EM算法在“计算责任度”阶段产出密度、潜变量、噪声状态、责任度或网络输出。",
      check:
        "步骤5 EM算法在“计算责任度”阶段保存输入输出shape、概率和、参数身份、时间下标与随机数位置。",
    },
    {
      name: "评估ELBO",
      input:
        "步骤5 EM算法在“评估ELBO”读取冻结的中间状态、目标定义、旧参数和数值容差。",
      operation:
        "步骤5 EM算法在“评估ELBO”阶段计算似然、KL、ELBO、重构项、噪声目标或其分解。",
      output:
        "步骤5 EM算法在“评估ELBO”阶段产出不写参数的目标值、梯度输入与每个可复算分量。",
      check:
        "步骤5 EM算法在“评估ELBO”阶段保存符号/代码映射、缩放口径、手算值、有限差分或闭式对照。",
    },
    {
      name: "更新参数",
      input:
        "步骤5 EM算法在“更新参数”读取目标分量、旧参数、梯度、优化器状态与允许写集合。",
      operation:
        "步骤5 EM算法在“更新参数”阶段只更新本页模型允许改变的分布参数或网络权重。",
      output:
        "步骤5 EM算法在“更新参数”阶段产出新参数、首个真实张量差异与新的目标值。",
      check:
        "步骤5 EM算法在“更新参数”阶段保存更新前后快照、梯度范数、写集合、目标变化与数值容差。",
    },
    {
      name: "核对似然",
      input:
        "步骤5 EM算法在“核对似然”读取冻结后的模型、独立输入/初始噪声、采样种子与评估协议。",
      operation:
        "步骤5 EM算法在“核对似然”阶段关闭训练后生成或复算，并与基线及单故障运行比较。",
      output:
        "步骤5 EM算法在“核对似然”阶段产出不可写入参数的密度、样本、指标分布与边界反例。",
      check:
        "步骤5 EM算法在“核对似然”阶段保存采样前后哈希、逐种子结果、失败轨迹和历史边界。",
    },
  ],
  cases: [
    {
      name: "参考基线",
      setup:
        "步骤5 EM算法使用冻结数据、固定参数快照、目标口径、预算和种子，不启用故障。",
      prediction:
        "步骤5 EM算法应沿“冻结旧参数 → 计算责任度 → 评估ELBO → 更新参数 → 核对似然”得到可重放的分布、目标、更新与样本轨迹。",
      boundary:
        "步骤5 EM算法的参考运行只证明声明数据与预算内的机制，不外推到未测分布。",
    },
    {
      name: "单一故障",
      setup:
        "步骤5 EM算法复用参考快照，只启用“在同一轮E步尚未完成时原位更新参数，使不同样本使用不同模型快照”。",
      prediction:
        "步骤5 EM算法应在最终样本变化前定位首个密度、shape、目标、梯度或随机状态分岔。",
      boundary:
        "步骤5 EM算法若同时更换数据、种子或预算，就不能把差异归因于该故障。",
    },
    {
      name: "边界探针",
      setup:
        "步骤5 EM算法保持算法不变，只选择一个支持集、数值条件或原版范围失效的输入。",
      prediction:
        "步骤5 EM算法应拒绝强结论并指出缺失的归一化、shape、支持条件或历史标签。",
      boundary:
        "步骤5 EM算法的边界探针用于收窄结论，不能伪装成原版正文或官方实验。",
    },
  ],
  referenceTrace: [
    "为“步骤5 EM算法”锁定数据、随机变量、分布/网络参数、dtype/shape、目标口径、预算和种子。",
    "在“步骤5 EM算法”记录密度、潜变量或加噪状态，并手算本页似然、KL、ELBO或噪声目标。",
    "沿“冻结旧参数 → 计算责任度 → 评估ELBO → 更新参数 → 核对似然”保存更新前后参数、梯度、缓存与随机数位置。",
    "冻结“步骤5 EM算法”的训练状态，归档步骤5 EM算法的数据/分布快照、随机变量与shape账本、目标分解、更新前后参数、失败复现和独立采样报告。",
  ],
  faultTrace: [
    "“步骤5 EM算法”复用完全相同的数据、参数快照、目标口径、预算与随机序列。",
    "“步骤5 EM算法”只改变一个条件：在同一轮E步尚未完成时原位更新参数，使不同样本使用不同模型快照。",
    "沿“冻结旧参数 → 计算责任度 → 评估ELBO → 更新参数 → 核对似然”定位最早的密度、shape、目标、梯度或采样分岔。",
    "撤销故障后重放“步骤5 EM算法”；只有“潜变量定义、q分布归一化、E步旧参数、M步责任度快照与对数似然口径一致”恢复才接受修正。",
  ],
  invariant:
    "潜变量定义、q分布归一化、E步旧参数、M步责任度快照与对数似然口径一致；步骤5 EM算法的结论不得越过原版目录、数据分布和采样边界",
  fault:
    "在同一轮E步尚未完成时原位更新参数，使不同样本使用不同模型快照；在步骤5 EM算法验收中只注入这一处",
  artifact:
    "步骤5 EM算法的数据/分布快照、随机变量与shape账本、目标分解、更新前后参数、失败复现和独立采样报告",
  gates: [
    {
      label: "数据、分布与支持集",
      detail:
        "“步骤5 EM算法”的数据版本、样本轴、随机变量、分布支持集、参数化与归一化条件可追溯。",
    },
    {
      label: "张量shape、目标与参数快照",
      detail:
        "“步骤5 EM算法”的dtype/shape、潜变量、似然/KL/ELBO或噪声目标、参数与优化器已经冻结。",
    },
    {
      label: "随机性、数值条件与运行预算",
      detail:
        "“步骤5 EM算法”的初始化、噪声、采样顺序、种子、随机数位置、步数与容差可重放。",
    },
    {
      label: "独立采样与历史边界",
      detail:
        "“步骤5 EM算法”关闭训练，归档逐种子样本、失败轨迹、参数哈希与2024/当前标签。",
    },
  ],
} as const satisfies GenerativeEvidenceModel;

export function Dlg05EmAlgorithmDistributionLedgerLab() {
  return <GenerativeEvidenceLab model={model} view="distribution-ledger" />;
}

export function Dlg05EmAlgorithmLatentObjectiveTraceLab() {
  return <GenerativeEvidenceLab model={model} view="latent-objective-trace" />;
}

export function Dlg05EmAlgorithmSamplingGateLab() {
  return <GenerativeEvidenceLab model={model} view="sampling-gate" />;
}
