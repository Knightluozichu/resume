"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "Max导出",
  "Unity导入",
  "粒子属性",
  "材质光源",
  "Prefab封装",
  "摄像机验收",
] as const;

export function Uvf03Unity3dFoundationsMapLab() {
  return (
    <OfficialUnityVfxLab
      title="第3章 Unity3D基础知识入门 · 案例谱系"
      label="第3章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uvf03Unity3dFoundationsExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="第3章 Unity3D基础知识入门 · 单变量回放"
      label="第3章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uvf03Unity3dFoundationsEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="第3章 Unity3D基础知识入门 · 发布证据"
      label="第3章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
