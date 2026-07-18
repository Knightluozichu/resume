"use client";

import { MobileXrWebEvidenceLab } from "./official-mobile-xr-web-lab";

const nodes = [
  "PlayerLoop",
  "高频回调",
  "数据访问",
  "对象生命周期",
  "池化复位",
  "ProfilerMarker",
] as const;

export function Mxrw07ProgrammingArchitectureMapLab() {
  return (
    <MobileXrWebEvidenceLab
      title="编程与代码架构：PlayerLoop、缓存与对象池"
      label="Programming and code architecture"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Mxrw07ProgrammingArchitectureExperimentLab() {
  return (
    <MobileXrWebEvidenceLab
      title="单变量反证实验"
      label="Programming and code architecture"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Mxrw07ProgrammingArchitectureEvidenceLab() {
  return (
    <MobileXrWebEvidenceLab
      title="目标机证据签发"
      label="Programming and code architecture"
      nodes={nodes}
      mode="evidence"
    />
  );
}
