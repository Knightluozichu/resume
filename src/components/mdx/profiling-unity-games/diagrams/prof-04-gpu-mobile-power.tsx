"use client";

import { ProfilingEvidenceLab } from "./official-profiling-lab";

const nodes = [
  "GPU 等待信号",
  "平台捕获",
  "绘制或带宽",
  "功耗温度",
  "质量档位",
  "长时复验",
] as const;

export function Prof04GpuMobilePowerMapLab() {
  return (
    <ProfilingEvidenceLab
      title="GPU 瓶颈、移动端温控与电池寿命 · 系统地图"
      label="GPU and mobile challenges"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Prof04GpuMobilePowerExperimentLab() {
  return (
    <ProfilingEvidenceLab
      title="GPU 瓶颈、移动端温控与电池寿命 · 故障实验"
      label="GPU and mobile challenges"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Prof04GpuMobilePowerEvidenceLab() {
  return (
    <ProfilingEvidenceLab
      title="GPU 瓶颈、移动端温控与电池寿命 · 证据验收"
      label="GPU and mobile challenges"
      nodes={nodes}
      mode="evidence"
    />
  );
}
