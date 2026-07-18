"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "最低设备",
  "系统余量",
  "总预算",
  "分类配额",
  "固定节点快照",
  "峰值门禁",
] as const;

export function Prof05MemoryBudgetProfilingMapLab() {
  return (
    <ProfilingEvidenceLab
      title="内存预算与 Memory Profiling 方法 · 系统地图"
      label="Memory profiling"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof05MemoryBudgetProfilingExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="内存预算与 Memory Profiling 方法 · 故障实验"
      label="Memory profiling"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof05MemoryBudgetProfilingEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="内存预算与 Memory Profiling 方法 · 证据验收"
      label="Memory profiling"
      nodes={nodes}
      mode="evidence"
    />
  );
}
