"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Async的难点不是少写Callback",
    mechanism:
      "async/await 改善了控制流语法，但没有替你决定工作何时启动、可否重复、并发多少、错误如何分类、取消是否传播。",
    failure:
      "若把「为什么Async的难点不是少写Callback」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Async的难点不是少写Callback」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Asynchronous computations",
    mechanism:
      "Async method通常在调用时同步执行到第一个incomplete await，并返回一个hot Task；再次调用method会创建另一份工作，而再次await同一个Task只观察同一份工作。API要区分 Func&lt;CancellationToken, Task&lt;T&gt;&gt…",
    failure:
      "若把「Asynchronous computations」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Asynchronous computations」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Failure, cancellation, and ti…",
    mechanism:
      "Timeout可能来自client deadline、HTTP stack、database command或自定义race；它不总等于cancellation，也不必然retryable。建立matrix记录source、exception/outcome、是否side effect commit…",
    failure:
      "若把「Failure, cancellation, and ti…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Failure, cancellation, and ti…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function AsynchronousComputationsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 13. Working with asynchronous computations：机制与证据"
      prompt="切换《Chapter 13. Working with asynchronous computations》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 13. Working with asynchronous computations》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function AsynchronousComputationsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 13. Working with asynchronous computations：机制路径"
      stages={STAGES}
    />
  );
}

export function AsynchronousComputationsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 13. Working with asynchronous computations：失效与核验"
      stages={STAGES}
    />
  );
}
