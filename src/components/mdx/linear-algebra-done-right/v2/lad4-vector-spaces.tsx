"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "lad4-01",
  title: "第 1 章：向量空间",
  question: "为什么“能做加法和数乘”还不够，直和又为什么必须检查表示唯一？",
  theorem:
    "U_1+...+U_m 是直和，当且仅当零向量只有全零分解；这等价于和中的每个向量都有唯一表示。",
  assumptions: [
    "所有 U_j 都是同一标量域 F 上 V 的子空间",
    "候选子空间含 0 且对加法封闭",
    "候选子空间对任意 F 中标量乘法封闭",
    "直和结论中的分解向量分别属于指定 U_j",
  ],
  concepts: [
    "1A R^n and C^n",
    "Complex Numbers",
    "Lists",
    "F^n",
    "Digression on Fields",
    "1B Definition of Vector Space",
    "1C Subspaces",
    "Sums of Subspaces",
    "Direct Sums",
  ],
  normalExample:
    "在 R^3 中令 U=span((1,0,0),(0,1,0))，W=span((0,0,1))；每个向量按 xy 分量与 z 分量唯一分解。",
  boundaryExample:
    "在 R^2 中令 U=span((1,0))，W=span((2,0))；U+W 虽是子空间，但 (1,0) 有多种分解，因此不是直和。",
  invariant: "运算、标量域和所属空间始终一致，唯一性通过零向量分解检查。",
  proofArtifact: "封闭性逐项表、零分解推导和一组非直和反例。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "所有 U_j 都是同一标量域 F 上 V 的子空间",
      reason: "先冻结“第 1 章：向量空间”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "向量空间与子空间按定义进入推导",
      reason: "只使用“第 1 章：向量空间”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "在 R^3 中令 U=span((1,0,0),(0,1,0))，W=span((0,0,1))；每个向量按 xy 分量与 z 分量唯一分解。",
      reason:
        "非平凡对象让“U_1+...+U_m 是直和，当且仅当零向量只有全零分解；这等价于和中的每个向量都有唯一表示。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim: "运算、标量域和所属空间始终一致，唯一性通过零向量分解检查。",
      reason: "每一步都核对“第 1 章：向量空间”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim:
        "U_1+...+U_m 是直和，当且仅当零向量只有全零分解；这等价于和中的每个向量都有唯一表示。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“在 R^2 中令 U=span((1,0))，W=span((2,0))；U+W 虽是子空间，但 (1,0) 有多种分解，因此不是直和。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4VectorSpacesAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4VectorSpacesProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4VectorSpacesCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
