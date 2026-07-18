"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "源资产",
  "导入预设",
  "平台覆盖",
  "构建数据",
  "Addressables",
  "运行时驻留",
] as const;

export function Mxrw06AssetsMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="资产：纹理、网格、导入门禁与 Addressables"
      label="Assets"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw06AssetsExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Assets"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw06AssetsEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Assets"
      nodes={nodes}
      mode="evidence"
    />
  );
}
