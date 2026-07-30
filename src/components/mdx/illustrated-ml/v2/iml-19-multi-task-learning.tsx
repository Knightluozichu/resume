"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-19",
  title: "第19章 多任务学习",
  question:
    "怎样证明任务共享带来可迁移结构，而不是大任务压制小任务或发生标签泄漏？",
  concepts: [
    "第19章 多任务学习",
    "19.1 使用最小二乘回归的多任务学习",
    "19.2 使用最小二乘概率分类器的多任务学习",
    "19.3 多维输出函数的学习",
  ],
  stages: [
    {
      name: "任务集合",
      input: "第19章 多任务学习：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“任务边界、共享/私有参数、任务权重、联合目标和按任务验证固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“按样本量直接合并任务，主任务指标提升却牺牲小任务且无独立基线”就保留失败运行",
    },
    {
      name: "共享结构",
      input: "第19章 多任务学习：上一步输入与候选函数族",
      transform:
        "执行“第19章 多任务学习”的表示或模型变换，并守住“任务边界、共享/私有参数、任务权重、联合目标和按任务验证固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“按样本量直接合并任务，主任务指标提升却牺牲小任务且无独立基线”就保留失败运行",
    },
    {
      name: "任务专属参数",
      input: "第19章 多任务学习：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“任务边界、共享/私有参数、任务权重、联合目标和按任务验证固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“按样本量直接合并任务，主任务指标提升却牺牲小任务且无独立基线”就保留失败运行",
    },
    {
      name: "联合优化",
      input: "第19章 多任务学习：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“任务边界、共享/私有参数、任务权重、联合目标和按任务验证固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“按样本量直接合并任务，主任务指标提升却牺牲小任务且无独立基线”就保留失败运行",
    },
    {
      name: "逐任务验证",
      input: "第19章 多任务学习：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“任务边界、共享/私有参数、任务权重、联合目标和按任务验证固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“按样本量直接合并任务，主任务指标提升却牺牲小任务且无独立基线”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对相关的多个回归与概率分类任务比较独立、完全共享和结构化共享。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“任务集合 → 共享结构 → 任务专属参数 → 联合优化 → 逐任务验证”形成预注册输出。",
      target:
        "满足“任务边界、共享/私有参数、任务权重、联合目标和按任务验证固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对相关的多个回归与概率分类任务比较独立、完全共享和结构化共享。 其余条件不变，只注入“按样本量直接合并任务，主任务指标提升却牺牲小任务且无独立基线”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第19章 多任务学习”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行任务集合、共享结构，保存输入、表示与模型状态",
    "推进任务专属参数、联合优化，记录目标、约束、参数和选择轨迹",
    "在逐任务验证交付任务定义、样本量、共享矩阵、私有参数、任务权重、联合损失、独立基线、逐任务指标和负迁移样本。",
  ],
  failureTrace: [
    "“第19章 多任务学习”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：按样本量直接合并任务，主任务指标提升却牺牲小任务且无独立基线",
    "沿“任务集合 → 共享结构 → 任务专属参数 → 联合优化 → 逐任务验证”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“任务边界、共享/私有参数、任务权重、联合目标和按任务验证固定”恢复才接受修正",
  ],
  invariant: "任务边界、共享/私有参数、任务权重、联合目标和按任务验证固定",
  fault: "按样本量直接合并任务，主任务指标提升却牺牲小任务且无独立基线",
  artifact:
    "任务定义、样本量、共享矩阵、私有参数、任务权重、联合损失、独立基线、逐任务指标和负迁移样本。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第19章 多任务学习”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第19章 多任务学习”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第19章 多任务学习”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第19章 多任务学习”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml19MultiTaskLearningModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml19MultiTaskLearningFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml19MultiTaskLearningValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
