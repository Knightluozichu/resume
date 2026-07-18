"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "平台设置",
  "质量设置",
  "帧率合同",
  "物理步进",
  "Transform层级",
  "发布验证",
] as const;

export function Mxrw08ProjectConfigurationMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="项目配置：帧率、层级、物理与 VSync"
      label="Project configuration"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw08ProjectConfigurationExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Project configuration"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw08ProjectConfigurationEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Project configuration"
      nodes={nodes}
      mode="evidence"
    />
  );
}
