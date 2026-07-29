"use client";

import {
  OfficialGlStateLab,
  type ApiConceptNode,
  type ApiExperimentModel,
} from "./official-gl-state-lab";

const unitTitle = "渲染优化策略";
const nodes = [
  {
    label: "draw call",
    unit: "Draw-call and Rendering Optimization",
    mechanism:
      "draw call成本包含CPU提交、驱动验证与GPU工作；instancing减少重复提交，state sorting减少昂贵切换，但透明对象仍受顺序约束。优化必须同时比较帧时间、提交数、带宽与像素结果。",
    probe: "CPU/GPU时间戳、draw数、状态切换、带宽和图像差异",
  },
  {
    label: "instancing",
    unit: "Draw-call and Rendering Optimization",
    mechanism:
      "draw call成本包含CPU提交、驱动验证与GPU工作；instancing减少重复提交，state sorting减少昂贵切换，但透明对象仍受顺序约束。优化必须同时比较帧时间、提交数、带宽与像素结果。",
    probe: "CPU/GPU时间戳、draw数、状态切换、带宽和图像差异",
  },
  {
    label: "state sorting",
    unit: "Draw-call and Rendering Optimization",
    mechanism:
      "draw call成本包含CPU提交、驱动验证与GPU工作；instancing减少重复提交，state sorting减少昂贵切换，但透明对象仍受顺序约束。优化必须同时比较帧时间、提交数、带宽与像素结果。",
    probe: "CPU/GPU时间戳、draw数、状态切换、带宽和图像差异",
  },
  {
    label: "bandwidth",
    unit: "Draw-call and Rendering Optimization",
    mechanism:
      "draw call成本包含CPU提交、驱动验证与GPU工作；instancing减少重复提交，state sorting减少昂贵切换，但透明对象仍受顺序约束。优化必须同时比较帧时间、提交数、带宽与像素结果。",
    probe: "CPU/GPU时间戳、draw数、状态切换、带宽和图像差异",
  },
] satisfies ApiConceptNode[];
const model = {
  focus: "用提交、状态切换和带宽证据优化绘制而不改变结果",
  formula: "T_{frame}=T_{cpu}+T_{gpu}+T_{sync}",
  invariant: "渲染优化策略的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "只减少draw call却增加过度绘制或带宽，或用glFinish制造虚假稳定计时",
  evidence: "CPU/GPU时间戳、draw数、状态切换、带宽和图像差异",
  sourceLabel: "Khronos OpenGL / OpenGL ES / GLSL / WebGL 规范课程",
} satisfies ApiExperimentModel;
const props = { unitTitle, nodes, model };

export function DogRenderingOptimizationStateLab() {
  return <OfficialGlStateLab mode="state" {...props} />;
}

export function DogRenderingOptimizationFaultLab() {
  return <OfficialGlStateLab mode="fault" {...props} />;
}

export function DogRenderingOptimizationEvidenceLab() {
  return <OfficialGlStateLab mode="evidence" {...props} />;
}
