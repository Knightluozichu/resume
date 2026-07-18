"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "附录B 詹森不等式",
  "B.1 凸函数和詹森不等式",
  "B.2 凹函数和log函数",
  "B.3 ELBO的推导",
] as const;
export function DlgAppendixBJensenMapLab() {
  return (
    <OfficialGenerativeLab
      title="附录B 詹森不等式"
      concepts={concepts}
      accent="#b91c1c"
      view="map"
    />
  );
}
export function DlgAppendixBJensenExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="附录B 詹森不等式"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}
export function DlgAppendixBJensenEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="附录B 詹森不等式"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
