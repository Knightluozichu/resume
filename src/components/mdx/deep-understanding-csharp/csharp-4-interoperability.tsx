"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Interoperability首先是Binding…",
    mechanism:
      "C 4面对COM、dynamic language和灵活API时，没有放弃static type system，而是允许特定expression把member/overload binding延迟到runtime；同时用optional/named arguments减少冗长signature，用v…",
    failure:
      "若解释「为什么Interoperability首先是Binding…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么Interoperability首先是Binding…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Dynamic typing",
    mechanism:
      "dynamic 是compile-time signal：相关operation不由normal static binder最终解析，而是生成DLR call site，由C runtime binder根据actual runtime types选择member、overload和conversi…",
    failure:
      "若解释「Dynamic typing」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Dynamic typing」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Optional parameters and named…",
    mechanism:
      "Optional parameter的default必须是compile-time可表示值（或特定default form），caller省略时compiler把argument写入call site。Library把default从1改2，未recompile旧consumer仍传1；所以publ…",
    failure:
      "若解释「Optional parameters and named…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Optional parameters and named…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function Csharp4InteroperabilityDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 4. C# 4: Improving interoperability：机制与证据"
      prompt="切换《Chapter 4. C# 4: Improving interoperability》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 4. C# 4: Improving interoperability》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Csharp4InteroperabilityMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 4. C# 4: Improving interoperability：机制路径"
      stages={STAGES}
    />
  );
}

export function Csharp4InteroperabilityFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 4. C# 4: Improving interoperability：失效与核验"
      stages={STAGES}
    />
  );
}
