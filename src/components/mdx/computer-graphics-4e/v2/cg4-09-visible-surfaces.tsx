"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle = "Visible-Surface Detection Methods";
const nodes = [
  {
    label: "visible-surface detection",
    unit: "Visible-Surface Detection Methods",
    mechanism:
      "visible-surface detection 比较遮挡候选，z-buffer 为每个像素保存当前最近深度。算法简单但依赖深度精度、比较方向和清除值；近远平面比例过大时会出现z-fighting。",
    probe: "深度格式、近远平面、比较函数和重叠片元结果",
  },
  {
    label: "z-buffer",
    unit: "Visible-Surface Detection Methods",
    mechanism:
      "visible-surface detection 比较遮挡候选，z-buffer 为每个像素保存当前最近深度。算法简单但依赖深度精度、比较方向和清除值；近远平面比例过大时会出现z-fighting。",
    probe: "深度格式、近远平面、比较函数和重叠片元结果",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "为同一像素选择最近可见片元",
  formula:
    "z_{new}\\prec z_{buffer}\\Rightarrow (C,z)\\leftarrow(C_{new},z_{new})",
  invariant:
    "Visible-Surface Detection Methods的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "清除值与比较函数不匹配，或用线性直觉解释非线性深度",
  evidence: "深度格式、近远平面、比较函数和重叠片元结果",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg409VisibleSurfacesPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg409VisibleSurfacesAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg409VisibleSurfacesEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
