"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Three Stages of a Project",
  "Defining the Stages",
  "Making a Character-Creation Plan",
] as const;

export function Bl304ProjectOverviewMapLab() {
  return (
    <OfficialBlenderLab
      title="第 4 章 Project Overview：三阶段角色项目计划 · 资产管线"
      label="Chapter 4"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl304ProjectOverviewExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 4 章 Project Overview：三阶段角色项目计划 · 单变量检查"
      label="Chapter 4"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl304ProjectOverviewEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 4 章 Project Overview：三阶段角色项目计划 · 阶段门证据"
      label="Chapter 4"
      nodes={nodes}
      mode="evidence"
    />
  );
}
