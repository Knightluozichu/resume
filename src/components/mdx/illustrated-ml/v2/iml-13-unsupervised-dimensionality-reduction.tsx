"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-13",
  title: "第13章 无监督降维",
  question:
    "怎样区分保方差、保局部邻域和核非线性目标，并验证嵌入没有偷看标签？",
  concepts: [
    "第13章 无监督降维",
    "13.1 线性降维的原理",
    "13.2 主成分分析",
    "13.3 局部保持投影",
    "13.4 核函数主成分分析",
    "13.5 拉普拉斯特征映射",
  ],
  stages: [
    {
      name: "中心化数据",
      input: "第13章 无监督降维：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“预处理、邻接图、核、维数、拟合数据和外样本评估固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“在训练测试合并数据上拟合PCA或邻接图，再宣称下游泛化提高”就保留失败运行",
    },
    {
      name: "协方差/邻接图",
      input: "第13章 无监督降维：上一步输入与候选函数族",
      transform:
        "执行“第13章 无监督降维”的表示或模型变换，并守住“预处理、邻接图、核、维数、拟合数据和外样本评估固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“在训练测试合并数据上拟合PCA或邻接图，再宣称下游泛化提高”就保留失败运行",
    },
    {
      name: "谱问题",
      input: "第13章 无监督降维：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“预处理、邻接图、核、维数、拟合数据和外样本评估固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“在训练测试合并数据上拟合PCA或邻接图，再宣称下游泛化提高”就保留失败运行",
    },
    {
      name: "低维坐标",
      input: "第13章 无监督降维：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“预处理、邻接图、核、维数、拟合数据和外样本评估固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“在训练测试合并数据上拟合PCA或邻接图，再宣称下游泛化提高”就保留失败运行",
    },
    {
      name: "外样本验证",
      input: "第13章 无监督降维：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“预处理、邻接图、核、维数、拟合数据和外样本评估固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“在训练测试合并数据上拟合PCA或邻接图，再宣称下游泛化提高”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对弯曲流形数据比较PCA、LPP、核PCA和拉普拉斯特征映射的邻域保持。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“中心化数据 → 协方差/邻接图 → 谱问题 → 低维坐标 → 外样本验证”形成预注册输出。",
      target: "满足“预处理、邻接图、核、维数、拟合数据和外样本评估固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对弯曲流形数据比较PCA、LPP、核PCA和拉普拉斯特征映射的邻域保持。 其余条件不变，只注入“在训练测试合并数据上拟合PCA或邻接图，再宣称下游泛化提高”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第13章 无监督降维”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行中心化数据、协方差/邻接图，保存输入、表示与模型状态",
    "推进谱问题、低维坐标，记录目标、约束、参数和选择轨迹",
    "在外样本验证交付预处理统计、协方差、邻接矩阵、核矩阵、特征值向量、维数、嵌入、邻域保持和外样本策略。",
  ],
  failureTrace: [
    "“第13章 无监督降维”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：在训练测试合并数据上拟合PCA或邻接图，再宣称下游泛化提高",
    "沿“中心化数据 → 协方差/邻接图 → 谱问题 → 低维坐标 → 外样本验证”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“预处理、邻接图、核、维数、拟合数据和外样本评估固定”恢复才接受修正",
  ],
  invariant: "预处理、邻接图、核、维数、拟合数据和外样本评估固定",
  fault: "在训练测试合并数据上拟合PCA或邻接图，再宣称下游泛化提高",
  artifact:
    "预处理统计、协方差、邻接矩阵、核矩阵、特征值向量、维数、嵌入、邻域保持和外样本策略。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第13章 无监督降维”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第13章 无监督降维”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第13章 无监督降维”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第13章 无监督降维”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml13UnsupervisedDimensionalityReductionModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml13UnsupervisedDimensionalityReductionFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml13UnsupervisedDimensionalityReductionValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
