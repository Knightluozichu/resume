"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "finalReview",
  title: "《具体数学》第二版66坐标全书证据总复习",
  question: "怎样用同一组定义、反例与恢复门验收全书，而不是背诵66个标题？",
  concepts: [
    "第1章 Recurrent Problems（递归问题）",
    "1.1 The Tower of Hanoi",
    "1.2 Lines in the Plane",
    "1.3 The Josephus Problem",
    "第2章 Sums（求和）",
    "2.1 Notation",
    "2.2 Sums and Recurrences",
    "2.3 Manipulation of Sums",
    "2.4 Multiple Sums",
    "2.5 General Methods",
    "2.6 Finite and Infinite Calculus",
    "2.7 Infinite Sums",
    "第3章 Integer Functions（整数函数）",
    "3.1 Floors and Ceilings",
    "3.2 Floor/Ceiling Applications",
    "3.3 Floor/Ceiling Recurrences",
    "3.4 ‘mod’: The Binary Operation",
    "3.5 Floor/Ceiling Sums",
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
    "第5章 Binomial Coefficients（二项式系数）",
    "5.1 Basic Identities",
    "5.2 Basic Practice",
    "5.3 Tricks of the Trade",
    "5.4 Generating Functions",
    "5.5 Hypergeometric Functions",
    "5.6 Hypergeometric Transformations",
    "5.7 Partial Hypergeometric Sums",
    "5.8 Mechanical Summation",
    "第6章 Special Numbers（特殊数）",
    "6.1 Stirling Numbers",
    "6.2 Eulerian Numbers",
    "6.3 Harmonic Numbers",
    "6.4 Harmonic Summation",
    "6.5 Bernoulli Numbers",
    "6.6 Fibonacci Numbers",
    "6.7 Continuants",
    "第7章 Generating Functions（生成函数）",
    "7.1 Domino Theory and Change",
    "7.2 Basic Maneuvers",
    "7.3 Solving Recurrences",
    "7.4 Special Generating Functions",
    "7.5 Convolutions",
    "7.6 Exponential Generating Functions",
    "7.7 Dirichlet Generating Functions",
    "第8章 Discrete Probability（离散概率）",
    "8.1 Definitions",
    "8.2 Mean and Variance",
    "8.3 Probability Generating Functions",
    "8.4 Flipping Coins",
    "8.5 Hashing",
    "第9章 Asymptotics（渐近分析）",
    "9.1 A Hierarchy",
    "9.2 O Notation",
    "9.3 O Manipulation",
    "9.4 Two Asymptotic Tricks",
    "9.5 Euler’s Summation Formula",
    "9.6 Final Summations",
  ],
  invariant: "任何结论都能从定义重放，破坏一个前提时能定位首错，撤销后能恢复",
  fault: "跳过精确小样例，直接相信符号化结果、数值拟合或记忆中的公式",
  artifact: "全书口试记录、九章证书、反例库、误差表与未决问题",
  experiment: "cross",
  proofSteps: [
    {
      label: "口述对象",
      expression: "对象 + 索引域 + 初值 + 边界",
      reason: "先说清问题，不能从答案反推题目。",
    },
    {
      label: "重建推导",
      expression: "每一步 = 等价式 + 适用前提",
      reason: "换元、交换与近似各有独立责任。",
    },
    {
      label: "攻击前提",
      expression: "删除一个前提 → 最小反例",
      reason: "反例应指出首个失败步骤而非只给错误数字。",
    },
    {
      label: "同输入恢复",
      expression: "撤销故障 → 精确值、证书与余项恢复",
      reason: "恢复结果与基线共同进入最终记录。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "《具体数学》第二版66坐标全书证据总复习分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "《具体数学》第二版66坐标全书证据总复习记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "《具体数学》第二版66坐标全书证据总复习为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "《具体数学》第二版66坐标全书证据总复习至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "《具体数学》第二版66坐标全书证据总复习只注入“跳过精确小样例，直接相信符号化结果、数值拟合或记忆中的公式”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "《具体数学》第二版66坐标全书证据总复习交付全书口试记录、九章证书、反例库、误差表与未决问题，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2OfficialFinalReviewIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2OfficialFinalReviewExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2OfficialFinalReviewProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
