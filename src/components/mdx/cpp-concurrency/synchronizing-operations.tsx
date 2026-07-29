"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "进入等待",
    mechanism: "condition_variable::wait 在同一 mutex 下反复检查谓词。",
    failure: "无谓词等待遭遇虚假唤醒，或检查与入睡之间丢通知。",
    evidence: "谓词状态、锁持有与等待时序。",
  },
  {
    label: "发布结果",
    mechanism: "先修改受保护状态，再通知等待者；promise 可传值或异常。",
    failure: "只发通知不改状态，或 promise 被销毁未给结果。",
    evidence: "状态日志、broken_promise 与通知计数。",
  },
  {
    label: "消费结果",
    mechanism: "future 只 get 一次，shared_future 用于多方只读等待。",
    failure: "重复 get，或 deferred async 从未被等待而不执行。",
    evidence: "future 状态、launch policy 与超时测试。",
  },
];

export function SynchronizingOperationsLab() {
  return (
    <ChapterDecisionLab
      title="条件等待与一次性结果传递"
      prompt="沿等待、发布和取结果阶段检查条件变量与 future 的同步语义。"
      stages={STAGES}
      conclusion="等待必须围绕可重复检查的状态谓词；通知和 future 只是传递进展，不能替代状态本身。"
    />
  );
}

export function SynchronizingOperationsMechanismMap() {
  return (
    <ChapterMechanismMap title="条件等待与一次性结果传递" stages={STAGES} />
  );
}

export function SynchronizingOperationsFailureDiagram() {
  return (
    <ChapterFailureMatrix title="条件等待与一次性结果传递" stages={STAGES} />
  );
}
