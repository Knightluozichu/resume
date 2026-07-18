"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "Timeline 总览",
  "最长线程",
  "Hierarchy 排序",
  "Self Time",
  "调用上下文",
  "目标改动",
] as const;

export function Prof03CpuRenderWorkerBoundsMapLab() {
  return (
    <ProfilingEvidenceLab
      title="CPU、渲染线程与工作线程瓶颈 · 系统地图"
      label="CPU-bound workflow"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof03CpuRenderWorkerBoundsExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="CPU、渲染线程与工作线程瓶颈 · 故障实验"
      label="CPU-bound workflow"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof03CpuRenderWorkerBoundsEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="CPU、渲染线程与工作线程瓶颈 · 证据验收"
      label="CPU-bound workflow"
      nodes={nodes}
      mode="evidence"
    />
  );
}
