"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = ["离线界面", "投币", "推板", "金币堆", "奖励区", "帮助"] as const;

export function Ugc05TombCoinPusherMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第5章 古墓推金币：离线界面、硬币物理与奖励结算 · 案例谱系"
      label="第5章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc05TombCoinPusherExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第5章 古墓推金币：离线界面、硬币物理与奖励结算 · 单变量回放"
      label="第5章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc05TombCoinPusherEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第5章 古墓推金币：离线界面、硬币物理与奖励结算 · 发布证据"
      label="第5章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
