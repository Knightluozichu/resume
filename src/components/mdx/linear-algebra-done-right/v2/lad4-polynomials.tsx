"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "lad4-04",
  title: "第 4 章：多项式",
  question:
    "为什么多项式章几乎没有线性代数，却是最小多项式和特征值存在性的必经桥梁？",
  theorem:
    "若 p,s 非零，则存在唯一 q,r 使 p=sq+r 且余式次数严格小于除式次数；复多项式可分解为一次因子。",
  assumptions: [
    "多项式系数域明确为 R 或 C",
    "除法算法中的除式 s 非零",
    "零多项式的次数不按普通整数处理",
    "把 p 作用于算子时 T 必须是同一空间上的算子",
  ],
  concepts: [
    "Zeros of Polynomials",
    "Division Algorithm for Polynomials",
    "Factorization of Polynomials over C",
    "Factorization of Polynomials over R",
  ],
  normalExample:
    "把 p(z)=z^3-1 除以 z-1 得 q=z^2+z+1、r=0，再在 C 上继续分解两个非实根。",
  boundaryExample:
    "在 R 上声称 x^2+1 有一次因子；它在 C 上有根 ±i，但在 R 上只能保留不可约二次因子。",
  invariant: "余式次数严格小于除式次数，因式分解始终标注系数域。",
  proofArtifact: "商、余式、次数检查、零点代入与实/复域分解对照。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "多项式系数域明确为 R 或 C",
      reason: "先冻结“第 4 章：多项式”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "多项式零点与除法算法按定义进入推导",
      reason: "只使用“第 4 章：多项式”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "把 p(z)=z^3-1 除以 z-1 得 q=z^2+z+1、r=0，再在 C 上继续分解两个非实根。",
      reason:
        "非平凡对象让“若 p,s 非零，则存在唯一 q,r 使 p=sq+r 且余式次数严格小于除式次数；复多项式可分解为一次因子。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim: "余式次数严格小于除式次数，因式分解始终标注系数域。",
      reason: "每一步都核对“第 4 章：多项式”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim:
        "若 p,s 非零，则存在唯一 q,r 使 p=sq+r 且余式次数严格小于除式次数；复多项式可分解为一次因子。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“在 R 上声称 x^2+1 有一次因子；它在 C 上有根 ±i，但在 R 上只能保留不可约二次因子。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4PolynomialsAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4PolynomialsProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4PolynomialsCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
