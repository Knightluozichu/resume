import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 10 章 Textures and Materials",
  unitTitle: "10 Textures and Materials",
  focus: "从纹理坐标与足迹得到参数，再由Material构造当前交点的BSDF",
  concepts: [
    "texture",
    "material",
    "texture mapping",
    "MIPMap",
    "antialiasing",
    "normal mapping",
  ],
  fault: "忽略纹理足迹导致远处闪烁，或用着色法线替代几何法线做可见性偏移",
  evidence:
    "uv、dudx/dudy、MIP level、texture value、material parameters与two normals",
  formula: "BSDF=Material(Texture(si),\\lambda)",
} satisfies PbrtExperimentModel;

export function PbtCh10TexturesMaterialsPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh10TexturesMaterialsEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh10TexturesMaterialsEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
