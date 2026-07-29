import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 4 章 Radiometry, Spectra, and Color",
  unitTitle: "4 Radiometry, Spectra, and Color",
  focus: "用辐射通量、辐照度、辐亮度和光谱分布保持量纲与方向语义",
  concepts: ["radiometry", "radiance", "spectrum", "color", "solid angle"],
  fault: "混用辐照度与辐亮度，或在光传输内部过早压成RGB",
  evidence:
    "quantity、unit、wavelength sample、direction、cosine term与conversion boundary",
  formula: "L=\\frac{d^2\\Phi}{dA^{\\perp}d\\omega}",
} satisfies PbrtExperimentModel;

export function PbtCh04RadiometryPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh04RadiometryEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh04RadiometryEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
