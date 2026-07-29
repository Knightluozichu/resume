"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle =
  "Interactive Input Methods and Graphical User Interfaces × Programmable Shaders";
const nodes = [
  {
    label: "interactive input",
    unit: "Interactive Input Methods and Graphical User Interfaces",
    mechanism:
      "interactive input 把指针、键盘或触控事件映射到对象选择与操作，graphical user interface 再通过控件状态给出反馈。命中测试必须说明坐标空间、焦点和事件捕获规则。",
    probe: "事件时间、设备坐标、逆变换、命中对象和焦点状态",
  },
  {
    label: "graphical user interface",
    unit: "Interactive Input Methods and Graphical User Interfaces",
    mechanism:
      "interactive input 把指针、键盘或触控事件映射到对象选择与操作，graphical user interface 再通过控件状态给出反馈。命中测试必须说明坐标空间、焦点和事件捕获规则。",
    probe: "事件时间、设备坐标、逆变换、命中对象和焦点状态",
  },
  {
    label: "programmable shader",
    unit: "Programmable Shaders",
    mechanism:
      "programmable shader 让应用提供管线阶段代码，glsl 明确输入输出、存储类别和执行模型。阶段接口、坐标空间和资源绑定必须一致，编译成功不代表结果正确。",
    probe: "着色器日志、接口布局、uniform绑定和参考像素",
  },
  {
    label: "glsl",
    unit: "Programmable Shaders",
    mechanism:
      "programmable shader 让应用提供管线阶段代码，glsl 明确输入输出、存储类别和执行模型。阶段接口、坐标空间和资源绑定必须一致，编译成功不代表结果正确。",
    probe: "着色器日志、接口布局、uniform绑定和参考像素",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus:
    "把设备事件转换成稳定的图形交互状态，并用可编程阶段定义顶点与片元的变换和着色",
  formula:
    "p_{local}=M_{world}^{-1}p_{device} ; gl\\_Position=PVM\\,p,qquad C_o=f(material,lights,varyings)",
  invariant:
    "Interactive Input Methods and Graphical User Interfaces的输入、公式中间量、输出与恢复结果可用同一基线复算，且Programmable Shaders的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault:
    "用设备坐标直接命中世界对象，或焦点转移后仍消费旧事件；顶点和片元阶段接口位置不一致，或在错误坐标空间计算法线",
  evidence:
    "事件时间、设备坐标、逆变换、命中对象和焦点状态、着色器日志、接口布局、uniform绑定和参考像素",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg413InputShadersPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg413InputShadersAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg413InputShadersEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
