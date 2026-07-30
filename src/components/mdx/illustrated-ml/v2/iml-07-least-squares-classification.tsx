"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-07",
  title: "第7章 基于最小二乘法的分类",
  question:
    "怎样把回归分数转换为类别决策，并用间隔与混淆矩阵发现平方损失的分类边界？",
  concepts: [
    "第III部分 有监督分类",
    "第7章 基于最小二乘法的分类",
    "7.1 最小二乘分类",
    "7.2 0/1损失和间隔",
    "7.3 多类别的情形",
  ],
  stages: [
    {
      name: "类别编码",
      input: "第7章 基于最小二乘法的分类：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“类别编码、分数函数、决策规则、损失和多类别组合固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“改变类别编码后仍沿用旧阈值，表面平方误差下降而分类决策翻转”就保留失败运行",
    },
    {
      name: "分数拟合",
      input: "第7章 基于最小二乘法的分类：上一步输入与候选函数族",
      transform:
        "执行“第7章 基于最小二乘法的分类”的表示或模型变换，并守住“类别编码、分数函数、决策规则、损失和多类别组合固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“改变类别编码后仍沿用旧阈值，表面平方误差下降而分类决策翻转”就保留失败运行",
    },
    {
      name: "决策阈值",
      input: "第7章 基于最小二乘法的分类：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“类别编码、分数函数、决策规则、损失和多类别组合固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“改变类别编码后仍沿用旧阈值，表面平方误差下降而分类决策翻转”就保留失败运行",
    },
    {
      name: "间隔与0/1损失",
      input: "第7章 基于最小二乘法的分类：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“类别编码、分数函数、决策规则、损失和多类别组合固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“改变类别编码后仍沿用旧阈值，表面平方误差下降而分类决策翻转”就保留失败运行",
    },
    {
      name: "多类验证",
      input: "第7章 基于最小二乘法的分类：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“类别编码、分数函数、决策规则、损失和多类别组合固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“改变类别编码后仍沿用旧阈值，表面平方误差下降而分类决策翻转”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对三类别样本拟合最小二乘分数，比较编码、阈值、间隔与0/1错误。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“类别编码 → 分数拟合 → 决策阈值 → 间隔与0/1损失 → 多类验证”形成预注册输出。",
      target: "满足“类别编码、分数函数、决策规则、损失和多类别组合固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对三类别样本拟合最小二乘分数，比较编码、阈值、间隔与0/1错误。 其余条件不变，只注入“改变类别编码后仍沿用旧阈值，表面平方误差下降而分类决策翻转”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第7章 基于最小二乘法的分类”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行类别编码、分数拟合，保存输入、表示与模型状态",
    "推进决策阈值、间隔与0/1损失，记录目标、约束、参数和选择轨迹",
    "在多类验证交付类别编码、分数矩阵、阈值、间隔、平方损失、0/1损失、混淆矩阵和多类失败样本。",
  ],
  failureTrace: [
    "“第7章 基于最小二乘法的分类”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：改变类别编码后仍沿用旧阈值，表面平方误差下降而分类决策翻转",
    "沿“类别编码 → 分数拟合 → 决策阈值 → 间隔与0/1损失 → 多类验证”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“类别编码、分数函数、决策规则、损失和多类别组合固定”恢复才接受修正",
  ],
  invariant: "类别编码、分数函数、决策规则、损失和多类别组合固定",
  fault: "改变类别编码后仍沿用旧阈值，表面平方误差下降而分类决策翻转",
  artifact:
    "类别编码、分数矩阵、阈值、间隔、平方损失、0/1损失、混淆矩阵和多类失败样本。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第7章 基于最小二乘法的分类”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail:
        "“第7章 基于最小二乘法的分类”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail:
        "“第7章 基于最小二乘法的分类”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail:
        "“第7章 基于最小二乘法的分类”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml07LeastSquaresClassificationModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml07LeastSquaresClassificationFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml07LeastSquaresClassificationValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
