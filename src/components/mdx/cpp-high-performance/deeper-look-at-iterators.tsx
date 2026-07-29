"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“算法只依赖遍历契约”开始",
    mechanism:
      "迭代器把“元素存在哪里”和“怎样逐个得到元素”从算法中分离。 std::find 不需要知道range来自vector、list、stream adapter还是计算生成器，只要求当前元素可读、iterator可推进、并能判断是否到达end。抽象并不自动零成本；只有iterator state紧凑、…",
    failure:
      "若脱离基线与成本模型讨论「从“算法只依赖遍历契约”开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“算法只依赖遍历契约”开始」前后的时间和资源变化。",
  },
  {
    label: "类指针语法承载抽象",
    mechanism:
      "pointer-mimicking syntax包括 it 访问当前值、 it- member 访问成员、 ++it 前进以及iterator equality比较位置。raw pointer天然满足多种iterator要求，自定义iterator则通过operator overload复现必要语法。",
    failure:
      "若脱离基线与成本模型讨论「类指针语法承载抽象」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「类指针语法承载抽象」前后的时间和资源变化。",
  },
  {
    label: "iterator categories是能力阶梯",
    mechanism:
      "传统iterator categories从input/output开始，forward增加multi-pass，bidirectional增加decrement，random access增加constant-time jump/difference，contiguous再保证元素在内存连续。它们…",
    failure:
      "若脱离基线与成本模型讨论「iterator categories是能力阶梯」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「iterator categories是能力阶梯」前后的时间和资源变化。",
  },
];

export function DeeperLookAtIteratorsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第5章：深入迭代器：机制与证据"
      prompt="切换《第5章：深入迭代器》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第5章：深入迭代器》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DeeperLookAtIteratorsMechanismMap() {
  return (
    <ChapterMechanismMap title="第5章：深入迭代器：机制路径" stages={STAGES} />
  );
}

export function DeeperLookAtIteratorsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第5章：深入迭代器：失效与核验"
      stages={STAGES}
    />
  );
}
