"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“高性能不是最快的一行代码”开始",
    mechanism:
      "C++ 适合 performance-critical system，不是因为每段 C++ 自动最快，而是它允许 programmer 选择 representation、lifetime、allocation 和 dispatch，同时保留高层 abstraction。真正目标是：在可维护、可移植…",
    failure:
      "若脱离基线与成本模型讨论「从“高性能不是最快的一行代码”开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“高性能不是最快的一行代码”开始」前后的时间和资源变化。",
  },
  {
    label: "为什么选择C++",
    mechanism:
      "C++ 同时提供 value types、deterministic destruction、generic programming、manual or automatic ownership 和直接调用系统 API 的能力。它可以构建 tiny embedded path、realtime aud…",
    failure:
      "若脱离基线与成本模型讨论「为什么选择C++」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「为什么选择C++」前后的时间和资源变化。",
  },
  {
    label: "零成本抽象与机器码",
    mechanism:
      "language abstractions 最终被 lowered 到 target instructions，但源码结构与 machine code 不一一对应。as-if rule 允许 compiler inline、constant-fold、vectorize、eliminate temp…",
    failure:
      "若脱离基线与成本模型讨论「零成本抽象与机器码」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「零成本抽象与机器码」前后的时间和资源变化。",
  },
];

export function BriefIntroductionToCppDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第1章：C++概览与性能契约：机制与证据"
      prompt="切换《第1章：C++概览与性能契约》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第1章：C++概览与性能契约》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function BriefIntroductionToCppMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第1章：C++概览与性能契约：机制路径"
      stages={STAGES}
    />
  );
}

export function BriefIntroductionToCppFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第1章：C++概览与性能契约：失效与核验"
      stages={STAGES}
    />
  );
}
