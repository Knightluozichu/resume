"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-07",
  title: "第7章 稀疏核机 Sparse Kernel Machines",
  question:
    "怎样比较SVM的间隔稀疏性与RVM的后验稀疏性，并分别核对优化约束和概率预测？",
  concepts: [
    "7 Sparse Kernel Machines",
    "7.1 Maximum Margin Classifiers",
    "7.1.1 Overlapping class distributions",
    "7.1.2 Relation to logistic regression",
    "7.1.3 Multiclass SVMs",
    "7.1.4 SVMs for regression",
    "7.1.5 Computational learning theory",
    "7.2 Relevance Vector Machines",
    "7.2.1 RVM for regression",
    "7.2.2 Analysis of sparsity",
    "7.2.3 RVM for classification",
  ],
  stages: [
    {
      name: "建立核表示",
      prior:
        "第7章 稀疏核机 Sparse Kernel Machines：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“尺度、核、惩罚、标签、对偶约束、停止容差、先验和校准协议固定”",
      posterior: "建立核表示产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“依据测试结果调核参数，或把SVM分数直接解释为后验概率”时停止",
    },
    {
      name: "求最大间隔",
      prior:
        "第7章 稀疏核机 Sparse Kernel Machines：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“尺度、核、惩罚、标签、对偶约束、停止容差、先验和校准协议固定”",
      posterior: "求最大间隔产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“依据测试结果调核参数，或把SVM分数直接解释为后验概率”时停止",
    },
    {
      name: "检查KKT条件",
      prior:
        "第7章 稀疏核机 Sparse Kernel Machines：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“尺度、核、惩罚、标签、对偶约束、停止容差、先验和校准协议固定”",
      posterior: "检查KKT条件产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“依据测试结果调核参数，或把SVM分数直接解释为后验概率”时停止",
    },
    {
      name: "更新稀疏先验",
      prior:
        "第7章 稀疏核机 Sparse Kernel Machines：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“尺度、核、惩罚、标签、对偶约束、停止容差、先验和校准协议固定”",
      posterior: "更新稀疏先验产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“依据测试结果调核参数，或把SVM分数直接解释为后验概率”时停止",
    },
    {
      name: "比较预测语义",
      prior:
        "第7章 稀疏核机 Sparse Kernel Machines：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“尺度、核、惩罚、标签、对偶约束、停止容差、先验和校准协议固定”",
      posterior: "比较预测语义产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“依据测试结果调核参数，或把SVM分数直接解释为后验概率”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "在重叠二分类和回归数据上比较支持向量与相关向量。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“建立核表示 → 求最大间隔 → 检查KKT条件 → 更新稀疏先验 → 比较预测语义”得到可复核概率结论。",
      boundary:
        "全过程必须满足“尺度、核、惩罚、标签、对偶约束、停止容差、先验和校准协议固定”。",
    },
    {
      name: "边界反例",
      observation:
        "在重叠二分类和回归数据上比较支持向量与相关向量。 其余条件不变，只注入“依据测试结果调核参数，或把SVM分数直接解释为后验概率”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第7章 稀疏核机 Sparse Kernel Machines”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行建立核表示、求最大间隔，保存支持集、假设、分布或图结构",
    "推进检查KKT条件、更新稀疏先验，记录推断目标、更新、残差与预测不确定性",
    "在比较预测语义交付尺度、核矩阵、C与epsilon、对偶变量、KKT残差、支持/相关向量、后验协方差、校准和多类策略。",
  ],
  faultTrace: [
    "“第7章 稀疏核机 Sparse Kernel Machines”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：依据测试结果调核参数，或把SVM分数直接解释为后验概率",
    "沿“建立核表示 → 求最大间隔 → 检查KKT条件 → 更新稀疏先验 → 比较预测语义”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“尺度、核、惩罚、标签、对偶约束、停止容差、先验和校准协议固定”恢复才接受修正",
  ],
  invariant: "尺度、核、惩罚、标签、对偶约束、停止容差、先验和校准协议固定",
  fault: "依据测试结果调核参数，或把SVM分数直接解释为后验概率",
  artifact:
    "尺度、核矩阵、C与epsilon、对偶变量、KKT残差、支持/相关向量、后验协方差、校准和多类策略。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第7章 稀疏核机 Sparse Kernel Machines”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第7章 稀疏核机 Sparse Kernel Machines”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第7章 稀疏核机 Sparse Kernel Machines”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第7章 稀疏核机 Sparse Kernel Machines”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl07SparseKernelMachinesProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl07SparseKernelMachinesInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl07SparseKernelMachinesPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
