import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Intelligent Agents",
  "Intelligent Agents",
  "Agents and Objects",
  "Agents and Expert Systems",
  "Agents as Intentional Systems",
  "Abstract Architectures for Intelligent Agents",
] as const;

export function Mas02IntelligentAgentsModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 2 Intelligent Agents"
      concepts={concepts}
      accent="#7e22ce"
      view="pipeline"
    />
  );
}

export function Mas02IntelligentAgentsGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 2 Intelligent Agents"
      concepts={concepts}
      accent="#7e22ce"
      view="training"
    />
  );
}

export function Mas02IntelligentAgentsEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 2 Intelligent Agents"
      concepts={concepts}
      accent="#7e22ce"
      view="evidence"
    />
  );
}
