"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "lad4-05",
  title: "第 5 章：特征值与特征向量",
  question: "不先定义行列式，怎样证明复向量空间上的算子必有特征值？",
  theorem:
    "非零有限维复向量空间上的每个算子都有特征值；最小多项式分裂可控制上三角化与可对角化。",
  assumptions: [
    "V 非零且有限维",
    "存在性定理的标量域是 C",
    "特征向量 v 明确要求非零",
    "最小多项式按首一且最低次数定义",
  ],
  concepts: [
    "5A Invariant Subspaces",
    "Eigenvalues",
    "Polynomials Applied to Operators",
    "5B The Minimal Polynomial",
    "Existence of Eigenvalues on Complex Vector Spaces",
    "Eigenvalues and the Minimal Polynomial",
    "Eigenvalues on Odd-Dimensional Real Vector Spaces",
    "5C Upper-Triangular Matrices",
    "5D Diagonalizable Operators",
    "Diagonal Matrices",
    "Conditions for Diagonalizability",
    "Gershgorin Disk Theorem",
    "5E Commuting Operators",
  ],
  normalExample:
    "对上三角矩阵 [[2,1],[0,3]]，对角元给出特征值 2、3，最小多项式 (x-2)(x-3) 无重根，因此可对角化。",
  boundaryExample:
    "实平面旋转 90° 的算子没有实特征值；把 C 上的存在性定理直接搬到 R 会失败。",
  invariant: "特征值、最小多项式和可对角化性不随换基改变。",
  proofArtifact: "不变子空间、p(T)v 依赖关系、最小多项式分解与特征向量见证。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "V 非零且有限维",
      reason:
        "先冻结“第 5 章：特征值与特征向量”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "不变子空间与特征向量按定义进入推导",
      reason:
        "只使用“第 5 章：特征值与特征向量”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "对上三角矩阵 [[2,1],[0,3]]，对角元给出特征值 2、3，最小多项式 (x-2)(x-3) 无重根，因此可对角化。",
      reason:
        "非平凡对象让“非零有限维复向量空间上的每个算子都有特征值；最小多项式分裂可控制上三角化与可对角化。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim: "特征值、最小多项式和可对角化性不随换基改变。",
      reason: "每一步都核对“第 5 章：特征值与特征向量”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim:
        "非零有限维复向量空间上的每个算子都有特征值；最小多项式分裂可控制上三角化与可对角化。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“实平面旋转 90° 的算子没有实特征值；把 C 上的存在性定理直接搬到 R 会失败。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4EigenvaluesEigenvectorsAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4EigenvaluesEigenvectorsProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4EigenvaluesEigenvectorsCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
