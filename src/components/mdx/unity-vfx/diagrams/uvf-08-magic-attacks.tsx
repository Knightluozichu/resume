"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "蓄力颜色",
  "目标采样",
  "主体生成",
  "状态覆盖",
  "命中反馈",
  "材质恢复",
] as const;

export function Uvf08MagicAttacksMapLab() {
  return (
    <OfficialUnityVfxLab
      title="第8章 法术攻击特效案例 · 案例谱系"
      label="第8章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uvf08MagicAttacksExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="第8章 法术攻击特效案例 · 单变量回放"
      label="第8章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uvf08MagicAttacksEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="第8章 法术攻击特效案例 · 发布证据"
      label="第8章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
