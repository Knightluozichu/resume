"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "书籍身份",
  "14章目录",
  "运行时契约",
  "移动效果与架构",
  "真机发布证据",
] as const;

export function UctOfficialLearningMapMapLab() {
  return (
    <OfficialUnityCoreLab
      title="Unity 3D 实战核心技术详解：权威学习地图 · 依赖地图"
      label="全书导读"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UctOfficialLearningMapExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="Unity 3D 实战核心技术详解：权威学习地图 · 单变量实验"
      label="全书导读"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UctOfficialLearningMapEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="Unity 3D 实战核心技术详解：权威学习地图 · 阶段门证据"
      label="全书导读"
      nodes={nodes}
      mode="evidence"
    />
  );
}
