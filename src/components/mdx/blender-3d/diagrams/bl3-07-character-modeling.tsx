"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "What Is Mesh Topology?",
  "Modeling the Eyes",
  "Modeling the Torso and Arms",
  "Modeling the Hands",
] as const;

export function Bl307CharacterModelingMapLab() {
  return (
    <OfficialBlenderLab
      title="第 7 章 Character Modeling：Jim 的完整网格与变形拓扑 · 资产管线"
      label="Chapter 7"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl307CharacterModelingExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 7 章 Character Modeling：Jim 的完整网格与变形拓扑 · 单变量检查"
      label="Chapter 7"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl307CharacterModelingEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 7 章 Character Modeling：Jim 的完整网格与变形拓扑 · 阶段门证据"
      label="Chapter 7"
      nodes={nodes}
      mode="evidence"
    />
  );
}
