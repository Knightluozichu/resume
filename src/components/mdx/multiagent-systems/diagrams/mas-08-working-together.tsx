import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Working Together",
  "Cooperative Distributed Problem Solving",
  "Task Sharing and Result Sharing",
  "Task sharing in the Contract Net",
  "Result Sharing",
  "Combining Task and Result Sharing",
] as const;

export function Mas08WorkingTogetherModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 8 Working Together"
      concepts={concepts}
      accent="#0e7490"
      view="pipeline"
    />
  );
}

export function Mas08WorkingTogetherGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 8 Working Together"
      concepts={concepts}
      accent="#0e7490"
      view="training"
    />
  );
}

export function Mas08WorkingTogetherEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 8 Working Together"
      concepts={concepts}
      accent="#0e7490"
      view="evidence"
    />
  );
}
