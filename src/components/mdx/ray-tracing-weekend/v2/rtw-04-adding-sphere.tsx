"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "Adding a Sphere";
const nodes = [
  {
    label: "球体",
    unit: "Adding a Sphere",
    mechanism:
      "球体由中心和半径定义；把射线代入球体方程得到关于t的二次方程；相交由判别式和允许的t区间共同决定。只判断判别式非负仍会误接收相机背后的根。",
    probe: "判别式、两个候选根、命中区间和最终最近t",
  },
  {
    label: "二次方程",
    unit: "Adding a Sphere",
    mechanism:
      "球体由中心和半径定义；把射线代入球体方程得到关于t的二次方程；相交由判别式和允许的t区间共同决定。只判断判别式非负仍会误接收相机背后的根。",
    probe: "判别式、两个候选根、命中区间和最终最近t",
  },
  {
    label: "相交",
    unit: "Adding a Sphere",
    mechanism:
      "球体由中心和半径定义；把射线代入球体方程得到关于t的二次方程；相交由判别式和允许的t区间共同决定。只判断判别式非负仍会误接收相机背后的根。",
    probe: "判别式、两个候选根、命中区间和最终最近t",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "把射线代入隐式球方程并选择最近有效根",
  formula: "a t^2+2ht+c=0,\\qquad t=\\frac{-h\\pm\\sqrt{h^2-ac}}{a}",
  invariant:
    "Adding a Sphere的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "接受负t、忽略最近根，或在切线附近直接比较浮点数等于零",
  evidence: "判别式、两个候选根、命中区间和最终最近t",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw04AddingSphereGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw04AddingSphereSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw04AddingSphereEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
