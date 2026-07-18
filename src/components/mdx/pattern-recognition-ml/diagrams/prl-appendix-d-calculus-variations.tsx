"use client";
import { OfficialPrmlLab } from "./official-prml-lab";
const concepts = [
  "附录D 变分法",
  "泛函",
  "变分",
  "扰动函数",
  "泛函导数",
  "Euler-Lagrange方程",
  "驻点",
] as const;
export function PrlAppendixDCalculusVariationsMapLab() {
  return (
    <OfficialPrmlLab
      title="附录D 变分法"
      concepts={concepts}
      accent="#be123c"
      view="map"
    />
  );
}
export function PrlAppendixDCalculusVariationsExperimentLab() {
  return (
    <OfficialPrmlLab
      title="附录D 变分法"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function PrlAppendixDCalculusVariationsEvidenceLab() {
  return (
    <OfficialPrmlLab
      title="附录D 变分法"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
