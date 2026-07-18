"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "感知快照",
  "黑板",
  "组合节点",
  "Running 动作",
  "轨迹回放",
] as const;

export function Uct06BehaviorTreesMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 6 章 行为树在游戏中的运用：节点语义与案例回放 · 依赖地图"
      label="第 6 章 行为树在游戏中的运用"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct06BehaviorTreesExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 6 章 行为树在游戏中的运用：节点语义与案例回放 · 单变量实验"
      label="第 6 章 行为树在游戏中的运用"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct06BehaviorTreesEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 6 章 行为树在游戏中的运用：节点语义与案例回放 · 阶段门证据"
      label="第 6 章 行为树在游戏中的运用"
      nodes={nodes}
      mode="evidence"
    />
  );
}
