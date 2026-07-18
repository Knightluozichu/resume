"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Seeing How Unwrapping and UVs Work",
  "Unwrapping in Blender",
  "Considering Before Unwrapping",
  "Working with UVs in Blender",
] as const;

export function Bl308UnwrappingUvsMapLab() {
  return (
    <OfficialBlenderLab
      title="第 8 章 Unwrapping and UVs in Blender · 资产管线"
      label="Chapter 8"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl308UnwrappingUvsExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 8 章 Unwrapping and UVs in Blender · 单变量检查"
      label="Chapter 8"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl308UnwrappingUvsEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 8 章 Unwrapping and UVs in Blender · 阶段门证据"
      label="Chapter 8"
      nodes={nodes}
      mode="evidence"
    />
  );
}
