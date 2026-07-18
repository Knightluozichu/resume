"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "角色意图",
  "动画参数",
  "状态过渡",
  "融合根运动",
  "帧事件IK",
  "姿态结果",
] as const;

export function Usg06AnimationSystemMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第6章 脚本与动画系统 · 系统地图"
      label="第6章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg06AnimationSystemExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第6章 脚本与动画系统 · 故障回放"
      label="第6章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg06AnimationSystemEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第6章 脚本与动画系统 · 验收证据"
      label="第6章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
