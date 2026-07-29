"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从一次真实性能事故开始",
    mechanism:
      "假设一个C++事件评分服务升级后出现四个症状：吞吐下降20%，p99从目标范围外移，RSS峰值增长，8 threads只比1 thread快1.6倍。团队提出“换allocator”“改lock-free”“把transform扔GPU”三个方案，但目前没有证据说明任何一个是cause。",
    failure:
      "若脱离基线与成本模型讨论「从一次真实性能事故开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从一次真实性能事故开始」前后的时间和资源变化。",
  },
  {
    label: "第1-2章：先恢复接口和value契约",
    mechanism:
      "事件进入pipeline时，先画value、borrow、owner与failure边界。一次“减少copy”的改动若把owned string改成string view，却让异步task晚于source lifetime，就不是优化而是correctness bug。lambda capture、…",
    failure:
      "若脱离基线与成本模型讨论「第1-2章：先恢复接口和value契约」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「第1-2章：先恢复接口和value契约」前后的时间和资源变化。",
  },
  {
    label: "第3章：把症状变成实验",
    mechanism:
      "p99、throughput与RSS是不同performance properties。建立三个benchmarks：micro隔离score kernel，component包含queue与allocation，end-to-end覆盖parse到response。对A/B交错执行，报告distr…",
    failure:
      "若脱离基线与成本模型讨论「第3章：把症状变成实验」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「第3章：把症状变成实验」前后的时间和资源变化。",
  },
];

export function FinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="总复习：从性能事故到证据闭环：机制与证据"
      prompt="切换《总复习：从性能事故到证据闭环》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《总复习：从性能事故到证据闭环》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="总复习：从性能事故到证据闭环：机制路径"
      stages={STAGES}
    />
  );
}

export function FinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="总复习：从性能事故到证据闭环：失效与核验"
      stages={STAGES}
    />
  );
}
