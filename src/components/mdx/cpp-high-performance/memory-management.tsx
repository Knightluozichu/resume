"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“地址、存储、对象、所有权不是一回事”开始",
    mechanism:
      "内存管理至少包含四层：程序使用virtual address；OS把page映射到physical memory或backing store；allocator把较大区域切成storage block；C++在storage中开始和结束object lifetime。最后还要由ownership c…",
    failure:
      "若脱离基线与成本模型讨论「从“地址、存储、对象、所有权不是一回事”开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“地址、存储、对象、所有权不是一回事”开始」前后的时间和资源变化。",
  },
  {
    label: "virtual address space与memory …",
    mechanism:
      "virtual address space按memory pages管理。reserve一段地址不等于所有physical pages立即驻留；首次触碰可能触发minor page fault，由OS建立映射并提供zero-filled page。若所需数据不在RAM，major fault可能需要…",
    failure:
      "若脱离基线与成本模型讨论「virtual address space与memory …」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「virtual address space与memory …」前后的时间和资源变化。",
  },
  {
    label: "stack memory与heap memory",
    mechanism:
      "stack memory通常随function call维护frame，automatic-lifetime local objects常由stack pointer附近storage承载；退出scope时按逆序析构。compiler可依据as-if rule把对象放进register、消除它或采用…",
    failure:
      "若脱离基线与成本模型讨论「stack memory与heap memory」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「stack memory与heap memory」前后的时间和资源变化。",
  },
];

export function MemoryManagementDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第7章：内存管理：机制与证据"
      prompt="切换《第7章：内存管理》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第7章：内存管理》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function MemoryManagementMechanismMap() {
  return (
    <ChapterMechanismMap title="第7章：内存管理：机制路径" stages={STAGES} />
  );
}

export function MemoryManagementFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第7章：内存管理：失效与核验" stages={STAGES} />
  );
}
