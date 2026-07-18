"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "潜行目标",
  "主角控制",
  "武器道具",
  "敌人感知FSM",
  "关卡交互",
  "成功失败",
] as const;

export function Usg12SecretCommandosMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第12章 综合实例——秘密敢死队 · 系统地图"
      label="第12章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg12SecretCommandosExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第12章 综合实例——秘密敢死队 · 故障回放"
      label="第12章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg12SecretCommandosEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第12章 综合实例——秘密敢死队 · 验收证据"
      label="第12章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
