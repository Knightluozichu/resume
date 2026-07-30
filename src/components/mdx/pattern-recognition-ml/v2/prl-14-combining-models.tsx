"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-14",
  title: "第14章 模型组合 Combining Models",
  question: "怎样区分模型不确定性平均、重采样委员会、加法提升和输入条件门控？",
  concepts: [
    "14 Combining Models",
    "14.1 Bayesian Model Averaging",
    "14.2 Committees",
    "14.3 Boosting",
    "14.3.1 Minimizing exponential error",
    "14.3.2 Error functions for boosting",
    "14.4 Tree-based Models",
    "14.5 Conditional Mixture Models",
    "14.5.1 Mixtures of linear regression models",
    "14.5.2 Mixtures of logistic models",
    "14.5.3 Mixtures of experts",
  ],
  stages: [
    {
      name: "定义候选模型",
      prior:
        "第14章 模型组合 Combining Models：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“基学习器、采样、权重/门控、损失、随机种子、数据切分和组合协议固定”",
      posterior: "定义候选模型产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“依据测试表现挑选成员和组合权重，或把相关模型当作独立证据”时停止",
    },
    {
      name: "生成成员",
      prior:
        "第14章 模型组合 Combining Models：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“基学习器、采样、权重/门控、损失、随机种子、数据切分和组合协议固定”",
      posterior: "生成成员产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“依据测试表现挑选成员和组合权重，或把相关模型当作独立证据”时停止",
    },
    {
      name: "估计权重或门控",
      prior:
        "第14章 模型组合 Combining Models：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“基学习器、采样、权重/门控、损失、随机种子、数据切分和组合协议固定”",
      posterior: "估计权重或门控产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“依据测试表现挑选成员和组合权重，或把相关模型当作独立证据”时停止",
    },
    {
      name: "组合预测",
      prior:
        "第14章 模型组合 Combining Models：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“基学习器、采样、权重/门控、损失、随机种子、数据切分和组合协议固定”",
      posterior: "组合预测产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“依据测试表现挑选成员和组合权重，或把相关模型当作独立证据”时停止",
    },
    {
      name: "检查多样性",
      prior:
        "第14章 模型组合 Combining Models：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“基学习器、采样、权重/门控、损失、随机种子、数据切分和组合协议固定”",
      posterior: "检查多样性产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“依据测试表现挑选成员和组合权重，或把相关模型当作独立证据”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对同一预测任务比较模型平均、bagging、boosting、树和专家混合。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“定义候选模型 → 生成成员 → 估计权重或门控 → 组合预测 → 检查多样性”得到可复核概率结论。",
      boundary:
        "全过程必须满足“基学习器、采样、权重/门控、损失、随机种子、数据切分和组合协议固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对同一预测任务比较模型平均、bagging、boosting、树和专家混合。 其余条件不变，只注入“依据测试表现挑选成员和组合权重，或把相关模型当作独立证据”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第14章 模型组合 Combining Models”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行定义候选模型、生成成员，保存支持集、假设、分布或图结构",
    "推进估计权重或门控、组合预测，记录推断目标、更新、残差与预测不确定性",
    "在检查多样性交付候选模型、训练索引、种子、成员预测、后验/投票权重、门控概率、逐轮损失、相关性和校准。",
  ],
  faultTrace: [
    "“第14章 模型组合 Combining Models”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：依据测试表现挑选成员和组合权重，或把相关模型当作独立证据",
    "沿“定义候选模型 → 生成成员 → 估计权重或门控 → 组合预测 → 检查多样性”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“基学习器、采样、权重/门控、损失、随机种子、数据切分和组合协议固定”恢复才接受修正",
  ],
  invariant:
    "基学习器、采样、权重/门控、损失、随机种子、数据切分和组合协议固定",
  fault: "依据测试表现挑选成员和组合权重，或把相关模型当作独立证据",
  artifact:
    "候选模型、训练索引、种子、成员预测、后验/投票权重、门控概率、逐轮损失、相关性和校准。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第14章 模型组合 Combining Models”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第14章 模型组合 Combining Models”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第14章 模型组合 Combining Models”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第14章 模型组合 Combining Models”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl14CombiningModelsProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl14CombiningModelsInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl14CombiningModelsPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
