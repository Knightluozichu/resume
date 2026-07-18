"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "游戏事件",
  "音频路由",
  "剪辑选择",
  "空间参数",
  "混合播放",
  "结束回收",
] as const;

export function Usg08AudioMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第8章 脚本与音频 · 系统地图"
      label="第8章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg08AudioExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第8章 脚本与音频 · 故障回放"
      label="第8章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg08AudioEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第8章 脚本与音频 · 验收证据"
      label="第8章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
