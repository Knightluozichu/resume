"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Application Structure可以是Fu…",
    mechanism:
      "传统application用mutable service objects保存dependencies；functional approach也需要dependency wiring，只是把dependencies作为parameters，再在startup部分应用，得到只接request的func…",
    failure:
      "若把「为什么Application Structure可以是Fu…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Application Structure可以是Fu…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Partial application: supplyin…",
    mechanism:
      "给 (Config, Store, Request) - Response 先传Config/Store，得到 Request - Response 。稳定dependencies在composition root固定，变化data在runtime传入。Closure保存dependency ref…",
    failure:
      "若把「Partial application: supplyin…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Partial application: supplyin…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Overcoming the quirks of meth…",
    mechanism:
      "C method group不是独立value，需target delegate决定overload/generic inference。Partial helper遇overloaded method时可能ambiguous；用显式 Func 、adapter lambda或domain-name…",
    failure:
      "若把「Overcoming the quirks of meth…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Overcoming the quirks of meth…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function StructuringAnApplicationWithFunctionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 7. Structuring an application with functions：机制与证据"
      prompt="切换《Chapter 7. Structuring an application with functions》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 7. Structuring an application with functions》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StructuringAnApplicationWithFunctionsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 7. Structuring an application with functions：机制路径"
      stages={STAGES}
    />
  );
}

export function StructuringAnApplicationWithFunctionsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 7. Structuring an application with functions：失效与核验"
      stages={STAGES}
    />
  );
}
