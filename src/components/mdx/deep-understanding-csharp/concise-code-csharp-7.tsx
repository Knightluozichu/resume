"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Concise Code仍要暴露Timing、Typ…",
    mechanism:
      "本章特性看起来彼此零散，统一主线却很明确：把已经存在的意图放到更接近使用点的位置。Local function把helper贴近owner method，out variable把declaration贴近Try call，throw/default把statement级意图带进expression…",
    failure:
      "若解释「为什么Concise Code仍要暴露Timing、Typ…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么Concise Code仍要暴露Timing、Typ…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Local methods",
    mechanism:
      "Local function声明在method body内部，可capture enclosing locals、递归、使用generic type parameters，并拥有普通method-like parameter/return syntax。相较lambda，它不一定需要delegate…",
    failure:
      "若解释「Local methods」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Local methods」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Out variables",
    mechanism:
      "C 7允许在argument位置声明 out int value ，类型也可用 out var value 推断。变量scope通常属于enclosing block，而不只是if true branch；但definite assignment和business validity仍由control…",
    failure:
      "若解释「Out variables」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Out variables」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function ConciseCodeCsharp7DecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 14. Concise code in C# 7：机制与证据"
      prompt="切换《Chapter 14. Concise code in C# 7》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 14. Concise code in C# 7》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ConciseCodeCsharp7MechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 14. Concise code in C# 7：机制路径"
      stages={STAGES}
    />
  );
}

export function ConciseCodeCsharp7FailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 14. Concise code in C# 7：失效与核验"
      stages={STAGES}
    />
  );
}
