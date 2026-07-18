"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "Unity 异常帧",
  "图形 API 捕获",
  "慢 Draw",
  "状态与资源",
  "硬件计数器",
  "优化复验",
] as const;

export function Prof13GpuToolsResourcesMapLab() {
  return (
    <ProfilingEvidenceLab
      title="GPU 调试工具与进阶资源 · 系统地图"
      label="GPU tools and advanced resources"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof13GpuToolsResourcesExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="GPU 调试工具与进阶资源 · 故障实验"
      label="GPU tools and advanced resources"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof13GpuToolsResourcesEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="GPU 调试工具与进阶资源 · 证据验收"
      label="GPU tools and advanced resources"
      nodes={nodes}
      mode="evidence"
    />
  );
}
