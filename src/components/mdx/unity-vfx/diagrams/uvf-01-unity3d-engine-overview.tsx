"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "平台目标",
  "安装模块",
  "创建工程",
  "最小场景",
  "播放烟测",
  "构建记录",
] as const;

export function Uvf01Unity3dEngineOverviewMapLab() {
  return (
    <OfficialUnityVfxLab
      title="第1章 Unity3D游戏引擎概述 · 案例谱系"
      label="第1章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uvf01Unity3dEngineOverviewExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="第1章 Unity3D游戏引擎概述 · 单变量回放"
      label="第1章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uvf01Unity3dEngineOverviewEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="第1章 Unity3D游戏引擎概述 · 发布证据"
      label="第1章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
