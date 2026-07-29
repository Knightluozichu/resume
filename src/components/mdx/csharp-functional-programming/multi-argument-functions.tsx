"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Multi-Argument Function遇到C…",
    mechanism:
      "普通 Func 接plain A/B；现实中inputs常是Option A、Validation B、Task A。先unwrap再if会重复control flow。Applicative Apply把elevated function用于elevated values，Bind处理later …",
    failure:
      "若把「为什么Multi-Argument Function遇到C…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Multi-Argument Function遇到C…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Function application in the e…",
    mechanism:
      "Map处理一个elevated value；Apply处理elevated function和elevated argument，多次Apply可组合multi-arg function。Independent field validations可全部运行并积累error。Bind适合functio…",
    failure:
      "若把「Function application in the e…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Function application in the e…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Functors, applicatives, monads",
    mechanism:
      "Functor提供Map；applicative增加pure/lift与Apply；monad增加Bind。它们是能力层级和laws，不是class inheritance要求。一个context可以有Map/Apply/Bind，但若实现不满足laws，重构/组合会改变semantics。",
    failure:
      "若把「Functors, applicatives, monads」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Functors, applicatives, monads」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function MultiArgumentFunctionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 8. Working effectively with multi-argument functions：机制与证据"
      prompt="切换《Chapter 8. Working effectively with multi-argument functions》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 8. Working effectively with multi-argument functions》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function MultiArgumentFunctionsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 8. Working effectively with multi-argument functions：机制路径"
      stages={STAGES}
    />
  );
}

export function MultiArgumentFunctionsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 8. Working effectively with multi-argument functions：失效与核验"
      stages={STAGES}
    />
  );
}
