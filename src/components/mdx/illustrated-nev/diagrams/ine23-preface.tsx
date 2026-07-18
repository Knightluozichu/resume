import { OfficialIne23BookLab } from "./official-ine23-book-lab";

const concepts = ["前言"] as const;

export function Ine23PrefaceEnergyLab() {
  return (
    <OfficialIne23BookLab
      title="前言：编写原则与章节分工"
      concepts={concepts}
      accent="#0d9488"
      view="energy"
    />
  );
}

export function Ine23PrefaceComponentLab() {
  return (
    <OfficialIne23BookLab
      title="前言：编写原则与章节分工"
      concepts={concepts}
      accent="#0d9488"
      view="component"
    />
  );
}

export function Ine23PrefaceEvidenceLab() {
  return (
    <OfficialIne23BookLab
      title="前言：编写原则与章节分工"
      concepts={concepts}
      accent="#0d9488"
      view="evidence"
    />
  );
}
