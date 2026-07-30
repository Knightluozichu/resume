"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-01",
  title: "第1章 引言 Introduction",
  question:
    "怎样从曲线拟合的观测噪声走到后验、预测、损失与模型选择，而不让训练误差代替不确定性？",
  concepts: [
    "1 Introduction",
    "1.1 Example: Polynomial Curve Fitting",
    "1.2 Probability Theory",
    "1.2.1 Probability densities",
    "1.2.2 Expectations and covariances",
    "1.2.3 Bayesian probabilities",
    "1.2.4 The Gaussian distribution",
    "1.2.5 Curve fitting re-visited",
    "1.2.6 Bayesian curve fitting",
    "1.3 Model Selection",
    "1.4 The Curse of Dimensionality",
    "1.5 Decision Theory",
    "1.5.1 Minimizing the misclassification rate",
    "1.5.2 Minimizing the expected loss",
    "1.5.3 The reject option",
    "1.5.4 Inference and decision",
    "1.5.5 Loss functions for regression",
    "1.6 Information Theory",
    "1.6.1 Relative entropy and mutual information",
  ],
  stages: [
    {
      name: "观测与噪声",
      prior:
        "第1章 引言 Introduction：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“数据角色、概率模型、先验/似然、损失函数、复杂度选择和独立评估同时明确”",
      posterior: "观测与噪声产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“依据测试集反复选择多项式阶数和正则强度，再把最低测试误差称为泛化证据”时停止",
    },
    {
      name: "概率规则",
      prior:
        "第1章 引言 Introduction：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“数据角色、概率模型、先验/似然、损失函数、复杂度选择和独立评估同时明确”",
      posterior: "概率规则产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“依据测试集反复选择多项式阶数和正则强度，再把最低测试误差称为泛化证据”时停止",
    },
    {
      name: "后验拟合",
      prior:
        "第1章 引言 Introduction：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“数据角色、概率模型、先验/似然、损失函数、复杂度选择和独立评估同时明确”",
      posterior: "后验拟合产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“依据测试集反复选择多项式阶数和正则强度，再把最低测试误差称为泛化证据”时停止",
    },
    {
      name: "模型比较",
      prior:
        "第1章 引言 Introduction：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“数据角色、概率模型、先验/似然、损失函数、复杂度选择和独立评估同时明确”",
      posterior: "模型比较产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“依据测试集反复选择多项式阶数和正则强度，再把最低测试误差称为泛化证据”时停止",
    },
    {
      name: "决策验收",
      prior:
        "第1章 引言 Introduction：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“数据角色、概率模型、先验/似然、损失函数、复杂度选择和独立评估同时明确”",
      posterior: "决策验收产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“依据测试集反复选择多项式阶数和正则强度，再把最低测试误差称为泛化证据”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对同一组带噪样本比较最大似然、贝叶斯曲线拟合和不同决策损失。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“观测与噪声 → 概率规则 → 后验拟合 → 模型比较 → 决策验收”得到可复核概率结论。",
      boundary:
        "全过程必须满足“数据角色、概率模型、先验/似然、损失函数、复杂度选择和独立评估同时明确”。",
    },
    {
      name: "边界反例",
      observation:
        "对同一组带噪样本比较最大似然、贝叶斯曲线拟合和不同决策损失。 其余条件不变，只注入“依据测试集反复选择多项式阶数和正则强度，再把最低测试误差称为泛化证据”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第1章 引言 Introduction”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行观测与噪声、概率规则，保存支持集、假设、分布或图结构",
    "推进后验拟合、模型比较，记录推断目标、更新、残差与预测不确定性",
    "在决策验收交付数据切分、基函数阶数、先验、似然、后验、预测区间、损失矩阵、验证轨迹与维度反例。",
  ],
  faultTrace: [
    "“第1章 引言 Introduction”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：依据测试集反复选择多项式阶数和正则强度，再把最低测试误差称为泛化证据",
    "沿“观测与噪声 → 概率规则 → 后验拟合 → 模型比较 → 决策验收”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“数据角色、概率模型、先验/似然、损失函数、复杂度选择和独立评估同时明确”恢复才接受修正",
  ],
  invariant:
    "数据角色、概率模型、先验/似然、损失函数、复杂度选择和独立评估同时明确",
  fault: "依据测试集反复选择多项式阶数和正则强度，再把最低测试误差称为泛化证据",
  artifact:
    "数据切分、基函数阶数、先验、似然、后验、预测区间、损失矩阵、验证轨迹与维度反例。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第1章 引言 Introduction”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第1章 引言 Introduction”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第1章 引言 Introduction”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第1章 引言 Introduction”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl01IntroductionProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl01IntroductionInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl01IntroductionPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
