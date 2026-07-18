"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Understanding the Rigging Process",
  "Rigging Your Character",
  "Skinning",
  "Creating Custom Shapes",
] as const;

export function Bl311CharacterRiggingMapLab() {
  return (
    <OfficialBlenderLab
      title="第 11 章 Character Rigging：骨架、蒙皮与控制器 · 资产管线"
      label="Chapter 11"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl311CharacterRiggingExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 11 章 Character Rigging：骨架、蒙皮与控制器 · 单变量检查"
      label="Chapter 11"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl311CharacterRiggingEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 11 章 Character Rigging：骨架、蒙皮与控制器 · 阶段门证据"
      label="Chapter 11"
      nodes={nodes}
      mode="evidence"
    />
  );
}
