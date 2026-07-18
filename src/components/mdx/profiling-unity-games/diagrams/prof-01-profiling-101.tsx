"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "目标 FPS",
  "预算毫秒",
  "CPU 帧",
  "GPU 帧",
  "VSync 等待",
  "瓶颈结论",
] as const;

export function Prof01Profiling101MapLab() {
  return (
    <ProfilingEvidenceLab
      title="Profiling 101：帧预算、帧结构与测量方法 · 系统地图"
      label="Profiling 101"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof01Profiling101ExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="Profiling 101：帧预算、帧结构与测量方法 · 故障实验"
      label="Profiling 101"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof01Profiling101EvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="Profiling 101：帧预算、帧结构与测量方法 · 证据验收"
      label="Profiling 101"
      nodes={nodes}
      mode="evidence"
    />
  );
}
