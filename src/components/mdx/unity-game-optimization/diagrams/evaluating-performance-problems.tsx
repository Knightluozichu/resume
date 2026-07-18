import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "边界",
    stage: "Chapter 1 官方范围",
    action:
      "核对 Evaluating Performance Problems 及 3 个官方主题，保持一章一对一身份。",
    metric: "3 topics",
    evidence:
      "https://subscription.packtpub.com/book/game-development/9781838556518/pref/preflvl1sec03/what-this-book-covers + ISBN 9781838556518",
    boundary: "目录覆盖只证明范围完整，仍需实验、失败样本与目标设备证据。",
  },
  {
    label: "模型",
    stage: "成本模型与不变量",
    action:
      "固定目标设备、场景、画质和采样窗口，再把帧时间归因到 CPU、GPU、内存或等待。",
    metric: "cause → cost",
    evidence:
      "记录 60 秒基线，选择一个热点只改一个变量，再用中位数和 P95 对比改动前后。",
    boundary:
      "Editor、Deep Profile、VSync 与 Development Build 都会改变观测值，不能混作同一基线。",
  },
  {
    label: "迁移",
    stage: "2019/2020 到现代 Unity",
    action:
      "在 Unity 6 中可结合 Profiler、Profile Analyzer、Memory Profiler 与目标平台工具，但原书的测量、归因、复测闭环不变。",
    metric: "API ≠ principle",
    evidence: "记录原书载体、现代 API、保持的不变量和已知差异。",
    boundary:
      "不能把当前 API 名称倒写成原书事实，也不能把旧 API 直接当作当前最佳实践。",
  },
  {
    label: "采样",
    stage: "单变量对照实验",
    action:
      "记录 60 秒基线，选择一个热点只改一个变量，再用中位数和 P95 对比改动前后。",
    metric: "baseline / candidate",
    evidence:
      "Profiler capture、测试构建参数、设备信息、CPU/GPU 帧时间和可重放场景。",
    boundary: "同时改变多个设置会失去因果归属，平均值还可能掩盖长尾卡顿。",
  },
  {
    label: "验收",
    stage: "性能证据包",
    action:
      "把 评估性能问题 的正确性、性能、兼容性和失败重放装进同一份验收记录。",
    metric: "P50 + P95 + correctness",
    evidence:
      "Profiler capture、测试构建参数、设备信息、CPU/GPU 帧时间和可重放场景。",
    boundary:
      "Editor、Deep Profile、VSync 与 Development Build 都会改变观测值，不能混作同一基线。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function EvaluatingPerformanceProblemsMapLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 1 · 评估性能问题"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function EvaluatingPerformanceProblemsExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 1 · 评估性能问题"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function EvaluatingPerformanceProblemsEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 1 · 评估性能问题"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
