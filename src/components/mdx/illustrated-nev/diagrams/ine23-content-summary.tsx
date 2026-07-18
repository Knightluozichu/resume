import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = ["内容提要"] as const;

export function Ine23ContentSummaryEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="内容提要：范围与图解方法"
      concepts={concepts}
      accent="#0f766e"
      view="energy"
    />
  );
}

export function Ine23ContentSummaryComponentLab() {
  return (
    <OfficialIne23BookLab
      title="内容提要：范围与图解方法"
      concepts={concepts}
      accent="#0f766e"
      view="component"
    />
  );
}

export function Ine23ContentSummaryEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="内容提要：范围与图解方法"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
