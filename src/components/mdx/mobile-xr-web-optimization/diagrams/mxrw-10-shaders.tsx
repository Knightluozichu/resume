"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "材质与变体",
  "目标GPU捕获",
  "指令与带宽",
  "过绘热图",
  "视觉对照",
  "变体门禁",
] as const;

export function Mxrw10ShadersMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="Shader：过绘、透明、后处理与移动 GPU 指标"
      label="Shaders"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw10ShadersExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Shaders"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw10ShadersEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Shaders"
      nodes={nodes}
      mode="evidence"
    />
  );
}
