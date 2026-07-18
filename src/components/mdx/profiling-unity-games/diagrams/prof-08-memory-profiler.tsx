"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "快照 A",
  "复现流程",
  "快照 B",
  "分类差值",
  "引用链",
  "释放与复验",
] as const;

export function Prof08MemoryProfilerMapLab() {
  return (
    <ProfilingEvidenceLab
      title="Memory Profiler：快照、泄漏与 GC · 系统地图"
      label="Memory Profiler"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof08MemoryProfilerExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="Memory Profiler：快照、泄漏与 GC · 故障实验"
      label="Memory Profiler"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof08MemoryProfilerEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="Memory Profiler：快照、泄漏与 GC · 证据验收"
      label="Memory Profiler"
      nodes={nodes}
      mode="evidence"
    />
  );
}
