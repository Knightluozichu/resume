"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么总复习不是再背一遍术语",
    mechanism:
      "第一版15章形成一条工程链：函数成为typed values，purity让局部推理成立，patterns与composition组装程序，typed errors和immutable data管理expected变化，event/state保存历史，lazy/async/stream/messag…",
    failure:
      "若把「为什么总复习不是再背一遍术语」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么总复习不是再背一遍术语」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "从Chapter 1到15的一条主线",
    mechanism:
      "第1–3章回答“函数是什么、可信条件是什么、signature说了什么”；第4–5章回答“怎样组合”；第6–8章回答“失败、依赖与多参数context怎样组合”；第9–10章回答“数据、identity、history怎样保留”；第11–15章回答“evaluation、resource、state、async、stream、mailbox怎样结束和恢复”。",
    failure:
      "若把「从Chapter 1到15的一条主线」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「从Chapter 1到15的一条主线」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Value and signature gate",
    mechanism:
      "先检查domain values能否表示illegal state。Option表达absence，Either表达一种expected failure channel，Validation可累积independent errors；不要用null、magic string或catch-all Ex…",
    failure:
      "若把「Value and signature gate」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Value and signature gate」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function CfpFinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="总复习：第一版十五章工程验收：机制与证据"
      prompt="切换《总复习：第一版十五章工程验收》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《总复习：第一版十五章工程验收》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CfpFinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="总复习：第一版十五章工程验收：机制路径"
      stages={STAGES}
    />
  );
}

export function CfpFinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="总复习：第一版十五章工程验收：失效与核验"
      stages={STAGES}
    />
  );
}
