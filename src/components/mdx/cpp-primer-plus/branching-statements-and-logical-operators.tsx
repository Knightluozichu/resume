"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么先划分输入域再写 if",
    mechanism:
      "直接从一个样例开始追加 if ，容易留下重叠和空洞。成绩分类应先定义合法域 [0,100] 、非法低/高域，再把合法域划为 retry、pass、excellent。每个输入必须恰好落入一个结果，条件顺序才有可审查依据。",
    failure:
      "若只复述「为什么先划分输入域再写 if」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么先划分输入域再写 if」的状态变化。",
  },
  {
    label: "if 语句按条件选择一条路径",
    mechanism:
      "if 条件求值为 true 时执行分支，else 处理剩余集合。对按阈值递减的分类，应先检查非法域，再从最高阈值向下；否则宽条件会提前吞掉更具体路径。",
    failure:
      "若只复述「if 语句按条件选择一条路径」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「if 语句按条件选择一条路径」的状态变化。",
  },
  {
    label: "逻辑表达式组合条件并可能短路",
    mechanism:
      "&& 表示两侧都真， 表示至少一侧真， ! 反转 bool。它们从左向右求值并短路： && 左侧假时跳过右侧， 左侧真时跳过右侧。",
    failure:
      "若只复述「逻辑表达式组合条件并可能短路」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「逻辑表达式组合条件并可能短路」的状态变化。",
  },
];

export function BranchingStatementsAndLogicalOperatorsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 6：Branching Statements and Logical Operators：机制与证据"
      prompt="切换《Chapter 6：Branching Statements and Logical Operators》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 6：Branching Statements and Logical Operators》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function BranchingStatementsAndLogicalOperatorsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 6：Branching Statements and Logical Operators：机制路径"
      stages={STAGES}
    />
  );
}

export function BranchingStatementsAndLogicalOperatorsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 6：Branching Statements and Logical Operators：失效与核验"
      stages={STAGES}
    />
  );
}
