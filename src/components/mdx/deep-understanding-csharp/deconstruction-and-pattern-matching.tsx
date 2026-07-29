"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从Shape验证开始理解Deconstruction与Pa…",
    mechanism:
      "Deconstruction让consumer一次把一个compound value拆到多个locals；pattern matching把runtime test与成功后的typed binding放在同一语法中。二者都减少重复access/cast，却也把protocol selection、s…",
    failure:
      "若解释「从Shape验证开始理解Deconstruction与Pa…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「从Shape验证开始理解Deconstruction与Pa…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Deconstruction of tuples",
    mechanism:
      "Tuple deconstruction按position展开： var (id, total) = summary; 中的local names由consumer选择，不必等于tuple element names。显式types、 var 混合形式受版本语法限制；discard 表示有意识地忽略某一position，但仍参与shape/arity匹配。",
    failure:
      "若解释「Deconstruction of tuples」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Deconstruction of tuples」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Deconstruction of nontuple ty…",
    mechanism:
      "Class或struct可提供accessible instance Deconstruct(out T1, out T2, ...) ；extension method也可给不能修改的type增加consumer view。Compiler按name、arity与applicable overlo…",
    failure:
      "若解释「Deconstruction of nontuple ty…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Deconstruction of nontuple ty…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function DeconstructionAndPatternMatchingDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 12. Deconstruction and pattern matching：机制与证据"
      prompt="切换《Chapter 12. Deconstruction and pattern matching》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 12. Deconstruction and pattern matching》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DeconstructionAndPatternMatchingMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 12. Deconstruction and pattern matching：机制路径"
      stages={STAGES}
    />
  );
}

export function DeconstructionAndPatternMatchingFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 12. Deconstruction and pattern matching：失效与核验"
      stages={STAGES}
    />
  );
}
