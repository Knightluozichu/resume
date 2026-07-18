"use client";

import { OfficialUnityScriptingGameLab } from "./official-unity-scripting-game-lab";

const nodes = [
  "Profiler证据",
  "池键租用",
  "对象重置",
  "迭代器挂起",
  "事件发布",
  "释放验收",
] as const;

export function Usg13AdvancedProgrammingMapLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第13章 进阶编程技术 · 系统地图"
      label="第13章"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Usg13AdvancedProgrammingExperimentLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第13章 进阶编程技术 · 故障回放"
      label="第13章"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Usg13AdvancedProgrammingEvidenceLab() {
  return (
    <OfficialUnityScriptingGameLab
      title="第13章 进阶编程技术 · 验收证据"
      label="第13章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
