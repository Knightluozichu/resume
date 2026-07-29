"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle = "Graphics Output Primitives";
const nodes = [
  {
    label: "graphics output primitive",
    unit: "Graphics Output Primitives",
    mechanism:
      "graphics output primitive 是点、线和多边形等管线输入；point 提供最小离散覆盖单元。输出算法必须声明像素中心、端点包含规则和坐标取整，否则相邻图元会产生裂缝或重复覆盖。",
    probe: "覆盖像素集合、端点、八分区对称性和裁剪后连续性",
  },
  {
    label: "point",
    unit: "Graphics Output Primitives",
    mechanism:
      "graphics output primitive 是点、线和多边形等管线输入；point 提供最小离散覆盖单元。输出算法必须声明像素中心、端点包含规则和坐标取整，否则相邻图元会产生裂缝或重复覆盖。",
    probe: "覆盖像素集合、端点、八分区对称性和裁剪后连续性",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "把连续几何转换成离散像素覆盖",
  formula: "p_{pixel}=\\operatorname{round}(p_{screen}-0.5)+0.5",
  invariant:
    "Graphics Output Primitives的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "混用像素角与像素中心，或相邻线段采用不同端点规则",
  evidence: "覆盖像素集合、端点、八分区对称性和裁剪后连续性",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg403OutputPrimitivesPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg403OutputPrimitivesAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg403OutputPrimitivesEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
