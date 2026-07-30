"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-04",
  title: "第4章 线性分类模型 Linear Models for Classification",
  question:
    "怎样比较Fisher、感知机、生成分类与逻辑回归，并用相同损失与校准条件验收？",
  concepts: [
    "4 Linear Models for Classification",
    "4.1 Discriminant Functions",
    "4.1.1 Two classes",
    "4.1.2 Multiple classes",
    "4.1.3 Least squares for classification",
    "4.1.4 Fisher's linear discriminant",
    "4.1.5 Relation to least squares",
    "4.1.6 Fisher's discriminant for multiple classes",
    "4.1.7 The perceptron algorithm",
    "4.2 Probabilistic Generative Models",
    "4.2.1 Continuous inputs",
    "4.2.2 Maximum likelihood solution",
    "4.2.3 Discrete features",
    "4.2.4 Exponential family",
    "4.3 Probabilistic Discriminative Models",
    "4.3.1 Fixed basis functions",
    "4.3.2 Logistic regression",
    "4.3.3 Iterative reweighted least squares",
    "4.3.4 Multiclass logistic regression",
    "4.3.5 Probit regression",
    "4.3.6 Canonical link functions",
    "4.4 The Laplace Approximation",
    "4.4.1 Model comparison and BIC",
    "4.5 Bayesian Logistic Regression",
    "4.5.1 Laplace approximation",
    "4.5.2 Predictive distribution",
  ],
  stages: [
    {
      name: "定义类别损失",
      prior:
        "第4章 线性分类模型 Linear Models for Classification：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“类别编码、特征变换、生成/判别假设、链接函数、损失、正则和评估角色固定”",
      posterior: "定义类别损失产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“只比较训练分类率，忽略概率校准、近似后验误差和类别不平衡”时停止",
    },
    {
      name: "构造判别分数",
      prior:
        "第4章 线性分类模型 Linear Models for Classification：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“类别编码、特征变换、生成/判别假设、链接函数、损失、正则和评估角色固定”",
      posterior: "构造判别分数产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“只比较训练分类率，忽略概率校准、近似后验误差和类别不平衡”时停止",
    },
    {
      name: "归一为概率",
      prior:
        "第4章 线性分类模型 Linear Models for Classification：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“类别编码、特征变换、生成/判别假设、链接函数、损失、正则和评估角色固定”",
      posterior: "归一为概率产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“只比较训练分类率，忽略概率校准、近似后验误差和类别不平衡”时停止",
    },
    {
      name: "近似参数后验",
      prior:
        "第4章 线性分类模型 Linear Models for Classification：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“类别编码、特征变换、生成/判别假设、链接函数、损失、正则和评估角色固定”",
      posterior: "近似参数后验产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“只比较训练分类率，忽略概率校准、近似后验误差和类别不平衡”时停止",
    },
    {
      name: "检验决策",
      prior:
        "第4章 线性分类模型 Linear Models for Classification：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“类别编码、特征变换、生成/判别假设、链接函数、损失、正则和评估角色固定”",
      posterior: "检验决策产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“只比较训练分类率，忽略概率校准、近似后验误差和类别不平衡”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "在二分类与多分类样本上比较线性判别边界和概率预测。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“定义类别损失 → 构造判别分数 → 归一为概率 → 近似参数后验 → 检验决策”得到可复核概率结论。",
      boundary:
        "全过程必须满足“类别编码、特征变换、生成/判别假设、链接函数、损失、正则和评估角色固定”。",
    },
    {
      name: "边界反例",
      observation:
        "在二分类与多分类样本上比较线性判别边界和概率预测。 其余条件不变，只注入“只比较训练分类率，忽略概率校准、近似后验误差和类别不平衡”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第4章 线性分类模型 Linear Models for Classification”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行定义类别损失、构造判别分数，保存支持集、假设、分布或图结构",
    "推进归一为概率、近似参数后验，记录推断目标、更新、残差与预测不确定性",
    "在检验决策交付类别与特征、生成假设、判别参数、链接函数、Hessian、近似后验、概率校准、损失与拒绝区。",
  ],
  faultTrace: [
    "“第4章 线性分类模型 Linear Models for Classification”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：只比较训练分类率，忽略概率校准、近似后验误差和类别不平衡",
    "沿“定义类别损失 → 构造判别分数 → 归一为概率 → 近似参数后验 → 检验决策”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“类别编码、特征变换、生成/判别假设、链接函数、损失、正则和评估角色固定”恢复才接受修正",
  ],
  invariant:
    "类别编码、特征变换、生成/判别假设、链接函数、损失、正则和评估角色固定",
  fault: "只比较训练分类率，忽略概率校准、近似后验误差和类别不平衡",
  artifact:
    "类别与特征、生成假设、判别参数、链接函数、Hessian、近似后验、概率校准、损失与拒绝区。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第4章 线性分类模型 Linear Models for Classification”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第4章 线性分类模型 Linear Models for Classification”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第4章 线性分类模型 Linear Models for Classification”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第4章 线性分类模型 Linear Models for Classification”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl04LinearClassificationProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl04LinearClassificationInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl04LinearClassificationPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
