"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Working with Vertices, Edges, and Faces",
  "Making Selections",
  "Using Mesh Modeling Tools",
  "Using Modeling Add-Ons",
] as const;

export function Bl306ModelingToolsMapLab() {
  return (
    <OfficialBlenderLab
      title="第 6 章 Blender Modeling Tools：选择、网格工具与插件 · 资产管线"
      label="Chapter 6"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl306ModelingToolsExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 6 章 Blender Modeling Tools：选择、网格工具与插件 · 单变量检查"
      label="Chapter 6"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl306ModelingToolsEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 6 章 Blender Modeling Tools：选择、网格工具与插件 · 阶段门证据"
      label="Chapter 6"
      nodes={nodes}
      mode="evidence"
    />
  );
}
