"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "cm2-01",
  title: "第1章 Recurrent Problems（递归问题）",
  question: "怎样从可枚举的小问题建立有初值、有适用域、可被反例攻击的递推？",
  concepts: [
    "第1章 Recurrent Problems（递归问题）",
    "1.1 The Tower of Hanoi",
    "1.2 Lines in the Plane",
    "1.3 The Josephus Problem",
  ],
  invariant: "递推、初值、索引域、闭式和小规模枚举描述同一个序列",
  fault: "保留递推式却删除初值，或改变编号基准后沿用旧偏移",
  artifact: "状态定义、递推树、前十项、闭式代回和偏移反例",
  experiment: "hanoi",
  proofSteps: [
    {
      label: "定义状态",
      expression: "Hₙ = 最少移动 n 个圆盘的步数",
      reason: "圆盘数、合法移动和目标柱必须固定。",
    },
    {
      label: "分解动作",
      expression: "Hₙ ≥ 2Hₙ₋₁ + 1",
      reason: "最大片移动前后各要处理一次 n−1 片子问题。",
    },
    {
      label: "构造上界",
      expression: "Hₙ ≤ 2Hₙ₋₁ + 1",
      reason: "标准递归算法达到同一移动次数。",
    },
    {
      label: "解与代回",
      expression: "Hₙ = 2ⁿ − 1，H₀=0",
      reason: "闭式满足递推与初值，因此与原序列一致。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "第1章 Recurrent Problems（递归问题）分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "第1章 Recurrent Problems（递归问题）记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "第1章 Recurrent Problems（递归问题）为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "第1章 Recurrent Problems（递归问题）至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "第1章 Recurrent Problems（递归问题）只注入“保留递推式却删除初值，或改变编号基准后沿用旧偏移”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "第1章 Recurrent Problems（递归问题）交付状态定义、递推树、前十项、闭式代回和偏移反例，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2RecurrentProblemsIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2RecurrentProblemsExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2RecurrentProblemsProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
