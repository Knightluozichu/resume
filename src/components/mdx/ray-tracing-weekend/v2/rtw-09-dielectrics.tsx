"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "Dielectrics";
const nodes = [
  {
    label: "电介质",
    unit: "Dielectrics",
    mechanism:
      "电介质通常不吸收颜色，但会依据折射率改变方向；折射由Snell定律约束；当几何条件触发全内反射时只能反射，否则可用Schlick近似在两条路径之间采样。",
    probe: "折射率比、cosθ、全内反射判据和随机选择结果",
  },
  {
    label: "折射",
    unit: "Dielectrics",
    mechanism:
      "电介质通常不吸收颜色，但会依据折射率改变方向；折射由Snell定律约束；当几何条件触发全内反射时只能反射，否则可用Schlick近似在两条路径之间采样。",
    probe: "折射率比、cosθ、全内反射判据和随机选择结果",
  },
  {
    label: "全内反射",
    unit: "Dielectrics",
    mechanism:
      "电介质通常不吸收颜色，但会依据折射率改变方向；折射由Snell定律约束；当几何条件触发全内反射时只能反射，否则可用Schlick近似在两条路径之间采样。",
    probe: "折射率比、cosθ、全内反射判据和随机选择结果",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "在反射、折射和全内反射之间做概率选择",
  formula:
    "\\eta_i\\sin\\theta_i=\\eta_t\\sin\\theta_t,\\qquad R(\\theta)\\approx R_0+(1-R_0)(1-\\cos\\theta)^5",
  invariant: "Dielectrics的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "正反面使用同一折射率比，或在全内反射条件下仍计算折射根",
  evidence: "折射率比、cosθ、全内反射判据和随机选择结果",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw09DielectricsGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw09DielectricsSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw09DielectricsEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
