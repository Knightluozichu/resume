"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = [
  "小狗",
  "跑道",
  "碰撞监视器",
  "金币",
  "磁铁",
  "圆球",
  "教程加载",
] as const;

export function Ugc08DogRunnerMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第8章 酷跑类游戏——小狗快跑：碰撞监视器与道具链 · 案例谱系"
      label="第8章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc08DogRunnerExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第8章 酷跑类游戏——小狗快跑：碰撞监视器与道具链 · 单变量回放"
      label="第8章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc08DogRunnerEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第8章 酷跑类游戏——小狗快跑：碰撞监视器与道具链 · 发布证据"
      label="第8章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
