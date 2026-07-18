"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = [
  "环境",
  "策划",
  "场景架构",
  "核心玩法",
  "移动交互",
  "优化证据",
] as const;

export function UgcOfficialLearningMapMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="《Unity游戏案例开发大全》权威学习地图 · 案例谱系"
      label="全书导读"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UgcOfficialLearningMapExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="《Unity游戏案例开发大全》权威学习地图 · 单变量回放"
      label="全书导读"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UgcOfficialLearningMapEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="《Unity游戏案例开发大全》权威学习地图 · 发布证据"
      label="全书导读"
      nodes={nodes}
      mode="evidence"
    />
  );
}
