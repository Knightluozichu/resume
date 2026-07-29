"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“快”必须有尺度和证据开始",
    mechanism:
      "性能不是程序的单一属性。“这个版本更快”至少缺少 workload、input size、hardware、compiler、metric 与 uncertainty。处理十个元素时，常数项较小的线性扫描可能胜过建立索引；数据扩大后，增长率才逐渐支配总成本。服务的平均延迟下降也不代表 p99 改善，…",
    failure:
      "若脱离基线与成本模型讨论「从“快”必须有尺度和证据开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“快”必须有尺度和证据开始」前后的时间和资源变化。",
  },
  {
    label: "渐近复杂度描述增长率",
    mechanism:
      "Big O 给出上界增长类别，不是一次调用的耗时。若算法执行 $3n^2 + 7n + 20$ 次基本操作，规模增大时二次项占主导，因此写作 $O(n^2)$。这不表示系数不存在，也不表示所有 $O(n)$ 算法在所有规模都快于 $O(n^2)$；cache locality、allocation、…",
    failure:
      "若脱离基线与成本模型讨论「渐近复杂度描述增长率」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「渐近复杂度描述增长率」前后的时间和资源变化。",
  },
  {
    label: "摊还复杂度解释偶发昂贵操作",
    mechanism:
      "动态数组 push back 大多只在已分配 storage 尾部构造元素，是常数成本；capacity 用尽时却要申请更大 storage，并移动或复制已有元素。单次扩容可达 $O(n)$，但若 capacity 按几何比例增长，连续 $n$ 次 append 的总迁移量形成几何级数，总工作仍为 …",
    failure:
      "若脱离基线与成本模型讨论「摊还复杂度解释偶发昂贵操作」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「摊还复杂度解释偶发昂贵操作」前后的时间和资源变化。",
  },
];

export function MeasuringPerformanceDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第3章：测量性能：机制与证据"
      prompt="切换《第3章：测量性能》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第3章：测量性能》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function MeasuringPerformanceMechanismMap() {
  return (
    <ChapterMechanismMap title="第3章：测量性能：机制路径" stages={STAGES} />
  );
}

export function MeasuringPerformanceFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第3章：测量性能：失效与核验" stages={STAGES} />
  );
}
