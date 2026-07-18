"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "固定协议",
  "预热设备",
  "录制基线",
  "定位瓶颈",
  "单变量修改",
  "同协议复验",
] as const;

export function Prof02ProfilingWorkflowMapLab() {
  return (
    <ProfilingEvidenceLab
      title="端到端 Profiling 工作流与性能基线 · 系统地图"
      label="Profiling workflow"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof02ProfilingWorkflowExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="端到端 Profiling 工作流与性能基线 · 故障实验"
      label="Profiling workflow"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof02ProfilingWorkflowEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="端到端 Profiling 工作流与性能基线 · 证据验收"
      label="Profiling workflow"
      nodes={nodes}
      mode="evidence"
    />
  );
}
