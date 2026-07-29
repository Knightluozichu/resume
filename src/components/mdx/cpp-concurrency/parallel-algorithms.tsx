"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "选择策略",
    mechanism: "seq、par 与 par_unseq 分别允许不同并发和向量化自由。",
    failure: "par_unseq 中加锁或执行不安全的阻塞操作。",
    evidence: "策略约束、工具链支持与线程观测。",
  },
  {
    label: "验证运算律",
    mechanism: "reduce 的合并操作要满足结合性，并接受不同分组顺序。",
    failure: "用浮点或非结合操作期待与串行逐项完全相同。",
    evidence: "随机分块、误差界与结果不变量。",
  },
  {
    label: "衡量收益",
    mechanism: "数据规模、单项成本和内存带宽共同决定是否加速。",
    failure: "小输入无脑并行，调度成本超过计算。",
    evidence: "规模曲线、带宽指标与串行基线。",
  },
];

export function ParallelAlgorithmsLab() {
  return (
    <ChapterDecisionLab
      title="执行策略、归约律与并行收益"
      prompt="选择算法阶段，判断 callable 是否线程安全、归约是否可重排、数据规模是否值得并行。"
      stages={STAGES}
      conclusion="执行策略授权实现改变调度和顺序；只有无共享副作用且满足代数约束的操作才可安全并行。"
    />
  );
}

export function ParallelAlgorithmsMechanismMap() {
  return (
    <ChapterMechanismMap title="执行策略、归约律与并行收益" stages={STAGES} />
  );
}

export function ParallelAlgorithmsFailureDiagram() {
  return (
    <ChapterFailureMatrix title="执行策略、归约律与并行收益" stages={STAGES} />
  );
}
