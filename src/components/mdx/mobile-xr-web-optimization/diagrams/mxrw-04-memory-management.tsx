"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "平台上限",
  "内存预算",
  "快照基线",
  "分配归因",
  "GC策略",
  "生命周期复验",
] as const;

export function Mxrw04MemoryManagementMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="内存管理：预算、快照、分配与增量 GC"
      label="Memory management for XR, web, and mobile games"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw04MemoryManagementExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Memory management for XR, web, and mobile games"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw04MemoryManagementEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Memory management for XR, web, and mobile games"
      nodes={nodes}
      mode="evidence"
    />
  );
}
