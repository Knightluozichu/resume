import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Reactive and Hybrid Agents",
  "Reactive Agents",
  "The Subsumption Architecture",
  "PENGI",
  "Situated automata",
  "The Agent Network Architecture",
] as const;

export function Mas05ReactiveHybridAgentsModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 5 Reactive and Hybrid Agents"
      concepts={concepts}
      accent="#4338ca"
      view="pipeline"
    />
  );
}

export function Mas05ReactiveHybridAgentsGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 5 Reactive and Hybrid Agents"
      concepts={concepts}
      accent="#4338ca"
      view="training"
    />
  );
}

export function Mas05ReactiveHybridAgentsEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 5 Reactive and Hybrid Agents"
      concepts={concepts}
      accent="#4338ca"
      view="evidence"
    />
  );
}
