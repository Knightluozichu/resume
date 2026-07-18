"use client";

import { OfficialUnityGameCaseLab } from "./official-unity-game-case-lab";

const nodes = [
  "传感器",
  "输入滤波",
  "迷宫倾斜",
  "滚球",
  "终点",
  "结果场景",
] as const;

export function Ugc033dMazeBoxMapLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第3章 3D迷宫魔盒：重力感应、滚球与关卡结果 · 案例谱系"
      label="第3章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ugc033dMazeBoxExperimentLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第3章 3D迷宫魔盒：重力感应、滚球与关卡结果 · 单变量回放"
      label="第3章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ugc033dMazeBoxEvidenceLab() {
  return (
    <OfficialUnityGameCaseLab
      title="第3章 3D迷宫魔盒：重力感应、滚球与关卡结果 · 发布证据"
      label="第3章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
