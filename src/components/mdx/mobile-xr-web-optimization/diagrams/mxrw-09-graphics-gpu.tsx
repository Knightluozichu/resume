"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "GPU基准",
  "渲染统计",
  "Frame Debugger",
  "瓶颈分类",
  "渲染改动",
  "画质回归",
] as const;

export function Mxrw09GraphicsGpuMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="图形与 GPU：Draw Call、光照、LOD 与分辨率"
      label="Graphics and GPU optimization"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw09GraphicsGpuExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Graphics and GPU optimization"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw09GraphicsGpuEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Graphics and GPU optimization"
      nodes={nodes}
      mode="evidence"
    />
  );
}
