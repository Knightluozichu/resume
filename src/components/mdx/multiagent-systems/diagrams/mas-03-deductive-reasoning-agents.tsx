import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Deductive Reasoning Agents",
  "Agents as Theorem Provers",
  "Agent-Oriented Programming",
  "Concurrent MetateM",
  "输入合同",
  "状态轨迹",
] as const;

export function Mas03DeductiveReasoningAgentsModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 3 Deductive Reasoning Agents"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Mas03DeductiveReasoningAgentsGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 3 Deductive Reasoning Agents"
      concepts={concepts}
      accent="#0369a1"
      view="training"
    />
  );
}

export function Mas03DeductiveReasoningAgentsEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 3 Deductive Reasoning Agents"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
