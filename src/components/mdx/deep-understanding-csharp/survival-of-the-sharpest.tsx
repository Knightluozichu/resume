"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么“深入”必须从Context开始",
    mechanism:
      "语言特性从不孤立出现。Generics回应type-safe reuse，LINQ回应统一数据组合，async回应continuation ceremony， ref readonly 回应copy cost；但每个response都受source compatibility、binary comp…",
    failure:
      "若解释「为什么“深入”必须从Context开始」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么“深入”必须从Context开始」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "An evolving language",
    mechanism:
      "C 的演进维持两个方向：在large scale用types表达API relation，在small scale减少无意义ceremony。C 2 generics让collection element type进入compile contract；C 3 lambda/query让behavio…",
    failure:
      "若解释「An evolving language」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「An evolving language」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "An evolving platform",
    mechanism: "C language、CLR、BCL和application framework是四层。",
    failure:
      "若解释「An evolving platform」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「An evolving platform」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function SurvivalOfTheSharpestDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 1. Survival of the sharpest：机制与证据"
      prompt="切换《Chapter 1. Survival of the sharpest》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 1. Survival of the sharpest》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SurvivalOfTheSharpestMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 1. Survival of the sharpest：机制路径"
      stages={STAGES}
    />
  );
}

export function SurvivalOfTheSharpestFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 1. Survival of the sharpest：失效与核验"
      stages={STAGES}
    />
  );
}
