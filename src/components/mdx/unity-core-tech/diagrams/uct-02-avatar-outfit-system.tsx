"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "服装描述",
  "骨架签名",
  "路径映射",
  "Renderer 装配",
  "极限姿态验收",
] as const;

export function Uct02AvatarOutfitSystemMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 2 章 Avatar 换装系统：骨骼映射与网格装配 · 依赖地图"
      label="第 2 章 Avatar 换装系统"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct02AvatarOutfitSystemExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 2 章 Avatar 换装系统：骨骼映射与网格装配 · 单变量实验"
      label="第 2 章 Avatar 换装系统"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct02AvatarOutfitSystemEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 2 章 Avatar 换装系统：骨骼映射与网格装配 · 阶段门证据"
      label="第 2 章 Avatar 换装系统"
      nodes={nodes}
      mode="evidence"
    />
  );
}
