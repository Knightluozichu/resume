"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "Antialiasing";
const nodes = [
  {
    label: "samples_per_pixel",
    unit: "Antialiasing",
    mechanism:
      "samples_per_pixel 决定每像素估计器的样本数，随机采样把射线起点分布到像素区域，gamma 校正则在平均线性颜色后再映射到显示空间。先开方再平均会引入系统性偏差。",
    probe: "固定随机种子的均值、边缘方差和量化前后通道值",
  },
  {
    label: "随机采样",
    unit: "Antialiasing",
    mechanism:
      "samples_per_pixel 决定每像素估计器的样本数，随机采样把射线起点分布到像素区域，gamma 校正则在平均线性颜色后再映射到显示空间。先开方再平均会引入系统性偏差。",
    probe: "固定随机种子的均值、边缘方差和量化前后通道值",
  },
  {
    label: "gamma",
    unit: "Antialiasing",
    mechanism:
      "samples_per_pixel 决定每像素估计器的样本数，随机采样把射线起点分布到像素区域，gamma 校正则在平均线性颜色后再映射到显示空间。先开方再平均会引入系统性偏差。",
    probe: "固定随机种子的均值、边缘方差和量化前后通道值",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "用像素内随机样本降低锯齿并正确输出亮度",
  formula:
    "\\bar C=\\frac1N\\sum_{i=1}^{N}C_i,\\qquad C_{display}=\\sqrt{\\bar C}",
  invariant: "Antialiasing的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "每个像素复用相同随机偏移，或在样本累加前执行gamma变换",
  evidence: "固定随机种子的均值、边缘方差和量化前后通道值",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw06AntialiasingGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw06AntialiasingSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw06AntialiasingEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
