"use client";

import { OfficialUnityVfxLab } from "./official-unity-vfx-lab";

const nodes = [
  "技能语义",
  "目标或入口",
  "主体Prefab",
  "阶段触发",
  "数值反馈",
  "结束回收",
] as const;

export function Uvf09CommonSkillsMapLab() {
  return (
    <OfficialUnityVfxLab
      title="第9章 通用类技能特效案例 · 案例谱系"
      label="第9章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uvf09CommonSkillsExperimentLab() {
  return (
    <OfficialUnityVfxLab
      title="第9章 通用类技能特效案例 · 单变量回放"
      label="第9章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uvf09CommonSkillsEvidenceLab() {
  return (
    <OfficialUnityVfxLab
      title="第9章 通用类技能特效案例 · 发布证据"
      label="第9章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
