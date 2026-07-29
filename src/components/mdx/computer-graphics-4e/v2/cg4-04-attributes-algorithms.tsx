"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle =
  "Attributes of Graphics Primitives × Implementation Algorithms for Graphics Primitives and Attributes";
const nodes = [
  {
    label: "primitive attribute",
    unit: "Attributes of Graphics Primitives",
    mechanism:
      "primitive attribute 描述颜色、宽度、样式与透明度等外观，line attribute 尤其受连接、端帽和像素覆盖影响。属性只有与图元参数化和插值位置绑定，才不会在裁剪或透视后失真。",
    probe: "端点属性、插值参数、连接处覆盖和裁剪前后结果",
  },
  {
    label: "line attribute",
    unit: "Attributes of Graphics Primitives",
    mechanism:
      "primitive attribute 描述颜色、宽度、样式与透明度等外观，line attribute 尤其受连接、端帽和像素覆盖影响。属性只有与图元参数化和插值位置绑定，才不会在裁剪或透视后失真。",
    probe: "端点属性、插值参数、连接处覆盖和裁剪前后结果",
  },
  {
    label: "primitive implementation algorithm",
    unit: "Implementation Algorithms for Graphics Primitives and Attributes",
    mechanism:
      "primitive implementation algorithm 决定连续图元如何遍历像素，bresenham 用整数增量维护理想线与候选像素的误差。正确实现应在各象限保持对称，并清楚处理陡斜率与端点。",
    probe: "像素序列、误差项、象限对称和端点包含",
  },
  {
    label: "bresenham",
    unit: "Implementation Algorithms for Graphics Primitives and Attributes",
    mechanism:
      "primitive implementation algorithm 决定连续图元如何遍历像素，bresenham 用整数增量维护理想线与候选像素的误差。正确实现应在各象限保持对称，并清楚处理陡斜率与端点。",
    probe: "像素序列、误差项、象限对称和端点包含",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus:
    "让线宽、颜色和图案等属性在图元内按规则插值，并用增量误差驱动图元光栅化而非重复浮点求值",
  formula:
    "a(t)=(1-t)a_0+t a_1 ; e_{k+1}=e_k+2\\Delta y-2\\Delta x\\,I_{stepY}",
  invariant:
    "Attributes of Graphics Primitives的输入、公式中间量、输出与恢复结果可用同一基线复算，且Implementation Algorithms for Graphics Primitives and Attributes的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault:
    "在错误空间线性插值，或把线宽当成与分辨率无关的世界尺度；只实现0到1斜率，或在象限变换后忘记恢复坐标",
  evidence:
    "端点属性、插值参数、连接处覆盖和裁剪前后结果、像素序列、误差项、象限对称和端点包含",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg404AttributesAlgorithmsPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg404AttributesAlgorithmsAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg404AttributesAlgorithmsEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
