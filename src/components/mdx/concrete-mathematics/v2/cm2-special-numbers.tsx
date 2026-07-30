"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "cm2-06",
  title: "第6章 Special Numbers（特殊数）",
  question:
    "怎样在Stirling、Eulerian、调和、Bernoulli、Fibonacci与continuant之间保持定义和符号约定？",
  concepts: [
    "第6章 Special Numbers（特殊数）",
    "6.1 Stirling Numbers",
    "6.2 Eulerian Numbers",
    "6.3 Harmonic Numbers",
    "6.4 Harmonic Summation",
    "6.5 Bernoulli Numbers",
    "6.6 Fibonacci Numbers",
    "6.7 Continuants",
  ],
  invariant: "特殊数的初值、符号、索引方向、生成函数和递推来自同一约定",
  fault: "把B₁=+1/2与B₁=−1/2的公式逐项混合，或只凭序列前几项猜恒等式",
  artifact: "定义卡、前若干项、递推重放、生成函数系数与约定转换表",
  experiment: "special",
  proofSteps: [
    {
      label: "冻结Fibonacci初值",
      expression: "F₀=0，F₁=1",
      reason: "索引从零开始，避免整体偏移。",
    },
    {
      label: "递推生成",
      expression: "Fₙ₊₂=Fₙ₊₁+Fₙ",
      reason: "每个新值只依赖前两个已验收值。",
    },
    {
      label: "冻结Bernoulli约定",
      expression: "z/(1−e⁻ᶻ)=Σ Bₙzⁿ/n!",
      reason: "作者2022替换页由该生成函数得到B₁=+1/2。",
    },
    {
      label: "跨资料换算",
      expression: "B₁⁺=−B₁⁻，其余Bₙ同约定逐式核查",
      reason: "涉及一次项的公式必须先转换，不能只改标签。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "第6章 Special Numbers（特殊数）分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "第6章 Special Numbers（特殊数）记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "第6章 Special Numbers（特殊数）为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "第6章 Special Numbers（特殊数）至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "第6章 Special Numbers（特殊数）只注入“把B₁=+1/2与B₁=−1/2的公式逐项混合，或只凭序列前几项猜恒等式”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "第6章 Special Numbers（特殊数）交付定义卡、前若干项、递推重放、生成函数系数与约定转换表，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2SpecialNumbersIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2SpecialNumbersExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2SpecialNumbersProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
