"use client";

import { OfficialAnimationLab } from "./official-animation-lab";

const nodes = [
  "Creating rigged characters",
  "Avatars and retargeting",
  "Retargeting animations",
  "Root motion",
] as const;

export function Uan05CharacterAnimationFundamentalsMapLab() {
  return (
    <OfficialAnimationLab
      title="第 5 章 Character Animation Fundamentals：骨骼、Avatar 与根运动 · 责任图"
      label="Chapter 5"
      nodes={nodes}
      accent="cyan"
      mode="map"
    />
  );
}

export function Uan05CharacterAnimationFundamentalsExperimentLab() {
  return (
    <OfficialAnimationLab
      title="第 5 章 Character Animation Fundamentals：骨骼、Avatar 与根运动 · 时间实验"
      label="Chapter 5"
      nodes={nodes}
      accent="amber"
      mode="experiment"
    />
  );
}

export function Uan05CharacterAnimationFundamentalsEvidenceLab() {
  return (
    <OfficialAnimationLab
      title="第 5 章 Character Animation Fundamentals：骨骼、Avatar 与根运动 · 证据面板"
      label="Chapter 5"
      nodes={nodes}
      accent="rose"
      mode="evidence"
    />
  );
}
