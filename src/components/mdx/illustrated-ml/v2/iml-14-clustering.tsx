"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-14",
  title: "第14章 聚类",
  question:
    "怎样由距离、核或图拉普拉斯定义簇，并验证初始化和参数变化不会任意翻转结论？",
  concepts: [
    "第14章 聚类",
    "14.1 K均值聚类",
    "14.2 核K均值聚类",
    "14.3 谱聚类",
    "14.4 调整参数的自动选取",
  ],
  stages: [
    {
      name: "样本相似度",
      input: "第14章 聚类：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“距离/核、簇数候选、初始化种子、停止条件和稳定性评估固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“只展示一次最漂亮初始化，忽略空簇、局部最优和参数敏感性”就保留失败运行",
    },
    {
      name: "簇表示",
      input: "第14章 聚类：上一步输入与候选函数族",
      transform:
        "执行“第14章 聚类”的表示或模型变换，并守住“距离/核、簇数候选、初始化种子、停止条件和稳定性评估固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“只展示一次最漂亮初始化，忽略空簇、局部最优和参数敏感性”就保留失败运行",
    },
    {
      name: "迭代/谱嵌入",
      input: "第14章 聚类：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“距离/核、簇数候选、初始化种子、停止条件和稳定性评估固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“只展示一次最漂亮初始化，忽略空簇、局部最优和参数敏感性”就保留失败运行",
    },
    {
      name: "簇分配",
      input: "第14章 聚类：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“距离/核、簇数候选、初始化种子、停止条件和稳定性评估固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“只展示一次最漂亮初始化，忽略空簇、局部最优和参数敏感性”就保留失败运行",
    },
    {
      name: "参数稳定性",
      input: "第14章 聚类：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“距离/核、簇数候选、初始化种子、停止条件和稳定性评估固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“只展示一次最漂亮初始化，忽略空簇、局部最优和参数敏感性”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "对非凸簇数据比较K均值、核K均值和谱聚类，重复初始化并选择参数。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“样本相似度 → 簇表示 → 迭代/谱嵌入 → 簇分配 → 参数稳定性”形成预注册输出。",
      target: "满足“距离/核、簇数候选、初始化种子、停止条件和稳定性评估固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "对非凸簇数据比较K均值、核K均值和谱聚类，重复初始化并选择参数。 其余条件不变，只注入“只展示一次最漂亮初始化，忽略空簇、局部最优和参数敏感性”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第14章 聚类”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行样本相似度、簇表示，保存输入、表示与模型状态",
    "推进迭代/谱嵌入、簇分配，记录目标、约束、参数和选择轨迹",
    "在参数稳定性交付距离/核/图、簇数、初始化、质心或谱向量、目标轨迹、停止条件、分配、稳定性和失败初始化。",
  ],
  failureTrace: [
    "“第14章 聚类”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：只展示一次最漂亮初始化，忽略空簇、局部最优和参数敏感性",
    "沿“样本相似度 → 簇表示 → 迭代/谱嵌入 → 簇分配 → 参数稳定性”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“距离/核、簇数候选、初始化种子、停止条件和稳定性评估固定”恢复才接受修正",
  ],
  invariant: "距离/核、簇数候选、初始化种子、停止条件和稳定性评估固定",
  fault: "只展示一次最漂亮初始化，忽略空簇、局部最优和参数敏感性",
  artifact:
    "距离/核/图、簇数、初始化、质心或谱向量、目标轨迹、停止条件、分配、稳定性和失败初始化。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第14章 聚类”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第14章 聚类”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第14章 聚类”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第14章 聚类”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml14ClusteringModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml14ClusteringFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml14ClusteringValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
