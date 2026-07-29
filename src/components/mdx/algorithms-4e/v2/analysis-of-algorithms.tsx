"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-1.4",
  title: "1.4 · Analysis of Algorithms",
  focus:
    "把计时实验、数学模型、增长数量级、内存模型和更快算法放进同一可证伪预测",
  formula:
    "T(N) ≈ aN^b；doubling ratio ≈ 2^b；ThreeSum 暴力模型约为 N^3 / 6 次三元检查",
  invariant:
    "比较实现时必须固定输入分布、机器、JVM、预热、计数单位与正确性预言机",
  fault: "只取最快一次墙钟时间，或在扩大 N 时同时改变数据分布与实现版本",
  evidence:
    "数据集哈希、N、基本操作计数、预热轮次、时间分布、拟合残差与输出校验",
  concepts: [
    "analysis of algorithms",
    "算法分析",
    "scientific method",
    "科学方法",
    "mathematical models",
    "数学模型",
    "order of growth",
    "增长数量级",
    "designing faster algorithms",
    "设计更快算法",
    "memory usage",
    "内存使用",
  ],
  trace: [
    "提出增长假设",
    "选择基本操作",
    "做倍增实验",
    "拟合幂律模型",
    "检查残差与反例",
  ],
  scenarios: [
    {
      label: "倍增实验",
      input: "固定生成器，把 N 从 1k 依次翻倍到 8k",
      expected: "比值趋近 2、4、8 时分别提示线性、平方、立方主导项",
    },
    {
      label: "成本计数",
      input: "对同一 ThreeSum 输入同时记录三元组检查数和墙钟时间",
      expected: "先核对操作计数模型，再解释计时中的常数与系统噪声",
    },
  ],
} satisfies Algs4SectionModel;

export function AnalysisOfAlgorithmsModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function AnalysisOfAlgorithmsTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function AnalysisOfAlgorithmsCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
