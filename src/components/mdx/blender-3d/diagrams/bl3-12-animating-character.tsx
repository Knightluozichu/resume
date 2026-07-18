"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Using the Character's Rig",
  "Posing the Character",
  "Working with Animation Editors",
  "Animating a Walk Cycle",
] as const;

export function Bl312AnimatingCharacterMapLab() {
  return (
    <OfficialBlenderLab
      title="第 12 章 Animating Your Character：姿态、编辑器与行走循环 · 资产管线"
      label="Chapter 12"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl312AnimatingCharacterExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 12 章 Animating Your Character：姿态、编辑器与行走循环 · 单变量检查"
      label="Chapter 12"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl312AnimatingCharacterEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 12 章 Animating Your Character：姿态、编辑器与行走循环 · 阶段门证据"
      label="Chapter 12"
      nodes={nodes}
      mode="evidence"
    />
  );
}
