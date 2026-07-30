"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "lad4-09",
  title: "第 9 章：多线性代数与行列式",
  question: "把行列式放到最后后，它怎样从一个公式变成自然的交替多线性不变量？",
  theorem:
    "若 dim V=n，则 V 上交替 n-线性形式空间维数为 1；算子行列式由其对该一维空间的缩放唯一确定。",
  assumptions: [
    "V 有限维且 dim V=n",
    "Ω 对每个变量分别线性",
    "Ω 在交换两个输入时变号并在重复输入时为零",
    "定义 det T 时选择的 Ω 非零",
  ],
  concepts: [
    "9A Bilinear Forms and Quadratic Forms",
    "Bilinear Forms",
    "Symmetric Bilinear Forms",
    "Quadratic Forms",
    "9B Alternating Multilinear Forms",
    "Multilinear Forms",
    "Alternating Multilinear Forms and Permutations",
    "9C Determinants",
    "Defining the Determinant",
    "Properties of Determinants",
    "9D Tensor Products",
    "Tensor Product of Two Vector Spaces",
    "Tensor Product of Inner Product Spaces",
    "Tensor Product of Multiple Vector Spaces",
  ],
  normalExample:
    "在 R^2 中令 Ω((a,b),(c,d))=ad-bc；交换两向量会变号，T=diag(3,2) 使 Ω 缩放 6。",
  boundaryExample:
    "使用普通双线性形式 ac+bd 定义“面积”；它不交替，两个相同向量输入时不为零，不能承担行列式。",
  invariant:
    "行列式定义与所选非零最高次交替形式只差共同缩放，因此 det T 唯一。",
  proofArtifact:
    "多线性逐槽检查、交换符号、基上的唯一值、缩放因子与张量通用性质。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "V 有限维且 dim V=n",
      reason:
        "先冻结“第 9 章：多线性代数与行列式”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "双线性形式与交替多线性形式按定义进入推导",
      reason:
        "只使用“第 9 章：多线性代数与行列式”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "在 R^2 中令 Ω((a,b),(c,d))=ad-bc；交换两向量会变号，T=diag(3,2) 使 Ω 缩放 6。",
      reason:
        "非平凡对象让“若 dim V=n，则 V 上交替 n-线性形式空间维数为 1；算子行列式由其对该一维空间的缩放唯一确定。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim:
        "行列式定义与所选非零最高次交替形式只差共同缩放，因此 det T 唯一。",
      reason: "每一步都核对“第 9 章：多线性代数与行列式”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim:
        "若 dim V=n，则 V 上交替 n-线性形式空间维数为 1；算子行列式由其对该一维空间的缩放唯一确定。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“使用普通双线性形式 ac+bd 定义“面积”；它不交替，两个相同向量输入时不为零，不能承担行列式。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4MultilinearAlgebraDeterminantsAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4MultilinearAlgebraDeterminantsProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4MultilinearAlgebraDeterminantsCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
