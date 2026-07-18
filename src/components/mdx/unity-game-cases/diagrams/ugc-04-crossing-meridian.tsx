"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = [
  "NGUI界面",
  "触摸输入",
  "Player",
  "敌人AI",
  "炸弹",
  "结算",
] as const;

export function Ugc04CrossingMeridianMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第4章 穿越子午线：NGUI、触摸输入与敌人AI · 案例谱系"
      label="第4章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc04CrossingMeridianExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第4章 穿越子午线：NGUI、触摸输入与敌人AI · 单变量回放"
      label="第4章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc04CrossingMeridianEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第4章 穿越子午线：NGUI、触摸输入与敌人AI · 发布证据"
      label="第4章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
