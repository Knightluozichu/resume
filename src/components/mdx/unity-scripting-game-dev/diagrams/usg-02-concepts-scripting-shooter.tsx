"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "角色组件",
  "输入开火",
  "预制体生成",
  "子弹飞行",
  "敌人命中",
  "销毁回收",
] as const;

export function Usg02ConceptsScriptingShooterMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第2章 Unity基本概念与脚本编程 · 系统地图"
      label="第2章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg02ConceptsScriptingShooterExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第2章 Unity基本概念与脚本编程 · 故障回放"
      label="第2章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg02ConceptsScriptingShooterEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第2章 Unity基本概念与脚本编程 · 验收证据"
      label="第2章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
