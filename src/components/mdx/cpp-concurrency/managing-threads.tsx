"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "创建线程",
    mechanism: "按值复制或用显式引用包装传参，确保被引用对象活过线程执行。",
    failure: "临时对象和栈引用在线程启动后已失效。",
    evidence: "类型检查、对象寿命图与 sanitizer。",
  },
  {
    label: "转移所有权",
    mechanism: "thread 可移动不可复制，owner 变化必须在控制流中可见。",
    failure: "线程对象被覆盖或离开作用域时仍 joinable，触发 terminate。",
    evidence: "joinable 断言、move 路径与异常测试。",
  },
  {
    label: "结束线程",
    mechanism: "join 建立等待关系；detach 只有在独立寿命和退出策略明确时使用。",
    failure: "异常跳过 join，或 detached 线程访问已销毁状态。",
    evidence: "RAII joiner、停止日志与 shutdown 测试。",
  },
];

export function ManagingThreadsLab() {
  return (
    <ChapterDecisionLab
      title="线程所有权、参数传递与结束协议"
      prompt="沿线程生命周期检查谁负责 join、对象能活多久、异常路径怎样收尾。"
      stages={STAGES}
      conclusion="std::thread 是一种必须消费的所有权；代码需要在创建时就证明参数寿命和 join/detach 决策。"
    />
  );
}

export function ManagingThreadsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="线程所有权、参数传递与结束协议"
      stages={STAGES}
    />
  );
}

export function ManagingThreadsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="线程所有权、参数传递与结束协议"
      stages={STAGES}
    />
  );
}
