"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = [
  "球桌场景",
  "瞄准",
  "冲量",
  "碰撞",
  "进球判定",
  "多视角",
] as const;

export function Ugc023dBilliardsMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第2章 3D极品桌球：击球物理、Shader与多视角 · 案例谱系"
      label="第2章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc023dBilliardsExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第2章 3D极品桌球：击球物理、Shader与多视角 · 单变量回放"
      label="第2章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc023dBilliardsEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第2章 3D极品桌球：击球物理、Shader与多视角 · 发布证据"
      label="第2章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
