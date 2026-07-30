"use client";

import {
  GenerativeEvidenceLab,
  type GenerativeEvidenceModel,
} from "./generative-evidence-lab";

const model = {
  unitId: "dlg-app-c",
  title: "附录C 层级VAE的理论和实现",
  question:
    "怎样让两层潜变量的条件依赖、采样顺序和每个KL项与代码张量一一对应？",
  concepts: [
    "附录C 层级VAE的理论和实现",
    "C.1 两层VAE的构成要素",
    "C.2 ELBO的数学式展开",
    "C.3 利用蒙特卡罗方法近似ELBO",
    "C.4 两层VAE的实现",
    "C.5 实现代码",
  ],
  stages: [
    {
      name: "画生成图",
      input:
        "附录C 层级VAE的理论和实现在“画生成图”读取数据版本、样本轴、随机变量、分布支持集、参数shape与随机种子。",
      operation:
        "附录C 层级VAE的理论和实现在“画生成图”阶段冻结本页问题所需的数据和模型快照，不运行优化或采样。",
      output:
        "附录C 层级VAE的理论和实现在“画生成图”阶段产出可哈希的数据、分布与参数前置状态。",
      check:
        "附录C 层级VAE的理论和实现在“画生成图”阶段保存数据来源、切分、dtype/shape、支持集、参数版本和种子。",
    },
    {
      name: "画推断图",
      input:
        "附录C 层级VAE的理论和实现在“画推断图”读取冻结数据、当前随机变量、分布参数与本阶段输入张量。",
      operation:
        "附录C 层级VAE的理论和实现在“画推断图”阶段只执行一次声明的概率变换、编码、加噪或条件计算。",
      output:
        "附录C 层级VAE的理论和实现在“画推断图”阶段产出密度、潜变量、噪声状态、责任度或网络输出。",
      check:
        "附录C 层级VAE的理论和实现在“画推断图”阶段保存输入输出shape、概率和、参数身份、时间下标与随机数位置。",
    },
    {
      name: "分解ELBO",
      input:
        "附录C 层级VAE的理论和实现在“分解ELBO”读取冻结的中间状态、目标定义、旧参数和数值容差。",
      operation:
        "附录C 层级VAE的理论和实现在“分解ELBO”阶段计算似然、KL、ELBO、重构项、噪声目标或其分解。",
      output:
        "附录C 层级VAE的理论和实现在“分解ELBO”阶段产出不写参数的目标值、梯度输入与每个可复算分量。",
      check:
        "附录C 层级VAE的理论和实现在“分解ELBO”阶段保存符号/代码映射、缩放口径、手算值、有限差分或闭式对照。",
    },
    {
      name: "蒙特卡罗估计",
      input:
        "附录C 层级VAE的理论和实现在“蒙特卡罗估计”读取目标分量、旧参数、梯度、优化器状态与允许写集合。",
      operation:
        "附录C 层级VAE的理论和实现在“蒙特卡罗估计”阶段只更新本页模型允许改变的分布参数或网络权重。",
      output:
        "附录C 层级VAE的理论和实现在“蒙特卡罗估计”阶段产出新参数、首个真实张量差异与新的目标值。",
      check:
        "附录C 层级VAE的理论和实现在“蒙特卡罗估计”阶段保存更新前后快照、梯度范数、写集合、目标变化与数值容差。",
    },
    {
      name: "实现双层",
      input:
        "附录C 层级VAE的理论和实现在“实现双层”读取冻结后的模型、独立输入/初始噪声、采样种子与评估协议。",
      operation:
        "附录C 层级VAE的理论和实现在“实现双层”阶段关闭训练后生成或复算，并与基线及单故障运行比较。",
      output:
        "附录C 层级VAE的理论和实现在“实现双层”阶段产出不可写入参数的密度、样本、指标分布与边界反例。",
      check:
        "附录C 层级VAE的理论和实现在“实现双层”阶段保存采样前后哈希、逐种子结果、失败轨迹和历史边界。",
    },
  ],
  cases: [
    {
      name: "参考基线",
      setup:
        "附录C 层级VAE的理论和实现使用冻结数据、固定参数快照、目标口径、预算和种子，不启用故障。",
      prediction:
        "附录C 层级VAE的理论和实现应沿“画生成图 → 画推断图 → 分解ELBO → 蒙特卡罗估计 → 实现双层”得到可重放的分布、目标、更新与样本轨迹。",
      boundary:
        "附录C 层级VAE的理论和实现的参考运行只证明声明数据与预算内的机制，不外推到未测分布。",
    },
    {
      name: "单一故障",
      setup:
        "附录C 层级VAE的理论和实现复用参考快照，只启用“交换两层潜变量的条件方向，却仍沿用原ELBO分解”。",
      prediction:
        "附录C 层级VAE的理论和实现应在最终样本变化前定位首个密度、shape、目标、梯度或随机状态分岔。",
      boundary:
        "附录C 层级VAE的理论和实现若同时更换数据、种子或预算，就不能把差异归因于该故障。",
    },
    {
      name: "边界探针",
      setup:
        "附录C 层级VAE的理论和实现保持算法不变，只选择一个支持集、数值条件或原版范围失效的输入。",
      prediction:
        "附录C 层级VAE的理论和实现应拒绝强结论并指出缺失的归一化、shape、支持条件或历史标签。",
      boundary:
        "附录C 层级VAE的理论和实现的边界探针用于收窄结论，不能伪装成原版正文或官方实验。",
    },
  ],
  referenceTrace: [
    "为“附录C 层级VAE的理论和实现”锁定数据、随机变量、分布/网络参数、dtype/shape、目标口径、预算和种子。",
    "在“附录C 层级VAE的理论和实现”记录密度、潜变量或加噪状态，并手算本页似然、KL、ELBO或噪声目标。",
    "沿“画生成图 → 画推断图 → 分解ELBO → 蒙特卡罗估计 → 实现双层”保存更新前后参数、梯度、缓存与随机数位置。",
    "冻结“附录C 层级VAE的理论和实现”的训练状态，归档附录C 层级VAE的理论和实现的数据/分布快照、随机变量与shape账本、目标分解、更新前后参数、失败复现和独立采样报告。",
  ],
  faultTrace: [
    "“附录C 层级VAE的理论和实现”复用完全相同的数据、参数快照、目标口径、预算与随机序列。",
    "“附录C 层级VAE的理论和实现”只改变一个条件：交换两层潜变量的条件方向，却仍沿用原ELBO分解。",
    "沿“画生成图 → 画推断图 → 分解ELBO → 蒙特卡罗估计 → 实现双层”定位最早的密度、shape、目标、梯度或采样分岔。",
    "撤销故障后重放“附录C 层级VAE的理论和实现”；只有“生成图、推断图、z1/z2条件分布、噪声身份、ELBO分解与batch缩放一致”恢复才接受修正。",
  ],
  invariant:
    "生成图、推断图、z1/z2条件分布、噪声身份、ELBO分解与batch缩放一致；附录C 层级VAE的理论和实现的结论不得越过原版目录、数据分布和采样边界",
  fault:
    "交换两层潜变量的条件方向，却仍沿用原ELBO分解；在附录C 层级VAE的理论和实现验收中只注入这一处",
  artifact:
    "附录C 层级VAE的理论和实现的数据/分布快照、随机变量与shape账本、目标分解、更新前后参数、失败复现和独立采样报告",
  gates: [
    {
      label: "数据、分布与支持集",
      detail:
        "“附录C 层级VAE的理论和实现”的数据版本、样本轴、随机变量、分布支持集、参数化与归一化条件可追溯。",
    },
    {
      label: "张量shape、目标与参数快照",
      detail:
        "“附录C 层级VAE的理论和实现”的dtype/shape、潜变量、似然/KL/ELBO或噪声目标、参数与优化器已经冻结。",
    },
    {
      label: "随机性、数值条件与运行预算",
      detail:
        "“附录C 层级VAE的理论和实现”的初始化、噪声、采样顺序、种子、随机数位置、步数与容差可重放。",
    },
    {
      label: "独立采样与历史边界",
      detail:
        "“附录C 层级VAE的理论和实现”关闭训练，归档逐种子样本、失败轨迹、参数哈希与2024/当前标签。",
    },
  ],
} as const satisfies GenerativeEvidenceModel;

export function DlgAppendixCHierarchicalVaeDistributionLedgerLab() {
  return <GenerativeEvidenceLab model={model} view="distribution-ledger" />;
}

export function DlgAppendixCHierarchicalVaeLatentObjectiveTraceLab() {
  return <GenerativeEvidenceLab model={model} view="latent-objective-trace" />;
}

export function DlgAppendixCHierarchicalVaeSamplingGateLab() {
  return <GenerativeEvidenceLab model={model} view="sampling-gate" />;
}
