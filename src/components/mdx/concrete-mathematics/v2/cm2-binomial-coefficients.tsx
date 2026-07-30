"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "cm2-05",
  title: "第5章 Binomial Coefficients（二项式系数）",
  question: "怎样在组合解释、生成函数与机械求和之间传递同一恒等式的证书？",
  concepts: [
    "第5章 Binomial Coefficients（二项式系数）",
    "5.1 Basic Identities",
    "5.2 Basic Practice",
    "5.3 Tricks of the Trade",
    "5.4 Generating Functions",
    "5.5 Hypergeometric Functions",
    "5.6 Hypergeometric Transformations",
    "5.7 Partial Hypergeometric Sums",
    "5.8 Mechanical Summation",
  ],
  invariant: "代数两侧计数同一个有限对象集，机械结果另有初值与递推证书",
  fault: "忽略二项式系数的整数参数域，或只信符号系统输出而不保存望远镜证书",
  artifact: "对象双计数、卷积展开、参数域、初值和机械证书残差",
  experiment: "binomial",
  proofSteps: [
    {
      label: "定义两组对象",
      expression: "|R|=r，|S|=s，R∩S=∅",
      reason: "两组有限且不相交。",
    },
    {
      label: "按来源分组",
      expression: "Σₖ C(r,k)C(s,n−k)",
      reason: "k记录从第一组选择的元素数。",
    },
    {
      label: "合并对象集",
      expression: "C(r+s,n)",
      reason: "不分类时直接从并集选择n个元素。",
    },
    {
      label: "识别同一集合",
      expression: "Σₖ C(r,k)C(s,n−k)=C(r+s,n)",
      reason: "分组计数与直接计数覆盖相同选择且无重无漏。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "第5章 Binomial Coefficients（二项式系数）分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "第5章 Binomial Coefficients（二项式系数）记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "第5章 Binomial Coefficients（二项式系数）为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "第5章 Binomial Coefficients（二项式系数）至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "第5章 Binomial Coefficients（二项式系数）只注入“忽略二项式系数的整数参数域，或只信符号系统输出而不保存望远镜证书”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "第5章 Binomial Coefficients（二项式系数）交付对象双计数、卷积展开、参数域、初值和机械证书残差，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2BinomialCoefficientsIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2BinomialCoefficientsExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2BinomialCoefficientsProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
