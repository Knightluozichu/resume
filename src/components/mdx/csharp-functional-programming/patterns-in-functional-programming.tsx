"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么先按Function Shape学习Pattern",
    mechanism:
      "Map、Bind、Where不是神秘术语，而是反复出现的function/container shapes。看到 F 时先问传入function返回plain value、bool、effect还是另一个 F ，就能推导result structure。背extension names不如掌握sha…",
    failure:
      "若把「为什么先按Function Shape学习Pattern」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么先按Function Shape学习Pattern」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Applying a function to a stru…",
    mechanism:
      "Map接收 T - R ，在不改变structure kind的前提下把 F 转成 F 。IEnumerable Map是Select，对每个element产生R；Option Map只在Some时调用，None保持None。Map不负责flatten，也不应执行与result无关的effect。",
    failure:
      "若把「Applying a function to a stru…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Applying a function to a stru…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Performing side effects with …",
    mechanism:
      "ForEach遍历inner values执行side effect，返回void/Unit或原structure外的completion；它不是pure Map。把logging、DB write塞进Select会产生“result被忽略”的伪Map，execution timing还可能因deferred sequence变化。",
    failure:
      "若把「Performing side effects with …」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Performing side effects with …」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function PatternsInFunctionalProgrammingDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 4. Patterns in functional programming：机制与证据"
      prompt="切换《Chapter 4. Patterns in functional programming》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 4. Patterns in functional programming》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function PatternsInFunctionalProgrammingMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 4. Patterns in functional programming：机制路径"
      stages={STAGES}
    />
  );
}

export function PatternsInFunctionalProgrammingFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 4. Patterns in functional programming：失效与核验"
      stages={STAGES}
    />
  );
}
