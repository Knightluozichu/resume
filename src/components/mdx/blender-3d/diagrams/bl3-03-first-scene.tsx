"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Creating Objects",
  "Naming Objects and Using Datablocks",
  "Applying Flat or Smooth Surfaces",
  "Using Workbench, EEVEE, and Cycles",
] as const;

export function Bl303FirstSceneMapLab() {
  return (
    <OfficialBlenderLab
      title="第 3 章 Your First Scene in Blender · 资产管线"
      label="Chapter 3"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl303FirstSceneExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 3 章 Your First Scene in Blender · 单变量检查"
      label="Chapter 3"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl303FirstSceneEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 3 章 Your First Scene in Blender · 阶段门证据"
      label="Chapter 3"
      nodes={nodes}
      mode="evidence"
    />
  );
}
