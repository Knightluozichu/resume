"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Text生成必须先决定最终Consumer",
    mechanism:
      "同一个amount可能显示给用户、写入machine protocol、作为signature input或进入structured log。若过早变成plain string，typed value、format intent与culture owner都丢失。C 6 interpolation改…",
    failure:
      "若解释「为什么Text生成必须先决定最终Consumer」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么Text生成必须先决定最终Consumer」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "A recap on string formatting …",
    mechanism:
      "Concatenation逐个调用string conversion，template与values混在operations中；composite formatting用 0:N2 加object arguments，支持format provider但numeric indexes易错且value types可能boxing。",
    failure:
      "若解释「A recap on string formatting …」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「A recap on string formatting …」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Introducing interpolated stri…",
    mechanism:
      'C 6 $"Order id : total:C2 " 把expressions、alignment与format specifier靠近label，compiler lowering在该版本通常等价于 string.Format /formatting calls。它仍按target string…',
    failure:
      "若解释「Introducing interpolated stri…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Introducing interpolated stri…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function StringyFeaturesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 9. Stringy features：机制与证据"
      prompt="切换《Chapter 9. Stringy features》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 9. Stringy features》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StringyFeaturesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 9. Stringy features：机制路径"
      stages={STAGES}
    />
  );
}

export function StringyFeaturesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 9. Stringy features：失效与核验"
      stages={STAGES}
    />
  );
}
