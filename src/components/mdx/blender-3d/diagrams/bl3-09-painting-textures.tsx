"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Defining the Main Workflow",
  "Texture Painting in Blender",
  "Creating the Base Texture",
  "Understanding the Elements of a Texture",
] as const;

export function Bl309PaintingTexturesMapLab() {
  return (
    <OfficialBlenderLab
      title="第 9 章 Painting Textures：从 Base Texture 到角色细节 · 资产管线"
      label="Chapter 9"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl309PaintingTexturesExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 9 章 Painting Textures：从 Base Texture 到角色细节 · 单变量检查"
      label="Chapter 9"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl309PaintingTexturesEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 9 章 Painting Textures：从 Base Texture 到角色细节 · 阶段门证据"
      label="Chapter 9"
      nodes={nodes}
      mode="evidence"
    />
  );
}
