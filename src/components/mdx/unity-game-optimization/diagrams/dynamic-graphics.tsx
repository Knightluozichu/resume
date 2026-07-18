import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "边界",
    stage: "Chapter 6 官方范围",
    action: "核对 Dynamic Graphics 及 3 个官方主题，保持一章一对一身份。",
    metric: "3 topics",
    evidence:
      "https://subscription.packtpub.com/book/game-development/9781838556518/pref/preflvl1sec03/what-this-book-covers + ISBN 9781838556518",
    boundary: "目录覆盖只证明范围完整，仍需实验、失败样本与目标设备证据。",
  },
  {
    label: "模型",
    stage: "成本模型与不变量",
    action:
      "沿 CPU 提交、顶点、光栅、片元、带宽与后处理逐段定位瓶颈，再选择剔除、LOD、光照、阴影或 Shader 改动。",
    metric: "cause → cost",
    evidence:
      "固定镜头逐项减半分辨率、顶点量、光源、阴影距离和透明覆盖，利用响应方向定位受限阶段。",
    boundary:
      "Editor 的 GPU 时间可能不可用；只看 FPS 会隐藏 VSync、热降频、异步提交和 CPU/GPU 并行。",
  },
  {
    label: "迁移",
    stage: "2019/2020 到现代 Unity",
    action:
      "Built-in、URP 与 HDRP 的工具入口不同，但先判 CPU/GPU bound、再缩小阶段的诊断顺序不变。",
    metric: "API ≠ principle",
    evidence: "记录原书载体、现代 API、保持的不变量和已知差异。",
    boundary:
      "不能把当前 API 名称倒写成原书事实，也不能把旧 API 直接当作当前最佳实践。",
  },
  {
    label: "采样",
    stage: "单变量对照实验",
    action:
      "固定镜头逐项减半分辨率、顶点量、光源、阴影距离和透明覆盖，利用响应方向定位受限阶段。",
    metric: "baseline / candidate",
    evidence:
      "GPU Recorder、Frame Debugger、RenderDoc/平台捕获、分辨率缩放曲线和画面差异图。",
    boundary: "同时改变多个设置会失去因果归属，平均值还可能掩盖长尾卡顿。",
  },
  {
    label: "验收",
    stage: "性能证据包",
    action: "把 动态图形 的正确性、性能、兼容性和失败重放装进同一份验收记录。",
    metric: "P50 + P95 + correctness",
    evidence:
      "GPU Recorder、Frame Debugger、RenderDoc/平台捕获、分辨率缩放曲线和画面差异图。",
    boundary:
      "Editor 的 GPU 时间可能不可用；只看 FPS 会隐藏 VSync、热降频、异步提交和 CPU/GPU 并行。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function DynamicGraphicsMapLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 6 · 动态图形"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function DynamicGraphicsExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 6 · 动态图形"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function DynamicGraphicsEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Chapter 6 · 动态图形"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
