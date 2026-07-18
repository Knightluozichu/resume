"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "构建设置",
  "压缩与裁剪",
  "Wasm特性",
  "浏览器加载",
  "DevTools采样",
  "兼容回归",
] as const;

export function Mxrw16UnityWebMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="Unity Web：发布设置、Wasm 2023 与 Chrome DevTools"
      label="Platform-specific tips for Unity Web Builds"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw16UnityWebExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Platform-specific tips for Unity Web Builds"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw16UnityWebEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Platform-specific tips for Unity Web Builds"
      nodes={nodes}
      mode="evidence"
    />
  );
}
