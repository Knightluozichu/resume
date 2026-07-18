import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "阅读合同",
  "原理主线",
  "实战主线",
  "私有化",
  "证据链",
  "版本边界",
] as const;

export function CgptPrefaceArchitectureLab() {
  return (
    <OfficialCgptLab
      title="前言"
      concepts={concepts}
      accent="#0f766e"
      view="architecture"
    />
  );
}
export function CgptPrefaceTrainingLab() {
  return (
    <OfficialCgptLab
      title="前言"
      concepts={concepts}
      accent="#0f766e"
      view="training"
    />
  );
}
export function CgptPrefaceEvidenceLab() {
  return (
    <OfficialCgptLab
      title="前言"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
