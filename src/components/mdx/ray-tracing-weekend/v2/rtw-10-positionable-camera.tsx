"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "Positionable Camera";
const nodes = [
  {
    label: "lookfrom",
    unit: "Positionable Camera",
    mechanism:
      "lookfrom 定义相机位置，lookat 定义视线目标，vup 只提供滚转参考；三者经叉积生成u、v、w正交基。vup与视线平行时基会退化，必须在构造阶段拒绝。",
    probe: "u/v/w正交性、手性、视口中心和中心像素射线",
  },
  {
    label: "lookat",
    unit: "Positionable Camera",
    mechanism:
      "lookfrom 定义相机位置，lookat 定义视线目标，vup 只提供滚转参考；三者经叉积生成u、v、w正交基。vup与视线平行时基会退化，必须在构造阶段拒绝。",
    probe: "u/v/w正交性、手性、视口中心和中心像素射线",
  },
  {
    label: "vup",
    unit: "Positionable Camera",
    mechanism:
      "lookfrom 定义相机位置，lookat 定义视线目标，vup 只提供滚转参考；三者经叉积生成u、v、w正交基。vup与视线平行时基会退化，必须在构造阶段拒绝。",
    probe: "u/v/w正交性、手性、视口中心和中心像素射线",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "从观察点、目标点和上方向建立正交相机基",
  formula:
    "w=\\widehat{lookfrom-lookat},\\quad u=\\widehat{vup\\times w},\\quad v=w\\times u",
  invariant:
    "Positionable Camera的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "交换叉积次序导致镜像，或允许vup与视线近似平行",
  evidence: "u/v/w正交性、手性、视口中心和中心像素射线",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw10PositionableCameraGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw10PositionableCameraSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw10PositionableCameraEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
