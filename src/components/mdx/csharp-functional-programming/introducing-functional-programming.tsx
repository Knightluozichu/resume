"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Functional Programming先改变思…",
    mechanism:
      "Imperative code常把“做什么、按什么顺序、改了谁”写在同一块；functional style尝试把behavior当value，把data transition写成从input到output的mapping，把不可避免的I/O留给明确boundary。重点不是禁止class、loop…",
    failure:
      "若把「为什么Functional Programming先改变思…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Functional Programming先改变思…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "What is this thing called fun…",
    mechanism:
      "本书用三条可操作特征切入：functions as first-class values、avoiding state mutation、writing programs with strong guarantees。First-class让依赖behavior不必硬编码；immutable tra…",
    failure:
      "若把「What is this thing called fun…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「What is this thing called fun…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "How functional a language is …",
    mechanism:
      "C 是multi-paradigm language。Delegates/lambdas把functions变成values，LINQ提供Map/Filter/Bind-like composition，generics表达container operations，C 6/7又加入expressio…",
    failure:
      "若把「How functional a language is …」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「How functional a language is …」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function IntroducingFunctionalProgrammingDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 1. Introducing functional programming：机制与证据"
      prompt="切换《Chapter 1. Introducing functional programming》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 1. Introducing functional programming》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function IntroducingFunctionalProgrammingMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 1. Introducing functional programming：机制路径"
      stages={STAGES}
    />
  );
}

export function IntroducingFunctionalProgrammingFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 1. Introducing functional programming：失效与核验"
      stages={STAGES}
    />
  );
}
