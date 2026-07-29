"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle = "Two-Dimensional Geometric Transformations";
const nodes = [
  {
    label: "2d transformation",
    unit: "Two-Dimensional Geometric Transformations",
    mechanism:
      "2d transformation 通过矩阵改变点和向量，homogeneous coordinate 把平移提升为矩阵乘法并支持连续组合。矩阵次序表达操作次序，交换两个非交换变换通常会改变结果。",
    probe: "基点、基向量、组合矩阵和逆变换回放",
  },
  {
    label: "homogeneous coordinate",
    unit: "Two-Dimensional Geometric Transformations",
    mechanism:
      "2d transformation 通过矩阵改变点和向量，homogeneous coordinate 把平移提升为矩阵乘法并支持连续组合。矩阵次序表达操作次序，交换两个非交换变换通常会改变结果。",
    probe: "基点、基向量、组合矩阵和逆变换回放",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "用齐次矩阵组合二维平移、旋转、缩放和绕点变换",
  formula:
    "\\begin{bmatrix}x'\\\\y'\\\\1\\end{bmatrix}=T R S\\begin{bmatrix}x\\\\y\\\\1\\end{bmatrix}",
  invariant:
    "Two-Dimensional Geometric Transformations的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "混淆行向量与列向量约定，或按阅读顺序错误相乘",
  evidence: "基点、基向量、组合矩阵和逆变换回放",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg4052dTransformationsPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg4052dTransformationsAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg4052dTransformationsEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
