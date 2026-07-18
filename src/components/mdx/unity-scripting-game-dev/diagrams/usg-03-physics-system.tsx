"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "采样输入",
  "FixedUpdate",
  "施力速度",
  "碰撞射线",
  "接地判定",
  "平台结果",
] as const;

export function Usg03PhysicsSystemMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第3章 物理系统 · 系统地图"
      label="第3章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg03PhysicsSystemExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第3章 物理系统 · 故障回放"
      label="第3章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg03PhysicsSystemEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第3章 物理系统 · 验收证据"
      label="第3章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
