"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-05",
  title: "第5章 神经网络 Neural Networks",
  question:
    "怎样从网络函数和误差导数追到曲率、正则与预测不确定性，而不把反向传播等同于完整训练？",
  concepts: [
    "5 Neural Networks",
    "5.1 Feed-forward Network Functions",
    "5.1.1 Weight-space symmetries",
    "5.2 Network Training",
    "5.2.1 Parameter optimization",
    "5.2.2 Local quadratic approximation",
    "5.2.3 Use of gradient information",
    "5.2.4 Gradient descent optimization",
    "5.3 Error Backpropagation",
    "5.3.1 Evaluation of error-function derivatives",
    "5.3.2 A simple example",
    "5.3.3 Efficiency of backpropagation",
    "5.3.4 The Jacobian matrix",
    "5.4 The Hessian Matrix",
    "5.4.1 Diagonal approximation",
    "5.4.2 Outer product approximation",
    "5.4.3 Inverse Hessian",
    "5.4.4 Finite differences",
    "5.4.5 Exact evaluation of the Hessian",
    "5.4.6 Fast multiplication by the Hessian",
    "5.5 Regularization in Neural Networks",
    "5.5.1 Consistent Gaussian priors",
    "5.5.2 Early stopping",
    "5.5.3 Invariances",
    "5.5.4 Tangent propagation",
    "5.5.5 Training with transformed data",
    "5.5.6 Convolutional networks",
    "5.5.7 Soft weight sharing",
    "5.6 Mixture Density Networks",
    "5.7 Bayesian Neural Networks",
    "5.7.1 Posterior parameter distribution",
    "5.7.2 Hyperparameter optimization",
    "5.7.3 Bayesian neural networks for classification",
  ],
  stages: [
    {
      name: "定义网络函数",
      prior:
        "第5章 神经网络 Neural Networks：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“网络结构、输出分布、损失、初始化、优化顺序、正则、停止规则和数据角色固定”",
      posterior: "定义网络函数产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“用测试损失早停或调结构，且只展示一次随机初始化的最好结果”时停止",
    },
    {
      name: "前向计算",
      prior:
        "第5章 神经网络 Neural Networks：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“网络结构、输出分布、损失、初始化、优化顺序、正则、停止规则和数据角色固定”",
      posterior: "前向计算产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“用测试损失早停或调结构，且只展示一次随机初始化的最好结果”时停止",
    },
    {
      name: "反向求导",
      prior:
        "第5章 神经网络 Neural Networks：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“网络结构、输出分布、损失、初始化、优化顺序、正则、停止规则和数据角色固定”",
      posterior: "反向求导产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“用测试损失早停或调结构，且只展示一次随机初始化的最好结果”时停止",
    },
    {
      name: "优化与正则",
      prior:
        "第5章 神经网络 Neural Networks：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“网络结构、输出分布、损失、初始化、优化顺序、正则、停止规则和数据角色固定”",
      posterior: "优化与正则产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“用测试损失早停或调结构，且只展示一次随机初始化的最好结果”时停止",
    },
    {
      name: "预测不确定性",
      prior:
        "第5章 神经网络 Neural Networks：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“网络结构、输出分布、损失、初始化、优化顺序、正则、停止规则和数据角色固定”",
      posterior: "预测不确定性产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“用测试损失早停或调结构，且只展示一次随机初始化的最好结果”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "在小型回归任务上手算梯度并比较点预测、混合密度和贝叶斯近似。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“定义网络函数 → 前向计算 → 反向求导 → 优化与正则 → 预测不确定性”得到可复核概率结论。",
      boundary:
        "全过程必须满足“网络结构、输出分布、损失、初始化、优化顺序、正则、停止规则和数据角色固定”。",
    },
    {
      name: "边界反例",
      observation:
        "在小型回归任务上手算梯度并比较点预测、混合密度和贝叶斯近似。 其余条件不变，只注入“用测试损失早停或调结构，且只展示一次随机初始化的最好结果”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第5章 神经网络 Neural Networks”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行定义网络函数、前向计算，保存支持集、假设、分布或图结构",
    "推进反向求导、优化与正则，记录推断目标、更新、残差与预测不确定性",
    "在预测不确定性交付计算图、激活、损失、梯度检查、Hessian近似、初始化种子、优化轨迹、正则、早停索引和预测分布。",
  ],
  faultTrace: [
    "“第5章 神经网络 Neural Networks”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：用测试损失早停或调结构，且只展示一次随机初始化的最好结果",
    "沿“定义网络函数 → 前向计算 → 反向求导 → 优化与正则 → 预测不确定性”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“网络结构、输出分布、损失、初始化、优化顺序、正则、停止规则和数据角色固定”恢复才接受修正",
  ],
  invariant:
    "网络结构、输出分布、损失、初始化、优化顺序、正则、停止规则和数据角色固定",
  fault: "用测试损失早停或调结构，且只展示一次随机初始化的最好结果",
  artifact:
    "计算图、激活、损失、梯度检查、Hessian近似、初始化种子、优化轨迹、正则、早停索引和预测分布。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第5章 神经网络 Neural Networks”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第5章 神经网络 Neural Networks”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第5章 神经网络 Neural Networks”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第5章 神经网络 Neural Networks”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl05NeuralNetworksProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl05NeuralNetworksInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl05NeuralNetworksPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
