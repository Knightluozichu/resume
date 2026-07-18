"use client";

import { OfficialAnimationLab } from "./official-animation-lab";

const nodes = [
  "Creating a controllable character",
  "Dimensions",
  "Mapping floats",
  "Preparing to script with Blend Tree animations",
] as const;

export function Uan06AdvancedCharacterAnimationMapLab() {
  return (
    <OfficialAnimationLab
      title="第 6 章 Advanced Character Animation：可控角色与 Blend Tree · 责任图"
      label="Chapter 6"
      nodes={nodes}
      accent="cyan"
      mode="map"
    />
  );
}

export function Uan06AdvancedCharacterAnimationExperimentLab() {
  return (
    <OfficialAnimationLab
      title="第 6 章 Advanced Character Animation：可控角色与 Blend Tree · 时间实验"
      label="Chapter 6"
      nodes={nodes}
      accent="amber"
      mode="experiment"
    />
  );
}

export function Uan06AdvancedCharacterAnimationEvidenceLab() {
  return (
    <OfficialAnimationLab
      title="第 6 章 Advanced Character Animation：可控角色与 Blend Tree · 证据面板"
      label="Chapter 6"
      nodes={nodes}
      accent="rose"
      mode="evidence"
    />
  );
}
