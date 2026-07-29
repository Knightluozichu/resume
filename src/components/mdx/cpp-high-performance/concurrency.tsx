"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“同时推进”不等于“同时执行”开始",
    mechanism:
      "concurrency表示多个活动的lifetime重叠、系统能在它们之间推进；parallelism表示多个工作在不同execution resources上同时执行。单核通过time slicing也能并发，多核程序也可能因一把锁而没有有效并行。并发首先服务响应与结构，并行才以更多hardware缩短work。",
    failure:
      "若脱离基线与成本模型讨论「从“同时推进”不等于“同时执行”开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“同时推进”不等于“同时执行”开始」前后的时间和资源变化。",
  },
  {
    label: "shared memory与data races",
    mechanism:
      "shared memory让threads直接访问同一object，通信低延迟，却要求同步lifetime与mutation。C++ data race发生在不同threads访问同一memory location、至少一个write、且访问非atomic并没有happens-before orde…",
    failure:
      "若脱离基线与成本模型讨论「shared memory与data races」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「shared memory与data races」前后的时间和资源变化。",
  },
  {
    label: "deadlock与锁顺序",
    mechanism:
      "deadlock常来自循环等待：thread A持有M1等M2，thread B持有M2等M1。统一global lock ordering、用 std::scoped lock 一次获取多个mutex、减少nested locking能破坏循环条件。调用unknown code时持锁可能引入看不见的反向锁顺序。",
    failure:
      "若脱离基线与成本模型讨论「deadlock与锁顺序」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「deadlock与锁顺序」前后的时间和资源变化。",
  },
];

export function ConcurrencyDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第10章：并发：机制与证据"
      prompt="切换《第10章：并发》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第10章：并发》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ConcurrencyMechanismMap() {
  return <ChapterMechanismMap title="第10章：并发：机制路径" stages={STAGES} />;
}

export function ConcurrencyFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第10章：并发：失效与核验" stages={STAGES} />
  );
}
