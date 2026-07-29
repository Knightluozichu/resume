"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "划分任务",
    mechanism: "按数据块、递归子问题或流水线阶段切分，并标出依赖。",
    failure: "强依赖任务被硬拆，线程大部分时间互相等待。",
    evidence: "任务 DAG、关键路径与负载分布。",
  },
  {
    label: "布局数据",
    mechanism: "让每个线程主要访问自己的缓存行并保持数据接近。",
    failure: "不同变量落在同一缓存行，产生 false sharing。",
    evidence: "cache miss、行失效与对齐实验。",
  },
  {
    label: "评估扩展",
    mechanism: "用串行比例和实测开销解释速度上限，避免超额订阅。",
    failure: "只报告单次加速比，不测核数曲线和尾延迟。",
    evidence: "scaling curve、Amdahl 估算与上下文切换。",
  },
];

export function DesigningConcurrentCodeLab() {
  return (
    <ChapterDecisionLab
      title="任务划分、缓存局部性与可伸缩性"
      prompt="选择设计层级，判断瓶颈来自串行比例、同步、缓存还是过度并行。"
      stages={STAGES}
      conclusion="并发设计先优化关键路径和数据布局，再决定线程数；核数不能突破串行部分和共享瓶颈。"
    />
  );
}

export function DesigningConcurrentCodeMechanismMap() {
  return (
    <ChapterMechanismMap
      title="任务划分、缓存局部性与可伸缩性"
      stages={STAGES}
    />
  );
}

export function DesigningConcurrentCodeFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="任务划分、缓存局部性与可伸缩性"
      stages={STAGES}
    />
  );
}
