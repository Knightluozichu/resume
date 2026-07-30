"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-02",
  title: "第2章 概率分布 Probability Distributions",
  question:
    "怎样让离散计数、高斯条件化、指数族充分统计量和核密度共享一致的归一与预测检查？",
  concepts: [
    "2 Probability Distributions",
    "2.1 Binary Variables",
    "2.1.1 The beta distribution",
    "2.2 Multinomial Variables",
    "2.2.1 The Dirichlet distribution",
    "2.3 The Gaussian Distribution",
    "2.3.1 Conditional Gaussian distributions",
    "2.3.2 Marginal Gaussian distributions",
    "2.3.3 Bayes' theorem for Gaussian variables",
    "2.3.4 Maximum likelihood for the Gaussian",
    "2.3.5 Sequential estimation",
    "2.3.6 Bayesian inference for the Gaussian",
    "2.3.7 Student's t-distribution",
    "2.3.8 Periodic variables",
    "2.3.9 Mixtures of Gaussians",
    "2.4 The Exponential Family",
    "2.4.1 Maximum likelihood and sufficient statistics",
    "2.4.2 Conjugate priors",
    "2.4.3 Noninformative priors",
    "2.5 Nonparametric Methods",
    "2.5.1 Kernel density estimators",
    "2.5.2 Nearest-neighbour methods",
  ],
  stages: [
    {
      name: "定义支持集",
      prior:
        "第2章 概率分布 Probability Distributions：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“支持集、测度、参数化、归一常数、先验、充分统计量与预测对象固定”",
      posterior: "定义支持集产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“混淆概率质量与密度，或在测试观测上选择带宽和平滑强度”时停止",
    },
    {
      name: "建立分布",
      prior:
        "第2章 概率分布 Probability Distributions：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“支持集、测度、参数化、归一常数、先验、充分统计量与预测对象固定”",
      posterior: "建立分布产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“混淆概率质量与密度，或在测试观测上选择带宽和平滑强度”时停止",
    },
    {
      name: "条件与边缘",
      prior:
        "第2章 概率分布 Probability Distributions：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“支持集、测度、参数化、归一常数、先验、充分统计量与预测对象固定”",
      posterior: "条件与边缘产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“混淆概率质量与密度，或在测试观测上选择带宽和平滑强度”时停止",
    },
    {
      name: "更新参数",
      prior:
        "第2章 概率分布 Probability Distributions：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“支持集、测度、参数化、归一常数、先验、充分统计量与预测对象固定”",
      posterior: "更新参数产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“混淆概率质量与密度，或在测试观测上选择带宽和平滑强度”时停止",
    },
    {
      name: "检查归一",
      prior:
        "第2章 概率分布 Probability Distributions：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“支持集、测度、参数化、归一常数、先验、充分统计量与预测对象固定”",
      posterior: "检查归一产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“混淆概率质量与密度，或在测试观测上选择带宽和平滑强度”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对离散计数、相关高斯和多峰样本分别建立参数与非参数分布。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“定义支持集 → 建立分布 → 条件与边缘 → 更新参数 → 检查归一”得到可复核概率结论。",
      boundary:
        "全过程必须满足“支持集、测度、参数化、归一常数、先验、充分统计量与预测对象固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对离散计数、相关高斯和多峰样本分别建立参数与非参数分布。 其余条件不变，只注入“混淆概率质量与密度，或在测试观测上选择带宽和平滑强度”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第2章 概率分布 Probability Distributions”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行定义支持集、建立分布，保存支持集、假设、分布或图结构",
    "推进条件与边缘、更新参数，记录推断目标、更新、残差与预测不确定性",
    "在检查归一交付变量域、计数、参数、归一常数、充分统计量、共轭更新、密度积分、带宽和预测检查。",
  ],
  faultTrace: [
    "“第2章 概率分布 Probability Distributions”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：混淆概率质量与密度，或在测试观测上选择带宽和平滑强度",
    "沿“定义支持集 → 建立分布 → 条件与边缘 → 更新参数 → 检查归一”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“支持集、测度、参数化、归一常数、先验、充分统计量与预测对象固定”恢复才接受修正",
  ],
  invariant: "支持集、测度、参数化、归一常数、先验、充分统计量与预测对象固定",
  fault: "混淆概率质量与密度，或在测试观测上选择带宽和平滑强度",
  artifact:
    "变量域、计数、参数、归一常数、充分统计量、共轭更新、密度积分、带宽和预测检查。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第2章 概率分布 Probability Distributions”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第2章 概率分布 Probability Distributions”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第2章 概率分布 Probability Distributions”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第2章 概率分布 Probability Distributions”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl02ProbabilityDistributionsProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl02ProbabilityDistributionsInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl02ProbabilityDistributionsPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
