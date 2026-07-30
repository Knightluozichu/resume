"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "lad4-06",
  title: "第 6 章：内积空间",
  question: "为什么正交投影不仅是几何图，而且给出了最小二乘问题的唯一最佳解？",
  theorem: "有限维内积空间中 V=U⊕U^⊥，且 P_Uv 是 U 中距离 v 最近的向量。",
  assumptions: [
    "V 已给定实或复内积",
    "复内积的一个变量需要共轭线性",
    "U 是有限维子空间",
    "Gram-Schmidt 输入列表线性无关",
  ],
  concepts: [
    "6A Inner Products and Norms",
    "Inner Products",
    "Norms",
    "6B Orthonormal Bases",
    "Orthonormal Lists and the Gram-Schmidt Procedure",
    "Linear Functionals on Inner Product Spaces",
    "6C Orthogonal Complements and Minimization Problems",
    "Orthogonal Complements",
    "Minimization Problems",
    "Pseudoinverse",
  ],
  normalExample:
    "把 R^3 中 v=(1,2,3) 投影到 xy 平面 U，得到 P_Uv=(1,2,0)，残差 (0,0,3) 与 U 正交。",
  boundaryExample:
    "对线性相关列表直接执行 Gram-Schmidt，某一步得到零向量并试图归一化，产生除零。",
  invariant: "投影分量属于 U，残差属于 U^⊥，二者内积为零。",
  proofArtifact: "正交分解、Pythagorean 等式、投影系数和残差内积。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "V 已给定实或复内积",
      reason: "先冻结“第 6 章：内积空间”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "内积与正交规范基按定义进入推导",
      reason: "只使用“第 6 章：内积空间”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "把 R^3 中 v=(1,2,3) 投影到 xy 平面 U，得到 P_Uv=(1,2,0)，残差 (0,0,3) 与 U 正交。",
      reason:
        "非平凡对象让“有限维内积空间中 V=U⊕U^⊥，且 P_Uv 是 U 中距离 v 最近的向量。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim: "投影分量属于 U，残差属于 U^⊥，二者内积为零。",
      reason: "每一步都核对“第 6 章：内积空间”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim: "有限维内积空间中 V=U⊕U^⊥，且 P_Uv 是 U 中距离 v 最近的向量。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“对线性相关列表直接执行 Gram-Schmidt，某一步得到零向量并试图归一化，产生除零。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4InnerProductSpacesAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4InnerProductSpacesProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4InnerProductSpacesCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
