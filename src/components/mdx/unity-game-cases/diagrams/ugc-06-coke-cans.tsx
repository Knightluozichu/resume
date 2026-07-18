"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = ["选关", "滑屏轨迹", "发球", "罐阵", "分数板", "回合"] as const;

export function Ugc06CokeCansMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第6章 益智休闲类游戏——可乐可乐：滑屏发球与罐阵计分 · 案例谱系"
      label="第6章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc06CokeCansExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第6章 益智休闲类游戏——可乐可乐：滑屏发球与罐阵计分 · 单变量回放"
      label="第6章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc06CokeCansEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第6章 益智休闲类游戏——可乐可乐：滑屏发球与罐阵计分 · 发布证据"
      label="第6章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
