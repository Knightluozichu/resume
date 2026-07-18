"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "头显能力",
  "Render Mode",
  "眼缓冲",
  "注视点区域",
  "交互输入",
  "设备性能测试",
] as const;

export function Mxrw17XrMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="XR：Render Mode、注视点渲染与交互测试"
      label="XR optimization tips"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw17XrExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="XR optimization tips"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw17XrEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="XR optimization tips"
      nodes={nodes}
      mode="evidence"
    />
  );
}
