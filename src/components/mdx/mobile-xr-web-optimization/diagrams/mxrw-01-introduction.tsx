"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "体验目标",
  "设备矩阵",
  "性能预算",
  "基线采样",
  "单变量修改",
  "回归签发",
] as const;

export function Mxrw01IntroductionMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="导言：把优化变成贯穿开发周期的工程合同"
      label="Introduction"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw01IntroductionExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Introduction"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw01IntroductionEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Introduction"
      nodes={nodes}
      mode="evidence"
    />
  );
}
