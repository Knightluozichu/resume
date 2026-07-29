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
    mechanism:
      "packaged_task 把 callable 与 future 结果绑定，关闭后拒绝新任务。",
    failure: "任务入队失败却返回永不就绪的 future。",
    evidence: "提交状态、队列结果与 broken promise 测试。",
  },
  {
    label: "调度执行",
    mechanism: "worker 优先本地队列，空闲时窃取其他队列尾部以平衡负载。",
    failure: "所有线程争用一个全局队列，或池内互等 future 造成饥饿。",
    evidence: "队列长度、窃取次数与阻塞栈。",
  },
  {
    label: "停止线程池",
    mechanism: "停止信号、排空策略、任务取消和 join 顺序构成单一协议。",
    failure: "析构时仍接收任务，或强杀正在持锁的 worker。",
    evidence: "shutdown trace、未完成任务数与重复停止测试。",
  },
];

export function ThreadPoolDesignLab() {
  return (
    <ChapterDecisionLab
      title="线程池提交、调度与停止协议"
      prompt="沿任务生命周期检查队列争用、future 结果、工作窃取和协作停止。"
      stages={STAGES}
      conclusion="线程池是任务所有权系统；提交失败、任务异常和关闭时未完成工作都必须有明确结果。"
    />
  );
}

export function ThreadPoolDesignMechanismMap() {
  return (
    <ChapterMechanismMap title="线程池提交、调度与停止协议" stages={STAGES} />
  );
}

export function ThreadPoolDesignFailureDiagram() {
  return (
    <ChapterFailureMatrix title="线程池提交、调度与停止协议" stages={STAGES} />
  );
}
