import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 7 章 Primitives and Intersection Acceleration",
  unitTitle: "7 Primitives and Intersection Acceleration",
  focus: "用Primitive绑定几何与材质，并以BVH保守裁剪不可能命中的图元",
  concepts: [
    "primitive",
    "aggregate",
    "intersection",
    "bvh",
    "surface area heuristic",
  ],
  fault: "构建时使用非保守bounds，或遍历后没有收紧最近tMax",
  evidence:
    "node bounds、split axis、primitive range、visit order、tMax与reference intersection",
  formula: "C_{SAH}=C_t+\\sum_i p_iN_iC_{isect}",
} satisfies PbrtExperimentModel;

export function PbtCh07AccelerationPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh07AccelerationEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh07AccelerationEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
