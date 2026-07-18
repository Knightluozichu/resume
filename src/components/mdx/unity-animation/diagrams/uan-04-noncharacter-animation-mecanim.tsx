"use client";

import { OfficialAnimationLab } from "./official-animation-lab";

const nodes = [
  "Preparing a scene with the prototyping assets",
  "Creating animations for the button and door",
  "Getting started with Mecanim",
  "Mecanim transitions and parameters",
] as const;

export function Uan04NoncharacterAnimationMecanimMapLab() {
  return (
    <OfficialAnimationLab
      title="第 4 章 Noncharacter Animation with Mecanim：门与按钮状态图 · 责任图"
      label="Chapter 4"
      nodes={nodes}
      accent="cyan"
      mode="map"
    />
  );
}

export function Uan04NoncharacterAnimationMecanimExperimentLab() {
  return (
    <OfficialAnimationLab
      title="第 4 章 Noncharacter Animation with Mecanim：门与按钮状态图 · 时间实验"
      label="Chapter 4"
      nodes={nodes}
      accent="amber"
      mode="experiment"
    />
  );
}

export function Uan04NoncharacterAnimationMecanimEvidenceLab() {
  return (
    <OfficialAnimationLab
      title="第 4 章 Noncharacter Animation with Mecanim：门与按钮状态图 · 证据面板"
      label="Chapter 4"
      nodes={nodes}
      accent="rose"
      mode="evidence"
    />
  );
}
