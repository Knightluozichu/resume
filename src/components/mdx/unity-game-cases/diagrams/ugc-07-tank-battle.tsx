"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = ["选关", "坦克", "瞄准", "炮弹", "弹药时间", "得分"] as const;

export function Ugc07TankBattleMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第7章 坦克大战：选关、炮弹、提示板与得分链 · 案例谱系"
      label="第7章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc07TankBattleExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第7章 坦克大战：选关、炮弹、提示板与得分链 · 单变量回放"
      label="第7章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc07TankBattleEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第7章 坦克大战：选关、炮弹、提示板与得分链 · 发布证据"
      label="第7章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
