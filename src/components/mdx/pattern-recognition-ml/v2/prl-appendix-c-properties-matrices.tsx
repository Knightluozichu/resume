"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-app-c",
  title: "附录C 矩阵性质",
  question: "怎样让形状、秩、正定性、分解和行列式恒等式成为可执行断言？",
  concepts: ["Appendix C Properties of Matrices"],
  stages: [
    {
      name: "标注形状",
      prior: "附录C 矩阵性质：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“矩阵方向、形状、对称性、秩、正定容差和分解约定固定”",
      posterior: "标注形状产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“广播或转置错误仍产生数值结果，或近奇异矩阵直接求逆”时停止",
    },
    {
      name: "检查结构",
      prior: "附录C 矩阵性质：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“矩阵方向、形状、对称性、秩、正定容差和分解约定固定”",
      posterior: "检查结构产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“广播或转置错误仍产生数值结果，或近奇异矩阵直接求逆”时停止",
    },
    {
      name: "选择分解",
      prior:
        "附录C 矩阵性质：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“矩阵方向、形状、对称性、秩、正定容差和分解约定固定”",
      posterior: "选择分解产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“广播或转置错误仍产生数值结果，或近奇异矩阵直接求逆”时停止",
    },
    {
      name: "求解线性系统",
      prior: "附录C 矩阵性质：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“矩阵方向、形状、对称性、秩、正定容差和分解约定固定”",
      posterior: "求解线性系统产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“广播或转置错误仍产生数值结果，或近奇异矩阵直接求逆”时停止",
    },
    {
      name: "复核残差",
      prior:
        "附录C 矩阵性质：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“矩阵方向、形状、对称性、秩、正定容差和分解约定固定”",
      posterior: "复核残差产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“广播或转置错误仍产生数值结果，或近奇异矩阵直接求逆”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对协方差、设计矩阵和核矩阵建立形状与数值稳定性测试。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“标注形状 → 检查结构 → 选择分解 → 求解线性系统 → 复核残差”得到可复核概率结论。",
      boundary:
        "全过程必须满足“矩阵方向、形状、对称性、秩、正定容差和分解约定固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对协方差、设计矩阵和核矩阵建立形状与数值稳定性测试。 其余条件不变，只注入“广播或转置错误仍产生数值结果，或近奇异矩阵直接求逆”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“附录C 矩阵性质”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行标注形状、检查结构，保存支持集、假设、分布或图结构",
    "推进选择分解、求解线性系统，记录推断目标、更新、残差与预测不确定性",
    "在复核残差交付矩阵形状、秩、对称/正定残差、特征值、Cholesky/SVD、条件数、求解残差和失败矩阵。",
  ],
  faultTrace: [
    "“附录C 矩阵性质”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：广播或转置错误仍产生数值结果，或近奇异矩阵直接求逆",
    "沿“标注形状 → 检查结构 → 选择分解 → 求解线性系统 → 复核残差”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“矩阵方向、形状、对称性、秩、正定容差和分解约定固定”恢复才接受修正",
  ],
  invariant: "矩阵方向、形状、对称性、秩、正定容差和分解约定固定",
  fault: "广播或转置错误仍产生数值结果，或近奇异矩阵直接求逆",
  artifact:
    "矩阵形状、秩、对称/正定残差、特征值、Cholesky/SVD、条件数、求解残差和失败矩阵。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“附录C 矩阵性质”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“附录C 矩阵性质”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“附录C 矩阵性质”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“附录C 矩阵性质”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function PrlAppendixCPropertiesMatricesProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function PrlAppendixCPropertiesMatricesInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function PrlAppendixCPropertiesMatricesPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
