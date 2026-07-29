"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle = "Computer Graphics Hardware";
const nodes = [
  {
    label: "computer graphics hardware",
    unit: "Computer Graphics Hardware",
    mechanism:
      "computer graphics hardware 不只是GPU，还包括处理器、帧缓冲、display device 与输入设备；每个部件都改变带宽、精度或延迟边界。课程以可观察接口解释硬件链，不把现代GPU结构倒填成原书唯一实现。",
    probe: "设备能力、缓冲格式、提交时刻和显示时刻",
  },
  {
    label: "display device",
    unit: "Computer Graphics Hardware",
    mechanism:
      "computer graphics hardware 不只是GPU，还包括处理器、帧缓冲、display device 与输入设备；每个部件都改变带宽、精度或延迟边界。课程以可观察接口解释硬件链，不把现代GPU结构倒填成原书唯一实现。",
    probe: "设备能力、缓冲格式、提交时刻和显示时刻",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "区分显示、输入、处理和存储硬件在图形系统中的责任",
  formula: "T_{frame}=T_{cpu}+T_{transfer}+T_{gpu}+T_{scanout}",
  invariant:
    "Computer Graphics Hardware的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "把显示器刷新、GPU执行和CPU提交当成同一个时钟",
  evidence: "设备能力、缓冲格式、提交时刻和显示时刻",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg401HardwarePipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg401HardwareAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg401HardwareEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
