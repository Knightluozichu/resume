"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "The vec3 Class";
const nodes = [
  {
    label: "vec3",
    unit: "The vec3 Class",
    mechanism:
      "vec3 提供加减、点积、叉积和归一化；point3 与 color 是语义别名，帮助读者区分位置和辐射颜色，却不会产生新的运行时类型。验收重点是每个运算的几何含义，而不是运算符重载本身。",
    probe: "长度、点积、叉积方向和分量运算的单元样本",
  },
  {
    label: "point3",
    unit: "The vec3 Class",
    mechanism:
      "vec3 提供加减、点积、叉积和归一化；point3 与 color 是语义别名，帮助读者区分位置和辐射颜色，却不会产生新的运行时类型。验收重点是每个运算的几何含义，而不是运算符重载本身。",
    probe: "长度、点积、叉积方向和分量运算的单元样本",
  },
  {
    label: "color",
    unit: "The vec3 Class",
    mechanism:
      "vec3 提供加减、点积、叉积和归一化；point3 与 color 是语义别名，帮助读者区分位置和辐射颜色，却不会产生新的运行时类型。验收重点是每个运算的几何含义，而不是运算符重载本身。",
    probe: "长度、点积、叉积方向和分量运算的单元样本",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "用一个三分量类型统一表达方向、点与线性色彩",
  formula: "\\widehat{v}=\\frac{v}{\\sqrt{v\\cdot v}}",
  invariant: "The vec3 Class的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "对零长度向量归一化，或把color误当作point3参与几何平移",
  evidence: "长度、点积、叉积方向和分量运算的单元样本",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw02Vec3GeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw02Vec3SamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw02Vec3EvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
