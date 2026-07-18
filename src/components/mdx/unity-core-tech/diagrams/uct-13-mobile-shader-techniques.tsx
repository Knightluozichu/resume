"use client";

import { OfficialUnityCoreLab } from "./official-unity-core-lab";

const nodes = [
  "Mesh 属性",
  "Vertex Shader",
  "光栅插值",
  "Fragment Shader",
  "设备 GPU 证据",
] as const;

export function Uct13MobileShaderTechniquesMapLab() {
  return (
    <OfficialUnityCoreLab
      title="第 13 章 移动端 Shader 技术：可编程管线与顶点片元案例 · 依赖地图"
      label="第 13 章 移动端 Shader 技术"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Uct13MobileShaderTechniquesExperimentLab() {
  return (
    <OfficialUnityCoreLab
      title="第 13 章 移动端 Shader 技术：可编程管线与顶点片元案例 · 单变量实验"
      label="第 13 章 移动端 Shader 技术"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Uct13MobileShaderTechniquesEvidenceLab() {
  return (
    <OfficialUnityCoreLab
      title="第 13 章 移动端 Shader 技术：可编程管线与顶点片元案例 · 阶段门证据"
      label="第 13 章 移动端 Shader 技术"
      nodes={nodes}
      mode="evidence"
    />
  );
}
