import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 6 章 Shapes",
  unitTitle: "6 Shapes",
  focus: "让Shape求交返回稳定的参数坐标、法线、微分几何与误差界",
  concepts: [
    "shape",
    "triangle mesh",
    "SurfaceInteraction",
    "rounding error",
    "bilinear patch",
  ],
  fault: "只返回命中布尔值，或用固定epsilon同时造成自相交与漏交",
  evidence:
    "t interval、primitive id、uv、pError、geometric normal、shading normal与dpdu",
  formula: "ray(t_{hit})=p_{surface}",
} satisfies PbrtExperimentModel;

export function PbtCh06ShapesPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh06ShapesEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh06ShapesEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
