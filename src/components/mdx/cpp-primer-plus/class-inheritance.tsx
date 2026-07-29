"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么复用几行代码不足以证明应该继承",
    mechanism:
      "公有继承（public inheritance）承诺 Derived is-a Base：任何只依赖 Base 公有契约的代码，都应能接收 Derived 而不被惊讶。它不是“Derived 内部碰巧需要 Base 的几个成员”。若只想复用实现而不承诺替换，包含（has-a）通常更准确。",
    failure:
      "若只复述「为什么复用几行代码不足以证明应该继承」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么复用几行代码不足以证明应该继承」的状态变化。",
  },
  {
    label: "派生对象包含一个完整基类子对象",
    mechanism:
      "派生类声明基类后，会先构造 Base subobject，再构造派生成员，最后执行派生构造函数体。派生构造函数用初始化列表选择基类构造函数；若省略，只会尝试基类默认构造。",
    failure:
      "若只复述「派生对象包含一个完整基类子对象」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「派生对象包含一个完整基类子对象」的状态变化。",
  },
  {
    label: "protected 是对所有未来派生实现的承诺",
    mechanism:
      "private member 只能由基类成员/friend 访问；protected member 还允许派生类实现直接访问；public member 对普通调用者开放。protected 看似方便，却把表示暴露给所有派生类，使基类难以改变布局和约束。优先保持数据 private，提供窄 protected/public operation。",
    failure:
      "若只复述「protected 是对所有未来派生实现的承诺」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「protected 是对所有未来派生实现的承诺」的状态变化。",
  },
];

export function ClassInheritanceDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 13：Class Inheritance：机制与证据"
      prompt="切换《Chapter 13：Class Inheritance》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 13：Class Inheritance》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ClassInheritanceMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 13：Class Inheritance：机制路径"
      stages={STAGES}
    />
  );
}

export function ClassInheritanceFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 13：Class Inheritance：失效与核验"
      stages={STAGES}
    />
  );
}
