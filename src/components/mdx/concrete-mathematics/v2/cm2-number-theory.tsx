"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "cm2-04",
  title: "第4章 Number Theory（数论）",
  question: "怎样让整除、同余、互素与算术函数结论携带可检查的整数证书？",
  concepts: [
    "第4章 Number Theory（数论）",
    "4.1 Divisibility",
    "4.2 Primes",
    "4.3 Prime Examples",
    "4.4 Factorial Factors",
    "4.5 Relative Primality",
    "4.6 ‘mod’: The Congruence Relation",
    "4.7 Independent Residues",
    "4.8 Additional Applications",
    "4.9 Phi and Mu",
  ],
  invariant: "每次整除或同余变换都保留模数、互素前提与整数线性组合证书",
  fault: "把同余当普通等式消去不可逆因子，或在模数不互素时直接套中国剩余结论",
  artifact: "Euclid除法链、Bézout回代、剩余类表和失败模数反例",
  experiment: "gcd",
  proofSteps: [
    {
      label: "执行带余除法",
      expression: "a = qb+r，0≤r<b",
      reason: "每一步都在整数域并让非零余数下降。",
    },
    {
      label: "保持公因子",
      expression: "gcd(a,b)=gcd(b,r)",
      reason: "a−qb=r 使两对整数拥有相同公因子集合。",
    },
    {
      label: "到达终点",
      expression: "gcd(d,0)=d",
      reason: "最后非零余数同时整除原输入。",
    },
    {
      label: "回代证书",
      expression: "d = xa+yb",
      reason: "逐层回代给出Bézout整数线性组合。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "第4章 Number Theory（数论）分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "第4章 Number Theory（数论）记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "第4章 Number Theory（数论）为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "第4章 Number Theory（数论）至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "第4章 Number Theory（数论）只注入“把同余当普通等式消去不可逆因子，或在模数不互素时直接套中国剩余结论”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "第4章 Number Theory（数论）交付Euclid除法链、Bézout回代、剩余类表和失败模数反例，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2NumberTheoryIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2NumberTheoryExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2NumberTheoryProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
