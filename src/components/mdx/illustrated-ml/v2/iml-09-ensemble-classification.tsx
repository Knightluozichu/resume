"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-09",
  title: "第9章 集成分类",
  question:
    "怎样区分重采样降方差和顺序加权纠错，并用袋外或独立验证证明集成收益？",
  concepts: [
    "第9章 集成分类",
    "9.1 剪枝分类",
    "9.2 Bagging学习法",
    "9.3 Boosting学习法",
  ],
  stages: [
    {
      name: "基础学习器",
      input: "第9章 集成分类：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“基础学习器、采样种子、轮数、组合权重和评估集合固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“用同一训练样本评估每轮并挑选最佳轮数，未保留袋外或验证证据”就保留失败运行",
    },
    {
      name: "采样或加权",
      input: "第9章 集成分类：上一步输入与候选函数族",
      transform:
        "执行“第9章 集成分类”的表示或模型变换，并守住“基础学习器、采样种子、轮数、组合权重和评估集合固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“用同一训练样本评估每轮并挑选最佳轮数，未保留袋外或验证证据”就保留失败运行",
    },
    {
      name: "成员拟合",
      input: "第9章 集成分类：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“基础学习器、采样种子、轮数、组合权重和评估集合固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“用同一训练样本评估每轮并挑选最佳轮数，未保留袋外或验证证据”就保留失败运行",
    },
    {
      name: "组合预测",
      input: "第9章 集成分类：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“基础学习器、采样种子、轮数、组合权重和评估集合固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“用同一训练样本评估每轮并挑选最佳轮数，未保留袋外或验证证据”就保留失败运行",
    },
    {
      name: "袋外/验证",
      input: "第9章 集成分类：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“基础学习器、采样种子、轮数、组合权重和评估集合固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“用同一训练样本评估每轮并挑选最佳轮数，未保留袋外或验证证据”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "在不稳定树基线上比较剪枝、Bagging和Boosting，记录样本权重与预测分歧。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“基础学习器 → 采样或加权 → 成员拟合 → 组合预测 → 袋外/验证”形成预注册输出。",
      target: "满足“基础学习器、采样种子、轮数、组合权重和评估集合固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "在不稳定树基线上比较剪枝、Bagging和Boosting，记录样本权重与预测分歧。 其余条件不变，只注入“用同一训练样本评估每轮并挑选最佳轮数，未保留袋外或验证证据”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第9章 集成分类”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行基础学习器、采样或加权，保存输入、表示与模型状态",
    "推进成员拟合、组合预测，记录目标、约束、参数和选择轨迹",
    "在袋外/验证交付基础树、重采样索引、样本权重、成员预测、组合权重、轮数、袋外误差、验证曲线和分歧样本。",
  ],
  failureTrace: [
    "“第9章 集成分类”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：用同一训练样本评估每轮并挑选最佳轮数，未保留袋外或验证证据",
    "沿“基础学习器 → 采样或加权 → 成员拟合 → 组合预测 → 袋外/验证”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“基础学习器、采样种子、轮数、组合权重和评估集合固定”恢复才接受修正",
  ],
  invariant: "基础学习器、采样种子、轮数、组合权重和评估集合固定",
  fault: "用同一训练样本评估每轮并挑选最佳轮数，未保留袋外或验证证据",
  artifact:
    "基础树、重采样索引、样本权重、成员预测、组合权重、轮数、袋外误差、验证曲线和分歧样本。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第9章 集成分类”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第9章 集成分类”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第9章 集成分类”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第9章 集成分类”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml09EnsembleClassificationModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml09EnsembleClassificationFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml09EnsembleClassificationValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
