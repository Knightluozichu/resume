"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“结果何时必须成为真实对象”开始",
    mechanism:
      "eager evaluation在表达式出现时立即计算并产生结果；lazy evaluation先保存operation与operands，只有consumer真正请求value时才计算。惰性可以跳过未使用结果、融合多个operation、减少temporary和expensive work，但也会…",
    failure:
      "若脱离基线与成本模型讨论「从“结果何时必须成为真实对象”开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“结果何时必须成为真实对象”开始」前后的时间和资源变化。",
  },
  {
    label: "proxy objects保存“如何得到值”",
    mechanism:
      "proxy objects表现得像目标value或reference，却内部保存operation、operand handles或compressed state。标准库中 vector ::reference 是bit proxy，expression template node也是value …",
    failure:
      "若脱离基线与成本模型讨论「proxy objects保存“如何得到值”」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「proxy objects保存“如何得到值”」前后的时间和资源变化。",
  },
  {
    label: "concatenated strings与temporar…",
    mechanism:
      "连续string operator+ 的直觉实现会为每个中间结果取得storage并复制prefix；但现代library可利用rvalue overload、move、capacity和small-string optimization，不能声称每个加号必然allocate。可靠baseline是…",
    failure:
      "若脱离基线与成本模型讨论「concatenated strings与temporar…」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「concatenated strings与temporar…」前后的时间和资源变化。",
  },
];

export function ProxyObjectsLazyEvaluationDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第9章：代理对象与惰性求值：机制与证据"
      prompt="切换《第9章：代理对象与惰性求值》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第9章：代理对象与惰性求值》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ProxyObjectsLazyEvaluationMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第9章：代理对象与惰性求值：机制路径"
      stages={STAGES}
    />
  );
}

export function ProxyObjectsLazyEvaluationFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第9章：代理对象与惰性求值：失效与核验"
      stages={STAGES}
    />
  );
}
