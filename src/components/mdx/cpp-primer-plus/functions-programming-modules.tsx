"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么函数是契约而不只是代码片段",
    mechanism:
      "函数把一项工作命名并形成调用边界。编译器能通过函数原型检查参数和返回类型，却不知道 count 是否匹配数组、指针是否可空、分数是否在 0–100、失败怎样报告。这些语义需要前置条件、后置条件和测试补齐。",
    failure:
      "若只复述「为什么函数是契约而不只是代码片段」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么函数是契约而不只是代码片段」的状态变化。",
  },
  {
    label: "函数原型让调用点可被独立检查",
    mechanism:
      "函数原型声明名字、返回类型和参数类型。调用出现时，编译器据此检查实参数量与可转换性；定义可以位于另一个源文件，最终由链接器解析。",
    failure:
      "若只复述「函数原型让调用点可被独立检查」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「函数原型让调用点可被独立检查」的状态变化。",
  },
  {
    label: "按值传递建立独立形参对象",
    mechanism:
      "普通参数按值传递：调用表达式先求实参值，再用它初始化函数调用帧中的形参。修改形参不改变调用者对象，除非值本身是指针且函数通过该地址修改 pointee。",
    failure:
      "若只复述「按值传递建立独立形参对象」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「按值传递建立独立形参对象」的状态变化。",
  },
];

export function FunctionsProgrammingModulesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 7：Functions: C++'s Programming Modules：机制与证据"
      prompt="切换《Chapter 7：Functions: C++'s Programming Modules》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 7：Functions: C++'s Programming Modules》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FunctionsProgrammingModulesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 7：Functions: C++'s Programming Modules：机制路径"
      stages={STAGES}
    />
  );
}

export function FunctionsProgrammingModulesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 7：Functions: C++'s Programming Modules：失效与核验"
      stages={STAGES}
    />
  );
}
