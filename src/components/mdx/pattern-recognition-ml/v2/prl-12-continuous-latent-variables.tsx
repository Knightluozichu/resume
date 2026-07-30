"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-12",
  title: "第12章 连续潜变量 Continuous Latent Variables",
  question:
    "怎样区分几何降维、潜变量生成模型和非线性表示，并让投影与生成假设接受不同检验？",
  concepts: [
    "12 Continuous Latent Variables",
    "12.1 Principal Component Analysis",
    "12.1.1 Maximum variance formulation",
    "12.1.2 Minimum-error formulation",
    "12.1.3 Applications of PCA",
    "12.1.4 PCA for high-dimensional data",
    "12.2 Probabilistic PCA",
    "12.2.1 Maximum likelihood PCA",
    "12.2.2 EM algorithm for PCA",
    "12.2.3 Bayesian PCA",
    "12.2.4 Factor analysis",
    "12.3 Kernel PCA",
    "12.4 Nonlinear Latent Variable Models",
    "12.4.1 Independent component analysis",
    "12.4.2 Autoassociative neural networks",
    "12.4.3 Modelling nonlinear manifolds",
  ],
  stages: [
    {
      name: "中心化观测",
      prior:
        "第12章 连续潜变量 Continuous Latent Variables：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“样本方向、中心化、尺度、潜维数、噪声模型、拟合索引和重构指标固定”",
      posterior: "中心化观测产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“在全量含测试样本的数据上拟合表示，或用二维图形主观选择潜维数”时停止",
    },
    {
      name: "声明潜变量",
      prior:
        "第12章 连续潜变量 Continuous Latent Variables：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“样本方向、中心化、尺度、潜维数、噪声模型、拟合索引和重构指标固定”",
      posterior: "声明潜变量产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“在全量含测试样本的数据上拟合表示，或用二维图形主观选择潜维数”时停止",
    },
    {
      name: "估计子空间",
      prior:
        "第12章 连续潜变量 Continuous Latent Variables：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“样本方向、中心化、尺度、潜维数、噪声模型、拟合索引和重构指标固定”",
      posterior: "估计子空间产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“在全量含测试样本的数据上拟合表示，或用二维图形主观选择潜维数”时停止",
    },
    {
      name: "投影或生成",
      prior:
        "第12章 连续潜变量 Continuous Latent Variables：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“样本方向、中心化、尺度、潜维数、噪声模型、拟合索引和重构指标固定”",
      posterior: "投影或生成产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“在全量含测试样本的数据上拟合表示，或用二维图形主观选择潜维数”时停止",
    },
    {
      name: "检验重构",
      prior:
        "第12章 连续潜变量 Continuous Latent Variables：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“样本方向、中心化、尺度、潜维数、噪声模型、拟合索引和重构指标固定”",
      posterior: "检验重构产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“在全量含测试样本的数据上拟合表示，或用二维图形主观选择潜维数”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对相关高维样本比较PCA、PPCA、因子分析、核PCA和非线性表示。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“中心化观测 → 声明潜变量 → 估计子空间 → 投影或生成 → 检验重构”得到可复核概率结论。",
      boundary:
        "全过程必须满足“样本方向、中心化、尺度、潜维数、噪声模型、拟合索引和重构指标固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对相关高维样本比较PCA、PPCA、因子分析、核PCA和非线性表示。 其余条件不变，只注入“在全量含测试样本的数据上拟合表示，或用二维图形主观选择潜维数”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第12章 连续潜变量 Continuous Latent Variables”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行中心化观测、声明潜变量，保存支持集、假设、分布或图结构",
    "推进估计子空间、投影或生成，记录推断目标、更新、残差与预测不确定性",
    "在检验重构交付拟合索引、均值/尺度、协方差、载荷、潜变量、噪声、特征谱、投影、重构、似然与稳定性。",
  ],
  faultTrace: [
    "“第12章 连续潜变量 Continuous Latent Variables”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：在全量含测试样本的数据上拟合表示，或用二维图形主观选择潜维数",
    "沿“中心化观测 → 声明潜变量 → 估计子空间 → 投影或生成 → 检验重构”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“样本方向、中心化、尺度、潜维数、噪声模型、拟合索引和重构指标固定”恢复才接受修正",
  ],
  invariant: "样本方向、中心化、尺度、潜维数、噪声模型、拟合索引和重构指标固定",
  fault: "在全量含测试样本的数据上拟合表示，或用二维图形主观选择潜维数",
  artifact:
    "拟合索引、均值/尺度、协方差、载荷、潜变量、噪声、特征谱、投影、重构、似然与稳定性。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第12章 连续潜变量 Continuous Latent Variables”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第12章 连续潜变量 Continuous Latent Variables”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第12章 连续潜变量 Continuous Latent Variables”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第12章 连续潜变量 Continuous Latent Variables”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl12ContinuousLatentVariablesProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl12ContinuousLatentVariablesInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl12ContinuousLatentVariablesPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
