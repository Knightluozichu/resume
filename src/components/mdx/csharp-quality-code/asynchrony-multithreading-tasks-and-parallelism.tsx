"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么“更并发”不等于“更快”或“更异步”",
    mechanism:
      "async让等待不占用调用thread，multithreading允许多个execution flows，parallelism让多个CPU cores同时计算；三者可以组合，也可以完全独立。一个async file call可能只有一个thread在执行，一个CPU loop可以用Paralle…",
    failure:
      "若把「为什么“更并发”不等于“更快”或“更异步”」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「为什么“更并发”不等于“更快”或“更异步”」的收益与反例。",
  },
  {
    label: "Execution Model与Thread Lifecy…",
    mechanism:
      "I/O-bound operation使用真正的async API，让OS completion在结果就绪时恢复continuation；不要用 Task.Run 包同步database/network调用假装scalable。CPU-bound work若需要保持UI/request thread…",
    failure:
      "若把「Execution Model与Thread Lifecy…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Execution Model与Thread Lifecy…」的收益与反例。",
  },
  {
    label: "Synchronization Identity与Coor…",
    mechanism:
      "Semaphore/SemaphoreSlim最适合限制同时进入某resource的数量，例如最多8个remote calls；初始count为1时也可互斥，但不自动表达复杂object invariant。process内async flow优先 SemaphoreSlim.WaitAsync ，…",
    failure:
      "若把「Synchronization Identity与Coor…」当作脱离版本与上下文的硬规则，可能用过时的优化或风格替换了更重要的正确性、安全性与可维护性约束。",
    evidence:
      "固定当前 .NET、语言版本和输入规模，用编译诊断、分析器、自动化测试、基准或安全失败样本复核「Synchronization Identity与Coor…」的收益与反例。",
  },
];

export function AsynchronyMultithreadingTasksAndParallelismDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第6章：异步、多线程、任务和并行（建议71-89）：机制与证据"
      prompt="切换《第6章：异步、多线程、任务和并行（建议71-89）》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第6章：异步、多线程、任务和并行（建议71-89）》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function AsynchronyMultithreadingTasksAndParallelismMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第6章：异步、多线程、任务和并行（建议71-89）：机制路径"
      stages={STAGES}
    />
  );
}

export function AsynchronyMultithreadingTasksAndParallelismFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第6章：异步、多线程、任务和并行（建议71-89）：失效与核验"
      stages={STAGES}
    />
  );
}
