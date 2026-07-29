"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“现代语法是否保留了性能意图”开始",
    mechanism:
      "现代 C++ 技术的共同目标不是缩短代码，而是把 type、ownership、absence 和 callable behavior 更准确地交给 compiler。",
    failure:
      "若脱离基线与成本模型讨论「从“现代语法是否保留了性能意图”开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“现代语法是否保留了性能意图”开始」前后的时间和资源变化。",
  },
  {
    label: "auto变量与函数签名",
    mechanism:
      "plain auto 使用近似 template-by-value deduction：top-level const/reference 通常被丢弃，得到 independent value。",
    failure:
      "若脱离基线与成本模型讨论「auto变量与函数签名」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「auto变量与函数签名」前后的时间和资源变化。",
  },
  {
    label: "lambda是匿名closure类型",
    mechanism:
      "每个 lambda expression 产生独一无二、编译器生成的 closure type；capture 成为 closure object 的 state， operator() 实现 body。capture-by-value 在创建 closure 时保存值，capture-by-ref…",
    failure:
      "若脱离基线与成本模型讨论「lambda是匿名closure类型」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「lambda是匿名closure类型」前后的时间和资源变化。",
  },
];

export function ModernCppConceptsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第2章：现代C++核心技术：机制与证据"
      prompt="切换《第2章：现代C++核心技术》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第2章：现代C++核心技术》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ModernCppConceptsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第2章：现代C++核心技术：机制路径"
      stages={STAGES}
    />
  );
}

export function ModernCppConceptsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第2章：现代C++核心技术：失效与核验"
      stages={STAGES}
    />
  );
}
