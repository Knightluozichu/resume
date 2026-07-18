import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = ["参考文献"] as const;

export function Ine23ReferencesEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="参考文献：车型资料与复核边界"
      concepts={concepts}
      accent="#475569"
      view="energy"
    />
  );
}

export function Ine23ReferencesComponentLab() {
  return (
    <OfficialIne23BookLab
      title="参考文献：车型资料与复核边界"
      concepts={concepts}
      accent="#475569"
      view="component"
    />
  );
}

export function Ine23ReferencesEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="参考文献：车型资料与复核边界"
      concepts={concepts}
      accent="#475569"
      view="evidence"
    />
  );
}
