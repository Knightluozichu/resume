"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-12",
  title: "第12章 异常检测",
  question:
    "怎样在没有普通分类标签时定义参照邻域、支持区域或密度比，并控制异常率？",
  concepts: [
    "第IV部分 无监督学习",
    "第12章 异常检测",
    "12.1 局部异常因子",
    "12.2 支持向量机异常检测",
    "12.3 基于密度比的异常检测",
  ],
  stages: [
    {
      name: "参考分布",
      input: "第12章 异常检测：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“参考样本、距离或核、邻居数、阈值选择和污染测试集固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“在含测试异常的全量数据上拟合尺度和阈值，造成评估泄漏”就保留失败运行",
    },
    {
      name: "邻域/核表示",
      input: "第12章 异常检测：上一步输入与候选函数族",
      transform:
        "执行“第12章 异常检测”的表示或模型变换，并守住“参考样本、距离或核、邻居数、阈值选择和污染测试集固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“在含测试异常的全量数据上拟合尺度和阈值，造成评估泄漏”就保留失败运行",
    },
    {
      name: "异常分数",
      input: "第12章 异常检测：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“参考样本、距离或核、邻居数、阈值选择和污染测试集固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“在含测试异常的全量数据上拟合尺度和阈值，造成评估泄漏”就保留失败运行",
    },
    {
      name: "阈值",
      input: "第12章 异常检测：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“参考样本、距离或核、邻居数、阈值选择和污染测试集固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“在含测试异常的全量数据上拟合尺度和阈值，造成评估泄漏”就保留失败运行",
    },
    {
      name: "新型异常验证",
      input: "第12章 异常检测：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“参考样本、距离或核、邻居数、阈值选择和污染测试集固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“在含测试异常的全量数据上拟合尺度和阈值，造成评估泄漏”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对局部密度不同的数据比较LOF、单类SVM和密度比评分，并注入新型异常。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“参考分布 → 邻域/核表示 → 异常分数 → 阈值 → 新型异常验证”形成预注册输出。",
      target: "满足“参考样本、距离或核、邻居数、阈值选择和污染测试集固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对局部密度不同的数据比较LOF、单类SVM和密度比评分，并注入新型异常。 其余条件不变，只注入“在含测试异常的全量数据上拟合尺度和阈值，造成评估泄漏”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第12章 异常检测”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行参考分布、邻域/核表示，保存输入、表示与模型状态",
    "推进异常分数、阈值，记录目标、约束、参数和选择轨迹",
    "在新型异常验证交付参考集、缩放、距离/核、邻居、局部密度、支持区域、密度比、阈值、误报漏报和新型异常。",
  ],
  failureTrace: [
    "“第12章 异常检测”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：在含测试异常的全量数据上拟合尺度和阈值，造成评估泄漏",
    "沿“参考分布 → 邻域/核表示 → 异常分数 → 阈值 → 新型异常验证”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“参考样本、距离或核、邻居数、阈值选择和污染测试集固定”恢复才接受修正",
  ],
  invariant: "参考样本、距离或核、邻居数、阈值选择和污染测试集固定",
  fault: "在含测试异常的全量数据上拟合尺度和阈值，造成评估泄漏",
  artifact:
    "参考集、缩放、距离/核、邻居、局部密度、支持区域、密度比、阈值、误报漏报和新型异常。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第12章 异常检测”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第12章 异常检测”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第12章 异常检测”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第12章 异常检测”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml12AnomalyDetectionModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml12AnomalyDetectionFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml12AnomalyDetectionValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
