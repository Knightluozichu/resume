"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "热与瓶颈信号",
  "趋势窗口",
  "质量决策",
  "Scaler 执行",
  "体验观测",
  "恢复滞回",
] as const;

export function Mxrw05AdaptivePerformanceMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="Adaptive Performance：热状态驱动的动态质量"
      label="Adaptive Performance"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw05AdaptivePerformanceExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Adaptive Performance"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw05AdaptivePerformanceEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Adaptive Performance"
      nodes={nodes}
      mode="evidence"
    />
  );
}
