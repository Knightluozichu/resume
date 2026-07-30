"use client";

import {
  LearningSystemEvidenceLab,
  type LearningSystemEvidenceModel,
} from "./learning-system-evidence-lab";

const model = {
  unitId: "idl-04",
  title: "第4章 受限玻尔兹曼机",
  question:
    "怎样从能量与条件分布解释可见层、隐藏层、正负相，并明确对比散度只是近似训练过程？",
  concepts: [
    "第4章 受限玻尔兹曼机",
    "4.1 Hopfield神经网络",
    "4.2 玻尔兹曼机",
    "4.3 受限玻尔兹曼机",
    "4.4 对比散度算法",
    "4.5 深度信念网络",
    "4.6 小结",
  ],
  stages: [
    {
      name: "可见层",
      input: "第4章 受限玻尔兹曼机：冻结的样本、任务或上游张量",
      operation:
        "登记形状、版本和边界，并守住“能量定义、二部图限制、采样条件、正相、重构、负相和参数更新顺序固定，随机种子可重放”",
      output: "可追踪输入",
      evidence:
        "数据卡、哈希与形状；出现“把一次重构误差下降当作似然已经优化，或把CD-k结果宣称为精确负相样本”时保留失败记录",
    },
    {
      name: "隐藏概率与采样",
      input: "第4章 受限玻尔兹曼机：上一阶段输出",
      operation:
        "执行“第4章 受限玻尔兹曼机”的核心变换，并守住“能量定义、二部图限制、采样条件、正相、重构、负相和参数更新顺序固定，随机种子可重放”",
      output: "中间表示或状态",
      evidence:
        "中间张量与参数；出现“把一次重构误差下降当作似然已经优化，或把CD-k结果宣称为精确负相样本”时保留失败记录",
    },
    {
      name: "重构",
      input: "第4章 受限玻尔兹曼机：表示、标签或采样状态",
      operation:
        "计算本阶段目标或条件量，并守住“能量定义、二部图限制、采样条件、正相、重构、负相和参数更新顺序固定，随机种子可重放”",
      output: "标量目标或概率",
      evidence:
        "公式、数值与对照；出现“把一次重构误差下降当作似然已经优化，或把CD-k结果宣称为精确负相样本”时保留失败记录",
    },
    {
      name: "负相",
      input: "第4章 受限玻尔兹曼机：目标、参数和随机状态",
      operation:
        "只改变声明的学习变量，并守住“能量定义、二部图限制、采样条件、正相、重构、负相和参数更新顺序固定，随机种子可重放”",
      output: "更新后参数或样本",
      evidence:
        "梯度、种子与差分；出现“把一次重构误差下降当作似然已经优化，或把CD-k结果宣称为精确负相样本”时保留失败记录",
    },
    {
      name: "CD更新与DBN",
      input: "第4章 受限玻尔兹曼机：冻结模型与留出数据",
      operation:
        "按预注册协议评估并归档，并守住“能量定义、二部图限制、采样条件、正相、重构、负相和参数更新顺序固定，随机种子可重放”",
      output: "结论、拒绝或迁移决定",
      evidence:
        "指标、反例与环境锁；出现“把一次重构误差下降当作似然已经优化，或把CD-k结果宣称为精确负相样本”时保留失败记录",
    },
  ],
  scenarios: [
    {
      name: "冻结基线",
      condition:
        "在一个二值小数据集上计算隐藏激活、重构和CD-1更新，再比较更长链与不同随机种子。 固定数据、代码、依赖、初值与随机种子。",
      expectation:
        "沿“可见层 → 隐藏概率与采样 → 重构 → 负相 → CD更新与DBN”得到满足“能量定义、二部图限制、采样条件、正相、重构、负相和参数更新顺序固定，随机种子可重放”的完整证据。",
    },
    {
      name: "边界反例",
      condition:
        "在一个二值小数据集上计算隐藏激活、重构和CD-1更新，再比较更长链与不同随机种子。 其余条件不变，只注入“把一次重构误差下降当作似然已经优化，或把CD-k结果宣称为精确负相样本”。",
      expectation:
        "最早偏离应出现在对应阶段；若只能从最终指标猜测，证据链不通过。",
    },
  ],
  normalTrace: [
    "为“第4章 受限玻尔兹曼机”冻结任务、数据切分、代码、环境、参数初值与随机种子",
    "依次执行可见层、隐藏概率与采样，保存输入和中间状态",
    "继续执行重构、负相，记录目标、梯度、采样或更新",
    "在CD更新与DBN阶段交付能量函数、权重与偏置、正相统计、采样种子、重构、负相统计、CD步数、更新量与DBN逐层预训练记录。",
  ],
  failureTrace: [
    "“第4章 受限玻尔兹曼机”复用同一任务、数据、代码、环境、参数初值与随机种子",
    "只注入单一故障：把一次重构误差下降当作似然已经优化，或把CD-k结果宣称为精确负相样本",
    "沿“可见层 → 隐藏概率与采样 → 重构 → 负相 → CD更新与DBN”定位第一处数值、状态或边界偏离",
    "撤销故障并重放；仅当“能量定义、二部图限制、采样条件、正相、重构、负相和参数更新顺序固定，随机种子可重放”恢复才接受修正",
  ],
  invariant:
    "能量定义、二部图限制、采样条件、正相、重构、负相和参数更新顺序固定，随机种子可重放",
  fault: "把一次重构误差下降当作似然已经优化，或把CD-k结果宣称为精确负相样本",
  artifact:
    "能量函数、权重与偏置、正相统计、采样种子、重构、负相统计、CD步数、更新量与DBN逐层预训练记录。",
  gates: [
    {
      label: "数据切分",
      detail:
        "“第4章 受限玻尔兹曼机”的训练、验证、测试边界和预处理统计可追溯。",
    },
    {
      label: "目标与梯度",
      detail:
        "“第4章 受限玻尔兹曼机”的前向值、目标、梯度或采样更新经过数值核对。",
    },
    {
      label: "基线与消融",
      detail:
        "“第4章 受限玻尔兹曼机”保留简单基线，只改变一个变量并保存失败样本。",
    },
    {
      label: "复现与历史",
      detail:
        "“第4章 受限玻尔兹曼机”归档环境、种子和工件，并分开2016语境与当前迁移。",
    },
  ],
} as const satisfies LearningSystemEvidenceModel;

export function Idl04RestrictedBoltzmannMachinesSignalPathLab() {
  return <LearningSystemEvidenceLab model={model} view="signal-path" />;
}

export function Idl04RestrictedBoltzmannMachinesTrainingTraceLab() {
  return <LearningSystemEvidenceLab model={model} view="training-trace" />;
}

export function Idl04RestrictedBoltzmannMachinesExperimentGateLab() {
  return <LearningSystemEvidenceLab model={model} view="experiment-gate" />;
}
