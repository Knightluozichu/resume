"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-10",
  title: "第10章 近似推断 Approximate Inference",
  question:
    "怎样说明近似族、目标下界和坐标更新，并量化因子化或矩匹配造成的偏差？",
  concepts: [
    "10 Approximate Inference",
    "10.1 Variational Inference",
    "10.1.1 Factorized distributions",
    "10.1.2 Properties of factorized approximations",
    "10.1.3 Example: The univariate Gaussian",
    "10.1.4 Model comparison",
    "10.2 Illustration: Variational Mixture of Gaussians",
    "10.2.1 Variational distribution",
    "10.2.2 Variational lower bound",
    "10.2.3 Predictive density",
    "10.2.4 Determining the number of components",
    "10.2.5 Induced factorizations",
    "10.3 Variational Linear Regression",
    "10.3.1 Variational distribution",
    "10.3.2 Predictive distribution",
    "10.3.3 Lower bound",
    "10.4 Exponential Family Distributions",
    "10.4.1 Variational message passing",
    "10.5 Local Variational Methods",
    "10.6 Variational Logistic Regression",
    "10.6.1 Variational posterior distribution",
    "10.6.2 Optimizing the variational parameters",
    "10.6.3 Inference of hyperparameters",
    "10.7 Expectation Propagation",
    "10.7.1 Example: The clutter problem",
    "10.7.2 Expectation propagation on graphs",
  ],
  stages: [
    {
      name: "选择近似族",
      prior:
        "第10章 近似推断 Approximate Inference：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“目标后验、近似族、因子化、下界、更新顺序、初始化和收敛诊断固定”",
      posterior: "选择近似族产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“只报告近似后验均值，不记录ELBO、近似族限制或多初值敏感性”时停止",
    },
    {
      name: "构造变分目标",
      prior:
        "第10章 近似推断 Approximate Inference：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“目标后验、近似族、因子化、下界、更新顺序、初始化和收敛诊断固定”",
      posterior: "构造变分目标产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“只报告近似后验均值，不记录ELBO、近似族限制或多初值敏感性”时停止",
    },
    {
      name: "更新局部因子",
      prior:
        "第10章 近似推断 Approximate Inference：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“目标后验、近似族、因子化、下界、更新顺序、初始化和收敛诊断固定”",
      posterior: "更新局部因子产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“只报告近似后验均值，不记录ELBO、近似族限制或多初值敏感性”时停止",
    },
    {
      name: "传播近似消息",
      prior:
        "第10章 近似推断 Approximate Inference：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“目标后验、近似族、因子化、下界、更新顺序、初始化和收敛诊断固定”",
      posterior: "传播近似消息产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“只报告近似后验均值，不记录ELBO、近似族限制或多初值敏感性”时停止",
    },
    {
      name: "诊断近似误差",
      prior:
        "第10章 近似推断 Approximate Inference：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“目标后验、近似族、因子化、下界、更新顺序、初始化和收敛诊断固定”",
      posterior: "诊断近似误差产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“只报告近似后验均值，不记录ELBO、近似族限制或多初值敏感性”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对相关高斯和混合模型比较平均场变分、局部界与期望传播。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“选择近似族 → 构造变分目标 → 更新局部因子 → 传播近似消息 → 诊断近似误差”得到可复核概率结论。",
      boundary:
        "全过程必须满足“目标后验、近似族、因子化、下界、更新顺序、初始化和收敛诊断固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对相关高斯和混合模型比较平均场变分、局部界与期望传播。 其余条件不变，只注入“只报告近似后验均值，不记录ELBO、近似族限制或多初值敏感性”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第10章 近似推断 Approximate Inference”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行选择近似族、构造变分目标，保存支持集、假设、分布或图结构",
    "推进更新局部因子、传播近似消息，记录推断目标、更新、残差与预测不确定性",
    "在诊断近似误差交付目标密度、近似因子、自然参数、ELBO分解、坐标更新、消息、矩匹配、收敛残差和相关性反例。",
  ],
  faultTrace: [
    "“第10章 近似推断 Approximate Inference”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：只报告近似后验均值，不记录ELBO、近似族限制或多初值敏感性",
    "沿“选择近似族 → 构造变分目标 → 更新局部因子 → 传播近似消息 → 诊断近似误差”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“目标后验、近似族、因子化、下界、更新顺序、初始化和收敛诊断固定”恢复才接受修正",
  ],
  invariant: "目标后验、近似族、因子化、下界、更新顺序、初始化和收敛诊断固定",
  fault: "只报告近似后验均值，不记录ELBO、近似族限制或多初值敏感性",
  artifact:
    "目标密度、近似因子、自然参数、ELBO分解、坐标更新、消息、矩匹配、收敛残差和相关性反例。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第10章 近似推断 Approximate Inference”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第10章 近似推断 Approximate Inference”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第10章 近似推断 Approximate Inference”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第10章 近似推断 Approximate Inference”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl10ApproximateInferenceProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl10ApproximateInferenceInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl10ApproximateInferencePredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
