"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-02",
  title: "第2章 学习模型",
  question:
    "怎样在同一数据上区分特征映射、核相似度和层级组合带来的模型空间变化？",
  concepts: ["第2章 学习模型", "2.1 线性模型", "2.2 核模型", "2.3 层级模型"],
  stages: [
    {
      name: "输入表示",
      input: "第2章 学习模型：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“输入表示、函数族、参数或核、复杂度控制与验证协议固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“把核技巧称为自动学特征，或只因训练误差低就选择更复杂层级模型”就保留失败运行",
    },
    {
      name: "线性基线",
      input: "第2章 学习模型：上一步输入与候选函数族",
      transform:
        "执行“第2章 学习模型”的表示或模型变换，并守住“输入表示、函数族、参数或核、复杂度控制与验证协议固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“把核技巧称为自动学特征，或只因训练误差低就选择更复杂层级模型”就保留失败运行",
    },
    {
      name: "核相似度",
      input: "第2章 学习模型：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“输入表示、函数族、参数或核、复杂度控制与验证协议固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“把核技巧称为自动学特征，或只因训练误差低就选择更复杂层级模型”就保留失败运行",
    },
    {
      name: "层级组合",
      input: "第2章 学习模型：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“输入表示、函数族、参数或核、复杂度控制与验证协议固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“把核技巧称为自动学特征，或只因训练误差低就选择更复杂层级模型”就保留失败运行",
    },
    {
      name: "复杂度验证",
      input: "第2章 学习模型：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“输入表示、函数族、参数或核、复杂度控制与验证协议固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“把核技巧称为自动学特征，或只因训练误差低就选择更复杂层级模型”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对一组非线性二维样本比较线性特征、核模型和两层表示，并记录决策函数。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“输入表示 → 线性基线 → 核相似度 → 层级组合 → 复杂度验证”形成预注册输出。",
      target: "满足“输入表示、函数族、参数或核、复杂度控制与验证协议固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对一组非线性二维样本比较线性特征、核模型和两层表示，并记录决策函数。 其余条件不变，只注入“把核技巧称为自动学特征，或只因训练误差低就选择更复杂层级模型”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第2章 学习模型”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行输入表示、线性基线，保存输入、表示与模型状态",
    "推进核相似度、层级组合，记录目标、约束、参数和选择轨迹",
    "在复杂度验证交付特征矩阵、函数族、核矩阵、层级结构、参数量、训练/验证风险与复杂度曲线。",
  ],
  failureTrace: [
    "“第2章 学习模型”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：把核技巧称为自动学特征，或只因训练误差低就选择更复杂层级模型",
    "沿“输入表示 → 线性基线 → 核相似度 → 层级组合 → 复杂度验证”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“输入表示、函数族、参数或核、复杂度控制与验证协议固定”恢复才接受修正",
  ],
  invariant: "输入表示、函数族、参数或核、复杂度控制与验证协议固定",
  fault: "把核技巧称为自动学特征，或只因训练误差低就选择更复杂层级模型",
  artifact:
    "特征矩阵、函数族、核矩阵、层级结构、参数量、训练/验证风险与复杂度曲线。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第2章 学习模型”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第2章 学习模型”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第2章 学习模型”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第2章 学习模型”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml02LearningModelsModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml02LearningModelsFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml02LearningModelsValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
