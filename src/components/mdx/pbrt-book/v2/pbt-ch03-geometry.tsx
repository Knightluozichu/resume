import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 3 章 Geometry and Transformations",
  unitTitle: "3 Geometry and Transformations",
  focus: "区分点、向量、法线、射线、包围盒及其坐标变换合同",
  concepts: [
    "coordinate system",
    "vector",
    "normal",
    "ray",
    "bounding box",
    "transformation",
  ],
  fault: "把法线当向量直接变换，或让包围盒舍入误差漏掉真实交点",
  evidence:
    "source space、target space、matrix、ray interval、normal dot tangent与bounds",
  formula: "p(t)=o+t\\,d",
} satisfies PbrtExperimentModel;

export function PbtCh03GeometryPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh03GeometryEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh03GeometryEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
