import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "边界",
    stage: "Chapter 9 官方范围",
    action:
      "核对 The Data-Oriented Technology Stack 及 4 个官方主题，保持一章一对一身份。",
    metric: "4 topics",
    evidence:
      "https://subscription.packtpub.com/book/game-development/9781838556518/pref/preflvl1sec03/what-this-book-covers + ISBN 9781838556518",
    boundary: "目录覆盖只证明范围完整，仍需实验、失败样本与目标设备证据。",
  },
  {
    label: "模型",
    stage: "成本模型与不变量",
    action:
      "通过连续数据、显式读写依赖、可并行 Job 与 Burst 向量化，把大量同构工作从对象图改为数据流。",
    metric: "cause → cost",
    evidence:
      "从一个纯计算循环开始，依次比较 MonoBehaviour、IJobParallelFor 与 Burst，确认结果误差、调度开销和规模拐点。",
    boundary:
      "小任务的调度成本可能高于收益；结构性变更也会增加迁移风险，不能因 DOTS 标签推断必然更快。",
  },
  {
    label: "迁移",
    stage: "2019/2020 到现代 Unity",
    action:
      "第三版描述的是 2019/2020 早期 DOTS；现代 Entities API 已变化，必须保留原理并用当前包版本重写接口。",
    metric: "API ≠ principle",
    evidence: "记录原书载体、现代 API、保持的不变量和已知差异。",
    boundary:
      "不能把当前 API 名称倒写成原书事实，也不能把旧 API 直接当作当前最佳实践。",
  },
  {
    label: "采样",
    stage: "单变量对照实验",
    action:
      "从一个纯计算循环开始，依次比较 MonoBehaviour、IJobParallelFor 与 Burst，确认结果误差、调度开销和规模拐点。",
    metric: "baseline / candidate",
    evidence:
      "Jobs Timeline、Burst Inspector、主线程/工作线程时间、缓存友好数据布局和逐元素结果对照。",
    boundary: "同时改变多个设置会失去因果归属，平均值还可能掩盖长尾卡顿。",
  },
  {
    label: "验收",
    stage: "性能证据包",
    action:
      "把 DOTS 数据导向技术栈 的正确性、性能、兼容性和失败重放装进同一份验收记录。",
    metric: "P50 + P95 + correctness",
    evidence:
      "Jobs Timeline、Burst Inspector、主线程/工作线程时间、缓存友好数据布局和逐元素结果对照。",
    boundary:
      "小任务的调度成本可能高于收益；结构性变更也会增加迁移风险，不能因 DOTS 标签推断必然更快。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function DataOrientedTechnologyStackMapLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 9 · DOTS 数据导向技术栈"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function DataOrientedTechnologyStackExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 9 · DOTS 数据导向技术栈"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function DataOrientedTechnologyStackEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 9 · DOTS 数据导向技术栈"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
