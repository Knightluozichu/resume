"use client";

import {
  OfficialGlStateLab,
  type ApiConceptNode,
  type ApiExperimentModel,
} from "./official-gl-state-lab";

const unitTitle = "WebGL 基础与上下文";
const nodes = [
  {
    label: "webgl context",
    unit: "WebGL Context and WebGL 1/2",
    mechanism:
      "WebGL通过canvas.getContext取得明确对象；WebGL 1与2暴露的核心能力不同，扩展也必须逐项查询。context lost后旧GPU对象失效，应用应阻止默认处理、暂停渲染，并依据CPU侧资源描述完整重建。",
    probe: "上下文版本、扩展集合、lost/restored事件和重建对象计数",
  },
  {
    label: "webgl1",
    unit: "WebGL Context and WebGL 1/2",
    mechanism:
      "WebGL通过canvas.getContext取得明确对象；WebGL 1与2暴露的核心能力不同，扩展也必须逐项查询。context lost后旧GPU对象失效，应用应阻止默认处理、暂停渲染，并依据CPU侧资源描述完整重建。",
    probe: "上下文版本、扩展集合、lost/restored事件和重建对象计数",
  },
  {
    label: "webgl2",
    unit: "WebGL Context and WebGL 1/2",
    mechanism:
      "WebGL通过canvas.getContext取得明确对象；WebGL 1与2暴露的核心能力不同，扩展也必须逐项查询。context lost后旧GPU对象失效，应用应阻止默认处理、暂停渲染，并依据CPU侧资源描述完整重建。",
    probe: "上下文版本、扩展集合、lost/restored事件和重建对象计数",
  },
  {
    label: "context lost",
    unit: "WebGL Context and WebGL 1/2",
    mechanism:
      "WebGL通过canvas.getContext取得明确对象；WebGL 1与2暴露的核心能力不同，扩展也必须逐项查询。context lost后旧GPU对象失效，应用应阻止默认处理、暂停渲染，并依据CPU侧资源描述完整重建。",
    probe: "上下文版本、扩展集合、lost/restored事件和重建对象计数",
  },
] satisfies ApiConceptNode[];
const model = {
  focus: "管理WebGL上下文创建、版本能力、丢失与资源重建",
  formula: "Ready=Context\\land Capabilities\\land Resources",
  invariant: "WebGL 基础与上下文的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "假设WebGL2或扩展必定存在，或context restored后继续复用旧句柄",
  evidence: "上下文版本、扩展集合、lost/restored事件和重建对象计数",
  sourceLabel: "Khronos OpenGL / OpenGL ES / GLSL / WebGL 规范课程",
} satisfies ApiExperimentModel;
const props = { unitTitle, nodes, model };

export function DogWebglBasicsStateLab() {
  return <OfficialGlStateLab mode="state" {...props} />;
}

export function DogWebglBasicsFaultLab() {
  return <OfficialGlStateLab mode="fault" {...props} />;
}

export function DogWebglBasicsEvidenceLab() {
  return <OfficialGlStateLab mode="evidence" {...props} />;
}
