import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "边界",
    stage: "Chapter 8 官方范围",
    action:
      "核对 Masterful Memory Management 及 4 个官方主题，保持一章一对一身份。",
    metric: "4 topics",
    evidence:
      "https://subscription.packtpub.com/book/game-development/9781838556518/pref/preflvl1sec03/what-this-book-covers + ISBN 9781838556518",
    boundary: "目录覆盖只证明范围完整，仍需实验、失败样本与目标设备证据。",
  },
  {
    label: "模型",
    stage: "成本模型与不变量",
    action:
      "区分托管堆、原生对象、显存、临时分配与资产引用链，分别测驻留量、分配率、峰值和回收停顿。",
    metric: "cause → cost",
    evidence:
      "对同一玩法循环抓取前后快照，定位 retained size 增长，再用 Allocation Call Stacks 验证每帧分配源。",
    boundary:
      "对象池减少分配却增加常驻内存；UnloadUnusedAssets 也可能制造长停顿，必须看生命周期而非单点数字。",
  },
  {
    label: "迁移",
    stage: "2019/2020 到现代 Unity",
    action:
      "IL2CPP、增量 GC 与新版 Memory Profiler 改变工具和停顿形态，但装箱、闭包、字符串、对象池和引用生命周期仍需证据。",
    metric: "API ≠ principle",
    evidence: "记录原书载体、现代 API、保持的不变量和已知差异。",
    boundary:
      "不能把当前 API 名称倒写成原书事实，也不能把旧 API 直接当作当前最佳实践。",
  },
  {
    label: "采样",
    stage: "单变量对照实验",
    action:
      "对同一玩法循环抓取前后快照，定位 retained size 增长，再用 Allocation Call Stacks 验证每帧分配源。",
    metric: "baseline / candidate",
    evidence:
      "Memory Profiler diff、GC.Alloc 调用栈、Managed/Native 分类、峰值时间线和释放后的稳定平台。",
    boundary: "同时改变多个设置会失去因果归属，平均值还可能掩盖长尾卡顿。",
  },
  {
    label: "验收",
    stage: "性能证据包",
    action: "把 内存管理 的正确性、性能、兼容性和失败重放装进同一份验收记录。",
    metric: "P50 + P95 + correctness",
    evidence:
      "Memory Profiler diff、GC.Alloc 调用栈、Managed/Native 分类、峰值时间线和释放后的稳定平台。",
    boundary:
      "对象池减少分配却增加常驻内存；UnloadUnusedAssets 也可能制造长停顿，必须看生命周期而非单点数字。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function MemoryManagementMapLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 8 · 内存管理"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function MemoryManagementExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 8 · 内存管理"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function MemoryManagementEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 8 · 内存管理"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
