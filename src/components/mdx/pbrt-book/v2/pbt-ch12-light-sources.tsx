import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 12 章 Light Sources",
  unitTitle: "12 Light Sources",
  focus: "统一光源发射、直接采样、PDF与可见性射线的合同",
  concepts: [
    "light source",
    "area light",
    "infinite light",
    "light sampling",
    "LightSampleContext",
  ],
  fault: "面积PDF未转换成立体角PDF，或把被遮挡样本仍计入直接光",
  evidence:
    "light id、sample u、target、distance、Li、pdf measure、visibility与MIS weight",
  formula: "p_{\\omega}=p_A\\frac{r^2}{|n_l\\cdot(-\\omega_i)|}",
} satisfies PbrtExperimentModel;

export function PbtCh12LightSourcesPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh12LightSourcesEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh12LightSourcesEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
