"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "13章覆盖",
  "基础案例",
  "表现资源数据",
  "AI潜行",
  "进阶机制",
  "全书签发",
] as const;

export function UsgOfficialFinalReviewMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="《Unity 3D脚本编程与游戏开发》全书综合验收 · 系统地图"
      label="总复习"
      nodes={nodes}
      mode="map"
    />
  );
}
export function UsgOfficialFinalReviewExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="《Unity 3D脚本编程与游戏开发》全书综合验收 · 故障回放"
      label="总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function UsgOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="《Unity 3D脚本编程与游戏开发》全书综合验收 · 验收证据"
      label="总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
