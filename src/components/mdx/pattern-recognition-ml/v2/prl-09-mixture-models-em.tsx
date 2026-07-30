"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-09",
  title: "第9章 混合模型与EM Mixture Models and EM",
  question:
    "怎样把隐变量责任度、Q函数和参数更新连接到似然下界，并识别局部最优与退化协方差？",
  concepts: [
    "9 Mixture Models and EM",
    "9.1 K-means Clustering",
    "9.1.1 Image segmentation and compression",
    "9.2 Mixtures of Gaussians",
    "9.2.1 Maximum likelihood",
    "9.2.2 EM for Gaussian mixtures",
    "9.3 An Alternative View of EM",
    "9.3.1 Gaussian mixtures revisited",
    "9.3.2 Relation to K-means",
    "9.3.3 Mixtures of Bernoulli distributions",
    "9.3.4 EM for Bayesian linear regression",
    "9.4 The EM Algorithm in General",
  ],
  stages: [
    {
      name: "初始化分量",
      prior:
        "第9章 混合模型与EM Mixture Models and EM：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“分量数、初始化、协方差约束、E/M步定义、停止规则、数据和随机种子固定”",
      posterior: "初始化分量产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“只保留最好的一次初始化，或似然下降/协方差塌缩仍宣称EM收敛”时停止",
    },
    {
      name: "计算责任度",
      prior:
        "第9章 混合模型与EM Mixture Models and EM：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“分量数、初始化、协方差约束、E/M步定义、停止规则、数据和随机种子固定”",
      posterior: "计算责任度产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“只保留最好的一次初始化，或似然下降/协方差塌缩仍宣称EM收敛”时停止",
    },
    {
      name: "形成Q函数",
      prior:
        "第9章 混合模型与EM Mixture Models and EM：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“分量数、初始化、协方差约束、E/M步定义、停止规则、数据和随机种子固定”",
      posterior: "形成Q函数产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“只保留最好的一次初始化，或似然下降/协方差塌缩仍宣称EM收敛”时停止",
    },
    {
      name: "更新参数",
      prior:
        "第9章 混合模型与EM Mixture Models and EM：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“分量数、初始化、协方差约束、E/M步定义、停止规则、数据和随机种子固定”",
      posterior: "更新参数产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“只保留最好的一次初始化，或似然下降/协方差塌缩仍宣称EM收敛”时停止",
    },
    {
      name: "检查下界",
      prior:
        "第9章 混合模型与EM Mixture Models and EM：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“分量数、初始化、协方差约束、E/M步定义、停止规则、数据和随机种子固定”",
      posterior: "检查下界产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“只保留最好的一次初始化，或似然下降/协方差塌缩仍宣称EM收敛”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "在二维多峰数据上比较k均值硬指派与高斯混合软责任度。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“初始化分量 → 计算责任度 → 形成Q函数 → 更新参数 → 检查下界”得到可复核概率结论。",
      boundary:
        "全过程必须满足“分量数、初始化、协方差约束、E/M步定义、停止规则、数据和随机种子固定”。",
    },
    {
      name: "边界反例",
      observation:
        "在二维多峰数据上比较k均值硬指派与高斯混合软责任度。 其余条件不变，只注入“只保留最好的一次初始化，或似然下降/协方差塌缩仍宣称EM收敛”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第9章 混合模型与EM Mixture Models and EM”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行初始化分量、计算责任度，保存支持集、假设、分布或图结构",
    "推进形成Q函数、更新参数，记录推断目标、更新、残差与预测不确定性",
    "在检查下界交付分量与初值、责任度矩阵、Q函数、混合权重、均值/协方差、似然下界、多初值轨迹和退化反例。",
  ],
  faultTrace: [
    "“第9章 混合模型与EM Mixture Models and EM”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：只保留最好的一次初始化，或似然下降/协方差塌缩仍宣称EM收敛",
    "沿“初始化分量 → 计算责任度 → 形成Q函数 → 更新参数 → 检查下界”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“分量数、初始化、协方差约束、E/M步定义、停止规则、数据和随机种子固定”恢复才接受修正",
  ],
  invariant:
    "分量数、初始化、协方差约束、E/M步定义、停止规则、数据和随机种子固定",
  fault: "只保留最好的一次初始化，或似然下降/协方差塌缩仍宣称EM收敛",
  artifact:
    "分量与初值、责任度矩阵、Q函数、混合权重、均值/协方差、似然下界、多初值轨迹和退化反例。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第9章 混合模型与EM Mixture Models and EM”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第9章 混合模型与EM Mixture Models and EM”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第9章 混合模型与EM Mixture Models and EM”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第9章 混合模型与EM Mixture Models and EM”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl09MixtureModelsEmProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl09MixtureModelsEmInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl09MixtureModelsEmPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
