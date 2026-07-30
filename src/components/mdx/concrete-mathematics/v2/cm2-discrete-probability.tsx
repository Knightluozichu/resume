"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "cm2-08",
  title: "第8章 Discrete Probability（离散概率）",
  question: "怎样用指示变量、期望线性与生成函数分析随机算法而不偷用独立性？",
  concepts: [
    "第8章 Discrete Probability（离散概率）",
    "8.1 Definitions",
    "8.2 Mean and Variance",
    "8.3 Probability Generating Functions",
    "8.4 Flipping Coins",
    "8.5 Hashing",
  ],
  invariant:
    "样本空间、分布、随机变量与事件先定义；独立性只在需要乘概率或化简方差时使用",
  fault: "误以为期望线性要求事件独立，或从期望值直接推出高概率保证",
  artifact: "样本空间、指示变量表、期望推导、协方差清单和尾部声明",
  experiment: "probability",
  proofSteps: [
    {
      label: "定义碰撞指示量",
      expression: "Iᵢⱼ=1{h(i)=h(j)}",
      reason: "每一无序键对对应一个零一变量。",
    },
    {
      label: "写总碰撞数",
      expression: "X=Σᵢ<ⱼ Iᵢⱼ",
      reason: "每个碰撞对恰好计数一次。",
    },
    {
      label: "应用期望线性",
      expression: "E[X]=Σᵢ<ⱼ E[Iᵢⱼ]",
      reason: "有限和无需变量相互独立。",
    },
    {
      label: "代入均匀概率",
      expression: "E[X]=C(n,2)/m",
      reason: "每对键碰到同一桶的概率为1/m。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "第8章 Discrete Probability（离散概率）分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "第8章 Discrete Probability（离散概率）记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "第8章 Discrete Probability（离散概率）为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "第8章 Discrete Probability（离散概率）至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "第8章 Discrete Probability（离散概率）只注入“误以为期望线性要求事件独立，或从期望值直接推出高概率保证”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "第8章 Discrete Probability（离散概率）交付样本空间、指示变量表、期望推导、协方差清单和尾部声明，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2DiscreteProbabilityIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2DiscreteProbabilityExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2DiscreteProbabilityProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
