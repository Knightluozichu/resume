"use client";

import { OfficialBlenderLab } from "./official-blender-lab";

const nodes = [
  "Character Description",
  "Designing the Character",
  "Adding Color",
  "Finalizing the Design",
] as const;

export function Bl305CharacterDesignMapLab() {
  return (
    <OfficialBlenderLab
      title="第 5 章 Character Design：从角色描述到参考图 · 资产管线"
      label="Chapter 5"
      nodes={nodes}
      mode="pipeline"
    />
  );
}

export function Bl305CharacterDesignExperimentLab() {
  return (
    <OfficialBlenderLab
      title="第 5 章 Character Design：从角色描述到参考图 · 单变量检查"
      label="Chapter 5"
      nodes={nodes}
      mode="inspect"
    />
  );
}

export function Bl305CharacterDesignEvidenceLab() {
  return (
    <OfficialBlenderLab
      title="第 5 章 Character Design：从角色描述到参考图 · 阶段门证据"
      label="Chapter 5"
      nodes={nodes}
      mode="evidence"
    />
  );
}
