"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "Final Render";
const nodes = [
  {
    label: "最终场景",
    unit: "Final Render",
    mechanism:
      "最终场景用随机球覆盖多种材质与尺度，递归深度限制无穷散射链，随机球生成必须在几何重叠与材质概率上保持约束。最终验收不是看一张漂亮图，而是能用固定种子重放。",
    probe: "场景对象数、材质分布、最大深度、固定种子和最终PPM哈希",
  },
  {
    label: "递归深度",
    unit: "Final Render",
    mechanism:
      "最终场景用随机球覆盖多种材质与尺度，递归深度限制无穷散射链，随机球生成必须在几何重叠与材质概率上保持约束。最终验收不是看一张漂亮图，而是能用固定种子重放。",
    probe: "场景对象数、材质分布、最大深度、固定种子和最终PPM哈希",
  },
  {
    label: "随机球",
    unit: "Final Render",
    mechanism:
      "最终场景用随机球覆盖多种材质与尺度，递归深度限制无穷散射链，随机球生成必须在几何重叠与材质概率上保持约束。最终验收不是看一张漂亮图，而是能用固定种子重放。",
    probe: "场景对象数、材质分布、最大深度、固定种子和最终PPM哈希",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "把几何、材质、相机与采样组合成可复现最终场景",
  formula:
    "L_o=\\beta_0L_e+\\sum_{k=1}^{D}\\beta_kL_{e,k},\\qquad D\\le D_{max}",
  invariant: "Final Render的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "不限制递归深度、随机球重叠，或每次运行无法复现同一场景",
  evidence: "场景对象数、材质分布、最大深度、固定种子和最终PPM哈希",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw12FinalRenderGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw12FinalRenderSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw12FinalRenderEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
