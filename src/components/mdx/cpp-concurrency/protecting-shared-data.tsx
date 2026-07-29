"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "圈定不变量",
    mechanism: "把必须一起观察和更新的字段放入同一保护域。",
    failure: "每个字段各自安全，但组合状态出现不可能取值。",
    evidence: "状态断言、锁域图与竞争检测。",
  },
  {
    label: "设计原子接口",
    mechanism: "把检查与操作合成一次调用，并避免返回受保护对象的裸引用。",
    failure: "empty/top/pop 分离导致检查后状态已变化。",
    evidence: "并发接口测试与引用逃逸审计。",
  },
  {
    label: "避免死锁",
    mechanism: "多锁操作使用统一顺序或 scoped_lock 一次取得。",
    failure: "不同路径反向持锁形成环形等待。",
    evidence: "锁顺序表、wait-for graph 与超时 dump。",
  },
];

export function ProtectingSharedDataLab() {
  return (
    <ChapterDecisionLab
      title="共享不变量、锁域与死锁关系"
      prompt="选择共享数据访问阶段，验证锁保护的是完整不变量而不是单个语句。"
      stages={STAGES}
      conclusion="互斥量的价值是保护不变量；如果接口把检查和修改拆开，内部每个函数加锁仍可能产生竞态。"
    />
  );
}

export function ProtectingSharedDataMechanismMap() {
  return (
    <ChapterMechanismMap title="共享不变量、锁域与死锁关系" stages={STAGES} />
  );
}

export function ProtectingSharedDataFailureDiagram() {
  return (
    <ChapterFailureMatrix title="共享不变量、锁域与死锁关系" stages={STAGES} />
  );
}
