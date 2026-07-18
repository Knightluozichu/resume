import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Practical Reasoning Agents",
  "Practical Reasoning = Deliberation + Means-Ends Reasoning",
  "Means--Ends Reasoning",
  "Implementing a Practical Reasoning Agent",
  "The Procedural Reasoning System",
  "输入合同",
] as const;

export function Mas04PracticalReasoningAgentsModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 4 Practical Reasoning Agents"
      concepts={concepts}
      accent="#c2410c"
      view="pipeline"
    />
  );
}

export function Mas04PracticalReasoningAgentsGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 4 Practical Reasoning Agents"
      concepts={concepts}
      accent="#c2410c"
      view="training"
    />
  );
}

export function Mas04PracticalReasoningAgentsEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 4 Practical Reasoning Agents"
      concepts={concepts}
      accent="#c2410c"
      view="evidence"
    />
  );
}
