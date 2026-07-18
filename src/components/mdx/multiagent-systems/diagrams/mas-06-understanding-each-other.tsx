import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Understanding Each Other",
  "Ontology Fundamentals",
  "Ontology Building Blocks",
  "An Ontology of Ontologies",
  "Ontology Languages",
  "XML -- Ad Hoc Ontologies",
] as const;

export function Mas06UnderstandingEachOtherModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 6 Understanding Each Other"
      concepts={concepts}
      accent="#a21caf"
      view="pipeline"
    />
  );
}

export function Mas06UnderstandingEachOtherGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 6 Understanding Each Other"
      concepts={concepts}
      accent="#a21caf"
      view="training"
    />
  );
}

export function Mas06UnderstandingEachOtherEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 6 Understanding Each Other"
      concepts={concepts}
      accent="#a21caf"
      view="evidence"
    />
  );
}
