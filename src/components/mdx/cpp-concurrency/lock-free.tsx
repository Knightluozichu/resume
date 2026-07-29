"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "确定线性化点",
    mechanism: "一次成功 CAS 决定操作在全局历史中的生效位置。",
    failure: "多个字段分步更新，却没有唯一可观察的提交点。",
    evidence: "CAS 成功事件与顺序历史检查。",
  },
  {
    label: "处理竞争失败",
    mechanism: "CAS 失败后重读真实状态并重新计算候选更新。",
    failure: "无限重试没有退避或帮助机制，线程持续占用 CPU。",
    evidence: "失败率、重试分布与 progress 测试。",
  },
  {
    label: "安全回收节点",
    mechanism: "hazard pointer、引用计数或 epoch 保证读者结束前节点不释放。",
    failure: "pop 后立即 delete，另一个线程仍持有旧地址；ABA 又让 CAS 误判。",
    evidence: "回收队列、地址版本与 ASan 压测。",
  },
];

export function LockFreeStructuresLab() {
  return (
    <ChapterDecisionLab
      title="无锁进展、CAS 循环与安全回收"
      prompt="沿无锁操作检查线性化点、失败重试、ABA 和节点回收。"
      stages={STAGES}
      conclusion="去掉 mutex 只是开始；无锁结构必须同时证明线性化、进展保证和对象寿命。"
    />
  );
}

export function LockFreeStructuresMechanismMap() {
  return (
    <ChapterMechanismMap title="无锁进展、CAS 循环与安全回收" stages={STAGES} />
  );
}

export function LockFreeStructuresFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="无锁进展、CAS 循环与安全回收"
      stages={STAGES}
    />
  );
}
