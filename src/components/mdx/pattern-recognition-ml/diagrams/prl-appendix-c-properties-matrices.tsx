"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "附录C 矩阵性质",
  "正定矩阵",
  "特征分解",
  "行列式",
  "矩阵迹",
  "矩阵导数",
  "Woodbury恒等式",
] as const;
export function PrlAppendixCPropertiesMatricesMapLab() {
  return (
    <OfficialPrmlLab
      title="附录C 矩阵性质"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function PrlAppendixCPropertiesMatricesExperimentLab() {
  return (
    <OfficialPrmlLab
      title="附录C 矩阵性质"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function PrlAppendixCPropertiesMatricesEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="附录C 矩阵性质"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
