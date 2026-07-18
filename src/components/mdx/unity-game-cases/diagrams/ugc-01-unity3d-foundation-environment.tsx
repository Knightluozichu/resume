"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = [
  "Unity版本",
  "编辑器",
  "目标SDK",
  "项目导入",
  "场景入口",
  "运行日志",
] as const;

export function Ugc01Unity3dFoundationEnvironmentMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第1章 Unity 3D基础以及开发环境的搭建 · 案例谱系"
      label="第1章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc01Unity3dFoundationEnvironmentExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第1章 Unity 3D基础以及开发环境的搭建 · 单变量回放"
      label="第1章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc01Unity3dFoundationEnvironmentEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第1章 Unity 3D基础以及开发环境的搭建 · 发布证据"
      label="第1章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
