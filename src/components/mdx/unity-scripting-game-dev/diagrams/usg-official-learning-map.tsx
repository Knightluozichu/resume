"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "脚本基础",
  "物理数学",
  "表现系统",
  "资源数据",
  "AI潜行",
  "进阶签发",
] as const;

export function UsgOfficialLearningMapMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="《Unity 3D脚本编程与游戏开发》权威学习地图 · 系统地图"
      label="全书导读"
      nodes={nodes}
      mode="map"
    />
  );
}
export function UsgOfficialLearningMapExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="《Unity 3D脚本编程与游戏开发》权威学习地图 · 故障回放"
      label="全书导读"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function UsgOfficialLearningMapEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="《Unity 3D脚本编程与游戏开发》权威学习地图 · 验收证据"
      label="全书导读"
      nodes={nodes}
      mode="evidence"
    />
  );
}
