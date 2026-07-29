"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“代码声明要完成什么”开始",
    mechanism:
      "循环描述控制流：初始化index、判断边界、递增、分支、更新结果。算法描述意图：find、count、transform、partition、sort、reduce。两者最终都可能生成循环，但algorithm name让reviewer和compiler看到更稳定的semantic unit，也把…",
    failure:
      "若脱离基线与成本模型讨论「从“代码声明要完成什么”开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“代码声明要完成什么”开始」前后的时间和资源变化。",
  },
  {
    label: "algorithms operate on iterato…",
    mechanism:
      "经典generic algorithm接收 [first, last) ：first指向first element，last指向one past最后元素且不可dereference。empty range满足 first == last ，相邻ranges可用同一boundary拼接。算法操作ite…",
    failure:
      "若脱离基线与成本模型讨论「algorithms operate on iterato…」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「algorithms operate on iterato…」前后的时间和资源变化。",
  },
  {
    label: "predicate与custom comparator是契约",
    mechanism:
      "predicate不应依赖未声明的调用顺序或在比较过程中破坏range invariant。允许算法复制callable，所以mutable internal counters不能作为可靠业务结果；需要观测时显式引用stable state，并保证线程/执行策略下安全。pure、small concrete lambda通常更易inline和推理。",
    failure:
      "若脱离基线与成本模型讨论「predicate与custom comparator是契约」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「predicate与custom comparator是契约」前后的时间和资源变化。",
  },
];

export function StlAlgorithmsAndBeyondDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第6章：STL算法及其扩展：机制与证据"
      prompt="切换《第6章：STL算法及其扩展》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第6章：STL算法及其扩展》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StlAlgorithmsAndBeyondMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第6章：STL算法及其扩展：机制路径"
      stages={STAGES}
    />
  );
}

export function StlAlgorithmsAndBeyondFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第6章：STL算法及其扩展：失效与核验"
      stages={STAGES}
    />
  );
}
