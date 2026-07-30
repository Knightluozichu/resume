"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-06",
  title: "第6章 鲁棒学习",
  question:
    "怎样通过残差到权重的映射解释离群点影响，并区分鲁棒性与删除困难样本？",
  concepts: [
    "第6章 鲁棒学习",
    "6.1 l1损失最小化学习",
    "6.2 Huber损失最小化学习",
    "6.3 图基损失最小化学习",
    "6.4 l1约束的Huber损失最小化学习",
  ],
  stages: [
    {
      name: "残差",
      input: "第6章 鲁棒学习：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“污染机制、损失阈值、约束、优化器和干净/污染测试集同时固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“根据模型残差手工删除样本后只在清洗数据上评估，隐藏真实失败率”就保留失败运行",
    },
    {
      name: "鲁棒损失",
      input: "第6章 鲁棒学习：上一步输入与候选函数族",
      transform:
        "执行“第6章 鲁棒学习”的表示或模型变换，并守住“污染机制、损失阈值、约束、优化器和干净/污染测试集同时固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“根据模型残差手工删除样本后只在清洗数据上评估，隐藏真实失败率”就保留失败运行",
    },
    {
      name: "样本影响",
      input: "第6章 鲁棒学习：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“污染机制、损失阈值、约束、优化器和干净/污染测试集同时固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“根据模型残差手工删除样本后只在清洗数据上评估，隐藏真实失败率”就保留失败运行",
    },
    {
      name: "受约束更新",
      input: "第6章 鲁棒学习：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“污染机制、损失阈值、约束、优化器和干净/污染测试集同时固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“根据模型残差手工删除样本后只在清洗数据上评估，隐藏真实失败率”就保留失败运行",
    },
    {
      name: "污染对照",
      input: "第6章 鲁棒学习：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“污染机制、损失阈值、约束、优化器和干净/污染测试集同时固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“根据模型残差手工删除样本后只在清洗数据上评估，隐藏真实失败率”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "向回归数据注入少量大残差，对比平方、l1与Huber损失的参数和预测变化。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“残差 → 鲁棒损失 → 样本影响 → 受约束更新 → 污染对照”形成预注册输出。",
      target:
        "满足“污染机制、损失阈值、约束、优化器和干净/污染测试集同时固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "向回归数据注入少量大残差，对比平方、l1与Huber损失的参数和预测变化。 其余条件不变，只注入“根据模型残差手工删除样本后只在清洗数据上评估，隐藏真实失败率”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第6章 鲁棒学习”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行残差、鲁棒损失，保存输入、表示与模型状态",
    "推进样本影响、受约束更新，记录目标、约束、参数和选择轨迹",
    "在污染对照交付污染种子、残差、损失曲线、影响权重、阈值、参数路径、干净与污染误差和未删失败样本。",
  ],
  failureTrace: [
    "“第6章 鲁棒学习”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：根据模型残差手工删除样本后只在清洗数据上评估，隐藏真实失败率",
    "沿“残差 → 鲁棒损失 → 样本影响 → 受约束更新 → 污染对照”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“污染机制、损失阈值、约束、优化器和干净/污染测试集同时固定”恢复才接受修正",
  ],
  invariant: "污染机制、损失阈值、约束、优化器和干净/污染测试集同时固定",
  fault: "根据模型残差手工删除样本后只在清洗数据上评估，隐藏真实失败率",
  artifact:
    "污染种子、残差、损失曲线、影响权重、阈值、参数路径、干净与污染误差和未删失败样本。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第6章 鲁棒学习”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第6章 鲁棒学习”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第6章 鲁棒学习”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第6章 鲁棒学习”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml06RobustLearningModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml06RobustLearningFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml06RobustLearningValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
