"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "前摇提示",
  "动作挂点",
  "刀光生成",
  "命中判定",
  "连击窗口",
  "第三段收束",
] as const;

export function Uvf07PhysicalAttacksMapLab() {
  return (
    <OfficialUnityVfxLab
      title="第7章 物理攻击特效案例 · 案例谱系"
      label="第7章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uvf07PhysicalAttacksExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="第7章 物理攻击特效案例 · 单变量回放"
      label="第7章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uvf07PhysicalAttacksEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="第7章 物理攻击特效案例 · 发布证据"
      label="第7章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
