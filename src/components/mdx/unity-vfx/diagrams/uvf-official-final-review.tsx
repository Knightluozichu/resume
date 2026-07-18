"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "9章清单",
  "18例矩阵",
  "资产追溯",
  "正常边界失败",
  "移动预算",
  "迁移签发",
] as const;

export function UvfOfficialFinalReviewMapLab() {
  return (
    <OfficialUnityVfxLab
      title="《Unity 3D游戏特效制作典型实例》全书综合验收 · 案例谱系"
      label="总复习"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UvfOfficialFinalReviewExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="《Unity 3D游戏特效制作典型实例》全书综合验收 · 单变量回放"
      label="总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UvfOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="《Unity 3D游戏特效制作典型实例》全书综合验收 · 发布证据"
      label="总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
