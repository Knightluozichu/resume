"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "cm2-03",
  title: "第3章 Integer Functions（整数函数）",
  question: "怎样把floor、ceiling和mod的语言约定转成可复算的整数分块？",
  concepts: [
    "第3章 Integer Functions（整数函数）",
    "3.1 Floors and Ceilings",
    "3.2 Floor/Ceiling Applications",
    "3.3 Floor/Ceiling Recurrences",
    "3.4 ‘mod’: The Binary Operation",
    "3.5 Floor/Ceiling Sums",
  ],
  invariant: "每个实数落入唯一半开区间，商与余数满足固定除数下的唯一分解",
  fault: "混用不同编程语言的负数余数语义，或在端点上把严格不等号写成非严格",
  artifact: "半开区间图、商余数表、逐项取整和与负数语义对照",
  experiment: "floor",
  proofSteps: [
    {
      label: "定义下取整",
      expression: "⌊x⌋ ≤ x < ⌊x⌋+1",
      reason: "唯一整数由一闭一开的夹逼确定。",
    },
    {
      label: "建立对偶",
      expression: "⌈x⌉ = −⌊−x⌋",
      reason: "取负使不等号反向并交换上下界。",
    },
    {
      label: "整数分解",
      expression: "n = mq+r，0≤r<m",
      reason: "正除数 m 固定时商余数唯一。",
    },
    {
      label: "按商分块",
      expression: "Σₖ₌₀ⁿ⌊k/m⌋ = mq(q−1)/2+q(r+1)",
      reason: "每个完整商值出现 m 次，末段出现 r+1 次。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "第3章 Integer Functions（整数函数）分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "第3章 Integer Functions（整数函数）记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "第3章 Integer Functions（整数函数）为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "第3章 Integer Functions（整数函数）至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "第3章 Integer Functions（整数函数）只注入“混用不同编程语言的负数余数语义，或在端点上把严格不等号写成非严格”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "第3章 Integer Functions（整数函数）交付半开区间图、商余数表、逐项取整和与负数语义对照，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2IntegerFunctionsIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2IntegerFunctionsExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2IntegerFunctionsProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
