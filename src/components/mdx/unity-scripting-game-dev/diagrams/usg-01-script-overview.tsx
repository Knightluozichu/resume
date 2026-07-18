"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "读取输入",
  "计算位移",
  "移动小球",
  "进入触发器",
  "更新金币",
  "判定终点",
] as const;

export function Usg01ScriptOverviewMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第1章 Unity脚本概览 · 系统地图"
      label="第1章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg01ScriptOverviewExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第1章 Unity脚本概览 · 故障回放"
      label="第1章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg01ScriptOverviewEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第1章 Unity脚本概览 · 验收证据"
      label="第1章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
