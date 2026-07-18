"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = [
  "飞机",
  "剧情",
  "经典模式",
  "时间模式",
  "星星圆圈",
  "加载",
] as const;

export function Ugc10SaveMushroomVillageMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第10章 拯救蘑菇村：飞机、剧情场景与双模式飞行 · 案例谱系"
      label="第10章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc10SaveMushroomVillageExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第10章 拯救蘑菇村：飞机、剧情场景与双模式飞行 · 单变量回放"
      label="第10章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc10SaveMushroomVillageEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第10章 拯救蘑菇村：飞机、剧情场景与双模式飞行 · 发布证据"
      label="第10章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
