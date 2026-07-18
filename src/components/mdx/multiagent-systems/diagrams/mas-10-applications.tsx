import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Applications",
  "Agents for Workflow and Business Process Management",
  "Agents for Distributed Sensing",
  "Agents for Information Retrieval and Management",
  "Agents for Electronic Commerce",
  "Agents for Human--Computer Interfaces",
] as const;

export function Mas10ApplicationsModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 10 Applications"
      concepts={concepts}
      accent="#2563eb"
      view="pipeline"
    />
  );
}

export function Mas10ApplicationsGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 10 Applications"
      concepts={concepts}
      accent="#2563eb"
      view="training"
    />
  );
}

export function Mas10ApplicationsEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 10 Applications"
      concepts={concepts}
      accent="#2563eb"
      view="evidence"
    />
  );
}
