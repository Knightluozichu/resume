"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "参考拆层",
  "发射形状",
  "生命周期",
  "材质混合",
  "风与空间",
  "场景对照",
] as const;

export function Uvf04SceneFireSnowMapLab() {
  return (
    <OfficialUnityVfxLab
      title="第4章 Unity3D场景特效分析与讲解 · 案例谱系"
      label="第4章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uvf04SceneFireSnowExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="第4章 Unity3D场景特效分析与讲解 · 单变量回放"
      label="第4章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uvf04SceneFireSnowEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="第4章 Unity3D场景特效分析与讲解 · 发布证据"
      label="第4章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
