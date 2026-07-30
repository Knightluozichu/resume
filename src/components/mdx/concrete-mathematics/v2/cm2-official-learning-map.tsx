"use client";

import {
  ConcreteMathEvidenceLab,
  type ConcreteMathEvidenceModel,
} from "@/components/mdx/concrete-mathematics/v2/concrete-math-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《具体数学》第二版66坐标证据学习地图",
  question: "66个正式坐标怎样连接为一条从精确对象到带余项近似的证据链？",
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
  invariant: "每个目录坐标都有唯一证据键，原版范围、本站扩展和当前勘误保持分层",
  fault: "把57个编号小节压缩成本站自造概念，或把授权样章误标成整书可访问",
  artifact: "66坐标矩阵、章节依赖、来源身份、实验索引和缺口清单",
  experiment: "cross",
  proofSteps: [
    {
      label: "定义精确对象层",
      expression: "递推 → 有限和 → 整数结构",
      reason: "前三类坐标先固定状态、索引和边界。",
    },
    {
      label: "建立代数变换层",
      expression: "二项式 → 特殊数 → 生成函数",
      reason: "中间三类坐标保存可逆变换与系数证书。",
    },
    {
      label: "连接随机对象层",
      expression: "指示变量 → 期望与方差",
      reason: "概率坐标先定义分布，再使用线性和独立性。",
    },
    {
      label: "交付近似层",
      expression: "精确式 → 主项 + 余项",
      reason: "渐近坐标保留可复算精确基线与误差声明。",
    },
  ],
  gates: [
    {
      label: "来源与印次门",
      detail:
        "《具体数学》第二版66坐标证据学习地图分开出版社目录、授权样章、作者勘误、2022替换页与本站独立推导。",
    },
    {
      label: "定义与适用域门",
      detail:
        "《具体数学》第二版66坐标证据学习地图记录对象、索引域、初值、参数、空对象和端点约定。",
    },
    {
      label: "等价变换门",
      detail:
        "《具体数学》第二版66坐标证据学习地图为换元、交换求和、卷积、同余约分或渐近截断逐步写理由。",
    },
    {
      label: "精确样例门",
      detail:
        "《具体数学》第二版66坐标证据学习地图至少重放零规模、第一非平凡值、连续小规模和一个边界输入。",
    },
    {
      label: "单前提反例门",
      detail:
        "《具体数学》第二版66坐标证据学习地图只注入“把57个编号小节压缩成本站自造概念，或把授权样章误标成整书可访问”，并定位相对参考推导的首个失败步骤。",
    },
    {
      label: "证书、误差与未知门",
      detail:
        "《具体数学》第二版66坐标证据学习地图交付66坐标矩阵、章节依赖、来源身份、实验索引和缺口清单，同时保留余项、未证范围与竞争性解释。",
    },
  ],
} as const satisfies ConcreteMathEvidenceModel;

export function Cm2OfficialLearningMapIdentityContractLab() {
  return <ConcreteMathEvidenceLab model={model} view="identity-contract" />;
}

export function Cm2OfficialLearningMapExactWorkbenchLab() {
  return <ConcreteMathEvidenceLab model={model} view="exact-workbench" />;
}

export function Cm2OfficialLearningMapProofGateLab() {
  return <ConcreteMathEvidenceLab model={model} view="proof-gate" />;
}
