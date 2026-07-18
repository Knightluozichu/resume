"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "鼠标屏幕量",
  "局部视角",
  "四元数旋转",
  "移动基底",
  "碰撞约束",
  "第一人称输出",
] as const;

export function Usg04GameMathMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第4章 游戏开发数学基础 · 系统地图"
      label="第4章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg04GameMathExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第4章 游戏开发数学基础 · 故障回放"
      label="第4章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg04GameMathEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第4章 游戏开发数学基础 · 验收证据"
      label="第4章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
