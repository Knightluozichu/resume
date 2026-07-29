"use client";

import {
  OfficialGlStateLab,
  type ApiConceptNode,
  type ApiExperimentModel,
} from "./official-gl-state-lab";

const unitTitle = "GLSL ES 着色器语言";
const nodes = [
  {
    label: "glsl es",
    unit: "GLSL ES Shaders",
    mechanism:
      "GLSL ES编译单个shader stage，program link再核对跨阶段in/out接口。uniform由应用更新而不是逐顶点插值，precision qualifier在移动实现尤其影响范围与误差。链接成功仍不保证坐标空间和数值精度正确。",
    probe: "编译日志、链接日志、接口位置、uniform值和参考像素",
  },
  {
    label: "uniform",
    unit: "GLSL ES Shaders",
    mechanism:
      "GLSL ES编译单个shader stage，program link再核对跨阶段in/out接口。uniform由应用更新而不是逐顶点插值，precision qualifier在移动实现尤其影响范围与误差。链接成功仍不保证坐标空间和数值精度正确。",
    probe: "编译日志、链接日志、接口位置、uniform值和参考像素",
  },
  {
    label: "in/out",
    unit: "GLSL ES Shaders",
    mechanism:
      "GLSL ES编译单个shader stage，program link再核对跨阶段in/out接口。uniform由应用更新而不是逐顶点插值，precision qualifier在移动实现尤其影响范围与误差。链接成功仍不保证坐标空间和数值精度正确。",
    probe: "编译日志、链接日志、接口位置、uniform值和参考像素",
  },
  {
    label: "precision",
    unit: "GLSL ES Shaders",
    mechanism:
      "GLSL ES编译单个shader stage，program link再核对跨阶段in/out接口。uniform由应用更新而不是逐顶点插值，precision qualifier在移动实现尤其影响范围与误差。链接成功仍不保证坐标空间和数值精度正确。",
    probe: "编译日志、链接日志、接口位置、uniform值和参考像素",
  },
] satisfies ApiConceptNode[];
const model = {
  focus: "用GLSL ES阶段接口、精度与uniform合同连接顶点和片元",
  formula: "gl\\_Position=M_{clip\\leftarrow model}p",
  invariant: "GLSL ES 着色器语言的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "顶点输出与片元输入位置或类型不一致，或片元高光计算使用过低精度",
  evidence: "编译日志、链接日志、接口位置、uniform值和参考像素",
  sourceLabel: "Khronos OpenGL / OpenGL ES / GLSL / WebGL 规范课程",
} satisfies ApiExperimentModel;
const props = { unitTitle, nodes, model };

export function DogShaderLanguageStateLab() {
  return <OfficialGlStateLab mode="state" {...props} />;
}

export function DogShaderLanguageFaultLab() {
  return <OfficialGlStateLab mode="fault" {...props} />;
}

export function DogShaderLanguageEvidenceLab() {
  return <OfficialGlStateLab mode="evidence" {...props} />;
}
