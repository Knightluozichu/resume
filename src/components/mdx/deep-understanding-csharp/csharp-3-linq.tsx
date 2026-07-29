"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么C 3的许多小Feature最终汇聚成LINQ",
    mechanism:
      "C 3不是只加入query syntax。Auto property让data carrier简洁， var 让anonymous type可命名于local scope，initializer让sample data易构建，lambda提供inline behavior，extension met…",
    failure:
      "若解释「为什么C 3的许多小Feature最终汇聚成LINQ」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么C 3的许多小Feature最终汇聚成LINQ」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Automatically implemented pro…",
    mechanism:
      "Auto property由compiler生成backing field与accessors，public contract仍是property。它适合没有额外validation的state；一旦需要invariant、computed value或observable mutation，就显式…",
    failure:
      "若解释「Automatically implemented pro…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Automatically implemented pro…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Implicit typing",
    mechanism:
      "var 要求initializer并在compile time得到exact static type；之后赋值和member resolution都按该type进行。它使anonymous type与复杂generic query可用，不等于 dynamic 。当右侧清楚揭示type时减少重复；当m…",
    failure:
      "若解释「Implicit typing」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Implicit typing」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function Csharp3LinqDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 3. C# 3: LINQ and everything that comes with it：机制与证据"
      prompt="切换《Chapter 3. C# 3: LINQ and everything that comes with it》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 3. C# 3: LINQ and everything that comes with it》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Csharp3LinqMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 3. C# 3: LINQ and everything that comes with it：机制路径"
      stages={STAGES}
    />
  );
}

export function Csharp3LinqFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 3. C# 3: LINQ and everything that comes with it：失效与核验"
      stages={STAGES}
    />
  );
}
