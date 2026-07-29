"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Property语法越短，Contract反而要写得…",
    mechanism:
      "C 6让getter-only auto property与initializer消除大量backing-field ceremony，也让method/property可用expression body。一行code可更突出意图，但也更容易让reader误判“值已缓存”“对象深度不可变”或“get…",
    failure:
      "若解释「为什么Property语法越短，Contract反而要写得…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么Property语法越短，Contract反而要写得…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "A brief history of properties",
    mechanism:
      "C 1 manual property以explicit field和accessor bodies封装storage；能validation、lazy compute、notify或virtual override，但trivial case重复。C 3 auto property让compile…",
    failure:
      "若解释「A brief history of properties」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「A brief history of properties」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Upgrades to automatically imp…",
    mechanism:
      "C 6支持auto-property initializer，让common default在每条constructor path前建立；execution order与field initializers一起按declaration规则发生，base construction与derived in…",
    failure:
      "若解释「Upgrades to automatically imp…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Upgrades to automatically imp…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function SuperSleekPropertiesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 8. Super-sleek properties and expression-bodied members：机制与证据"
      prompt="切换《Chapter 8. Super-sleek properties and expression-bodied members》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 8. Super-sleek properties and expression-bodied members》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SuperSleekPropertiesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 8. Super-sleek properties and expression-bodied members：机制路径"
      stages={STAGES}
    />
  );
}

export function SuperSleekPropertiesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 8. Super-sleek properties and expression-bodied members：失效与核验"
      stages={STAGES}
    />
  );
}
