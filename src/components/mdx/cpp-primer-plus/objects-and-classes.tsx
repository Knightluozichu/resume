"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从过程式步骤开始建立对象边界",
    mechanism:
      "过程式编程常把问题分解为函数和数据流，适合无状态计算；面向对象编程把相关状态、允许的操作和始终成立的关系放进同一边界。抽象与类的关系在于：抽象定义稳定能力和不变量，类把它实现为访问控制、状态和方法。两者不是互斥风格：类的方法内部仍由表达式、函数和控制流实现，关键变化是“谁有权改变状态、改变后必须恢复什么”。",
    failure:
      "若只复述「从过程式步骤开始建立对象边界」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「从过程式步骤开始建立对象边界」的状态变化。",
  },
  {
    label: "public 承诺能力，private 保留表示自由",
    mechanism:
      "class declaration 同时描述 public and private。公有部分是调用者可依赖的契约；私有成员与 helper 是实现，可以在不破坏契约时替换。默认访问权限也是语言语义： class 成员默认 private， struct 成员默认 public，但二者都能有方法、构造函数和访问控制。",
    failure:
      "若只复述「public 承诺能力，private 保留表示自由」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「public 承诺能力，private 保留表示自由」的状态变化。",
  },
  {
    label: "成员函数在某个当前对象上执行",
    mechanism:
      "在非 static 成员函数中，编译器提供隐式的 this pointer，指向当前对象。成员名 balance 可理解为 this- balance 。当方法要返回当前对象以支持连续调用时，可返回 this 的引用，但调用者不能让该引用活得比对象更久。",
    failure:
      "若只复述「成员函数在某个当前对象上执行」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「成员函数在某个当前对象上执行」的状态变化。",
  },
];

export function ObjectsAndClassesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 10：Objects and Classes：机制与证据"
      prompt="切换《Chapter 10：Objects and Classes》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 10：Objects and Classes》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ObjectsAndClassesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 10：Objects and Classes：机制路径"
      stages={STAGES}
    />
  );
}

export function ObjectsAndClassesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 10：Objects and Classes：失效与核验"
      stages={STAGES}
    />
  );
}
