"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "采样目标",
  "视锥遮挡",
  "状态转换",
  "路径规划",
  "动作执行",
  "结果反馈",
] as const;

export function Usg11GameAiMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第11章 脚本与游戏AI · 系统地图"
      label="第11章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg11GameAiExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第11章 脚本与游戏AI · 故障回放"
      label="第11章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg11GameAiEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第11章 脚本与游戏AI · 验收证据"
      label="第11章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
