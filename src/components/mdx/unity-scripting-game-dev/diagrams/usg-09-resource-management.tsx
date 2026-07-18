"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "GUID引用",
  "构建依赖",
  "内容清单",
  "网络下载",
  "加载实例",
  "引用释放",
] as const;

export function Usg09ResourceManagementMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第9章 脚本与资源管理 · 系统地图"
      label="第9章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg09ResourceManagementExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第9章 脚本与资源管理 · 故障回放"
      label="第9章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg09ResourceManagementEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第9章 脚本与资源管理 · 验收证据"
      label="第9章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
