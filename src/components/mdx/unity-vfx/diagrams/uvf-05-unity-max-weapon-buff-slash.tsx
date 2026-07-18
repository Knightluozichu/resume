"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "Max动画",
  "枢轴导出",
  "骨骼挂点",
  "材质序列",
  "粒子组合",
  "动作对拍",
] as const;

export function Uvf05UnityMaxWeaponBuffSlashMapLab() {
  return (
    <OfficialUnityVfxLab
      title="第5章 Unity3D与MAX的基本配合 · 案例谱系"
      label="第5章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uvf05UnityMaxWeaponBuffSlashExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="第5章 Unity3D与MAX的基本配合 · 单变量回放"
      label="第5章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uvf05UnityMaxWeaponBuffSlashEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="第5章 Unity3D与MAX的基本配合 · 发布证据"
      label="第5章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
