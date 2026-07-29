"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Asynchrony不是“把方法放到后台线程”",
    mechanism:
      "Asynchrony允许operation在等待外部completion时不占用当前call stack/thread，并在完成后继续logical flow。",
    failure:
      "若解释「为什么Asynchrony不是“把方法放到后台线程”」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么Asynchrony不是“把方法放到后台线程”」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Introducing asynchronous func…",
    mechanism:
      "Async function让method/lambda包含await并返回task-like completion。Caller获得Task后可以await、compose、cancel source或observe fault。它比callback参数更清楚地把completion作为value…",
    failure:
      "若解释「Introducing asynchronous func…」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Introducing asynchronous func…」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "Thinking about asynchrony",
    mechanism:
      "先区分I/O-bound与CPU-bound。I/O async依赖nonblocking underlying API，等待期间通常无需worker thread；CPU work要并行则需要scheduler/thread resources，不能仅加 async 。Latency、throug…",
    failure:
      "若解释「Thinking about asynchrony」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「Thinking about asynchrony」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function WritingAsynchronousCodeDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 5. Writing asynchronous code：机制与证据"
      prompt="切换《Chapter 5. Writing asynchronous code》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 5. Writing asynchronous code》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function WritingAsynchronousCodeMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 5. Writing asynchronous code：机制路径"
      stages={STAGES}
    />
  );
}

export function WritingAsynchronousCodeFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 5. Writing asynchronous code：失效与核验"
      stages={STAGES}
    />
  );
}
