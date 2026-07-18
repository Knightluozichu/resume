"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Lighting Your Scene",
  "Rendering and Compositing Your Scene in Cycles",
  "Rendering and Compositing Your Scene with EEVEE",
  "Exporting the Final Render",
] as const;

export function Bl314LightingCompositingRenderingMapLab() {
  return (
    <OfficialBlenderLab
      title="第 14 章 Lighting, Compositing, and Rendering：匹配真实镜头 · 资产管线"
      label="Chapter 14"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl314LightingCompositingRenderingExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 14 章 Lighting, Compositing, and Rendering：匹配真实镜头 · 单变量检查"
      label="Chapter 14"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl314LightingCompositingRenderingEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 14 章 Lighting, Compositing, and Rendering：匹配真实镜头 · 阶段门证据"
      label="Chapter 14"
      nodes={nodes}
      mode="evidence"
    />
  );
}
