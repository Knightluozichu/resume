"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么理解Async Lowering能消除错误直觉",
    mechanism:
      "Source看起来在await处“暂停方法”，runtime实际上只看到generated type与continuation calls。Compiler把需要跨suspension保存的locals提升成fields，用state选择resume point，用awaiter通知completi…",
    failure:
      "若解释「为什么理解Async Lowering能消除错误直觉」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么理解Async Lowering能消除错误直觉」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Structure of the generated co…",
    mechanism:
      "概念上，原method变成stub：创建state machine，初始化builder与initial state，调用builder.Start触发第一次MoveNext，然后返回builder.Task。Generated type在无suspension fast path可能保持struc…",
    failure:
      "若解释「Structure of the generated co…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Structure of the generated co…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "A simple MoveNext() implement…",
    mechanism:
      "MoveNext以state选择入口：initial path执行同步前缀；遇await获取awaiter，若未完成则保存awaiter与next state，调用builder的Await(On/UnsafeOn)Completed注册continuation并return；resume后恢复aw…",
    failure:
      "若解释「A simple MoveNext() implement…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「A simple MoveNext() implement…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function AsyncImplementationDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 6. Async implementation：机制与证据"
      prompt="切换《Chapter 6. Async implementation》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 6. Async implementation》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function AsyncImplementationMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 6. Async implementation：机制路径"
      stages={STAGES}
    />
  );
}

export function AsyncImplementationFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 6. Async implementation：失效与核验"
      stages={STAGES}
    />
  );
}
