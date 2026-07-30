"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-17",
  title: "第17章 监督降维",
  question: "怎样利用标签寻找判别子空间，同时避免把类间分离图误作泛化证据？",
  concepts: [
    "第17章 监督降维",
    "17.1 与分类问题相对应的判别分析",
    "17.2 充分降维",
  ],
  stages: [
    {
      name: "带标签样本",
      input: "第17章 监督降维：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“训练标签、散度/充分性目标、维数候选、分类器和嵌套验证固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“先在全量标签上选投影，再对同一数据交叉验证分类器”就保留失败运行",
    },
    {
      name: "监督目标",
      input: "第17章 监督降维：上一步输入与候选函数族",
      transform:
        "执行“第17章 监督降维”的表示或模型变换，并守住“训练标签、散度/充分性目标、维数候选、分类器和嵌套验证固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“先在全量标签上选投影，再对同一数据交叉验证分类器”就保留失败运行",
    },
    {
      name: "谱/优化求解",
      input: "第17章 监督降维：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“训练标签、散度/充分性目标、维数候选、分类器和嵌套验证固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“先在全量标签上选投影，再对同一数据交叉验证分类器”就保留失败运行",
    },
    {
      name: "低维表示",
      input: "第17章 监督降维：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“训练标签、散度/充分性目标、维数候选、分类器和嵌套验证固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“先在全量标签上选投影，再对同一数据交叉验证分类器”就保留失败运行",
    },
    {
      name: "嵌套分类验证",
      input: "第17章 监督降维：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“训练标签、散度/充分性目标、维数候选、分类器和嵌套验证固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“先在全量标签上选投影，再对同一数据交叉验证分类器”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对高维多类数据比较无监督PCA、判别分析与充分降维，并嵌套选择维数。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“带标签样本 → 监督目标 → 谱/优化求解 → 低维表示 → 嵌套分类验证”形成预注册输出。",
      target:
        "满足“训练标签、散度/充分性目标、维数候选、分类器和嵌套验证固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对高维多类数据比较无监督PCA、判别分析与充分降维，并嵌套选择维数。 其余条件不变，只注入“先在全量标签上选投影，再对同一数据交叉验证分类器”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第17章 监督降维”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行带标签样本、监督目标，保存输入、表示与模型状态",
    "推进谱/优化求解、低维表示，记录目标、约束、参数和选择轨迹",
    "在嵌套分类验证交付标签切分、类内/类间量、充分性目标、投影、维数路径、下游分类器、内层选择和外层测试。",
  ],
  failureTrace: [
    "“第17章 监督降维”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：先在全量标签上选投影，再对同一数据交叉验证分类器",
    "沿“带标签样本 → 监督目标 → 谱/优化求解 → 低维表示 → 嵌套分类验证”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“训练标签、散度/充分性目标、维数候选、分类器和嵌套验证固定”恢复才接受修正",
  ],
  invariant: "训练标签、散度/充分性目标、维数候选、分类器和嵌套验证固定",
  fault: "先在全量标签上选投影，再对同一数据交叉验证分类器",
  artifact:
    "标签切分、类内/类间量、充分性目标、投影、维数路径、下游分类器、内层选择和外层测试。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第17章 监督降维”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第17章 监督降维”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第17章 监督降维”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第17章 监督降维”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml17SupervisedDimensionalityReductionModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml17SupervisedDimensionalityReductionFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml17SupervisedDimensionalityReductionValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
