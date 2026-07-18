"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "引擎概述",
  "特效规范",
  "Unity与MAX",
  "场景与粒子",
  "攻击技能",
  "移动验收",
] as const;

export function UvfOfficialLearningMapMapLab() {
  return (
    <OfficialUnityVfxLab
      title="《Unity 3D游戏特效制作典型实例》权威学习地图 · 案例谱系"
      label="全书导读"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UvfOfficialLearningMapExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="《Unity 3D游戏特效制作典型实例》权威学习地图 · 单变量回放"
      label="全书导读"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UvfOfficialLearningMapEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="《Unity 3D游戏特效制作典型实例》权威学习地图 · 发布证据"
      label="全书导读"
      nodes={nodes}
      mode="evidence"
    />
  );
}
