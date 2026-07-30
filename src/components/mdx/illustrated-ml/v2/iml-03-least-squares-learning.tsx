"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-03",
  title: "第3章 最小二乘学习法",
  question:
    "怎样从设计矩阵和残差平方和推出解，并用条件数和留出误差识别不稳定拟合？",
  concepts: [
    "第II部分 有监督回归",
    "第3章 最小二乘学习法",
    "3.1 最小二乘学习法",
    "3.2 最小二乘解的性质",
    "3.3 大规模数据的学习算法",
  ],
  stages: [
    {
      name: "设计矩阵",
      input: "第3章 最小二乘学习法：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“设计矩阵、目标向量、残差定义、求解器容差和数据切分固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“直接求逆病态正规方程，系数剧烈变化却只报告训练残差”就保留失败运行",
    },
    {
      name: "平方损失",
      input: "第3章 最小二乘学习法：上一步输入与候选函数族",
      transform:
        "执行“第3章 最小二乘学习法”的表示或模型变换，并守住“设计矩阵、目标向量、残差定义、求解器容差和数据切分固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“直接求逆病态正规方程，系数剧烈变化却只报告训练残差”就保留失败运行",
    },
    {
      name: "线性方程",
      input: "第3章 最小二乘学习法：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“设计矩阵、目标向量、残差定义、求解器容差和数据切分固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“直接求逆病态正规方程，系数剧烈变化却只报告训练残差”就保留失败运行",
    },
    {
      name: "数值求解",
      input: "第3章 最小二乘学习法：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“设计矩阵、目标向量、残差定义、求解器容差和数据切分固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“直接求逆病态正规方程，系数剧烈变化却只报告训练残差”就保留失败运行",
    },
    {
      name: "残差验证",
      input: "第3章 最小二乘学习法：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“设计矩阵、目标向量、残差定义、求解器容差和数据切分固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“直接求逆病态正规方程，系数剧烈变化却只报告训练残差”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "在共线回归数据上比较正规方程、QR或迭代求解，并扰动一列观察系数稳定性。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“设计矩阵 → 平方损失 → 线性方程 → 数值求解 → 残差验证”形成预注册输出。",
      target: "满足“设计矩阵、目标向量、残差定义、求解器容差和数据切分固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "在共线回归数据上比较正规方程、QR或迭代求解，并扰动一列观察系数稳定性。 其余条件不变，只注入“直接求逆病态正规方程，系数剧烈变化却只报告训练残差”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第3章 最小二乘学习法”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行设计矩阵、平方损失，保存输入、表示与模型状态",
    "推进线性方程、数值求解，记录目标、约束、参数和选择轨迹",
    "在残差验证交付设计矩阵、目标、残差、秩与条件数、求解器、容差、系数、训练/验证误差和扰动结果。",
  ],
  failureTrace: [
    "“第3章 最小二乘学习法”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：直接求逆病态正规方程，系数剧烈变化却只报告训练残差",
    "沿“设计矩阵 → 平方损失 → 线性方程 → 数值求解 → 残差验证”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“设计矩阵、目标向量、残差定义、求解器容差和数据切分固定”恢复才接受修正",
  ],
  invariant: "设计矩阵、目标向量、残差定义、求解器容差和数据切分固定",
  fault: "直接求逆病态正规方程，系数剧烈变化却只报告训练残差",
  artifact:
    "设计矩阵、目标、残差、秩与条件数、求解器、容差、系数、训练/验证误差和扰动结果。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第3章 最小二乘学习法”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail:
        "“第3章 最小二乘学习法”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail:
        "“第3章 最小二乘学习法”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第3章 最小二乘学习法”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml03LeastSquaresLearningModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml03LeastSquaresLearningFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml03LeastSquaresLearningValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
