"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "开发构建",
  "目标设备",
  "关闭干扰",
  "录制区间",
  "Timeline",
  "保存捕获",
] as const;

export function Prof06UnityProfilerMapLab() {
  return (
    <ProfilingEvidenceLab
      title="Unity Profiler：连接、采集与读图 · 系统地图"
      label="Unity Profiler"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof06UnityProfilerExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="Unity Profiler：连接、采集与读图 · 故障实验"
      label="Unity Profiler"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof06UnityProfilerEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="Unity Profiler：连接、采集与读图 · 证据验收"
      label="Unity Profiler"
      nodes={nodes}
      mode="evidence"
    />
  );
}
