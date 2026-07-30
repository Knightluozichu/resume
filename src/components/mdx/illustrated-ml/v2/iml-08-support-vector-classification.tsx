"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-08",
  title: "第8章 支持向量机分类",
  question:
    "怎样从间隔约束与对偶变量识别支持向量，并观察核与鲁棒损失怎样改变边界？",
  concepts: [
    "第8章 支持向量机分类",
    "8.1 间隔最大化分类",
    "8.2 支持向量机分类器的求解方法",
    "8.3 稀疏性",
    "8.4 使用核映射的非线性模型",
    "8.5 使用Hinge损失最小化学习来解释",
    "8.6 使用Ramp损失的鲁棒学习",
  ],
  stages: [
    {
      name: "特征与核",
      input: "第8章 支持向量机分类：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“特征尺度、核与参数、软间隔强度、求解容差和验证切分固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“未标准化特征便比较间隔，或在测试集上选择核宽度和C”就保留失败运行",
    },
    {
      name: "间隔约束",
      input: "第8章 支持向量机分类：上一步输入与候选函数族",
      transform:
        "执行“第8章 支持向量机分类”的表示或模型变换，并守住“特征尺度、核与参数、软间隔强度、求解容差和验证切分固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“未标准化特征便比较间隔，或在测试集上选择核宽度和C”就保留失败运行",
    },
    {
      name: "对偶求解",
      input: "第8章 支持向量机分类：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“特征尺度、核与参数、软间隔强度、求解容差和验证切分固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“未标准化特征便比较间隔，或在测试集上选择核宽度和C”就保留失败运行",
    },
    {
      name: "支持向量",
      input: "第8章 支持向量机分类：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“特征尺度、核与参数、软间隔强度、求解容差和验证切分固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“未标准化特征便比较间隔，或在测试集上选择核宽度和C”就保留失败运行",
    },
    {
      name: "损失边界验证",
      input: "第8章 支持向量机分类：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“特征尺度、核与参数、软间隔强度、求解容差和验证切分固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“未标准化特征便比较间隔，或在测试集上选择核宽度和C”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对含离群点的非线性二分类比较线性/核SVM、Hinge与Ramp损失。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“特征与核 → 间隔约束 → 对偶求解 → 支持向量 → 损失边界验证”形成预注册输出。",
      target: "满足“特征尺度、核与参数、软间隔强度、求解容差和验证切分固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对含离群点的非线性二分类比较线性/核SVM、Hinge与Ramp损失。 其余条件不变，只注入“未标准化特征便比较间隔，或在测试集上选择核宽度和C”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第8章 支持向量机分类”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行特征与核、间隔约束，保存输入、表示与模型状态",
    "推进对偶求解、支持向量，记录目标、约束、参数和选择轨迹",
    "在损失边界验证交付特征缩放、核矩阵、C与核宽度、对偶系数、KKT残差、支持向量、间隔、验证曲线和离群反例。",
  ],
  failureTrace: [
    "“第8章 支持向量机分类”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：未标准化特征便比较间隔，或在测试集上选择核宽度和C",
    "沿“特征与核 → 间隔约束 → 对偶求解 → 支持向量 → 损失边界验证”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“特征尺度、核与参数、软间隔强度、求解容差和验证切分固定”恢复才接受修正",
  ],
  invariant: "特征尺度、核与参数、软间隔强度、求解容差和验证切分固定",
  fault: "未标准化特征便比较间隔，或在测试集上选择核宽度和C",
  artifact:
    "特征缩放、核矩阵、C与核宽度、对偶系数、KKT残差、支持向量、间隔、验证曲线和离群反例。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第8章 支持向量机分类”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail:
        "“第8章 支持向量机分类”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail:
        "“第8章 支持向量机分类”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第8章 支持向量机分类”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml08SupportVectorClassificationModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml08SupportVectorClassificationFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml08SupportVectorClassificationValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
