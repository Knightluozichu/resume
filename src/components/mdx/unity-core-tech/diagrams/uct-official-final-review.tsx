"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "14章契约图",
  "垂直切片",
  "真机性能",
  "故障回放",
  "发布签发",
] as const;

export function UctOfficialFinalReviewMapLab() {
  return (
    <OfficialUnityCoreLab
      title="Unity 3D 实战核心技术详解：全书综合验收 · 依赖地图"
      label="全书综合验收"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UctOfficialFinalReviewExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="Unity 3D 实战核心技术详解：全书综合验收 · 单变量实验"
      label="全书综合验收"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UctOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="Unity 3D 实战核心技术详解：全书综合验收 · 阶段门证据"
      label="全书综合验收"
      nodes={nodes}
      mode="evidence"
    />
  );
}
