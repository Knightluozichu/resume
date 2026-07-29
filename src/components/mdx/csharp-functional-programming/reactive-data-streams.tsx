"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Stream除了Value还有Time与Lifecy…",
    mechanism:
      "Collection是已经存在的一组值， IEnumerable&lt;T&gt; 由consumer拉取， IObservable&lt;T&gt; 则由source随时间推送。Observable contract包含零到多个OnNext，随后至多一个OnError或OnCompleted；su…",
    failure:
      "若把「为什么Stream除了Value还有Time与Lifecy…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Stream除了Value还有Time与Lifecy…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Representing data streams wit…",
    mechanism:
      "IObservable&lt;T&gt; 只有Subscribe入口，observer提供三个notifications。它不在type中承诺backpressure、thread、scheduler、cold/hot、replay或multicast，这些都要由source/operator co…",
    failure:
      "若把「Representing data streams wit…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Representing data streams wit…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Creating IObservables",
    mechanism:
      "优先使用 Observable.Return/Empty/Throw/Defer/FromAsync/Using 等已验证constructors。自定义 Observable.Create 时，subscribe function必须返回disposable，负责解绑event、取消token/timer并防止terminal后继续emit。",
    failure:
      "若把「Creating IObservables」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Creating IObservables」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function ReactiveDataStreamsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 14. Data streams and the Reactive Extensions：机制与证据"
      prompt="切换《Chapter 14. Data streams and the Reactive Extensions》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 14. Data streams and the Reactive Extensions》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ReactiveDataStreamsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 14. Data streams and the Reactive Extensions：机制路径"
      stages={STAGES}
    />
  );
}

export function ReactiveDataStreamsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 14. Data streams and the Reactive Extensions：失效与核验"
      stages={STAGES}
    />
  );
}
