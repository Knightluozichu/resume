"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "分类症状",
    mechanism: "无进展先区分阻塞等待、循环重试和单纯缓慢；错误结果再查竞争。",
    failure: "把活锁当死锁，或把条件竞争等同于 data race。",
    evidence: "线程 dump、CPU 使用率与进度计数。",
  },
  {
    label: "运行检测",
    mechanism: "TSan 发现未同步冲突，压力与故障注入扩大稀有交错。",
    failure: "加日志改变时序后 bug 消失，就认为已经修复。",
    evidence: "sanitizer 报告、随机种子与事件 trace。",
  },
  {
    label: "验证修复",
    mechanism: "修复后同时检查正确性、不变量、吞吐和尾延迟。",
    failure: "用一把大锁消除报错，却让系统失去进展或性能。",
    evidence: "回归矩阵、锁等待与基准对比。",
  },
];

export function ConcurrencyTestingLab() {
  return (
    <ChapterDecisionLab
      title="并发缺陷分类与证据组合"
      prompt="从症状出发区分数据竞争、条件竞争、死锁、活锁和性能退化。"
      stages={STAGES}
      conclusion="并发测试的目标不是固定一种时序，而是在许多合法时序中持续验证不变量，并保留可复现证据。"
    />
  );
}

export function ConcurrencyTestingMechanismMap() {
  return <ChapterMechanismMap title="并发缺陷分类与证据组合" stages={STAGES} />;
}

export function ConcurrencyTestingFailureDiagram() {
  return (
    <ChapterFailureMatrix title="并发缺陷分类与证据组合" stages={STAGES} />
  );
}
