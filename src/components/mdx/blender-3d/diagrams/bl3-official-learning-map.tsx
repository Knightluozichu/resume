"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Part I. The Basics of Blender - Chapters 1-3",
  "Part II. Beginning a Project - Chapters 4-5",
  "Part III. Modeling in Blender - Chapters 6-7",
  "Part IV. Unwrapping, Painting, and Shading - Chapters 8-10",
] as const;

export function Bl3OfficialLearningMapMapLab() {
  return (
    <OfficialBlenderLab
      title="玩转 Blender：3D 动画角色创作（第 3 版）官方学习地图 · 资产管线"
      label="Guide"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl3OfficialLearningMapExperimentLab() {
  return (
    <OfficialBlenderLab
      title="玩转 Blender：3D 动画角色创作（第 3 版）官方学习地图 · 单变量检查"
      label="Guide"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl3OfficialLearningMapEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="玩转 Blender：3D 动画角色创作（第 3 版）官方学习地图 · 阶段门证据"
      label="Guide"
      nodes={nodes}
      mode="evidence"
    />
  );
}
