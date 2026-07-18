import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Forming Coalitions",
  "Cooperative Games",
  "The Core",
  "The Shapley Value",
  "Computational and Representational Issues",
  "Modular Representations",
] as const;

export function Mas13FormingCoalitionsModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 13 Forming Coalitions"
      concepts={concepts}
      accent="#0f766e"
      view="pipeline"
    />
  );
}

export function Mas13FormingCoalitionsGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 13 Forming Coalitions"
      concepts={concepts}
      accent="#0f766e"
      view="training"
    />
  );
}

export function Mas13FormingCoalitionsEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 13 Forming Coalitions"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
