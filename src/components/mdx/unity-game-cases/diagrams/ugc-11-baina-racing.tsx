"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = [
  "赛车",
  "虚拟体感输入",
  "计时模式",
  "竞速模式",
  "道路监视器",
  "终点",
] as const;

export function Ugc11BainaRacingMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第11章 百纳赛车：计时、竞速、道路监视与体感控制 · 案例谱系"
      label="第11章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc11BainaRacingExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第11章 百纳赛车：计时、竞速、道路监视与体感控制 · 单变量回放"
      label="第11章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc11BainaRacingEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第11章 百纳赛车：计时、竞速、道路监视与体感控制 · 发布证据"
      label="第11章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
