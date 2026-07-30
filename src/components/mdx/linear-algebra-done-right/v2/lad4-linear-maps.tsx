"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "lad4-03",
  title: "第 3 章：线性映射",
  question: "矩阵换了为什么线性映射没有换，核与像又怎样把定义域维数精确分开？",
  theorem: "若 V 有限维且 T∈L(V,W)，则 dim V = dim null T + dim range T。",
  assumptions: [
    "T 的定义域 V 是有限维",
    "T 满足加法与标量乘法的线性条件",
    "null T 与 range T 使用同一个 T",
    "矩阵表示必须同时声明定义域基与陪域基",
  ],
  concepts: [
    "3A Vector Space of Linear Maps",
    "Definition and Examples of Linear Maps",
    "Algebraic Operations on L(V, W)",
    "3B Null Spaces and Ranges",
    "Null Space and Injectivity",
    "Range and Surjectivity",
    "Fundamental Theorem of Linear Maps",
    "3C Matrices",
    "Representing a Linear Map by a Matrix",
    "Addition and Scalar Multiplication of Matrices",
    "Matrix Multiplication",
    "Column-Row Factorization and Rank of a Matrix",
    "3D Invertibility and Isomorphisms",
    "Invertible Linear Maps",
    "Isomorphic Vector Spaces",
    "Linear Maps Thought of as Matrix Multiplication",
    "Change of Basis",
    "3E Products and Quotients of Vector Spaces",
    "Products of Vector Spaces",
    "Quotient Spaces",
    "3F Duality",
    "Dual Space and Dual Map",
    "Null Space and Range of Dual of Linear Map",
    "Matrix of Dual of Linear Map",
  ],
  normalExample:
    "令 T(x,y,z)=(x+y,y+z)。解 null T 得 span((-1,1,-1))，值域为 R^2，于是 3=1+2。",
  boundaryExample:
    "只给出矩阵 A 却不声明输入/输出基，然后把换基后的矩阵误认为另一个线性映射。",
  invariant: "映射的核、像、可逆性与秩不随坐标基改变。",
  proofArtifact: "核的一组基、扩充后的定义域基、对应值域基和维数等式。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "T 的定义域 V 是有限维",
      reason: "先冻结“第 3 章：线性映射”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "线性映射与零空间按定义进入推导",
      reason: "只使用“第 3 章：线性映射”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "令 T(x,y,z)=(x+y,y+z)。解 null T 得 span((-1,1,-1))，值域为 R^2，于是 3=1+2。",
      reason:
        "非平凡对象让“若 V 有限维且 T∈L(V,W)，则 dim V = dim null T + dim range T。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim: "映射的核、像、可逆性与秩不随坐标基改变。",
      reason: "每一步都核对“第 3 章：线性映射”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim: "若 V 有限维且 T∈L(V,W)，则 dim V = dim null T + dim range T。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“只给出矩阵 A 却不声明输入/输出基，然后把换基后的矩阵误认为另一个线性映射。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4LinearMapsAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4LinearMapsProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4LinearMapsCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
