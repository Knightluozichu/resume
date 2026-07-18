import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "Making Group Decisions",
  "Social Welfare Functions and Social Choice Functions",
  "Voting Procedures",
  "Plurality",
  "Sequential Majority Elections",
  "The Borda Count",
] as const;

export function Mas12MakingGroupDecisionsModelLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 12 Making Group Decisions"
      concepts={concepts}
      accent="#6d28d9"
      view="pipeline"
    />
  );
}

export function Mas12MakingGroupDecisionsGameLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 12 Making Group Decisions"
      concepts={concepts}
      accent="#6d28d9"
      view="training"
    />
  );
}

export function Mas12MakingGroupDecisionsEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Chapter 12 Making Group Decisions"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
