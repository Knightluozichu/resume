"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-03",
  title: "第3章 线性回归模型 Linear Models for Regression",
  question:
    "怎样连接最小二乘、参数后验、预测分布和模型证据，并区分参数不确定性与观测噪声？",
  concepts: [
    "3 Linear Models for Regression",
    "3.1 Linear Basis Function Models",
    "3.1.1 Maximum likelihood and least squares",
    "3.1.2 Geometry of least squares",
    "3.1.3 Sequential learning",
    "3.1.4 Regularized least squares",
    "3.1.5 Multiple outputs",
    "3.2 The Bias-Variance Decomposition",
    "3.3 Bayesian Linear Regression",
    "3.3.1 Parameter distribution",
    "3.3.2 Predictive distribution",
    "3.3.3 Equivalent kernel",
    "3.4 Bayesian Model Comparison",
    "3.5 The Evidence Approximation",
    "3.5.1 Evaluation of the evidence function",
    "3.5.2 Maximizing the evidence function",
    "3.5.3 Effective number of parameters",
    "3.6 Limitations of Fixed Basis Functions",
  ],
  stages: [
    {
      name: "构建设计矩阵",
      prior:
        "第3章 线性回归模型 Linear Models for Regression：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“基函数、噪声模型、先验、正则、设计矩阵、数据角色和证据近似固定”",
      posterior: "构建设计矩阵产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“在测试集上选择基函数与正则，或把点预测误差当作完整后验预测”时停止",
    },
    {
      name: "指定噪声先验",
      prior:
        "第3章 线性回归模型 Linear Models for Regression：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“基函数、噪声模型、先验、正则、设计矩阵、数据角色和证据近似固定”",
      posterior: "指定噪声先验产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“在测试集上选择基函数与正则，或把点预测误差当作完整后验预测”时停止",
    },
    {
      name: "求参数后验",
      prior:
        "第3章 线性回归模型 Linear Models for Regression：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“基函数、噪声模型、先验、正则、设计矩阵、数据角色和证据近似固定”",
      posterior: "求参数后验产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“在测试集上选择基函数与正则，或把点预测误差当作完整后验预测”时停止",
    },
    {
      name: "形成预测分布",
      prior:
        "第3章 线性回归模型 Linear Models for Regression：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“基函数、噪声模型、先验、正则、设计矩阵、数据角色和证据近似固定”",
      posterior: "形成预测分布产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“在测试集上选择基函数与正则，或把点预测误差当作完整后验预测”时停止",
    },
    {
      name: "比较模型证据",
      prior:
        "第3章 线性回归模型 Linear Models for Regression：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“基函数、噪声模型、先验、正则、设计矩阵、数据角色和证据近似固定”",
      posterior: "比较模型证据产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“在测试集上选择基函数与正则，或把点预测误差当作完整后验预测”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "用同一非线性样本比较固定基函数最大似然与贝叶斯线性回归。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“构建设计矩阵 → 指定噪声先验 → 求参数后验 → 形成预测分布 → 比较模型证据”得到可复核概率结论。",
      boundary:
        "全过程必须满足“基函数、噪声模型、先验、正则、设计矩阵、数据角色和证据近似固定”。",
    },
    {
      name: "边界反例",
      observation:
        "用同一非线性样本比较固定基函数最大似然与贝叶斯线性回归。 其余条件不变，只注入“在测试集上选择基函数与正则，或把点预测误差当作完整后验预测”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第3章 线性回归模型 Linear Models for Regression”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行构建设计矩阵、指定噪声先验，保存支持集、假设、分布或图结构",
    "推进求参数后验、形成预测分布，记录推断目标、更新、残差与预测不确定性",
    "在比较模型证据交付设计矩阵、先验精度、噪声精度、参数后验、预测均值/方差、证据曲线、残差与基函数反例。",
  ],
  faultTrace: [
    "“第3章 线性回归模型 Linear Models for Regression”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：在测试集上选择基函数与正则，或把点预测误差当作完整后验预测",
    "沿“构建设计矩阵 → 指定噪声先验 → 求参数后验 → 形成预测分布 → 比较模型证据”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“基函数、噪声模型、先验、正则、设计矩阵、数据角色和证据近似固定”恢复才接受修正",
  ],
  invariant: "基函数、噪声模型、先验、正则、设计矩阵、数据角色和证据近似固定",
  fault: "在测试集上选择基函数与正则，或把点预测误差当作完整后验预测",
  artifact:
    "设计矩阵、先验精度、噪声精度、参数后验、预测均值/方差、证据曲线、残差与基函数反例。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第3章 线性回归模型 Linear Models for Regression”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第3章 线性回归模型 Linear Models for Regression”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第3章 线性回归模型 Linear Models for Regression”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第3章 线性回归模型 Linear Models for Regression”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl03LinearRegressionProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl03LinearRegressionInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl03LinearRegressionPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
