"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "识别独立工作",
    mechanism: "先找能并行推进且不依赖同一可变状态的工作单元。",
    failure: "把强顺序流程硬拆成线程，只增加等待和同步。",
    evidence: "依赖图、串行基线与关键路径。",
  },
  {
    label: "估算并发成本",
    mechanism: "线程创建、切换、同步和缓存迁移都要计入总时间。",
    failure: "只比较核心计算，忽略小任务的调度开销。",
    evidence: "端到端基准、上下文切换与 CPU 利用率。",
  },
  {
    label: "定义正确性",
    mechanism: "输出必须在所有合法调度下满足同一不变量。",
    failure: "一次运行正确就宣布线程安全。",
    evidence: "重复压力测试、竞争检测与结果不变量。",
  },
];

export function HelloConcurrencyLab() {
  return (
    <ChapterDecisionLab
      title="并发收益、成本与任务边界"
      prompt="切换评估阶段，判断一个任务是否值得并发，以及速度提升会被什么限制。"
      stages={STAGES}
      conclusion="并发不是默认加速开关；只有任务可分、共享边界清楚且调度成本可控时，多线程才产生净收益。"
    />
  );
}

export function HelloConcurrencyMechanismMap() {
  return (
    <ChapterMechanismMap title="并发收益、成本与任务边界" stages={STAGES} />
  );
}

export function HelloConcurrencyFailureDiagram() {
  return (
    <ChapterFailureMatrix title="并发收益、成本与任务边界" stages={STAGES} />
  );
}
