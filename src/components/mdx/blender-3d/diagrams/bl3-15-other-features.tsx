"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Simulations",
  "VFX: Masking, Object Tracking, and Video Stabilization",
  "Sculpting",
  "Add-Ons",
] as const;

export function Bl315OtherFeaturesMapLab() {
  return (
    <OfficialBlenderLab
      title="第 15 章 Other Blender Features：继续学习的能力地图 · 资产管线"
      label="Chapter 15"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl315OtherFeaturesExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 15 章 Other Blender Features：继续学习的能力地图 · 单变量检查"
      label="Chapter 15"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl315OtherFeaturesEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 15 章 Other Blender Features：继续学习的能力地图 · 阶段门证据"
      label="Chapter 15"
      nodes={nodes}
      mode="evidence"
    />
  );
}
