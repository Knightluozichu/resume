"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-08",
  title: "第8章 图模型 Graphical Models",
  question:
    "怎样从图结构读取条件独立并执行消息传递，同时证明因子化与查询语义一致？",
  concepts: [
    "8 Graphical Models",
    "8.1 Bayesian Networks",
    "8.1.1 Example: Polynomial regression",
    "8.1.2 Generative models",
    "8.1.3 Discrete variables",
    "8.1.4 Linear-Gaussian models",
    "8.2 Conditional Independence",
    "8.2.1 Three example graphs",
    "8.2.2 D-separation",
    "8.3 Markov Random Fields",
    "8.3.1 Conditional independence properties",
    "8.3.2 Factorization properties",
    "8.3.3 Illustration: Image de-noising",
    "8.3.4 Relation to directed graphs",
    "8.4 Inference in Graphical Models",
    "8.4.1 Inference on a chain",
    "8.4.2 Trees",
    "8.4.3 Factor graphs",
    "8.4.4 The sum-product algorithm",
    "8.4.5 The max-sum algorithm",
    "8.4.6 Exact inference in general graphs",
    "8.4.7 Loopy belief propagation",
    "8.4.8 Learning the graph structure",
  ],
  stages: [
    {
      name: "声明图与因子",
      prior:
        "第8章 图模型 Graphical Models：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“变量域、图方向、因子、归一常数、观测节点、消息调度和查询固定”",
      posterior: "声明图与因子产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“仅凭边缺失判断独立，或在有环图上把未收敛消息当作精确后验”时停止",
    },
    {
      name: "读取条件独立",
      prior:
        "第8章 图模型 Graphical Models：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“变量域、图方向、因子、归一常数、观测节点、消息调度和查询固定”",
      posterior: "读取条件独立产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“仅凭边缺失判断独立，或在有环图上把未收敛消息当作精确后验”时停止",
    },
    {
      name: "吸收观测",
      prior:
        "第8章 图模型 Graphical Models：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“变量域、图方向、因子、归一常数、观测节点、消息调度和查询固定”",
      posterior: "吸收观测产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“仅凭边缺失判断独立，或在有环图上把未收敛消息当作精确后验”时停止",
    },
    {
      name: "传递消息",
      prior:
        "第8章 图模型 Graphical Models：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“变量域、图方向、因子、归一常数、观测节点、消息调度和查询固定”",
      posterior: "传递消息产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“仅凭边缺失判断独立，或在有环图上把未收敛消息当作精确后验”时停止",
    },
    {
      name: "核对边缘或MAP",
      prior:
        "第8章 图模型 Graphical Models：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“变量域、图方向、因子、归一常数、观测节点、消息调度和查询固定”",
      posterior: "核对边缘或MAP产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“仅凭边缺失判断独立，或在有环图上把未收敛消息当作精确后验”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对同一小型联合分布画有向图、无向图和因子图并计算边缘/MAP。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“声明图与因子 → 读取条件独立 → 吸收观测 → 传递消息 → 核对边缘或MAP”得到可复核概率结论。",
      boundary:
        "全过程必须满足“变量域、图方向、因子、归一常数、观测节点、消息调度和查询固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对同一小型联合分布画有向图、无向图和因子图并计算边缘/MAP。 其余条件不变，只注入“仅凭边缺失判断独立，或在有环图上把未收敛消息当作精确后验”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第8章 图模型 Graphical Models”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行声明图与因子、读取条件独立，保存支持集、假设、分布或图结构",
    "推进吸收观测、传递消息，记录推断目标、更新、残差与预测不确定性",
    "在核对边缘或MAP交付变量与边、因子表、d-separation查询、势函数、归一常数、消息版本、树/环标记、边缘和MAP回溯。",
  ],
  faultTrace: [
    "“第8章 图模型 Graphical Models”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：仅凭边缺失判断独立，或在有环图上把未收敛消息当作精确后验",
    "沿“声明图与因子 → 读取条件独立 → 吸收观测 → 传递消息 → 核对边缘或MAP”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“变量域、图方向、因子、归一常数、观测节点、消息调度和查询固定”恢复才接受修正",
  ],
  invariant: "变量域、图方向、因子、归一常数、观测节点、消息调度和查询固定",
  fault: "仅凭边缺失判断独立，或在有环图上把未收敛消息当作精确后验",
  artifact:
    "变量与边、因子表、d-separation查询、势函数、归一常数、消息版本、树/环标记、边缘和MAP回溯。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“第8章 图模型 Graphical Models”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“第8章 图模型 Graphical Models”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“第8章 图模型 Graphical Models”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“第8章 图模型 Graphical Models”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function Prl08GraphicalModelsProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function Prl08GraphicalModelsInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function Prl08GraphicalModelsPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
