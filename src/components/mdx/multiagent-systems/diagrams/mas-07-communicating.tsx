import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Communicating",
  "Speech Acts",
  "Austin",
  "Searle",
  "The plan-based theory of speech acts",
  "Speech acts as rational action",
] as const;

export function Mas07CommunicatingModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 7 Communicating"
      concepts={concepts}
      accent="#b91c1c"
      view="pipeline"
    />
  );
}

export function Mas07CommunicatingGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 7 Communicating"
      concepts={concepts}
      accent="#b91c1c"
      view="training"
    />
  );
}

export function Mas07CommunicatingEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 7 Communicating"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
