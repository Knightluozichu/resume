import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "边界",
    stage: "Chapter 5 官方范围",
    action: "核对 Faster Physics 及 2 个官方主题，保持一章一对一身份。",
    metric: "2 topics",
    evidence:
      "https://subscription.packtpub.com/book/game-development/9781838556518/pref/preflvl1sec03/what-this-book-covers + ISBN 9781838556518",
    boundary: "目录覆盖只证明范围完整，仍需实验、失败样本与目标设备证据。",
  },
  {
    label: "模型",
    stage: "成本模型与不变量",
    action:
      "物理成本由固定步数、Broad Phase 候选对、Narrow Phase 接触、求解迭代、查询与同步共同决定。",
    metric: "cause → cost",
    evidence:
      "在固定对象数量下分别改变 fixedDeltaTime、碰撞矩阵、Collider 类型和 CCD，观察 Physics.Simulate 的斜率。",
    boundary:
      "降低求解频率或改 Discrete 可能提升速度却破坏稳定性；性能验收必须同时保存玩法正确性。",
  },
  {
    label: "迁移",
    stage: "2019/2020 到现代 Unity",
    action:
      "PhysX 版本和作业化实现会变化，但 timestep、Layer Matrix、Collider 复杂度、sleep 与 CCD 的成本模型仍成立。",
    metric: "API ≠ principle",
    evidence: "记录原书载体、现代 API、保持的不变量和已知差异。",
    boundary:
      "不能把当前 API 名称倒写成原书事实，也不能把旧 API 直接当作当前最佳实践。",
  },
  {
    label: "采样",
    stage: "单变量对照实验",
    action:
      "在固定对象数量下分别改变 fixedDeltaTime、碰撞矩阵、Collider 类型和 CCD，观察 Physics.Simulate 的斜率。",
    metric: "baseline / candidate",
    evidence:
      "Physics Profiler、固定步计数、接触对数量、查询次数、穿透/漏撞回放和主线程时间。",
    boundary: "同时改变多个设置会失去因果归属，平均值还可能掩盖长尾卡顿。",
  },
  {
    label: "验收",
    stage: "性能证据包",
    action: "把 物理加速 的正确性、性能、兼容性和失败重放装进同一份验收记录。",
    metric: "P50 + P95 + correctness",
    evidence:
      "Physics Profiler、固定步计数、接触对数量、查询次数、穿透/漏撞回放和主线程时间。",
    boundary:
      "降低求解频率或改 Discrete 可能提升速度却破坏稳定性；性能验收必须同时保存玩法正确性。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function FasterPhysicsMapLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 5 · 物理加速"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function FasterPhysicsExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 5 · 物理加速"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function FasterPhysicsEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 5 · 物理加速"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
