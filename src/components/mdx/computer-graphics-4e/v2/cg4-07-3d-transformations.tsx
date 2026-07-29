"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle = "Three-Dimensional Geometric Transformations";
const nodes = [
  {
    label: "3d transformation",
    unit: "Three-Dimensional Geometric Transformations",
    mechanism:
      "3d transformation 扩展二维齐次方法到四维坐标，rotation axis 需要先定义单位方向和旋转中心。绕任意轴旋转可由对齐、轴旋转和逆对齐组合，或直接使用Rodrigues公式。",
    probe: "轴上点不动、长度保持、行列式和逆变换",
  },
  {
    label: "rotation axis",
    unit: "Three-Dimensional Geometric Transformations",
    mechanism:
      "3d transformation 扩展二维齐次方法到四维坐标，rotation axis 需要先定义单位方向和旋转中心。绕任意轴旋转可由对齐、轴旋转和逆对齐组合，或直接使用Rodrigues公式。",
    probe: "轴上点不动、长度保持、行列式和逆变换",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "围绕任意旋转轴组合三维刚体与仿射变换",
  formula:
    "R(v)=v\\cos\\theta+(k\\times v)\\sin\\theta+k(k\\cdot v)(1-\\cos\\theta)",
  invariant:
    "Three-Dimensional Geometric Transformations的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "旋转轴未归一化，或法线直接乘含非均匀缩放的模型矩阵",
  evidence: "轴上点不动、长度保持、行列式和逆变换",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg4073dTransformationsPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg4073dTransformationsAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg4073dTransformationsEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
