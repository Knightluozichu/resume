"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Chapters 1-3: Blender identity, interface, and first scene",
  "Chapters 4-5: project overview and character design",
  "Chapters 6-7: modeling tools and Jim character mesh",
  "Chapters 8-10: UVs, textures, materials, and shaders",
] as const;

export function Bl3OfficialFinalReviewMapLab() {
  return (
    <OfficialBlenderLab
      title="玩转 Blender 第 3 版：全书综合验收 · 资产管线"
      label="Review"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl3OfficialFinalReviewExperimentLab() {
  return (
    <OfficialBlenderLab
      title="玩转 Blender 第 3 版：全书综合验收 · 单变量检查"
      label="Review"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl3OfficialFinalReviewEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="玩转 Blender 第 3 版：全书综合验收 · 阶段门证据"
      label="Review"
      nodes={nodes}
      mode="evidence"
    />
  );
}
