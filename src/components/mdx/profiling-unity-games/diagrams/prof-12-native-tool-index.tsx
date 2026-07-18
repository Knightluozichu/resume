"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "目标平台",
  "问题类型",
  "Unity 捕获",
  "原生工具",
  "硬件计数器",
  "交叉结论",
] as const;

export function Prof12NativeToolIndexMapLab() {
  return (
    <ProfilingEvidenceLab
      title="原生平台 Profiling 工具索引 · 系统地图"
      label="Native profiling tools"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof12NativeToolIndexExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="原生平台 Profiling 工具索引 · 故障实验"
      label="Native profiling tools"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof12NativeToolIndexEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="原生平台 Profiling 工具索引 · 证据验收"
      label="Native profiling tools"
      nodes={nodes}
      mode="evidence"
    />
  );
}
