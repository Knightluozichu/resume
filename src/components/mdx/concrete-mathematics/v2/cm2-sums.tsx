"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "cm2-02",
  title: "第2章 Sums（求和）",
  question: "怎样在换元、交换顺序和望远镜消去时完整保存索引集合与边界项？",
  concepts: [
    "第2章 Sums（求和）",
    "2.1 Notation",
    "2.2 Sums and Recurrences",
    "2.3 Manipulation of Sums",
    "2.4 Multiple Sums",
    "2.5 General Methods",
    "2.6 Finite and Infinite Calculus",
    "2.7 Infinite Sums",
  ],
  invariant: "变换前后索引多重集、边界项与收敛前提完全对应",
  fault: "变量换元后仍使用旧上下界，或把有限和的交换理由套到未证收敛的无限和",
  artifact: "索引域图、换元表、消去项、剩余边界和逐项复算",
  experiment: "sum",
  proofSteps: [
    {
      label: "固定有限和",
      expression: "Sₙ = Σₖ₌₀ⁿ k",
      reason: "空和、起点和终点先于代数操作。",
    },
    {
      label: "反向配对",
      expression: "Sₙ = Σₖ₌₀ⁿ (n−k)",
      reason: "映射 k↦n−k 是索引集合上的双射。",
    },
    {
      label: "逐项相加",
      expression: "2Sₙ = Σₖ₌₀ⁿ n",
      reason: "两个和具有相同的有限索引域。",
    },
    {
      label: "计算常数和",
      expression: "Sₙ = n(n+1)/2",
      reason: "共有 n+1 项，每项为 n。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "第2章 Sums（求和）分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "第2章 Sums（求和）记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "第2章 Sums（求和）为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "第2章 Sums（求和）至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "第2章 Sums（求和）只注入“变量换元后仍使用旧上下界，或把有限和的交换理由套到未证收敛的无限和”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "第2章 Sums（求和）交付索引域图、换元表、消去项、剩余边界和逐项复算，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2SumsIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2SumsExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2SumsProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
