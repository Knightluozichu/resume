"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Tuple适合临时组合而不是自动替代领域模型",
    mechanism:
      "方法经常需要返回两个相关结果，LINQ pipeline也会临时携带value与index。C 7 tuples让这种composition有静态types和可读element names，不必为每个局部shape声明class。它的力量来自低ceremony，也因此缺少nominal type可以…",
    failure:
      "若解释「为什么Tuple适合临时组合而不是自动替代领域模型」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么Tuple适合临时组合而不是自动替代领域模型」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Introduction to tuples",
    mechanism:
      "Tuple表示固定长度、按position排列的heterogeneous values。与 System.Tuple reference types相比，C 7语法通常映射到 System.ValueTuple value types，并允许source层的element names。它适合pri…",
    failure:
      "若解释「Introduction to tuples」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Introduction to tuples」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Tuple literals and tuple types",
    mechanism:
      "Literal (id: 42, total: 9.5m) 可target为显式 (int id, decimal total) ，也可由 var 推断。Simple variable/member expressions可产生inferred names；其他expression退回 Item1 …",
    failure:
      "若解释「Tuple literals and tuple types」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Tuple literals and tuple types」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function CompositionUsingTuplesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 11. Composition using tuples：机制与证据"
      prompt="切换《Chapter 11. Composition using tuples》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 11. Composition using tuples》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function CompositionUsingTuplesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 11. Composition using tuples：机制路径"
      stages={STAGES}
    />
  );
}

export function CompositionUsingTuplesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 11. Composition using tuples：失效与核验"
      stages={STAGES}
    />
  );
}
