"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle = "Computer Graphics Systems and Applications";
const nodes = [
  {
    label: "computer graphics system",
    unit: "Computer Graphics Systems and Applications",
    mechanism:
      "computer graphics system 把建模、变换、可见性、着色与显示连接起来，graphics application 则决定精度、交互与性能目标。相同管线用于CAD、可视化或娱乐时，接受条件并不相同。",
    probe: "应用输入、管线阶段、误差预算和最终交互响应",
  },
  {
    label: "graphics application",
    unit: "Computer Graphics Systems and Applications",
    mechanism:
      "computer graphics system 把建模、变换、可见性、着色与显示连接起来，graphics application 则决定精度、交互与性能目标。相同管线用于CAD、可视化或娱乐时，接受条件并不相同。",
    probe: "应用输入、管线阶段、误差预算和最终交互响应",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "从应用需求反推图形系统的数据流与交互闭环",
  formula: "y=D(S(V(T(x))))",
  invariant:
    "Computer Graphics Systems and Applications的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "先选API再定义应用误差预算，导致指标与用户任务脱节",
  evidence: "应用输入、管线阶段、误差预算和最终交互响应",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg402SystemsApplicationsPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg402SystemsApplicationsAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg402SystemsApplicationsEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
