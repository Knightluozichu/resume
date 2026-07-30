"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-11",
  title: "第11章 采样方法 Sampling Methods",
  question:
    "怎样证明样本来自目标分布而非仅能运行，并用多链、有效样本与敏感性诊断估计？",
  concepts: [
    "11 Sampling Methods",
    "11.1 Basic Sampling Algorithms",
    "11.1.1 Standard distributions",
    "11.1.2 Rejection sampling",
    "11.1.3 Adaptive rejection sampling",
    "11.1.4 Importance sampling",
    "11.1.5 Sampling-importance-resampling",
    "11.1.6 Sampling and the EM algorithm",
    "11.2 Markov Chain Monte Carlo",
    "11.2.1 Markov chains",
    "11.2.2 The Metropolis-Hastings algorithm",
    "11.3 Gibbs Sampling",
    "11.4 Slice Sampling",
    "11.5 The Hybrid Monte Carlo Algorithm",
    "11.5.1 Dynamical systems",
    "11.5.2 Hybrid Monte Carlo",
    "11.6 Estimating the Partition Function",
  ],
  stages: [
    {
      name: "定义目标密度",
      prior:
        "第11章 采样方法 Sampling Methods：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“目标密度、提议/转移、初值、预热、链长、种子、估计量和诊断阈值固定”",
      posterior: "定义目标密度产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“短链未混合就汇总，或只展示接受率而不检查自相关与多链一致性”时停止",
    },
    {
      name: "选择提议或动力学",
      prior:
        "第11章 采样方法 Sampling Methods：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“目标密度、提议/转移、初值、预热、链长、种子、估计量和诊断阈值固定”",
      posterior: "选择提议或动力学产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“短链未混合就汇总，或只展示接受率而不检查自相关与多链一致性”时停止",
    },
    {
      name: "生成样本",
      prior:
        "第11章 采样方法 Sampling Methods：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“目标密度、提议/转移、初值、预热、链长、种子、估计量和诊断阈值固定”",
      posterior: "生成样本产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“短链未混合就汇总，或只展示接受率而不检查自相关与多链一致性”时停止",
    },
    {
      name: "估计期望",
      prior:
        "第11章 采样方法 Sampling Methods：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“目标密度、提议/转移、初值、预热、链长、种子、估计量和诊断阈值固定”",
      posterior: "估计期望产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“短链未混合就汇总，或只展示接受率而不检查自相关与多链一致性”时停止",
    },
    {
      name: "诊断链",
      prior:
        "第11章 采样方法 Sampling Methods：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“目标密度、提议/转移、初值、预热、链长、种子、估计量和诊断阈值固定”",
      posterior: "诊断链产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“短链未混合就汇总，或只展示接受率而不检查自相关与多链一致性”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对单峰、多峰和相关目标分别运行重要性采样、MH、Gibbs与HMC。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“定义目标密度 → 选择提议或动力学 → 生成样本 → 估计期望 → 诊断链”得到可复核概率结论。",
      boundary:
        "全过程必须满足“目标密度、提议/转移、初值、预热、链长、种子、估计量和诊断阈值固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对单峰、多峰和相关目标分别运行重要性采样、MH、Gibbs与HMC。 其余条件不变，只注入“短链未混合就汇总，或只展示接受率而不检查自相关与多链一致性”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第11章 采样方法 Sampling Methods”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行定义目标密度、选择提议或动力学，保存支持集、假设、分布或图结构",
    "推进生成样本、估计期望，记录推断目标、更新、残差与预测不确定性",
    "在诊断链交付目标与归一未知项、提议、接受比、链初值、预热、样本轨迹、R-hat、有效样本、自相关和多峰反例。",
  ],
  faultTrace: [
    "“第11章 采样方法 Sampling Methods”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：短链未混合就汇总，或只展示接受率而不检查自相关与多链一致性",
    "沿“定义目标密度 → 选择提议或动力学 → 生成样本 → 估计期望 → 诊断链”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“目标密度、提议/转移、初值、预热、链长、种子、估计量和诊断阈值固定”恢复才接受修正",
  ],
  invariant:
    "目标密度、提议/转移、初值、预热、链长、种子、估计量和诊断阈值固定",
  fault: "短链未混合就汇总，或只展示接受率而不检查自相关与多链一致性",
  artifact:
    "目标与归一未知项、提议、接受比、链初值、预热、样本轨迹、R-hat、有效样本、自相关和多峰反例。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第11章 采样方法 Sampling Methods”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第11章 采样方法 Sampling Methods”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第11章 采样方法 Sampling Methods”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第11章 采样方法 Sampling Methods”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl11SamplingMethodsProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl11SamplingMethodsInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl11SamplingMethodsPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
