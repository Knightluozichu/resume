"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-01",
  title: "第1章 什么是机器学习",
  question:
    "怎样由输出、反馈与数据生成方式判断监督、无监督或其他学习任务，而不是先选热门算法？",
  concepts: [
    "第I部分 绪论",
    "第1章 什么是机器学习",
    "1.1 学习的种类",
    "1.2 机器学习任务的例子",
    "1.3 机器学习的方法",
  ],
  stages: [
    {
      name: "问题",
      input: "第1章 什么是机器学习：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“问题、输入、输出、监督信号、样本来源、损失与评估集合明确”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“把没有标签的聚类问题硬写成分类，随后用训练准确率宣称任务成功”就保留失败运行",
    },
    {
      name: "输入样本",
      input: "第1章 什么是机器学习：上一步输入与候选函数族",
      transform:
        "执行“第1章 什么是机器学习”的表示或模型变换，并守住“问题、输入、输出、监督信号、样本来源、损失与评估集合明确”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“把没有标签的聚类问题硬写成分类，随后用训练准确率宣称任务成功”就保留失败运行",
    },
    {
      name: "监督信号",
      input: "第1章 什么是机器学习：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“问题、输入、输出、监督信号、样本来源、损失与评估集合明确”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“把没有标签的聚类问题硬写成分类，随后用训练准确率宣称任务成功”就保留失败运行",
    },
    {
      name: "学习方法",
      input: "第1章 什么是机器学习：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“问题、输入、输出、监督信号、样本来源、损失与评估集合明确”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“把没有标签的聚类问题硬写成分类，随后用训练准确率宣称任务成功”就保留失败运行",
    },
    {
      name: "任务验收",
      input: "第1章 什么是机器学习：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“问题、输入、输出、监督信号、样本来源、损失与评估集合明确”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“把没有标签的聚类问题硬写成分类，随后用训练准确率宣称任务成功”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对房价、垃圾邮件与客户分群三个案例分别登记输出、反馈、数据和验收指标。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“问题 → 输入样本 → 监督信号 → 学习方法 → 任务验收”形成预注册输出。",
      target:
        "满足“问题、输入、输出、监督信号、样本来源、损失与评估集合明确”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对房价、垃圾邮件与客户分群三个案例分别登记输出、反馈、数据和验收指标。 其余条件不变，只注入“把没有标签的聚类问题硬写成分类，随后用训练准确率宣称任务成功”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第1章 什么是机器学习”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行问题、输入样本，保存输入、表示与模型状态",
    "推进监督信号、学习方法，记录目标、约束、参数和选择轨迹",
    "在任务验收交付任务定义、样本单位、标签可得性、数据生成过程、候选方法、简单基线、指标和失败案例。",
  ],
  failureTrace: [
    "“第1章 什么是机器学习”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：把没有标签的聚类问题硬写成分类，随后用训练准确率宣称任务成功",
    "沿“问题 → 输入样本 → 监督信号 → 学习方法 → 任务验收”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“问题、输入、输出、监督信号、样本来源、损失与评估集合明确”恢复才接受修正",
  ],
  invariant: "问题、输入、输出、监督信号、样本来源、损失与评估集合明确",
  fault: "把没有标签的聚类问题硬写成分类，随后用训练准确率宣称任务成功",
  artifact:
    "任务定义、样本单位、标签可得性、数据生成过程、候选方法、简单基线、指标和失败案例。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第1章 什么是机器学习”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail:
        "“第1章 什么是机器学习”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail:
        "“第1章 什么是机器学习”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第1章 什么是机器学习”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml01WhatIsMachineLearningModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml01WhatIsMachineLearningFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml01WhatIsMachineLearningValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
