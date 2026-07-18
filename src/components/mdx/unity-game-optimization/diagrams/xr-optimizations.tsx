import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "边界",
    stage: "Chapter 7 官方范围",
    action:
      "核对 Optimizations for Virtual and Augmented Reality 及 3 个官方主题，保持一章一对一身份。",
    metric: "3 topics",
    evidence:
      "https://subscription.packtpub.com/book/game-development/9781838556518/pref/preflvl1sec03/what-this-book-covers + ISBN 9781838556518",
    boundary: "目录覆盖只证明范围完整，仍需实验、失败样本与目标设备证据。",
  },
  {
    label: "模型",
    stage: "成本模型与不变量",
    action:
      "XR 把双眼渲染、显示刷新、姿态预测、合成与 motion-to-photon 约束叠到普通帧预算之上。",
    metric: "cause → cost",
    evidence:
      "在真机依次比较 Multi Pass、Single Pass Instanced、Render Scale 与 Foveated Rendering，并保存双眼正确性。",
    boundary:
      "桌面 Game View 不能替代头显；单眼正确、平均 FPS 达标也不能证明姿态延迟与尾部帧稳定。",
  },
  {
    label: "迁移",
    stage: "2019/2020 到现代 Unity",
    action:
      "OpenXR 与 XR Plug-in Management 取代旧 SDK 接入，但单/多 Pass、分辨率、注视点、重投影和设备热预算仍是核心。",
    metric: "API ≠ principle",
    evidence: "记录原书载体、现代 API、保持的不变量和已知差异。",
    boundary:
      "不能把当前 API 名称倒写成原书事实，也不能把旧 API 直接当作当前最佳实践。",
  },
  {
    label: "采样",
    stage: "单变量对照实验",
    action:
      "在真机依次比较 Multi Pass、Single Pass Instanced、Render Scale 与 Foveated Rendering，并保存双眼正确性。",
    metric: "baseline / candidate",
    evidence:
      "设备端 CPU/GPU 帧时间、App/Compositor dropped frames、左右眼截图、热状态和输入延迟。",
    boundary: "同时改变多个设置会失去因果归属，平均值还可能掩盖长尾卡顿。",
  },
  {
    label: "验收",
    stage: "性能证据包",
    action: "把 XR 优化 的正确性、性能、兼容性和失败重放装进同一份验收记录。",
    metric: "P50 + P95 + correctness",
    evidence:
      "设备端 CPU/GPU 帧时间、App/Compositor dropped frames、左右眼截图、热状态和输入延迟。",
    boundary:
      "桌面 Game View 不能替代头显；单眼正确、平均 FPS 达标也不能证明姿态延迟与尾部帧稳定。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function XrOptimizationsMapLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 7 · XR 优化"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function XrOptimizationsExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 7 · XR 优化"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function XrOptimizationsEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 7 · XR 优化"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
