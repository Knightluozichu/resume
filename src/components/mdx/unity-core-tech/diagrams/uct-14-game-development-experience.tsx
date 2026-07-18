"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "真机调试",
  "安全边界",
  "包体分类",
  "资源生命周期",
  "受控并发下载",
] as const;

export function Uct14GameDevelopmentExperienceMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 14 章 游戏开发经验分享：调试、安全、包体与下载 · 依赖地图"
      label="第 14 章 游戏开发经验分享"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct14GameDevelopmentExperienceExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 14 章 游戏开发经验分享：调试、安全、包体与下载 · 单变量实验"
      label="第 14 章 游戏开发经验分享"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct14GameDevelopmentExperienceEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 14 章 游戏开发经验分享：调试、安全、包体与下载 · 阶段门证据"
      label="第 14 章 游戏开发经验分享"
      nodes={nodes}
      mode="evidence"
    />
  );
}
