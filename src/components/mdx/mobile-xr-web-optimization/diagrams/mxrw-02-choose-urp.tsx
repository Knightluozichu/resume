"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "平台约束",
  "URP Asset",
  "Renderer",
  "质量档位",
  "目标机捕获",
  "画质对照",
] as const;

export function Mxrw02ChooseUrpMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="选择 URP：性能、视觉质量与跨平台伸缩"
      label="Choose URP for performance and visual quality"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw02ChooseUrpExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Choose URP for performance and visual quality"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw02ChooseUrpEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Choose URP for performance and visual quality"
      nodes={nodes}
      mode="evidence"
    />
  );
}
