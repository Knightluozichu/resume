import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "边界",
    stage: "Chapter 4 官方范围",
    action:
      "核对 Optimizing Your Art Assets 及 4 个官方主题，保持一章一对一身份。",
    metric: "4 topics",
    evidence:
      "https://subscription.packtpub.com/book/game-development/9781838556518/pref/preflvl1sec03/what-this-book-covers + ISBN 9781838556518",
    boundary: "目录覆盖只证明范围完整，仍需实验、失败样本与目标设备证据。",
  },
  {
    label: "模型",
    stage: "成本模型与不变量",
    action:
      "从源资源、导入设置、平台压缩、运行时驻留到卸载建立完整资产生命周期，而不是只看包体。",
    metric: "cause → cost",
    evidence:
      "选择纹理、网格、动画与音频各一项，做导入设置矩阵，测包体、峰值内存、加载时间和视觉/听觉误差。",
    boundary:
      "磁盘压缩率、下载体积、解码成本和运行时显存不是同一指标；错误格式会把节省转成启动卡顿。",
  },
  {
    label: "迁移",
    stage: "2019/2020 到现代 Unity",
    action:
      "Addressables 可替代部分旧式 AssetBundle/Resources 工作流，但压缩格式、Read/Write、副本与依赖生命周期仍需逐项验证。",
    metric: "API ≠ principle",
    evidence: "记录原书载体、现代 API、保持的不变量和已知差异。",
    boundary:
      "不能把当前 API 名称倒写成原书事实，也不能把旧 API 直接当作当前最佳实践。",
  },
  {
    label: "采样",
    stage: "单变量对照实验",
    action:
      "选择纹理、网格、动画与音频各一项，做导入设置矩阵，测包体、峰值内存、加载时间和视觉/听觉误差。",
    metric: "baseline / candidate",
    evidence:
      "Import Settings、Build Report、Memory Profiler 快照、加载时间线和设备端质量对照。",
    boundary: "同时改变多个设置会失去因果归属，平均值还可能掩盖长尾卡顿。",
  },
  {
    label: "验收",
    stage: "性能证据包",
    action:
      "把 美术资源优化 的正确性、性能、兼容性和失败重放装进同一份验收记录。",
    metric: "P50 + P95 + correctness",
    evidence:
      "Import Settings、Build Report、Memory Profiler 快照、加载时间线和设备端质量对照。",
    boundary:
      "磁盘压缩率、下载体积、解码成本和运行时显存不是同一指标；错误格式会把节省转成启动卡顿。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function OptimizingArtAssetsMapLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 4 · 美术资源优化"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function OptimizingArtAssetsExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 4 · 美术资源优化"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function OptimizingArtAssetsEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 4 · 美术资源优化"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
