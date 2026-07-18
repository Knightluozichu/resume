"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "附录A 数据集",
  "合成数据",
  "训练切分",
  "预处理",
  "数据版本",
  "噪声模型",
  "评价协议",
] as const;
export function PrlAppendixADataSetsMapLab() {
  return (
    <OfficialPrmlLab
      title="附录A 数据集"
      concepts={concepts}
      accent="#0f766e"
      view="map"
    />
  );
}
export function PrlAppendixADataSetsExperimentLab() {
  return (
    <OfficialPrmlLab
      title="附录A 数据集"
      concepts={concepts}
      accent="#0f766e"
      view="experiment"
    />
  );
}
export function PrlAppendixADataSetsEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="附录A 数据集"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
