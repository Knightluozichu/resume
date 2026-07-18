"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "玩法事件",
  "效果选择",
  "空间绑定",
  "缓动拖尾",
  "后期叠加",
  "停止回收",
] as const;

export function Usg07EffectsMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第7章 脚本与特效 · 系统地图"
      label="第7章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg07EffectsExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第7章 脚本与特效 · 故障回放"
      label="第7章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg07EffectsEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第7章 脚本与特效 · 验收证据"
      label="第7章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
