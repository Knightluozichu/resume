"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Data最难的不是存什么，而是谁能改",
    mechanism:
      "Mutable object把identity和current state放在同一个reference里；任何alias都可观察/触发变化，reasoning需要知道所有writers和order。Functional data view把state当value，change产生new versio…",
    failure:
      "若把「为什么Data最难的不是存什么，而是谁能改」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Data最难的不是存什么，而是谁能改」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "The pitfalls of state mutation",
    mechanism:
      "Mutation引入temporal coupling：结果取决于“谁先改”。Concurrent writes需要locks/version checks；tests需复杂fixture；cache key或hash collection中的mutable key会破坏lookup。Encapsu…",
    failure:
      "若把「The pitfalls of state mutation」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「The pitfalls of state mutation」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Understanding state, identity…",
    mechanism:
      "Value由contents决定sameness；entity由stable domain id跨versions保持identity；event是已发生fact，有自己的id/order；object reference只说明runtime allocation相同。把这四者混淆会导致错误equa…",
    failure:
      "若把「Understanding state, identity…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Understanding state, identity…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function ThinkingAboutDataFunctionallyDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 9. Thinking about data functionally：机制与证据"
      prompt="切换《Chapter 9. Thinking about data functionally》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 9. Thinking about data functionally》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ThinkingAboutDataFunctionallyMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 9. Thinking about data functionally：机制路径"
      stages={STAGES}
    />
  );
}

export function ThinkingAboutDataFunctionallyFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 9. Thinking about data functionally：失效与核验"
      stages={STAGES}
    />
  );
}
