"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "静态审计",
  "高层捕获",
  "缩小脚本",
  "短时深度分析",
  "手写标记",
  "无深度复验",
] as const;

export function Prof10ProjectAuditorDeepProfilingMapLab() {
  return (
    <ProfilingEvidenceLab
      title="Project Auditor 与 Deep Profiling · 系统地图"
      label="Project Auditor and Deep Profiling"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof10ProjectAuditorDeepProfilingExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="Project Auditor 与 Deep Profiling · 故障实验"
      label="Project Auditor and Deep Profiling"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof10ProjectAuditorDeepProfilingEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="Project Auditor 与 Deep Profiling · 证据验收"
      label="Project Auditor and Deep Profiling"
      nodes={nodes}
      mode="evidence"
    />
  );
}
