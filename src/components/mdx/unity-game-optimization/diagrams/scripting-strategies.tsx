import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "边界",
    stage: "Chapter 2 官方范围",
    action: "核对 Scripting Strategies 及 16 个官方主题，保持一章一对一身份。",
    metric: "16 topics",
    evidence:
      "https://subscription.packtpub.com/book/game-development/9781838556518/pref/preflvl1sec03/what-this-book-covers + ISBN 9781838556518",
    boundary: "目录覆盖只证明范围完整，仍需实验、失败样本与目标设备证据。",
  },
  {
    label: "模型",
    stage: "成本模型与不变量",
    action:
      "把高频回调中的查找、分配、字符串桥接与重复计算移到初始化、事件或集中调度层。",
    metric: "cause → cost",
    evidence:
      "构造 1、100、1000 个对象三个规模，比较分散 Update、集中 Tick 与事件驱动的主线程成本和分配。",
    boundary:
      "缓存会延长引用生命周期，集中调度会增加管理复杂度；低频路径不应为微优化牺牲可读性。",
  },
  {
    label: "迁移",
    stage: "2019/2020 到现代 Unity",
    action:
      "新版 Unity 的增量 GC、Awaitable 与 Entities 不会自动修复低效 MonoBehaviour 热路径；先以 Profiler 证据选择改法。",
    metric: "API ≠ principle",
    evidence: "记录原书载体、现代 API、保持的不变量和已知差异。",
    boundary:
      "不能把当前 API 名称倒写成原书事实，也不能把旧 API 直接当作当前最佳实践。",
  },
  {
    label: "采样",
    stage: "单变量对照实验",
    action:
      "构造 1、100、1000 个对象三个规模，比较分散 Update、集中 Tick 与事件驱动的主线程成本和分配。",
    metric: "baseline / candidate",
    evidence:
      "CPU Timeline、GC Alloc、调用次数、对象规模曲线以及行为一致性测试。",
    boundary: "同时改变多个设置会失去因果归属，平均值还可能掩盖长尾卡顿。",
  },
  {
    label: "验收",
    stage: "性能证据包",
    action:
      "把 脚本优化策略 的正确性、性能、兼容性和失败重放装进同一份验收记录。",
    metric: "P50 + P95 + correctness",
    evidence:
      "CPU Timeline、GC Alloc、调用次数、对象规模曲线以及行为一致性测试。",
    boundary:
      "缓存会延长引用生命周期，集中调度会增加管理复杂度；低频路径不应为微优化牺牲可读性。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function ScriptingStrategiesMapLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 2 · 脚本优化策略"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function ScriptingStrategiesExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 2 · 脚本优化策略"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function ScriptingStrategiesEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 2 · 脚本优化策略"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
