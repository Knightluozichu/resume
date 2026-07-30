"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-05",
  title: "第5章 稀疏学习",
  question:
    "怎样沿正则路径观察系数进入与退出，并区分稀疏预测、特征选择和相关变量不稳定？",
  concepts: [
    "第5章 稀疏学习",
    "5.1 l1约束的最小二乘学习法",
    "5.2 l1约束最小二乘的求解方法",
    "5.3 通过稀疏学习进行特征选择",
    "5.4 lp约束的最小二乘学习法",
    "5.5 l1与l2约束的最小二乘学习法",
  ],
  stages: [
    {
      name: "标准化特征",
      input: "第5章 稀疏学习：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“特征标准化、损失、正则路径、求解容差、选择切分和稀疏度定义固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“在全量数据上筛特征后再交叉验证，造成选择泄漏和过度乐观”就保留失败运行",
    },
    {
      name: "l1/lp约束",
      input: "第5章 稀疏学习：上一步输入与候选函数族",
      transform:
        "执行“第5章 稀疏学习”的表示或模型变换，并守住“特征标准化、损失、正则路径、求解容差、选择切分和稀疏度定义固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“在全量数据上筛特征后再交叉验证，造成选择泄漏和过度乐观”就保留失败运行",
    },
    {
      name: "路径求解",
      input: "第5章 稀疏学习：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“特征标准化、损失、正则路径、求解容差、选择切分和稀疏度定义固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“在全量数据上筛特征后再交叉验证，造成选择泄漏和过度乐观”就保留失败运行",
    },
    {
      name: "支持集",
      input: "第5章 稀疏学习：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“特征标准化、损失、正则路径、求解容差、选择切分和稀疏度定义固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“在全量数据上筛特征后再交叉验证，造成选择泄漏和过度乐观”就保留失败运行",
    },
    {
      name: "选择稳定性",
      input: "第5章 稀疏学习：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“特征标准化、损失、正则路径、求解容差、选择切分和稀疏度定义固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“在全量数据上筛特征后再交叉验证，造成选择泄漏和过度乐观”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对含相关变量的高维数据运行l1与l1/l2约束，记录支持集路径和重采样稳定性。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“标准化特征 → l1/lp约束 → 路径求解 → 支持集 → 选择稳定性”形成预注册输出。",
      target:
        "满足“特征标准化、损失、正则路径、求解容差、选择切分和稀疏度定义固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对含相关变量的高维数据运行l1与l1/l2约束，记录支持集路径和重采样稳定性。 其余条件不变，只注入“在全量数据上筛特征后再交叉验证，造成选择泄漏和过度乐观”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第5章 稀疏学习”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行标准化特征、l1/lp约束，保存输入、表示与模型状态",
    "推进路径求解、支持集，记录目标、约束、参数和选择轨迹",
    "在选择稳定性交付标准化参数、正则路径、KKT或残差、求解容差、非零系数、支持集频率、验证误差和测试结果。",
  ],
  failureTrace: [
    "“第5章 稀疏学习”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：在全量数据上筛特征后再交叉验证，造成选择泄漏和过度乐观",
    "沿“标准化特征 → l1/lp约束 → 路径求解 → 支持集 → 选择稳定性”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“特征标准化、损失、正则路径、求解容差、选择切分和稀疏度定义固定”恢复才接受修正",
  ],
  invariant: "特征标准化、损失、正则路径、求解容差、选择切分和稀疏度定义固定",
  fault: "在全量数据上筛特征后再交叉验证，造成选择泄漏和过度乐观",
  artifact:
    "标准化参数、正则路径、KKT或残差、求解容差、非零系数、支持集频率、验证误差和测试结果。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第5章 稀疏学习”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第5章 稀疏学习”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第5章 稀疏学习”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第5章 稀疏学习”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml05SparseLearningModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml05SparseLearningFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml05SparseLearningValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
