"use client";

import { OfficialAnimationLab } from "./official-animation-lab";

const nodes = [
  "Animation Fundamentals",
  "Native Animation",
  "Character Animation Fundamentals",
  "Blend Shapes, IK, and Movie Textures",
] as const;

export function UanOfficialFinalReviewMapLab() {
  return (
    <OfficialAnimationLab
      title="Unity 游戏动画设计：全书综合验收 · 责任图"
      label="Review"
      nodes={nodes}
      accent="cyan"
      mode="map"
    />
  );
}

export function UanOfficialFinalReviewExperimentLab() {
  return (
    <OfficialAnimationLab
      title="Unity 游戏动画设计：全书综合验收 · 时间实验"
      label="Review"
      nodes={nodes}
      accent="amber"
      mode="experiment"
    />
  );
}

export function UanOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialAnimationLab
      title="Unity 游戏动画设计：全书综合验收 · 证据面板"
      label="Review"
      nodes={nodes}
      accent="rose"
      mode="evidence"
    />
  );
}
