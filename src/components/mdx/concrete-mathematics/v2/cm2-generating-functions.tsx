"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "cm2-07",
  title: "第7章 Generating Functions（生成函数）",
  question: "怎样把序列编码、代数运算与系数提取组成可逆的形式幂级数推导？",
  concepts: [
    "第7章 Generating Functions（生成函数）",
    "7.1 Domino Theory and Change",
    "7.2 Basic Maneuvers",
    "7.3 Solving Recurrences",
    "7.4 Special Generating Functions",
    "7.5 Convolutions",
    "7.6 Exponential Generating Functions",
    "7.7 Dirichlet Generating Functions",
  ],
  invariant: "每个系数都由有限项决定，索引平移与乘法完整保留初值和卷积边界",
  fault: "索引平移时丢失初值修正项，或把形式幂级数恒等式误说成处处解析收敛",
  artifact: "序列表、形式幂级数、逐项卷积、系数提取和收敛声明边界",
  experiment: "generating",
  proofSteps: [
    {
      label: "编码序列",
      expression: "A(z)=Σₙ≥0 aₙzⁿ",
      reason: "形式语境先定义系数，不要求给z数值。",
    },
    {
      label: "相乘展开",
      expression: "A(z)B(z)=ΣᵢΣⱼ aᵢbⱼzⁱ⁺ʲ",
      reason: "每个目标次数只接收有限对索引。",
    },
    {
      label: "按总次数收集",
      expression: "[zⁿ]AB=Σₖ₌₀ⁿ aₖbₙ₋ₖ",
      reason: "约束i+j=n得到Cauchy卷积。",
    },
    {
      label: "逐项回代",
      expression: "aₙ、bₙ与卷积前项匹配",
      reason: "从代数结果提取系数并与原递推重放。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "第7章 Generating Functions（生成函数）分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "第7章 Generating Functions（生成函数）记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "第7章 Generating Functions（生成函数）为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "第7章 Generating Functions（生成函数）至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "第7章 Generating Functions（生成函数）只注入“索引平移时丢失初值修正项，或把形式幂级数恒等式误说成处处解析收敛”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "第7章 Generating Functions（生成函数）交付序列表、形式幂级数、逐项卷积、系数提取和收敛声明边界，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2GeneratingFunctionsIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2GeneratingFunctionsExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2GeneratingFunctionsProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
