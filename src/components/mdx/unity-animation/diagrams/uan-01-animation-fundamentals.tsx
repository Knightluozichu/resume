"use client";

import { OfficialAnimationLab } from "./official-animation-lab";

const nodes = [
  "Understanding animation",
  "Rigid body animation",
  "Morph animation",
  "Animating through code - making things move",
] as const;

export function Uan01AnimationFundamentalsMapLab() {
  return (
    <OfficialAnimationLab
      title="第 1 章 Animation Fundamentals：变化、时间与代码动画 · 责任图"
      label="Chapter 1"
      nodes={nodes}
      accent="cyan"
      mode="map"
    />
  );
}

export function Uan01AnimationFundamentalsExperimentLab() {
  return (
    <OfficialAnimationLab
      title="第 1 章 Animation Fundamentals：变化、时间与代码动画 · 时间实验"
      label="Chapter 1"
      nodes={nodes}
      accent="amber"
      mode="experiment"
    />
  );
}

export function Uan01AnimationFundamentalsEvidenceLab() {
  return (
    <OfficialAnimationLab
      title="第 1 章 Animation Fundamentals：变化、时间与代码动画 · 证据面板"
      label="Chapter 1"
      nodes={nodes}
      accent="rose"
      mode="evidence"
    />
  );
}
