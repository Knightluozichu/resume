"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "时间采样",
  "BakeMesh",
  "世界变换",
  "透明衰减",
  "对象池回收",
] as const;

export function Uct07AfterimageMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 7 章 残影：蒙皮快照、透明衰减与对象复用 · 依赖地图"
      label="第 7 章 残影"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct07AfterimageExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 7 章 残影：蒙皮快照、透明衰减与对象复用 · 单变量实验"
      label="第 7 章 残影"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct07AfterimageEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 7 章 残影：蒙皮快照、透明衰减与对象复用 · 阶段门证据"
      label="第 7 章 残影"
      nodes={nodes}
      mode="evidence"
    />
  );
}
