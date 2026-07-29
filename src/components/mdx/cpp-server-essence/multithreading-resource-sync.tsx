"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "提交任务",
    mechanism: "队列在同一同步协议下发布任务和唤醒 worker。",
    failure: "通知先于状态发布，worker 醒来却看不到任务。",
    evidence: "队列长度、条件谓词与 happens-before 推导。",
  },
  {
    label: "更新共享状态",
    mechanism: "mutex 保护复合不变量，atomic 只承担明确的单变量协议。",
    failure: "把多字段事务拆成几个原子变量，读者观察到混合状态。",
    evidence: "锁域审计、竞争检测与状态断言。",
  },
  {
    label: "停止线程池",
    mechanism: "关闭标志、剩余任务和 join 顺序形成可重复的 shutdown protocol。",
    failure: "主线程销毁队列时 worker 仍在访问，或 join 永久等待。",
    evidence: "停止时序日志、超时测试与 sanitizer。",
  },
];

export function ServerSynchronizationLab() {
  return (
    <ChapterDecisionLab
      title="线程同步原语与任务队列选择"
      prompt="沿任务进入、共享状态更新和线程退出三个阶段判断同步关系。"
      stages={STAGES}
      conclusion="同步原语的选择必须来自状态不变量和等待条件；线程越多并不自动提高吞吐。"
    />
  );
}

export function ServerSynchronizationMechanismMap() {
  return (
    <ChapterMechanismMap title="线程同步原语与任务队列选择" stages={STAGES} />
  );
}

export function ServerSynchronizationFailureDiagram() {
  return (
    <ChapterFailureMatrix title="线程同步原语与任务队列选择" stages={STAGES} />
  );
}
