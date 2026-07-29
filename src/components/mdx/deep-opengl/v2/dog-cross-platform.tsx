"use client";

import {
  OfficialGlStateLab,
  type ApiConceptNode,
  type ApiExperimentModel,
} from "./official-gl-state-lab";

const unitTitle = "跨平台兼容性";
const nodes = [
  {
    label: "feature detection",
    unit: "Feature Detection and Extensions",
    mechanism:
      "feature detection先查询版本、extension与limit，再选择实现路径；桌面OpenGL、ES和WebGL名称相似但核心集合、着色语言与安全约束不同。fallback必须保持结果合同或明确降级质量。",
    probe: "版本、扩展、限制、选择路径和降级输出差异",
  },
  {
    label: "extension",
    unit: "Feature Detection and Extensions",
    mechanism:
      "feature detection先查询版本、extension与limit，再选择实现路径；桌面OpenGL、ES和WebGL名称相似但核心集合、着色语言与安全约束不同。fallback必须保持结果合同或明确降级质量。",
    probe: "版本、扩展、限制、选择路径和降级输出差异",
  },
  {
    label: "fallback",
    unit: "Feature Detection and Extensions",
    mechanism:
      "feature detection先查询版本、extension与limit，再选择实现路径；桌面OpenGL、ES和WebGL名称相似但核心集合、着色语言与安全约束不同。fallback必须保持结果合同或明确降级质量。",
    probe: "版本、扩展、限制、选择路径和降级输出差异",
  },
  {
    label: "compatibility",
    unit: "Feature Detection and Extensions",
    mechanism:
      "feature detection先查询版本、extension与limit，再选择实现路径；桌面OpenGL、ES和WebGL名称相似但核心集合、着色语言与安全约束不同。fallback必须保持结果合同或明确降级质量。",
    probe: "版本、扩展、限制、选择路径和降级输出差异",
  },
] satisfies ApiConceptNode[];
const model = {
  focus: "按版本、扩展与限制查询构造跨平台能力降级图",
  formula: "Path=select(Core,Extensions,Limits)",
  invariant: "跨平台兼容性的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "用厂商字符串猜能力，或扩展存在却未检查对应限制与入口",
  evidence: "版本、扩展、限制、选择路径和降级输出差异",
  sourceLabel: "Khronos OpenGL / OpenGL ES / GLSL / WebGL 规范课程",
} satisfies ApiExperimentModel;
const props = { unitTitle, nodes, model };

export function DogCrossPlatformStateLab() {
  return <OfficialGlStateLab mode="state" {...props} />;
}

export function DogCrossPlatformFaultLab() {
  return <OfficialGlStateLab mode="fault" {...props} />;
}

export function DogCrossPlatformEvidenceLab() {
  return <OfficialGlStateLab mode="evidence" {...props} />;
}
