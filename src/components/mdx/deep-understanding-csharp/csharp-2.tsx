"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么C 2把Runtime猜测前移到Compiler C…",
    mechanism:
      "C 1可以用 object 存任意值、手写delegate constructor、手写 IEnumerator ，但正确关系主要靠developer记忆和runtime cast。C 2的主线是把element type、absence、callable target和iteration stat…",
    failure:
      "若解释「为什么C 2把Runtime猜测前移到Compiler C…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么C 2把Runtime猜测前移到Compiler C…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Generics",
    mechanism:
      "Pre-generic ArrayList 只知道 object ：value type插入要boxing，读取要cast，错误可能在很远的consumer处出现。",
    failure:
      "若解释「Generics」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Generics」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Nullable value types",
    mechanism:
      "Nullable 让non-nullable value type同时表达一个T或absence，syntax是 T?",
    failure:
      "若解释「Nullable value types」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Nullable value types」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function Csharp2DecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 2. C# 2：机制与证据"
      prompt="切换《Chapter 2. C# 2》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 2. C# 2》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Csharp2MechanismMap() {
  return (
    <ChapterMechanismMap title="Chapter 2. C# 2：机制路径" stages={STAGES} />
  );
}

export function Csharp2FailureDiagram() {
  return (
    <ChapterFailureMatrix title="Chapter 2. C# 2：失效与核验" stages={STAGES} />
  );
}
