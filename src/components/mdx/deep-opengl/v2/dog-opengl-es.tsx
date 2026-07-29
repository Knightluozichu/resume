"use client";

import {
  OfficialGlStateLab,
  type ApiConceptNode,
  type ApiExperimentModel,
} from "./official-gl-state-lab";

const unitTitle = "OpenGL ES 移动端适配";
const nodes = [
  {
    label: "opengl es",
    unit: "OpenGL ES Mobile Runtime",
    mechanism:
      "OpenGL ES保留可编程管线核心，但平台通常通过EGL建立display、surface与context。移动GPU常按tile处理片元，频繁读回、无意义store或超大中间附件会消耗外部带宽；精度限定也必须按数值范围选择。",
    probe: "EGL配置、ES版本、附件load/store、外部带宽与shader精度范围",
  },
  {
    label: "egl",
    unit: "OpenGL ES Mobile Runtime",
    mechanism:
      "OpenGL ES保留可编程管线核心，但平台通常通过EGL建立display、surface与context。移动GPU常按tile处理片元，频繁读回、无意义store或超大中间附件会消耗外部带宽；精度限定也必须按数值范围选择。",
    probe: "EGL配置、ES版本、附件load/store、外部带宽与shader精度范围",
  },
  {
    label: "precision qualifier",
    unit: "OpenGL ES Mobile Runtime",
    mechanism:
      "OpenGL ES保留可编程管线核心，但平台通常通过EGL建立display、surface与context。移动GPU常按tile处理片元，频繁读回、无意义store或超大中间附件会消耗外部带宽；精度限定也必须按数值范围选择。",
    probe: "EGL配置、ES版本、附件load/store、外部带宽与shader精度范围",
  },
  {
    label: "tile",
    unit: "OpenGL ES Mobile Runtime",
    mechanism:
      "OpenGL ES保留可编程管线核心，但平台通常通过EGL建立display、surface与context。移动GPU常按tile处理片元，频繁读回、无意义store或超大中间附件会消耗外部带宽；精度限定也必须按数值范围选择。",
    probe: "EGL配置、ES版本、附件load/store、外部带宽与shader精度范围",
  },
] satisfies ApiConceptNode[];
const model = {
  focus: "在EGL、OpenGL ES与tile-based GPU边界内控制带宽和精度",
  formula: "Cost\\approx B_{external}+N_{tiles}C_{tile}",
  invariant:
    "OpenGL ES 移动端适配的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "把桌面扩展当作ES核心能力，或每个pass都强制保存不会再读取的附件",
  evidence: "EGL配置、ES版本、附件load/store、外部带宽与shader精度范围",
  sourceLabel: "Khronos OpenGL / OpenGL ES / GLSL / WebGL 规范课程",
} satisfies ApiExperimentModel;
const props = { unitTitle, nodes, model };

export function DogOpenglEsStateLab() {
  return <OfficialGlStateLab mode="state" {...props} />;
}

export function DogOpenglEsFaultLab() {
  return <OfficialGlStateLab mode="fault" {...props} />;
}

export function DogOpenglEsEvidenceLab() {
  return <OfficialGlStateLab mode="evidence" {...props} />;
}
