"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么两个“小Feature”都在修复Hidden Sou…",
    mechanism:
      "Closure bug来自reader以为每轮有新value，而compiler曾让delegates共享一个storage；caller info解决callee想知道call site，却不想每处重复脆弱string。两者都把source context变成明确compiler rule：一个调…",
    failure:
      "若解释「为什么两个“小Feature”都在修复Hidden Sou…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么两个“小Feature”都在修复Hidden Sou…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Capturing variables in foreac…",
    mechanism:
      "旧语言语义可理解为iteration variable位于loop外，每次赋新值；所有anonymous methods capture同一variable，所以延迟执行时看到最终value。C 5把foreach iteration variable视为每次iteration在body内新建，closures得到不同storage，使常见直觉成立。",
    failure:
      "若解释「Capturing variables in foreac…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Capturing variables in foreac…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Caller information attributes",
    mechanism:
      "CallerMemberName 、 CallerFilePath 、 CallerLineNumber 标注optional parameters。Call site省略argument时，compiler根据source context写入普通string/int；callee只接收values…",
    failure:
      "若解释「Caller information attributes」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Caller information attributes」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function Csharp5BonusFeaturesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 7. C# 5 bonus features：机制与证据"
      prompt="切换《Chapter 7. C# 5 bonus features》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 7. C# 5 bonus features》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Csharp5BonusFeaturesMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 7. C# 5 bonus features：机制路径"
      stages={STAGES}
    />
  );
}

export function Csharp5BonusFeaturesFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 7. C# 5 bonus features：失效与核验"
      stages={STAGES}
    />
  );
}
