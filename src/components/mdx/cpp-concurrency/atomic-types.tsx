"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "选择原子对象",
    mechanism: "并发读写同一内存位置时，用合适的 atomic 类型消除数据竞争。",
    failure: "普通变量并发读写触发未定义行为，而不只是偶尔撕裂。",
    evidence: "TSan、类型声明与访问点清单。",
  },
  {
    label: "执行读改写",
    mechanism: "fetch_add 等原子读改写在单一修改顺序中占一个位置。",
    failure: "load 后计算再 store 被误当成原子复合更新。",
    evidence: "丢失更新测试与 modification order 推导。",
  },
  {
    label: "处理 CAS",
    mechanism:
      "compare_exchange 失败会更新 expected，weak 允许伪失败并通常循环。",
    failure: "失败后仍用旧 expected，或假设 atomic 一定 lock-free。",
    evidence: "重试次数、is_lock_free 与状态不变量。",
  },
];

export function AtomicTypesLab() {
  return (
    <ChapterDecisionLab
      title="原子对象的修改顺序与 CAS 重试"
      prompt="切换原子操作阶段，区分单对象原子性、修改顺序和无锁实现。"
      stages={STAGES}
      conclusion="std::atomic 保证操作语义，不自动保证整个算法正确或实现无锁；CAS 失败路径同样属于协议。"
    />
  );
}

export function AtomicTypesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="原子对象的修改顺序与 CAS 重试"
      stages={STAGES}
    />
  );
}

export function AtomicTypesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="原子对象的修改顺序与 CAS 重试"
      stages={STAGES}
    />
  );
}
