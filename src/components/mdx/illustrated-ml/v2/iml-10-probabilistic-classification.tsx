"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-10",
  title: "第10章 概率分类法",
  question: "怎样验证输出满足概率约束、排序与校准，而不是只看分类准确率？",
  concepts: ["第10章 概率分类法", "10.1 Logistic回归", "10.2 最小二乘概率分类"],
  stages: [
    {
      name: "类别与特征",
      input: "第10章 概率分类法：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“标签编码、链接函数、概率归一化、损失、阈值和校准集合固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“把任意分数归一化后称为概率，没有对数损失、Brier或校准证据”就保留失败运行",
    },
    {
      name: "概率链接",
      input: "第10章 概率分类法：上一步输入与候选函数族",
      transform:
        "执行“第10章 概率分类法”的表示或模型变换，并守住“标签编码、链接函数、概率归一化、损失、阈值和校准集合固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“把任意分数归一化后称为概率，没有对数损失、Brier或校准证据”就保留失败运行",
    },
    {
      name: "风险最小化",
      input: "第10章 概率分类法：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“标签编码、链接函数、概率归一化、损失、阈值和校准集合固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“把任意分数归一化后称为概率，没有对数损失、Brier或校准证据”就保留失败运行",
    },
    {
      name: "归一化与阈值",
      input: "第10章 概率分类法：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“标签编码、链接函数、概率归一化、损失、阈值和校准集合固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“把任意分数归一化后称为概率，没有对数损失、Brier或校准证据”就保留失败运行",
    },
    {
      name: "校准验证",
      input: "第10章 概率分类法：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“标签编码、链接函数、概率归一化、损失、阈值和校准集合固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“把任意分数归一化后称为概率，没有对数损失、Brier或校准证据”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对类别不平衡数据比较Logistic与最小二乘概率分数，检查排序和校准。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“类别与特征 → 概率链接 → 风险最小化 → 归一化与阈值 → 校准验证”形成预注册输出。",
      target:
        "满足“标签编码、链接函数、概率归一化、损失、阈值和校准集合固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对类别不平衡数据比较Logistic与最小二乘概率分数，检查排序和校准。 其余条件不变，只注入“把任意分数归一化后称为概率，没有对数损失、Brier或校准证据”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第10章 概率分类法”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行类别与特征、概率链接，保存输入、表示与模型状态",
    "推进风险最小化、归一化与阈值，记录目标、约束、参数和选择轨迹",
    "在校准验证交付标签比例、分数、概率和、损失、阈值、可靠性分箱、Brier/对数损失、混淆矩阵和校准失败样本。",
  ],
  failureTrace: [
    "“第10章 概率分类法”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：把任意分数归一化后称为概率，没有对数损失、Brier或校准证据",
    "沿“类别与特征 → 概率链接 → 风险最小化 → 归一化与阈值 → 校准验证”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“标签编码、链接函数、概率归一化、损失、阈值和校准集合固定”恢复才接受修正",
  ],
  invariant: "标签编码、链接函数、概率归一化、损失、阈值和校准集合固定",
  fault: "把任意分数归一化后称为概率，没有对数损失、Brier或校准证据",
  artifact:
    "标签比例、分数、概率和、损失、阈值、可靠性分箱、Brier/对数损失、混淆矩阵和校准失败样本。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第10章 概率分类法”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第10章 概率分类法”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第10章 概率分类法”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第10章 概率分类法”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml10ProbabilisticClassificationModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml10ProbabilisticClassificationFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml10ProbabilisticClassificationValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
