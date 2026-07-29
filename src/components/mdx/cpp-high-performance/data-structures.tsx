"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“算法访问了哪些字节”开始",
    mechanism:
      "容器选择不能只查 complexity table。CPU执行load/store时面对的是地址序列：这些地址是否连续、能否prefetch、每条cache line里有多少有用字节、需要追多少pointer、working set是否跨越cache或page。两个同为 $O(n)$ 的遍历，可以因数据布局不同产生完全不同的stall和bandwidth。",
    failure:
      "若脱离基线与成本模型讨论「从“算法访问了哪些字节”开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“算法访问了哪些字节”开始」前后的时间和资源变化。",
  },
  {
    label: "计算机内存不是等成本数组",
    mechanism:
      "properties of computer memory 首先体现在层次结构。register与cache容量小但接近core；DRAM容量大、访问延迟更高；virtual memory又以page映射地址。CPU通常按cache line搬运连续字节，所以只使用line中的一个小字段仍支付整行传…",
    failure:
      "若脱离基线与成本模型讨论「计算机内存不是等成本数组」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「计算机内存不是等成本数组」前后的时间和资源变化。",
  },
  {
    label: "array与vector：连续值序列",
    mechanism:
      "std::array 把固定元素数编码进type，对象内直接包含storage；它没有capacity growth，适合compile-time known extent与value semantics。",
    failure:
      "若脱离基线与成本模型讨论「array与vector：连续值序列」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「array与vector：连续值序列」前后的时间和资源变化。",
  },
];

export function DataStructuresDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第4章：数据结构：机制与证据"
      prompt="切换《第4章：数据结构》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第4章：数据结构》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DataStructuresMechanismMap() {
  return (
    <ChapterMechanismMap title="第4章：数据结构：机制路径" stages={STAGES} />
  );
}

export function DataStructuresFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第4章：数据结构：失效与核验" stages={STAGES} />
  );
}
