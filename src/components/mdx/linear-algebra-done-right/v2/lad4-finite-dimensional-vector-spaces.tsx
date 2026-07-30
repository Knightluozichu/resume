"use client";

import { LinearProofLab, type LinearProofModel } from "./linear-proof-lab";

const model = {
  unitId: "lad4-02",
  title: "第 2 章：有限维向量空间",
  question: "为什么基同时要求“足够多以张成”和“足够少以保持线性无关”？",
  theorem:
    "有限维 V 中，任意线性无关组都可扩充为基，任意生成组都可删减为基，因此任意两组基长度相同。",
  assumptions: [
    "V 是有限维向量空间",
    "扩充起点是 V 中的线性无关列表",
    "删减起点确实张成 V",
    "列表顺序可变但向量所属域固定",
  ],
  concepts: [
    "2A Span and Linear Independence",
    "Linear Combinations and Span",
    "Linear Independence",
    "2B Bases",
    "2C Dimension",
  ],
  normalExample:
    "从 R^3 中的列表 ((1,0,0),(1,1,0)) 开始，加入 (0,0,1) 扩充为基，并记录每次加入后的 span。",
  boundaryExample:
    "把 (2,2,0) 加到 ((1,0,0),(1,1,0)) 后声称扩充成功；新向量其实在原 span 中，线性无关立即失效。",
  invariant: "每次扩充保持线性无关，每次删减保持张成，最终两项同时成立。",
  proofArtifact: "系数方程、span 变化记录、扩充/删减序列与最终基长度。",
  proofSteps: [
    {
      label: "声明对象",
      claim: "V 是有限维向量空间",
      reason:
        "先冻结“第 2 章：有限维向量空间”的域、空间与量词，避免证明中途换题。",
    },
    {
      label: "展开定义",
      claim: "线性组合与张成按定义进入推导",
      reason:
        "只使用“第 2 章：有限维向量空间”正文已声明的定义，不把待证结论当引理。",
    },
    {
      label: "构造见证",
      claim:
        "从 R^3 中的列表 ((1,0,0),(1,1,0)) 开始，加入 (0,0,1) 扩充为基，并记录每次加入后的 span。",
      reason:
        "非平凡对象让“有限维 V 中，任意线性无关组都可扩充为基，任意生成组都可删减为基，因此任意两组基长度相同。”中的结构可以逐步检查。",
    },
    {
      label: "保持不变量",
      claim: "每次扩充保持线性无关，每次删减保持张成，最终两项同时成立。",
      reason: "每一步都核对“第 2 章：有限维向量空间”真正不随选择改变的量。",
    },
    {
      label: "封闭结论",
      claim:
        "有限维 V 中，任意线性无关组都可扩充为基，任意生成组都可删减为基，因此任意两组基长度相同。",
      reason:
        "结论只覆盖四条假设允许的范围，并与“把 (2,2,0) 加到 ((1,0,0),(1,1,0)) 后声称扩充成功；新向量其实在原 span 中，线性无关立即失效。”区分。",
    },
  ],
} satisfies LinearProofModel;

export function Lad4FiniteDimensionalVectorSpacesAssumptionLab() {
  return <LinearProofLab model={model} view="assumptions" />;
}

export function Lad4FiniteDimensionalVectorSpacesProofLab() {
  return <LinearProofLab model={model} view="proof" />;
}

export function Lad4FiniteDimensionalVectorSpacesCounterexampleLab() {
  return <LinearProofLab model={model} view="counterexample" />;
}
