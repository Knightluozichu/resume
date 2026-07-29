"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Error也必须成为可组合Data",
    mechanism:
      "Exception适合unexpected fault和跨层unwind，但routine validation、not-found、business rejection若全靠throw/catch，signature隐藏outcomes，caller也难以组合。Functional error h…",
    failure:
      "若把「为什么Error也必须成为可组合Data」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Error也必须成为可组合Data」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "A safer way to represent outc…",
    mechanism:
      "Option表示routine absence，Either/Result表示typed expected failure或success，Validation可积累independent errors；unexpected DB outage、bug或invariant corruption通常保…",
    failure:
      "若把「A safer way to represent outc…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「A safer way to represent outc…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Chaining operations that may …",
    mechanism:
      "Either的Right承载success，Left承载error。Map只转换Right；Bind接收 T - Either 并在Left short-circuit。Later operation只在前置依赖成功时运行，避免每步if/return。Recovery必须显式，不能用宽泛default吞error。",
    failure:
      "若把「Chaining operations that may …」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Chaining operations that may …」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function FunctionalErrorHandlingDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 6. Functional error handling：机制与证据"
      prompt="切换《Chapter 6. Functional error handling》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 6. Functional error handling》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FunctionalErrorHandlingMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 6. Functional error handling：机制路径"
      stages={STAGES}
    />
  );
}

export function FunctionalErrorHandlingFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 6. Functional error handling：失效与核验"
      stages={STAGES}
    />
  );
}
