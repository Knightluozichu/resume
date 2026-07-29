"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle = "Three-Dimensional Viewing × Hierarchical Modeling";
const nodes = [
  {
    label: "3d viewing",
    unit: "Three-Dimensional Viewing",
    mechanism:
      "3d viewing 把世界点转换到相机空间并投影，view volume 界定近远平面与侧面裁剪范围。透视除法前后的空间不可混用，近裁剪面也不能设为零。",
    probe: "相机基、clip坐标、w符号、NDC范围和深度值",
  },
  {
    label: "view volume",
    unit: "Three-Dimensional Viewing",
    mechanism:
      "3d viewing 把世界点转换到相机空间并投影，view volume 界定近远平面与侧面裁剪范围。透视除法前后的空间不可混用，近裁剪面也不能设为零。",
    probe: "相机基、clip坐标、w符号、NDC范围和深度值",
  },
  {
    label: "hierarchical modeling",
    unit: "Hierarchical Modeling",
    mechanism:
      "hierarchical modeling 把复杂对象拆成局部部件，scene graph 通过父子关系传播变换与可见状态。修改父节点会影响整棵子树，但共享节点需要明确实例化和所有权。",
    probe: "父子路径、局部矩阵、世界矩阵和共享实例身份",
  },
  {
    label: "scene graph",
    unit: "Hierarchical Modeling",
    mechanism:
      "hierarchical modeling 把复杂对象拆成局部部件，scene graph 通过父子关系传播变换与可见状态。修改父节点会影响整棵子树，但共享节点需要明确实例化和所有权。",
    probe: "父子路径、局部矩阵、世界矩阵和共享实例身份",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus:
    "建立观察坐标、投影和视体裁剪的完整合同，并用父子局部变换构造可编辑的层级模型",
  formula:
    "p_{ndc}=\\frac{P V p_{world}}{w_{clip}} ; M_{world}^{child}=M_{world}^{parent}M_{local}^{child}",
  invariant:
    "Three-Dimensional Viewing的输入、公式中间量、输出与恢复结果可用同一基线复算，且Hierarchical Modeling的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault:
    "在裁剪前执行透视除法，或混淆左右手坐标与深度范围；把世界矩阵写回局部矩阵，或图中出现未检测的循环依赖",
  evidence:
    "相机基、clip坐标、w符号、NDC范围和深度值、父子路径、局部矩阵、世界矩阵和共享实例身份",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg408ViewingHierarchyPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg408ViewingHierarchyAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg408ViewingHierarchyEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
