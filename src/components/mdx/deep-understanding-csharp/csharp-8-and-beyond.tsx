"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么必须同时保留Preview历史与最终Version边界",
    mechanism:
      "第四版在2019年出版，本章面对的是C 8尚在形成中的language。它不仅介绍syntax，也示范如何读proposal、试preview compiler、区分design intent与shipping guarantee。今天回看时要做双层叙述：先还原书中看到的候选方向，再标明后来C 8落地的稳定语义；不能把更晚版本的扩展伪装成作者当时已知结论。",
    failure:
      "若解释「为什么必须同时保留Preview历史与最终Version边界」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么必须同时保留Preview历史与最终Version边界」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Nullable reference types",
    mechanism:
      "Nullable reference types为reference values增加compile-time intent：在enabled context中， string 表示正常path期望non-null， string?",
    failure:
      "若解释「Nullable reference types」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Nullable reference types」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Switch expressions",
    mechanism:
      "Switch expression把input映射为一个result，arms通常以pattern、optional guard和expression组成。它比statement更适合pure classification，促使每个arm产生同一target-compatible result。Ar…",
    failure:
      "若解释「Switch expressions」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Switch expressions」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function Csharp8AndBeyondDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 15. C# 8 and beyond：机制与证据"
      prompt="切换《Chapter 15. C# 8 and beyond》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 15. C# 8 and beyond》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Csharp8AndBeyondMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 15. C# 8 and beyond：机制路径"
      stages={STAGES}
    />
  );
}

export function Csharp8AndBeyondFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 15. C# 8 and beyond：失效与核验"
      stages={STAGES}
    />
  );
}
