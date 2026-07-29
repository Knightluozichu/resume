"use client";

import {
  OfficialGlStateLab,
  type ApiConceptNode,
  type ApiExperimentModel,
} from "./official-gl-state-lab";

const unitTitle = "调试与性能分析";
const nodes = [
  {
    label: "glgeterror",
    unit: "Debugging and GPU Profiling",
    mechanism:
      "glGetError只提供有限错误队列且可能扰动热路径；KHR_debug能携带source、type、severity与对象标签。RenderDoc或Spector帧捕获展示资源和命令状态，timer query则把GPU区间与CPU提交时间分开。",
    probe: "debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  },
  {
    label: "khr_debug",
    unit: "Debugging and GPU Profiling",
    mechanism:
      "glGetError只提供有限错误队列且可能扰动热路径；KHR_debug能携带source、type、severity与对象标签。RenderDoc或Spector帧捕获展示资源和命令状态，timer query则把GPU区间与CPU提交时间分开。",
    probe: "debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  },
  {
    label: "renderdoc",
    unit: "Debugging and GPU Profiling",
    mechanism:
      "glGetError只提供有限错误队列且可能扰动热路径；KHR_debug能携带source、type、severity与对象标签。RenderDoc或Spector帧捕获展示资源和命令状态，timer query则把GPU区间与CPU提交时间分开。",
    probe: "debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  },
  {
    label: "profil",
    unit: "Debugging and GPU Profiling",
    mechanism:
      "glGetError只提供有限错误队列且可能扰动热路径；KHR_debug能携带source、type、severity与对象标签。RenderDoc或Spector帧捕获展示资源和命令状态，timer query则把GPU区间与CPU提交时间分开。",
    probe: "debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  },
] satisfies ApiConceptNode[];
const model = {
  focus: "用调试回调、帧捕获与GPU计时定位首个错误事件",
  formula: "Fault=first(Event_{actual}\\ne Event_{expected})",
  invariant: "调试与性能分析的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "只在帧尾调用glGetError，或用CPU墙钟时间替代GPU查询",
  evidence: "debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  sourceLabel: "Khronos OpenGL / OpenGL ES / GLSL / WebGL 规范课程",
} satisfies ApiExperimentModel;
const props = { unitTitle, nodes, model };

export function DogDebuggingToolsStateLab() {
  return <OfficialGlStateLab mode="state" {...props} />;
}

export function DogDebuggingToolsFaultLab() {
  return <OfficialGlStateLab mode="fault" {...props} />;
}

export function DogDebuggingToolsEvidenceLab() {
  return <OfficialGlStateLab mode="evidence" {...props} />;
}
