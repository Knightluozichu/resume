"use client";

import { OfficialAnimationLab } from "./official-animation-lab";

const nodes = [
  "Chapter 1. Animation Fundamentals",
  "Chapter 2. Sprite Animation",
  "Chapter 3. Native Animation",
  "Chapter 4. Noncharacter Animation with Mecanim",
] as const;

export function UanOfficialLearningMapMapLab() {
  return (
    <OfficialAnimationLab
      title="Unity 游戏动画设计：官方学习地图 · 责任图"
      label="Guide"
      nodes={nodes}
      accent="cyan"
      mode="map"
    />
  );
}

export function UanOfficialLearningMapExperimentLab() {
  return (
    <OfficialAnimationLab
      title="Unity 游戏动画设计：官方学习地图 · 时间实验"
      label="Guide"
      nodes={nodes}
      accent="amber"
      mode="experiment"
    />
  );
}

export function UanOfficialLearningMapEvidenceLab() {
  return (
    <OfficialAnimationLab
      title="Unity 游戏动画设计：官方学习地图 · 证据面板"
      label="Guide"
      nodes={nodes}
      accent="rose"
      mode="evidence"
    />
  );
}
