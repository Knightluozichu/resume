"use client";

import {
  StatisticalMethodEvidenceLab,
  type StatisticalMethodEvidenceModel,
} from "./statistical-method-evidence-lab";

const model = {
  unitId: "slm-09",
  title: "第9章 EM算法及其推广",
  question: "怎样从完全数据似然构造Q函数，并验证E/M两步与下界单调性？",
  concepts: [
    "第9章 EM算法及其推广",
    "9.1 EM算法的引入",
    "9.1.1 EM算法",
    "9.1.2 EM算法的导出",
    "9.1.3 EM算法在无监督学习中的应用",
    "9.2 EM算法的收敛性",
    "9.3 EM算法在高斯混合模型学习中的应用",
    "9.3.1 高斯混合模型",
    "9.3.2 高斯混合模型参数估计的 EM算法",
    "9.4 EM算法的推广",
    "9.4.1 F函数的极大-极大算法",
    "9.4.2 GEM算法",
  ],
  stages: [
    {
      name: "观测与隐变量",
      known:
        "第9章 EM算法及其推广：声明对象、符号与适用域，冻结数据、形状和版本",
      transform:
        "只读取本步允许的已知量，并持续满足“观测/隐变量、模型族、初始化、E步后验、M步优化和停止规则固定”",
      result: "观测与隐变量产生形式化问题状态",
      check:
        "形式化问题状态、索引和数值断言；出现“只运行一次初始化或Q函数计算错误，似然下降仍宣称EM收敛”时停止",
    },
    {
      name: "完全似然",
      known: "第9章 EM算法及其推广：构造模型、结构或分布，冻结数据、形状和版本",
      transform:
        "保存假设、维度与归一条件，并持续满足“观测/隐变量、模型族、初始化、E步后验、M步优化和停止规则固定”",
      result: "完全似然产生可计算模型状态",
      check:
        "可计算模型状态、索引和数值断言；出现“只运行一次初始化或Q函数计算错误，似然下降仍宣称EM收敛”时停止",
    },
    {
      name: "E步责任度",
      known:
        "第9章 EM算法及其推广：建立策略、目标或推断量，冻结数据、形状和版本",
      transform:
        "记录目标、约束和选择理由，并持续满足“观测/隐变量、模型族、初始化、E步后验、M步优化和停止规则固定”",
      result: "E步责任度产生候选优化状态",
      check:
        "候选优化状态、索引和数值断言；出现“只运行一次初始化或Q函数计算错误，似然下降仍宣称EM收敛”时停止",
    },
    {
      name: "M步更新",
      known: "第9章 EM算法及其推广：执行更新、分解或采样，冻结数据、形状和版本",
      transform:
        "保存初值、顺序、随机性与残差，并持续满足“观测/隐变量、模型族、初始化、E步后验、M步优化和停止规则固定”",
      result: "M步更新产生可重放数值轨迹",
      check:
        "可重放数值轨迹、索引和数值断言；出现“只运行一次初始化或Q函数计算错误，似然下降仍宣称EM收敛”时停止",
    },
    {
      name: "下界诊断",
      known:
        "第9章 EM算法及其推广：检查定义、数值与统计结论，冻结数据、形状和版本",
      transform:
        "保留反例、诊断和适用边界，并持续满足“观测/隐变量、模型族、初始化、E步后验、M步优化和停止规则固定”",
      result: "下界诊断产生独立方法证据包",
      check:
        "独立方法证据包、索引和数值断言；出现“只运行一次初始化或Q函数计算错误，似然下降仍宣称EM收敛”时停止",
    },
  ],
  cases: [
    {
      name: "参考推演",
      problem:
        "对两分量高斯混合手算责任度、参数更新和对数似然。 固定符号、数据、初值、顺序、容差和种子。",
      prediction:
        "沿“观测与隐变量 → 完全似然 → E步责任度 → M步更新 → 下界诊断”得到可复核结果。",
      boundary:
        "全过程必须满足“观测/隐变量、模型族、初始化、E步后验、M步优化和停止规则固定”。",
    },
    {
      name: "边界反例",
      problem:
        "对两分量高斯混合手算责任度、参数更新和对数似然。 其余不变，只注入“只运行一次初始化或Q函数计算错误，似然下降仍宣称EM收敛”。",
      prediction: "定位第一处定义、形状、目标或数值状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第9章 EM算法及其推广”冻结符号、数据、形状、初值、顺序、容差和随机种子",
    "执行观测与隐变量、完全似然，保存定义、假设与模型状态",
    "推进E步责任度、M步更新，记录目标、更新和数值残差",
    "在下界诊断交付模型与初值、责任度矩阵、Q函数、参数更新、对数似然、下界差、收敛阈值和多初值对照。",
  ],
  faultTrace: [
    "“第9章 EM算法及其推广”复用相同符号、数据、形状、初值、顺序、容差和种子",
    "只改变一个条件：只运行一次初始化或Q函数计算错误，似然下降仍宣称EM收敛",
    "沿“观测与隐变量 → 完全似然 → E步责任度 → M步更新 → 下界诊断”寻找最早的定义或数值分叉",
    "撤销故障重放；只有“观测/隐变量、模型族、初始化、E步后验、M步优化和停止规则固定”恢复才接受修正",
  ],
  invariant: "观测/隐变量、模型族、初始化、E步后验、M步优化和停止规则固定",
  fault: "只运行一次初始化或Q函数计算错误，似然下降仍宣称EM收敛",
  artifact:
    "模型与初值、责任度矩阵、Q函数、参数更新、对数似然、下界差、收敛阈值和多初值对照。",
  gates: [
    {
      label: "定义与形状",
      detail:
        "“第9章 EM算法及其推广”的对象、符号、维度、定义域和归一约定可追溯。",
    },
    {
      label: "模型与目标",
      detail:
        "“第9章 EM算法及其推广”的假设、分布、损失/似然、约束和选择理由已冻结。",
    },
    {
      label: "算法与数值",
      detail:
        "“第9章 EM算法及其推广”的初值、顺序、随机性、更新、容差和残差可重放。",
    },
    {
      label: "诊断与边界",
      detail:
        "“第9章 EM算法及其推广”归档反例、收敛/稳定性、独立评估、适用域和时间标签。",
    },
  ],
} as const satisfies StatisticalMethodEvidenceModel;

export function Slm09EmDerivationPathLab() {
  return <StatisticalMethodEvidenceLab model={model} view="derivation-path" />;
}

export function Slm09EmNumericalTraceLab() {
  return <StatisticalMethodEvidenceLab model={model} view="numerical-trace" />;
}

export function Slm09EmClaimGateLab() {
  return <StatisticalMethodEvidenceLab model={model} view="claim-gate" />;
}
