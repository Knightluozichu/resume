"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Persistence也可以保存Change而不只保…",
    mechanism:
      "传统CRUD覆盖latest row，过去发生什么需另建audit。Event sourcing把domain facts append为immutable log，current state由ordered events fold得到。它天然适合functional transition/repl…",
    failure:
      "若把「为什么Persistence也可以保存Change而不只保…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Persistence也可以保存Change而不只保…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Thinking functionally about d…",
    mechanism:
      "Functional view把storage reads当facts/snapshots，把writes当new facts/versions，而非远程mutable variables。Overwrite简单、query直接；immutable snapshots保留versions；event…",
    failure:
      "若把「Thinking functionally about d…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Thinking functionally about d…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Event sourcing basics",
    mechanism:
      "核心分两functions： Fold(initial, events) - state 与 Decide(state, command) - events/error 。Apply event应deterministic且无I/O；Decide只产生facts，不append。Shell load…",
    failure:
      "若把「Event sourcing basics」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Event sourcing basics」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function EventSourcingFunctionalPersistenceDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 10. Event sourcing: a functional approach to persistence：机制与证据"
      prompt="切换《Chapter 10. Event sourcing: a functional approach to persistence》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 10. Event sourcing: a functional approach to persistence》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function EventSourcingFunctionalPersistenceMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 10. Event sourcing: a functional approach to persistence：机制路径"
      stages={STAGES}
    />
  );
}

export function EventSourcingFunctionalPersistenceFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 10. Event sourcing: a functional approach to persistence：失效与核验"
      stages={STAGES}
    />
  );
}
