"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "lad4-08",
  title: "第 8 章：复向量空间上的算子",
  question: "特征向量不够组成一组基时，广义特征向量怎样补齐缺失方向？",
  theorem:
    "有限维复向量空间可分解为各广义特征空间的直和，且每个算子都有由 Jordan 链组成的基。",
  assumptions: [
    "V 是有限维复向量空间",
    "T 是 V 上的线性算子",
    "广义特征空间使用足够高次的 null(T-λI)^k",
    "Jordan 链按 $(T-λI)v_{j}=v_{j-1}$ 排列",
  ],
  concepts: [
    "8A Generalized Eigenvectors and Nilpotent Operators",
    "Null Spaces of Powers of an Operator",
    "Generalized Eigenvectors",
    "Nilpotent Operators",
    "8B Generalized Eigenspace Decomposition",
    "Generalized Eigenspaces",
    "Multiplicity of an Eigenvalue",
    "Block Diagonal Matrices",
    "8C Consequences of Generalized Eigenspace Decomposition",
    "Square Roots of Operators",
    "Jordan Form",
    "8D Trace: A Connection Between Matrices and Operators",
  ],
  normalExample:
    "对二阶 Jordan 块 J=[[2,1],[0,2]]，e1 是特征向量，e2 是二阶广义特征向量，二者组成完整 Jordan 链。",
  boundaryExample:
    "只收集普通特征向量时，二阶 Jordan 块只有一维特征空间，无法构成 C^2 的基。",
  invariant: "广义特征空间维数之和等于 dim V，各空间由 T 保持不变。",
  proofArtifact: "null(T-λI)^k 稳定链、直和维数、Jordan 链和换基后的分块矩阵。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "V 是有限维复向量空间",
      reason:
        "先冻结“第 8 章：复向量空间上的算子”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "广义特征向量与幂零算子按定义进入推导",
      reason:
        "只使用“第 8 章：复向量空间上的算子”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "对二阶 Jordan 块 J=[[2,1],[0,2]]，e1 是特征向量，e2 是二阶广义特征向量，二者组成完整 Jordan 链。",
      reason:
        "非平凡对象让“有限维复向量空间可分解为各广义特征空间的直和，且每个算子都有由 Jordan 链组成的基。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim: "广义特征空间维数之和等于 dim V，各空间由 T 保持不变。",
      reason: "每一步都核对“第 8 章：复向量空间上的算子”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim:
        "有限维复向量空间可分解为各广义特征空间的直和，且每个算子都有由 Jordan 链组成的基。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“只收集普通特征向量时，二阶 Jordan 块只有一维特征空间，无法构成 C^2 的基。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4OperatorsComplexVectorSpacesAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4OperatorsComplexVectorSpacesProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4OperatorsComplexVectorSpacesCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
