"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle = "Two-Dimensional Viewing";
const nodes = [
  {
    label: "2d viewing",
    unit: "Two-Dimensional Viewing",
    mechanism:
      "2d viewing 先在世界空间选择可见window，再映射到设备viewport；window viewport 变换同时包含平移与比例。裁剪应先于设备量化，以避免窗口外几何污染边界像素。",
    probe: "窗口角点、视口角点、裁剪参数和边界像素",
  },
  {
    label: "window viewport",
    unit: "Two-Dimensional Viewing",
    mechanism:
      "2d viewing 先在世界空间选择可见window，再映射到设备viewport；window viewport 变换同时包含平移与比例。裁剪应先于设备量化，以避免窗口外几何污染边界像素。",
    probe: "窗口角点、视口角点、裁剪参数和边界像素",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "把世界窗口稳定映射到设备视口并执行裁剪",
  formula: "x_v=x_{v0}+(x_w-x_{w0})\\frac{x_{v1}-x_{v0}}{x_{w1}-x_{w0}}",
  invariant:
    "Two-Dimensional Viewing的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "窗口宽度为零、y轴方向约定不一致，或先取整再裁剪",
  evidence: "窗口角点、视口角点、裁剪参数和边界像素",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg4062dViewingPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg4062dViewingAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg4062dViewingEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
