"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "发布数据",
    mechanism: "普通写在 release store 之前 sequenced-before。",
    failure: "用 relaxed 标志发布非原子数据，消费者无可见性保证。",
    evidence: "线程内顺序、store memory order 与写集合。",
  },
  {
    label: "读取标志",
    mechanism: "acquire load 必须读到 release 或其 release sequence 中的值。",
    failure: "只看到标志为真就假设同步，却没有来源关系。",
    evidence: "read-from 关系与观测值。",
  },
  {
    label: "推导可见性",
    mechanism: "synchronizes-with 连接两线程，再由传递性形成 happens-before。",
    failure: "把 seq_cst 当性能标签，或在没有同步边时谈跨变量顺序。",
    evidence: "happens-before 图、litmus test 与汇编检查。",
  },
];

export function MemoryOrderingLab() {
  return (
    <ChapterDecisionLab
      title="release/acquire 如何建立 happens-before"
      prompt="沿发布线程和消费线程推导 sequenced-before、synchronizes-with 与可见性。"
      stages={STAGES}
      conclusion="内存序必须从跨线程不变量反推；只有读到对应 release 值的 acquire 才建立同步边。"
    />
  );
}

export function MemoryOrderingMechanismMap() {
  return (
    <ChapterMechanismMap
      title="release/acquire 如何建立 happens-before"
      stages={STAGES}
    />
  );
}

export function MemoryOrderingFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="release/acquire 如何建立 happens-before"
      stages={STAGES}
    />
  );
}
