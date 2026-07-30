"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-06",
  title: "第6章 核方法 Kernel Methods",
  question:
    "怎样从正定核得到函数空间先验和预测协方差，并用边际似然与外推反例检查超参数？",
  concepts: [
    "6 Kernel Methods",
    "6.1 Dual Representations",
    "6.2 Constructing Kernels",
    "6.3 Radial Basis Function Networks",
    "6.3.1 Nadaraya-Watson model",
    "6.4 Gaussian Processes",
    "6.4.1 Linear regression revisited",
    "6.4.2 Gaussian processes for regression",
    "6.4.3 Learning the hyperparameters",
    "6.4.4 Automatic relevance determination",
    "6.4.5 Gaussian processes for classification",
    "6.4.6 Laplace approximation",
    "6.4.7 Connection to neural networks",
  ],
  stages: [
    {
      name: "构造核矩阵",
      prior:
        "第6章 核方法 Kernel Methods：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“输入尺度、核函数、Gram矩阵、噪声、均值函数、超参数和验证协议固定”",
      posterior: "构造核矩阵产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“在测试集上选择核与长度尺度，或忽略非正定矩阵和外推方差”时停止",
    },
    {
      name: "声明函数先验",
      prior:
        "第6章 核方法 Kernel Methods：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“输入尺度、核函数、Gram矩阵、噪声、均值函数、超参数和验证协议固定”",
      posterior: "声明函数先验产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“在测试集上选择核与长度尺度，或忽略非正定矩阵和外推方差”时停止",
    },
    {
      name: "条件化观测",
      prior:
        "第6章 核方法 Kernel Methods：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“输入尺度、核函数、Gram矩阵、噪声、均值函数、超参数和验证协议固定”",
      posterior: "条件化观测产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“在测试集上选择核与长度尺度，或忽略非正定矩阵和外推方差”时停止",
    },
    {
      name: "优化超参数",
      prior:
        "第6章 核方法 Kernel Methods：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“输入尺度、核函数、Gram矩阵、噪声、均值函数、超参数和验证协议固定”",
      posterior: "优化超参数产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“在测试集上选择核与长度尺度，或忽略非正定矩阵和外推方差”时停止",
    },
    {
      name: "检验外推",
      prior:
        "第6章 核方法 Kernel Methods：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“输入尺度、核函数、Gram矩阵、噪声、均值函数、超参数和验证协议固定”",
      posterior: "检验外推产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“在测试集上选择核与长度尺度，或忽略非正定矩阵和外推方差”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对一维稀疏观测比较RBF网络与高斯过程的均值和预测方差。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“构造核矩阵 → 声明函数先验 → 条件化观测 → 优化超参数 → 检验外推”得到可复核概率结论。",
      boundary:
        "全过程必须满足“输入尺度、核函数、Gram矩阵、噪声、均值函数、超参数和验证协议固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对一维稀疏观测比较RBF网络与高斯过程的均值和预测方差。 其余条件不变，只注入“在测试集上选择核与长度尺度，或忽略非正定矩阵和外推方差”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第6章 核方法 Kernel Methods”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行构造核矩阵、声明函数先验，保存支持集、假设、分布或图结构",
    "推进条件化观测、优化超参数，记录推断目标、更新、残差与预测不确定性",
    "在检验外推交付输入尺度、核定义、Gram矩阵、抖动项、超参数、Cholesky残差、边际似然、预测均值/方差和外推图。",
  ],
  faultTrace: [
    "“第6章 核方法 Kernel Methods”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：在测试集上选择核与长度尺度，或忽略非正定矩阵和外推方差",
    "沿“构造核矩阵 → 声明函数先验 → 条件化观测 → 优化超参数 → 检验外推”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“输入尺度、核函数、Gram矩阵、噪声、均值函数、超参数和验证协议固定”恢复才接受修正",
  ],
  invariant: "输入尺度、核函数、Gram矩阵、噪声、均值函数、超参数和验证协议固定",
  fault: "在测试集上选择核与长度尺度，或忽略非正定矩阵和外推方差",
  artifact:
    "输入尺度、核定义、Gram矩阵、抖动项、超参数、Cholesky残差、边际似然、预测均值/方差和外推图。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第6章 核方法 Kernel Methods”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第6章 核方法 Kernel Methods”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第6章 核方法 Kernel Methods”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第6章 核方法 Kernel Methods”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl06KernelMethodsProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl06KernelMethodsInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl06KernelMethodsPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
