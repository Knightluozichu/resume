"use client";
import { OfficialGenerativeLab } from "./official-generative-lab";
const concepts = [
  "附录D 数学符号一览",
  "D.1 本书使用的符号",
  "D.2 本书使用的数学式",
] as const;
export function DlgAppendixDNotationMapLab() {
  return (
    <OfficialGenerativeLab
      title="附录D 数学符号一览"
      concepts={concepts}
      accent="#1d4ed8"
      view="map"
    />
  );
}
export function DlgAppendixDNotationExperimentLab() {
  return (
    <OfficialGenerativeLab
      title="附录D 数学符号一览"
      concepts={concepts}
      accent="#1d4ed8"
      view="experiment"
    />
  );
}
export function DlgAppendixDNotationEvidenceLab() {
  return (
    <OfficialGenerativeLab
      title="附录D 数学符号一览"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
