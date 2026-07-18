"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "风与波参数",
  "海面 LOD",
  "顶点位移",
  "浮力查询",
  "移动渲染档位",
] as const;

export function Uct09MobileOceanSimulationMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 9 章 移动端海水仿真技术：网格、波浪、浮力与渲染 · 依赖地图"
      label="第 9 章 移动端海水仿真技术"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct09MobileOceanSimulationExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 9 章 移动端海水仿真技术：网格、波浪、浮力与渲染 · 单变量实验"
      label="第 9 章 移动端海水仿真技术"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct09MobileOceanSimulationEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 9 章 移动端海水仿真技术：网格、波浪、浮力与渲染 · 阶段门证据"
      label="第 9 章 移动端海水仿真技术"
      nodes={nodes}
      mode="evidence"
    />
  );
}
