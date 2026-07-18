"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "捕获 A",
  "捕获 B",
  "同区间过滤",
  "中位帧",
  "最长帧",
  "标记差值",
] as const;

export function Prof07ProfileAnalyzerMapLab() {
  return (
    <ProfilingEvidenceLab
      title="Profile Analyzer：多帧统计与前后对比 · 系统地图"
      label="Profile Analyzer"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof07ProfileAnalyzerExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="Profile Analyzer：多帧统计与前后对比 · 故障实验"
      label="Profile Analyzer"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof07ProfileAnalyzerEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="Profile Analyzer：多帧统计与前后对比 · 证据验收"
      label="Profile Analyzer"
      nodes={nodes}
      mode="evidence"
    />
  );
}
