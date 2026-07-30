"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "cm2-09",
  title: "第9章 Asymptotics（渐近分析）",
  question: "怎样让大O、渐近等价与Euler求和同时携带趋向变量、常数依赖和余项？",
  concepts: [
    "第9章 Asymptotics（渐近分析）",
    "9.1 A Hierarchy",
    "9.2 O Notation",
    "9.3 O Manipulation",
    "9.4 Two Asymptotic Tricks",
    "9.5 Euler’s Summation Formula",
    "9.6 Final Summations",
  ],
  invariant: "每个渐近结论声明趋向、参数一致性、主项、保留项、余项阶与适用范围",
  fault: "从f属于O(g)反推g属于O(f)，或只画接近曲线却不提供余项定理",
  artifact: "增长层级、常数依赖表、精确样本、归一化残差和余项证明",
  experiment: "asymptotic",
  proofSteps: [
    {
      label: "声明趋向",
      expression: "n→∞，其他参数固定",
      reason: "不声明趋向变量就无法解释O记号。",
    },
    {
      label: "保留精确对象",
      expression: "Hₙ=Σₖ₌₁ⁿ 1/k",
      reason: "渐近式必须有可比较的精确基线。",
    },
    {
      label: "写保留项",
      expression: "Hₙ=ln n+γ+1/(2n)+Rₙ",
      reason: "主项、常数项、端点修正和余项分开。",
    },
    {
      label: "约束余项",
      expression: "Rₙ=O(n⁻²)",
      reason: "曲线接近不是证明；常数与适用域由定理给出。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "第9章 Asymptotics（渐近分析）分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "第9章 Asymptotics（渐近分析）记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "第9章 Asymptotics（渐近分析）为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "第9章 Asymptotics（渐近分析）至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "第9章 Asymptotics（渐近分析）只注入“从f属于O(g)反推g属于O(f)，或只画接近曲线却不提供余项定理”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "第9章 Asymptotics（渐近分析）交付增长层级、常数依赖表、精确样本、归一化残差和余项证明，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2AsymptoticsIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2AsymptoticsExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2AsymptoticsProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
