"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = [
  "环境基线",
  "十个案例",
  "场景谱系",
  "核心玩法",
  "失败注入",
  "迁移发布",
] as const;

export function UgcOfficialFinalReviewMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="《Unity游戏案例开发大全》全书综合验收 · 案例谱系"
      label="全书总复习"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UgcOfficialFinalReviewExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="《Unity游戏案例开发大全》全书综合验收 · 单变量回放"
      label="全书总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UgcOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="《Unity游戏案例开发大全》全书综合验收 · 发布证据"
      label="全书总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
