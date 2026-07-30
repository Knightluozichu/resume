"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-16",
  title: "第16章 半监督学习",
  question:
    "怎样证明无标签样本提供的是输入空间几何，而不是把测试信息泄漏给标签预测？",
  concepts: [
    "第16章 半监督学习",
    "16.1 灵活应用输入数据的流形构造",
    "16.2 拉普拉斯正则化最小二乘学习的求解方法",
    "16.3 拉普拉斯正则化的解释",
  ],
  stages: [
    {
      name: "有/无标签数据",
      input: "第16章 半监督学习：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“有/无标签集合、图构造、核、正则强度、求解和外部测试固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“把测试样本纳入流形图和选参后再报告测试提升”就保留失败运行",
    },
    {
      name: "邻接流形",
      input: "第16章 半监督学习：上一步输入与候选函数族",
      transform:
        "执行“第16章 半监督学习”的表示或模型变换，并守住“有/无标签集合、图构造、核、正则强度、求解和外部测试固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“把测试样本纳入流形图和选参后再报告测试提升”就保留失败运行",
    },
    {
      name: "拉普拉斯正则",
      input: "第16章 半监督学习：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“有/无标签集合、图构造、核、正则强度、求解和外部测试固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“把测试样本纳入流形图和选参后再报告测试提升”就保留失败运行",
    },
    {
      name: "联合求解",
      input: "第16章 半监督学习：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“有/无标签集合、图构造、核、正则强度、求解和外部测试固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“把测试样本纳入流形图和选参后再报告测试提升”就保留失败运行",
    },
    {
      name: "外部测试",
      input: "第16章 半监督学习：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“有/无标签集合、图构造、核、正则强度、求解和外部测试固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“把测试样本纳入流形图和选参后再报告测试提升”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "用少量标签和大量无标签双月数据建立图，比较监督基线与流形正则。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“有/无标签数据 → 邻接流形 → 拉普拉斯正则 → 联合求解 → 外部测试”形成预注册输出。",
      target: "满足“有/无标签集合、图构造、核、正则强度、求解和外部测试固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "用少量标签和大量无标签双月数据建立图，比较监督基线与流形正则。 其余条件不变，只注入“把测试样本纳入流形图和选参后再报告测试提升”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第16章 半监督学习”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行有/无标签数据、邻接流形，保存输入、表示与模型状态",
    "推进拉普拉斯正则、联合求解，记录目标、约束、参数和选择轨迹",
    "在外部测试交付数据角色、邻接规则、图拉普拉斯、核、监督/几何正则、线性系统、预测、基线和外部测试。",
  ],
  failureTrace: [
    "“第16章 半监督学习”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：把测试样本纳入流形图和选参后再报告测试提升",
    "沿“有/无标签数据 → 邻接流形 → 拉普拉斯正则 → 联合求解 → 外部测试”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“有/无标签集合、图构造、核、正则强度、求解和外部测试固定”恢复才接受修正",
  ],
  invariant: "有/无标签集合、图构造、核、正则强度、求解和外部测试固定",
  fault: "把测试样本纳入流形图和选参后再报告测试提升",
  artifact:
    "数据角色、邻接规则、图拉普拉斯、核、监督/几何正则、线性系统、预测、基线和外部测试。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第16章 半监督学习”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第16章 半监督学习”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第16章 半监督学习”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第16章 半监督学习”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml16SemiSupervisedLearningModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml16SemiSupervisedLearningFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml16SemiSupervisedLearningValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
