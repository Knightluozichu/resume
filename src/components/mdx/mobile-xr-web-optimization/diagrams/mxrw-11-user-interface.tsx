"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "UI变更",
  "布局与样式",
  "几何重建",
  "绘制与过绘",
  "输入事件",
  "多分辨率回归",
] as const;

export function Mxrw11UserInterfaceMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="用户界面：UGUI Canvas 与 UI Toolkit 成本模型"
      label="User interface"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw11UserInterfaceExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="User interface"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw11UserInterfaceEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="User interface"
      nodes={nodes}
      mode="evidence"
    />
  );
}
