"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "游戏状态",
  "视图模型",
  "控件绑定",
  "输入事件",
  "布局适配",
  "界面反馈",
] as const;

export function Usg05UiSystemMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第5章 脚本与UI系统 · 系统地图"
      label="第5章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg05UiSystemExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第5章 脚本与UI系统 · 故障回放"
      label="第5章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg05UiSystemEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第5章 脚本与UI系统 · 验收证据"
      label="第5章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
