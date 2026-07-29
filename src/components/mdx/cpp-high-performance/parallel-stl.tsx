"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“可拆分、可独立、可合并”开始",
    mechanism:
      "parallel algorithm只有在work能拆成足够大的independent chunks、每个chunk执行不互相冲突、partial results能低成本合并时才可能加速。并行化同时引入task creation、scheduling、synchronization、cache co…",
    failure:
      "若脱离基线与成本模型讨论「从“可拆分、可独立、可合并”开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“可拆分、可独立、可合并”开始」前后的时间和资源变化。",
  },
  {
    label: "parallel transform与grain size",
    mechanism:
      "parallel transform可把input range切成chunks，每个task在相同offset的output区间写独占元素，因此通常无需per-element lock。正确性要求input/output overlap符合algorithm contract，callable能并发…",
    failure:
      "若脱离基线与成本模型讨论「parallel transform与grain size」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「parallel transform与grain size」前后的时间和资源变化。",
  },
  {
    label: "parallel count if是reduction",
    mechanism:
      "count if没有独立output positions，只需每个chunk计算local count，最后reduce partial counts。让所有threads每匹配一次就increment同一atomic会产生contention；local accumulator避免hot cache line，合并只与chunk数相关。",
    failure:
      "若脱离基线与成本模型讨论「parallel count if是reduction」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「parallel count if是reduction」前后的时间和资源变化。",
  },
];

export function ParallelStlDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第11章：Parallel STL：机制与证据"
      prompt="切换《第11章：Parallel STL》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第11章：Parallel STL》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ParallelStlMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第11章：Parallel STL：机制路径"
      stages={STAGES}
    />
  );
}

export function ParallelStlFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第11章：Parallel STL：失效与核验"
      stages={STAGES}
    />
  );
}
