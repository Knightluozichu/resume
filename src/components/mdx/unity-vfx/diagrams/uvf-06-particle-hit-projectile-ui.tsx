"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "触发事件",
  "位置法线",
  "头部拖尾",
  "命中爆发",
  "UI排序",
  "池化回收",
] as const;

export function Uvf06ParticleHitProjectileUiMapLab() {
  return (
    <OfficialUnityVfxLab
      title="第6章 深入学习粒子系统 · 案例谱系"
      label="第6章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uvf06ParticleHitProjectileUiExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="第6章 深入学习粒子系统 · 单变量回放"
      label="第6章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uvf06ParticleHitProjectileUiEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="第6章 深入学习粒子系统 · 发布证据"
      label="第6章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
