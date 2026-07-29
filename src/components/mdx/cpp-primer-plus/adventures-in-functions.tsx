"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么函数增强机制不能混成“少写代码”",
    mechanism:
      "内联函数（inline function）处理定义可见性与调用开销优化机会，reference 改变参数是否别名，default argument 改变调用点可省略的实参，overload 让同一名字拥有多个签名，function template 从类型模式生成函数族。五者影响不同边界，组合前应分别写出契约。",
    failure:
      "若只复述「为什么函数增强机制不能混成“少写代码”」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么函数增强机制不能混成“少写代码”」的状态变化。",
  },
  {
    label: "inline 函数允许头文件定义但不保证内联展开",
    mechanism:
      "inline 允许相同函数定义出现在多个翻译单元，只要它们满足同一定义规则；编译器是否把调用替换为函数体，是优化决定。大函数或递归函数标 inline 也可能保留正常调用。",
    failure:
      "若只复述「inline 函数允许头文件定义但不保证内联展开」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「inline 函数允许头文件定义但不保证内联展开」的状态变化。",
  },
  {
    label: "引用变量是已有对象的别名",
    mechanism:
      "int& alias = value; 绑定后不能改绑到另一个对象，通过 alias 写入就是修改 value。引用语法不提供空状态，仍可能因被引用对象结束生命周期而悬空。",
    failure:
      "若只复述「引用变量是已有对象的别名」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「引用变量是已有对象的别名」的状态变化。",
  },
];

export function AdventuresInFunctionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 8：Adventures in Functions：机制与证据"
      prompt="切换《Chapter 8：Adventures in Functions》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 8：Adventures in Functions》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function AdventuresInFunctionsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 8：Adventures in Functions：机制路径"
      stages={STAGES}
    />
  );
}

export function AdventuresInFunctionsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 8：Adventures in Functions：失效与核验"
      stages={STAGES}
    />
  );
}
