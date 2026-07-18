import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "边界",
    stage: "Chapter 3 官方范围",
    action:
      "核对 The Benefits of Batching 及 5 个官方主题，保持一章一对一身份。",
    metric: "5 topics",
    evidence:
      "https://subscription.packtpub.com/book/game-development/9781838556518/pref/preflvl1sec03/what-this-book-covers + ISBN 9781838556518",
    boundary: "目录覆盖只证明范围完整，仍需实验、失败样本与目标设备证据。",
  },
  {
    label: "模型",
    stage: "成本模型与不变量",
    action:
      "把渲染提交成本拆成材质状态切换、批次、顶点处理、内存占用与可见像素，不能只追一个 Draw Call 数字。",
    metric: "cause → cost",
    evidence:
      "用同一组网格逐项切换材质、Static、Instancing 与 SRP Batcher，记录 Main Thread、Render Thread、SetPass 和内存。",
    boundary:
      "合批可能增加顶点数据、破坏独立剔除或被材质关键字拆开；批次更少不等于 GPU 更快。",
  },
  {
    label: "迁移",
    stage: "2019/2020 到现代 Unity",
    action:
      "SRP Batcher、GPU Instancing 与 BatchRendererGroup 是现代补充；它们优化的契约不同，不能与静态合批互换。",
    metric: "API ≠ principle",
    evidence: "记录原书载体、现代 API、保持的不变量和已知差异。",
    boundary:
      "不能把当前 API 名称倒写成原书事实，也不能把旧 API 直接当作当前最佳实践。",
  },
  {
    label: "采样",
    stage: "单变量对照实验",
    action:
      "用同一组网格逐项切换材质、Static、Instancing 与 SRP Batcher，记录 Main Thread、Render Thread、SetPass 和内存。",
    metric: "baseline / candidate",
    evidence:
      "Frame Debugger 事件序列、Batches/SetPass、渲染线程耗时和静态合批后的网格内存。",
    boundary: "同时改变多个设置会失去因果归属，平均值还可能掩盖长尾卡顿。",
  },
  {
    label: "验收",
    stage: "性能证据包",
    action:
      "把 合批的收益 的正确性、性能、兼容性和失败重放装进同一份验收记录。",
    metric: "P50 + P95 + correctness",
    evidence:
      "Frame Debugger 事件序列、Batches/SetPass、渲染线程耗时和静态合批后的网格内存。",
    boundary:
      "合批可能增加顶点数据、破坏独立剔除或被材质关键字拆开；批次更少不等于 GPU 更快。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function BenefitsOfBatchingMapLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 3 · 合批的收益"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function BenefitsOfBatchingExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 3 · 合批的收益"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function BenefitsOfBatchingEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 3 · 合批的收益"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
