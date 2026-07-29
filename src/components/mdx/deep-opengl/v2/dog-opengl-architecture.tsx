"use client";

import {
  OfficialGlStateLab,
  type ApiConceptNode,
  type ApiExperimentModel,
} from "./official-gl-state-lab";

const unitTitle = "OpenGL 架构与状态机";
const nodes = [
  {
    label: "context",
    unit: "OpenGL Context, Objects, and State",
    mechanism:
      "OpenGL命令在当前context上执行，buffer、texture与program等对象保存存储或可执行内容，binding把对象选为后续命令的隐式参数。VAO记录属性格式、属性缓冲关联与element array binding，但不会把所有全局状态冻结成快照。",
    probe: "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照",
  },
  {
    label: "state machine",
    unit: "OpenGL Context, Objects, and State",
    mechanism:
      "OpenGL命令在当前context上执行，buffer、texture与program等对象保存存储或可执行内容，binding把对象选为后续命令的隐式参数。VAO记录属性格式、属性缓冲关联与element array binding，但不会把所有全局状态冻结成快照。",
    probe: "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照",
  },
  {
    label: "vao",
    unit: "OpenGL Context, Objects, and State",
    mechanism:
      "OpenGL命令在当前context上执行，buffer、texture与program等对象保存存储或可执行内容，binding把对象选为后续命令的隐式参数。VAO记录属性格式、属性缓冲关联与element array binding，但不会把所有全局状态冻结成快照。",
    probe: "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照",
  },
  {
    label: "vbo",
    unit: "OpenGL Context, Objects, and State",
    mechanism:
      "OpenGL命令在当前context上执行，buffer、texture与program等对象保存存储或可执行内容，binding把对象选为后续命令的隐式参数。VAO记录属性格式、属性缓冲关联与element array binding，但不会把所有全局状态冻结成快照。",
    probe: "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照",
  },
] satisfies ApiConceptNode[];
const model = {
  focus: "区分上下文状态、对象存储、绑定点与VAO捕获关系",
  formula: "Draw=F(Ctx,Program,VAO,FBO,State)",
  invariant:
    "OpenGL 架构与状态机的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "把ARRAY_BUFFER当前绑定误当成VAO整体状态，或依赖上一个pass残留开关",
  evidence: "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照",
  sourceLabel: "Khronos OpenGL / OpenGL ES / GLSL / WebGL 规范课程",
} satisfies ApiExperimentModel;
const props = { unitTitle, nodes, model };

export function DogOpenglArchitectureStateLab() {
  return <OfficialGlStateLab mode="state" {...props} />;
}

export function DogOpenglArchitectureFaultLab() {
  return <OfficialGlStateLab mode="fault" {...props} />;
}

export function DogOpenglArchitectureEvidenceLab() {
  return <OfficialGlStateLab mode="evidence" {...props} />;
}
