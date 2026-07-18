import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Methodologies",
  "When is an Agent-Based Solution Appropriate?",
  "Agent-Oriented Analysis and Design",
  "The AAII methodology",
  "Gaia",
  "Tropos",
] as const;

export function Mas09MethodologiesModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 9 Methodologies"
      concepts={concepts}
      accent="#854d0e"
      view="pipeline"
    />
  );
}

export function Mas09MethodologiesGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 9 Methodologies"
      concepts={concepts}
      accent="#854d0e"
      view="training"
    />
  );
}

export function Mas09MethodologiesEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 9 Methodologies"
      concepts={concepts}
      accent="#854d0e"
      view="evidence"
    />
  );
}
