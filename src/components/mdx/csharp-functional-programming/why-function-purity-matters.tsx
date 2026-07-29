"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Purity是可替换性而不是道德标签",
    mechanism:
      "Pure function的价值不是“看起来干净”，而是caller可只凭inputs推理output：相同input给相同result，evaluation不修改外部可观察state。于是call可以被result替换、重复/缓存/并行更容易保持语义。Impure operation不是坏代码；I/O是系统目的之一，但需要隔离和拥有者。",
    failure:
      "若把「为什么Purity是可替换性而不是道德标签」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Purity是可替换性而不是道德标签」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "What is function purity?",
    mechanism:
      "Purity有两面：deterministic mapping与absence of side effects。Clock、random、environment variable、database read是hidden inputs；file/database write、mutation、log…",
    failure:
      "若把「What is function purity?」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「What is function purity?」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Purity and concurrency",
    mechanism: "Concurrency困难来自多个executions共享mutable state。",
    failure:
      "若把「Purity and concurrency」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Purity and concurrency」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function WhyFunctionPurityMattersDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 2. Why function purity matters：机制与证据"
      prompt="切换《Chapter 2. Why function purity matters》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 2. Why function purity matters》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function WhyFunctionPurityMattersMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 2. Why function purity matters：机制路径"
      stages={STAGES}
    />
  );
}

export function WhyFunctionPurityMattersFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 2. Why function purity matters：失效与核验"
      stages={STAGES}
    />
  );
}
