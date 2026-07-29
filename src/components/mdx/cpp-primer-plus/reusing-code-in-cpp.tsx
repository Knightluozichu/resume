"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么“复用代码”必须先回答对象关系",
    mechanism:
      "C++ 提供包含、不同访问方式的继承、模板和多重继承，但语法都不是设计理由。先问领域关系：Owner has-a Component、Derived is-a Base，还是某个类型仅在实现上借用一个策略？关系决定调用者应该看到什么，也决定未来改动耦合到谁。",
    failure:
      "若只复述「为什么“复用代码”必须先回答对象关系」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么“复用代码”必须先回答对象关系」的状态变化。",
  },
  {
    label: "containment 默认把复用留在实现边界",
    mechanism:
      "包含（containment）把一个类对象作为另一个类的成员，表达 has-a。Owner 决定是否以及如何转发成员能力，Component 的 public API 不会自动变成 Owner 的接口。",
    failure:
      "若只复述「containment 默认把复用留在实现边界」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「containment 默认把复用留在实现边界」的状态变化。",
  },
  {
    label: "private inheritance 复用基类实现但不承…",
    mechanism:
      "私有继承（private inheritance）把 Base 的 public/protected member 变为 Derived 的 private 实现；外部不能把 Derived 隐式转成 Base。它表达 implemented-in-terms-of，适用于确实需要覆盖 virtua…",
    failure:
      "若只复述「private inheritance 复用基类实现但不承…」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「private inheritance 复用基类实现但不承…」的状态变化。",
  },
];

export function ReusingCodeInCppDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 14：Reusing Code in C++：机制与证据"
      prompt="切换《Chapter 14：Reusing Code in C++》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 14：Reusing Code in C++》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ReusingCodeInCppMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 14：Reusing Code in C++：机制路径"
      stages={STAGES}
    />
  );
}

export function ReusingCodeInCppFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 14：Reusing Code in C++：失效与核验"
      stages={STAGES}
    />
  );
}
