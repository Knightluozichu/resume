"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "Rays, a Simple Camera, and Background";
const nodes = [
  {
    label: "射线",
    unit: "Rays, a Simple Camera, and Background",
    mechanism:
      "射线用 P(t)=Q+td 表示从相机中心出发的半直线；视口把整数像素索引转换成三维采样位置；背景渐变只依赖单位方向的y分量，用来先验证相机坐标和扫描顺序。",
    probe: "四角射线方向、首末像素位置和背景颜色单调性",
  },
  {
    label: "视口",
    unit: "Rays, a Simple Camera, and Background",
    mechanism:
      "射线用 P(t)=Q+td 表示从相机中心出发的半直线；视口把整数像素索引转换成三维采样位置；背景渐变只依赖单位方向的y分量，用来先验证相机坐标和扫描顺序。",
    probe: "四角射线方向、首末像素位置和背景颜色单调性",
  },
  {
    label: "背景渐变",
    unit: "Rays, a Simple Camera, and Background",
    mechanism:
      "射线用 P(t)=Q+td 表示从相机中心出发的半直线；视口把整数像素索引转换成三维采样位置；背景渐变只依赖单位方向的y分量，用来先验证相机坐标和扫描顺序。",
    probe: "四角射线方向、首末像素位置和背景颜色单调性",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "从像素中心构造射线并用方向插值背景",
  formula: "P(t)=Q+t\\,d,\\qquad C=(1-a)C_0+aC_1",
  invariant:
    "Rays, a Simple Camera, and Background的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "把图像y轴与世界y轴方向混用，或用理想宽高比替代实际像素比",
  evidence: "四角射线方向、首末像素位置和背景颜色单调性",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw03RaysCameraBackgroundGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw03RaysCameraBackgroundSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw03RaysCameraBackgroundEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
