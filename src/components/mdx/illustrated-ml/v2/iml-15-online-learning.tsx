"use client";

import {
  StatisticalLearningEvidenceLab,
  type StatisticalLearningEvidenceModel,
} from "./statistical-learning-evidence-lab";

const model = {
  unitId: "iml-15",
  title: "第15章 在线学习",
  question:
    "怎样让每个样本到达后只更新一次，并用累计错误、间隔和不确定性解释在线行为？",
  concepts: [
    "第V部分 新兴机器学习算法",
    "第15章 在线学习",
    "15.1 被动攻击学习",
    "15.2 适应正则化学习",
  ],
  stages: [
    {
      name: "样本到达",
      input: "第15章 在线学习：冻结的问题、样本与数据角色",
      transform:
        "登记单位、切分、分布和形状，并守住“样本顺序、初值、更新规则、间隔、不确定性和预quential评估固定”",
      output: "可追溯样本",
      evidence:
        "数据卡、索引与哈希；若出现“训练后回看同一流并报告批量准确率，丢失在线决策时点”就保留失败运行",
    },
    {
      name: "更新前预测",
      input: "第15章 在线学习：上一步输入与候选函数族",
      transform:
        "执行“第15章 在线学习”的表示或模型变换，并守住“样本顺序、初值、更新规则、间隔、不确定性和预quential评估固定”",
      output: "预测、表示或相似度",
      evidence:
        "参数、核、图或中间量；若出现“训练后回看同一流并报告批量准确率，丢失在线决策时点”就保留失败运行",
    },
    {
      name: "间隔/置信度",
      input: "第15章 在线学习：模型输出、标签或结构",
      transform:
        "计算风险、约束或概率目标，并守住“样本顺序、初值、更新规则、间隔、不确定性和预quential评估固定”",
      output: "目标值与可行状态",
      evidence:
        "损失分解、约束残差与对照；若出现“训练后回看同一流并报告批量准确率，丢失在线决策时点”就保留失败运行",
    },
    {
      name: "参数更新",
      input: "第15章 在线学习：目标、参数与候选超参数",
      transform:
        "只改变预注册变量并求解，并守住“样本顺序、初值、更新规则、间隔、不确定性和预quential评估固定”",
      output: "拟合参数或结构",
      evidence:
        "迭代、数值容差与选择轨迹；若出现“训练后回看同一流并报告批量准确率，丢失在线决策时点”就保留失败运行",
    },
    {
      name: "累计评估",
      input: "第15章 在线学习：冻结模型与独立样本",
      transform:
        "按预注册协议评估并保存反例，并守住“样本顺序、初值、更新规则、间隔、不确定性和预quential评估固定”",
      output: "接受、修正或拒绝",
      evidence:
        "指标、稳定性、失败样本与环境锁；若出现“训练后回看同一流并报告批量准确率，丢失在线决策时点”就保留失败运行",
    },
  ],
  cases: [
    {
      name: "基线样本",
      condition:
        "让带漂移的样本流依次进入PA与AROW，先预测再更新并记录累计错误。 使用冻结训练/验证/测试角色。",
      prediction:
        "沿“样本到达 → 更新前预测 → 间隔/置信度 → 参数更新 → 累计评估”形成预注册输出。",
      target:
        "满足“样本顺序、初值、更新规则、间隔、不确定性和预quential评估固定”。",
      contribution: "按本页目标计入经验风险，并与简单基线同口径比较。",
    },
    {
      name: "边界样本",
      condition:
        "让带漂移的样本流依次进入PA与AROW，先预测再更新并记录累计错误。 其余条件不变，只注入“训练后回看同一流并报告批量准确率，丢失在线决策时点”。",
      prediction: "第一处偏离应落在明确的模型、风险、求解或验证阶段。",
      target: "保留该样本，不在观察结果后重写切分或目标。",
      contribution: "单列失败贡献，触发修正或拒绝，而非从报告删除。",
    },
  ],
  normalTrace: [
    "为“第15章 在线学习”冻结任务、数据角色、分布假设、代码、环境和随机种子",
    "执行样本到达、更新前预测，保存输入、表示与模型状态",
    "推进间隔/置信度、参数更新，记录目标、约束、参数和选择轨迹",
    "在累计评估交付样本顺序、时间戳、更新前预测、损失、步长、协方差/置信度、参数版本、累计错误和漂移点。",
  ],
  failureTrace: [
    "“第15章 在线学习”复用相同任务、数据角色、分布、代码、环境和种子",
    "只注入单一反例：训练后回看同一流并报告批量准确率，丢失在线决策时点",
    "沿“样本到达 → 更新前预测 → 间隔/置信度 → 参数更新 → 累计评估”定位第一处假设、数值或边界偏离",
    "撤销反例并重放；仅当“样本顺序、初值、更新规则、间隔、不确定性和预quential评估固定”恢复才接受修正",
  ],
  invariant: "样本顺序、初值、更新规则、间隔、不确定性和预quential评估固定",
  fault: "训练后回看同一流并报告批量准确率，丢失在线决策时点",
  artifact:
    "样本顺序、时间戳、更新前预测、损失、步长、协方差/置信度、参数版本、累计错误和漂移点。",
  gates: [
    {
      label: "数据角色与分布",
      detail:
        "“第15章 在线学习”的训练、验证、测试、源域、目标域或无标签角色可追溯。",
    },
    {
      label: "目标与约束",
      detail: "“第15章 在线学习”的损失、正则、概率或几何目标经过数值核对。",
    },
    {
      label: "基线与选择",
      detail: "“第15章 在线学习”保留简单基线，超参数只在预注册验证层选择。",
    },
    {
      label: "复现与反例",
      detail: "“第15章 在线学习”归档环境、种子、失败样本和分布假设反例。",
    },
  ],
} as const satisfies StatisticalLearningEvidenceModel;

export function Iml15OnlineLearningModelSpaceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="model-space" />;
}

export function Iml15OnlineLearningFitTraceLab() {
  return <StatisticalLearningEvidenceLab model={model} view="fit-trace" />;
}

export function Iml15OnlineLearningValidationGateLab() {
  return (
    <StatisticalLearningEvidenceLab model={model} view="validation-gate" />
  );
}
