"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "情绪意图",
  "效果分类",
  "色彩脚本",
  "贴图规格",
  "层级组合",
  "移动预算",
] as const;

export function Uvf02VfxFoundationsMapLab() {
  return (
    <OfficialUnityVfxLab
      title="第2章 游戏特效基础知识 · 案例谱系"
      label="第2章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uvf02VfxFoundationsExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="第2章 游戏特效基础知识 · 单变量回放"
      label="第2章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uvf02VfxFoundationsEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="第2章 游戏特效基础知识 · 发布证据"
      label="第2章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
