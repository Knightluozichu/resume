"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "目标机开发构建",
  "Profiler 捕获",
  "帧预算",
  "CPU/GPU 分流",
  "单点下钻",
  "同协议对照",
] as const;

export function Mxrw03ProfilingTipsMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="Profiling：目标机基线、帧预算与瓶颈归因"
      label="Profiling tips"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw03ProfilingTipsExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Profiling tips"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw03ProfilingTipsEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Profiling tips"
      nodes={nodes}
      mode="evidence"
    />
  );
}
