"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "lad4-07",
  title: "第 7 章：内积空间上的算子",
  question: "谱定理只覆盖正规算子时，SVD 为什么还能描述任意线性映射？",
  theorem:
    "任意有限维内积空间间的线性映射都有 SVD；截断奇异值给出相应秩约束下的最佳逼近。",
  assumptions: [
    "定义域与陪域都是有限维内积空间",
    "伴随由给定内积唯一确定",
    "谱定理只对实自伴或复正规算子使用",
    "奇异值按非增顺序并保留重数",
  ],
  concepts: [
    "7A Self-Adjoint and Normal Operators",
    "Adjoints",
    "Self-Adjoint Operators",
    "Normal Operators",
    "7B Spectral Theorem",
    "Real Spectral Theorem",
    "Complex Spectral Theorem",
    "7C Positive Operators",
    "7D Isometries, Unitary Operators, and Matrix Factorization",
    "Isometries",
    "Unitary Operators",
    "QR Factorization",
    "Cholesky Factorization",
    "7E Singular Value Decomposition",
    "Singular Values",
    "SVD for Linear Maps and for Matrices",
    "7F Consequences of Singular Value Decomposition",
    "Norms of Linear Maps",
    "Approximation by Linear Maps with Lower-Dimensional Range",
    "Polar Decomposition",
    "Operators Applied to Ellipsoids and Parallelepipeds",
    "Volume via Singular Values",
    "Properties of an Operator as Determined by Its Eigenvalues",
  ],
  normalExample:
    "对 A=diag(3,1,0)，奇异值为 3、1；保留第一项得到秩 1 逼近 diag(3,0,0)，误差由下一个奇异值控制。",
  boundaryExample:
    "把非正规上三角矩阵直接套正交对角化谱定理；它未必有正交规范特征向量基，但仍有 SVD。",
  invariant: "奇异值与所选正交规范基无关，截断前后都明确目标秩与误差范数。",
  proofArtifact: "T*T 的谱分解、左右奇异向量、重构残差与截断误差。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "定义域与陪域都是有限维内积空间",
      reason:
        "先冻结“第 7 章：内积空间上的算子”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "伴随算子与谱定理按定义进入推导",
      reason:
        "只使用“第 7 章：内积空间上的算子”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "对 A=diag(3,1,0)，奇异值为 3、1；保留第一项得到秩 1 逼近 diag(3,0,0)，误差由下一个奇异值控制。",
      reason:
        "非平凡对象让“任意有限维内积空间间的线性映射都有 SVD；截断奇异值给出相应秩约束下的最佳逼近。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim: "奇异值与所选正交规范基无关，截断前后都明确目标秩与误差范数。",
      reason: "每一步都核对“第 7 章：内积空间上的算子”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim:
        "任意有限维内积空间间的线性映射都有 SVD；截断奇异值给出相应秩约束下的最佳逼近。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“把非正规上三角矩阵直接套正交对角化谱定理；它未必有正交规范特征向量基，但仍有 SVD。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4OperatorsInnerProductSpacesAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4OperatorsInnerProductSpacesProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4OperatorsInnerProductSpacesCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
