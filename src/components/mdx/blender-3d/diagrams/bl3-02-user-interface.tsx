"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Downloading and Installing Blender",
  "Using Blender's User Interface",
  "Getting to Know Blender's Interface Elements",
  "Navigating the 3D Scene",
] as const;

export function Bl302UserInterfaceMapLab() {
  return (
    <OfficialBlenderLab
      title="第 2 章 Blender Basics: The User Interface · 资产管线"
      label="Chapter 2"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl302UserInterfaceExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 2 章 Blender Basics: The User Interface · 单变量检查"
      label="Chapter 2"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl302UserInterfaceEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 2 章 Blender Basics: The User Interface · 阶段门证据"
      label="Chapter 2"
      nodes={nodes}
      mode="evidence"
    />
  );
}
