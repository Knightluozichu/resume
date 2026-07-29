"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么新标准特性要按契约而不是年份学习",
    mechanism:
      "第六版把 C++11 作为“新标准”介绍。真正需要保留的不是发布年份，而是它把哪些错误交给类型系统：brace 可诊断 narrowing，smart pointer 把 owner 写进类型，override 检查虚函数，move 区分复制和资源转移，lambda 把局部策略变成 callable object。",
    failure:
      "若只复述「为什么新标准特性要按契约而不是年份学习」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么新标准特性要按契约而不是年份学习」的状态变化。",
  },
  {
    label: "uniform initialization 统一语法但仍…",
    mechanism:
      "统一初始化（uniform initialization）用 braces 初始化标量、聚合、类和容器，并禁止许多窄化转换。空 braces 值初始化。它减少语法分裂，却不会让所有构造候选等价：存在 initializer list constructor 时，列表初始化会优先尝试它。",
    failure:
      "若只复述「uniform initialization 统一语法但仍…」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「uniform initialization 统一语法但仍…」的状态变化。",
  },
  {
    label: "auto 与 decltype 分别从初始化器和表达式推导",
    mechanism:
      "自动类型推导（ auto ）从 initializer 推导变量类型，常去掉顶层 const/reference；需要引用时显式写 auto& 、 const auto& 或 auto&& 。",
    failure:
      "若只复述「auto 与 decltype 分别从初始化器和表达式推导」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「auto 与 decltype 分别从初始化器和表达式推导」的状态变化。",
  },
];

export function VisitingNewCppStandardDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 18：Visiting with the New C++ Standard：机制与证据"
      prompt="切换《Chapter 18：Visiting with the New C++ Standard》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 18：Visiting with the New C++ Standard》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function VisitingNewCppStandardMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 18：Visiting with the New C++ Standard：机制路径"
      stages={STAGES}
    />
  );
}

export function VisitingNewCppStandardFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 18：Visiting with the New C++ Standard：失效与核验"
      stages={STAGES}
    />
  );
}
