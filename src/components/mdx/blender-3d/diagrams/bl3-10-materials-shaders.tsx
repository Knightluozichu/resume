"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Understanding Materials",
  "Masks and Layers",
  "Channels",
  "Shading Your Character",
] as const;

export function Bl310MaterialsShadersMapLab() {
  return (
    <OfficialBlenderLab
      title="第 10 章 Materials and Shaders：遮罩、通道与角色着色 · 资产管线"
      label="Chapter 10"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl310MaterialsShadersExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 10 章 Materials and Shaders：遮罩、通道与角色着色 · 单变量检查"
      label="Chapter 10"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl310MaterialsShadersEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 10 章 Materials and Shaders：遮罩、通道与角色着色 · 阶段门证据"
      label="Chapter 10"
      nodes={nodes}
      mode="evidence"
    />
  );
}
