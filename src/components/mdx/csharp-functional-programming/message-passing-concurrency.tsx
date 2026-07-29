"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么不共享Memory仍然需要Concurrency设计",
    mechanism:
      "Message passing把“多个threads直接改同一对象”改成“一个owner按顺序处理immutable messages”。它缩小race surface，却没有消灭并发问题：senders仍并行，mailbox可能无限增长，消息可能duplicate/out-of-order，han…",
    failure:
      "若把「为什么不共享Memory仍然需要Concurrency设计」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么不共享Memory仍然需要Concurrency设计」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "The need for shared mutable s…",
    mechanism:
      "许多invariants横跨多个值，例如余额与reserved amount、inventory与orders、connection与sequence。Lock可把临界区原子化，但所有访问路径必须遵守同一lock order；atomic适合单word update，复杂invariant仍需pro…",
    failure:
      "若把「The need for shared mutable s…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「The need for shared mutable s…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Understanding message-passing…",
    mechanism:
      "Mailbox接收messages，owner逐个dispatch并更新private state。Local mailbox通常提供enqueue后按某种顺序处理，但来自不同senders的全局顺序未必定义；remote transport还加入serialization、network part…",
    failure:
      "若把「Understanding message-passing…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Understanding message-passing…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function MessagePassingConcurrencyDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 15. An introduction to message-passing concurrency：机制与证据"
      prompt="切换《Chapter 15. An introduction to message-passing concurrency》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 15. An introduction to message-passing concurrency》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function MessagePassingConcurrencyMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 15. An introduction to message-passing concurrency：机制路径"
      stages={STAGES}
    />
  );
}

export function MessagePassingConcurrencyFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 15. An introduction to message-passing concurrency：失效与核验"
      stages={STAGES}
    />
  );
}
