"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "运行状态",
  "DTO快照",
  "序列化",
  "原子落盘",
  "读取校验",
  "版本迁移",
] as const;

export function Usg10SaveLoadMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第10章 数据的保存与加载 · 系统地图"
      label="第10章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg10SaveLoadExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第10章 数据的保存与加载 · 故障回放"
      label="第10章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg10SaveLoadEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第10章 数据的保存与加载 · 验收证据"
      label="第10章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
